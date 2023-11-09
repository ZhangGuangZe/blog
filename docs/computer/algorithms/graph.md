# 图

**图**（Graph）是一种由一组**顶点**（Vertex）和一系列将顶点相连的**边**（Edge）组成的非线性表抽象数据结构。顶点间相连的边的数量称为**度**（Degree）。顶点的**入度**（In-degree）表示有多少条边指向当前顶点，顶点的**出度**（Out-degree）表示当前顶点有多少条边指向其它顶点。

如果顶点之间的边是有方向的，则该图称为**有向图**，否则称为**无向图**。

如果顶点之间的边是有权重（距离、时间、花费等）的，则该图称为**带权图**。

如果顶点之间都存在连接对方的路径时，则该图称为**连通图**。

## 图的表示

**邻接矩阵**（Adjacency matrix）和**邻接表**（Adjacency list）是常用的两种表示图的方式。

### 邻接矩阵

邻接矩阵通过一个二维数组来表示顶点之间的连接关系。

对于无向图，如果顶点 u 与顶点 v 相连，则 `adjMatrix[i][u]` 和 `adjMatrix[v][u]` 为 1。

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

对于有向图，如果顶点 u 指向顶点 v，则 `adjMatrix[u][v]` 为 1；对于带权图，则 `adjMatrix[u][v]` 表示顶点间边的权重 w。

以下是有向带权图的邻接矩阵表示示例。

``` js
class WeightedDigraphByAdjMatrix {
  constructor(vertices) {
    this.vertices = vertices;
    this.adjMatrix = Array.from({ length: vertices }, () => new Array(vertices).fill(0));
  }

  addEdge(u, v, w) {
    this.adjMatrix[u][v] = w;
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

以下是有向带权图的邻接表表示示例：

``` js
class WeightedDigraphByAdjList {
  constructor(vertices) {
    this.vertices = vertices;
    this.adjList = Array.from({ length: vertices }, () => []);
  }

  addEdge(u, v, w) {
    this.adjList[u].push([v, w]);
  }
}
```

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

广度优先搜索从起始顶点开始，逐层访问当前顶点的相邻顶点，直到找到目标顶点或者遍历完整个图为止。

广度优先搜索需要通过队列来实现。

我们从指定起始顶点开始遍历，将其标记为已访问并入队。如果队列不为空，则出队一个顶点，然后将其未访问的邻居顶点标记为已访问并入队。重复以上操作直到找到目标顶点或者图中所有顶点被访问为止。

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

广度优先搜索适用于解决连通性问题、层级相关问题和寻找非带权图中的最短路径问题等。

以下代码是使用 BFS 寻找最短路径的实现。

``` js
function bfsShortestPaths(graph, startVertex) {
  const vertices = graph.length;
  const queue = [startVertex];
  const visited = new Array(vertices).fill(false);
  visited[startVertex] = true;

  const distances = {};
  const predecessors = {};

  for (let i = 0; i < vertices; i++) {
    distances[i] = 0;
    predecessors[i] = null;
  }

  while (queue.length > 0) {
    const v = queue.shift();

    for (const w of graph[v]) {
      if (!visited[w]) {
        visited[w] = true;
        distances[w] = distances[v] + 1;
        predecessors[w] = v;
        queue.push(w);
      }
    }
  }

  return { distances, predecessors };
}

