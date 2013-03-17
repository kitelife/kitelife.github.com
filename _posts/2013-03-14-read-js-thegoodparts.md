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

---

在JavaScript编程中，一个常见的错误是在必须使用数组时使用了对象，或者在必须使用对象时使用了数组。其实规则很简单：当属性名是小而连续的整数时，应该使用数组。否则，使用对象。

由于对数组使用`typeof`的结果为`object`，所以需要其他方法来判别一个变量是否为数组：

{% highlight js %}
var is_array = function (value) {
    return Object.prototype.toString.apply(value) === '[object Array]';
};
{% endhighlight %}

##第7章：正则表达式

一个*正则表达式分支*包含一个或多个*正则表达式序列*。这些序列被|（竖线）字符分隔。如果这些序列中的任何一项符合匹配条件，那么这个选择就被匹配。它尝试按顺序依次匹配这些序列项。所以：

{% highlight js %}
"into".match(/in|int/)
{% endhighlight %}

会在into中匹配，但它不会匹配int，因为in已被成功匹配了。

一个*正则表达式序列*包含一个或多个*正则表达式因子*。每个因子能选择是否跟随一个量词，这个量词决定着这个因子被允许出现的次数。如果没有指定这个量词，那么该因子只会被匹配一次。

一个*正则表达式因子*可以是一个字符、一个由圆括号包围的组、一个字符类，或者是一个转义序列。除了控制字符和特殊字符以外，所有的字符都会被按照字面处理：

`\ / [ ] ( ) { } ? + * | . ^ $`

如果希望上面列出的字符按字面去匹配，那么必须要用一个\前缀来进行转义。

一个未被转义的`.`会匹配除行结束符以外的任何字符。

---

正则表达式分组共有4种：

1.
捕获型：一个捕获型分组是一个被包围在圆括号中的正则表达式分支。任何匹配这个分组的字符都会被捕获。每个捕获型分组都被指定了一个数字。在正则表达式中第1个捕获`(`的是分组1，第2个捕获`(`的是分组2。

2.
非捕获型：非捕获型分组有一个`(?:`前缀。非捕获型分组仅做简单的匹配，并不会捕获所匹配的文本。这会带来微弱的性能优势。非捕获型分组不会干扰捕获型分组的编号。

3.
向前正向匹配（Positive lookahead）：向前正向匹配分组有一个`(?=`前缀。它类似于非捕获型分组，但在这个组匹配后，文本会倒回到它开始的地方，实际上并不匹配任何东西。这不是一个好的特性。（什么意思？）

4.
向前负向匹配（Negative lookahead）：向前负向匹配分组有一个`(?!`前缀。类似于向前正向匹配分组，但只有当它匹配失败时它才继续向前进行匹配。这不是一个好的特性。


##第8章：方法

###Array

**array.concat(item...)**方法会产生一个新数组，它包含一份array的浅复制（shallow copy）并把一个或多个参数item附加在其后。如果参数item是一个数组，那么它的每个元素会被分别添加。

{% highlight js %}
var a = ['a', 'b', 'c'];
var b = ['x', 'y', 'z'];
var c = a.concat(b, true);
// c为['a', 'b', 'c', 'x', 'y', 'z', true]
{% endhighlight %}

**array.join(separator)**方法把一个array构造成一个字符串。目前在大多数情况下，对字符串连接建议首选使用+运算符，因为相比join方法，+运算符的性能更高。

**array.pop()**，其可以这样实现：

{% highlight js %}
Array.method('pop', function () {
    return this.splice(this.length - 1, 1)[0];
});
{% endhighlight %}

**array.push(item...)**与concat方法不同的是，该方法会修改array。可以这样实现：

{% highlight js %}
Array.method('push', function () {
    this.splice.apply(
        this,
        [this.length, 0].
            concat(Array.prototype.slice.apply(arguments)));
    return this.length;
});
{% endhighlight %}

**array.reverse()**方法反转array里的元素的顺序，并返回array本身：

{% highlight js %}
var a = ['a', 'b', 'c'];
var b = a.reverse();
// a和b都是['c', 'b', 'a']
{% endhighlight %}

**array.shift()**方法移除数组array中的第1个元素并返回该元素。如果数组array为空，则会返回undefined。shift操作通常要比pop慢得多，可以这样实现：

{% highlight js %}
Array.method('shift', function () {
    return this.splice(0, 1)[0];
});
{% endhighlight %}

**array.slice(start, end)**方法对array中的一段做浅复制。

**array.sort(comparefn)**方法对array中的内容进行排序。默认比较函数把要排序的元素都视为字符串。可以使用自己的比较函数来替换默认的比较函数。你的比较函数应该接受两个参数，并且如果这两个参数相等则返回0，如果第1个参数应该排列在前面，则返回一个负数，如果第2个参数应该排列在前面，则返回一个正数。

**array.splice(start, deleteCount, item...)**方法从array中移除一个或多个元素，并用新的item替换它们。其返回一个包含被移除元素的数组。

**array.unshift(item...)**方法像push方法一样，用于把元素添加到数组中，但它是把item插入到array的开始部分而不是尾部，返回array的新的length。

###Function

**function.apply(thisArg, argArray)**方法调用function，传递一个会被绑定到this上的对象和一个可选的数组作为参数。

###Number

**number.toFixed(fractionDigits)**方法把number转换成一个十进制数形式的字符串。可选参数fractionDigits控制其小数点后的数字位数，必须在0～20之间，默认为0。**number.toPrecision(precision)**方法的功能与其几乎相同，除了precision的值为0~21之间。

**number.toString(radix)**方法把number转换成为一个字符串。可选参数radix控制基数，默认为10。

###String

