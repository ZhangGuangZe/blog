# 栈

**栈**（Stack）是一种**后进先出**（LIFO, Last In First Out）的线性表数据结构或者抽象数据类型。类似于一个弹夹，只能在弹夹头部（栈顶）压入和弹出子弹。

栈的操作主要包括**压入**（push）和**弹出**（pop）操作，这两个操作的时间复杂度为 O(1)。

栈可以基于数组和链表数据结构实现。

## 基于数组实现栈

基于数组实现的栈结构包括一个保存栈顶元素的 `top` 指针、一个存储栈元素的 `items` 数组和指定栈容量的 `size` 属性。

``` js
class ArrayBasedStack {
  constructor(capacity) {
    this.top = 0;
    this.items = new Array(capacity);
    this.size = capacity;
  }
}
```

1. 基于固定大小数组的定容栈

压入操作将元素压入栈顶同时将 `top` 指针指向新元素，如果当前栈已满，将不再压入数据。

``` js
push(data) {
  if (this.isFull()) return;
  this.items[this.top++] = data;
}
```

弹出操作将返回栈顶元素同时将 `top` 指针指向已弹出元素的下一个元素，如果当前栈为空，执行弹出操作将不再弹出数据。

``` js
pop() {
  if (this.isEmpty()) return;
  return this.items[--this.top];
}
```

压入和弹出操作需要考虑上溢和下溢情况，时间复杂度为 O(1)。

2. 基于动态数组的栈

由于我们使用的是数组数据结构，这就意味着我们需要事先指定栈的容量。如果指定的容量太小，当栈满后则无法将数据压入栈中；如果指定的容量太大，当栈内元素非常少甚至为空时将会浪费大量存储空间。我们可以使用动态数组来解决定容栈栈空间固定的问题，并且彻底删除已弹出的栈元素但还保存在动态数组中的元素。

在压入操作中，如果栈满，我们首先把原数组扩容两倍，并依次将元素搬移到扩容数组中，最后进行入栈操作。

``` js
push(data) {
  if (this.isFull()) {
    this.size *= 2;
    const temp = new Array(this.size);
    for (let i = 0; i < this.top; i++) {
      temp[i] = this.items[i];
    }
    this.items = temp;
  }
  this.items[this.top++] = data;
}
```

由于扩容需要 O(n) 的时间搬移数据，所以基于动态数组实现栈的压入操作最好情况时间复杂为 O(1)，最坏情况时间复杂度为 O(n)，而通过均摊分析将搬移数据所需时间均摊给每次 O(1) 的压入操作，得到平均情况时间复杂度为 O(1)。

在弹出操作中，我们首先进行弹出操作，并把栈顶元素从动态数组中删除，避免弹出元素占用数组空间问题；然后如果当前栈内元素数量为数组的四分之一时，我们将数组缩容到原来的一半；最后将弹出操作前记录的栈顶元素返回。

``` js
pop() {
  if (this.isEmpty()) return;
  this.top--;
  const item = this.items[this.top];
  delete this.items[this.top];
  if (this.top > 0 && this.top === Math.floor(this.items.length / 4)) {
    this.items.length = Math.floor(this.items.length / 2);
  }
  return item;
}
```

基于动态数组实现栈的弹出操作需要考虑下溢情况，时间复杂度为 O(1)。

以下是基于数组实现栈的其他操作：

``` js
peek() {
  return this.items[this.top - 1];
}
isEmpty() {
  return this.top === 0;
}
isFull() {
  return this.top === this.size;
}
```

基于动态数组实现栈的优点是压入和弹出操作可以根据栈空间使用情况动态扩容和缩容，但压入操作的最坏情况时间复杂度为 O(n)。

## 基于链表实现栈

基于链表实现栈的结构同样需要一个 `top` 属性记录当前栈元素数量，只不过使用单链表来存储栈元素。

``` js
class LinkedListBasedStack {
  constructor() {
    this.top = 0;
    this.head = null;
  }
}
```

压入和弹出操作思路是从链表头部插入和删除元素并更新 `top` 指针即可，节点结构请参考单向链表节点结构。

``` js
push(data) {
  const node = new Node(data);
  if (this.head) node.next = this.head;
  this.head = node;
  this.top++;
}
pop() {
  if (this.isEmpty()) return;
  let val = this.peek();
  this.head = this.head.next;
  this.top--;
  return val;
}
```

基于链表实现的栈压入和弹出操作时间复杂度为 O(1)。

基于链表实现的栈的其他操作：

``` js
peek() {
  return this.head.data;
}
isEmpty() {
  return this.top === 0;
}
```

基于链表实现栈的优点是可以灵活动态的将数据压入和弹出，但创建链表节点需要额外存储空间存放节点指针。

## 应用场景

- 函数调用
- 算数表达式求值
- 括号匹配
- 浏览器的前进后退功能
- 递归
- 回溯
- 深度优先搜索