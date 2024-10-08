# 函数式编程

## 函数

函数是 JavaScript 的重要组成部分之一。在 JavaScript 中，函数类似于过程，是一组执行任务或计算值的语句。在其他语言中，函数是子例程或过程，是程序执行过程中的主要模块单元。不过，不管是在哪种编程语言中，函数都是一种**可调用**的单元。

JavaScript 函数是**一等（first-class）对象值**，它可以作为顶层子程序、可以赋值给变量、作为对象的方法、在函数调用中作为参数传递、作为函数的返回值以及作为事件处理器。

JavaScript 中的函数是函数对象，每个函数都是 `Function` 对象的实例，有自己的属性和方法，而函数名是指向函数对象的引用。

### 定义函数

函数通常以函数声明和函数表达式的形式来定义。

#### 函数声明

函数声明以 `function` 关键字开头来创建指定名称的函数。它作为一个语句独立使用。

函数声明由 `function` 关键字、函数名称、函数参数列表和函数体组成。并且函数后面不需要分号。

``` js
function name([param[, param[, ... param]]]) { statements }
```

函数参数列表由圆括号包裹着并由逗号分隔的零个、一个或多个参数组成。

函数体由花括号包裹的零或多条调用函数要执行的语句组成。在函数体中，`return` 语句会终止函数的执行并将值返回给函数调用者，如果 `return` 关键字后面没有表达式或者值则会导致函数返回 `undefined`。如果函数没有 `return` 语句来指定返回值，则默认返回 `undefined`。

``` js
function sum(x, y) {
  return x + y;
}
```

函数声明的特点在于**函数声明提升**，也就是函数可以在声明之前使用，这种行为我们将在浏览器工作原理中详细介绍。

#### 函数表达式

函数表达式通过 `function` 关键字在一个表达式中创建函数。它总是作为其他语句的一部分。例如作为值赋值给变量，作为函数参数传递等。

函数表达式由 `function` 关键字、可选的函数名称、函数参数列表和函数体组成。并且函数后面有一个可选的分号。

``` js
let function_expression = function [name]([param1[, param2[, ..., paramN]]]) {
  statements
};
```

如果在函数表达式中有函数名称，则表示具名函数表达式，这个函数名称只是函数体中的一个本地变量，可用于在函数内部引用，并且便于在错误堆栈中跟踪，更容易调试。

```js
let sum = function namedSum(x, y) {
  return x + y;
};
```

如果函数表达式省略了函数名称，则该函数是一个**匿名函数**（anonymous function）。

```js
let sum = function(x, y) {
  return x + y;
};
```

**立即调用函数表达式**（Immediately Invoked Function Expression，简称 IIFE）可以让一个只使用一次的函数在定义后立即执行。

``` js
(function() {
  // statements
})();
```

如上代码所示，IIFE 的第一部分是由括号包裹的函数表达式，第二部分则是调用函数的括号。因为语法规定以 `function` 关键字开头的是函数声明，而使用括号包裹会被解释为函数表达式。

IIEF 常用于模拟模块化和模拟块级作用域，这些应用将会在后面的文章中讨论。

### 函数参数

函数参数可细分为形参（parameter）和实参（argument）。他们的区别如下：

- 形参是函数定义时声明的参数，可以在函数体内使用，由调用函数的实参初始化。
- 实参是函数调用时实际传递给函数的值。

当函数调用时，实参会以形参在函数定义的顺序依次赋值给形参。

在函数调用时并不会限制可传递参数的数量。如果调用函数时传递的实参数量少于声明的形参数量，那么多余的形参会被初始化为 `undefined`。而如果传递的实参数量超过形参数量，则会对额外的实参求值，但无法通过形参名称访问这些值。

``` js
function foo(x, y) {
  return [x, y];
}

console.log(foo('a'));           // => ['a', undefined]
console.log(foo('a', 'b'));      // => ['a', 'b']
console.log(foo('a', 'b', 'c')); // => ['a', 'b']
```

不过在调用函数执行函数体期间，我们可以通过 `arguments` 对象来访问调用函数时所传递的所有实参。

#### arguments 对象

`arguments` 对象是一个类数组对象，它包含函数调用时传递给函数的所有实参。我们可以像数组一样通过索引访问每个实参，并通过 `length` 属性获取传递的实参数量。

``` js
function sum() {
  let sum = 0;
  for (let i = 0; i < arguments.length; i++) {
    sum += arguments[i];
  }
  return sum;
}
console.log(sum(1, 2, 3)); // => 6
console.log(sum(1, 2, 3, 4, 5)); // => 15
```

我们可以通过 `arguments` 对象来实现函数重载和接收参数数量可变的可变函数。

在非严格模式下，`arguments` 对象和形参是同步的。对 `arguments` 对象属性的更改，同时也会影响对应形参的值。反之亦然，修改形参的值，同时也会影响 `arguments` 对象。这样会影响代码的可读性。

