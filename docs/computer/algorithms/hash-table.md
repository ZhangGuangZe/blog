# 散列表

**散列表**（Hash Table，也称哈希表）是一种将键（或关键字）映射值的数据结构。其底层依赖于数组，使用散列函数将键转化为数组的索引来操作对应的值。

## 散列函数

散列函数应该尽量简单、易于计算且均匀散列所有键，最小化的让相似键散列到不同的槽内。

设计散列函数的方法有很多种，最常见的就是除留余数法。首先需要将不同类型的键转换为整数 k，然后选择大小为素数的数组 m，最后将 k % m 即可得到一个散列值。

``` js
hash(key) {
  return this.hashCode(key) % this.buckets.length;
}
```

`hashCode` 方法源于 djb2 字符串散列算法，它会将不同类型的键转换为字符串，然后再根据 djb2 算法计算出散列值。

``` js
keyToString(key) {
  if (key === null) {
    return 'null';
  } else if (key === undefined) {
    return 'undefined';
  } else if (typeof key === 'number') {
    return key + 'number';
  } else if (typeof key === 'string') {
    return key;
  }
  return key.toString();
}
hashCode(key) {
  const str = this.keyToString(key);
  let hash = 5381;
  for (const c of str) {
    hash = (hash * 33) + c.codePointAt(0); // hash + (hash << 5) + c.codePointAt(0)
  }
  return hash;
}
```

## 散列冲突

理想情况下，通过散列函数可以将不同的键散列出不同的值，不过现实中出现至少两个或多个不同的键散列到相同值的情况是无法避免的。散列函数只能尽可能的减少散列冲突的次数，这就需要一些方法来解决可能出现的散列冲突。

解决散列冲突的方法主要包括拉链法和开放寻址法两种。

### 拉链法

顾名思义，拉链法的思路是通过链表解决散列冲突，利用数组来存储指向链表头部的指针，当发生冲突时，将散列到同一个槽（或者桶）的键值对存储到相同链表中。

![基于拉链法的散列表](https://upload.wikimedia.org/wikipedia/commons/d/d0/Hash_table_5_0_1_1_1_1_1_LL.svg)

以下是基于单链表拉链法实现的散列表：

``` js
class LinkedHashMap {
  constructor(capacity = 997) {
    this.buckets = new Array(capacity).fill(null).map(() => new LinkedList());
  }
  get(key) {
    const linkedList = this.buckets[this.hash(key)];
    const node = linkedList.findByValue(key);
    return node ? node.data.val : undefined;
  }
  set(key, val) {
    const linkedList = this.buckets[this.hash(key)];
    const node = linkedList.findByValue(key);
    if (!node) {
      linkedList.prepend({ key, val });
    } else {
      node.data.val = val;
    }
    return `{${key} => ${val}}`;
  }
  delete(key) {
    const linkedList = this.buckets[this.hash(key)];
    const node = linkedList.findByValue(key);
    if (node) return linkedList.removeVal(node.data);
    return undefined;
  }
}
```

如果所有的键都散列到同一个槽中，会产生一个长度为 n 的链表，则查找操作的最坏情况时间复杂度为 O(n)。不过，在简单均匀散列的假设下，链表的长度不会太长，查找操作的平均情况时间复杂度为 O(1)。插入操作最坏情况时间复杂度为 O(1)。删除操作的最坏情况时间复杂度为 O(n)，如果链表使用的是双向链表，则删除操作的最坏情况时间复杂度是 O(1)。

`findByValue` 方法的实现如下，其它单链表操作的实现，请点击[这里](./linked-list.md)查看。

``` js
findByValue(key) {
  let curr = this.head.next;
  while (curr) {
    if (curr.data.key === key) return curr;
    curr = curr.next;
  }
  return null;
}
```

### 开放寻址法

开放寻址法的思路是通过数组空位解决散列冲突，利用数组来存储键值对而不是指针。当发生散列冲突时，需要连续的检查（或探测）散列表，直到找到所需键值对或者空槽为止。

![基于开放寻址法的散列表](https://upload.wikimedia.org/wikipedia/commons/b/bf/Hash_table_5_0_1_1_1_1_0_SP.svg)

有三种探测散列表的方法：线性探测、二次探测和双重探测。

最简单的探测方法是**线性探测**。当发生散列冲突时，从冲突位置出发，依次逐个遍历数组直到数组末尾，然后又从数组开头开始直到发生冲突的上一个位置为止，在找到所需键值对或者空槽时停止探测。

``` js
class ThreadLocalMap {
  constructor(capacity = 997) {
    this.buckets = new Array(capacity);
    this.deleted = Symbol('deleted');
  }
  set(key, val) {
    let i = this.hash(key);
    while (this.buckets[i] !== undefined) {
      if (this.buckets[i].key === key || this.buckets[i].val === this.deleted) {
        this.buckets[i] = { key, val };
        return `{${key} => ${val}}`;
      }
      i = (i + 1) % this.buckets.length;
    }
    this.buckets[i] = { key, val };
    return `{${key} => ${val}}`;
  }
  get(key) {
    let i = this.hash(key);
    while (this.buckets[i] !== undefined) {
      if (this.buckets[i].key === key && this.buckets[i].val !== this.deleted) {
        return this.buckets[i].val;
      }
      i = (i + 1) % this.buckets.length;
    }
  }
  delete(key) {
    let i = this.hash(key);
    while (this.buckets[i] !== undefined) {
      if (this.buckets[i].key === key) {
        this.buckets[i] = { key, val: this.deleted };
        return true;
      }
      i = (i + 1) % this.buckets.length;
    }
    return false;
  }
}
```

需要注意的是，基于开放寻址法的删除操作不能简单的将键所在位置的值置为空，这样后面的键值对无法被找到，导致查找操作失效。解决这个问题的方法主要有两种，一种方法是“假删除”，也就是通过特殊值 `deleted` 将键的值标记为已删除；另一种方法是将散列值相同但位置在删除元素后面的键值对往前移动。这里我们使用第一种方法实现。

**二次探测**的思路是以二次方的偏移量往后探测。**双重探测**的思路是通过多个散列函数探测。

## 散列表的性能

在散列函数均匀散列的假设下，散列表的性能取决于**装载因子**（实际键的数量/散列表长度）的大小，装载因子越大，发生散列冲突的概率越高，反之，发生的概率越小。

基于拉链法的散列表装载因子可以大于等于 1，当数据量大、链表的长度很长时，我们可以将链表转化成其它高效的数据结构来提升散列表在极端情况下的性能。

基于开放寻址法的散列表当装载因子等于 1 时，会导致无限循环，为了保证性能，我们可以根据装载因子的大小动态调整数组大小。

## 应用场景

- DNS 解析
- 缓存
- 单词拼写检查等。

## 参考

- [Wikipedia](https://en.wikipedia.org/wiki/Hash_table)
- [javascript-algorithms](https://github.com/trekhleb/javascript-algorithms)
- 《算法导论》
- 《算法》（第4版）
- 《数据结构与算法之美》
- 《学习JavaScript数据结构与算法》（第3版）