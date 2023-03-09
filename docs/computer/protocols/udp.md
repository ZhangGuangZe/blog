# UDP 协议

UDP（User Datagram Protocol），即用户数据报协议。是一个**简单**的**基于消息**的**无连接**协议。

## 特点

- 基于数据报

基于数据报，不需要保证数据报发送、到达时间和到达顺序。所以有时也称为不可靠的数据报协议。

- 无状态

不用事先建立连接就可以传输数据。

## 结构

数据报分为报头和数据两个部分。

报头包括 4 个字段，每个字段的占 16 位：

- 源端口号

发送的应用程序。

- 目标端口号

接收的应用程序。

- 报文长度

报头和数据总占用长度。

- 校验和

校验报头和数据的完整性。

## 应用场景

- DNS、DHCP 和 QUIC 协议
- 直播
- 实时游戏

## 参考

- [Wikipedia](https://en.wikipedia.org/wiki/User_Datagram_Protocol)
- [趣谈网络协议](https://time.geekbang.com/column/article/8924)