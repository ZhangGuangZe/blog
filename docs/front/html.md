# HTML

超文本标记语言（Hyper Text Markup Language），是一种用来描述文档的标记语言。通常作为网页的内容和结构。

<img :src="$withBase('/h1.png')" alt="标记语言关系图" style="display: block; margin: 0 auto;">

## 简史

1991 年底，蒂姆·伯纳斯-李首次公开描述了 HTML，其中的大部分标签都深受 <abbr title="Standard Generalized Markup Language，标准通用标记语言">SGML</abbr> 的影响，这时的 HTML 被托管在 CERN 中。

1995 年 HTML2.0 由 <abbr title="Internet Engineering Task Force， 互联网工程任务组">IETF</abbr> 创建的 HTML 工作组完成。成为第一个标准化版本。

1997 年-1999 年，W3C 先后发布了 HTML3.2 和 HTML4.01 这两个重要版本。随后 W3C 将工作重心转向了开发基于 XML 的替代产品 —— XHTML。

2004 年，由 <abbr title="网页超文本技术工作小组">WHATWG</abbr> 开始制定 HTML 新的标准，并且将 HTML 制定成了一个 Living Standard。

## 语法

HTML 作为 SGML 的一个分支，继承了其很多语法，而且这些语法都比较灵活。

### DOCTYPE

在 HTML5 未发布之前，HTML 和 XHTML 版本的 DOCTYPE 语法都很长。

HTML4.01 中的 DTD。

```html
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01//EN" "http://www.w3.org/TR/html4/strict.dtd">
```

XHTML1.0 中的 DTD。

```html
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd">
```

通常，这些 DOCTYPE 其实是从 SGML 继承而来的 DTD（文档类型定义），它定义了文档的元素、属性、实体和注释等内容可以按照某种语法编写。而且浏览器会根据它是否完整或存在决定以 standards mode 或者[quirks mode](https://zh.wikipedia.org/wiki/quirks_mode "quirks mode")渲染。

而现在 HTML5 的 DOCTYPE 语法变得简单多了。

```html
<!DOCTYPE html>
```

### Elements

一个元素包括标签、属性和文本。

标签可分为开始标签（<code>&lt;tagname&gt;</code>）、结束标签（<code>&lt;/tagname&gt;</code>）、自闭合标签（<code>&lt;tagname /&gt;</code>）。当然，有些标签是可以省略的，但它仍存在与文档中。

属性是一个键值对，表示在元素的开始标签中，有空属性、无引号属性值、单引号属性值和双引号属性值 4 种写法。

```html
<input disabled />
<input disable="disable" />
<input disable="disable" />
<input disable="disable" />
```

### Text

元素、属性值和注释中都存在文本，在文本中遇到 < 和 & 需要进行转义处理。

### Character reference

在文本中，有些字符在文档的当前编码方式中不能直接表示，这时可以通过字符值引用或者字符实体引用两种方式对这些字符进行转义。字符实体引用以 & 开头，; 结尾，中间为具体的字符名称。比较常用的几个字符实体引用如下：

- &amp;quot;
- &amp;amp;
- &amp;lt;
- &amp;gt;

全部的字符实体引用请参考 [Entities](https://html.spec.whatwg.org/entities.json "Entities")。

### CDATA sections

CDATA 节点只能出现在 XML 的 Namespace 中，在节点中可以放心使用文档不能直接表示的字符。语法为 <code>&lt;![CDATA[]]></code>。

### Comments

HTML 中的注释以 <code>&lt;!--</code> 开头，<code>--!></code> 结尾。

## 元素

### 标签——语义

### 属性

### 字符实体
