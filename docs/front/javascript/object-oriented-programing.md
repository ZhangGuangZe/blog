# 面向对象编程

## 对象

对象是一系列属性的动态无序集合，每个属性都由键和值构成。键可以是字符串或 Symbol，值可以是任意类型的值。

### 创建对象

我们可以通过对象字面量来创建对象，也可以使用 `Object` 构造函数创建对象。

#### 对象字面量

对象字面量是描述对象初始化的表达式，它是由大括号包裹的零个、一个或多个以逗号分隔的键值对构成的**属性列表**，键是标识符、字符串字面量、数值字面量，值是任意表达式。最后一个属性的逗号是可选的。

``` js
let o1 = {};
let o2 = {
  a: 1,
  'b': 2,
  7: 3, // 可选逗号
};
```

ES6 为对象字面量提供了一些简洁方便的语法特性。

##### 简写属性

如果键和值与定义的变量名相同，使用简写属性可以省略冒号和键值，避免代码冗余。

``` js
let a = 'foo';
let o1 = { a: a };
let o2 = { a };
```

##### 简写方法

通过简写方法省略冒号和后面的函数定义表达式，可以让方法定义更加简洁清晰。

``` js
let o1 = {
  foo: function () {}
};
let o2 = {
  foo() {}
};
```

通过在方法前面加上 getter 和 setter 修饰符可以在查询和设置属性时调用相关函数。

``` js
const person = {
  firstName: 'Michael',
  lastName: 'Jordan',
  get fullName() {
    return this.firstName + ' ' + this.lastName;
  },
  set fullName(val) {
    [this.firstName, this.lastName] = val.split(' ');
  }
};
```

##### 计算属性

计算属性受到动态访问属性的启发，允许使用 `[]` 包裹表达式，动态计算出键名。`[]` 除了可以包裹表达式外，还可以包裹不合法的标识符、任意字符串或 Symbol。

``` js
let mySymbol = Symbol('mySymbol');
const o = {
  ['foo' + 1]: 'bar',
  ['hello world']: 1,
  [mySymbol]: 'hello world'
};
```

### 访问属性

我们可以通过点号表示法和方括号表示法来访问对象属性。点号表示法用于访问键名必须是合法标识符的属性；方括号表示法用于访问的键名是非法标识符或通过表达式动态计算的属性，键名必须是字符串和 Symbol，表达式求出的非字符串都会被转换为字符串。如果访问的属性不存在则返回 `undefined`。

``` js
o.foo1;           // => 'bar'
o['hello world']; // => 1
o[mySymbol];      // => 'hello world'
o.bar;            // => undefined
```

### 创建和设置属性

我们可以通过 `=` 操作符为对象属性赋值，如果属性不存在，则会创建一个新属性，如果属性存在，则会重新设置该属性的值。

``` js
const o = {};
o.foo = 'bar';
o.foo = 'baz';
```

### 删除属性

我们可以通过 `delete` 操作符删除属性。

``` js
const o = {
  foo: 'bar'
};
delete o.foo;
o.foo; // => undefined
```

### 检查属性

- in 操作符

我们可以通过 `in` 操作符检查指定对象是否拥有**自有属性**或**继承属性**。

``` js
const o = {
  foo: 1
};
'foo' in o;      // => true
'bar' in o;      // => false
'toString' in o; // => true
```

- hasOwnProperty(prop)

`hasOwnProperty()` 用于检查指定对象是否拥自有属性。

``` js
const o = {
  foo: 1
};
o.hasOwnProperty('foo');      // => true
o.hasOwnProperty('toString'); // => false
```

由于该方法缺乏保护机制，如果在对象上拥有同名属性会有被覆盖风险。

``` js
const o = {
  foo: 1,
  hasOwnProperty: false
};
o.hasOwnProperty('foo'); // TypeError
```

不过，可以通过一种安全的方式检查自有属性。

``` js
Object.prototype.hasOwnProperty.call(o, 'foo');
```

- Object.hasOwn(obj, prop)<sup>(ES2022)</sup>

ES2022 增加了 `Object.hasOwn()` 方法来替代 `hasOwnProperty()` 方法。这让检查指定对象是否拥有某个自有属性变得更加直观。

