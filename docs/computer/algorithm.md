# 数据结构与算法

**是什么？**

数据结构是存储和组织数据的方式。通俗的讲就是装物品的容器，不同的物品需要不同的容器装。

算法是一种计算过程或求解方法。就像我们生活中所遇问题的解决的方法，在不同场景需要使用不同的方法。

程序 = 数据结构 + 算法。

**为什么？**

- 科班出身没有学过数据结构与算法是不完整的。
- 经常刷题有助于让自己变得聪明。
- 想在这个行业深耕的必备条件。
- 提升价值，迎娶白富美:joy:。

## 复杂度

算法的复杂度包括时间复杂度和空间复杂度。理解了复杂度，可以让我们在写代码之前考虑写的这段代码会不会遭同事毒打。😅

### 时间复杂度

时间复杂度指的是一段代码执行需要消耗的时间资源，使用大 O 表示法来表示时间复杂度，表示代码执行时间随数据规模增长的变化趋势。

常见的时间复杂度有：常数阶 O(1)，对数阶 O(logn)，线性阶 O(n)，线性对数阶 O(nlogn)，平方阶 O(n<sup>2</sup>)，立方阶 O(n<sup>3</sup>)....K 次方阶 O(n<sup>k</sup>)，指数阶 O(2<sup>n</sup>)。

#### 分析技巧

这些分析技巧用来分析多段代码的时间复杂度。

- 只关注循环最多的一段代码；
- 总复杂度等于量级最大那段代码的复杂度；
- 嵌套代码的复杂度等于嵌套内外代码复杂度的乘积。

#### 分析方法

同一段代码在不同情况下仍可能存在运行时间的不同，这时候就需要使用以下几种比较极端的时间复杂度分析方法。

- 最好情况时间复杂度。
- 最坏情况时间复杂度。
- 平均情况时间复杂度。
- 均摊时间复杂度。

### 空间复杂度

空间复杂度指的是需要消耗的空间资源，也就是一段代码占用的内存空间。使用大 O 表示法来表示空间复杂度，表示算法的存储空间与数据规模之间的增长关系。

常见的空间复杂度有： O(1)、O(n)、O(n<sup>2</sup>)。