**string.charAt(pos)**方法返回在string中pos位置处的字符。

**string.charCodeAt(pos)**方法同charAt一样，只不过返回的不是一个字符串，而是以整数形式表死的在string中pos位置处的字符的字符码位。

**string.indexOf(searchString, position)**方法在string内查找另一个字符串searchString。如果找到，返回第一个匹配字符的位置，否则返回-1。可选参数position可设置从string的某个指定位置开始超找。

**string.lastIndexOf(searchString, position)**方法和indexOf方法类似，只不过它是从该字符串的末尾开始查找而不是从开头。

**string.search(regexp)**方法和indexOf方法类似，只是它接受一个正则表达式对象作为参数而不是一个字符串。

##第9章：代码风格

优秀的程序拥有一个前瞻性的结构，它会预见到未来所需要的可能修改，但不会让其成为过度的负担。优秀的程序也有一种清晰的表达方式。如果一个程序被表达得很好，那么我们就能更加容易地去理解它，以便成功地修改或修复它。

通过在一个清晰且始终如一的风格下编写，你的程序会变得易于阅读。


##附录A：糟粕

**全局变量**

有三种方式定义全局变量。第一种是脱离任何函数安排一个var语句：

{% highlight js %}
var foo = value;
{% endhighlight %}

第二种是直接添加一个属性到全局对象上。全局对象是所有全局变量的容器。在Web浏览器里，全局对象名为window：

{% highlight js %}
window.foo = value;
{% endhighlight %}

第三种是直接使用未经声明的变量。这被称为隐式的全局变量：

{% highlight js %}
foo = value;
{% endhighlight %}

这本来是为了方便初学者而有意让变量在使用前无须声明。JavaScript的策略是让那些忘记预先声明的变量成为全局变量，这导致查找bug非常困难。

**作用域**

由于JavaScript没有块级作用域，所以最好是在每个函数的开头部分声明所有变量。

**自动插入分号**

JavaScript有一个机制，它试图通过自动插入分号来修正有缺损的程序。千万不要依靠它，它可能会掩盖更为严重的错误。

**parseInt**

parseInt是一个将字符串转换为整数的函数。它在遇到非数字时停止解析。如果该字符串的第一个字符是0,那么该字符串将被基于八进制而不是十进制来求值。幸运的是，parseInt可以接受一个基数作为参数。我建议你总是提供这个基数参数。

**+**

+运算符可以用于加法运算或字符串连接。但究竟会如何执行取决于其参数的类型。如果其中一个运算数是一个空字符串，它会把另一个运算数转换成字符串并返回。如果两个运算数都是数字，则返回两者之和。否则，它把两个运算数都转换为字符串并连接起来。

**对象**

JavaScript的对象永远不会有真的空对象，因为它们可以从原型链中取得成员元素。

##附录B：鸡肋

**==**

建议永远不要使用`==`和`!=`。相反，请始终使用`===`和`!==`。

**with语句**

**eval**

**function语句对比函数表达式**

JavaScript既有function语句（*函数声明*），同时也有函数表达式（匿名函数？包含赋值过程么？）。令人困惑的是两者看起来好像就是相同的。

（*区分：函数声明所有代码被执行之前运行。函数表达式仅当解释器到达代码时候才运行。*）

function语句在解析时会发生被提升的情况。这意味着不管function语句被防治在哪里，它都会被移动到被定义时所在作用域的顶层。这放宽了函数必须先声明后使用的要求，而我认为这会导致混乱。在if语句中使用function语句也是被禁止的。结果表明大多数的浏览器都允许在if语句里使用function语句，但它们在解析时的处理上各不相同，从而造成了可移植性的问题。

一个语句不能以一个函数表达式开头，因为官方的语法假定以单词function开头的语句是一个function语句（*这里说得我有点糊涂了啊！*）。解决方法就是把函数表达式括在一个圆括号之中：

{% highlight js %}
(function () {
    var hidden_variable;
    // 这个函数可能对环境有一些影响，但不会引入新的全局变量。
})();
{% endhighlight %}

**void**

在很多语言中，void是一种类型，表示没有值。而在JavaScript中，void是一个运算符，接受一个运算数并返回undefined。这没什么用。

##附录C：JSLint

（*待阅读*）

##附录E：JSON

JSON有6种类型的值：对象、数组、字符串、数字、布尔值（true和false）和特殊值null。空白（空格符、制表符、回车符和换行符）可被插到任何值的前后，从而使得JSON文本更容易被人阅读。为了减少传输和存储的成本，空白可以被省略。

JSON对象是一个容纳“名/值”对的无序集合。

JSON数组是一个值的有序序列。其值可以是任何类型的JSON值，包括数组和对象。

JSON字符串要被包围在一对双引号之间。\字符被用于转义。

JSON数字与JavaScript的数字相似。整数的首位不允许为0,因为一些语言用它来标示八进制。这种基数的混乱在数据交换格式中是不可取的。数字可以是整数、实数或科学计数。

---

JSON特别易于用在Web应用中，因为JSON就是JavaScript。使用eval函数可以把一段JSON文本转化成一个有用的数据结构：

{% highlight js %}
var myData = eval('(' + myJSONText + ')');
{% endhighlight %}

在JavaScript的语法中，表达式语句（Expression Statement）不允许以左花括号“{”开始，因为那会与块语句（Block Statements）产生混淆，所以在使用eval()解析JSON文本时，为了解决此问题，可以将JSON文本套上一对圆括号。圆括号早此处作为表达式的分组运算符，能对包围在其中的表达式进行求值。

但使用eval来解析JSON文本可能会存在安全问题，所以应该使用JSON.parse方法来替代eval。如果文本中包含任何危险数据，JSON.parse将会抛出一个异常。
