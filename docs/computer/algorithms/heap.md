# 堆

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

## 堆排序

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