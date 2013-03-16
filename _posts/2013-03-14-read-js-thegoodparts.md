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

除了声明时定义的形式参数，每个函数在调用之时会接收两个附加的参数：this和arguments。参数this的值取决于调用的模式。在JavaScript中一共有四种调用模式：方法调用模式、函数调用模式、构造器调用模式和apply调用模式。

JavaScript中，当实参（arguments）的个数与形参（parameters）的个数不匹配时不会导致运行时错误。如果实参值过多时，超出的参数值将被忽略。如果实参值过少，缺失的值将会被替换为undefined。对参数值不会进行类型检查：任何类型的值都可以被传递给参数。

arguments并不是一个真正的数组。它只是一个“类似数组(array-like)”的对象。arguments拥有一个length属性，但它缺少所有的数组方法。

在函数调用模式中，this被绑定到全局对象。

一个函数总是会返回一个值。如果没有指定返回值，则返回undefined。

如果函数以在前面加上new前缀的方式来调用(即构造函数)，且返回值不是一个对象，则返回this（该新对象）。

---

JavaScript提供的异常处理机制中，一个try语句只会有一个将捕获所有异常的catch代码块。如果你的处理手段取决于异常的类型，那么异常处理器必须检查异常对象的name属性以确定异常的类型。

---

对于变量声明，由于JavaScript缺少块级作用域，所以最好的做法是在函数体的顶部声明函数中可能用到的所有变量。

---

可以通过闭包实现对象的私有属性：

{% highlight js %}
var myObject = function () {
    var value = 0;
    return {
        increment: function (inc) {
            value += typeof inc === 'number' ? inc : 1;
        },
        getValue: function () {
            return value;
        }
    }
}();        //注意这里调用了匿名函数
{% endhighlight %}

---

模块是一个提供接口却隐藏状态与实现的函数或对象。通过使用函数去产生模块，几乎可以完全摒弃全局变量的使用。

{% highlight js %}
String.prototype.method = function (name, func) {
    this.prototype[name] = func;
    return this;
};

String.method('deentityify', function () {
    // 字符实体表。映射字符实体的名字到对应的字符。
    var entity = {
        quot: '"',
        lt: '<',
        gt: '>'
    };
    // 返回deentityify方法
    return function () {
    // 这才是deentityify方法。它调用字符串的replace的方法，
    // 查找‘&’开头和‘;’结束的子字符串。如果这些字符可以在字符实体表中找到，
    // 那么就将该字符实体替换为映射表中的值。
        return this.replace(/&([^&;]+);/g,
            function (a, b){
                var r = entity[b];
                return typeof r === 'string' ? r : a;
            }
        );
    };
}());   // 注意这里，匿名函数已被调用
{% endhighlight %}

模块模式利用了函数作用域和闭包来创建绑定对象与私有成员的关联，在上述例子中，只有deentityify方法有权访问字符实体表这个数据对象。

使用模块模式就可以摒弃全局变量的使用。它促进了信息隐藏和其他优秀的设计实践。

---

有些方法没有返回值。例如，一些设置或修改对象的某个状态却不返回任何值的方法就是典型的例子。如果让这些方法返回this而不是undefined，就可以启用级联。在一个级联中，可以在单独一条的语句中依次调用同一个对象的很多方法。

---

套用(curry)允许将函数与传递给它的参数相结合去产生一个新的函数。

curry方法通过创建一个保存着原始函数和被套用的参数的闭包来工作。它返回另一个函数，该函数被调用时，会返回调用原始函数的结果，并传递调用curry时的参数加上当前调用函数的所有参数。

{% highlight js %}
Function.prototype.method = function (name, func) {
    this.prototype[name] = func;
    return this;
};
Function.method('curry', function () {
    // 由于arguments并非真正的数组，所以需要应用slice方法来构造常规的数组
    var slice = Array.prototype.slice,
        args = slice.apply(arguments),
        that = this;
    return function () {
        return that.apply(null, args.concat(slice.apply(arguments)));
    };
});
{% endhighlight %}


##第5章：继承

当一个函数对象被创建时，Function构造器产生的函数对象会运行类似这样的一些代码：

{% highlight js %}
this.prototype = {constructor: this};
{% endhighlight %}

新函数对象被赋予一个prototype属性，其值包含一个constructor属性且属性值为该新函数对象。该prototype对象是存放继承特征的地方。因为JavaScript语言没有提供一种方法去确定哪个函数是打算用来作构造器的，所以每个函数都会得到一个prototype对象。constructor属性没什么用，重要的是prototype对象。

---

**函数化构造器实现私有保护**：

{% highlight js %}
var people = function (spec) {
    var that = {
        prefix: 'People: '
    };
    that.get_name = function () {
        return this.prefix + spec.name;
    };
    that.says = function () {
        return this.prefix + (spec.saying || '');
    };
    return that;
};
{% endhighlight %}


##第6章：数组

JavaScript中，每个数组都有一个length属性。如果你用大于或等于当前length的数字作为下标来存储一个元素，那么length值会被增大以容纳新元素，不会发生数组越界错误。

length属性的值是这个数组的最大整数属性名加上1.它不一定等于数组里的属性的个数。

你可以直接设置length的值。设置更大的length不会给数组分配更多的空间。而把length设小将导致所有下标大于等于新length的属性被删除。

---

由于JavaScript的数组其实就是对象，所以delete运算符可以用来从数组中移除元素。不幸的是，这样会在数组中留下一个空洞。这是因为排在被删除元素之后的元素保留着它们最初的属性。JavaScript的数组有一个splice方法，可以删除一些元素并将它们替换为其他的元素。

{% highlight js %}
numbers = ['zero', 'one', 'two', 'shi', 'go'];

delete numbers[2];
// 现在numbers为['zero', 'one', undefined, 'shi', 'go']

numbers.splice(2, 1);
// 现在numbers为['zero', 'one', 'shi', 'go']
{% endhighlight %}


