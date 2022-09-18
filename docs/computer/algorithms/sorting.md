# 排序算法

**排序算法**（Sorting algorithm）是一种将一组数据按照特定顺序排列的算法。

常见的排序算法包括：冒泡排序、插入排序、选择排序、快速排序、归并排序、计数排序和桶排序等。

在分析排序算法时，需要从以下几个方面考虑：

- 执行效率。交换和比较的次数、数据的排序程度和数据规模。

- 内存消耗。读写数组次数和是否原地排序。

- 稳定性。数据中值相等的元素在排序后先后顺序是否改变。

## 冒泡排序

**冒泡排序**（Bubble sort）是一种基于比较的简单排序算法。其思想是将相邻两个元素比较交换到未排序区间最右侧。

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

## 选择排序

**选择排序**（Selection sort）是一种基于比较的简单排序算法。其思想是将未排序区间的最小元素与未排序区间的第一个元素交换。

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

## 插入排序

**插入排序**（Insertion sort）是一种基于比较的简单排序算法。其思想是从未排序列表中取出第一个元素插入到已排序列表合适位置。

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

插入排序最好情况时间复杂度为 O(n)，平均和最坏情况时间复杂度为 O(n²)。插入排序是稳定原地排序算法，其空间复杂度为 O(1)。插入排序适合在小规模数据中使用。

## 归并排序

**归并排序**（Merge sort）是一种基于比较的分治排序算法。其思想是（递归的）将未排序数组分解成多个子数组，直到子数组中只有一个元素为止，最后将子数组合并为较大的数组，直到只剩下一个排序数组为止。

