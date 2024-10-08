(window.webpackJsonp=window.webpackJsonp||[]).push([[8],{501:function(_,t,v){_.exports=v.p+"assets/img/connect.0e142494.png"},502:function(_,t,v){_.exports=v.p+"assets/img/close.86c3bb28.png"},536:function(_,t,v){"use strict";v.r(t);var r=v(65),a=Object(r.a)({},(function(){var _=this,t=_.$createElement,r=_._self._c||t;return r("ContentSlotsDistributor",{attrs:{"slot-key":_.$parent.slotKey}},[r("h1",{attrs:{id:"tcp-协议"}},[r("a",{staticClass:"header-anchor",attrs:{href:"#tcp-协议"}},[_._v("#")]),_._v(" TCP 协议")]),_._v(" "),r("p",[_._v("TCP（Transmission Control Protocol），即传输控制协议。是一个"),r("strong",[_._v("面向连接")]),_._v("的、"),r("strong",[_._v("可靠")]),_._v("的、"),r("strong",[_._v("基于字节流")]),_._v("的通信协议。")]),_._v(" "),r("h2",{attrs:{id:"首部结构"}},[r("a",{staticClass:"header-anchor",attrs:{href:"#首部结构"}},[_._v("#")]),_._v(" 首部结构")]),_._v(" "),r("ul",[r("li",[_._v("源端口号")])]),_._v(" "),r("p",[_._v("发送的应用程序。")]),_._v(" "),r("ul",[r("li",[_._v("目的端口号")])]),_._v(" "),r("p",[_._v("接收的应用程序。")]),_._v(" "),r("ul",[r("li",[_._v("序列号")])]),_._v(" "),r("p",[_._v("为每个数据包编号，用于解决乱序问题。")]),_._v(" "),r("ul",[r("li",[_._v("确认序号")])]),_._v(" "),r("p",[_._v("确认发出去的包是否已经收到，用于解决丢包问题。")]),_._v(" "),r("ul",[r("li",[r("p",[_._v("状态位")]),_._v(" "),r("ul",[r("li",[_._v("SYN 创建连接")]),_._v(" "),r("li",[_._v("ACK 回复")]),_._v(" "),r("li",[_._v("RST 重新连接")]),_._v(" "),r("li",[_._v("FIN 断开连接")])])]),_._v(" "),r("li",[r("p",[_._v("窗口大小")])])]),_._v(" "),r("p",[_._v("指定发送方当前愿意接收的字节数量。用于流量控制和拥塞控制。")]),_._v(" "),r("ul",[r("li",[_._v("校验和")])]),_._v(" "),r("p",[_._v("用于检测错误。")]),_._v(" "),r("h2",{attrs:{id:"连接过程"}},[r("a",{staticClass:"header-anchor",attrs:{href:"#连接过程"}},[_._v("#")]),_._v(" 连接过程")]),_._v(" "),r("p",[_._v("TCP 连接分为建立连接、传输数据和断开连接三个阶段。")]),_._v(" "),r("h3",{attrs:{id:"建立连接"}},[r("a",{staticClass:"header-anchor",attrs:{href:"#建立连接"}},[_._v("#")]),_._v(" 建立连接")]),_._v(" "),r("p",[_._v("在建立连接之前，客户端与服务端都处于 CLOSED 状态。服务端必须侦听（被动打开）来自客户端的连接请求，客户端使用三次握手主动建立连接，三次握手的过程需要客户端和服务端发送三个包来确认连接的建立。")]),_._v(" "),r("p",[r("img",{attrs:{src:v(501),alt:"TCP 三次握手"}})]),_._v(" "),r("ol",[r("li",[_._v("SYN")])]),_._v(" "),r("p",[_._v("客户端主动向服务端发送一个 SYN 包，包的序列号设置为随机数 x。然后进入 SYN_SENT 状态；")]),_._v(" "),r("ol",{attrs:{start:"2"}},[r("li",[_._v("SYN-ACK")])]),_._v(" "),r("p",[_._v("作为响应，服务端回复一个 SYN-ACK 包，包的确认号设置为收到的序列号 x+1，序列号设置为另一个随机数 y。然后进入 SYN_RCVD 状态；")]),_._v(" "),r("ol",{attrs:{start:"3"}},[r("li",[_._v("ACK")])]),_._v(" "),r("p",[_._v("客户端收到服务端发送的响应后，向服务端发送一个 ACK 包，包的序列号设置为收到的确认号 x+1，确认号设置为收到的序列号 y+1。然后进入 ESTABLISHED 状态，服务端收到 ACK 后，进入 ESTABLISHED 状态。")]),_._v(" "),r("p",[_._v("三次握手不仅可以确保客户端和服务端连接的建立，防止对方一直等待占用网络资源；还可以确认初始序列号（第 1 步和第 2 步确认了客户端的序列号，第 2 步和第 3 步确认了服务端的序列号），避免服务端收到失效的请求产生错误。")]),_._v(" "),r("h3",{attrs:{id:"传输数据"}},[r("a",{staticClass:"header-anchor",attrs:{href:"#传输数据"}},[_._v("#")]),_._v(" 传输数据")]),_._v(" "),r("p",[_._v("在传输数据过程中，由于复杂的网络环境导致丢包、乱序和拥塞等情况时常发生，需要通过一些算法来保证传输的可靠性。")]),_._v(" "),r("p",[_._v("为了保证不丢包，客户端发送的数据包有一个序列号，服务端响应的确认包有一个确认号，服务端成功收到包后会返回一个 ACK 确认包。")]),_._v(" "),r("p",[_._v("为了保证不乱序，客户端和服务端通过缓存的方式保存包。客户端缓存里的包会按照序列号排序，并根据处理情况分为发送已确认、发送未确认、未发送可发送、未发送不可发送四个部分。服务端根据接收的数据重新排序，并根据处理情况分为接收已确认、待接收未确认和不能接收三个部分。")]),_._v(" "),r("h4",{attrs:{id:"重传机制"}},[r("a",{staticClass:"header-anchor",attrs:{href:"#重传机制"}},[_._v("#")]),_._v(" 重传机制")]),_._v(" "),r("p",[_._v("当出现乱序和丢包问题时，需要使用重发机制保证数据的完整性。")]),_._v(" "),r("ol",[r("li",[_._v("超时重传")])]),_._v(" "),r("p",[_._v("客户端对每一个发送但没有确认包设置一个定时器，如果超出一定时间仍未收到确认包，客户端将重传这个数据包。如果重传定时器被触发仍未收到确认包，定时器的值会被设置为上一次定时的两倍。")]),_._v(" "),r("ol",{attrs:{start:"2"}},[r("li",[_._v("快速重传")])]),_._v(" "),r("p",[_._v("如果某一序列号的包丢失，服务端将不会确认高于该序列号的数据包，而是重复发送丢失包的上一个序列号的确认包，当客户端收到三次重复的确认包后，就重传最后一个未被确认的数据包。")]),_._v(" "),r("ol",{attrs:{start:"3"}},[r("li",[_._v("选择确认")])]),_._v(" "),r("p",[_._v("服务端在接收到一定的数据包后才进行发送确认包。")]),_._v(" "),r("h4",{attrs:{id:"流量控制机制"}},[r("a",{staticClass:"header-anchor",attrs:{href:"#流量控制机制"}},[_._v("#")]),_._v(" 流量控制机制")]),_._v(" "),r("p",[_._v("流量控制用来避免客户端发送数据的速度太快导致服务端无法可靠的接收和处理数据。")]),_._v(" "),r("p",[_._v("TCP 使用滑动窗口来实现流量控制。服务端的接收窗口用来指定能够接收的最大数据量，客户端最多只能发送接收窗口允许的数量。当客户端收到服务端接收窗口为 0 的响应时，客户端会停止发送数据包并定时发送窗口探测包，期望服务端回复一个带有新的接收窗口大小的确认包。当接收窗口太小时，应该避免发送接收窗口小的响应，直到足够大时才响应。")]),_._v(" "),r("h4",{attrs:{id:"拥塞控制机制"}},[r("a",{staticClass:"header-anchor",attrs:{href:"#拥塞控制机制"}},[_._v("#")]),_._v(" 拥塞控制机制")]),_._v(" "),r("p",[_._v("拥塞控制用来避免客户端发送数据的数据太快导致网络拥塞，在不阻塞，不丢包的情况下充分利用带宽。")]),_._v(" "),r("p",[_._v("TCP 使用拥塞窗口并配合慢启动、拥塞避免、快速重传和快速恢复四种算法来实现拥塞控制。")]),_._v(" "),r("ol",[r("li",[_._v("慢启动")])]),_._v(" "),r("p",[_._v("一开始窗口大小设置为一个数据包，一次只能发送一个，收到确认包后，发送数量逐渐呈指数级增长，到达一定阈值需要降低增长速度。")]),_._v(" "),r("ol",{attrs:{start:"2"}},[r("li",[_._v("拥塞控制")])]),_._v(" "),r("p",[_._v("当收到所有确认包后窗口数量在原来的基础上加一，发送数量开始线性增长。")]),_._v(" "),r("ol",{attrs:{start:"3"}},[r("li",[_._v("快速重传")])]),_._v(" "),r("p",[_._v("网络开始拥塞，出现丢包情况，使用快速重传算法防止丢包。")]),_._v(" "),r("ol",{attrs:{start:"4"}},[r("li",[_._v("快速恢复")])]),_._v(" "),r("p",[_._v("收到三次重复的确认包后，将窗口大小减半继续线性增长。")]),_._v(" "),r("h3",{attrs:{id:"断开连接"}},[r("a",{staticClass:"header-anchor",attrs:{href:"#断开连接"}},[_._v("#")]),_._v(" 断开连接")]),_._v(" "),r("p",[_._v("在断开连接之前，客户端和服务端都处于 ESTABLISHED 状态。客户端主动关闭连接，服务端被动关闭连接。断开连接使用四次挥手来保证双方都能断开连接。")]),_._v(" "),r("p",[r("img",{attrs:{src:v(502),alt:"TCP 三次握手"}})]),_._v(" "),r("ol",[r("li",[_._v("FIN")])]),_._v(" "),r("p",[_._v("客户端主动向服务端发送一个断开连接的 FIN 请求包。客户端进入 FIN_WAIT_1 状态。")]),_._v(" "),r("ol",{attrs:{start:"2"}},[r("li",[_._v("ACK")])]),_._v(" "),r("p",[_._v("服务端收到客户端的 FIN 包后，向客户端回复一个 ACK 确认包。服务端进入 CLOSE_WAIT 状态，客户端不再向服务端发送数据，不过服务端仍可以向客户端发送数据。客户端收到确认后进入 FIN_WAIT_2 状态。")]),_._v(" "),r("ol",{attrs:{start:"3"}},[r("li",[_._v("FIN")])]),_._v(" "),r("p",[_._v("服务端的所有数据发送完毕后，向客户端发送一个断开连接的 FIN 请求包。服务端进入 LAST_ACK 状态，等待客户端确认。")]),_._v(" "),r("ol",{attrs:{start:"4"}},[r("li",[_._v("ACK")])]),_._v(" "),r("p",[_._v("客户端收到服务端的 FIN 包后，向服务端回复一个 ACK 确认包。客户端进入 TIME_WAIT 状态，客户端需要等待 2MST（Maximum Segment Lifetime，报文最大生存时间），客户端可以重新向服务端发送 FIN 确认包，防止服务端没有收到客户端发的 ACK 确认包，最终进入 CLOSED 状态。而服务端收到 ACK 确认包后，最终也进入 CLOSED 状态。")]),_._v(" "),r("p",[_._v("四次握手不仅可以确保双方断开连接，还可以防止由于网络延迟导致的对方收到失效请求而导致的错误。")]),_._v(" "),r("h2",{attrs:{id:"参考"}},[r("a",{staticClass:"header-anchor",attrs:{href:"#参考"}},[_._v("#")]),_._v(" 参考")]),_._v(" "),r("ul",[r("li",[r("a",{attrs:{href:"https://en.wikipedia.org/wiki/Transmission_Control_Protocol",target:"_blank",rel:"noopener noreferrer"}},[_._v("Wikipedia"),r("OutboundLink")],1)]),_._v(" "),r("li",[r("a",{attrs:{href:"https://time.geekbang.com/column/article/8975",target:"_blank",rel:"noopener noreferrer"}},[_._v("趣谈网络协议"),r("OutboundLink")],1)]),_._v(" "),r("li",[r("a",{attrs:{href:"https://time.geekbang.com/column/article/113550",target:"_blank",rel:"noopener noreferrer"}},[_._v("浏览器工作原理与实践"),r("OutboundLink")],1)])])])}),[],!1,null,null,null);t.default=a.exports}}]);