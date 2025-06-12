# 链表

**链表**（Linked List）是一种通过**指针**(或引用)将**节点**（零散内存块）串联起来的线性表数据结构。链表的 `head` 属性指向链表的第一个节点，如果 `head` 指向 `null`，则为空链表。

数组的线性顺序由**下标**决定，而链表的线性顺序由**指针**决定。

链表的优点是插入和删除节点的操作动态高效，缺点则是每个节点的指针都需要额外存储空间，而且访问节点元素的时间复杂度是线性的。

链表有很多种类型，包括单向链表、双向链表、循环链表等。

可以通过**哨兵**来简化空链表边界条件的处理，从而简化链表代码。接下来将介绍单向链表和双向链表两种链表的原理及使用哨兵优化的实现。

## 单向链表

![Linked List](../images/algorithm/linked-list.png)

### 单向链表结构

单向链表的每个节点由存储节点值的 `val` 属性和指向下一个节点（后继节点）的 `next` 指针组成。

``` js
class Node {
  constructor(val, next = null) {
    this.val = val;
    this.next = next;
  }
}
```

单向链表的结构包括一个指向头节点的 `head` 属性，以及一个用于记录链表节点总数 `size` 属性。我们为链表增加一个哨兵节点，并将其指向头节点。

``` js
class LinkedList {
  constructor() {
    this.head = new Node('dummy');
    this.size = 0;
  }
}
```

### 查找操作

单向链表的查找操作包括：

  - 查找任意位置的节点；
  - 查找值等于指定值的节点。

查找操作的思路是通过不断地遍历后继节点，直到找到目标节点或者遍历完链表为止。

1. 查找任意位置的节点

``` js
get(index) {
  if (index < 0 || index >= this.size) return -1;

  let curNode = this.head.next;
  for (let i = 0; i < index; i++) {
    curNode = curNode.next;
  }

  return curNode;
}
```

2. 查找值等于指定值的节点

``` js
indexOf(val) {
  let i = 0;
  let curNode = this.head.next;

  while (curNode) {
    if (curNode.val === val) return i;
    curNode = curNode.next;
    i++;
  }

  return -1;
}
```

查找操作时间复杂度为 O(n)。

### 插入操作

单向链表的插入操作包括：

  - 从链表头部插入节点；
  - 从链表尾部插入节点；
  - 从任意位置插入节点。

![Linked List Insert](../images/algorithm/linked-list-insert.png)

单向链表插入操作的思路是先将新节点的 `next` 指针指向当前节点的后继节点，然后再将当前节点的 `next` 指针指向新节点。

由于插入操作的逻辑存在 code redundancy，所以可以将从链表头部和尾部插入节点操作直接 delegate 到任意位置插入节点操作中。

1. 从链表头部插入节点

``` js
prepend(data) {
  this.insertAt(0, data);
}
```

2. 从链表尾部插入节点

``` js
append(data) {
  this.insertAt(this.size, data);
}
```

3. 任意位置插入节点

``` js{10-11}
insertAt(index, val) {
  if (index < 0 || index > this.size) return false;

  let curNode = this.head;
  for (let i = 0; i < index; i++) {
    curNode = curNode.next;
  }

  const newNode = new Node(val);
  newNode.next = curNode.next;
  curNode.next = newNode;
  this.size++;

  return true;
}
```

单向链表从链表头部插入节点操作的时间复杂度为 O(1)。而从链表尾部和任意位置插入节点操作由于需要先遍历链表找到合适的插入位置，然后再执行插入操作，所以时间复杂度为 O(n)。

### 删除操作

单向链表的删除操作包括：

  - 删除链表头节点；
  - 删除链表尾节点；
  - 删除任意位置的节点；
  - 删除值等于指定值的节点。

![Linked List Remove](../images/algorithm/linked-list-remove.png)

单向链表删除节点的思路是先找到删除节点的前驱节点，然后将它的 `next` 指针指向删除节点的后继节点。

与插入操作同理，我们也可以将删除链表头节点和尾节点的操作 delegate 到删除任意位置的节点操作中。

1. 删除链表头节点

``` js
removeHead() {
  this.removeAt(0);
}
```

2. 删除链表尾节点

``` js
removeTail() {
  this.removeAt(this.size - 1);
}
```

3. 删除任意位置的节点

