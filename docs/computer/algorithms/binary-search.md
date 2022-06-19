# 二分查找

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