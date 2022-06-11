# 类型系统

ECMAScript 中的类型用于操作值，每个值都有对应的类型。ECMAScript 类型被进一步细分为语言类型和规范类型。

## 语言类型

ECMAScript 语言类型对应的是程序直接表示和操作的值。包括 `Undefined`、`Null`、`Boolean`、`String`、`Symbol`(ES6)、`Number`、`BigInt`(ES2020) 和 `Object` 八大类型。其中，前七种统称为基本类型，后面一种称为对象类型或引用类型。

### Undefined 和 Null 类型

Undefined 类型只有一个值，即 `undefined`，Null 类型也只有一个值，即 `null`。它们都用于表示**缺少有意义的值**，都是假值或空值，都是各自类型的唯一成员。不过它们存在细微差异。

`null` 表示某个预期存在对象值的上下文里**没有对象**；`undefined` 表示既不是对象也不是原始值。

每当 JavaScript 无法提供具体有效的值时，就会返回 `undefined`。

- 变量声明但未初始化值为 `undefined`；
- 访问不存在对象属性或者数组元素会返回 `undefined`；
- 在函数中，未给函数参数提供实参值为 `undefined`，使用 `return` 语句省略了表达式或者未使用 `return` 语句也会返回 `undefined`。

`null` 是一个关键字，而 `undefined` 是一个标识符。

### Boolean 类型

Boolean 类型用于表示两种可能性的值，即 `true` 和 `false`。

### String 类型

String 类型（字符串）用于表示文本数据。它是由 16 位 Unicode **代码单元**（code unit）组成的字符序列。

Unicode 为全世界所有文字系统的字符提供了一个唯一的整数标识符——**代码点**（code point）。Unicode 设计最初版本的时候错误的估算了代码点的容量，认为最多只需 2<sup>16</sup> 个代码点就能表示所有字符，所以使用 16 位代码单元与代码点一对一映射的 USC-2 字符编码来匹配字符。JavaScript 字符串当时也采用了这种方式，每个字符对应一个 16 位代码单元。

不过随着 Unicode 字符规模的扩大，代码点从最初的 2<sup>16</sup> 扩展到超过 2<sup>20</sup>。Unicode 将这些代码点划分为 17 个大小为 2<sup>16</sup> 的平面，并从 0 到 16 编号，总共包含 1114112 个代码点。第 0 平面称为基本多文种平面（Basic Multilingual Plane，简称 BMP），包含最初的 2<sup>16</sup> 个代码点，剩下的 16 个平面统称为辅助平面（Supplementary Planes）。在 BMP 中，从 U+D800 到 U+DFFF 之间的码位区段永久保留且不映射任何 Unicode 字符。

