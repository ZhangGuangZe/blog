# 类型系统

ECMAScript 中的类型用于操作值，每个值都有对应的类型。ECMAScript 类型被进一步细分为语言类型和规范类型。

## 动态类型

JavaScript 是一种动态类型或者弱类型的语言。变量本身没有与类型进行绑定，而值会在程序运行过程中自动确定类型。

## 语言类型

ECMAScript 语言类型对应的是程序直接表示和操作的值。包括 `Undefined`、`Null`、`Boolean`、`String`、`Symbol`、`Number`、`BigInt` 和 `Object` 八大类型。

其中，前七种类型统称为原始类型，其值为原始值，Object 类型称为对象类型，也称引用类型，其值为对象或引用。原始值和对象的区别在于：

- 原始值
  - 存储在栈内存中；
  - 按值传递。将原始值赋值给变量或者作为参数传递给函数时，通过复制值的方式赋值或传递；
  - 不可变（immutable）。一旦创建就无法修改值本身。

- 对象
  - 存储在堆内存中；
  - 按引用传递。将对象赋值给变量或者作为参数传递给函数时，通过复制引用的方式赋值或传递；引用指向存储在堆内存中的对象；
  - 可变（mutable）。默认情况下可以操作对象的属性。

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

#### 创建

我们可以通过[字面量](structure.md#字符串字面量)来创建 String 类型的值。

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

#### 模板字符串

为了增强字符串的能力，同时提供对模板的支持并降低注入等安全风险，ES6 新增了模板字符串，使用反引号（``）标识，需要使用转义才能在模板字符串中使用反引号。

##### 多行字符串

在 ES6 之前，JavaScript 的字符串一定要在一行才行。如果想要软换行字符串，也就是看起来是多行其实是一行的字符串，那需要在每行字符串末尾增加一个反斜杠。

``` js
'This is actually \
a line.' // => This is actually a line.
```

如果想要硬换行，也就是真正意义上的将一行字符串转换为多行字符串，那就需要在换行字符串前使用转义的换行符。

``` js
console.log('This is the first line.\nThis is the second line.');
```

而在 ES6 的模板字面量中默认支持多行字符串，模板字面量会保留换行符空白符等符号。

``` js
console.log(`This is the first line.
This is the second line.`);
```

##### 字符串插值

在 ES6 之前，如果需要给字符串插值，我们需要使用字符串拼接的形式才能做到。

``` js
let a = 1;
let b = 2;
console.log('sum = ' + (a + b)); // => sum = 3
```

现在我们可以在 `${` 和 `}` 占位符之间插入任意的 JavaScript 表达式。表达式会将值立即求出，然后转换为字符串，最终替换占位符并与其他字符串拼接形成新的字符串。

``` js
let a = 1;
let b = 2;
console.log(`sum = ${a + b}`); // => sum = 3
```

模板字符串支持嵌套插值。

##### 标签函数

无论是使用普通字符串还是模板字符串进行插值都存在注入等安全风险，不过我们可以使用模板函数对模板字符串的值进行预处理来尽可能的规避风险，也就是对某些字符进行转义、过滤等自定义操作并返回处理好的字符串。

模板字符串前面的标识符作为函数名，`${}` 占位符将字符串拆分为多段并组合到数组中作为函数的第一个参数，占位符内的值作为函数的剩余参数，标签函数的第一个参数包括一个 `raw` 属性，我们通过它可以获取未经处理的原始字符串。

``` js
function tag(strings, ...values) {
  console.log(strings, ...values); // => ['a', 'b', 'c', ''] 1 2 3
  console.log(strings.raw[0]); // => a\n
}
tag`a\n${1}b${2}c${3}`
```

为了能够在标签函数中正常嵌套其他模板语言，ES2018 在标签函数中放宽了对非法转义序列的语法限制，非法转义序列在标签函数中将返回 `undefined` 而不再是抛出语法错误，不过在其他字符串中并未解除该限制。

``` js
function latex(str) {
  console.log(str[0], str.raw[0]); // => undefined '\\unicode'
}
latex`\unicode`

`\unicode` // => SyntaxError: Invalid Unicode escape sequence
```

### Symbol 类型

Symbol 类型是 ES6 新增的数据类型，用于为对象的属性名创建一个唯一的、非字符串形式的标识符，这样能够避免对象属性名冲突。Symbol 类型还可以用于定义语言内部行为。

我们可以使用 `Symbol()` 函数创建 Symbol 类型的值。为了方便阅读与调试，可以为函数传入一个可选的字符串参数作为 symbol 值的描述。

#### 属性

为了方便读取描述，ES2019 增加了 `description` 属性。

``` js
const mySymbol = Symbol('foo');
mySymbol.description // => 'foo'
```

#### 方法

- for(key)

有时候，我们需要在不同执行上下文共享和复用 symbol 值，那么可以通过 `Symbol.for(key)` 方法并传入字符串参数 key 在全局注册表中创建或者查找 symbol。

``` js
const createGlobalSymbol = Symbol.for('foo');
const reuseGlobalSymbol = Symbol.for('foo');
createGlobalSymbol === reuseGlobalSymbol; // => true
```

- keyFor(symbol)

`Symbol.keyFor(symbol)` 方法用于返回在全局注册表中与 symbol 关联的 key。如果查找的 symbol 值不在全局符号表中，则返回 `undefined`。

``` js
const globalSymbol = Symbol.for('foo');
Symbol.keyFor(globalSymbol); // => 'foo'
```

### Number 类型

Number 类型是一种基于 IEEE 754 标准的 64 位[双精度浮点数](https://en.wikipedia.org/wiki/Double-precision_floating-point_format)**数值类型**。

![双精度浮点数](https://upload.wikimedia.org/wikipedia/commons/a/a9/IEEE_754_Double_Floating_Point_Format.svg)

双精度浮点数格式由 1 位符号位（sign）、11 位指数位（exponent）和 53 位有效位（fraction）构成。符号位在最高位中，0 表示正数，1 表示负数；指数位用于表示小数点的位置，也可以用于表示 NaN、Infinity 和非规范化浮点数；有效位用于表示一定范围内的小数，并且有效位的最高位存在一个彩蛋位，该位始终为 1。

> 数值 = 符号位 * 有效位 * 2 ** 指数

Number 类型可以用来表示整数和浮点数值。在表示整数时，它的精度高达 53 位；但在表示浮点数时，浮点数在精度与性能之间做了权衡，有一些实数在 64 位存储空间中无法表示，为了保证性能，只能四舍五入到最接近的实数表示，这样那些无法表示的实数就会存在精度丢失，这也导致 0.1 + 0.2 !== 0.3。

#### 创建

我们可以通过[字面量](structure.md#数值字面量)来创建 Number 类型的值。

#### 特殊数值

##### 零

JavaScript 基于 IEEE 754 标准实现了 `0` 和 `-0` 两个零。除了用零做除数以外，它们几乎没有任何区别，但是不建议这么做。

``` js
0 === -0 // => true
1 / 0  // => Infinity
-1 / 0 // => -Infinity
```

##### Infinity

`Infinity` 指的是大到无法表示的值，并不是数学上的 ∞ 。

##### NaN

`NaN`（Not a Number）表示不是数值的数值。在算数运算中产生没有意义的结果或者转换数值失败时会返回 `NaN`。

``` js
0 / 0     // 没有意义，返回 NaN
0 / NaN   // 没有意义，返回 NaN
0 / 'foo' // 转换失败，返回 NaN
```

需要注意的是，`NaN` 不等于它自己。

``` js
NaN === NaN // => false
```

#### 属性

- `Number.EPSILON`<sup>ES6</sup> 表示最小正数，即 `2 ** -52`。由于浮点数运算存在精度丢失，会与实际结果产生误差。不过，我们可以通过 `Number.EPSILON` 为浮点数运算设置一个安全误差范围，如果运算结果在该范围内，则误差可以忽略不计。

``` js
Math.abs(0.1 + 0.2 - 0.3) < Number.EPSILON // => true
```

- `Number.MAX_SAFE_INTEGER`<sup>ES6</sup> 表示最大安全整数，即 `2 ** 53 - 1`、

- `Number.MIN_SAFE_INTEGER`<sup>ES6</sup> 表示最小安全整数，即 `-(2 ** 53 - 1)`。

- `Number.MAX_VALUE` 表示最大数值，相当于 `1.79E+308`；

- `Number.MIN_VALUE` 表示最接近于 0 的最小值，相当于 `5e-324`。

- `Number.POSITIVE_INFINITY` 表示太大而无法表示的正数，即 `Infinity`。

- `Number.NEGATIVE_INFINITY` 表示太大而无法表示的负数，即 `-Infinity`。

- `Number.NaN` 与 `NaN` 相同。

#### 方法

- Number.isSafeInteger(number)<sup>ES6</sup> 检查数值类型 number 是否是安全整数。

- Number.isInteger(number)<sup>ES6</sup> 检查数值类型 number 是否是整数。

- Number.isFinite(number)<sup>ES6</sup> 检查数值类型 number 是否是有穷数。

- Number.isNaN(number)<sup>ES6</sup> 检查数值类型 number 是否是 `NaN`。

如果 number 是其他类型，以上方法都不会对 number 进行类型转换。

- Number.parseInt(string, ?radix)<sup>ES6</sup> 用于将字符串解析为指定进制整数，这里的 radix 默认值并不是十进制，如果字符串开头包含 '0x' 或 '0X'，那么字符串会被当成十六进制解析。所以无论如何，我们都应该提供明确的 radix。

- Number.parseFloat(string)<sup>ES6</sup> 用于将字符串解析为浮点数。

以上方法与全局方法 `parseInt()` 和 `parseFloat()` 的行为保持一致，只是出于减少全局命名空间污染目的，将其归纳到了 `Number` 函数中。

- toFixed(?fractionDigits)

返回指定小数点位数表示的数值字符串。通过可选的 fractionDigits 指定保留多少位小数。

- toExponential(?fractionDigits)

返回以科学计数表示法表示的数值字符串。通过可选的 fractionDigits 指定小数的位数。

- toPrecision(?precision)

返回指定位数表示的数值字符串。通过可选的 precision 指定数值位数。

- toString(?radix)

返回数值的字符串表示。通过可选的 radix 将数值转换为指定基数，radix 在 2 ~ 36 之间，默认值为 10。

### BigInt 类型

BigInt 是 ES2020 提供的一种新的基本数据类型，用于表示大于 2 ** 53 的整数。Number 类型在超出安全整数范围内的算数运算并不精确。例如：

``` js
// ES2020 以前
const x = 2 ** 53;
x + 1; // => 9007199254740992

// ES2020
const y = 2n ** 53n;
y + 1n; // => 9007199254740993n
```

#### 创建

我们可以通过字面量（在整数末尾添加一个 `n`）或者调用 `BigInt` 构造函数来创建 BigInt 类型的值。

``` js
const x = 9007199254740991n;
const y = BigInt(9007199254740991);
```

#### 操作

与 Number 类型类似，BigInt 也可以使用算数运算符操作 BigInt 类型的值。不过需要注意的是除法运算会丢弃小数部分向下取整，为了兼容 asm.js，不能使用一元加操作符。

``` js
5n / 2n // => 2n
+1n // => TypeError
```

由于 Number 和 BigInt 之间强制类型转换会导致精度丢失，建议仅在预期大于 2 ** 53 的整数时才使用 BigInt。

### Object 类型

Object 类型用于表示复杂的数据，这里的 Object 指的是广义上的对象，主要包括 `Object`、`Array`、`Function`、`RegExp` 和 `Date` 等对象，而不是狭义上的 `Object` 对象。

### 类型检测

#### typeof

我们可以通过 typeof 操作符来检测值的类型，它返回的是表示值类型的字符串。

| 类型      | 返回结果    |
| :-------- | ----------- |
| Undefined | 'undefined' |
| Null      | 'object'    |
| Boolean   | 'boolean'   |
| String    | 'string'    |
| Symbol    | 'symbol'    |
| Number    | 'number'    |
| BigInt    | 'bigInt'    |
| Function  | 'function'  |
| Object    | 'object'    |

值得注意的是，在某些情况的返回结果可能会让我们产生困惑。例如，

1. 为什么 `typeof null` 返回 `'object'` 而不是 `'null'`？

从结果来看，这是一个 bug；从最初设计角度来看，为了与 Java 保持一致，null 表示为“没有对象”的对象，所以 null 被建模成对象的一个特殊值；从最初的实现角度看，这是 “抽象泄露” 的结果，JavaScript 中的值由一个类型标记和实际值构成，null 值与对象值使用了相同的类型标记。所以返回 `'object'`。

我们可以通过特殊处理来检测 null 的类型：

``` js
let a = null;
!a && typeof a === 'object'; // => true
```

2. 为什么 `typeof function() {}` 返回 `'function'` ？

这是因为作为一等公民的函数有其特殊性，有必要将函数与对象区分开。

### 类型转换

我们将值从一种类型转换到另一种类型称为类型转换。JavaScript 中的类型转换包括显示强制类型转换和隐式强制类型转换两种。

使用转换函数和一些语义明显的操作符可以对值进行显示强制类型转换。而在一些操作符和语句中，JavaScript 通过一些转换规则，自动的将操作数和表达式的值隐式转换为特定类型。

隐式强制类型转换最初的目的是为了降低 JavaScript 作为简单脚本语言的入门门槛，但由于各种原因产生了错综复杂的转换规则，导致其成为混淆和错误的重要来源。不过取其精华去其糟粕，我们还是可以体验到强制类型转换带来的便利。

#### ToString

ToString 是其它类型的值转换为字符串的抽象规则：

| 类型      | 结果                                         |
| :-------- | -------------------------------------------- |
| Undefined | 'undefined'                                  |
| Null      | 'null'                                       |
| Boolean   | true => 'true'；false => 'false'             |
| Number    | 调用 Number.toString() 方法                  |
| BigInt    | 调用 BigInt.toString() 方法，后缀 n 会被去除 |
| Symbol    | 抛出 **TypeError** 异常                      |
| Object    | 执行 ToPrimitive 操作（见后文）               |

`String()` 函数用于将非字符串显示强制类型转换为字符串。

二元 + 操作符在某些情况下会对操作数进行隐式强制类型转换。如果有一个操作数是字符串，则会把另一个操作数转换为字符串。通常使用 x + '' 将 x 转换为字符串。

以下是使用 `String()` 函数进行显示强制类型转换与使用二元 + 操作符进行隐式强制类型转换为字符串的区别：

如果操作数是一个 Symbol 值，`String()` 函数可以将其转换为字符串，而使用二元 + 操作符转换则会抛出 TypeError 异常。

如果操作数是一个对象，`String()` 函数通过 ToString 规则直接返回转换结果，而使用二元 + 操作符会先调用 `valueOf()` 方法，然后通过 ToString 规则将其结果转换为字符串。

#### ToNumber

ToNumber 是其它类型的值转换为数值的抽象规则：

| 类型      | 结果                    |
| :-------- | ----------------------- |
| Undefined | NaN                     |
| Null      | 0                       |
| Boolean   | true => 1；false => 0   |
| BigInt    | 抛出 **TypeError** 异常 |
| String    | StringToNumber          |
| Symbol    | 抛出 **TypeError** 异常 |
| Object    | 执行 ToPrimitive 操作（见后文） |

StringToNumber 转换规则如下：

- 如果是空字符串，返回 0；

- 如果字符串中是一个合法的 Number 类型的值，返回十进制数值，否则返回 NaN。

`Number()` 函数用于非数值显示强制类型转换为数值。

一元 + 操作符也用于将操作数显示强制类型转换为数值。

#### ToBigInt

ToBigInt 是其它类型的值转换为大整数的抽象规则：

| 类型      | 结果                                                      |
| :-------- | --------------------------------------------------------- |
| Undefined | 抛出 **TypeError** 异常                                   |
| Null      | 抛出 **TypeError** 异常                                   |
| Boolean   | true => 1n；false => 0n                                   |
| Number    | integer => integer + 后缀 n；非 integer，抛出 **RangeError** 异常；非法数值抛出 **SyntaxError** 异常 |
| String    | StringToBigInt                                            |
| Symbol    | 抛出 **TypeError** 异常                                   |

StringToBigInt 转换规则如下：

- 如果是空字符串，返回 0n；

- 如果字符串中是一个合法的整数值，则返回带有后缀 n 的整数值，否则抛出 **SyntaxError** 异常

`BigInt()` 函数用于将布尔值、字符串和数值转换大整数。

#### ToBoolean

ToBoolean 是将其他类型的值转换为布尔值的抽象规则：

| 类型      | 结果                          |
| --------- | ----------------------------- |
| Undefined | false                         |
| Null      | false                         |
| String    | 空字符串 => false，其它 => true     |
| Symbol    | true                          |
| Number    | 0、NaN => false，其它 => true |
| BigInt    | 0n => false，其它 => true     |
| Object    | true                          |

JavaScript 在一些需要布尔值的地方可以接受任何值作为操作数，而这些值会被隐式转换为布尔值。

转换为 `false` 的值称为**假值**（falsy），包括：

- `false`；

- `undefined`；

- `null`；

- 空字符串；

- `0`、`-0`、`0n` 和 `NaN`。

转换为 `true` 的值称为**真值**（truthy）。需要注意的是，`{}`、`[]`、`'false'` 和 `'0'` 等值看起来像假值，其实都是真值。

`Boolean()` 函数用于将非布尔值显示强制类型转换为布尔值。

两个 !! 操作符也用于将操作数强制类型转换为布尔值。

需要注意的是，下面的操作符、表达式和语句会将其它类型的值隐式强制类型转换为布尔值：

- 逻辑操作符 `!` 、`||` 和 `&&` 的操作数；

- 三元表达式（`? :`）的第一个操作数；

- `if` 语句中的条件判断表达式；

-  `while`、`do-while` 和 `for` 语句中的条件判断表达式。

#### ToObject

ToObject 表示原始值转换成对象，即装箱转换。我们通过构造函数来创建封装了布尔值、数值和字符串的包装对象。但是一般情况下，我们不需要直接使用这些对象，因为封装对象的行为令人困惑。

我们在对原始值进行操作时，JavaScript 会隐式创建一个相应的包装对象，从而使用封装对象的属性和方法。使用完成之后会被立即销毁，所以给原始值创建属性并赋值后会立即不能访问。

因为原始值 `undefined` 和 `null` 没有对应的包装对象，所以操作这两个原始值是会抛出 TypeError 异常。

从 ES6 开始，新增的原始类型 `Symbol` 和 `BigInt` 不再支持显示的创建包装对象，如果想把这些类型转换成对象，可以使用 `Object()` 函数进行包装。

#### ToPrimitive

ToPrimitive 表示对象转换为原始值，即拆箱转换。其规则如下：

- 如果该值有 `valueOf()` 方法，并且返回原始值，则使用该值进行强制类型转换；

- 如果没有 `valueOf()` 方法，或者存在但返回的不是原始值，则使用 `toString()` 方法的返回值进行强制类型转换；

- 如果没有 `toString()` 方法则抛出 TypeError 异常。

虽然绝大多数对象转换为原始值都遵循 ToPrimitive 规则，但是 Date 对象比较独特，则是首先尝试调用 `toString()` 方法，再尝试 `valueOf()` 方法。

#### 抽象相等比较算法

只有在 `==` 操作符两边的操作数类型不同时，才会使用该算法，其规则简单概括如下：

- 如果一个操作数是 `null`，另一个操作数是 `undefined`，则相等。除此之外，它们与其它值不相等；

- 如果任意一个操作数是布尔值，则将其转换为数值再比较；

- 如果一个操作数是字符串，另一个操作数是数值，则先调用 ToNumber 把字符串转换为数值再比较；

- 如果一个操作数是字符串，另一个操作数是 BigInt，则先调用 StringToBigInt 把字符串转换为大整数再比较；

- 如果一个操作数是 Object，另一个操作数是字符串、数值或大整数，则先调用 ToPrimitive 把对象转换为原始值再比较。

详细规则请前往[官方标准](https://262.ecma-international.org/13.0/#sec-islooselyequal)查看。

## 参考

- wikipedia
- [MDN-JavaScript](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript)
- [ECMAScript 标准](https://262.ecma-international.org/13.0/)
- [ECMAScript proposals](https://github.com/tc39/proposals)
- 《你不知道的 JavaScript》中卷
- 《JavaScript 高级程序设计》（第 4 版）
- 《JavaScript 权威指南》（原书第 7 版）
- 《JavaScript 悟道》
- [《JavaScript for impatient programmers (ES1–ES2022) 》](https://exploringjs.com/impatient-js/toc.html)
- 《Effective JavaScript——编写高质量 JavaScript 代码的 68 个有效方法》
- 《JavaScript 编程精解》（原书第 3 版）
- [《JavaScript 二十年》](https://github.com/doodlewind/jshistory-cn)
- [重学前端](https://time.geekbang.org/column/article/78884)