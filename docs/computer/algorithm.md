# 数据结构与算法（in JavaScript)

> 程序 = 数据结构 + 算法。

> 数据结构，即便于算法操作的组织数据的方法。—— 《算法》

> 数据结构是一种存储和组织数据的方式，旨在便于访问和修改。——《算法导论》

常见的数据结构包括数组、链表、栈、队列、哈希表、二叉树、堆和图等。

> 算法，即适合用计算机实现的解决问题的方法...在计算机科学领域，我们用算法这个词来描述一种有限、确定、有效的并适合用计算机程序来实现的解决问题的方法。——《算法》

> 算法就是把输入转换成输出的计算步骤的一个序列...算法则描述一个特定的计算过程来实现该输入、输出关系。——《算法导论》

算法是计算机的核心技术，是一种求解某一计算问题的计算过程。常见的算法包括排序、搜索、查找、字符串匹配等。

## 算法分析

在计算机科学中，算法分析（Analysis of algorithm）是分析解决计算问题所需任何算法执行所需计算资源（计算时间、内存空间等）或者复杂度的过程。算法分析一词由著名的计算机科学家高德纳创造，是计算复杂度理论重要的组成部分。

著名的**摩尔定律**定律告诉我们，计算机的计算速度和内存容量每 18 个月都会翻一倍。但是，这些计算机资源并不是无限的，我们通过算法分析寻找一种高效的算法在有限资源情况下可以提升程序的性能。

算法的效率或者复杂度在理论上可以通过函数描述算法的输入规模与时间复杂度或空间复杂度之间的增长关系，这里我们只关心算法的时间复杂度。

一般来说，算法的运行时间与输入规模呈同步增长趋势。

相同规模不同的输入可能导致算法运行时间发生变化，这需要在最好、最坏、平均和均摊情况下分析算法的运行时间。一个算法的上限往往取决于它最坏情况的运行时间，可以通过摊还分析来保证最坏情况下每个操作的平均性能；在某种特定情况下，我们将会考虑算法平均情况的运行时间，这需要用到随机化算法和概率分析，从而得到一个期望的运行时间。

在任意规模输入情况下，可以通过渐进符号大 O 或者其他符号来表示算法渐进的运行时间。

通过大 O 表示法可以将算法的增长数量级表示为：常数阶 O(1)、对数阶 O(logn)、线性阶 O(n)、线性对数阶 O(nlogn)、平方阶 O(n<sup>2</sup>)、指数阶 O(2<sup>n</sup>) 等。