随着代码点的扩展，USC-2 已经不再适用。而作为 USC-2 的替代者，[UTF-16](https://zh.wikipedia.org/wiki/UTF-16) 采用**代理对**（Surrogate Pair）来表示扩展的代码点，用两个 16 位代码单元表示一个扩展的代码点。代理对的具体实现方式是：

  1. 代码点减去 `0x10000`，得到一个 20 位的字符集；
  2. 将高位与 `0xD800` 相加得到第一个代码单元；
  3. 将低位与 `0xDC00` 相加得到第二个代码单元；
  4. 将第一个代码单元与第二个代码单元组合得到一个代理对。

以 U+1F4A9（💩）为例：

  1. `0x1F4A9` 减去 `0x10000` 得到 `0xF4A9`，二进制为 `0000111101 0010101001`；
  2. 将高位（前十位）`0x03D`（`0000111101`）与 `0xD800` 相加得到 `0xD83D`；
  3. 将低位（后十位）`0x0A9`（`0010101001`）与 `0xDC00` 相加得到 `0xDCA9`；
  4. 将 `0xD83D` 与 `0xDCA9` 组合即可得到代理对。

为了表示更多的字符，JavaScript 也支持了 UTF-16 编码，所以在 JavaScript 字符串中同时支持了 UCS-2 和 UTF-8 两种字符编码。不过当 Unicode 字符规模扩大时，JavaScript 字符串的字符元素已经采用了 16 位表示，而字符串的 `length` 属性、`charAt()`、`charCodeAt()` 和 `fromCharCode()` 方法都已基于代码单元实现，这也导致这些属性和方法处理辅助平面的字符时无法正常工作，需要引入新的 API 才能更好地处理辅助平面字符。

#### 属性

字符串有一个 `length` 属性，用于表示字符串中字符代码单元的数量。

``` js
var str = 'Wow 😲!';
str.length // => 7
```

😲 表情符号需要使用两个代码单元表示，所以上述字符串的长度是 7 而不是我们实际看到的 6。

#### 方法

字符串的方法用于字符、搜索、提取、组合、转换、模式匹配和比较操作。

##### 字符

- charAt(pos)

用于返回给定索引位置的字符。JavaScript 字符串也支持通过属性访问表达式（`[]`）根据索引访问指定位置字符。

``` js
var str = 'hello world';
str.charAt(2) // => l
str[2] // => l
```

- charCodeAt(index)

用于返回 BMP 范围内指定代码单元索引的代码点。

- codePointAt(pos`<sup>(ES6)</sup>

用于返回辅助平面范围内指定代码单元索引位置的代码点。

``` js
var str = '😲';
str.charCodeAt(0) // => 55357
str.charCodeAt(1) // => 56882
str.codePointAt(0) // => 128562
```

- String.fromCharCode(codes)<sup>(ES6)</sup>

用于根据 BMP 范围内的代码点序列创建字符串。

- String.fromCodePoint(codePoints)<sup>(ES6)</sup>

用于根据辅助平面范围内的代码点序列创建字符串。

``` js
String.fromCharCode(55357, 56882) // => '😲'
String.fromCodePoint(128562) // => '😲'
```

##### 搜索

- indexOf(searchString, ?position) & lastIndexOf(searchString, ?position)

用于从主串开头或者末尾开始搜索子字符串并返回子字符串在主串第一次出现的位置，没有搜索到则返回 `-1`。

- includes(searchString, ?position)<sup>(ES6)</sup>

用于判断主串是否存在子字符串并返回布尔值。

- startsWith(searchString, ?position)<sup>(ES6)</sup> & endsWith(searchString, ?position)<sup>(ES6)</sup> 

用于判断主串开头或者结尾是否存在子字符串并返回布尔值。

searchString 是搜索的子字符串，可选的 position 是搜索的位置，可以用它来缩减搜索的范围。

##### 提取

- slice(?start, ?end)

用于从字符串中提取新的子字符串。start 表示提取的开始位置，end 表示提取的结束位置（不包含），它们都是可选的。如果索引为负数，则索引为字符串长度加负数索引。如果两个参数都不传相当于复制整个字符串。

- substring(start, ?end)

用于提取开始索引和可选结束索引（不包含）之间的子字符串并返回新的子字符串。

- at(index)<sup>(ES2022)</sup>

用于返回索引位置的字符。如果 index 为负数，则返回字符串最后一个元素开始倒数第 index 个位置上的字符。

在 ES2022 以前，想要获取字符串倒数第几位元素上的字符，需要使用 `str[str.length - index]` 或者 `slice()` 方法才能做到，有了 `at()` 方法后可以让这种操作变得更加简单。

``` js
var str = 'hello world'
str[str.length - 2]; // => l
str.slice(-2, -1); // => l
str.at(-2); // => l
```

##### 组合

- concat(strings)

用于将一个或多个字符串拼接成一个新的字符串。不过使用加号操作符（`+`）拼接字符串效果更好。

- repeat(count)<sup>(ES6)</sup>

用于将字符串重复 count 次并返回重复后的新字符串。如果填充次数为 0，则返回空字符串。

- padStart(maxLength, ?fillString)<sup>(ES2017)</sup> & padEnd(maxLength, ?fillString)`<sup>(ES2017)</sup>

用于将可选的填充字符串填充到当前字符串的开头或结尾直到达到最大长度，并返回填充后的新字符串。如果省略了填充字符串，则默认填充空格（U+0020）。如果最大长度小于或等于字符串长度，则返回原始字符串。

- trim()

用于删除字符串左右两边的空白符和行终止符并返回删除后的新字符串。

- trimStart()<sup>(ES2019)</sup> & trimEnd()<sup>(ES2019)</sup>

用于删除字符串开头或末尾的空白符和行终止符并返回删除后的新字符串。

##### 转换

- normalize(?form)<sup>(ES6)</sup>

用于将看起来相同，但代码点不同的字符按照某种形式规范化并返回规范化后的字符串。

``` js
'Å' === 'Å' // => false
'Å' === 'Å'.normalize() // => true
```

因为第一个字符是一个 BMP 范围内的字符，其 Unicode 转义序列为 `'\u00C5'`，而第二个字符是一个辅助平面范围内的字符，其 Unicode 转义序列为 `'\u0041\u030A'`，所以它们不相等，不过规范化第二个字符后它们相等了。

- toLowerCase() & toUpperCase()

用于转换字符串中 Unicode 字母大小写并返回转换后的新字符串。

- toLocaleLowerCase() & toLocaleUpperCase()

用于根据特定地区语言的特殊规则转换字符串中 Unicode 字母大小写并返回转换后的新字符串。

- String.raw()<sup>(ES6)</sup>

用于获取模板字符串中的原始字符串。使用该方法模板字符串中的转义序列将不会被转义。

``` js
console.log(String.raw`first line\nsecond line`) // => 'first line\nsecond line'
```

##### 模式匹配

- match(regExp)

用于检索并返回字符串与正则表达式匹配的结果。如果 regExp 使用了 `g` 标志，则返回匹配的所有结果；如果未使用 `g` 标志，则返回第一个匹配的结果及相关捕获组；如果没有匹配项，则返回 `null`；如果 regExp 是非正则表达式，则会使用 `new RegExp` 隐式的创建一个正则表达式。

- matchAll(regExp)<sup>(ES2020)</sup>

用于检索并返回字符串与正则表达式匹配的所有结果及其捕获组的迭代器。regExp 必须包含 `g` 标志，否则会抛出 `TypeError`。在 ES2020 以前，需要使用 `while` 循环加正则表达式的 `exec()` 方法才能同时获取匹配项和捕获组。

``` js
// ES2020 以前
var regex = /t(e)(st(\d?))/g;
var string = 'test1test2';
var matches = [];
var lastIndexes = {};
var match;
lastIndexes[regex.lastIndex] = true;
while (match = regex.exec(string)) {
	lastIndexes[regex.lastIndex] = true;
	matches.push(match);
}
console.log(matches);

// ES2020
[...string.matchAll(regex)]
```

- search(regExp)

用于返回字符串与正则表达式第一个匹配结果的索引，如果没有匹配项则返回 `-1`。

- replace(searchValue, replacement)

用于字符串替换并返回替换后的新字符串。searchValue 可以是一个字符串或者一个正则表达式，replacement 可以是一个字符串或者函数。

``` js
function htmlEscape(text) {
  return text.replace(/[<>"&]/g, match => {
    switch(match) {
      case '<': 
        return '&lt;';
      case '>':
        return '&gt;';
      case '"': 
        return '&quot;';
      case '&': 
        return '&amp;';
    }
  });
}
htmlEscape('<div class="container"></div>'); // => '&lt;div class=&quot;container&quot;&gt;&lt;/div&gt;'
```

以上代码用于将 HTML 标签中的特殊字符转义为 HTML 实体。

- replaceAll(searchValue, replacement)<sup>(ES2021)</sup>

用于全局匹配替换字符串并返回替换后的字符串。searchValue 可以是字符串或者正则表达式，如果 searchValue 是正则表达式，必须包含 `g` 标志，否则会抛出 `TypeError`。replacement 可以是一个字符串或者函数。

``` js
// ES2021 以前
var queryString = 'q=query+string+parameters';
queryString.replace(/\+/g, ' ');  // => 'q=query string parameters'
queryString.split('+').join(' '); // => 'q=query string parameters'

// ES2021
queryString.replaceAll('+', ' '); // => 'q=query string parameters'
```

在 ES2021 以前，在匹配并替换多个相同的字符串时，需要使用 `replace()` 方法并使用正则表达式全局匹配，或者使用 `split()` 和数组的 `join()` 方法才能做到这一点。而使用 ES2021 的 `replaceAll()` 方法会变得更加直观方便。

- split(separator, limit)

用于根据 separator 将字符串拆分为由子字符串构成的数组。separator 可以是字符串或者正则表达式。limit 用于限制返回的数组元素。

##### 比较

- localeCompare(compareString, ?locales, ?options)

用于根据本地区实现比较字符串并返回一个数字。如果当前字符串小于比较字符串，则返回负数，如果当前字符串大于比较字符串，则返回正数，否则返回 `0`。

### Symbol 类型

### Number 类型

### BigInt 类型

### Object 类型

## 规范类型