非严格模式下限制了 `arguments` 对象和形参之间的同步。

#### 默认参数

当函数调用时未提供实参或者传入 `undefined`，形参的默认值是 `undefined`，在某些情况下我们需要为形参设置不同的默认值。

在 ES6 以前，我们需要在函数体中手动检查某个参数是否为 `undefined`，如果是则设置一个不同的默认值。

``` js
function numberToString(number, radix) {
  radix = typeof radix !== 'undefined' ? radix : 10;
  return number.toString(radix);
}
console.log(numberToString(24));    // => '24'
console.log(numberToString(24, 2)); // => '11000'
```

以上函数将数值转换为不同进制的字符串，如果未提供第二个参数，则使用默认的十进制基数。

然而这种方式会让代码变得冗长，ES6 的默认参数简化了为形参提供默认值的方式，只需在需要设置默认值的形参后面加上 `=` 号，并指定默认值即可。

``` js
function numberToString(number, radix = 10) {
  return number.toString(radix);
}
console.log(numberToString(24));    // => '24'
console.log(numberToString(24, 2)); // => '11000'
```

因为默认参数是按照顺序依次从左往右初始化的，所以前面定义的默认参数不能引用后面定义的形参。

#### 收集参数

收集参数的设计初衷是为了代替 [`arguments`](#arguments-对象) 对象，从而实现参数数量可变的可变函数。

在 ES6 中，我们可以在形参前面使用扩展操作符（`...`） 将不确定数量的实参收集到一个以形参命名的数组中。

``` js
function sum(...args) {
  let sum = 0;
  for (let i = 0; i < args.length; i++) {
    sum += args[i];
  }
  return sum;
}
console.log(sum(1, 2, 3)); // => 6
```

如果收集参数前面有命名参数，则只会收集其余参数。如果命名参数后面没有多余的参数，则会得到一个空数组。

在函数定义中，只能声明一个收集参数并且必须作为最后一个参数。

#### 扩展参数

在 ES6 以前，当某个函数调用的参数是动态的参数列表时，我们通常需要手动处理或使用 `apply()` 方法来处理，这样会让代码变得复杂且难以理解。

``` js
let values = [3, 1, 2, 5, 4];
console.log(Math.max.apply(null, values)); // => 5
```

如上例，`Math.max()` 方法可以接收任意数量的参数并返回最大的那个。由于不允许传入一个数组，所以我们使用 `apply()` 方法将数组中的每个元素作为函数的参数传递给 `Math.max()` 方法。

而在 ES6 中，我们可以将一个可迭代对象通过扩展操作符（`...`） 展开为多个实参并在函数调用时依次传给对应位置的形参。从而让代码看起来简洁且易懂。

``` js
let values = [3, 1, 2, 5, 4];
console.log(Math.max(...values)); // => 5
```

扩展操作符可以在函数调用时的任意位置多次使用。

``` js
Math.max(...[3, 1], 2, ...[5, 4]); // => 5
```

#### 解构参数

在函数参数传递过程中，如果传递的是一个数组或对象实参，可以通过解构来提取数组的元素和对象的属性来作为函数的形参，这样更清晰的知道函数所需要的参数。

``` js
function printPerson({ name, age }) {
  console.log(name);
  console.log(age);
}
printPerson({ name: 'front-boy', age: 27 });
```

不过，如果调用函数时没有传递参数会导致程序抛错。

``` js
printPerson(); // => TypeError: Cannot destructure property 'name' of 'undefined' as it is undefined.
```

因为解构赋值表达式的右值不能为空值，所以可以使用一个 `{}` 的默认参数来解决该问题。并且可以使用默认参数来为解构的形参提供默认值。

``` js
function printPerson({ name = 'default-boy', age = 0 } = {}) {
  console.log(name);
  console.log(age);
}
printPerson();
```

### 调用函数

定义函数仅仅是赋予函数名称并明确函数调用时做什么，而调用函数则会传递参数并执行函数。

#### this 关键字

`this` 关键字表示函数在作为方法被调用时的上下文对象。在 ES6 以前，每个函数都有一个隐式的 `this` 形参，在函数调用时会动态隐式传递参数。在函数内部，因为 `this` 值取决于函数的调用方式，所以相同的 `this` 值在不同的调用方式下可能具有不同的含义。

``` js
function showThis() {
  console.log(this);
}
const o = {
  showThis: showThis
}
showThis();   // => globalThis
o.showThis(); // => o
```

我们可以通过以下四种方式调用函数：

#### 独立函数调用

在 ES5 以前，直接调用独立函数的行为都会传入 `null` 作为隐式 `this` 参数，并且所有函数在被调用时，都会把值为 `null` 的 `this` 替换为全局对象（`globalThis`）。

::: tip
将独立函数的 `this` 值设置为 `globalThis` 的初衷是为了统一处理把构造函数和方法当成独立函数调用时的 `this` 值。这样的好处在于提供了一种简单且灵活的方式来访问 `globalThis` 上的变量和函数。

但在早期 JavaScript 实现中，由于全局函数当做局部变量被调用时在不同实现的行为不一致，所以在早期规范中规定以上述方式调用函数的 `this` 值会设置为 `globalThis`。
:::

但是这种行为在存在两个问题：

其一，访问 `globalThis` 会导致意外的副作用和安全性问题。所以在 ES5 中，严格模式下的函数不再使用 `globalThis` 替换实际的 `this` 值，而是使用 `undefined` 屏蔽对 `globalThis` 的访问，从而避免了相关的问题。

``` js
function foo() {
  console.log(this);
}
foo(); // => globalThis

function foo() {
  'use strict';
  console.log(this);
}
foo(); // => undefined
```

其二，将局部函数的 `this` 值设置为 `globalThis` 是不合理的。这种方式虽然保持了 `this` 值的一致性，但却容易让人产生疑惑。

``` js
const obj = {
  outerFn: function() {
    console.log(this); // => obj

    function innerFn() {
      console.log(this); // => globalThis
    }
    innerFn();
  }
};
obj.outerFn();
```

从上面这段代码我们可以发现，内部函数的 `this` 值并不是预期的使用外层的 `obj`，而是 `globalThis`。

如果要实现预期的效果，可以在 `outerFn` 中声明一个变量 `self` 来保存 `this` 值，然后再在 `innerFn` 中使用 `self`。

``` js
const obj = {
  outerFn: function() {
    console.log(this); // => obj

    let self = this;
    function innerFn() {
      console.log(self); // => obj
    }
    innerFn();
  }
};
obj.outerFn();
```

ES6 引入了[箭头函数](#箭头函数)可以让我们轻松在 `innerFn` 中引用 `outerFn` 中的 `this` 值。

``` js
const obj = {
  outerFn: function() {
    console.log(this); // => obj

    const innerFn = () => {
      console.log(this); // => obj
    }
    innerFn();
  }
};
obj.outerFn();
```

#### 作为方法调用

当一个对象属性是一个函数时，可以作为对象的方法被调用。方法调用时会隐式传递调用该方法的（最后一个）对象作为 `this` 值，这样在方法内部就可以通过 `this` 关键字访问动态绑定的对象。

``` js
const calculator = {
  operand1: 1,
  operand2: 2,
  add: function() {
    return this.operand1 + this.operand2;
  }
};
console.log(calculator.add()); // => 3
```

#### 通过 `call()`/`apply()` 间接调用

`call()`/`apply()` 可以显示的传递任意对象作为函数的 `this` 值，使得函数可以被不同对象调用，从而提高代码的复用性和可维护性。

``` js
function sayName() {
  return 'Hello, ' + this.name;
}

const person1 = { name: 'front-boy' };
const person2 = { name: 'old-boy' };
console.log(sayName.call(person1));  // => Hello, front-boy
console.log(sayName.apply(person2)); // => Hello, old-boy
```

关于 `call()`/`apply()`，我们将会在[函数的方法](#函数的方法)中详细讲解。

#### 作为构造函数调用

在函数调用之前使用 `new` 操作符即可作为构造函数调用。这种方式并不会传递 `this` 值，而是由 `new` 操作符自动设置为对象实例。

::: tip
关于使用 `new` 操作符调用函数的原理，请前往 JavaScript 面向对象中的[早期的对象模型](./object-oriented-programing.md#早期的对象模型)中查看。
:::

### 函数的方法

JavaScript 中的函数是对象，可以像其他对象一样拥有自己的方法。

#### `call()` 和 `apply()` 方法

`call()` 和 `apply()` 方法都是以指定 `this` 值和可选参数来间接调用函数。

``` js
function sum(num1, num2) {
  return num1 + num2;
}
console.log(sum.call(null, 1, 2)); // => 3
console.log(sum.apply(null, [1, 2])); // => 3
```

`call()` 和 `apply()` 方法的第一参数都是显式指定的 `this` 值。不同之处在于：

`call()` 方法以逗号分隔的参数列表方式传递参数。

根据 `call()` 方法的行为，我们可以对其进行模拟实现：

``` js
Function.prototype.callPolyfill = function(context) {
  context = context || globalThis;
  context.fn = this;

  var result;

  if (arguments.length > 1) {
    var args = [];
    for (var i = 1; i < arguments.length; i++) {
      args.push('arguments[' + i + ']');
    }
    result = eval('context.fn(' + args + ')');
  } else {
    result = context.fn();
  }

  delete context.fn;
  return result;
}
```

而 `apply()` 方法以一个数组或类数组对象的参数方式传递参数。

根据 `apply()` 方法的行为，我们可以对其进行模拟实现：

``` js
Function.prototype.applyPolyfill = function(context, argsArray) {
  context = context || globalThis;
  argsArray = argsArray || [];

  context.fn = this;

  var result;
  if (argsArray.length > 0) {
    var args = [];
    for (var i = 0; i < argsArray.length; i++) {
      args.push('argsArray[' + i + ']');
    }
    result = eval('context.fn(' + args + ')');
  } else {
    result = context.fn();
  }

  delete context.fn;
  return result;
}
```

::: tip
`eval()` 函数仅用于在模拟代码中动态执行字符串，请勿在生产环境使用。
:::

#### `bind()` 方法

`bind()` 方法会创建一个新函数，当调用新函数时，它会调用原始函数并将其 `this` 值设置为指定的值，同时，还可以传递一系列指定的参数。

``` js
function sum(num1, num2) {
  return num1 + num2;
}
let succ = sum.bind(null, 1);
console.log(succ(2)); // => 3
```

根据 `bind()` 方法的行为，我们可以对其进行模拟实现：

``` js
Function.prototype.bindPolyfill = function(context) {
  var originalFn = this;
  var bindArgs = Array.prototype.slice.call(arguments, 1);

  return function() {
    var callArgs = Array.prototype.slice.call(arguments);
    return originalFn.apply(context, bindArgs.concat(callArgs));
  };
}
```

### 函数类型

除了上面使用函数声明和函数表达式定义的普通函数外，还有一些专用函数。

#### 箭头函数

ES6 引入了箭头函数来让以更简洁的方式来定义函数表达式，同时能够减少错误，让 JavaScript 引擎更好的优化箭头函数的执行过程。

箭头函数的语法由参数列表、胖箭头（`=>`）和函数体组成。

``` js
(param1, paramN) => {
  statements
}
```

当参数列表只有一个简单参数时，可以省略圆括号，否则圆括号是必须的；

有了胖箭头表示函数表达式，所以不需要 `function` 关键字；

当函数体只有一个表达式时，可以省略花括号和 `return` 关键字，函数会隐式的返回表达式的值，如果表达式是一个对象字面量，需要使用圆括号包裹，用于让引擎区分这是一个对象字面量而不是函数体。如果函数体中有两条或两条以上语句，需要使用花括号包裹，并在需要返回值的情况显式地定义一个返回值。

为了确保函数的行为符合预期，箭头函数增加了很多限制：

- **没有 `this` 值**：箭头函数没有自己的 `this` 值，而是根据箭头函数定义时的词法作用域来决定，从而让箭头函数内的 `this` 值不会根据函数调用的上下文而改变；因为没有 `this` 值，所以箭头函数不能用作方法。因为箭头函数的 `this` 值取决于定义时的词法作用域，使用 `call()`、`apply()`、`bind()` 等方法无法改变 `this` 值。

- **没有 `arguments` 对象**：箭头函数没有自己的 `arguments` 对象，不过箭头函数可以访问外层普通函数的 `arguments` 对象。如果需要使用参数列表，收集参数是一个更好地选择。

- **不能用作构造函数**：使用 `new` 操作符调用箭头函数会导致程序抛出错误。无法使用 `new.target` 和 `super` 关键字。箭头函数也没有 `prototype` 属性。

- **不能用作生成器函数**：在箭头函数中不能使用 `yield` 关键字。

#### 类

JavaScript 中的类实际上是一种特殊函数。可以在[基于类的面向对象](./object-oriented-programing.md/#基于类的面向对象)查看关于类的更多细节。

#### 生成器函数

生成器函数将在集合中详细介绍。

#### 异步函数

异步函数将在异步编程中详细介绍。

## 闭包

## 函数式编程

### 高阶函数

## 参考

- [MDN-JavaScript](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript)
- 《JavaScript 高级程序设计》（第 4 版）
- 《JavaScript 权威指南》（原书第 7 版）
- 《JavaScript 语言精髓与编程实战》（第 3 版）
- [《JavaScript for impatient programmers (ES1–ES2022) 》](https://exploringjs.com/impatient-js/ch_callables.html)
- 《JavaScript 编程精解》（原书第 3 版）
- 《深入理解 ES6》
- 《深入理解 JavaScript 特性》
- [《JavaScript 二十年》](https://github.com/doodlewind/jshistory-cn)
- 《你不知道的 JavaScript》上卷
- 《JavaScript 忍者秘籍》(第 2 版)
- 《JavaScript 悟道》
- [重学前端](https://time.geekbang.org/column/article/78884)
- [JavaScript 的 this 原理是什么？](https://www.zhihu.com/question/353757734/answer/2935071349)