---
layout: post
title: 读书笔记：JavaScript语言精粹
tags: [笔记, JavaScript]
---

##第2章：语法

JavaScript提供两种注释形式，一种是用`/* */`包围的注释块，另一种是以`//`为开头的行注释。
建议避免使用`/* */`，而用`//`注释代替它。

---

标识符由一个字母开头，其后可选择性地加上一个或多个字母、数字或下划线。

---

JavaScript只有一个数字类型。它在内部被表示为64位的浮点数。与其他大多数编程语言不同的是，它没有分离出整数类型，所以1和1.0的值相同。

如果一个数字字面量有指数部分，那么这个字面量的值等于e之前的数字与10的e之后数字的次方相乘。

NaN是一个数值，它表示一个不能产生正常结果的运算结果。NaN不等于任何值，包括它自己。可以用函数isNaN(number)检测NaN.

Infinity表示所有大于1.79769313486231570e+308的值。

JavaScript有一个对象Math，它包含一套作用于数字的方法。

---

字符串字面量可以被包在一对单引号或双引号中，它可能包含0个或多个字符。\（反斜杠）是转义字符。JavaScript中的所有字符都是16位的。

JavaScript没有字符类型。要表示一个字符，只需创建仅包含一个字符的字符串即可。

字符串是不可变的。一旦字符串被创建，就永远无法改变它。但可以通过+运算符连接其他字符串来创建一个新字符串。两个包含着完全相同的字符且字符顺序也相同的字符串被认为是相同（===）的字符串。

---

一个编译单元包含一组可执行的语句。在Web浏览器中，每个`<script>`标签提供一个被编译且立即执行的编译单元。因为缺少链接器，JavaScript把它们一起抛到一个公共的全局名字空间中。

当var语句被用在函数内部时，它定义的是这个函数的私有变量。（最佳实践：定义任何变量都使用var）

`for in`语句会枚举一个对象的所有属性名（键名）。通常需要检测`object.hasOwnProperty(variable)`来确定这个属性名是该对象的成员，还是来自于原型链。

##第3章：对象

JavaScript的简单数据类型包括数字、字符串、布尔值（true和false）、null值和undefined值。其他所有的值都是对象。

数字、字符串和布尔值“貌似”对象，因为它们拥有方法，但它们是不可变的。JavaScript中的对象是可变的键控集合（keyed collections）。

对象是属性的容器，其中每个属性都拥有名字和值。属性的名字可以是包括空字符串在内的任意字符串。属性值可以是除undefined值之外的任何值。

---

要检索对象里包含的值，可以采用在`[]`后缀中括住一个字符串表达式的方式。如果字符串表达式是一个字符串字面量，而且它是一个合法的JavaScript标识符且不是保留字，则也可以用`.`表示法代替。优秀考虑使用`.`表示法，因为它更紧凑且可读性更好。

如果你尝试检索一个并不存在的成员属性的值，将返回undefined。

`||`运算符可以用来填充默认值：

{% highlight js %}
var status = flight.status || "unknow";
{% endhighlight %}

尝试从undefined的成员属性中取值将会导致TypeError异常。可以通过`&&`运算符来避免错误。

{% highlight js %}
flight.equipment        // undefined
flight.equipment.model      // throw "TypeError"
flight.equipment && flight.equipment.model  // undefined
{% endhighlight %}

---

对象通过引用来传递。它们永远不会被拷贝：

{% highlight js %}
var x = stooge;
x.nickname = 'Curly';
var nick = stooge.nickname;
// 因为x和stooge是指向同一个对象的引用，所以nick为'Curly'

var a = {}, b = {}, c = {};
// a、b和c每个都引用一个不同的空对象
a = b = c = {};
// a、b和c都引用同一个空对象
{% endhighlight %}

---

每个对象都连接到一个原型对象，并且它可以从中继承属性。所有通过对象字面量创建的对象都连接到`Object.prototype`这个JavaScript中标准的对象。

原型连接在更新时是不起作用的。当对某个对象做出改变时，不会触及该对象的原型。原型连接只有在检索值的时候才被用到。

原型关系是一种动态的关系。如果我们添加一个新的属性到原型中，该属性会立即对所有基于该原型创建的对象可见。

---

使用`for in`枚举一个对象中的所有属性名时，属性名出现的顺序是不确定的。如果想要确保属性以特定的顺序出现，最好的办法就是完全避免使用`for in`语句，而是创建一个数组，在其中以正确的顺序包含属性名。通过使用`for`而不是`for in`，可以得到我们想要的属性。

---

delete运算符可以用来删除对象的属性。它将移除对象中确定包含的属性，但不会触及原型链中的任何对象。

---

最小化使用全局变量的一个方法是在你的应用中只创建唯一一个全局变量：

{% highlight js %}
var MYAPP = {};
{% endhighlight %}

该变量此时变成了你的应用的容器：

{% highlight js %}
MYAPP.stooge = {
    "first-name": "Joe",
    "last-name": "Howard"
};

MYAPP.flight = {
    airline: "Oceanic",
    number: 815,
    departure: {
        IATA: "SYD",
        time: "2004-09-22 14:55",
        city: "Sydney"
    },
    arrival: {
        IATA: "LAX",
        time: "2004-09-23 10:42",
        city: "Los Angeles"
    }
};
{% endhighlight %}

##第4章：函数
