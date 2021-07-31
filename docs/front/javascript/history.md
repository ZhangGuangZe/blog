# JavaScript 发展史

1989-1990 年，为了能够满足学术界信息共享的需求，CERN 的 Tim Berners-Lee 在互联网的基础上，将已有的超文本系统、传输控制协议和域名系统等技术结合起来创造并实现了**万维网**（World Wide Web，也称 Web）。其中包括世界上第一个网页浏览器——WorldWideWeb（Nexus）。

1992-1993 年，美国伊利诺伊大学厄巴纳香槟分校的本科生 Marc Andreessen 和 NCSA 的 Eric Bina 开发并发布 Mosaic 浏览器，这是第一款将图形与网页文本结合的图形化 Web 浏览器，这把 Web 推到互联网的风口上，拉开各大公司抢占万维网市场的序幕。

1994 年 4 月，离开 SGI 的 Jim Clark 拉来风险投资，联合刚毕业不久的 Marc Andreessen 创立 Mosaic 通讯公司，招募到 SGI 和 NCSA 的成员，共同开发一款代号为“Mozilla”（Mosaic+Godzilla+Killa）的产品—— Mosaic Netscape 网页浏览器，目标是取代 Mosaic 成为世界上最流行的浏览器，并为不同操作系统提供一致的用户体验。为避免与 NCSA 的商标产生冲突，于 1994 年 10 月将产品改名为 Netscape Navigator，并将公司改名为 Netscape（网景）通信公司。

1994 年 6 月，Sun 公司的 Java 团队决定将技术从家电系统领域转到 Web 领域，后面推出的用于客户端交互组件 Java applet 也让 Java 在 Web 领域取得突破性进展。

1994 年底，网景拒绝了微软低价收购的邀约，这意味着微软和网景即将在 Web 领域展开激烈的竞争。

1995 年 5 月 23 日，在 Sun 的 Java 发布会上，Marc Andreessen 宣布在 Netscape Navigator 中支持 Java。

1995 年 5 月 26 日，在比尔·盖茨的互联网浪潮备忘录中，微软开始将产品扩展到 Web 领域，并在 1995 年 8 月 16 日推出基于 Mosaic 技术的 Internet Explorer（IE）浏览器。

## 语言建立

随着 Web 日益发展，网景公司很快意识到浏览器需要提供一种脚本语言的支持，将它嵌入到 HTML 中，为网页提供诸如表单验证、动态交互等能力。
### 选型

1995 年，网景聘请并承诺 Brendan Eich 在浏览器中实现 Scheme。但在此之前，网景与 Sun 公司达成协议，决定在 Navigator 2 中嵌入 Java，这排除了使用 Scheme、Perl、Python 等其他语言的可能性。

因为当时的 Java 比较复杂，并不适合初学者或者业余程序员，所以，需要实现一门小语言来补充 Java。就像微软针对不同的开发者提供不同的产品一样。针对专业程序员，提供 Java 来完成主要的交互，并为其他用户群体提供 Java applet 之类的组件；针对其他用户群体，提供一种“胶水语言”把 Java applet 等其他组件粘合在一起来完成简单的交互。

于是，Marc Andreessen 提出开发代号为 Mocha 的浏览器脚本语言，用于将它集成到未来的 Navigator 2 中，并计划在客户端和服务端都使用它，最后 Marc Andreessen 还强调它用于辅助 Java，所以必须看起来像 Java，而且应该简单易用。

为了评估 Mocha 能否成功集成到 Netscape Navigator 2 中，网景管理层需要一个语言的原型。1995 年 5 月，Brendan Eich 花了十天的时间实现了语言的原型。

除了外表像 Java 外，Mocha 没有使用类而是基于对象，并且借鉴了其他语言的一些特性。比如 Self 单个原型链接的委托机制来创建动态的对象模型，对象通过构造函数和 `new` 运算符组合构建而成。Scheme 函数一等公民的特性，函数可以作为顶层子程序、参数传递、对象的方法和事件处理器等。通过从 Java 借鉴的 `this` 关键字统一了对象的方法和事件处理器，在语义上表示函数作为方法被调用时的上下文对象。Mocha 还支持用于解析执行字符串的 `eval` 函数。

原型展示完成后，Brendan Eich 利用 Navigator 2 首个 beta 发布前的时间，修复了 Mocha 存在的一些错误，还设计了与网页交互的 API，从而更好地将 Mocha 集成到浏览器中。

### 命名与发布

1995 年 9 月，被修订过的 Mocha 在 Navigator 2.0 首个 beta 版中以 LiveScript 的名称发布。

1995 年 12 月，随着 Java 的日渐流行，出于市场营销的目的，网景得到 Sun 的许可，在 Navigator 2.0 beta 3 中使用了 Sun 注册的商标 JavaScript 重新命名，表示网景与 Sun 建立了强大的品牌关系。

