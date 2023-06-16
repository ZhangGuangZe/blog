# 并查集

**并查集**（Disjoint-set）是一种用于处理一些不相交集合的合并和查询问题的数据结构。

## 表示

并查集通常用数组表示元素和集合的关系。数组的索引表示元素，数组的值表示元素所属的集合。初始情况下，我们将 n 个不同的元素放入到只包含自己的集合中。`parents` 属性用于存储当前元素所属的集合，`size` 属性表示集合的数量。

``` js
constructor(n) {
  this.parents = new Array(n);
  this.size = n;

  for (let i = 0; i < n; i++) {
    this.parents[i] = i;
  }
}
```

## 操作

并查集主要包括查找和合并两个操作：

- `find(x)` 用于查找指定元素 x 所在集合。

- `union(x, y)` 用于将元素 x 和元素 y 所在集合中的所有元素合并。

## 实现

### quick-find

quick-find 算法中相同集合的每个元素的值必须相等。

``` js
find(x) {
  return this.roots[x];
}
union(x, y) {
  const rootX = this.find(x);
  const rootY = this.find(y);

  if (rootX === rootY) return;
  
  for (let i = 0; i < this.parents.length; i++) {
    if (this.parents[i] === rootX) {
      this.parents[i] = rootY;
    }
  }
  this.size--;
}
```

在合并过程中，我们首先需要检查 x 和 y 是否在同一个集合中。如果是则无需合并；否则我们遍历数组，将元素 x 所在的集合的所有元素合并到元素 y 所在集合中。

quick-find 算法的合并操作时间复杂度为 O(n)，可以使用 quick-union 算法进一步优化。

### quick-union

quick-union 算法引入了树的概念，只不过这棵树使用数组表示。每一个集合表示一棵树，集合中的元素表示为树中的节点，树的根节点表示集合本身。初始情况下，每个节点的根节点为它自己。查找操作会从当前节点向上查找父节点，直到找到根节点为止；合并操作会将一个节点的根节点指向另一个节点的根节点。

``` js
find(x) {
  return x !== this.parents[x] ? this.find(this.parents[x]) : x;
  /* 迭代实现
  while (x !== this.parents[x]) {
    x = this.parents[x];
  }
  return x;
  */
}
union(x, y) {
  const rootX = this.find(x);
  const rootY = this.find(y);

  if (rootX === rootY) return;

  this.parents[rootX] = rootY;
  this.size--;
}
```

quick-union 算法虽然优化了 quick-find 算法的合并操作，但在最坏情况下（某些极端输入），树会退化成链表，从而影响查询操作的效率。

### 最优算法

我们可以使用两种启发式策略来提高合并和查询操作的效率。

第一种启发式策略是**按秩合并**（union by rank）。我们维护一个**秩**（ranks），表示每棵树的深度，初始情况下，每棵树的秩为 0。在合并操作中，当两棵树的秩不同时，将较小秩的根指向较大秩的根；当两棵秩相同的树合并后，新的树的秩为原来树的秩加一。

第二种启发式策略是**路径压缩**（path compression）。在查找操作中，使用**两趟方法**，第一趟沿着查找路径向上查找根节点，第二趟从根节点向下将路径上的每个节点的父节点指向根节点。

以下是结合两种策略的最优算法实现：

``` js
class DisjointSet {
  constructor(n) {
    this.parents = new Array(n); // 存储每个集合的根节点
    this.ranks = new Array(n); // 用于记录每棵树的秩（深度），从而进行按秩合并
    this.size = n; // 当前集合的数量

    for (let i = 0; i < n; i++) {
      this.parents[i] = i; // 每个元素自成一个集合，将每个集合的根节点初始化为自身
      this.ranks[i] = 0; // 将每棵树的深度初始化为 0
    }
  }
  find(x) {
    if (this.parents[x] !== x) {
      this.parents[x] = this.find(this.parents[x]);
    }
    return this.parents[x];
    /*
    路径压缩迭代实现
    let root = x;
    while (root !== this.parents[root]) {
      root = this.parents[root]; // 沿着查找路径向上查找根节点
    }
    while (x !== this.parents[x]) {
      [this.parents[x], x] = [root, this.parents[root]]; // 从根节点向下将路径上的每个节点的父节点指向根节点
    }
    return root;
    */
  }
  union(x, y) {
    const rootX = this.find(x);
    const rootY = this.find(y);

    if (rootX === rootY) return;
    
    // 按秩合并
    if (this.ranks[rootX] < this.ranks[rootY]) {
      this.parents[rootX] = rootY;
    } else if (this.ranks[rootX] > this.ranks[rootY]) {
      this.parents[rootY] = rootX;
    } else {
      this.parents[rootY] = rootX;
      this.ranks[rootX] += 1;
    }
    this.size--;
  }
}
```

关于并查集的详细代码和测试请点击[这里](https://github.com/ZhangGuangZe/data-structures-and-algorithms-in-javascript/tree/master/disjoint-set)查看。

## 应用场景

- 连通性问题
- 最小生成树

## 参考

- [Wikipedia](https://en.wikipedia.org/wiki/Disjoint-set_data_structure)
- 《算法导论》
- 《算法》（第4版）
- [《算法面试通关 40 讲》](https://time.geekbang.com/course/detail/100019701-72531)
- 《JavaScript 算法——基本原理与代码实现》
- [如何使用 JavaScript 实现并查集](https://chat.openai.com/)