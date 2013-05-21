---
layout: post
title: Google JavaScript风格指南
tags: [翻译, JavaScript]
---

原文：[Google JavaScript Style Guide](http://google-styleguide.googlecode.com/svn/trunk/javascriptguide.xml)

译者：[youngsterxyf](https://github.com/youngsterxyf)

版本 2.72

### 背景

JavaScript是许多Google开源项目使用的一种主要的客户端脚本语言。本风格指南罗列了JavaScript
程序该有和不该有的一些写法。

### JavaScript语言规则

**var**

始终使用`var`进行变量声明。

*理由：*

当你没有指定`var`，变量就会处于全局上下文中，很可能会被错误覆盖已有的变量值。
另外，如果变量没有声明，就很难搞清变量的作用域（例如，可能属于Document或Window对象，
也可能处于局部作用域）。因此请始终使用`var`声明变量。

**常量**

- 使用`NAMES_LIKE_THIS`这样的规则来命名常量。
- 使用`@const`来指明一个不变（不可覆盖）*指针*（变量或属性）。
- 决不要使用关键字`const`，因为IE不支持。

**分号**

始终使用分号。

依赖于隐式插入分号可能会造成一些不易觉察、很难调试的问题，所以不要这么干，你要
相信自己强于解释器。

以下一些地方如果缺失分号会特别危险：

{% highlight js %}
// 1.
MyClass.prototype.myMethod = function() {
  return 42;
}  // No semicolon here.

(function() {
  // Some initialization code wrapped in a function to create a scope for locals.
})();


var x = {
  'i': 1,
  'j': 2
}  // No semicolon here.

// 2.  Trying to do one thing on Internet Explorer and another on Firefox.
// I know you'd never write code like this, but throw me a bone.
[normalVersion, ffVersion][isIE]();


var THINGS_TO_EAT = [apples, oysters, sprayOnCheese]  // No semicolon here.

// 3. conditional execution a la bash
-1 == resultOfOperation() || die();
{% endhighlight %}

*那么会发生什么呢？*

1. JavaScript错误 -
首先返回42的函数以第二个函数作为参数进行调用，然后数字42被“调用”造成一个错误。
2. 你很可能会得到一个运行时的“no such property in
undefined”错误，因为代码尝试调用`x[ffVersion][isIE]()`。（译注：该处是否应为`x[normalVersion,ffVersion][isIE]()`?）
3. `die`会被调用，除非`resultOfOperation()`的返回值为`NaN`，并且`die()`的结果会赋值给`THINGS_TO_EAT`。

*为什么？*

JavaScript要求语句以分号结尾，除非它认为可以安全地推断出分号的存在。在上例代码中就有这样的三处，
一个函数声明或对象或数组字面量被用在一个语句中。闭合括弧不足以指明语句的结束。
如果下一个符号是一个中缀或括弧操作符，JavaScript就决不会结束一条语句。

*释疑：分号与函数*

函数表达式的末尾应包含分号，但函数声明的末尾不用。下例能很好地阐释其区别：

{% highlight js %}
var foo = function() {
    return true;
};  // 这里有分号

function foo() {
    return true;
}   // 这里没有分号
{% endhighlight %}

**嵌套函数**

鼓励使用

嵌套函数会非常有用，例如，创建continuations，以及实现隐藏帮助函数。随意使用它们。

**代码块中的函数声明**

不鼓励使用

不要这么干：

{% highlight js %}
if (x) {
    function foo() {}
}
{% endhightlight %}

## 补充资料

[Google 开源项目风格指南](http://zh-google-styleguide.readthedocs.org/en/latest/)