1995 年 12 月 4 日，网景和 Sun 公司在联合新闻稿中发布 JavaScript，JavaScript 被定义为一种企业级互联网的、开放的、跨平台对象脚本语言，作为 Java 语言的补充和嵌入 HTML 的脚本语言。JavaScript 是一种简单易用的对象脚本语言，用于编写脚本动态修改对象的属性和行为。在服务端 JavaScript 脚本可以提取数据库数据，并动态组合和格式化为 HTML。在客户端，JavaScript 脚本将各种 Java applets 和 HTML 表单元素粘合在一起，形成一个实时交互式的用户界面。

### 早期版本及特性

#### JavaScript 1.0

1996 年 3 月，JavaScript 1.0 在 Navigator 2.0 正式版中得到支持，同时在 Netscape Enterprise Serve 2.0 的 LiveWire 服务端脚本组件中也得到支持。

JavaScript 1.0 主要包括语法、数据类型和内置库三个部分。

借鉴于 C 语言的语法包括 `if` 条件语句；`for`、`while` 循环语句；`break`、`continue`、`return` 流程控制语句；大部分表达式语句和语句块（`{}`）。

受到 AWK 语言启发的语法包括 `for-in` 语句和 `function` 声明。还有借鉴于 Java 语言的无符号右移运算符（`>>>`）。

而 JavaScript 独特的语法包括重载的二元加（可支持数字相加和字符串拼接）运算符、`with` 语句、使用关键字 `var` 作为前缀的变量声明、没有块级作用域、函数声明不支持嵌套和自动分号插入规则（ASI）等；

数据类型包括 `Boolean`、`String`、`Number`、`Object`、`Function` 五种基本类型和 `undefined`、`null` 两个特殊值；

内置库包括内置对象和内置函数。其中内置对象包括通用和宿主特定对象两类。通用对象有 `String`、`Date` 和 `Math`；宿主特定对象包括客户端的 DOM Level 0 API 以及服务端相关的对象。内置函数包括 `evel`，还有在不同操作系统有不同行为的 `parseFloat`、`parseInt`。

#### JavaScript 1.1

1996 年 8 月，JavaScript 1.1 发布于 Navigator 3.0 中。

JavaScript 1.1 新增 `typeof` 和 `void` 运算符；加入隐式类型转换规则；在对象模型中引入原型对象；提供可用的 `Array`、`Boolean`、`Function` 和 `Number` 内置对象及其相关 API，还提供了 `isNaN` 内置函数等特性。

JavaScript 早期版本由于时间限制和当时需要等原因，出现了一些奇奇怪怪的未完成与完成的特性以及来不及修改的 bug，为后续版本的更新带来挑战以及让开发者产生疑惑。

这些疑惑或 bug 包括：

- 支持多个相同 `var` 和 `function` 声明；
- 存在隐式类型转换问题的 `==` 运算符；
- 将整数截断取模转换的位运算；
- 相同引用在不同调用场景有不同语义的 `this` 关键字；
- 影响函数及其函数调用栈形参的 `arguments` 对象及其 `caller` 属性；
- 对象的属性可以像数组一样通过方括号索引访问；
- 可以添加和访问字符串的属性；
- 类似 HTML 的注释等。

#### JavaScript 1.2

1997 年 6 月，网景的 Navigator 4.0 发布，其中包含 JavaScript 1.2。该版本主要包括对 JavaScript 1.0/1.1 引擎、语法、内置库的新增、增强及修复。

在引擎方面，使用基于标记/清除算法的垃圾收集器取代了基于引用计数的内存管理机制。

在语法方面，新增了 `do...while`（C）、`labeled`（Java）、`switch`（C 和 Java）、`import` 和 `export`（Java）语句，并增加了 `break` 和 `continue` 语句的语义。新增对象和数组字面量（Python），为 arguments 对象增加 `callee` 属性。使用词法作用域让函数可以嵌套，新增函数表达式。消除 `==` 运算符中存在隐式转换的问题，让 `delete` 操作符可删除对象属性。

在内置库方面，新增借鉴于 Perl 的 RegExp 内置对象及其语法和语义。为 Array 和 String 对象加入受其他语言影响的属性。为所有内置对象新增定义原型对象的 `__proto__` 属性。

### 微软介入

随着网景凭借其浏览器在 Web 领域取得巨大市场份额，微软也开始加大对 IE 浏览器的投入，并通过“拥抱、扩展、灭绝”的战略来吞噬 Web 市场。

微软最初决定在 IE 上嵌入用于脚本的 Visual Basic（VB）和用于应用程序的 Java。由于嵌入 VB 需要花费大量时间，尝试 Visual Basic for Application（VBA）又过于复杂，微软最终通过脚本化 VB 开发出易于 Web 开发人员使用的 VBScript。

为了能让 IE 3 与 Navigator 3 兼容，微软不得不支持 JavaScript，微软通过研究和逆向工程 JavaScript，编写相关的解释器、解析器和垃圾回收器来提供对 JavaScript 的支持，为避免商标引起的纠纷，将其改名为 JScript。

