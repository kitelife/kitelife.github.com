---
layout: post
title: 【译文】《PHP之道》之PHP基础知识
tags: [PHP, 翻译]
---

##比较操作符

比较操作符往往是PHP的一个被忽视的方面，这会导致很多意想不到的结果。其中的一个问题源于严格比较（布尔值为整数的比较）。

{% highlight php %}
<?php
$a = 5;     // 5为一个整数

var_dump($a == 5);      // 比较值；返回true
var_dump($a == '5');        // 比较值（忽略类型）；返回true
var_dump($a === 5);         // 比较类型/值（整数 vs. 整数）；返回true
var_dump($a === '5');       // 比较类型/值（整数 vs. 整数）；返回false

/**
  * 严格比较
  */
if (strpos('testing', 'test')) {    // 在位置0找到'test'，0被解释为布尔值'false'
    // code...
}

vs.

if (strpos('testing', 'test') !== false) {  // true，因为做了严格比较（0 !== false）
    // code...
}
{% endhighlight %}

- [比较操作符](http://php.net/manual/en/language.operators.comparison.php)
- [比较列表](http://php.net/manual/en/types.comparisons.php)

##条件语句
###If语句

在函数或类中使用'if/else'之时，有个常见的误解---'else'必须一起使用以声明潜在的结果。然而，如果，结果是定义返回值，则'else'是不需要的，因为'return'会结束函数，使得'else'变得毫无意义。

{% highlight php %}
<?php
function test($a)
{
    if ($a) {
        return true;
    } else {
        return false;
    }
}

vs.

function test($a)
{
    if ($a) {
        return true;
    }
    return false;       // 不需要else分支
}
{% endhighlight %}

- [If语句](http://php.net/manual/en/control-structures.if.php)

###Switch语句

Switch语句是一种避免输入无穷尽的if和elseif的绝妙方式，但需要注意几点：

- Switch语句仅比较值，并不关心类型（等价于'=='）
- 逐个分支地迭代直到找到一个匹配项。如果没找到匹配项，则使用缺省(default)分支（如果定义了）
- 若匹配项的代码体没有'break'语句，则会继续执行接下来的每个分支，直到遇到一个break/return语句
- 在函数内，使用'return'可以减少'break'的使用，因为'return'能够结束函数

{% highlight php %}
<?php
$answer = test(2);      // 'case 2'和'case3'的代码体会得到执行

function test($a)
{
    switch ($a) {
        case 1:
            // code...
            break;      // break用于结束switch语句
        case 2:
            // code...  // 没有break，继续比较'case 3'
        case 3:
            // code...
            return $result;     // 当前位置在函数内，'return'会结束函数
        default:
            // code...
            return $error;
    }
}
{% endhighlight %}

- [Switch语句](http://php.net/manual/en/control-structures.switch.php)
- [PHP switch](http://phpswitch.com/)

##全局命名空间
