# 排序算法

**排序算法**（Sorting algorithm）是一种将一组数据按照特定顺序排列的算法。

常见的排序算法包括：冒泡排序、插入排序、选择排序、快速排序、归并排序、堆排序、计数排序和桶排序等。

在分析排序算法时，需要从以下几个方面考虑：

- 执行效率。交换和比较的次数、数据的排序程度和数据规模。

- 内存消耗。读写数组次数和是否原地排序。

- 稳定性。数据中值相等的元素在排序后先后顺序是否改变。

## 冒泡排序

**冒泡排序**（Bubble sort）是一种基于比较的简单排序算法。其思想是相邻元素两两比较，将不满足大小关系的元素交换，使最大/最小元素“冒泡/下沉”到未排序区间末尾。

![Bubble Sort](https://upload.wikimedia.org/wikipedia/commons/c/c8/Bubble-sort-example-300px.gif)

``` js
function bubbleSort(arr) {
  const n = arr.length;

  for (let i = 0; i < n - 1; i++) {
    // 将最大元素“冒泡”到未排序区间末尾
    for (let j = 0; j < n - i - 1; j++) {
      if (arr[j] > arr[j + 1]) {
        [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]]; // 交换元素
      }
    }
  }

  return arr;
}
```

在遍历过程中，如果没有元素需要交换，则说明数据已经完全有序，可以提前结束交换操作。

``` js
function bubbleSortOptimized(arr) {
  const n = arr.length;

  for (let i = 0; i < n - 1; i++) {
    let swapped = false;

    for (let j = 0; j < n - i - 1; j++) {
      if (arr[j] > arr[j + 1]) {
        [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
        swapped = true;
      }
    }

    // 如果没有元素交换，则说明数据已经完全有序，可提前结束
    if (!swapped) break;
  }

  return arr;
}
```

冒泡排序的最好情况时间复杂度为 `O(n)`、平均和最坏情况时间复杂度为 `O(n²)`。冒泡排序是**稳定原地**排序算法，其空间复杂度为 `O(1)`。

## 选择排序

**选择排序**（Selection sort）是一种基于比较的简单排序算法。其思想是在未排序区间中寻找最小/最大元素，将其放到已排序区间末尾。

![Selection sort](https://upload.wikimedia.org/wikipedia/commons/9/94/Selection-Sort-Animation.gif)


``` js
function selectionSort(arr) {
  const n = arr.length;

  for (let i = 0; i < n - 1; i++) {
    let minIdx = i;

    // 寻找最小元素索引
    for (let j = i + 1; j < n; j++) {
      if (arr[j] < arr[minIdx]) minIdx = j;
    }

    // 将最小元素与未排序区间的第一个元素交换
    if (minIdx !== i) [arr[i], arr[minIdx]] = [arr[minIdx], arr[i]];
  }

  return arr;
}
```

选择排序的最好、最坏、平均情况时间复杂度都为 `O(n²)`。选择排序是**原地非稳定**排序算法，其空间复杂度为 `O(1)`。选择排序的交换次数较少，最多只需 `n - 1` 次。

## 插入排序

**插入排序**（Insertion sort）是一种基于比较的简单排序算法。其思想是从未排序区间中取出第一个元素，将其插入到已排序区间的合适位置。就像整理扑克牌一样，将新牌插入到合适位置。

![insertion-sort](https://upload.wikimedia.org/wikipedia/commons/0/0f/Insertion-sort-example-300px.gif)


``` js
function insertionSort(arr) {
  const n = arr.length;

  for (let i = 1; i < n; i++) {
    let curr = arr[i];
    let j = i - 1;

    // 在已排序区间从后向前寻找插入位置
    while (j >= 0 && arr[j] > curr) {
      arr[j + 1] = arr[j]; // 向后搬移元素
      j--;
    }
    
    // 将当前元素插入到合适位置
    arr[j + 1] = curr;
  }

  return arr;
}
```

插入排序最好情况时间复杂度为 `O(n)`，平均和最坏情况时间复杂度为 `O(n²)`。插入排序是**稳定原地**排序算法，其空间复杂度为 `O(1)`。插入排序适合在小规模数据中使用。

## 归并排序

**归并排序**（Merge sort）是一种基于比较的分治排序算法。其思想是（递归的）将未排序数组**分解**成 `n` 个子数组，直到子数组中只有一个元素为止，最后将子数组**合并**为较大的有序数组，直到只剩下一个排序数组为止。

![Merge-sort](https://upload.wikimedia.org/wikipedia/commons/c/cc/Merge-sort-example-300px.gif)

归并排序包括自上而下和自下而上两种实现方式。

### 自上而下归并排序

自上而下归并排序的思路是递归的将未排序数组分为两个子数组，先排序左边子数组，然后排序右边子数组，最后将两个子数组合并为一个数组。

归并排序的合并操作需要借助一个额外数组实现，其思路是将数组的所有元素批量复制到一个辅助数组中，然后根据顺序将辅助数组中的元素复制回原数组中。

``` js
function topDownMergeSort(arr) {
  const sort = (arr, lo, hi, temp = []) => {
    if (lo >= hi) return;

    const mid = lo + Math.floor((hi - lo) / 2);
    sort(arr, lo, mid, temp); // 递归排序左子数组
    sort(arr, mid + 1, hi, temp); // 递归排序右子数组
    merge(arr, lo, mid, hi, temp);  // 合并左右两个子数组
  };
  sort(arr, 0, arr.length - 1);

  return arr;
}

function merge(arr, lo, mid, hi, temp) {
  let i = lo;
  let j = mid + 1;
  let k = 0;

  while (i <= mid && j <= hi) {
    temp[k++] = arr[i] < arr[j] ? arr[i++] : arr[j++];
  }

  while (i <= mid) temp[k++] = arr[i++];
  while (j <= hi) temp[k++] = arr[j++];

  for (let i = lo; i <= hi; i++) {
    arr[i] = temp[i - lo];
  }
}
```

### 自下而上归并排序

自下而上归并排序的思路是通过迭代，先两两合并，然后四四合并，再八八合并，直到只有一个排序数组为止。

``` js
function bottomUpMergeSort(arr) {
  const n = arr.length;
  const temp = [];

  for (let i = 1; i < n; i *= 2) {
    for (let j = 0; j < n; j += i * 2) {
      merge(arr, j, j + i - 1, Math.min(j + 2 * i - 1, n - 1), temp);
    }
  }

  return arr;
}

function merge(arr, lo, mid, hi, temp) {
  let i = lo;
  let j = mid + 1;
  
  for (let k = lo; k <= hi; k++) {
    temp[k] = arr[k];
  }

  for (let k = lo; k <= hi; k++) {
    if (i > mid) {
      arr[k] = temp[j++];
    } else if (j > hi) {
      arr[k] = temp[i++];
    } else if (temp[i] > temp[j]) {
      arr[k] = temp[j++];
    } else {
      arr[k] = temp[i++];
    }
  }
}
```

归并排序的最好、平均和最坏情况时间复杂度为 O(nlogn)。归并排序是**稳定非原地**排序算法，因为在合并过程中需要借助额外存储空间，其空间复杂度为 O(n)。归并排序适合在没有空间限制的大规模数据中且使用。

## 快速排序

**快速排序**（Quick sort）是一种基于比较且应用广泛的分治排序算法。其思想是从数组中**选择**一个主元元素（pivot element），根据该元素与其他元素的大小关系将数组的其他元素**划分**为两个子数组；然后递归的对子数组进行排序，重复以上两步，直到子数组只包含一个元素为止，则该数组完全有序。

![Quick-sort](https://upload.wikimedia.org/wikipedia/commons/6/6a/Sorting_quicksort_anim.gif)

选择主元有很多方式，最简单的一种是选择数组最左边或最右边元素，另一种是随机选择一个元素或选择中间元素。划分操作有 **Lomuto** 和 **Hoare** 两种思路。

Lomuto 划分选择数组最右边元素作为主元，并围绕它来划分子数组。其中维护了 `i` 和 `j` 两个索引，通过遍历数组，将小于等于主元的元素放到 `[lo..i-1]` 区间中，将大于主元的元素放到 `[i..j]` 区间中。循环结束后，将主元交换到两个区间之间。

``` js
function quickSortLomutoPartition(arr) {
  const sort = (lo, hi) => {
    if (lo >= hi) return;

    const pivotIndex = partition(arr, lo, hi);
    sort(lo, pivotIndex - 1); // 排序左子数组
    sort(pivotIndex + 1, hi); // 排序右子数组
  };
  sort(0, arr.length - 1);

  return arr;
}

function partition(arr, lo, hi) {
  const pivot = arr[hi]; // 选择最后一个元素作为主元
  let i = lo;

  for (let j = lo; j < hi; j++) {
    if (arr[j] <= pivot) {
      [arr[i], arr[j]] = [arr[j], arr[i]];
      i++;
    }
  }

  // 将主元放到正确的位置
  [arr[i], arr[hi]] = [arr[hi], arr[i]];

  return i;
}
```

![Quick-sort](https://upload.wikimedia.org/wikipedia/commons/9/9c/Quicksort-example.gif)

Hoare 划分选择数组中间元素作为主元来划分子数组。然后从左往右扫描直到找到第一个大于等于它的元素，再从右往左扫描直到找到第一个小于等于它的元素，最后交换这两个元素。如果两指针相遇，返回 `j` 即可。

``` js
function partition(arr, lo, hi) {
  const mid = Math.floor((lo + hi) / 2);
  const pivot = arr[mid];
  let i = lo;
  let j = hi;

  while (true) {
    while (arr[i] < pivot) i++; // 从左往右查找第一个大于等于pivot的元素
    while (arr[j] > pivot) j--; // 从右往左查找第一个小于等于pivot的元素

    if (i >= j) return j;
    
    [arr[i], arr[j]] = [arr[j], arr[i]];
    i++;
    j--;
  }
}

function quickSortHoarePartition(arr) {
  const sort = (lo, hi) => {
    if (lo >= hi) return;

    const pivotIndex = partition(arr, lo, hi); // 切分
    sort(lo, pivotIndex); // 将左半部分排序
    sort(pivotIndex + 1, hi); // 将右半部分排序
  };
  sort(0, arr.length - 1);

  return arr;
}
```

Lomuto 划分紧凑且易于理解，Hoare 划分性能较好，平均交换次数减少了三倍。

对于简单的选择最左边或者最右边的元素作为主元，每层递归选择的主元划分的子数组可能会极度不平衡，最坏情况时间复杂度为 O(n²)。不过，可以使用**随机抽样法**或者**三数取中法**来选择一个划分平衡的主元，让期望运行时间达到 O(nlogn)。

实际应用中经常会出现存在大量重复数据的数组，可以使用**三向切分**的思路，将数组切成小于、等于和大于主元元素三个部分来进一步优化快速排序。

``` js
function quickSortThreeWay(arr) {
  const sort = (lo, hi) => {
    if (lo >= hi) return;

    const pivot = arr[lo];
    let lt = lo; // arr[lo..lt-1] < pivot
    let gt = hi; // arr[gt+1..hi] > pivot
    let i = lo + 1; // arr[lt..i-1] == pivot

    while (i <= gt) {
      if (arr[i] < pivot) {
        [arr[i], arr[lt]] = [arr[lt], arr[i]];
        lt++;
        i++;
      } else if (arr[i] > pivot) {
        [arr[i], arr[gt]] = [arr[gt], arr[i]];
        gt--;
      } else { // arr[i] == pivot
        i++;
      }
    }

    sort(lo, lt - 1);
    sort(gt + 1, hi);
  }

  sort(0, arr.length - 1);
  return arr;
}
```

快速排序最好和平均情况时间复杂度为 O(nlogn)，最坏情况时间复杂度为 O(n²)。快速排序是一种**原地不稳定**的排序算法，空间复杂度为 O(logn)。快速排序适合在大规模数据中使用。

以上排序算法都是基于**比较**的排序算法，这也决定了他们最好情况时间复杂度为 O(nlogn)，以下是基于**计算**的几种线性排序算法。

## 计数排序

**计数排序**（Counting sort）是一种基于计算的**整数**排序算法。

### 基础实现（不稳定）

基础实现的思路是统计每个元素在序列中出现的次数，通过累加计数来确定每个元素的位置，根据计数信息来将元素按顺序放到正确的位置。

``` js
function countingSortBase(arr) {
  const min = Math.min(...arr);
  const max = Math.max(...arr);

  const count = new Array(max - min + 1).fill(0);

  for (const num of arr) {
    count[num - min]++;
  }

  let index = 0;
  for (let i = 0; i < count.length; i++) {
    while (count[i] > 0) {
      arr[index++] = i + min;
      count[i]--;
    }
  }

  return arr;
}
```

我们首先找到最大值和最小值，确定计数数组的长度，然后使用一个数组统计元素出现的次数，最后根据计数数组，将元素放到正确的位置。

### 稳定实现

稳定计数排序的思路也需要统计每个元素出现的次数，然后通过前缀和累加计数来确定每个元素在排序后在数组中的区间位置，并从后向前遍历原数组，依次将数组元素放到新数组的对应位置，从而保证相同元素的相对顺序不变。

``` js
function countingSort(arr) {
  const min = Math.min(...arr);
  const max = Math.max(...arr);

  const count = new Array(max - min + 1).fill(0);

  for (const num of arr) {
    count[num - min]++;
  }

  // 通过前缀和累加计数，计算每个元素在排序后数组中的区间位置
  for (let i = 1; i < count.length; i++) {
    count[i] += count[i - 1];
  }

  const res = [];

  // 从后向前遍历原始数组，保证排序的稳定性
  for (let i = arr.length - 1; i >= 0; i--) {
    const num = arr[i];
    res[count[num - min] - 1] = num;
    count[num - min]--;
  }

  return res;
}
```

计数排序的时间和空间复杂度都是 `O(k + n)`，如果 `k = O(n)`，时间复杂度为 `O(n)`，基础实现是原地非稳定的，而稳定实现是稳定非原地的排序算法。

计数排序是基数排序的基础。

计数排序算法**仅适用于整数数据**，如果数据中包含负整数，需要先将数据转换为正整数，再进行排序。

## 桶排序

**桶排序**（Bucket sort）是一种分布式排序算法。其思想是将元素分配到有限数量的桶中，然后对每个桶内的元素进行排序，最后将所有桶中的元素合并为一个有序序列。

[Bucket_sort_1](https://upload.wikimedia.org/wikipedia/commons/6/61/Bucket_sort_1.svg)

首先，将元素分配到桶中。

[Bucket_sort_2](https://upload.wikimedia.org/wikipedia/commons/e/e3/Bucket_sort_2.svg)

然后，对每个桶内的元素进行排序。

``` js
function bucketSort(arr, bucketSize = 5) {
  // 创建桶
  const min = Math.min(...arr);
  const max = Math.max(...arr);
  const bucketCount = Math.floor((max - min) / bucketSize) + 1;
  const buckets = Array.from({ length: bucketCount }, () => []);

  // 将元素分配到桶中
  for (const num of arr) {
    const i = Math.floor((num - min) / bucketSize);
    buckets[i].push(num);
  }

  // 对每个桶进行排序
  for (const bucket of buckets) {
    bucket.sort((a, b) => a - b);
  }

  // 合并所有桶
  const sortedArr = [];
  for (const bucket of buckets) {
    sortedArr.push(...bucket);
  }

  return sortedArr;
}
```

我们首先根据桶的容量确定桶的数量，并创建相应的桶。桶可以使用动态数组或者链表数据结构来实现。对每个桶内元素排序，可以使用插入排序或者快速排序。

桶排序算法的平均情况时间复杂度为 `O(n)`，最坏情况时间复杂度为 `O(n²)`，空间复杂度为 `O(k + n)`。桶排序是一种非原地排序算法，稳定性取决于桶内部使用的排序算法。

桶排序算法适用于数据分布均匀、数据范围不大的场景。

以下是各排序的复杂度分析：

| 名称        | 分类       | 最好情况  | 平均/期望情况 | 最坏情况    | 内存         | 稳定性    | 
| ----------- | --------- | --------- | ------------ | ---------- | ----------- | --------- |
| 冒泡排序    | 基于比较    | O(n)     | O(n²)        | O(n²)      | O(1)         | 稳定      |       
| 选择排序    | 基于比较    | O(n²)    | O(n²)        | O(n²)      | O(1)         | 不稳定    |
| 插入排序    | 基于比较    | O(n)     | O(n²)        | O(n²)      | O(1)         | 稳定      |
| 归并排序    | 基于比较    | O(nlogn) | O(nlogn)     | O(nlogn)   | O(n)         | 稳定      |
| 堆排序      | 基于比较    | O(nlogn) | O(nlogn)     | O(nlogn)   | O(1)         | 不稳定    |
| 快速排序    | 基于比较    | O(nlogn) | O(nlogn)     | O(n²)      | O(logn) 原地 | 不稳定    |
| 计数排序    | 基于计算    | ——       | O(k + n)     | O(k + n)   | O(k + n)     | 稳定      |
| 桶排序      | 基于计算    | ——       | O(n)         | O(n²)      | O(k + n)     | 稳定      |

堆排序的思想和实现将在[堆](./heap.md)中详细讲解。

关于更多算法的可视化，可以点击[这里](https://www.cs.usfca.edu/~galles/visualization/Algorithms.html)查看。

## 参考

- [Wikipedia](https://en.wikipedia.org/wiki/Sorting_algorithm)
- [javascript-algorithms](https://github.com/trekhleb/javascript-algorithms)
- 《算法导论》
- 《算法》（第4版）
- 《数据结构与算法之美》
- 《学习JavaScript数据结构与算法》（第3版）