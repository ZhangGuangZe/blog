# 图

**图**（Graph）是一种由一组**顶点**（Vertex）和一系列将顶点相连的**边**（Edge）组成的非线性表抽象数据结构。顶点间相连的边的数量称为**度**（Degree）。顶点的**入度**（In-degree）表示有多少条边指向当前顶点，顶点的**出度**（Out-degree）表示当前顶点有多少条边指向其它顶点。

如果顶点之间的边是有方向的，则该图称为**有向图**，否则称为**无向图**。

如果顶点之间的边是有权重的，则该图称为**带权图**。

如果顶点之间都存在连接对方的路径时，则该图称为**连通图**。

## 图的表示

**邻接矩阵**（Adjacency matrix）和**邻接表**（Adjacency list）是常用的两种表示图的方式。

### 邻接矩阵

邻接矩阵通过一个二维数组来表示顶点之间的连接关系。

对于无向图，如果顶点 i 与顶点 j 相连，则 `adjMatrix[i][j]` 和 `adjMatrix[j][i]` 为 1；对于有向图，如果顶点 i 指向顶点 j，则 `adjMatrix[i][j]` 为 1；对于带权图，则 `adjMatrix[i][j]` 表示顶点间边的权重。

以下是无向图的邻居矩阵表示示例。

``` js
class GraphByAdjMatrix {
  constructor(vertices) {
    this.vertices = vertices;
    this.adjMatrix = Array.from({ length: vertices }, () => new Array(vertices).fill(0));
  }

  addEdge(u, v) {
    this.adjMatrix[u][v] = 1;
    this.adjMatrix[v][u] = 1;
  }
}
```

通过邻接矩阵表示的优点在于可以直观、简单的表示图，并且可以快速判断两个顶点之间是否存在连接关系，时间复杂度为 O(1)。缺点则是需要消耗大量空间，空间复杂度为 O(V²)。因此，邻接矩阵适用于表示规模较小的图和**稠密图**（E 接近 V²）。

### 邻接表

邻接表通过一个包含 V 个相邻顶点的列表集合来表示顶点之间的连接关系。我们可以用数组、链表和散列表等数据结构来表示相邻顶点列表。

对于无向图，与顶点相连的所有顶点都会存储到对应的列表中。

以下是无向图的邻接表表示示例。

``` js
class GraphByAdjList {
  constructor(vertices) {
    this.vertices = vertices;
    this.adjList = Array.from({ length: vertices }, () => []);
  }

  addEdge(u, v) {
    this.adjList[u].push(v);
    this.adjList[v].push(u);
  }
}
```

对于有向图，当前顶点指向的所有顶点都会存储到对应列表中。

以下是有向图的邻接表表示示例。

``` js
class DigraphByAdjList {
  constructor(vertices) {
    this.vertices = vertices;
    this.adjList = Array.from({ length: vertices }, () => []);
  }

  addEdge(u, v) {
    this.adjList[u].push(v);
  }
}
```

对于带权图，与顶点相连的的所有顶点及权重都会存储到对应列表中。

通过邻接表表示的优点在于灵活，并且节省存储空间，空间复杂度为 O(V + E)。而缺点则是无法快速判断两个顶点之间是否存在连接关系，时间复杂度为 O(degree)，不过可以使用其他高效数据结构（哈希表、跳表和红黑树等）来提高查询效率。因此，邻接表适用于表示**稀疏图**（E 远远小于 V²）。

## 图的搜索

图的搜索是一种系统地跟随图的边访问图中所有顶点的过程。图搜索算法可以用来发现图的结构，检查图的连通性（两个给定顶点是否连通、找出图中的所有连通分量），检查图是否有环，寻找路径（两点之间的路径和最短路径）等。

简单的图搜索算法包括**深度优先搜索**（Depth-first search，DFS）和**广度优先搜索**（Breadth-first search，BFS）两种。

### 深度优先搜索

深度优先搜索从一个起始顶点开始，沿着一条路径尽可能深的探索顶点，直到该路径上的最后一个顶点被发现为止，然后**回溯**到上一个顶点探索下一条路径。该过程一直持续到从起始顶点可以达到的所有顶点被发现为止。如果图中还存在尚未被发现的顶点，则从该顶点开始重复同样的搜索过程，直到图中所有顶点被发现为止。

深度优先搜索需要使用递归或显式栈来实现。

我们从图中每个未访问的顶点开始遍历，如果当前顶点没有被访问过，则使用 `dfs` 递归方法。当访问当前顶点时，将其标记为已访问，以避免重复访问，然后遍历当前顶点的所有邻居顶点，递归地访问它的所有未被访问的邻居顶点。

``` js
function dfs(graph, v, visited) {
  visited[v] = true;

  for (const w of graph[v]) {
    if (!visited[w]) {
      dfs(graph, w, visited);
    }
  }
}

function depthFirstSearch(graph) {
  const n = graph.length;
  const visited = new Array(n).fill(false);

  for (let v = 0; v < n; v++) {
    if (!visited[v]) {
      dfs(graph, v, visited);
    }
  }
}
```

