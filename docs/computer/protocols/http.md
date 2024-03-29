# HTTP 协议

**HTTP**（HyperText Transfer Protocol），也称为 HTTP over TCP/IP，即超文本传输协议。是一种用于传输**超文本**信息的**无状态**应用层协议。

为了实现在互联网中构建一个可共享的超文本信息系统，Tim Berners-Lee 发明了万维网，使用 HTTP 来传输超文本。

## HTTP/0.9

HTTP/0.9 于 1991 年提出，主要用于学术交流，在网络中传输 HTML。基于请求-响应模式，客户端发送请求，服务端响应数据。

HTTP/0.9 的请求行包括请求方法和请求 URI，请求方法只包含 GET，并且只允许从服务器获取 HTML 文档，不支持传输其它文件格式。

## HTTP/1.0

随着万维网的和多媒体技术的不断发展，出现了很多新需求（例如，传输其它格式的文件），为了能够满足当时的用户需求，HTTP WG 在 HTTP/0.9 的基础上添加了很多新特性。经过一系列草案的整合与修订，HTTP/1.0 于 1996 年定义在 [RFC 1945](https://datatracker.ietf.org/doc/html/rfc1945) 规范中。

以下是 HTTP/1.0 增加的主要特性：

- 增加 HEAD 和 POST 请求方法和版本信息；
- 引入 Header 概念。通过 Header 实现传输其它格式的文件等功能；
- 增加状态行，包括状态码和原因短语，用于说明服务端的请求处理情况。

HTTP/1.0 的在每次响应后都会立即断开连接，每次发送请求时还需要单独建立 TCP 连接。

## HTTP/1.1

HTTP/1.1 作为第一个标准化版本于 1997 年定义在 [RFC 2068](https://datatracker.ietf.org/doc/html/rfc2068) 规范中。

以下是 HTTP/1.1 的主要特性：

- 增加 PUT、DELETE 的请求方法；
- 允许持久连接，可以减轻服务器负担，默认允许同时建立 6 个持久连接；
- 允许响应分块，用于传输大文件；
- 引入缓存控制机制；
- 引入内容协商机制，用于客户端和服务端通过协商的方式决定传输的内容；
- 提供虚拟主机支持。在请求头中增加 Host 字段，能够让同一 IP 地址的服务器配置多个域名。

### 报文结构

HTTP/1.1 的报文由采用 ASCII 编码的多行文本组成。

HTTP 请求和响应报文的结构相似，由以下部分组成：

1. 起始行：请求行或状态行，描述执行的请求或对应的状态；
2. Header 集合：使用键/值对的形式，指明请求或描述报文实体；
3. 实体：实际传输的数据。

起始行和 Header 集合统称为请求头或响应头。

![报文结构](https://developer.mozilla.org/en-US/docs/Web/HTTP/Messages/httpmsgstructure2.png)

::: tip
Header 和实体之间必须使用空行分隔，表示 Header 的结束标记。
:::

#### 请求行

请求行由请求方法、请求目标和 HTTP 版本号三个部分组成。

##### 请求方法

一个动词或一个名词，表示对目标资源的操作，区分大小写。以下是一些常见的请求方法：

  - GET 获取资源；
  - HEAD 获取资源的元信息；
  - POST 将实体提交到指定资源；
  - PUT 替换目标资源；
  - DELETE 删除指定资源。

更多请求方法请点击[这里](https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Methods)查看。

::: tip
安全指的是不会对服务器上的资源造成实质的修改。GET 和 HEAD 方法是安全的。

幂等指的是多次执行相同的操作结果都是相同的。GET、HEAD、PUT 和 DELETE 方法是幂等的。
:::

##### 请求目标

通常是一个 URL。URL（Uniform Resource Locator，统一资源定位符），俗称网址，用来识别和定位服务器上的资源。由协议名、主机名（域名/IP地址、端口号）、路径、查询参数和片段标识符构成。

#### 状态行

状态行由 HTTP 版本号、状态码和原因短语三个部分构成。

##### 状态码

一个三位整数，描述了请求的结果和响应的语义，所有有效的状态码都在 100～599 范围之内。

- 1xx（信息）信息正在处理

  - 101 Switching Protocols 表示需要切换协议。

- 2xx（成功）服务器收到并成功处理了客户端请求

  - 200 OK 请求成功。

  - 204 No Content 请求已被成功处理，但响应报文中不包含实体部分。

  - 206 Partial Content 客户端进行范围请求，服务器返回指定范围的实体内容。用于分块下载和断点续传。配合 `Content-Range` 实体字段返回实体的具体范围。

- 3xx（重定向）资源发生变动，需要重新发送请求获取资源

  - 301 Moved Permanently 永久性重定向。表示请求资源不存在，需要使用新的 URL 再次访问。

  - 302 Found 临时重定向。表示请求资源还在，但需要暂时用另一个 URL 访问。301 和 302 都需要在响应头使用 `Location` 响应字段指明后续跳转的 URL。

  - 304 Not Modified 用于缓存目的。表示响应还没有修改，客户端可以继续使用缓存的资源。配合 `If-Modified-Since` 等条件请求字段使用来判断资源是否更新。

- 4xx（客户端错误）客户端发送的请求有误，服务器无法处理请求

  - 400 Bad Request 表示请求报文存在错误，但具体什么错误不明确。

  - 403 Forbidden 表示客户端未经授权，没有访问资源的权限。

  - 404 Not Found 表示服务器无法找到客户端请求的资源，也可能是服务器拒绝请求且不想说明理由。

- 5xx（服务器错误）服务器在处理请求时内部发生错误

  - 500 Internal Server Error 表示服务器在执行请求时发生错误。

  - 501 Not Implemented 表示客户端请求的功能还不支持。

  - 502 Bad Gateway 表示服务器自身工作正常，访问后端服务时发生错误。

  - 503 Service Unavailable 表示服务器很忙，暂时无法响应请求。配合 `Retry-After` 响应字段，表示服务恢复的大概时间。

更多状态码请点击[这里](https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Status)查看。

#### Header 字段

Header 字段是键值对，中间使用冒号（`:`）分隔，字段名不区分大小写。

Header 字段可分为通用字段、请求字段、响应字段、实体字段和未规范字段等多种类型。

### HTTP 内容协商

内容协商是一种客户端设置特定的请求字段告诉服务器期望的数据表示形式，服务器通过响应字段表明实体采用的表示形式并返回指定形式实体的机制。

- `Accept` 请求字段表示可以处理的 [MIME 类型](https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Basics_of_HTTP/MIME_types)，`Content-type` 实体字段表示实体的 MIME 类型。

- `Accept-Encoding` 请求字段表示客户端支持的压缩格式（gzip、deflate 和 br），`Content-Encoding` 实体字段表示实体采用的压缩格式。

- `Accept-Language` 请求字段表示客户端期望的自然语言类型，`Content-Language` 实体字段表示实体的语言类型。

以上三个头部字段可以通过 `;q=` 表示值的优先级。优先级在 `0` 到 `1` 之间，默认值为 `1`，表示优先级最高；最小值 `0.01`；`0` 表示拒绝该类型的数据。例如：

```
Accept-Language: zh-CN,zh;q=0.9,en;q=0.8
```

- `Accept-Charset` 请求字段表示客户端可以处理的字符集类型，`Content-type` 实体字段的 `charset` 属性表示实体采用的字符集。

- `Vary` 字段在内容协商中表示服务器的响应可能取决于 `Accept`、`Accept-Language` 和 `Accept-Encoding` 请求字段的值。

### HTTP 缓存控制

缓存是一种性能优化机制。服务器和客户端通过 `Cache-Control` 通用字段协商如何设置和利用缓存。

缓存可以分为客户端缓存和服务端缓存，服务端缓存又包括代理服务器缓存和源服务器缓存。

#### 客户端缓存

首先，客户端发送请求，服务器返回资源并通过 `Cache-Control` 字段的 `max-age` 属性设置资源的有效时间（响应报文创建的时间），客户端收到响应后对资源进行缓存。

如果客户端不想使用缓存，可以使用 `no-store` 属性设置；如果想使用缓存，但在使用之前需要去服务器验证是否有新数据，可以使用 `no-cache` 属性设置。

当缓存过期时，客户端可以通过重新加载和强制重新加载的方式直接向服务器请求新的资源，或者使用条件请求验证有没有最新的资源。

在做条件请求时，服务器需要在响应头中添加 `Last-Modified` 实体字段。客户端收到响应后会发送一个带有 `If-Modified-Since` 请求字段的请求给服务器验证。如果数据在指定时间没有更改，服务器会响应 `304 Not Modified` 表示可以继续使用缓存。但这种方式无法准确区分资源变化问题。

为了解决上述问题，服务器需要在响应头中添加 `ETag` 响应字段；客户端收到响应后会发送一个带有 `If-None-Match` 请求字段的请求去服务器验证。如果 `ETag` 响应字段的值与 `If-None-Match` 请求字段的值相同，则服务器返回 `304 Not Modified` 表示资源未更新，可以继续使用缓存；否则服务器返回 `200 ok` 并且返回最新的资源。

::: tip
强制缓存指的是客户端发送一个请求时，会先检查资源是否缓存以及缓存是否过期来决定发送请求还是使用缓存。

协商缓存指的是客户端发送一个请求时，会发送一个条件请求去服务器验证资源是否更新，由服务器决定使用缓存还是返回最新资源。
:::

#### 代理服务器缓存

在使用代理服务器做缓存时，需要对缓存进行一些限制。如果数据只能在特定客户端进行缓存，需要使用 `private` 属性。如果数据可以在客户端之间共享，需要使用 `public` 属性。

代理服务器的缓存时间使用 `s-maxage` 属性控制，如果缓存过期后，需要使用 `proxy-revalidate` 属性去服务器验证，如果不允许代理修改缓存，可以使用 `no-transform` 属性。使用 `max-stale` 和 `min-fresh` 属性可以延长代理的缓存时间。

### HTTP 重定向

重定向由服务器向请求发送特殊重定向响应触发。重定向响应中包含 `3xx` 类型的状态码和包含重定向 URL 的 `Location` 响应字段。

#### 应用场景

当资源发生永久性变更，或者类似域名需要重定向到一个 URL 时，使用 `301` 状态码，表示原来的 URL 不能使用，浏览器和搜索引擎需要更新地址，这样有利于 SEO。

当资源维护或停机时，使用 `302` 状态码，表示原来的 URL 会在某个时间点上恢复正常。

滥用重定向会导致性能问题。

### HTTP 大文件传输

大文件传输可以通过数据压缩、分块传输和范围请求等手段实现。

#### 数据压缩

数据压缩手段适用于文本压缩。为了选择要采用的压缩算法，客户端和服务器使用内容协商机制。客户端发送一个带有 `Accept-Encoding` 请求字段的请求，表示客户端支持的压缩算法和优先级，服务器则选择一种算法并将其放入 `Content-Encoding` 通用字段中，再把数据压缩后发送给客户端。

#### 分块传输

分块传输手段适用于大文件和流式数据传输。服务器通过发送一个带有 `Transfer-Encoding: chunked` 响应字段的报文对数据进行分块编码，然后逐个传输。

#### 范围请求

范围请求手段适用于大流媒体文件传输部分数据和文件下载的断点续传功能。

为了检查服务器是否支持范围请求，需要客户端发送一个 HEAD 请求方法的请求，如果响应头中包含 `Accept-Ranges: bytes` 的响应字段，则表示服务器支持范围请求。

在服务器支持范围请求的情况下，客户端需要发送一个带有 `Range` 请求字段的请求，让服务器返回文件的指定范围。如果请求的数据在文件范围之内，服务器会返回状态码为 `206 Partial Content` 的响应，响应报文中包含表示请求的范围大小 `Content-Length` 字段和表示请求内容在整个资源的位置及总大小的 `Content-Range` 实体字段；否则，服务器会返回一个状态码为 `416 Range Not Satisfiable` 的响应，表示服务器无法处理所请求的范围。

如果需要一次请求文件的多个部分，可以通过逗号分隔表示获取多个范围。

```
curl http://www.baidu.com -i -H "Range: bytes=0-50, 100-150"
```

服务器会返回状态码为 `206 Partial Content` 的响应，响应报文中 `Content-Range` 实体字段中包含表示多个部分的 `multipart/byteranges` 和表示每个部分分隔标记的 `boundary` 属性。

### HTTP Cookie

Cookie 是服务器发送到客户端并保存的一小块数据，用于为 HTTP 提供会话状态。

当客户端第一次发送请求时，服务器会为客户端创建一个身份标识，并以键值对的形式放入 `Set-Cookie` 字段中，然后将响应报文发给客户端。客户端收到响应报文后，首先会解析响应头，然后将 `Set-Cookie` 字段的值保存下来。

当客户端再次发送请求时，会将之前保存的信息放入 `Cookie` 字段中，然后客户端将请求报文发送给服务器。服务器收到请求后，会从请求头中解析 `Cookie` 字段的值，然后进行身份验证。

`Set-Cookie` 字段还有一些属性用于限制 Cookie 的行为：

- `Expires` 属性用于设置 Cookie 的过期时间，`max-age` 属性也可以用于设置 Cookie 的有效期。如果两个字段同时存在，客户端会优先采用 `max-age` 属性的值。

- `HttpOnly` 属性用于限制通过 HTTP 以外的方式访问 Cookie，可以降低 XSS 攻击风险。

- `SameSite` 属性提供了一些针对 CSRF 攻击的保护。包括 `Strict`、`Lax` 和 `None` 三个值。

  - `Strict` 表示禁止将 Cookie 跨站发送；
  - `Lax` 表示可以通过链接或者 Get 等安全方式将 Cookie 跨站发送；
  - `None` 表示在任何情况都可以发送 Cookie。

- `Domain` 属性用于指定 Cookie 可以发送到哪些主机上。

- `Path` 属性用于指定 Cookie 可以发送到哪些 URL 路径上。

### HTTP/1.1 性能优化

HTTP/1.1 存在队头拥塞问题导致性能下降，可以通过**并发连接**和**域名分片**技术来缓解，通过精灵图和资源内联手段减少请求数量。另外，可以通过缓存来减少请求与响应的往返时间。

## HTTP/2

由于 HTTP/1.1 存在性能瓶颈，例如以纯文本形式传输报文，携带大量 Header 会影响传输效率、基于请求-响应的模式会导致队头阻塞问题。为了改善 HTTP/1.1 在性能方面存在的问题，HTTP/2 最终于 2015 年定义在 [RFC 7549](https://datatracker.ietf.org/doc/html/rfc7540) 规范中。

以下是 HTTP/2 的主要特性：

- 头部压缩

采用 HPACK 压缩算法压缩 Header，消除冗余数据节省带宽。在两端建立一个索引表，对相同的 Header 只发送索引表中的索引进行查找与更新。

- 二进制分帧

HTTP/2 会将报文分割为更小的帧，并采用二进制格式编码。常见的帧包括：用于传输 Header 内容的 Header 帧和用于传输实体内容的 Data 帧。

- 多路复用

引入流的概念，发送端为相同报文拆分的帧分配一个相同的流 ID，客户端为其设置优先级，接收端会将所有相同 ID 的帧合并为一个完整的报文，服务器根据优先级决定优先处理哪个流。这样在一个 TCP 连接中可以发送多个报文，通过乱序收发的方式解决了应用层的队头阻塞问题。

- 服务器推送

将请求所需的资源提前推送给客户端，从而减少请求次数。

## HTTP/3

HTTP/2 虽然极大的提升了传输的效率，但是受限于 TCP，在传输层同样存在队头阻塞问题，并且由于网络原因需要重新建立连接时性能比 HTTP/1.1 一个域名开 6 ～ 8 个连接更差。由于优化 TCP 协议存在诸多挑战，所有只能另起炉灶创造了 QUIC 协议。基于该协议的 HTTP/3 于 2022 年正式定义在 [RFC 9114](https://datatracker.ietf.org/doc/html/rfc9114) 规范中。

以下是 HTTP/3 的主要特性：

- 为了实现可靠性，自定义了连接机制、重传机制、流量控制和拥塞控制；
- 实现了无阻塞的多路复用。

## 参考

- [Wikipedia](https://en.wikipedia.org/wiki/HTTP)
- [MDN](https://developer.mozilla.org/zh-CN/docs/Web/HTTP)
- [透视 HTTP 协议](https://time.geekbang.com/column/intro/100029001)
- [浏览器工作原理与实践](https://time.geekbang.com/column/article/147501)
- [趣谈网络协议](https://time.geekbang.com/column/article/9410)
- 《图解HTTP》