微软在 Windows 中实现基于组件的脚本技术 Active Script 来统一支持 VBScript 和 JScript 等脚本，并将这些脚本应用于 IE、Active Server Page（ASP）和 Windows Script Host（WSH）等其他宿主环境中。

1996 年 8 月，微软正式发布 IE 3 正式发布，Web 市场开启了激烈的竞争。

## 初步发展

### 建立标准

由于需要确保不同浏览器之间的兼容及其微软介入到浏览器开发等原因，网景和 Sun 不得不找一个公认且不能由微软主导的标准开发组织创建 JavaScript 标准。

最初网景和 Sun 向互联网工程任务组（IETF）和万维网联盟（W3C）提议，但由于前者重点在于制定互联网协议和数据格式，后者则对命令式编程语言不感兴趣而被拒绝。

最终，网景找到了具有独立性会员制的 Ecma 国际组织，该组织标准可通过国际标准组织（ISO）成为国际标准，Ecma 很快将标准化 JavaScript 的工作提上了日程，邀请有关企业代表来参加 JavaScript 项目启动会议。如果各方都比较感兴趣，Ecma 将会使用下一个可用数字 39 来标记旗下的这个用于标准化 JavaScript 的新技术委员会。

JavaScript 项目启动会议于 1996 年 11 月 21 日至 22 日在网景办公室举行。会议的主要内容包括网景和微软等公司的技术演讲。

网景的技术演讲介绍了为 JavaScript 1.1 编写的语言规范，包括用 BNF 表示法描述的语法、用非正式叙述定义的大多数语义和用表格描述的隐式类型转换。

微软因为编写的语言规范文档过于简陋，不足以作为语言初步规范，并且不希望网景提供的那份不充分文档成为制定标准的唯一基础文档。所以有意将技术演讲推迟到了第二天，以便在演讲之前编写出一份更加完善的语言规范文档。演讲完成后，会议决定将使用 word 编辑的微软文档作为基准文档开始编辑，然后通过整合网景和微软的规范文档形成规范的初始草案。

1996 年 12 月 Ecma 在其半年一度的 GA 大会上正式批准了 TC39 技术委员会的建立及其工作正式开始。

### 命名标准

在确定网景的 LiveScript 和 Sun 的 JavaScript 名称是否可用之前，TC39 决定在找到合适名称之前使用 ECMAScript 作为占位名称。然而，Sun 不愿将 JavaScript 商标名称许可给 Ecma 使用，网景的 LiveScript 名称又不能体现委员会语言的特点，TC39 也没有找到一个合适的名称，最终在 1997 年 9 月，TC39 确定以 ECMAScript 作为语言标准的名称。

### 制定标准

TC39 很快开始了制定标准的工作，在 1997 年 1 月 10 日的草案中，制定了规范的基本结构，并确认了用于定义语言的许多基础技术、约定和惯用语。

在草案中定义的数据类型包括 `Number`、`Boolean`、`String`、`Object`、`Undefined` 和 `Null`，还有语言类型 `Reference`、`Completion` 和 `List`。

在对象类型规范中引入用于控制如何访问或修改各属性的属性标记，包括 ReadOnly、ErrorOnWrite、DontEnum、DontDelete、Internal。

同时也引入了用于定义对象基本行为的内部方法，包括 `[[Get]]`、`[[Put]]`、`[[HasProperty]]`、`[[Construct]]`、`[[Call]]`、`[[CanPut]]`、`[[Delete]]` 和内部属性 `[[Prototype]]`。

在该版规范制定过程中，TC39 确认短路布尔运算符 `&&` 和 `||` 采用 Perl 风格，而且采用 `==` 运算符拥有类型转换的语义。

1997 年 9 月 16 日至 17 日，在 TC39 会议上正式发布 ECMA-262 第一版（ES1）。

1997 年 9 月，ECMA-262 第一版提交进入 ISO/IEC 快速快速通道流程希望能够成为国际标准，但是涉及 Data 对象的 2000 年过渡支持以及 Unicode 与语言集成等问题。经过 TC39 的修订，在 1998 年 7 月发布到了 ISO/IEC，随后 Ecma 标准会员批准了该修订，成为 ECMA-262 第 2 版（ES2）。

ES1 的开发工作接近尾声，TC39 技术工作组逐渐开启了下一个版本的工作。工作组大部分精力都集中在已实现特性，并解决实现之间的差异，当然还需要设计和开发尚未实现的其他特性，其中包括异常处理机制，`instanceof` 运算符等。在版本发布之前，工作组使用 `TypeError` 和 `SyntaxError` 取代了之前使用的内部异常。

1999 年 12 月 16 日，Ecma GA 大会批准了 ECMA-262 第三版（ES3）。

此时，JavaScript 在浏览器端逐渐可以胜任开发复杂应用，而在浏览器端使用 Java 则变得不必要。那么开始独立自主的 JavaScript 将会面临什么样的困难与挑战呢？
## 陷入困境

## 发展壮大

## 新的开始