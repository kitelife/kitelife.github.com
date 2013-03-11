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

[JSLint](http://www.jslint.com/)是Douglas Crockford编写的一个调试器。简单地将你的脚本拷贝进去，它就会快速地扫描你的代码中任何明显的问题和错误。

>
>"JSLint获取一份JavaScript源码，然后扫描代码。如果发现问题，就会返回一条信息描述这个问题以及这个问题在源码中的大致位置。问题虽然经常是语法错误，却不一定是。JSLint也会查看一些风格习惯以及结构问题。它并不证明你的代码是否正确，只是提供另外的一双眼睛来帮助发现问题。"---JSLint文档
>

在结束脚本代码的编写之前，对其执行一次JSLint，能够保证你不会犯一些愚蠢的错误。

###5.将脚本置于页面的底部

这条提示在本系列前面的文章中也推荐过。因为它在此处也非常合适（As it's highly appropriate though），所有我将那段信息直接粘贴在这里。

<img src="/assets/pics/javascriptButton.png" alt="javascriptButton.png">

记住---这条最佳实践的主要目标是尽可能快速地为用户加载页面。当加载一个脚本时，浏览器直到整个脚本文件全部加载完毕才能继续。因此，用户必须等上更长的时间才能注意到任何的进度。

如果JS文件的目的仅仅是增加功能---例如，在点击某个按钮后---那么就将那些文件放在底部，body结束标签之前吧。这绝对是一个最佳实践。

**更好的做法**

{% highlight js %}
<p>And now you know my favorite kinds of corn. </p>
<script type="text/javascript" src="path/to/file.js"></script>
<script type="text/javascript" src="path/to/anotherFile.js"></script>
</body>
</html>
{% endhighlight %}

###在For语句之外声明变量

当执行一个冗长的"for"语句之时，仅仅让解释引擎做必须干的活吧。例如：

**糟糕的做法**

{% highlight js %}
for(var i = 0; i < someArray.length; i++) {
    var container = document.getElementById('container');
    container.innerHtml += 'my number: ' + i;
    console.log(i);
}
{% endhighlight %}

注意上面代码片段中的每次迭代都需要检查数组的长度，并且每次都要遍历DOM树找到"container"元素---效率多低啊！

**更好的做法**

{% highlight js %}
var container = document.getElementById('container');
for(var i = 0, len = someArray.length; i < len; i++) {
    container.innerHtml += 'my number: ' + i;
    console.log(i);
}
{% endhighlight %}

感谢有位朋友留下评论展示如何进一步优化上面的代码块。

###7.构建字符串的最快方式


