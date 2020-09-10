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

标签可分为开始标签（``<tagname>``）、结束标签（``</tagname>``）、自闭合标签（``<tagname />``）。当然，有些标签是可以省略的，但它仍存在与文档中。

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

在文本中，有些字符在文档的当前编码方式中不能直接表示，这时可以通过字符值引用或者字符实体引用两种方式对这些字符进行转义。字符实体引用以 & 开头，; 结尾，中间为具体的字符名称。

### CDATA sections

CDATA 节点只能出现在 XML 的 Namespace 中，在节点中可以放心使用文档不能直接表示的字符。语法以 ``<![CDATA[`` 开头，以 ``]]>`` 结尾。

### Comments

HTML 中的注释以 ``<!--`` 开头，``--!>`` 结尾。

## 元素

说起元素，我们常常会想到标签和属性，那 HTML 究竟有些什么标签和属性呢？以及他们传到的到底是什么语义？

### 标签

用合适的标签传达正确的语义是很有必要的，这样对于用户来说可以提高页面的可读性，对于开发者来说便于维护，这样也方便机器阅读（屏幕阅读器），而且还有利于 SEO。

如果标签表示的语义不恰当，则会让标签冗余、增加用户的阅读负担。

#### 文档标签

文档标签是一个文档的主要结构。

``<html>`` HTML 文档的根元素。

``<head>`` 与文档相关的配置信息。

``<body>`` 文档的内容部分。

#### 元数据标签

元数据标签可以设置其余内容的表现或者行为或者传达某种信息。他们通常出现在 ``<head>`` 标签中。

``<title>`` 能够概括上下文的文档标题，显示在浏览器的标题栏上，每个文档只有一个文档标题。

``<base>`` 为文档所有 URL 提供一个基础地址，一份文档只有一个 ``<base>`` 标签。

``<style>`` 描述了文档的表现形式。

``<meta>`` 文档的元数据信息。

  - ``name``：元数据的名称，主要包括 ``author``、``description``、``keywords``、``referrer``、``viewport``等，还可以自定义其他名称。如果要做移动端适配，可以使用 ``viewpoint`` 名称，例如：

  ``` html
  <meta name="viewport" content="width=device-width, initial-scale=1">
  ```
  其中 width=device-width 表示页面宽度等于设备宽度， initial-scale=1 表示设备宽度与视口之间的缩放比例。

  - ``content``：元数据的值，可作为 ``name`` 和 ``http-equiv`` 属性的内容；
  - ``charset``：文档的字符编码；
  - ``http-equiv``：定义编译指令，这些值都是特定的 HTTP 头部名称。

#### 分区标签

分区标签表示文档的不同区域。

``<article>`` 可独立存在并且有意义的文档结构。

``<section>`` 文档中的独立部分。

``<header>`` 展示介绍性内容。

``<footer>`` 文档或者文章底部信息，可以包括作者、版权、相关链接等信息。

``<main>`` 文档中独一无二的主体内容。

``<aside>`` 与文档内容几乎无关的部分。

``<nav>`` 文档的导航信息。

``<h1>``、``<h2>``、``<h3>``、``<h4>``、``<h5>``、``<h6>`` 六个不同级别的标题。

``<hgroup>`` 对文档多级标题分组。

#### 分组标签

分组标签是对文档分区更细颗粒的划分。

``<p>``、``<div>``、``<pre>``、``<figure>``、``<blockquote>``、``<hr>``、``<ol>``、``<ul>``、``<dl>``

#### 文本级标签

文本级标签决定了段落内不同文本如何表示。

``<b>``、``<i>``、``<s>``、``<u>``、``<small>``、``<strong>``、``<em>``、``<sub>``、``<sup>``、``<br>``、``<wbr>``、``<code>``、``<var>``、``<samp>``、``<kbd>``、``<abbr>``、``<dfn>``、``<q>``、``<cite>``、``<ruby>``、``<bdo>``、``<bdi>``、``<mark>``、``<span>``、``<del>``、``<ins>``、``<data>``、``<time>``
``<address>``

#### 嵌入标签

嵌入式标签是将某种资源导入到标签中。

``<audio>``、``<video>``、``<img>``、``<svg>``、``<canvas>``、``<picture>``、``<object>``、``<embed>``、``<iframe>``、``<script>``

#### 链接标签

链接标签可以将文档与其他文档或者资源建立关系。

``<link>``、``<a>``、``<area>``

#### 表单标签

表单标签为用户提供了交互。
``<form>``、``<label>``、``<input>``、``<button>``、``<select>``、``<datalist>``、``<optgroup>``、``<option>``、``<textarea>``、``<output>``、``<progress>``、``<meter>``、``<fieldset>``、``<legend>``

#### 表格标签

表格标签为用户提供了一种展示数据的方式。

``<table>``、``<caption>``、``<colgroup>``、``<col>``、``<tbody>``、``<thead>``、``<tfoot>``、``<th>``、``<tr>``、``<td>``

### 属性

HTML 属性可以改变元素的行为或者提供某种信息，通常都是以 name = value 的形式出现。

HTML 中的属性分为所有元素都拥有的全局属性，也有只有个别元素拥有的局部属性。下面是一些常用的全局属性：

#### class

#### id 

#### style

#### title

#### hidden

#### tabindex

#### contenteditable

#### accesskey

#### spellcheck

#### data-*

#### 事件处理程序属性


### 实体

比较常用的几个字符实体引用如下：

- ``&quot;``
- ``&amp;``
- ``&lt;``
- ``&gt;``
- ``&nbsp;``

全部的字符实体引用请参考 [Entities](https://html.spec.whatwg.org/entities.json "Entities")。

### WAI-ARIA