``` js {8}
removeAt(index) {
  if (index < 0 || index >= this.size) return false;

  let curNode = this.head;
  for (let i = 0; i < index; i++) {
    curNode = curNode.next;
  }
  curNode.next = curNode.next.next;
  this.size--;

  return true;
}
```

4. 删除值等于指定值的节点

``` js {8}
removeByVal(val) {
  if (this.size === 0) return false;

  let isDeleted = false;
  let curNode = this.head;
  while (curNode.next) {
    if (curNode.next.val === val) {
      curNode.next = curNode.next.next;
      this.size--;
      isDeleted = true;
    } else {
      curNode = curNode.next;
    }
  }

  return isDeleted;
}
```

删除链表头节点操作的时间复杂度为 O(1)，而删除链表尾部节点、删除任意位置的节点和删除值等于指定值的节点操作由于需要遍历链表节点，所以时间复杂度为 O(n)。

单向链表在指定节点前插入和删除指定节点的操作并不容易实现，需要 O(n) 的时间复杂度，我们可以通过双向链表简单高效的在 O(1) 的时间复杂度内实现以上操作。

关于单向链表的详细代码和测试请点击[这里](https://github.com/ZhangGuangZe/data-structures-and-algorithms-in-javascript/tree/master/linked-list)查看。

## 双向链表

![Doubly Linked List](../images/algorithm/doubly-linked-list.png)

### 双向链表结构

双向链表的节点结构在单向链表节点结构的基础上多了一个指向上一个节点（前驱节点）的 `prev` 指针。

``` js
class Node {
  constructor(val, prev = null, next = null) {
    this.val = val;
    this.prev = prev;
    this.next = next;
  }
}
```

双向链表的链表结构由指向头节点的 `head`、指向尾节点的 `tail` 和记录双向链表节点数量的 `size` 属性组成。我们为双向链表的头尾节点增加两个哨兵节点，并将这两个哨兵节点的首尾相连。

``` js
class DoublyLinkedList {
  constructor() {
    this.head = new Node('dummyHead');
    this.tail = new Node('dummyTail');
    this.head.next = this.tail;
    this.tail.prev = this.head;
    this.size = 0;
  }
}
```

### 查找操作

双向链表的查找操作包括：

  - 查找任意位置的节点；
  - 查找值等于指定值的节点。

1. 查找任意位置的节点

查找任意位置的节点的思路是，首先根据索引判断节点所在的位置，然后从头部或者从尾部开始遍历节点，最后返回该节点。

``` js
get(index) {
  if (index < 0 || index >= this.size) return -1;

  let curNode;
  if (index < this.size / 2) {
    curNode = this.head.next;
    for (let i = 0; i < index; i++) {
      curNode = curNode.next;
    }
  } else {
    curNode = this.tail.prev;
    for (let i = this.size - 1; i > index; i--) {
      curNode = curNode.prev;
    }
  }

  return curNode;
}
```

2. 查找值等于指定值的节点

``` js
indexOf(val) {
  let i = 0;
  let curNode = this.head.next;

  while (curNode) {
    if (curNode.val === val) return i;
    curNode = curNode.next;
    i++;
  }

  return -1;
}
```

双向链表查找操作的时间复杂度为 O(n)，我们可以根据节点所在位置决定双向链表遍历方向，如果查找节点所在位置小于双向链表一半的长度，则从 `head` 开始遍历后继节点，否则从 `tail` 开始遍历前驱节点。

### 插入操作

双向链表的插入操作主要包括：

  - 从双向链表头部插入节点；
  - 从双向链表尾部插入节点；
  - 从任意位置插入节点；
  - 在指定节点前插入节点。

双向链表插入操作的思路是将新节点的 `prev` 和 `next` 指针指向它的前驱节点和后继节点，并将前驱节点的 `next` 指针和后继节点的 `prev` 指针指向新节点。

![Doubly Linked List Insert](../images/algorithm/doubly-linked-list-insert.png)

1. 从双向链表头部插入节点

``` js
prepend(data) {
  this.insertAt(0, data);
}
```

2. 从双向链表尾部插入节点

``` js
append(data) {
  this.insertAt(this.size, data);
}
```

3. 任意位置插入节点

``` js {21-24}
insertAt(index, val) {
  if (index < 0 || index > this.size) return false;

  let precursor;
  let successor;
  if (index < this.size / 2) {
    precursor = this.head;
    for (let i = 0; i < index; i++) {
      precursor = precursor.next;
    }
    successor = precursor.next;
  } else {
    successor = this.tail;
    for (let i = this.size; i > index; i--) {
      successor = successor.prev;
    }
    precursor = successor.prev;
  }

  const newNode = new Node(val);
  newNode.next = successor;
  precursor.next = newNode;
  successor.prev = newNode;
  newNode.prev = precursor;
  this.size++;

  return true;
}
```

双向链表从头部和尾部插入的时间复杂度为 O(1)，因为它们可以直接使用头节点和尾节点进行插入操作。而在任意位置插入节点的操作由于需要遍历节点找到插入位置，所以时间复杂度为 O(n)。

- 在指定节点前插入节点

``` js {2-5}
insertBefore(targetNode, newNode) {
  newNode.prev = targetNode.prev;
  newNode.next = targetNode;
  targetNode.prev.next = newNode;
  targetNode.prev = newNode;
  this.size++;

  return true;
}
```

由于可以通过目标节点的 `prev` 指针获取前驱节点，所以在指定节点前插入节点的时间复杂度为 O(1)。

### 删除操作

双向链表的删除操作主要包括：

  - 删除链表头节点；
  - 删除链表尾节点；
  - 删除任意位置的节点；
  - 删除指定节点。

双向链表删除操作的思路是将删除节点前驱节点的 `next` 指针指向删除节点的后继节点，然后将删除节点后继节点的 `prev` 指针指向删除节点的前驱节点。

![Doubly Linked List Remove](../images/algorithm/doubly-linked-list-remove.png)

1. 删除链表头节点

``` js
removeHead() {
  this.removeAt(0);
}
```

2. 删除链表尾节点

``` js
removeTail() {
  this.removeAt(this.size - 1);
}
```

3. 删除任意位置的节点

``` js {19-20}
removeAt(index) {
  if (index < 0 || index >= this.size) return false;

  let precursor;
  let successor;
  if (index < this.size / 2) {
    precursor = this.head;
    for (let i = 0; i < index; i++) {
      precursor = precursor.next;
    }
    successor = precursor.next.next;
  } else {
    successor = this.tail;
    for (let i = this.size - 1; i > index; i--) {
      successor = successor.prev;
    }
    precursor = successor.prev.prev;
  }
  precursor.next = successor;
  successor.prev = precursor;
  this.size--;

  return true;
}
```

4. 删除指定节点

``` js {4-5}
remove(targetNode) {
  if (this.size === 0) return false;

  targetNode.prev.next = targetNode.next;
  targetNode.next.prev = targetNode.prev;
  this.size--;

  return true;
}
```

在双向链表的删除操作中，删除链表头节点、尾节点和指定节点的时间复杂度为 O(1)。

双向链表除了以上插入和删除操作外，在指定值前/后插入节点或者删除值等于指定值的节点时，由于在插入和删除之前需要遍历链表，所以需要 O(n) 的时间复杂度。

关于双向链表的详细代码和测试请点击[这里](https://github.com/ZhangGuangZe/data-structures-and-algorithms-in-javascript/tree/master/doubly-linked-list)查看。

## 应用场景

- LRU 缓存淘汰算法

LRU（Least Recently Used，最近最少使用）缓存淘汰算法。

原理是访问数据时：

- 如果该数据不存在于缓存中：
  - 如果缓存未满，则将该数据插入到缓存头部；
  - 如果缓存已满，则将删除缓存末尾数据，然后将该数据插入到缓存头部；
- 如果该数据存在于缓存中，则将数据从原始位置挪动到缓存头部。

可以使用双向链表或者哈希表实现该算法。

## 参考

- [Wikipedia](https://en.wikipedia.org/wiki/Linked_list)
- [javascript-algorithms](https://github.com/trekhleb/javascript-algorithms)
- 《算法导论》
- 《算法》（第4版）
- 《数据结构与算法之美》
- 《学习JavaScript数据结构与算法》（第3版）
- [数据结构基础系列「链表Linked List」](https://www.bilibili.com/video/BV1MA411i72U/?spm_id_from=333.999.0.0&vd_source=fa64a81953b77882cd4d725eb74443b0)