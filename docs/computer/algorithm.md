# 数据结构与算法（in JavaScript)

> 程序 = 数据结构 + 算法。

> 数据结构，即便于算法操作的组织数据的方法。—— 《算法》

> 数据结构是一种存储和组织数据的方式，旨在便于访问和修改。——《算法导论》

常见的**数据结构**包括数组、链表、栈、队列、哈希表、二叉树、堆和图等。

> 算法，即适合用计算机实现的解决问题的方法...在计算机科学领域，我们用算法这个词来描述一种有限、确定、有效的并适合用计算机程序来实现的解决问题的方法。——《算法》

> 算法就是把输入转换成输出的计算步骤的一个序列...算法则描述一个特定的计算过程来实现该输入、输出关系。——《算法导论》

**算法**是一种求解某一特定问题计算过程。我们可以通过自然语言或者计算机语言来定义一个算法，常见的算法包括排序、搜索、查找、字符串匹配等。

## 复杂度

算法的复杂度用来分析算法执行效率与数据规模之间的增长关系，包括时间复杂度和空间复杂度。

时间复杂度指的是一段代码执行需要消耗的时间资源，空间复杂度指的是一段代码占用的内存空间资源。

可通过大 O 表示法来表示算法的复杂度量级，常见复杂度量级包括：常数阶 O(1)、对数阶 O(logn)、线性阶 O(n)、线性对数阶 O(nlogn)、平方阶 O(n<sup>2</sup>)、指数阶 O(2<sup>n</sup>) 等。

## 数组

**数组**数据结构（array data structure）是一种分配一块**连续**内存空间存储**相同类型**元素的线性表数据结构。

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

在使用数组的时候要警惕数组访问越界问题。因为在 C 语言中并未规定数组越界如何处理，在 Java 中则会抛出异常，而在 JavaScript 中则不会报错。

### 必知必会代码实现

- 实现一个支持动态扩容的数组

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

- 实现一个大小固定的有序数组，支持动态增删改操作

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

- 实现两个有序数组合并为一个有序数组

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

### LeetCode 题解

