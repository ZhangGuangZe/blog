# 数组

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
