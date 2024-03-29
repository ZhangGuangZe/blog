# DNS 协议

**DNS**（Domain Name System），即域名系统，是一个分层的分布式命名系统。

域名由一个或多个标签组成，并由 “.” 分隔。域名的层次结构从右往左逐级下降，最右边的标签称为顶级域名，然后是二级域名，最左边的称为主机名。例如，www.example.com 的 com 为顶级域名，example 为二级域名，www 是主机名。

## 域名解析

将易于记忆的域名转换为 IP 地址的过程称为域名解析。

DNS 的核心是一个树状、分布式的系统。

- 根 DNS 服务器：返回顶级 DNS 服务器的 IP 地址。
- 顶级 DNS 服务器：返回权威 DNS 服务器的 IP 地址。
- 权威 DNS 服务器：返回对应主机的 IP 地址。

以下是 DNS 域名解析的过程：

1. 客户端会发送一个请求给本地 DNS 服务器。
2. 本地 DNS 收到客户端请求之后，会去缓存中查找域名对应的 IP 地址，如果存在，则直接返回；否则本地 DNS 会去访问根 DNS 服务器。
3. 根 DNS 服务器收到本地 DNS 服务器请求之后，根据顶级域名将顶级 DNS 服务器的地址返回给本地 DNS 服务器。
4. 本地 DNS 服务器拿到顶级 DNS 服务器的地址后，会去访问顶级 DNS 服务器。顶级 DNS 服务器会将顶级域名的权威 DNS 服务器地址发送给本地 DNS 服务器。
5. 本地 DNS 服务器拿到权威 DNS 服务器的地址后，会去访问权威 DNS 服务器。权威 DNS 会去查询域名对应的 IP 地址，并将其返回给本地 DNS 服务器。
6. 本地 DNS 服务器拿到 IP 地址后会将其返回给客户端。
7. 客户端拿到 IP 地址后会通过操作系统对 DNS 解析的结果做缓存，下次访问直接获取操作系统缓存中的 IP 地址。如果操作系统在缓存中找不到结果，则会去操作系统的 ”/etc/hosts/“ 文件查找。

## 负载均衡

使用 DNS 可以实现基于域名的负载均衡，既可以实现内部负载均衡，又可以实现外部负载均衡。

内部负载均衡指的是，一个域名对应多台主机，客户端收到多个 IP 地址后，通过轮询依次向服务器发送请求。如果所有主机的 IP 地址换了，只需在 DNS 服务器上将域名映射为最新的 IP 地址。

外部负载均衡指的是，通过配置一些策略，将请求分发到不同的服务器，返回离客户端最近的主机，或者返回当前服务质量最好的主机。

## 参考

- [Wikipedia](https://en.wikipedia.org/wiki/Domain_Name_System)
- [透视 HTTP 协议](https://time.geekbang.com/column/article/99665)
- [趣谈网络协议](https://time.geekbang.com/column/article/9895)