``` js
const o = {
  foo: 1,
  hasOwnProperty: false
};
Object.hasOwn(o, 'foo');            // => true
Object.hasOwn(o, 'hasOwnProperty'); // => true
Object.hasOwn(o, 'toString');       // => false
```

### 枚举属性

- Object.keys(obj)<sup>(ES6)</sup>

`Object.keys()` 方法返回指定对象所有可枚举的、以字符串作为键名的自有属性键名数组。

- Object.getOwnPropertyNames(obj)

`Object.getOwnPropertyNames()` 方法返回指定对象所有可枚举和不可枚举的、以字符串作为键名的自有属性键名数组。

- Object.getOwnPropertySymbols(obj)<sup>(ES6)</sup>

`Object.getOwnPropertySymbols()` 方法返回指定对象所有可枚举和不可枚举的、以 Symbol 作为键名的自有属性键名数组。

- Reflect.ownKeys(obj)<sup>(ES6)</sup>

`Reflect.ownKeys()` 方法返回指定对象所有可枚举和不可枚举的、以字符串和 Symbol 作为键名的自有属性键名数组。

``` js
const enumerableSymbolKey = Symbol('enumerableSymbolKey');
const nonEnumSymbolKey = Symbol('nonEnumSymbolKey');
const o = {
  enumerableStringKey: 1,
  [enumerableSymbolKey]: 2
};
Object.defineProperties(o, {
  nonEnumStringKey: {
    value: 3,
    enumerable: false
  },
  [nonEnumSymbolKey]: {
    value: 4,
    enumerable: false
  }
});
Object.keys(o);                   // => ['enumerableStringKey']
Object.getOwnPropertyNames(o);    // => ['enumerableStringKey', 'nonEnumStringKey']
Object.getOwnPropertySymbols(o);  // => [Symbol(enumerableSymbolKey), Symbol(nonEnumSymbolKey)]
Reflect.ownKeys(o);               // => ['enumerableStringKey', 'nonEnumStringKey', Symbol(enumerableSymbolKey), Symbol(nonEnumSymbolKey)]
```
- Object.values(obj)<sup>(ES2017)</sup>

`Object.values()` 方法返回指定对象的所有可枚举的、以字符串作为键名的自有属性键值数组。

- Object.entries(obj)<sup>(ES2017)</sup>

`Object.entries()` 方法返回指定对象的所有可枚举的、以字符串作为键名的自有属性键值对数组。

``` js
const symbolKey = Symbol('symbolKey');
const o = {
  stringKey: 1,
  [symbolKey]: 2
}
Object.values(o);  // => [1]
Object.entries(o); // => [['stringKey', 1]]
```

- Object.fromEntries(iterable)<sup>(ES2019)</sup>

`Object.fromEntries()` 方法用于将一个可迭代的键值对列表转换为一个对象。

``` js
Object.fromEntries([['a', 1], ['b', 2]]); // => {a: 1, b: 2}
```

#### 枚举顺序

对象的自有属性始终按以下顺序列出：

1. 以整数为字符串键名的属性（按数字升序）；

2. 其它字符串键名的属性（按添加先后顺序）；

3. 以 Symbol 为键名的属性（按添加先后顺序）。

``` js
const symbol1 = Symbol('symbol1');
const symbol2 = Symbol('symbol2');
const o = {[symbol1]: 0, b: 0, '-1': 0, 2: 0, '1': 0, '-2': 0, 'str': 0, a: 0, [symbol2]: 0 };
Reflect.ownKeys(o); // =>  ['1', '2', 'b', '-1', '-2', 'str', 'a', Symbol(symbol1), Symbol(symbol2)]
```

### 复制对象

复制对象包括浅拷贝和深拷贝两种方式。两种方式的区别在于：如果键值是一个对象，浅拷贝只会复制对象的引用，而深拷贝则会复制对象的值。

#### 浅拷贝

- Object.assign(target, ...source)<sup>(ES6)</sup>

`Object.assign()` 方法将一个或多个源对象的所有可枚举的、以字符串和 Symbol 作为键的自有属性复制到目标对象，并返回目标对象。该方法不仅可以用来复制对象，还可以用来合并对象和为对象提供默认值。