深度优先搜索需要访问图中的所有顶点和边，因此时间复杂度为 O(V+E)，其中 V 表示顶点数，E 表示边数。

深度优先搜索的空间复杂度取决于递归调用栈的最大深度。最坏情况下，递归可能包含所有顶点，因此空间复杂度为 O(V)。

深度优先搜索适用于解决连通性问题、检查两点是否存在路径问题、深度相关问题和拓扑排序等。

#### 拓扑排序

**拓扑排序**（Topological sorting）是一种用于在有向无环图（DAG）中将图中所有顶点按照一种线性顺序（优先次序）排列的算法，图中所有有向边都从左指向右。

拓扑排序通常用于解决任务调度、编译器依赖关系管理等问题。

我们可以使用深度优先搜索和 Kahn 算法来对有向无环图进行拓扑排序。

##### 基于深度优先搜索实现的拓扑排序

为了检测图中是否有环，需要使用 `visited` 变量记录当前顶点的访问状态，0 表示未访问，1 表示正在访问，2 表示已访问。初始时，所有顶点都标记为未访问。

我们首先遍历图中所有未访问的顶点。在深度优先搜索过程中，如果当前顶点正在访问，说明有环则无法继续拓扑排序；如果当前顶点已访问，则继续访问其它未访问的邻居顶点；否则将当前顶点标记为正在访问，然后递归地访问当前顶点未访问过的邻居顶点。如果当前顶点的所有邻居顶点都已经被访问过，则将当前顶点标记为已访问，并将其加入拓扑排序结果中。在深度优先搜索完成后，**需要对结果进行逆序才能得到正确的拓扑排序结果**。

``` js
topologicalSortByDFS() {
  const visited = new Array(this.vertices).fill(0);
  const result = [];

  const dfs = v => {
    if (visited[v] === 1) return false;
    if (visited[v] === 2) return true;

    visited[v] = 1;

    for (const w of this.adjList[v]) {
      if (!dfs(w)) return false;
    }

    visited[v] = 2;
    result.push(v);
    return true;
  };

  for (let i = 0; i < this.vertices; i++) {
    if (!visited[i] && !dfs(i)) return [];
  }

  return result.reverse();
}
```

##### 基于 Kahn 算法实现的拓扑排序

Kahn 算法需要使用 `indegrees` 变量统计每个顶点的入度。

我们首先遍历图将入度为 0 的顶点加入队列 `queue` 中。然后进行拓扑排序，从队列中出队一个顶点，将其加入到拓扑排序的结果中，并将该顶点的所有邻居顶点的入度减 1，将入度为 0 的邻居顶点入队，重复拓扑排序的过程直到队列为空为止。如果拓扑排序的的结果包含所有顶点，返回该结果；否则说明有环无法得到有效的拓扑排序结果。

``` js
topologicalSortByKahn() {
  const indegrees = new Array(this.vertices).fill(0);
  const result = [];

  for (const neighbors of this.adjList) {
    for (const w of neighbors) {
      indegrees[w]++;
    }
  }

  const queue = [];
  for (let i = 0; i < indegrees.length; i++) {
    if (indegrees[i] === 0) queue.push(i);
  }
  
  while (queue.length > 0) {
    const v = queue.shift();
    result.push(v);

    for (const w of this.adjList[v]) {
      if (--indegrees[w] === 0) queue.push(w);
    }
  }

  return result.length === this.vertices ? result : [];
}
```

### 广度优先搜索

广度优先搜索从起始顶点开始，逐层访问相邻顶点，直到遍历完整个图为止。

广度优先搜索需要通过队列来实现。

我们从指定起始顶点开始遍历，将其标记为已访问并入队。如果队列不为空，则出队一个顶点，然后将其未访问的邻居顶点标记为已访问并入队。重复以上操作直到图中所有顶点被访问为止。

``` js
function bfs(graph, startVertex, visited) {
  visited[startVertex] = true;
  const queue = [startVertex];
  
  while (queue.length > 0) {
    const v = queue.shift();

    for (const w of graph[v]) {
      if (!visited[w]) {
        visited[w] = true;
        queue.push(w);
      }
    }
  }
}

function breathFirstSearch(graph) {
  const n = graph.length;
  const visited = new Array(n).fill(false);

  bfs(graph, 0, visited);
}
```

广度优先搜索在最坏情况下需要访问图中的所有顶点和边，因此时间复杂度为 O(V+E)，其中 V 表示顶点数，E 表示边数。

广度优先搜索的空间复杂度取决于队列和 `visited` 数组。最坏情况下，可能需要存储所有顶点，因此空间复杂度为 O(V)。

广度优先搜索适用于解决连通性问题、层级相关问题和寻找两点之间的最短路径等问题。

## 最短路径算法

## 最小生成树算法

## 应用场景

## 参考
- - [Wikipedia](https://en.wikipedia.org/wiki/Graph_traversal)
- 《算法导论》
- 《算法》（第4版）
- 《数据结构与算法之美》
- 《学习JavaScript数据结构与算法》（第3版）
- [javascript-algorithms](https://github.com/trekhleb/javascript-algorithms/tree/master/src/data-structures/graph)