![Linked List](https://upload.wikimedia.org/wikipedia/commons/7/7e/Comparison_computational_complexity.svg)

注：具体的算法分析过程将会在各算法中详细说明。

## 数组

**数组**（Array）是一种分配一块**连续**内存空间存储**相同类型**元素的线性表数据结构。

优点是允许通过索引（下标）随机访问元素。时间复杂度为 O(1)。

那么数组为什么能够快速随机访问到元素呢？因为计算机可将数组索引通过以下寻址公式映射为真实的内存地址，从而直接访问到存储在内存中的数据。

```
数组元素内存地址 = 首个数组内存地址 + 索引 * 数据类型大小
```

缺点是插入和删除操作低效。

在数组末尾插入或删除元素时，其时间复杂度为 O(1)；在数组开头插入元素时，如果数组是有序的，首先需要将数组所有元素往后移动一位，然后将插入元素插入到数组第一位，时间复杂度为 O(n)。如果数组是无序的，则可将插入位置的元素搬移到最后一位，然后将新元素插入到之前元素搬移留下的位置，时间复杂度为 O(1)。

在数组开头删除元素时，首先需要将删除元素删除，然后将删除元素后面的所有元素都往前移动一位，时间复杂度为 O(n)。同时删除很多元素时，为避免大量重复搬移，我们可以标记需要删除的元素，当数组没有更多空间存储数据时，才真正删除所以被标记的元素，这样删除的效率将会得到提升。

插入和删除任意位置元素的平均时间复杂度为 O(n)。

数组作为最基础的原始数据结构之一，可以用来实现栈、队列、哈希表等其他高级的数据结构，也可以用来实现编程语言中的数组数据类型。

在 JavaScript 语言中，数组数据类型的底层实现原理并未遵循数组数据结构的定义，而是根据存储数据的不同，选择不同的实现方式。如果数组储存的是相同类型的数据，会分配一块连续的内存空间来存储数据；如果是不同类型的数据，并不会连续存储在内存中，而是使用类似哈希表的结构存储不同类型的数据。

以下是关于数组的必知必会代码实现。

1. 实现一个支持动态扩容的数组

``` js
class DynamicArray {
  constructor(n) {
    this.arr = new Array(n).fill(0);
    this.size = n;
    this.length = 0;
  }
  insert(v) {
    if (this.length >= this.size) { // 扩容
      const temp = this.arr;
      this.size *= 2;
      this.arr = new Array(this.size).fill(0);
      for (let i = 0; i < temp.length; i++) {
          this.arr[i] = temp[i];
      }
    } 
    
    this.arr[this.length++] = v;
  }
}

const arr = new DynamicArray(10);
for (let i = 1; i <= 12; i++) {
  arr.insert(i);
}
```

2. 实现一个大小固定的有序数组，支持动态增删改操作

``` js
class FixedOrderedArray {
  constructor(capacity) {
    this.arr = new Array(capacity).fill(0);
    this.count = 0;
    this.size = capacity;
  }
  insert(element) {
    if (this.count >= this.size) return -1; // 处理越界
    
    // 保证有序性
    let j = this.count;
    for (let i = 0; i < j; i++) {
      if (this.arr[i] > element) {
        let temp = element;
        while (i < j) {
          this.arr[j] = this.arr[j - 1];
          j--;
        }
        this.arr[j] = temp;
        this.count++;
      }
    }

    if (this.count <= j)
      this.arr[this.count++] = element;
  }
  remove(element) {
    for (let i = 1; i <= this.count; i++) {
      if (this.arr[i - 1] === element) {
        while (i < this.count) {
          this.arr[i - 1] = this.arr[i];
          i++;
        }
        this.arr[i - 1] = 0;
        this.count--;
      }
    }
  }
  modify(index, element) {
    if (index < 0 || index >= this.count) return -1; // 处理越界
    this.arr[index] = element;

    // 保证有序性
    for (let i = index + 1; i < this.count; i++) {
      if (this.arr[i - 1] > this.arr[i]) {
        [this.arr[i - 1], this.arr[i]] = [this.arr[i], this.arr[i - 1]];
      }
    }
  }
}

const orderedArray = new FixedOrderedArray(5);
orderedArray.insert(2);    // => [2, 0, 0, 0, 0]
orderedArray.insert(4);    // => [2, 4, 0, 0, 0]
orderedArray.insert(1);    // => [1, 2, 4, 0, 0]
orderedArray.insert(5);    // => [1, 2, 4, 5, 0]
orderedArray.insert(3);    // => [1, 2, 3, 4, 5]
orderedArray.insert(6);    // => [1, 2, 3, 4, 5]
orderedArray.remove(3);    // => [1, 2, 4, 5, 0]
orderedArray.remove(1);    // => [2, 4, 5, 0, 0]
orderedArray.remove(5);    // => [2, 4, 0, 0, 0]
orderedArray.modify(0, 6); // => [4, 6, 0, 0, 0]
```

3. 实现两个有序数组合并为一个有序数组

``` js
function merge(arr1, arr2) {
  const m = arr1.length, n = arr2.length;
  const arr = [];
  let count = 0;

  let i = 0, j = 0;
  while (i < m || j < n) {
    if (arr1[i] === undefined) {
      arr[count++] = arr2[j];
      j++;
    } else if (arr2[j] === undefined) {
      arr[count++] = arr1[i];
      i++;
    } else if (arr1[i] <= arr2[j]) {
      arr[count++] = arr1[i];
      i++;
    } else {
      arr[count++] = arr2[j];
      j++;
    }
  }

  return arr;
}
    
const arr1 = [1,3,5], arr2 = [0,2,4,6];
merge(arr1, arr2); // => [0,1,2,3,4,5,6]
```

## 链表

**链表**（Linked List）是一种通过**指针**(或引用)将**节点**（零散内存块）串联起来的线性表数据结构。链表的 `head` 属性指向链表的第一个节点，如果 `head` 指向 null，则为空链表。

数组的线性顺序由**下标**决定，而链表的线性顺序由**指针**决定。

链表的优点是插入和删除节点的操作动态高效，缺点则是每个节点的指针都需要额外存储空间，而且访问节点元素的时间复杂度是线性的。

链表有很多种类型，包括单向链表、双向链表、循环链表等。

可以通过**哨兵**来简化处理空链表边界条件的处理，从而简化链表代码。接下来将介绍单向链表和双向链表两种链表的原理及使用哨兵优化的实现。

### 单向链表

单向链表的每个节点由**数据元素**（data）和**后继指针**（next）指针组成。链表的 `head` 属性指向第一个节点为**头**（head）节点，节点后继指针指向 null 的节点为**尾**（tail）节点。

![Linked List](./images/algorithm/linked-list.png)

#### 单向链表结构

单向链表的节点结构。

``` js
class Node {
  constructor(data, next = null) {
    this.data = data;
    this.next = next;
  }
}
```

单向链表的结构包括一个作为指向头节点引用的 `head` 属性，以及一个用于记录链表节点总数 `size` 属性。

``` js
class LinkedList {
  constructor() {
    this.head = new Node('dummy');
    this.size = 0;
  }
}
```

#### 查找操作

``` js
find(data) {
  let curr = this.head.next;
  let i = 0;
  while (curr) {
    if (curr.data === data) return i;
    curr = curr.next;
    i++;
  }
  return -1;
}
```

查找操作的最好情况时间复杂度为 O(1)，最坏情况时间复杂度为 O(n)，平均情况时间复杂度为 O(<del>2/</del>n)。

#### 插入操作

单向链表的**插入**操作包括：
  - 从链表链表头部插入节点；
  - 从链表尾部插入节点；
  - 从任意位置插入节点。

![Linked List Insert](./images/algorithm/linked-list-insert.png)

单向链表插入操作的思路是先将插入节点的 next 指针指向当前节点的后继节点，然后再将当前节点的 next 指针指向插入节点。

由于插入操作的逻辑存在 code redundancy，所以可以将从链表头部和尾部插入节点操作直接 delegate 到任意位置插入节点操作中。

1. 从链表头部插入节点

``` js
prepend(data) {
  this.insert(0, data);
}
```

2. 从链表尾部插入节点

``` js
append(data) {
  this.insert(this.size, data);
}
```

3. 任意位置插入节点

``` js{8-9}
insert(index, data) {
  if (index < 0 || index > this.size) return false;
  const node = new Node(data);
  let curr = this.head;
  while (index-- > 0) {
    curr = curr.next;
  }
  node.next = curr.next;
  curr.next = node;
  this.size++;
  return true;
}
```

单向链表从链表头部插入节点操作的时间复杂度为 O(1)，从链表尾部和任意位置插入节点操作由于需要遍历链表节点，所以时间复杂度为 O(n)。

遍历操作如下：

``` js
get(index) {
  if (index < 0 || index >= this.size) return -1;
  let curr = this.head;
  while (index-- >= 0) {
    curr = curr.next;
  }
  return curr.data;
}
```

#### 删除操作

单向链表的**删除**操作包括：

  - 删除链表头节点；
  - 删除链表尾节点；
  - 删除任意位置节点；
  - 删除值等于指定值的节点。

![Linked List Remove](./images/algorithm/linked-list-remove.png)

单向链表删除节点的思路是先找到删除节点的前驱节点，然后将前驱节点的 next 指针指向删除节点的后继节点。

与插入操作同理，我们也可以将删除链表头节点和尾节点的操作 delegate 到删除任意位置节点操作中。

1. 删除链表头节点

``` js
removeHead() {
  this.remove(0);
}
```

2. 删除链表尾节点

``` js
removeTail() {
  this.remove(this.size - 1);
}
```

3. 删除任意位置节点

``` js {7}
remove(index) {
  if (index < 0 || index >= this.size) return false;
  let curr = this.head;
  while (index-- > 0) {
    curr = curr.next;
  }
  curr.next = curr.next.next;
  this.size--;
  return true;
}
```

4. 删除值等于指定值的节点

``` js {6}
removeVal(data) {
  let isDeleted = false;
  let curr = this.head;
  while (curr.next) {
    if (curr.next.data === data) {
      curr.next = curr.next.next;
      this.size--;
      isDeleted = true;
    } else {
      curr = curr.next;
    }
  }
  return isDeleted;
}
```

删除链表头节点操作的时间复杂度为 O(1)，而删除链表尾部节点、删除任意位置节点和删除值等于指定值的节点操作由于需要遍历链表节点，所以时间复杂度为 O(n)。

单向链表在指定节点前插入和删除指定节点的操作并不容易实现，需要 O(n) 的时间复杂度，那么有没有其他链表数据结构能简单高效在 O(1) 的时间复杂度内实现以上操作呢？

### 双向链表

双向链表的每个节点由**数据元素**（data）、**前驱指针**（prev）和**后继指针**（next）构成。如果节点的 prev 指针为 null，则该节点为双向链表的头节点、如果节点的 next 指针为 null，则该节点为双向链表的尾节点。

![Doubly Linked List](./images/algorithm/doubly-linked-list.png)

#### 双向链表结构

双向链表的节点结构。

``` js
class Node {
  constructor(data, prev = null, next = null) {
    this.data = data;
    this.prev = prev;
    this.next = next;
  }
}
```

双向链表的链表结构由指向头节点的 `head`、指向尾节点的 `tail` 和记录双向链表节点数量的 `size` 属性组成。我们为双向链表的头尾节点增加两个哨兵节点，并让这两个哨兵节点首尾相连。

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

#### 查找操作

``` js
get(index) {
  if (index < 0 || index >= this.size) return -1;
  let curr = this.head;
  if (index + 1 < this.size - index) {
    for (let i = 0; i < index + 1; i++) {
      curr = curr.next;
    }
  } else {
    curr = this.tail;
    for (let i = 0; i < this.size - index; i++) {
      curr = curr.prev;
    }
  }
  return curr;
}
```

尽管链表查找的时间复杂度为 O(n)，不过在双向链表中，我们可以根据节点所在位置决定双向链表遍历方向，如果查找节点所在位置小于双向链表一半的长度，则从双向链表头部开始遍历后继节点，否则从双向链表尾部开始遍历前驱节点，最终返回当前位置所在节点。这样，我们可以将双向链表查找操作的时间复杂度优化到 O(n<del>/2</del>)。

#### 插入操作

双向链表的插入操作主要包括：

  - 从双向链表头部、尾部和任意位置插入节点；
  - 在指定节点前插入节点。

双向链表插入操作的思路是首先将插入节点的 prev 和 next 指针指向它的前驱节点和后继节点，然后将后继节点的 prev 指针指向插入节点，最后将插入节点 prev 指针指向前驱结点。

![Doubly Linked List Insert](./images/algorithm/doubly-linked-list-insert.png)

1. 从双向链表头部插入节点

``` js
prepend(data) {
  this.insert(0, data);
}
```

2. 从双向链表尾部插入节点

``` js
append(data) {
  this.insert(this.size, data);
}
```

3. 任意位置插入节点

``` js {27-30}
insert(index, data) {
  if (index < 0 || index > this.size) return false;
  let precursor;
  let successor;
  if (index === 0) {
    precursor = this.head;
    successor = this.head.next;
  } else if (index === this.size) {
    precursor = this.tail.prev;
    successor = this.tail;
  } else {
    if (index < this.size - index) {
      precursor = this.head;
      for (let i = 0; i < index; i++) {
        precursor = precursor.next;
      }
      successor = precursor.next;
    } else {
      successor = this.tail;
      for (let i = 0; i < this.size - index; i++) {
        successor = successor.prev;
      }
      precursor = successor.prev;
    }
  }
  const node = new Node(data);
  node.next = successor;
  precursor.next = node;
  successor.prev = node;
  node.prev = precursor;
  this.size++;
  return true;
}
```

双向链表从头部和尾部插入的时间复杂度为 O(1)，因为它们可以直接使用头节点和尾节点进行插入操作。而在任意位置插入节点操作由于需要找到插入位置而遍历节点所以时间复杂度为 O(n)，同样可以根据双向链表查找操作的思路优化遍历时间。

- 在指定节点前插入节点

``` js {2-5}
insertBefore(node1, node2) {
  node2.prev = node1.prev;
  node2.next = node1;
  node1.prev.next = node2;
  node1.prev = node2;
  this.size++;
  return true;
}
```

由于事先知道插入节点的前驱节点，所以在指定节点前插入节点的时间复杂度为 O(1)。

#### 删除操作

双向链表的删除操作主要包括：

  - 删除链表头节点；
  - 删除链表尾节点；
  - 删除指定节点。

双向链表删除操作的思路是将删除节点前驱节点的 next 指针指向删除节点的后继节点，然后将删除节点后继节点的 prev 指针指向删除节点的前驱节点。

![Doubly Linked List Remove](./images/algorithm/doubly-linked-list-remove.png)

1. 删除链表头节点

``` js
removeHead() {
  this.remove(this.head.next);
}
```

2. 删除链表尾节点

``` js
removeTail() {
  this.remove(this.tail.prev)
}
```

3. 删除指定节点

``` js {3-4}
remove(node) {
  if (this.size === 0) return false;
  node.prev.next = node.next;
  node.next.prev = node.prev;
  this.size--;
  return true;
}
```

在双向链表的删除操作中，删除链表头节点、尾节点和指定节点的时间复杂度为 O(1)。

双向链表除了以上插入和删除操作外，在指定值前/后插入节点或者删除值等于指定值的节点时，由于在插入和删除之前需要遍历链表，所以需要 O(n) 的时间复杂度。

### 应用场景

- LRU 缓存淘汰算法

LRU（Least Recently Used，最近最少使用）缓存淘汰算法。

原理是访问数据时：

- 如果该数据不存在于缓存中：
  - 如果缓存未满，则将该数据插入到缓存头部；
  - 如果缓存已满，则将删除缓存末尾数据，然后将该数据插入到缓存头部；
- 如果该数据存在于缓存中，则将数据从原始位置挪动到缓存头部。

可以使用双向链表或者哈希表实现该算法。

## 栈

**栈**（Stack）是一种**后进先出**（LIFO, Last In First Out）的线性表数据结构或者抽象数据类型。类似于一个弹夹，只能在弹夹头部（栈顶）压入和弹出子弹。

栈的操作主要包括**压入**（push）和**弹出**（pop）操作，这两个操作的时间复杂度为 O(1)。

栈可以基于数组和链表数据结构实现。

### 基于数组实现栈

基于数组实现的栈结构包括一个保存栈顶元素的 `top` 指针、一个存储栈元素的 `items` 数组和指定栈容量的 `size` 属性。

``` js
class ArrayBasedStack {
  constructor(capacity) {
    this.top = 0;
    this.items = new Array(capacity);
    this.size = capacity;
  }
}
```

1. 基于固定大小数组的定容栈

压入操作将元素压入栈顶同时将 `top` 指针指向新元素，如果当前栈已满，将不再压入数据。

``` js
push(data) {
  if (this.isFull()) return;
  this.items[this.top++] = data;
}
```

弹出操作将返回栈顶元素同时将 `top` 指针指向已弹出元素的下一个元素，如果当前栈为空，执行弹出操作将不再弹出数据。

``` js
pop() {
  if (this.isEmpty()) return;
  return this.items[--this.top];
}
```

压入和弹出操作需要考虑上溢和下溢情况，时间复杂度为 O(1)。

2. 基于动态数组的栈

由于我们使用的是数组数据结构，这就意味着我们需要事先指定栈的容量。如果指定的容量太小，当栈满后则无法将数据压入栈中；如果指定的容量太大，当栈内元素非常少甚至为空时将会浪费大量存储空间。我们可以使用动态数组来解决定容栈栈空间固定的问题，并且彻底删除已弹出的栈元素但还保存在动态数组中的元素。

在压入操作中，如果栈满，我们首先把原数组扩容两倍，并依次将元素搬移到扩容数组中，最后进行入栈操作。

``` js
push(data) {
  if (this.isFull()) {
    this.size *= 2;
    const temp = new Array(this.size);
    for (let i = 0; i < this.top; i++) {
      temp[i] = this.items[i];
    }
    this.items = temp;
  }
  this.items[this.top++] = data;
}
```

由于扩容需要 O(n) 的时间搬移数据，所以基于动态数组实现栈的压入操作最好情况时间复杂为 O(1)，最坏情况时间复杂度为 O(n)，而通过均摊分析将搬移数据所需时间均摊给每次 O(1) 的压入操作，得到平均情况时间复杂度为 O(1)。

在弹出操作中，我们首先进行弹出操作，并把栈顶元素从动态数组中删除，避免弹出元素占用数组空间问题；然后如果当前栈内元素数量为数组的四分之一时，我们将数组缩容到原来的一半；最后将弹出操作前记录的栈顶元素返回。

``` js
pop() {
  if (this.isEmpty()) return;
  this.top--;
  const item = this.items[this.top];
  delete this.items[this.top];
  if (this.top > 0 && this.top === Math.floor(this.items.length / 4)) {
    this.items.length = Math.floor(this.items.length / 2);
  }
  return item;
}
```

基于动态数组实现栈的弹出操作需要考虑下溢情况，时间复杂度为 O(1)。

以下是基于数组实现栈的其他操作：

``` js
peek() {
  return this.items[this.top - 1];
}
isEmpty() {
  return this.top === 0;
}
isFull() {
  return this.top === this.size;
}
```

基于动态数组实现栈的优点是压入和弹出操作可以根据栈空间使用情况动态扩容和缩容，但压入操作的最坏情况时间复杂度为 O(n)。

### 基于链表实现栈

基于链表实现栈的结构同样需要一个 `top` 属性记录当前栈元素数量，只不过使用单链表来存储栈元素。

``` js
class LinkedListBasedStack {
  constructor() {
    this.top = 0;
    this.head = null;
  }
}
```

压入和弹出操作思路是从链表头部插入和删除元素并更新 `top` 指针即可，节点结构请参考单向链表节点结构。

``` js
push(data) {
  const node = new Node(data);
  if (this.head) node.next = this.head;
  this.head = node;
  this.top++;
}
pop() {
  if (this.isEmpty()) return;
  let val = this.peek();
  this.head = this.head.next;
  this.top--;
  return val;
}
```

基于链表实现的栈压入和弹出操作时间复杂度为 O(1)。

基于链表实现的栈的其他操作：

``` js
peek() {
  return this.head.data;
}
isEmpty() {
  return this.top === 0;
}
```

基于链表实现栈的优点是可以灵活动态的将数据压入和弹出，但创建链表节点需要额外存储空间存放节点指针。

### 应用场景

- 函数调用
- 算数表达式求值
- 括号匹配
- 浏览器的前进后退功能
- 递归
- 回溯
- 深度优先搜索

## 队列

**队列**（Queue）是一种**先进先出**（FIFO, First-In-First-Out）的线性表数据结构或者抽象数据类型。类似于排队买票，依次从**队尾**（tail）排队等待，从**队头**（head）取票。

队列主要包括**入队**（enqueue）和**出队**（dequeue）操作，这两个操作的时间复杂度为 O(1)。

队列可以基于数组和链表实现。

### 基于数组实现队列

以下是使用定容数组实现的队列：

``` js
class ArrayBasedQueue {
  constructor(capacity) {
    this.items = new Array(capacity);
    this.size = capacity;
    this.head = 0;
    this.tail = 0;
  }
  enqueue(data) {
    if (this.isFull()) return;
    this.items[this.tail++] = data;
  }
  dequeue() {
    if (this.isEmpty()) return;
    return this.items[this.head++];
  }
  isEmpty() {
    return this.head === this.tail;
  }
  isFull() {
    return this.tail === this.size;
  }
}
```

基于定容数组实现的队列入队和出队需要考虑溢出和下溢情况。入队时将数据插入到 `tail` 指针指向的位置，并将 `tail` 指针向右移动一位；出队时也是将 `head` 指针向右移动一位。

如果 `tail` 指针移动到数组最右边，即便队列还有空间或者队列为空也无法插入数据。这就需要通过数据搬移来利用剩余空间，这将导致入队操作的时间复杂度为 O(n)。

### 基于链表实现队列

也可以基于单向链表和双向链表实现队列，以下是使用单向链表实现的队列，节点结构请参考单向链表节点结构。

``` js
class LinkedListBasedQueue {
  constructor() {
    this.head = null;
    this.tail = null;
    this.size = 0;
  }
  enqueue(data) {
    const node = new Node(data);
    if (!this.tail) {
      this.head = node;
      this.tail = node;
    } else {
      this.tail.next = node;
      this.tail = this.tail.next;
    }
    this.size++;
  }
  dequeue() {
    if (!this.head) return;
    const val = this.head.data;
    this.head = this.head.next;
    if (!this.head) this.tail = null;
    this.size--;
    return val;
  }
}
```

使用单向链表的思路是在原链表的基础上添加一个指向尾节点的 `tail` 指针即可，入队操作通过 `tail` 指针在链表尾部添加元素，出队操作则是将链表头节点指向其后继节点即可，出队需考虑下溢情况。

### 循环队列

由于基于定容数组实现的队列在 `tail` 指针移动到数组最右边时需要搬移数据，这导致入队操作的时间复杂度为 O(n)，可使用取余运算模拟循环队列在避免数据搬移的情况下提高剩余存储空间的利用率，将入队操作的时间复杂度优化到 O(1)。

1. 基于数组实现循环队列

``` js {11,16,23}
class ArrayCircularQueue {
  constructor(capacity) {
    this.items = new Array(capacity);
    this.size = capacity;
    this.head = 0;
    this.tail = 0;
  }
  enqueue(data) {
    if (this.isFull()) return;
    this.items[this.tail] = data;
    this.tail = (this.tail + 1) % this.size;
  }
  dequeue() {
    if (this.isEmpty()) return;
    const val = this.items[this.head];
    this.head = (this.head + 1) % this.size;
    return val;
  }
  isEmpty() {
    return this.head === this.tail;
  }
  isFull() {
    return this.head === (this.tail + 1) % this.size;
  }
}
```

基于数组实现的循环队列会浪费一个储存空间来处理队列为空和队满的条件。

2. 基于链表实现循环队列

以下是基于单向链表实现的循环队列，创建节点请参考单向链表节点结构。

``` js
class LinkedListCircularQueue {
  constructor() {
    this.head = null;
    this.tail = null;
    this.size = 0;
  }
  enqueue(data) {
    const node = new Node(data);
    if (!this.tail) this.head = node; // 链表为空
    else this.tail.next = node;
    this.tail = node;
    this.tail.next = this.head;
    this.size++;
  }
  dequeue() {
    if (!this.head) return; // 链表为空
    const val = this.head.data;
    this.head = this.head.next;
    this.size--;
    return val;
  }
}
```

入队操作需要将新节点的 `next` 指针指向头节点，出队操作只需删除头节点即可。

### 双端队列

双端队列可以在两端进行入队和出队操作。

以下是基于双向链表实现的双端队列，创建节点请参考双向链表节点结构。

``` js
class DoublyEndedQueue {
  constructor() {
    this.head = null;
    this.tail = null;
    this.size = 0;
  }
  push(data) { // 后端入队
    const node = new Node(data);
    if (!this.tail) { // 链表为空
      this.head = node;
      this.tail = node;
    } else {
      this.tail.next = node;
      node.prev = this.tail;
      this.tail = node;
    }
    this.size++;
  }
  unshift(data) { // 前端入队
    const node = new Node(data);
    if (!this.head) { // 链表为空
      this.head = node;
      this.tail = node;
    } else {
      node.next = this.head;
      this.head.prev = node;
      this.head = this.head.prev;
    }
    this.size++;
  }
  pop() { // 后端出队
    if (!this.tail) return;
    const val = this.tail.data;
    if (this.head === this.tail) { // 链表只有一个节点
      this.head = null;
      this.tail = null;
    } else {
      this.tail = this.tail.prev;
      this.tail.next = null;
    }
    this.size--;
    return val;
  }
  shift() { // 前端出队
    if (!this.head) return;
    const val = this.head.data;
    if (this.head === this.tail) { // 链表只有一个节点
      this.head = null;
      this.tail = null;
    } else {
      this.head = this.head.next;
      this.head.prev = null;
    }
    this.size--;
    return val;
  }
}
```

### 应用场景

- 浏览器任务队列
- 广度优先搜索

## 递归 & 分治

**递归**（Recursion）是一种解决计算问题的方法，通过不断直接过间接的调用自身以解决若干子问题。递归是分治和深度优先搜索等高级算法的基础。

递归可以用来解决阶乘和斐波那契数列计算问题。

### 阶乘

计算 n 的阶乘（n!），就是计算从 1 ~ n 的乘积。

- 递归实现

``` js
function factorial(n) {
  if (n <= 1) return 1;
  return n * factorial(n - 1);
}
```

- 迭代实现

``` js
function factorial(n) {
  let res = 1;
  for (let i = 2; i <= n; i++) {
    res *= i;
  }
  return res;
}
```

### 斐波那契数列

斐波那契数列是由 0, 1, 1, 2, 3, 5, 8, 13, 21, 34, 55 等数组成的序列。从 0 和 1 开始，每个数等于前两个数之和。

- 递归实现

``` js
function fibonacci(n) {
  if (n === 0 || n === 1) return n;
  return fibonacci(n - 1) + fibonacci(n - 2);
}
```

- 迭代实现

``` js
function fibonacci(n) {
  if (n === 0 || n === 1) return n;
  let num2 = 0;
  let num1 = 1;
  let res = 0;
  while (n-- > 1) {
    res = num1 + num2;
    num2 = num1;
    num1 = res;
  }
  return res;
}
```

通过递归解决上述两个问题我们可以看出，递归代码简洁优雅、易懂，但如果递归的比较深，可能会出现堆栈溢出问题，在斐波那契数列问题中出现了大量重复计算问题，可以使用记忆化来解决。

**分治算法**（Divide and conquer，也称分而治之）是一种算法设计方法。其核心思想是（递归的）将原问题**分解**为多个规模更小且类似于原问题的子问题，直到子问题简单到可以直接**解决**为止，然后将子问题的解**合并**成原问题的解。分治算法是归并排序和快速排序等高级算法的基础。

## 排序算法

**排序算法**（Sorting algorithm）是一种将一组数据按照特定顺序排列的算法。

常见的排序算法包括：冒泡排序、插入排序、选择排序、快速排序、归并排序、桶排序、计数排序和基数排序等。

在分析排序算法时，需要从以下几个方面考虑：

- 执行效率。交换和比较的次数、数据的排序程度和数据规模。

- 内存消耗。读写数组次数和是否原地排序。

- 稳定性。数据中值相等的元素在排序后先后顺序是否改变。

### 冒泡排序

**冒泡排序**（Bubble sort）是一种基于比较的简单排序算法，其思想是将相邻两个元素比较交换到未排序区间最右侧。

![Bubble Sort](https://upload.wikimedia.org/wikipedia/commons/c/c8/Bubble-sort-example-300px.gif)

``` js
function bubbleSort(array) {
  const n = array.length;
  for (let i = 0; i < n; i++) {
    let swapped = false;
    for (let j = 0; j < n - i - 1; j++) {
      if (array[j] > array[j + 1]) {
        [array[j], array[j + 1]] = [array[j + 1], array[j]];
        swapped = true;
      }
    }
    if (!swapped) break;
  }
  return array;
}
bubbleSort([6, 5, 3, 1, 8, 7, 2, 4]); // => [1, 2, 3, 4, 5, 6, 7, 8]
```

冒泡排序的最好情况时间复杂度为 O(n)、平均和最坏情况时间复杂度为 O(n²)，冒泡排序比较和交换次数为 n²。冒泡排序是稳定原地排序算法，其空间复杂度为 O(1)。

### 选择排序

**选择排序**（Selection sort）是一种基于比较的简单排序算法，其思想是将未排序区间的最小元素与未排序区间的第一个元素交换。

![Selection sort](https://upload.wikimedia.org/wikipedia/commons/9/94/Selection-Sort-Animation.gif)


``` js
function selectionSort(array) {
  const n = array.length;
  for (let i = 0; i < n - 1; i++) {
    let min = i;
    for (let j = i + 1; j < n; j++) {
      if (array[j] < array[min]) min = j;
    }
    if (min !== i) [array[i], array[min]] = [array[min], array[i]];
  }
  return array;
}
selectionSort([8, 5, 2, 6, 9, 3, 1, 4, 0, 7]); // => [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]
```

选择排序的最好、最坏、平均情况时间复杂度都为 O(n²)。选择排序比较次数为 n²，而**交换次数为 n**。选择排序是原地非稳定排序算法，其空间复杂度为 O(1)。

### 插入排序

**插入排序**（Insertion sort）是一种基于比较的简单排序算法，其思想是从未排序列表中取出第一个元素插入到已排序列表合适位置的简单排序算法。

![insertion-sort](https://upload.wikimedia.org/wikipedia/commons/0/0f/Insertion-sort-example-300px.gif)


``` js
function insertionSort(array) {
  const n = array.length;
  for (let i = 1; i < n; i++) {
    let temp = array[i];
    let j = i;
    while (j > 0 && array[j - 1] > temp) {
      array[j] = array[j - 1];
      j--;
    }
    array[j] = temp;
  }
  return array;
}
insertionSort([6, 5, 3, 1, 8, 7, 2, 4]); // => [1, 2, 3, 4, 5, 6, 7, 8]
```

插入排序最好情况时间复杂度为 O(n)，平均和最坏情况时间复杂度为 O(n²)。插入排序在小规模数据中的性能要比冒泡排序好。插入排序是稳定原地排序算法，其空间复杂度为 O(1)。

### 归并排序

**归并排序**（Merge sort）是一种基于比较的高效排序算法。归并排序利用分治算法，其思想是（递归的）将未排序数组分解成多个子数组，直到子数组中只有一个元素为止，最后将子数组合并为较大的数组，直到只剩下一个排序数组为止。

![Merge-sort](https://upload.wikimedia.org/wikipedia/commons/c/cc/Merge-sort-example-300px.gif)

归并排序包括自上而下和自下而上两种实现。

#### 自上而下归并排序

自上而下归并排序的思路是递归的将未排序数组分为两个子数组，先排序左边子数组，然后排序右边子数组，最后将两个子数组合并为一个数组。

归并排序的合并操作可以借助两个数组实现，也可以借助一个数组实现。

借助两个辅助数组合并的思路是将未排序的数组一分为二存储到两个临时数组中，从左到右依次比较这两个数组的元素，根据元素的大小关系将元素放回原数组中。

``` js
function merge(array, lo, mid, hi) {
  const n1 = mid - lo + 1, n2 = hi - mid;
  const arr1 = [], arr2 = [];
  for (let i = 0; i < n1; i++) {
    arr1[i] = array[lo + i];
  }
  for (let j = 0; j < n2; j++) {
    arr2[j] = array[mid + j + 1];
  }
  arr1[n1] = Infinity;
  arr2[n2] = Infinity;
  let i = 0, j = 0;
  for (let k = lo; k <= hi; k++) {
    if (arr1[i] <= arr2[j]) {
      array[k] = arr1[i];
      i += 1;
    } else {
      array[k] = arr2[j];
      j += 1;
    }
  }
}
function topDownMergeSort(array) {
  const sort = (lo, hi) => {
    if (lo >= hi) return;
    const mid = lo + Math.floor((hi - lo) / 2);
    sort(lo, mid);
    sort(mid + 1, hi);
    merge(array, lo, mid, hi);
  };
  sort(0, array.length - 1);
  return array;
}
topDownMergeSort([6, 5, 3, 1, 8, 7, 2, 4]); // => [1, 2, 3, 4, 5, 6, 7, 8]
```

借助一个额外数组合并的思路是将数组的所有元素批量复制到一个辅助数组中，然后将合并结果放回原数组中。

``` js
function merge(array, lo, mid, hi, temp) {
  for (let k = lo; k <= hi; k++) {
    temp[k] = array[k];
  }
  let i = lo, j = mid + 1;
  for (let k = lo; k <= hi; k++) {
    if (i > mid) array[k] = temp[j++];
    else if (j > hi) array[k] = temp[i++];
    else if (temp[i] > temp[j]) array[k] = temp[j++];
    else array[k] = temp[i++];
  }
}
function topDownMergeSort(array) {
  const n = array.length;
  const temp = new Array(n).fill(0);
  const sort = (lo, hi) => {
    if (lo >= hi) return;
    const mid = lo + Math.floor((hi - lo) / 2);
    sort(lo, mid);
    sort(mid + 1, hi);
    merge(array, lo, mid, hi, temp);
  };
  sort(0, n - 1);
  return array;
}
topDownMergeSort([6, 5, 3, 1, 8, 7, 2, 4]); // => [1, 2, 3, 4, 5, 6, 7, 8]
```

#### 自下而上归并排序

自下而上归并排序的思路是通过迭代，先两两合并，然后四四合并，然后八八合并，直到只有一个排序数组为止。

``` js
function bottomUpMergeSort(array) {
  const n = array.length;
  const temp = new Array(n).fill(0);
  for (let i = 1; i < n; i *= 2) {
    for (let j = 0; j < n; j += i * 2) {
      merge(array, j, j + i - 1, Math.min(j + 2 * i - 1, n - 1), temp);
    }
  }
  return array;
}
bottomUpMergeSort([6, 5, 3, 1, 8, 7, 2, 4]); // => [1, 2, 3, 4, 5, 6, 7, 8]
```

归并排序的最好、平均和最坏情况时间复杂度为 O(nlogn)。归并排序是稳定非原地排序算法，因为在合并过程中需要借助额外存储空间，其空间复杂度为 O(n)。

### 快速排序

**快速排序**（Quick sort）是一种基于比较应用广泛的高效排序算法。快速排序利用了分治算法，其思想是从数组中**选择**一个主元元素（povit element），根据该元素与其他元素的大小关系将数组的其他元素**划分**为两个子数组；然后递归的对子数组进行排序，重复以上两步，直到子数组只包含一个元素为止，则该数组完全有序。

![Quick-sort](https://upload.wikimedia.org/wikipedia/commons/9/9c/Quicksort-example.gif)

选择主元有很多方式，最简单的一种是选择数组最左边或最右边元素，另一种是随机选择一个元素或选择中间元素。划分有 Lomuto 和 Hoare 两种思路。

``` js
function partition(array, lo, hi) {
  const povit = array[hi];
  let i = lo;
  for (let j = lo; j < hi; j++) {
    if (array[j] <= povit) {
      [array[i], array[j]] = [array[j], array[i]];
      i += 1;
    }
  }
  [array[i], array[hi]] = [array[hi], array[i]];
  return i;
}
function quickSort(array) {
  const sort = (lo, hi) => {
    if (lo >= hi) return;
    const mid = partition(array, lo, hi);
    sort(lo, mid - 1);
    sort(mid + 1, hi);
  };
  sort(0, array.length - 1);
  return array;
}
quickSort([2, 8, 7, 1, 3, 5, 6, 4]); // => [1, 2, 3, 4, 5, 6, 7, 8]
```

Lomuto 划分选择数组最右边元素作为主元，并围绕它来划分子数组。其中维护了 i 和 j 两个索引，通过遍历数组，将小于主元的元素放到 lo 到 i - 1 区间中，将等于或大于主元的元素放到 i 到 j 区间中。循环结束后，将主元交换到两个区间之间。

``` js
function partition(array, lo, hi) {
  const mid = Math.floor((lo + hi) / 2);
  const povit = array[mid];
  let i = lo, j = hi;
  while (true) {
    while (array[i] < povit) i++;
    while (array[j] > povit) j--;
    if (i >= j) return j;
    [array[i], array[j]] = [array[j], array[i]];
    i++, j--;
  }
}
function quickSort(array) {
  const sort = (lo, hi) => {
    if (lo >= hi) return;
    const mid = partition(array, lo, hi);
    sort(lo, mid);
    sort(mid + 1, hi);
  };
  sort(0, array.length - 1);
  return array;
}
quickSort([6, 5, 3, 1, 8, 7, 2, 4]); // => [1, 2, 3, 4, 5, 6, 7, 8]
```

Hoare 划分选择数组中间元素作为主元来划分子数组。然后从左往右扫描直到找到第一个大于等于它的元素，再从右往左扫描直到找到第一个小于等于它的元素，最后交换这两个元素。如果两指针相遇，返回 j 即可。

Lomuto 划分紧凑且易于理解，Hoare 划分性能较好，平均交换次数减少了三倍。

对于简单的选择最左边或者最右边的元素作为主元，每层递归选择的主元划分的子数组可能会极度不平衡，最坏情况时间复杂度为 O(n²)。不过，可以使用随机抽样法或者三数取中法来选择一个划分平衡的主元，让期望运行时间达到 O(nlogn)。

实际应用中经常会出现存在大量重复数据的数组，可以使用三向切分的思路，将数组切成小于、等于和大于主元元素三个部分来进一步优化快速排序。

快速排序最好和平均情况时间复杂度为 O(nlogn)，最坏情况时间复杂度为 O(n²)。快速排序是一种原地不稳定的排序算法，空间复杂度为 O(logn)。

### 线性排序

以上排序算法都是基于**比较**的排序算法，这也决定了他们最好情况时间复杂度为 O(nlogn)，以下是基于**运算**的几种线性排序算法。它们是最好情况时间复杂度都是 O(n)，同样适合大规模数据排序，但不适合内存紧缺的场景，因为它们需要额外的内存空间来存储数据。

#### 计数排序

计数排序是根据小于某一元素的个数来确定元素位置的排序算法。

算法步骤：

1. 将数组 A 中元素出现的个数存储在一个数组 C 中；
2. 在 C 中原地算出小于某一元素的总和；
3. 从数组 A 的最后一位元素开始依次取出元素，并使用该元素在数组 C 中查找该元素排序的位置；
4. 根据数组 C 提供的位置，一次将数组 A 的元素添加到数组 B 中。

算法实现：

``` js
function countingSort(A) {
  let n = A.length;
  if (n <= 1) return;

  let max = A[0];
  for (let i = 0; i < n; i++) {
    if (max < A[i]) {
        max = A[i];
    }
  }

  let C = new Array(max + 1).fill(0);

  for (let i = 0; i < n; i++) {
    C[A[i]]++;
  }

  for (let i = 1; i <= max; i++) {
    C[i] = C[i - 1] + C[i];
  }

  let B = [];
  for (let i = n - 1; i >= 0; i--) {
    let index = C[A[i]] - 1;
    B[index] = A[i];
    C[A[i]]--;
  }
  return B;
}
countingSort([2, 5, 3, 0, 2, 3, 0, 3]);
```

计数排序的时间和空间复杂度都是 O(n + k)，如果 k = O(n)，则时间复杂度为 O(n)，它是一种稳定不原地的排序算法，是基数排序的基础。

#### 基数排序

基数排序是根据数组元素位数排序的排序算法，需要从低位到高位排序才能保证基数排序的稳定性。

算法实现：

``` js
function radixSort(arr) {
  const max = Math.max(...arr);
  let digit = `${max}`.length;
  let start = 1;
  let buckets = [];
  while(digit > 0) {
    start *= 10;
    for (let i = 0; i < arr.length; i++) {
      const index = arr[i] % start;
      !buckets[index] && (buckets[index] = []);
      buckets[index].push(arr[i]);
    }
    arr = [];
    for (let i = 0; i < buckets.length; i++) {
      buckets[i] && (arr = arr.concat(buckets[i]));
    }
    buckets = [];
    digit--;
  }
  return arr;
}
radixSort([1, 10, 100, 1000, 98, 67, 3, 28, 67, 888, 777])
```

基数排序的算法时间复杂度为 O(d(n+k))，d 是元素最大位数，n 是元素个数，k 是在某位数上可能的值，如果 d 为常数且 k = O(n)，则基数排序的时间复杂度是线性的。基数排序是一种稳定不原地的排序算法。

#### 桶排序

首先是将元素均匀、独立地分布在 n 个相同大小的区间内（桶），然后对桶内的元素排序，最后依次遍历每个桶的元素即可完成排序。

算法实现：

``` js
function bucketSort(arr, count = 5) {
  if (arr.length <= 1) return arr;

  const max = Math.max(...arr);
  const min = Math.min(...arr);
  const buckets = [];
  const size = Math.floor((max - min) / count) + 1;
  
  for (let i = 0; i < arr.length; i++) {
    const index = ~~(arr[i] / size); // Math.floor((arr[i] - min) / size)
    if (!buckets[index]) {
      buckets[index] = [];
      buckets[index].push(arr[i]);
    } else {
      let len = buckets[index].length - 1;
      while (len >= 0 && buckets[index][len] > arr[i]) {
        buckets[index][len + 1] = buckets[index][len];
        len--;
      }
      buckets[index][len + 1] = arr[i];
    }
  }

  let wrapBuckets = [];
  for (let i = 0; i < buckets.length; i++) {
    if (buckets[i]) wrapBuckets = wrapBuckets.concat(buckets[i]);
  }
  return wrapBuckets;
}
bucketSort([11, 9, 6, 8, 1, 3, 5, 1, 1, 0, 100], 10);
```

当数组内的元素均匀分布在桶内时，则它的时间复杂度为 O(n)。桶排序也是一种稳定不原地的排序算法。


一个成熟的工业级排序函数底层会使用几种排序算法和编程技巧来实现，那么，JavaScript 中的 `sort()` 函数的底层是怎样实现的呢？

## 二分查找

二分查找（Binary Search）也称折半查找，是一种在**有序数组**中查找某一特定元素的**搜索算法**。

二分查找的核心思想是将目标值与数组的中间元素比较。如果目标值与元素匹配，则返回该元素在数组中的位置；如果目标值大于当前元素，则在数组右半部分继续搜索；如果目标值小于当前元素，则在数组左半部分继续搜索。这样每次将搜索范围缩减一半，重复以上操作直到匹配到元素或者搜索范围缩减为空为止。

二分查找可以通过迭代和递归两种方式实现。

迭代示例代码：

``` js
function binarySearch(nums, target) {
  let lo = 0, hi = nums.length - 1;

  while (lo <= hi) {
    let mid = Math.floor((lo + hi) / 2);
    if (nums[mid] === target) return mid;
    if (nums[mid] < target) lo = mid + 1;
    else hi = mid - 1;
  }

  return -1;
}
binarySearch([1, 3, 5, 7, 9, 10, 11, 12, 14, 15, 19, 20], 4); // => -1
```

递归示例代码：

``` js
function binarySearch(nums, target) {
  const search = (lo, hi) => {
    if (lo > hi) return -1;

    let mid = Math.floor((lo + hi) / 2);
    if (nums[mid] === target) return mid;
    if (nums[mid] < target) return search(mid + 1, hi);
    return search(lo, mid - 1);
  }

  return search(0, nums.length - 1); 
}
binarySearch([1, 3, 5, 7, 9, 10, 11, 12, 14, 15, 19, 20], 20); // => 11
```

二分查找的时间复杂度为 O(logn)，空间复杂度为 O(1)。

为了防止两数相加出现溢出问题，可以使用 `lo + Math.floor((hi - lo) / 2)` 解决。当然也可以使用 `lo + (hi - lo >> 1)` 优化获取中间元素的性能。

二分查找虽然思想比较简单，但是具体实现细节比较复杂。以上算法只是一种简单的代码实现，二分查找还有其它变种。既有查找第一个/最后一个等于目标值的元素这类精准查找变种，也有查找下一个最小/最大的元素、查找小于目标值元素的数量/范围、查找最接近目标值的元素这类近似匹配变种，以下是部分变种及示例代码。

1. 查找第一个等于目标值的元素

``` js
const binarySearch = (nums, target) => {
  let lo = 0, hi = nums.length - 1;

  while (lo <= hi) {
    let mid = lo + (hi - lo >> 1);
    if (nums[mid] < target) lo = mid + 1;
    else hi = mid - 1;
  }

  return lo < nums.length && nums[lo] === target ? lo : - 1;
};
binarySearch([1, 1, 1, 1, 1, 1], 1); // => 0
binarySearch([0, 1, 2, 2, 2, 3], 2); // => 2
binarySearch([0, 1, 2, 3, 3, 3], 3); // => 3
binarySearch([0, 1, 2, 3, 3, 3], 4); // => -1
```

2. 查找最后一个等于目标值的元素

``` js
const binarySearch = (nums, target) => {
  let lo = 0, hi = nums.length - 1;

  while (lo <= hi) {
    let mid = lo + (hi - lo >> 1);
    if (nums[mid] > target) hi = mid - 1;
    else lo = mid + 1;
  }

  return hi >= 0 && nums[hi] === target ? hi : -1;
};
binarySearch([1, 1, 1, 1, 1, 1], 1); // => 5
binarySearch([0, 1, 2, 2, 2, 3], 2); // => 4
binarySearch([0, 1, 2, 3, 3, 3], 3); // => 5
binarySearch([0, 1, 2, 3, 3, 3], 4); // => -1
```

3. 查找下一个最小的元素（前驱元素）

``` js
const binarySearch = (nums, target) => {
  let lo = 0, hi = nums.length - 1;

  while (lo <= hi) {
    let mid = lo + (hi - lo >> 1);
    if (nums[mid] < target) lo = mid + 1;
    else hi = mid - 1;
  }

  return hi >= 0 ? hi : -1;
};
binarySearch([1, 3, 5, 7, 9], 8); // => 3
binarySearch([1, 3, 5, 7, 9], 0); // => -1
```

4. 查找下一个最大的元素（后继元素）

``` js
const binarySearch = (nums, target) => {
  let lo = 0, hi = nums.length - 1;

  while (lo <= hi) {
    let mid = lo + (hi - lo >> 1);
    if (nums[mid] < target) lo = mid + 1;
    else hi = mid - 1;
  }

  return lo < nums.length ? lo : -1;
};
binarySearch([1, 3, 5, 7, 9], 6); // => 3
binarySearch([1, 3, 5, 7, 9], 10); // => -1
```

二分查找并不是所有应用场景都适用。如果输入规模很小，使用线性搜索就足够了；如果数据删除、插入操作频繁，使用二分查找将是一个低效的解决方案，因为每次删除或者插入元素后都需要进行排序来保证数组的有序性，可以使用散列表、二叉搜索树等动态数据结构代替。

## 散列表

数组是一种通过下标操作数据的线性表结构，但如果存储的位置比较稀疏，则会造成内存空间的浪费，而且数组的下标一般来说是自然数，并非支持其它情况的关键字。

散列表可以通过散列函数将关键字映射为数组的下标，然后通过下标存储和快速访问对应的数据。

### 散列函数

散列函数是将关键字计算为数组下标的函数。设计一个好的散列函数应该尽可能的满足简单均匀散列的条件，还需根据关键字的特点动态的构建散列表。

### 散列冲突

散列函数具有随机的特性，这意味着不同的关键字可能会计算出相同的散列值，这样就产生了散列冲突的情况。散列冲突的概率取决于**装载因子**（实际关键字数量/散列表长度）的大小，装载因子越大，则发生散列冲突的概率越高，反之，发生的概率越小。为了提高执行效率，可以动态批量的扩容或者缩容散列表。装载因子阈值的设置取决于对执行效率和内存空间的要求。

解决散列冲突的方法主要包括开放寻址法和链表法。

1. 开放寻址法

开放寻址法的思路是将所有的元素放到散列表中，当需要查找、插入或者删除元素时，都会根据某种**探测**规则去检查散列表中的元素。这里的探测规则包括线性探测、二次探测和双重探测。

开放寻址法的优点是数据直接存储在散列表中，查询的效率非常快，但是，如果数据量很大，则会大大增加散列冲突的概率。

2. 链表法

与开放寻址法不同的是，在链表法中的散列表存储的是链表的指针或者引用，然后每次操作元素时都是通过该指针或者引用去操作对应的链表。

当**查找**某个元素时，最坏情况下，如果所有元素都被散列到了同一链表中，则查找的时间复杂度为 O(n)。如果所有元素都被均匀的散列到散列表的任意位置，则查找的时间复杂度为 O(1)。

当**插入**和**删除**某个元素时，如果使用的是单向链表，则时间复杂度为 O(n)，如果使用的是双向链表，则完成此次操作的时间复杂度为 O(1)。

链表法非常适用于数据量大的情况下，最多也就是某个链表的长度长了点而已。而且链表法中的链表可以换成其它高级的数据结构来提高散列表在极端情况下的性能。在散列表中使用链表还可以保证数据以某种顺序存储。

## 树

树是一种描述树状结构数据的抽象数据类型。一个树结构由一系列节点组成，主要包括**根节点**、**父节点**、**子节点**和**叶节点**等。树的**高度**是由叶节点（以 0 开始）到根节点的最长路径；树的**深度**由根节点（以 0 开始）到叶节点的最长路径；树的**层级**是从根节点（以 1 开始）到叶节点。

### 二叉树

二叉树每个节点最多只能有两个子节点，分别是**左子节点**和**右子节点**。

根据叶节点的分布，二叉树可分为**满二叉树**、**完全二叉树**、**二叉搜索树**和**平衡二叉树**等。

其中，满二叉树的特点是每个节点要么没有子节点，要么有两个子节点；完全二叉树的特点每一层的节点都是完整地，并且最后一层的叶节点尽可能的靠左。

可以通过链表或者数组来存储二叉树。完全二叉树比较适合使用数组来存储，因为节点与节点之间是连续的，这样比较节省空间。

遍历二叉树的方法包括**前序遍历**、**中序遍历**、**后序遍历**和**层次遍历**四种方式。它们都可以使用递归和迭代的方式实现。

对于每一颗二叉树的**子树**来说，前序遍历先输出父节点，然后输出左子节点、最后输出右子节点；中序遍历先输出左子节点、然后输出父节点、最后输出右子节点；后序遍历先输出左子节点、然后输出右子节点、最后输出父节点。

前序遍历的递归实现：

前序遍历的迭代实现：

中序遍历的递归实现：

中序遍历的迭代实现：

后序遍历的递归实现：

后序遍历的迭代实现：

层次遍历的实现：

### 二叉搜索树

特点是：作于任何一个节点，其左子树的值*不大于*该节点，其右子树的值*不小于*该节点。

**查找**操作包括查找给定值、查找最大值和最小值、查找给定值的前驱和后继节点的值。

插入和删除操作需要确保二叉搜索树性质的成立，这就需要我们动态的去修改二叉搜索树的结构。

**插入**操作需要向左或向右移动（向左向右移动取决于插入的值与当前节点的关系）当前节点的指针，直到当前节点下没有子节点为止，如果插入的值小于当前节点，将值插入到当前节点的左节点上，如果插入的值大于当前节点，将值插入到当前节点的右节点上。

**删除**操作比较复杂，包括三种基本情况：

1. 删除的节点没有子节点。只需将指向被删除节点父节点的指针指向 null；

2. 删除的节点只有一个子节点。需要将指向被删除节点父节点的指针指向被删除节点的子节点；

3. 删除的节点有两个子节点。首先需要找到被删除节点的后继节点（右子树的最小节点），将指向被删除节点父节点的指针指向后继节点，然后将指向后继节点父节点的指针指向 null，最后将后继节点的左子节点和右子节点分别指向被删除节点的左子树和右子树。

在极端情况下，二叉搜索树退化成了单链表，那么它的时间复杂度为 O(n)，一般情况下，二叉搜索树的时间复杂度为 O(logn)。

### 平衡二叉树

### AVL 树

### 红黑树


## 堆

**堆**（Heap），也称为**二叉堆**，是一种满足**堆性质**的特殊二叉树，它需要满足一下条件：  

- 近似完全二叉树。除了最底层，其它层的节点都从左向右被元素填满，且最底层的节点尽可能的靠左； 

- 满足堆性质。每个节点的值都大于等于或者小于等于它的子节点的值，前者是**最大堆**，后者为**最小堆**。

堆可以利用数组来实现，堆中的每一个节点对应数组中的一个元素，可以通过 size 属性表示有多少堆元素存储在数组中。可以通过下标来定义父子节点之间的关系，如果从下标为 1 的位置开始存储节点，父节点的位置是 i / 2，左子节点的位置为 2i，右子节点的位置为 2i + 1。

以下是最大堆的基础版本的代码实现：

``` js
class MaxHeap {
  constructor() {
    this.container = [];
    this.size = 0;
  }
  parent(i) {
    return Math.floor(i / 2);
  }

  left(i) {
    return 2 * i;
  }

  right(i) {
    return 2 * i + 1;
  }

  swap(arr, child, parent) {
    [arr[child], arr[parent]] = [arr[parent], arr[child]];
  }

  isEmpty() {
    return this.size === 0;
  }
}
```

以下是堆的几个重要的操作：

在堆中插入一个元素时，需要将该元素放到堆的最后一个位置，这样可能会破坏堆性质，需要通过自下而上方式的堆化操作，将不满足条件的子节点与父节点交换，直到满足堆性质为止。

``` js
insert(data) {
  this.size++;
  this.container[this.size] = data;
  this.heapifyUp();
  return this.container;
}
heapifyUp(index) {
  let i = index || this.container.length - 1;
  while (i > 1 && this.container[this.parent(i)] < this.container[i]) {
    this.swap(this.container, i, this.parent(i));
    i = this.parent(i);
  }
}
```

在堆中获取堆顶元素时，只需获取堆中第一个元素即可。

``` js
peek() {
  return this.isEmpty() ? undefined : this.container[1];
}
```

在堆中删除堆顶元素时，首先将堆的最后一个元素与第一个元素交换，然后将堆的大小减 1，最后通过自上而下的堆化操作将不满足条件的父子节点进行交换，直到满足堆性质为止。

``` js
remove() {
  if (this.isEmpty()) return undefined;

  let value = this.container[1];
  this.container[1] = this.container[this.size];
  this.size--;
  this.heapifyDown(this.container, 1);

  return value;
}
heapifyDown(arr, i) {
  let l = this.left(i);
  let r = this.right(i);
  let largest = i;

  if (l <= this.size && arr[l] > arr[i]) largest = l;
  if (r <= this.size && arr[r] > arr[largest]) largest = r;
  if (i === largest) return;
  else {
    this.swap(arr, i, largest);
    this.heapifyDown(arr, largest);
  }
}
```

堆的插入和删除操作的核心是**堆化**，堆化是一个维护堆性质的过程，它的时间复杂度为 O(logn) 或者 O(h)，h 为树的高度。

### 堆排序

**堆排序**是一种基于堆这种数据结构而实现的排序算法，我们可以通过堆排序将最大堆的数据从小到大（升序）排列，将最小堆的数据从大到小（降序）排列。

堆排序的实现步骤如下：

1. **建堆**。是将一组无序的数组数据转化为最大堆（最小堆）的过程；

2. 交换。将堆的最后一个元素与第一个元素交换；

3. 调整。将堆的大小减 1；

4. 堆化。新的根节点可能不满足堆的性质，需要通过堆化来构造一个新的堆。

一直从第二步开始重复，直到堆的大小为 1 为止。

堆排序的代码实现如下：

``` js
build(arr) {
  this.size = arr.length - 1;
  for (let i = Math.floor(arr.length / 2); i >= 1; i--) {
    this.heapifyDown(arr, i);
  }
}

sort(arr) {
  this.build(arr);
  for (let i = this.size; i > 0; i--) {
    this.swap(arr, 1, i);
    this.size--;
    this.heapifyDown(arr, 1);
  }
  return arr;
}
```

因为建堆的时间复杂度为 O(n)，堆化的时间复杂度为 O(logn)，所有堆排序的总的时间复杂度为 O(nlogn)；堆排序是一种原地不稳定的排序，所以堆排序的空间复杂度为 O(1)。

### 常见运用

1. **优先队列**（Priority Queue）

优先队列是一种抽象数据类型。优先队列元素的顺序将会遵循高优先级的元素在低优先级之前、优先级相同的先加入的元素在后加入元素之前的规则排列。优先队列可以使用堆或者其他数据结构来实现。

（实现）

2. 求 TOP K

求 TOP K 问题需要维护一个大小为 k 的最小堆，依次从数组中取出数据与堆顶比较。如果该元素比堆顶大，则删除堆顶元素，然后插入该元素；如果该元素比堆顶小，则不做处理。这样最终将会等到一个 TOP k 的堆。

相关 LeetCode 题：

- [347.前 k 个高频元素](https://leetcode-cn.com/problems/top-k-frequent-elements/)
- [692.前 k 个高频单词](https://leetcode-cn.com/problems/top-k-frequent-words/)

3. 求中位数

求中位数问题需要维护一个最大堆和一个最小堆，且最小堆的所有元素都要大于最大堆的堆顶元素。依次将数组的元素插入到最大堆或者最小堆中，如果该元素小于等于最大堆堆顶元素，将该元素插入到最大堆中，否则将该元素插入到最小堆中。在插入元素的过程中，需要根据当前插入元素个数动态调整最大堆和最小堆，如果当前插入元素的个数为奇数，则需要将 n / 2 + 1 个数据存储在最小堆中，将 n / 2 个数据存储在最大堆中；如果当前插入元素的个数为偶数，则最大堆和最小堆都需要存储 n / 2 个元素。如果最终插入元素的个数为奇数时，则中位数是最小堆的堆顶，如果最终插入元素的个数为偶数时，则中位数为最大堆和最小堆堆顶的算术平均值。

相关 LeetCode 题：

- [295.数据流的中位数](https://leetcode-cn.com/problems/find-median-from-data-stream/)

## 图

**图**（Graph）是一种描述有限个**顶点**（vertex）关系的非线性表抽象数据结构。通过**边**（edge）来建立顶点间的关系，通过**度**（degree）来表示顶点与其它顶点关系的数量。

最基础的图为**无向图**，如果连接顶点的边具有某种指向性则为**有向图**，如果顶点之间的指向形成了一个环路则为**有环图**，如果连接顶点的边具有权重性则为**加权图**。当然，这些图组合起来还可以形成更复杂的图。

### 图的表示

图主要包括**邻接矩阵**和**邻接链表**两种表示方法。

对于规模比较小并且大小比较固定的图或者**稠密图**来说，使用邻接矩阵表示更为简单，对于一个无向图来说，只需半个矩阵即可表示。邻接矩阵可以快速判断任意两个节点是否有边相连，但需要更大的存储空间。

对于一个动态变化的图或者**稀疏图**来说，使用邻接链表表示更加灵活和节省存储空间。

### 图的遍历

### 拓扑排序算法

### 最小生成树算法

### 最短路径算法