``` js
// 复制对象
const source = { a: 1, b: 2 };
Object.assign(source); // => {a: 1, b: 2}

// 合并对象
const o1 = { a: 1 };
const o2 = { b: 2 };
Object.assign(o1, o2); // => {a: 1, b: 2}

// 为对象提供默认值
const o = { c: 3, a: 4 };
const defaults = { a: 1, b: 2 };
Object.assign({}, defaults, o); // => {a: 4, b: 2, c: 3}
```

- 扩展属性

在对象字面量中，ES2018 提供了一种更简洁的扩展属性语法做与 `Object.assign()` 方法相同的事。

``` js
// 复制对象
const source = { a: 1, b: 2 };
console.log({ ...source }); // => {a: 1, b: 2}

// 合并对象
const o1 = { a: 1 };
const o2 = { b: 2 };
console.log({ ...o1, ...o2 }); // => {a: 1, b: 2}

// 为对象提供默认值
const o = { c: 3, a: 4 };
const defaults = { a: 1, b: 2 };
console.log({ ...defaults, ...o }); // => {a: 4, b: 2, c: 3}
```

在合并对象过程中，如果对象存在同名属性，后面的属性会把前面的属性覆盖。

需要注意的是，`Object.assign()` 方法会调用源对象的 getter 方法和目标对象的 setter 方法。而展开属性语法只会调用 getter 方法。

``` js
const o1 = {
  set foo(val) {
    console.log('调用 setter 方法');
  }
};
const o2 = {
  get foo() {
    console.log('调用 getter 方法');
    return 'foo';
  }
};
console.log({...o1, ...o2}); // => 调用 getter 方法
Object.assign(o1, o2); 
// => 调用 getter 方法
// => 调用 setter 方法
```

#### 深拷贝

- JSON.parse(JSON.stringify(obj))

通过 JSON 序列化时，键值为 `undefined`、Symbol 或者为方法时会被忽略，如果对象中存在循环引用则会抛出 TypeError 异常。

- [structuredClone()](https://developer.mozilla.org/zh-CN/docs/Web/API/structuredClone) 方法可以实现深拷贝

如果对象中存在方法和 Symbol 值会抛出异常。

- [_.cloneDeep()](https://github.com/lodash/lodash/blob/master/cloneDeep.js)

针对以上两种方法存在的问题，可以通过 Lodash 库的 _.cloneDeep() 方法解决。

- 自己实现

可以通过递归自己实现一个深拷贝，不过这里并没有解决循环引用问题。

``` js
function cloneDeep(obj) {
  if (typeof obj !== 'object') return;
  let res = !Array.isArray(obj) ? {} : [];
  for (const [key, val] of Object.entries(obj)) {
    if (Object.hasOwn(obj, key)) {
      if (val != null && typeof val === 'object') {
        res[key] = cloneDeep(val);
      } else {
        res[key] = val;
      }
    }
  }
  return res;
}
const o = {
  a: 1,
  b: undefined,
  c() {},
  d: Symbol('symbolVal'),
  e: {
    f: null,
    g: [1, 2, 3]
  }
};
const copy = cloneDeep(o);
o === copy; // => false
```

## 面向对象

## 参考

- wikipedia
- [MDN-JavaScript](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript)
- [ECMAScript proposals](https://github.com/tc39/proposals)
- 《你不知道的 JavaScript》上卷
- 《JavaScript 高级程序设计》（第 4 版）
- 《JavaScript 权威指南》（原书第 7 版）
- 《JavaScript 悟道》
- [《JavaScript for impatient programmers (ES1–ES2022) 》](https://exploringjs.com/impatient-js/toc.html)
- 《Effective JavaScript——编写高质量 JavaScript 代码的 68 个有效方法》
- 《JavaScript 编程精解》（原书第 3 版）
- 《深入理解 JavaScript 特性》
- [《JavaScript 二十年》](https://github.com/doodlewind/jshistory-cn)
- [重学前端](https://time.geekbang.org/column/article/78884)
- [JavaScript专题之深浅拷贝](https://github.com/mqyqingfeng/Blog/issues/32)
- [面试官：深拷贝浅拷贝的区别？如何实现一个深拷贝？](https://github.com/febobo/web-interview/issues/56)