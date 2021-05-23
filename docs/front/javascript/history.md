# JavaScript 发展史

1989-1990 年，为了能够满足学术界信息共享的需求，CERN 的 Tim Berners-Lee 在互联网的基础上，将已有的超文本系统、传输控制协议和域名系统等技术结合起来创造并实现了**万维网**（World Wide Web，也称 Web）。

1992-1993 年，美国伊利诺伊大学厄巴纳香槟分校的本科生 Marc Andreessen 和 NCSA 的 Eric Bina 开发并发布 Mosaic 浏览器，这是第一款将图形与网页文本结合的图形化 Web 浏览器，这把 Web 推到互联网的风口上，拉开各大公司抢占万维网市场的序幕。

1994 年 4 月，离开 SGI 的 Jim Clark 拉来风险投资，联合刚毕业不久的 Marc Andreessen 创立 Mosaic 通讯公司，招募到 SGI 和 NCSA 的成员，共同开发一款代号为“Mozilla”（Mosaic+Godzilla+Killa）产品—— Mosaic Netscape 网页浏览器，目标是取代 Mosaic 成为世界上最流行的浏览器，并为不同操作系统提供一致的用户体验。为避免与 NCSA 的商标产生冲突，于1994年10月将产品改名为 Netscape Navigator，并将公司改名为 Netscape（网景）通信公司。

1994 年 6 月，Sun 公司的 Java 团队决定将技术从家电系统领域转到 Web 领域，推出用于客户端的 Java applet。

1995 年 5 月 23 日，在 Sun 的 Java 发布会上，Marc Andreessen 宣布在 Netscape Navigator 中支持 Java。

1995 年 5 月 26 日，在比尔·盖茨的互联网浪潮备忘录中，微软开始将产品扩展到 Web 领域，推出基于 Mosaic 技术的 Internet Explorer（IE）浏览器。

## 语言建立

随着 Web 日益发展，网景公司很快意识到浏览器需要提供一种脚本语言的支持，并把它嵌入到 HTML 中，为网页提供诸如表单验证、动态交互等能力。
### 选型

为此，网景准备了两套方案：分别是与 Sun 公司合作在浏览器中嵌入 Java 和雇佣 Brendan Eich 将 Scheme 集成到浏览器中。不过，网景很快和 Sun 公司达成协议，决定在 Navigator 2 中嵌入 Java，这排除了其他语言的可能性。

为了能让计划可行，需要实现一门小语言来补充 Java。这在网景内部对 Web 是否需要两种语言产生激烈的争论。

因为当时的 Java 比较复杂，并不适合初学者；而且微软针对不同的开发者提供不同的产品。所以，针对专业程序员，提供 Java 来完成主要的交互，并为其他用户群体提供 Java applet 之类的组件；针对其他用户群体，提供一种“胶水语言”把 Java applet 等其他组件粘合在一起，并且可以操作 HTML 元素，使其更具交互性。

化解争论后，Marc Andreessen 提出开发代号为 Mocha 的浏览器脚本语言，用于将它集成到未来的 Navigator 2 中，计划在客户端和服务器端都使用它，强调它用于辅助 Java，所以必须看起来像 Java。

为了评估 Mocha 能否成功集成到 Netscape Navigator 2 中，网景管理层需要一个语言的原型。1995 年 5 月，Brendan Eich 花了十天的时间实现语言的原型。

除了外表像 Java 外，Mocha 借鉴其他语言的特性。比如 Self 单个原型链接的委托机制来创建动态的对象模型，对象通过构造函数和 `new` 运算符组合构建而成。Scheme 函数一等公民的特性，函数可以作为顶层子程序、参数传递、对象的方法和事件处理器等。通过从 Java 借鉴的 `this` 关键字统一了对象的方法和事件处理器，并且表示函数作为方法被调用时的上下文对象。Mocha 还支持用于解析执行字符串的 `eval` 函数。

### 命名与发布

1995 年 9 月，被修订过的 Mocha 在 Navigator 2.0 beta 版中以 LiveScript 的名称发布。

1995 年 12 月，随着 Java 的日渐流行，出于市场营销的目的，在 Navigator 2.0 beta 3 中以 JavaScript 的名称重新命名。

1995 年 12 月 4 日，网景和 Sun 公司在联合新闻稿中发布 JavaScript，将其称之为一种用于企业网络、互联网的开放式跨平台对象脚本语言。

### 初始版本及特性

1996 年 3 月，在 Navigator 2 正式版中支持 JavaScript 1.0，并在 Netscape Enterprise Serve 2.0 中将 JavaScript 1.0 集成到 LiveWire 服务器端脚本组件中。

## 初步发展

## 陷入困境

## 发展壮大

## 新的开始