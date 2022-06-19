# 递归 & 分治

## 递归

**递归**（Recursion）是一种解决计算问题的方法，通过不断直接过间接的调用自身以解决若干子问题。递归是分治和深度优先搜索等高级算法的基础。

递归可以用来解决阶乘和斐波那契数列计算问题。

1. 阶乘

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

2. 斐波那契数列

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

## 分治算法

**分治算法**（Divide and conquer，也称分而治之）是一种算法设计方法。其核心思想是（递归的）将原问题**分解**为多个规模更小且类似于原问题的子问题，直到子问题简单到可以直接**解决**为止，然后将子问题的解**合并**成原问题的解。分治算法是归并排序和快速排序等高级算法的基础。