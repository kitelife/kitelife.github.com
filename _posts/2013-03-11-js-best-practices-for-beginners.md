---
layout: post
title: JavaScript初学者应知的24条最佳实践
tags: [JavaScript, 翻译]
---

原文：[24 JavaScript Best Practices for Beginners](http://net.tutsplus.com/tutorials/javascript-ajax/24-javascript-best-practices-for-beginners/)

译者：[youngsterxyf](https://github.com/youngsterxyf)

###1.优先使用===，而不是==

JavaScript使用两种相等性操作符：===|!==和==|!=。通常认为做比较的最佳实践是使用前一组操作符。

>
>"若两个操作数的类型和值相同，那么===比较的结果为真，!==比较的结果为假。" --- JavaScript语言精粹(JavaScript: The Good Parts)
>

然而，如果使用==和!=，当比较不同类型的操作数时，你就会碰到问题啦。在这种情况下，这组操作符会尝试对操作数的值做无用的强制转换。

###2.Eval就是糟糕的代号

对于那些不熟悉JavaScript的人来说，函数"evel"让我们能够JavaScript编译器。我们能够给"eval"传递一个字符串参数来得到该字符串执行的结果。

这不仅会极大地降低你的脚本的性能，也会造成一个巨大的安全隐患，因为这赋予传递进来的纯文本太多的能力。要尽可能地避免eval函数的使用。

###3.不要懒手

技术上来说，你确实可能侥幸地省略多数花括号和分号。大多数浏览器都能够正确地解释如下代码片段：

{% highlight js %}
if(someVariableExists)
    x = false
{% endhighlight %}

然而，再考虑一下这段代码：

{% highlight js %}
if(someVariableExists)
    x = false
    anotherFunctionCall();
{% endhighlight %}

可能会有人认为上一段代码等价于：

{% highlight js %}
if(someVariableExists) {
    x = false;
    anotherFunctionCall();
}
{% endhighlight %}

很不幸，他错了。事实上，它的本意是：

{% highlight js %}
if(someVariableExists)
    x = false;
anotherFunctionCall();
{% endhighlight %}

你应该也注意到了，代码中缩进模仿了花括号的功能。毋庸置疑，这是非常恐怖的做法，无论如何都应该避免。唯一可以省略花括号的时候是在一行式的语句中，但即使这种情况，也是很有争议的。

{% highlight js %}
if(2 + 2 === 4) return 'nicely done';
{% endhighlight %}

**始终要想着以后**

如果以后的某个时候，你需要在这种if语句中增加更多的命令，那该怎么办呢？没法子，你就只能重写这块代码了。处理这个问题的底线是对于省略写法保持谨慎。

###使用JS Lint

