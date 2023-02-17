# 递归

**递归**（Recursion）是一种解决计算问题的方法，通过不断直接或间接的调用自身以解决若干子问题，然后通过子问题解决原问题。

递归编码关键在于寻找递归**终止条件**和推导**递推公式**。

下面，我们通过递归来求解阶乘和斐波那契数列问题。

## 阶乘

计算 n 的阶乘（n!），就是计算从 1 ~ n 的乘积。

- 递归实现

``` js
function factorial(n) {
  if (n <= 1) return 1; // 终止条件
  return n * factorial(n - 1); // 递推过程
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

## 斐波那契数列

斐波那契数列是由 0, 1, 1, 2, 3, 5, 8, 13, 21, 34, 55 等数组成的序列。从 0 和 1 开始，每个数等于前两个数之和。

- 递归实现

``` js
function fibonacci(n) {
  return n <= 1 ? n : fibonacci(n - 1) + fibonacci(n - 2);
}
```

从斐波那契数列的递归实现可以看出，递归代码简洁易读。

但是，递归代码存在大量**重复子问题**，我们可以通过**记忆化**手段解决此问题，也就是将子问题的答案存入数组，当再次遇到相同子问题时直接从数组中获取子问题的解，而无需重新计算。

- 记忆化递归

``` js
function fibonacci(n) {
  const cache = new Array(n + 1);
  cache[0] = 0, cache[1] = 1;

  const helper = n => {
    if (n <= 1) return n;

    if (cache[n]) return cache[n];

    cache[n] = helper(n - 1) + helper(n - 2);
    return cache[n];
  }
  return helper(n);
}
```

## 应用场景

- 分治算法
- 深度优先搜索算法

## 参考

- [Wikipedia](https://en.wikipedia.org/wiki/Recursion_(computer_science))
- 《算法导论》
- 《算法》（第4版）
- 《数据结构与算法之美》
- 《学习JavaScript数据结构与算法》（第3版）