function getPath(predecessors, startVertex, targetVertex) {
  const path = [];
  let currVertex = startVertex;

  while (currVertex !== targetVertex) {
    path.push(currVertex);
    currVertex = predecessors[currVertex];
  }
  path.push(targetVertex);

  return path.reverse();
}
```

我们在 BFS 的基础上增加了 `distances` 数组，用于表示起始顶点到当前顶点的距离，`predecessors` 数组，用于表示顶点的前驱顶点。通过当前顶点的前驱顶点回溯到起始顶点，从而得到一条从起始顶点到其它顶点的最短路径。

## 最短路径算法

**最短路径算法**（Shortest path algorithm）用于解决在带权图中的两顶点之间寻找最短路径问题。最短路径问题可分为单对顶点最短路径问题、单源最短路径问题和多源最短路径问题等。

### Dijkstra 算法

**Dijkstra 算法**解决的是在有向带权图中的单源最短路径问题，不过要求所有边的权重都为非负值。如果图中存在负权边，请使用 **Bellman-Ford** 算法。

Dijkstra 算法有很多变体，原始版本的算法仅适用于寻找两个给定顶点之间的最短路径，更常见的变体用于寻找从单个源顶点到图中所有顶点的最短路径。

Dijkstra 算法的原理是从源顶点开始，逐层找到离源顶点最近的邻居顶点，然后更新该顶点的访问状态，如果有比当前路径更短的路径，则更新其距离和前驱顶点，重复以上过程直到达到目标顶点或者所有顶点的最短路径计算完成为止。

![Dijkstra_Animation](https://upload.wikimedia.org/wikipedia/commons/5/57/Dijkstra_Animation.gif)

以下是朴素 Dijkstra 算法的实现：

``` js
function dijkstra(graph, sourceVertex) {
  const distances = {};
  const visited = {};
  const predecessors = {};
  const vertices = graph.length;

  for (let v = 0; v < vertices; v++) {
    distances[v] = Infinity;
    predecessors[v] = null;
  }
  distances[sourceVertex] = 0;

  for (let v = 0; v < vertices; v++) {
    let minVertex = -1;
    for (let i = 0; i < vertices; i++) {
      if (!visited[i] && (minVertex === -1 || distances[i] < distances[minVertex])) {
        minVertex = i;
      }
    }

    visited[minVertex] = true;

    for (let w = 0; w < vertices; w++) {
      const newDist = distances[minVertex] + graph[minVertex][w];
      if (
        !visited[w] && graph[minVertex][w] !== 0 &&
        distances[minVertex] !== Infinity && newDist < distances[w]
      ) {
        distances[w] = newDist;
        predecessors[w] = minVertex;
      }
    }
  }

  return { distances, predecessors };
}
```

朴素 Dijkstra 算法使用邻接矩阵表示图。`distances` 用于记录从源顶点到其它顶点的最短距离，`predecessors` 表示当前顶点的前驱顶点，我们可以根据其获取从源顶点到其它顶点的最短路径。

首先我们将源顶点自身的距离设置为 0，其它顶点的距离设置为无穷大，并且将每个顶点的前驱顶点设置为 null。其次我们选择距离源顶点最近的候选顶点作为当前顶点，并把其标记为已访问，以免重复计算。然后，对于当前顶点的所有邻居顶点，计算通过当前顶点到邻居顶点的距离并与之前记录的距离比较，如果当前顶点到邻居顶点的距离更短，则更新邻居顶点的距离和前驱顶点。最后继续迭代选择下一个距离源顶点最近的顶点，直到找到目标顶点或者所有顶点的最短路径计算完成为止。

朴素 Dijkstra 算法使用一个循环来不断选择距离源顶点最近的未访问顶点，时间复杂度为 O(V²)，我们可以使用优先队列（最小堆）来进一步优化算法的性能。

以下是基于优先队列优化的 Dijkstra 算法实现：

``` js
function dijkstraByPriorityQueue(graph, sourceVertex) {
  const distances = {};
  const predecessors = {};
  const vertices = graph.length;
  const queue = new PriorityQueue((a, b) => a[1] - b[1]);

  for (let v = 0; v < vertices; v++) {
    distances[v] = Infinity;
    predecessors[v] = null;
  }
  distances[sourceVertex] = 0;
  queue.insert([sourceVertex, 0]);

  while (!queue.isEmpty()) {
    const [vertex, weight] = queue.remove();

    for (const [neighbor, distance] of graph[vertex]) {
      const newDist = distance + weight;
      if (newDist < distances[neighbor]) {
        distances[neighbor] = newDist;
        predecessors[neighbor] = vertex;
        queue.insert([neighbor, newDist]);
      }
    }
  }

  return { distances, predecessors };
}
```

基于优先队列的 Dijkstra 算法使用邻接表来表示图。初始化时将源顶点及其距离加入到优先队列中。我们从优先队列中取出距离源顶点最近的顶点，然后遍历该顶点的邻居顶点，计算从源顶点到达邻居顶点的距离，如果计算出来的距离小于邻居顶点当前的距离，更新邻居顶点的距离和前驱顶点，并将邻居顶点和最新距离插入到优先队列中。重复以上过程直到找到目标顶点或者优先队列为空为止。

通过优先队列可以将 Dijkstra 算法的时间复杂度优化到 O(E*logV)。V 为顶点的个数，E 为边的数量，优先队列操作的时间复杂度为 O(logV)。

### Floyd–Warshall 算法

**Floyd–Warshall 算法**是一种通过动态规划思想来解决所有顶点对之间的最短路径问题的算法，它的主要原理是通过中间顶点逐步改进顶点之间的最短路径，直到所有顶点对的最短路径计算完成为止。

``` js
function floydWarshall(graph) {
  const vertices = graph.length;
  const distances = Array.from({ length: vertices }, () => []);
  const nextVertices = Array.from({ length: vertices }, () => Array(vertices).fill(null));

  for (let i = 0; i < vertices; i++) {
    for (let j = 0; j < vertices; j++) {
      distances[i][j] = graph[i][j];
      if (i !== j && graph[i][j] !== Infinity) {
        nextVertices[i][j] = j;
      }
    }
  }

  for (let k = 0; k < vertices; k++) {
    for (let i = 0; i < vertices; i++) {
      for (let j = 0; j < vertices; j++) {
        const middleDist = distances[i][k] + distances[k][j];
        if (middleDist < distances[i][j]) {
          distances[i][j] = middleDist;
          nextVertices[i][j] = nextVertices[i][k];
        }
      }
    }
  }

  return { distances, nextVertices };
}
```

我们首先需要创建一个用于计算最短路径值的 `distances` 矩阵和一个用于跟踪最短路径的 `nextVertices` 矩阵。初始化时，我们将每个顶点的权重赋值到 `distances` 矩阵中，如果顶点 `i` 和顶点 `j` 之间存在边，则将当前顶点的下一个顶点保存在 `nextVertices` 矩阵中。

Floyd–Warshall 算法的核心在于通过遍历依次将图中的所有顶点作为中间顶点，然后检查从顶点 `i` 到顶点 `j` 中间经过中间顶点的路径是否比直接从顶点 `i` 到顶点 `j` 的路径更短。如果是则更新这条最短路径的距离和下一个顶点。

图中所有顶点对之间的最短路径计算完成后，返回 `distances` 和 `nextVertices` 矩阵。我们可以利用 `distances` 矩阵获取顶点间的最短路径值，利用 `nextVertices` 矩阵来获取从起始顶点到目标顶点的最短路径。

Floyd–Warshall 算法的时间复杂度为 O(V³)，空间复杂度为 O(V²)，V 为图中顶点的个数。

Floyd–Warshall 算法适用于在小规模的稠密图中一次性找到图中所有顶点的最短路径。

## 最小生成树算法

**最小生成树算法**（Minimum spanning tree algorithm，简称 MST）用于在连通加权无向图中寻找一棵能够连接图中所有顶点并且边的权重和最小的树。

Prim 算法和 Kruskal 算法是解决最小生成树问题的两种经典算法。它们都基于贪心算法思想。

### Prim 算法

**Prim 算法**的核心原理是从任意一个起始顶点开始，逐步在与当前顶点相邻的、未选择的顶点中选择权重最小的边，将其加入到最小生成树中，直到生成树中包含 V-1 条边为止。

![Prim_Animation](https://upload.wikimedia.org/wikipedia/commons/9/9b/PrimAlgDemo.gif)

以下是 Prim 算法的代码实现：

``` js
function prim(n, graph) {
  const minimumSpanningTree = [];
  const priorityQueue = new PriorityQueue((a, b) => a[2] - b[2]);
  const visited = new Set();
  let selectedEdgeCount = 0;

  const startVertex = 0;
  visited.add(startVertex);

  for (const [neighbor, weight] of graph[startVertex]) {
    priorityQueue.insert([startVertex, neighbor, weight]);
  }

  while (!priorityQueue.isEmpty() && selectedEdgeCount < n - 1) {
    const [u, v, w] = priorityQueue.remove();

    if (visited.has(u) && visited.has(v)) continue;

    minimumSpanningTree.push([u, v, w]);
    const nextVertex = visited.has(u) ? v : u;
    visited.add(nextVertex);

    selectedEdgeCount++;

    for (const [neighbor, weight] of graph[nextVertex]) {
      if (!visited.has(neighbor)) {
        priorityQueue.insert([nextVertex, neighbor, weight]);
      }
    }
  }

  return selectedEdgeCount === n - 1 ? minimumSpanningTree : [];
}
```

Prim 算法需要使用优先队列来快速查找权重最小的边，并且需要一个集合来记录顶点是否被选择。

初始化时任意选择一个顶点作为起始顶点，将其标记为已选择，并将该顶点相连的所有边加入到优先队列中。然后从优先队列中取出权重最小的边，确保边的一个顶点被选择，另一个顶点未被选择。将所选择的边添加到生成树中，并将边另一端的顶点标记为已选择。将新选择的顶点的相邻边加入优先队列，以便下一次选择。直到生成树中包含 V-1 条边为止。

Prim 算法的时间复杂度为 O(ElogE)。

### Kruskal 算法

**Kruskal 算法**的核心原理是按权重递增顺序，逐步选择图中不同连通分量且权重最小的边，将边对应的两个顶点合并到一个集合中，并将边添加到生成树中，直到生成树包括 V-1 条边（并查集只存在一个集合）为止。

![Kruskal_Animation](https://upload.wikimedia.org/wikipedia/commons/b/bb/KruskalDemo.gif)

以下是 Kruskal 算法的代码实现：

``` js
function kruskal(n, edges) {
  const minimumSpanningTree = [];
  const ds = new DisjointSet(n);
  let count = 0;

  edges.sort((a, b) => a[2] - b[2]);

  for (const [u, v, w] of edges) {
    if (ds.isConnected(u, v)) continue;

    ds.union(u, v);
    minimumSpanningTree.push([u, v, w]);

    count++;
    if (count === n - 1) return minimumSpanningTree;
  }

  return [];
}
```

Kruskal 算法初始化时将每个顶点划分到不同集合中，然后根据边的权重将图的所有边按照升序排序。如果当前边对应的两个顶点不在一个集合中，则将两个顶点对应的集合合并，并将当前边加入到生成树中。直到生成树包含 V-1 条边（并查集只存在一个集合）为止。

Kruskal 算法的时间复杂度为 O(ElogE)。

关于图结构及图相关的算法，请点击[这里](https://github.com/ZhangGuangZe/data-structures-and-algorithms-in-javascript/tree/master/graph)查看。

## 参考
- - [Wikipedia](https://en.wikipedia.org/wiki/Graph_traversal)
- 《算法导论》
- 《算法》（第4版）
- 《数据结构与算法之美》
- 《学习JavaScript数据结构与算法》（第3版）
- 《算法图解》
- [javascript-algorithms](https://github.com/trekhleb/javascript-algorithms/tree/master/src/data-structures/graph)
- ChatGPT 3.5
- [LeetCode](https://leetcode.cn/tag/graph/problemset/)