- 数组元素之和

    - [1 两数之和](https://leetcode-cn.com/problems/two-sum/solution/shu-zi-zhi-he-liang-shu-zhi-he-by-qian-d-zj9h/)
    - [167 两数之和 II - 输入有序数组](https://leetcode-cn.com/problems/two-sum-ii-input-array-is-sorted/solution/shu-zi-zhi-he-liang-shu-zhi-he-ii-shu-ru-zcv8/)
    - [15 三数之和](https://leetcode-cn.com/problems/3sum/solution/shu-zi-zhi-he-san-shu-zhi-he-by-qian-dua-g7yp/)
    - [16 最接近的三数之和](https://leetcode-cn.com/problems/3sum-closest/solution/shu-zu-yuan-su-zhi-he-zui-jie-jin-de-san-c0st/)
    - [18 四数之和](https://leetcode-cn.com/problems/4sum/solution/shu-zu-yuan-su-zhi-he-si-shu-zhi-he-by-q-4whu/)

- [169.多数元素](https://leetcode-cn.com/problems/majority-element/)

- [41. 缺失的第一个正数](https://leetcode-cn.com/problems/first-missing-positive/)

## 链表

链表是一种根据**指针**将**元素/节点**串联起来的线性表数据结构。

优点是插入和删除操作灵活高效。

缺点是查询时间复杂度高，指针需要额外的内存空间存储。

链表的类型包括单向链表、双向链表和循环链表等。

## 栈

栈是一种**先进后出**（LIFO, Last In First Out）的**操作受限**线性表数据结构。只能在一端添加或删除数据。

### 实现

栈可以用数组、链表和队列来实现。

- 使用数组实现栈

- 使用链表实现栈

- 使用队列实现栈

### 运用

我们日常开发中的函数调用、表达是求值、括号匹配、浏览器的前进后退等场景都可以使用栈来求解。

## 队列

队列是一种**先进先出**（FIFO, First-In-First-Out）的**操作受限**线性表数据结构。只能在一端添加数据在另一端删除数据。

队列同样也可以用数组和链表实现，也可以用栈来实现，实现队列时需要考虑队头和队尾两个指针，其中队尾指针并不存储数据，队列的出队和入队其实就是通过移动这两个指针来完成的。

### 实现

- 使用数组实现队列

- 循环队列

- 循环双端队列

- 使用链表实现队列

- 使用栈实现队列

### 运用

队列经常用在资源受限的场景。

### 散列表

数组是一种通过下标操作数据的线性表结构，但如果存储的位置比较稀疏，则会造成内存空间的浪费，而且数组的下标一般来说是自然数，并非支持其它情况的关键字。

散列表可以通过散列函数将关键字映射为数组的下标，然后通过下标存储和快速访问对应的数据。

#### 散列函数

散列函数是将关键字计算为数组下标的函数。设计一个好的散列函数应该尽可能的满足简单均匀散列的条件，还需根据关键字的特点动态的构建散列表。

#### 散列冲突

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

#### 实现

- LRU 缓存淘汰算法

### 树

树是一种描述树状结构数据的抽象数据类型。一个树结构由一系列节点组成，主要包括**根节点**、**父节点**、**子节点**和**叶节点**等。树的**高度**是由叶节点（以 0 开始）到根节点的最长路径；树的**深度**由根节点（以 0 开始）到叶节点的最长路径；树的**层级**是从根节点（以 1 开始）到叶节点。

#### 二叉树

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

#### 二叉搜索树

特点是：作于任何一个节点，其左子树的值*不大于*该节点，其右子树的值*不小于*该节点。

**查找**操作包括查找给定值、查找最大值和最小值、查找给定值的前驱和后继节点的值。

插入和删除操作需要确保二叉搜索树性质的成立，这就需要我们动态的去修改二叉搜索树的结构。

**插入**操作需要向左或向右移动（向左向右移动取决于插入的值与当前节点的关系）当前节点的指针，直到当前节点下没有子节点为止，如果插入的值小于当前节点，将值插入到当前节点的左节点上，如果插入的值大于当前节点，将值插入到当前节点的右节点上。

**删除**操作比较复杂，包括三种基本情况：

1. 删除的节点没有子节点。只需将指向被删除节点父节点的指针指向 null；

2. 删除的节点只有一个子节点。需要将指向被删除节点父节点的指针指向被删除节点的子节点；

3. 删除的节点有两个子节点。首先需要找到被删除节点的后继节点（右子树的最小节点），将指向被删除节点父节点的指针指向后继节点，然后将指向后继节点父节点的指针指向 null，最后将后继节点的左子节点和右子节点分别指向被删除节点的左子树和右子树。

在极端情况下，二叉搜索树退化成了单链表，那么它的时间复杂度为 O(n)，一般情况下，二叉搜索树的时间复杂度为 O(logn)。

#### 平衡二叉树

##### AVL 树

##### 红黑树


### 堆

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

#### 堆排序

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

#### 常见运用

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
#### B+树

### 图

**图**（Graph）是一种描述有限个**顶点**（vertex）关系的非线性表抽象数据结构。通过**边**（edge）来建立顶点间的关系，通过**度**（degree）来表示顶点与其它顶点关系的数量。

最基础的图为**无向图**，如果连接顶点的边具有某种指向性则为**有向图**，如果顶点之间的指向形成了一个环路则为**有环图**，如果连接顶点的边具有权重性则为**加权图**。当然，这些图组合起来还可以形成更复杂的图。

#### 图的表示

图主要包括**邻接矩阵**和**邻接链表**两种表示方法。

对于规模比较小并且大小比较固定的图或者**稠密图**来说，使用邻接矩阵表示更为简单，对于一个无向图来说，只需半个矩阵即可表示。邻接矩阵可以快速判断任意两个节点是否有边相连，但需要更大的存储空间。

对于一个动态变化的图或者**稀疏图**来说，使用邻接链表表示更加灵活和节省存储空间。

#### 图的遍历

#### 拓扑排序算法

#### 最小生成树算法

#### 最短路径算法

## 算法

### 递归

递归包括递和归两个部分，它是其他高级数据结构与算法的基础，理解了递归可以让我们的代码变得高效简洁。

当一个问题存在相同求解思路的子问题时，我们就可以考虑使用递归来求解该问题。

合理的**递推公式**和**终止条件**是写好递归的关键，在写递归的时候要警惕**重复计算**和**堆栈溢出**等问题。


### 二分查找

二分查找算法又称折半搜索算法，是一种在**有序数组**中查找某一特定元素的算法。它的思想是需要计算出数组的中间元素，然后根据该元素与给定元素比较，如果中间元素等于给定的查找元素，则返回该元素的下标；如果给定的查找元素小于或大于中间值，则在小于或者大于中间元素的数组范围中查找。每次查找数组的范围都会缩小一半，直到搜索到给定元素或者搜索的范围为空为止。

通常情况下，二分查找算法的时间复杂度为 O(logn)；二分查找算法可以使用迭代或者递归的方式来实现，使用前者的空间复杂度为 O(1)，使用后者则为 O(logn)。

迭代实现：

``` js
function binarySearch(arr, target) {
    let [left, right] = [0, arr.length - 1];

    while (left <= right) {
        let mid = left + right >> 1;

        if (arr[mid] === target) return mid;
        else if (arr[mid] > target) right = mid - 1;
        else left = mid + 1;
    }

    return -1;
}

binarySearch([1, 3, 5, 7, 9, 10, 11, 12, 14, 15, 19, 20], 4)
```

递归实现：

``` js
function binarySearch(arr, target) {
    return search(arr, 0, arr.length - 1, target); 
}

function search(arr, left, right, target) {
    if (left > right) return -1;

    let mid = Math.floor((left + right) / 2);

    if (arr[mid] === target) return mid;
    else if (arr[mid] > target) return search(arr, left, mid - 1, target);
    else return search(arr, mid + 1, right, target);
}

let arr = [1, 3, 5, 7, 9, 10, 11, 12, 14, 15, 19, 20];
binarySearch(arr, 4)
```

除了以上两种去中间元素的方式外，还有如下几种：

``` js
let mid = parseInt((left + right) / 2 );
let mid = left + Math.floor((right - left) / 2); // 防止两数之和溢出
let mid = left + (right - left >> 2);
```

二分查找算法看起来无非就是判断某个值在某个区间，然后在满足条件的区间内查找，但是二分查找的变种非常多，如果不注意它的边界条件，很难完整地写出符合要求的算法。

### 排序算法

排序算法是一种将一组数据按照特定排序方式排列的算法。

常见的排序算法包括：冒泡排序、插入排序、选择排序、快速排序、归并排序、桶排序、计数排序和基数排序等。

选择一个合适的排序，需要从以下几个方面进行考量：

- 排序时间复杂度（时间复杂度相同需要考虑时间复杂度的系数、常数、低阶和比较、交换的次数）
- 是否是原地排序（是否需要额外的空间存储数据）
- 是否是稳定排序（两个相同的元素位置是否变化）

#### 简单排序算法

简单排序算法适合用作教学和应用在数据量很小的场景。

##### 冒泡排序

一次比较相邻的两个元素，如果满足条件则交换两个元素，一直重复直到排序完成。以下是冒泡排序的代码：

``` js
function bubbleSort1(arr) {
    let n = arr.length;
    if (n <= 1) return;

    for (let i = 0; i < n; i++) {
        for (let j = 0; j < n - 1 - i; j++) {
            if (arr[j] > arr[j + 1]) {
                [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
            }
        }
    }
    return arr;
}
```

以下是冒泡排序的优化版本：

``` js
function bubbleSort2(arr) {
    let n = arr.length;
    if (n <= 1) return;

    for (let i = 0; i < n; i++) {
        let flag = false;
        for (let j = 0; j < n - 1 - i; j++) {
            if (arr[j] > arr[j + 1]) {
                [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
                flag = true;
            }
        }
        if (!flag) break;
    }
    return arr;
}
```

冒泡排序的最好情况时间复杂度为 O(n)、最坏情况时间复杂度为 O(n²)、平均情况时间复杂度为 O(n²)。

##### 插入排序

将未排序的元素与已排序序列中从后往前比较，将大于未排序的这个元素全部挪动一位，然后将其插入到挪动后剩下的位置，一直重复直到没有未排序的元素为止。这个过程和平时抓扑克牌相似，没有理解的同学可以买一副扑克牌叫几个小伙伴玩玩脑补一下:)。

算法实现：

``` js
function insertionSort(arr) {
    if (arr.length <= 1) return;

    for (let i = 1; i < arr.length; i++) {
        let value = arr[i];
        let j = i - 1;
        while (j >= 0 && arr[j] > value) {
            arr[j + 1] = arr[j];
            j -= 1;
        }
        arr[j + 1] = value;
    }
    return arr;
}
```

插入排序的最好、最坏和平均情况时间复杂度和冒泡排序一样，而且它们都是稳定的排序。插入排序至少比冒泡排序少赋值一次，如果排序的元素非常多，那么插入排序的优势就非常明显了。

##### 选择排序

首先在未排序序列中找到最小（大）元素，存放到排序序列的起始位置，然后，再从剩余未排序元素中继续寻找最小（大）元素，然后放到已排序序列的末尾。以此类推，直到所有元素均排序完毕。—— 维基百科

算法实现：

``` js
function selectionSort(arr) {
    let n = arr.length;
    for (let i = 0; i < n - 1; i++) {
        let min = i;
        for (let j = i + 1; j < n; j++) {
            if (arr[min] > arr[j]) min = j;
        }

        if (min !== i) {
            [arr[min], arr[i]] = [arr[i], arr[min]];
        }
    }
    return arr;
}
```

选择排序的最好、最坏、平均情况时间复杂度都为 O(n²)。而且选择排序并不是稳定排序，相同元素的先后顺序会被改变。

这三个简单排序算法都是原地排序算法。

#### 分治排序算法

归并排序算法和快速排序算法都使用了分治的思想，代码都可以使用递归来实现。它们的最好情况时间复杂度为 O(nlogn)，非常适合大规模的数据排序。

##### 归并排序

归并排序分为分解和合并两个步骤，分解就是每次将一个序列拆分为两个序列，直到拆分为最小序列为止，合并就是将两个序列合并成为一个有序序列，直到将若干个序列合并为只有一个有序序列为止。

算法实现：

``` js
function mergeSort(arr) {
    if (arr.length <= 1) return arr;
    let middle = Math.trunc(arr.length / 2);
    let left = arr.slice(0, middle);
    let right = arr.slice(middle);
    return merge(mergeSort(left), mergeSort(right));
}

function merge(left, right) {
    const result = [];
    while(left.length > 0 && right.length > 0) {
        if(left[0] < right[0]) result.push(left.shift());
        else result.push(right.shift());
    }
    return result.concat(left, right);
}
mergeSort([3, 7, 1, 6, 2, 5, 4]);
```

归并排序的最好、平均和最坏情况时间复杂度为 O(nlogn)。因为需要额外的空间存储数据，所以空间复杂度为 O(n)。

归并排序是一种稳定非原地的排序算法。

##### 快速排序

快速排序分为挑选、分解、合并三个步骤。首先需要从序列中挑选一个元素作为基点，然后将比小于基点的放到左侧，大的则放到右侧，这样就分成了小于基点、基点和大于基点的 3 个部分，一直重复比较分解直到不可分解为止，最后合并这些分解的最小元素就是序列变得有序了。

算法实现：

``` js
function quickSort(arr, p, r) {
    if (p < r) {
        let q = partition(arr, p, r);
        quickSort(arr, p, q - 1);
        quickSort(arr, q + 1, r);
    }
}

function partition(arr, p, r) {
    let x = arr[r];
    let i = p;
    for (let j = p; j < r; j++) {
        if (arr[j] <= x) {
            if (i !== j) {
                [arr[i], arr[j]] = [arr[j], arr[i]];
            }
            i++;
        }
    }
    [arr[i], arr[r]] = [arr[r], arr[i]];
    return i;
}

const arr = [2, 8, 7, 1, 3, 5, 6, 4];
quickSort(arr, 0, arr.length - 1);
```

快速排序的最好和平均情况时间复杂度为 O(nlogn)，如果数据是有序或接近有序，那么最坏情况时间复杂度为 O(n²)，我们可以通过三数取中法或者随机法来选择一个合理的分区点，这样出现 O(n²) 的次数就会大大降低。由于快排是用递归实现的，这样可能会出现堆栈溢出的情况，我们可以通过限制递归深度、通过在栈上模拟一个函数调用栈的策略来解决该问题。

于归并排序相反，快速排序是一种原地不稳定的排序算法。

#### 线性排序

以上排序算法都是基于**比较**的排序算法，这也决定了他们最好情况时间复杂度为 O(nlogn)，以下是基于**运算**的几种线性排序算法。它们是最好情况时间复杂度都是 O(n)，同样适合大规模数据排序，但不适合内存紧缺的场景，因为它们需要额外的内存空间来存储数据。

##### 计数排序

计数排序是根据小于某一元素的个数来确定元素位置的排序算法。

算法步骤：

1. 将数组 A 中元素出现的个数存储在一个数组 C 中；
2. 在 C 中原地算出小于某一元素的总和；
3. 从数组 A 的最后一位元素开始依次取出元素，并使用该元素在数组 C 中查找该元素排序的位置；
4. 根据数组 C 提供的位置，一次将数组 A 的元素添加到数组 B 中。

算法实现：

``` js
function countingSort(A) {
    debugger;
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

##### 基数排序

基数排序是根据数组元素位数排序的排序算法，需要从低位到高位排序才能保证基数排序的稳定性。

算法实现：

``` js
function radixSort(arr) {
    debugger;
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

##### 桶排序

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

### 哈希算法

### 搜索算法

#### 深度优先搜索

#### 广度优先搜索

#### A\*启发式搜索

### 字符串匹配算法

#### 单模式串算法

##### BF

##### RK

##### BM

##### KMP

#### 多模式串算法

##### Trie 树

##### AC 自动机

### 算法思想

#### 贪心算法

#### 分治算法

#### 回溯算法

#### 动态规划