![Merge-sort](https://upload.wikimedia.org/wikipedia/commons/c/cc/Merge-sort-example-300px.gif)

归并排序包括自上而下和自下而上两种实现方式。

### 自上而下归并排序

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

### 自下而上归并排序

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

归并排序的最好、平均和最坏情况时间复杂度为 O(nlogn)。归并排序是稳定非原地排序算法，因为在合并过程中需要借助额外存储空间，其空间复杂度为 O(n)。归并排序适合在没有空间限制的大规模数据中且使用。

## 快速排序

**快速排序**（Quick sort）是一种基于比较且应用广泛的分治排序算法。其思想是从数组中**选择**一个主元元素（povit element），根据该元素与其他元素的大小关系将数组的其他元素**划分**为两个子数组；然后递归的对子数组进行排序，重复以上两步，直到子数组只包含一个元素为止，则该数组完全有序。

![Quick-sort](https://upload.wikimedia.org/wikipedia/commons/9/9c/Quicksort-example.gif)

选择主元有很多方式，最简单的一种是选择数组最左边或最右边元素，另一种是随机选择一个元素或选择中间元素。划分操作有 Lomuto 和 Hoare 两种思路。

Lomuto 划分选择数组最右边元素作为主元，并围绕它来划分子数组。其中维护了 i 和 j 两个索引，通过遍历数组，将小于主元的元素放到 lo 到 i - 1 区间中，将等于或大于主元的元素放到 i 到 j 区间中。循环结束后，将主元交换到两个区间之间。

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

Hoare 划分选择数组中间元素作为主元来划分子数组。然后从左往右扫描直到找到第一个大于等于它的元素，再从右往左扫描直到找到第一个小于等于它的元素，最后交换这两个元素。如果两指针相遇，返回 j 即可。

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

Lomuto 划分紧凑且易于理解，Hoare 划分性能较好，平均交换次数减少了三倍。

对于简单的选择最左边或者最右边的元素作为主元，每层递归选择的主元划分的子数组可能会极度不平衡，最坏情况时间复杂度为 O(n²)。不过，可以使用随机抽样法或者三数取中法来选择一个划分平衡的主元，让期望运行时间达到 O(nlogn)。

实际应用中经常会出现存在大量重复数据的数组，可以使用三向切分的思路，将数组切成小于、等于和大于主元元素三个部分来进一步优化快速排序。

快速排序最好和平均情况时间复杂度为 O(nlogn)，最坏情况时间复杂度为 O(n²)。快速排序是一种原地不稳定的排序算法，空间复杂度为 O(logn)。快速排序适合在大规模数据中使用。

以上排序算法都是基于**比较**的排序算法，这也决定了他们最好情况时间复杂度为 O(nlogn)，以下是基于**计算**的几种线性排序算法。

## 计数排序

**计数排序**（Counting sort）是一种基于计算的整数排序算法。其思想是计算数组当前元素出现的次数，并根据该元素与其它元素大小关系的个数来确认当前元素的位置，然后从右往左对数组进行排序。

``` js
function countingSort(array) {
  const n = array.length;
  const findMaxValue = array => {
    let max = array[0];
    for (let i = 1; i < n; i++) {
      if (max < array[i]) max = array[i];
    }
    return max;
  };
  if (n <= 1) return array;
  const k = findMaxValue(array);
  const count = new Array(k + 1).fill(0);
  for (let i = 0; i < n; i++) {
    count[array[i]] += 1;
  }
  for (let i = 1; i <= k; i++) {
    count[i] += count[i - 1];
  }
  const temp = [...array];
  for (let i = n - 1; i >= 0; i--) {
    array[count[temp[i]] - 1] = temp[i];
    count[temp[i]] -= 1;
  }
  return array;
}
countingSort([2, 5, 3, 0, 2, 3, 0, 3]);
```

在计数排序算法的代码中，我们首先需要找到未排序数组中的最大值；其次根据它来创建一个大小为 k + 1 的数组 count，并对元素出现次数进行计数；然后在 count 中计算小于等于当前元素的个数；最后为了保证算法的稳定性，从右到左根据当前元素的位置排序并从 count 中将当前元素出现的次数减一；最终返回已排序数组。

计数排序的时间和空间复杂度都是 O(k + n)，如果 k = O(n)，时间复杂度为 O(n)，它是一种稳定非原地的排序算法，是基数排序的基础。

计数排序算法仅适用于整数数据，如果数据中包含负整数，需要先将数据转换为正整数，再进行排序。

## 桶排序

**桶排序**（Bucket sort）是一种基于计算的排序算法。其思想是首先将元素均匀、独立地分布在 n 个相同大小的区间内（桶），然后对桶内的元素排序，最后依次遍历每个桶的元素即可完成排序。

``` js
function bucketSort(array, size = 2) {
  const n = array.length;
  let minValue = array[0];
  let maxValue = array[0];
  for (let i = 1; i < n; i++) {
    if (array[i] < minValue) {
      minValue = array[i];
    }
    if (array[i] > maxValue) {
      maxValue = array[i];
    }
  }
  const count = Math.floor((maxValue - minValue) / size) + 1;
  const buckets = [];
  for (let i = 0; i < count; i++) {
    buckets[i] = [];
  }
  for (let i = 0; i < n; i++) {
    const j = Math.floor((array[i] - minValue) / size);
    buckets[j].push(array[i]);
  }
  const sortedArray = [];
  for (let i = 0; i < buckets.length; i++) {
    if (!buckets[i]) continue;
    insertionSort(buckets[i]);
    sortedArray.push(...buckets[i]);
  }
  return sortedArray;
}
bucketSort([11, 9, 6, 8, 1, 3, 5, 1, 1, 0, 100], 10);
```

在桶排序算法代码中，需要建立 n 个大小相同的桶，然后依次将元素放入到不同范围的桶中，桶可以使用动态数组或者链表数据结构来实现，最后对每个桶进行排序，排序可以选择插入排序或者快速排序。

桶排序算法的平均情况时间复杂度为 O(n)，最坏情况时间复杂度为 O(n²)，空间复杂度为 O(k + n)。桶排序是一种非原地排序算法，稳定性取决于桶内部使用的排序算法。

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