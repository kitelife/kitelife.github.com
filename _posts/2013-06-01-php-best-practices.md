---
layout: post
title: PHP最佳实践（译）
tags: [翻译, PHP]
---

原文： [PHP Best Practices-A short, practical guide for common and confusing PHP tasks](https://phpbestpractices.org/)

译者：[youngsterxyf](https://github.com/youngsterxyf)

## 简介

PHP是一门复杂的语言，经过多年折腾，使其不同版本之间高度不一致，有时还有些bug。
每个版本都有自己独有的特性、多余和怪异之处，也很难跟踪哪个版本有哪些问题。这也就
很好理解为什么有时它会遭到那么多的厌恶。

尽管如此，如今它还是Web开发方面最流行的语言。因其悠久的历史，对于实现密码哈希和
数据库访问诸如此类的基本任务你能够找到很多教程。但问题在于，5个教程，你就很有可能
找到5种完全不同的完成任务的方式，那么哪种是“正确”的方式呢？其他方式有难以捉摸的bug
或者陷阱？确实很难搞明白，所以你经常要在互联网上反复查找尝试确认正确的答案。

这也是PHP编程新手频繁地因为丑陋、过时、或不安全的代码而遭到责备的原因之一。如果
Google搜索的第一个结果是一篇4年前的文章，讲述一种5年前的方法，那么PHP新手们也就
很难改变经常遭受责备的现状。

本文档通过为PHP中常见的令人困惑的问题和任务编辑组织一系列被认为最佳实践的基本做法，
来尝试解决上述问题。若一个低层次的任务在PHP中有多种令人困惑的实现方式，本文也会涵盖。

### 是什么

这是一份指南，在PHP程序员遇到一些常见低层次任务但不明确最佳做法（由于PHP可能提供
了多种解决方案）之时，为其建议最佳实践。例如：连接数据库是一个常见任务，PHP中提供了
大量可行的方案，但并不是所有的都是好的做法，因此，本文也会包含该问题。

本文包含的是一系列简短的、入门性质的方案。涉及的示例在基本设定下就能够运行起来，
你研究一下应该就能把它们变为对你有用的东西。

本文将指出一些我们认为是PHP中最新最好的东西。然而，这意味如果你在使用老版本的PHP，
一些用来实现这些解决方案的特性对你并不可用。

这份文档会一直更新，我会尽我最大努力保持该文档与PHP的发展同步。


### 不是什么

本文档不是一份PHP教程。你应该在别处学习语言基础和语法。

它也不是一份针对web应用常见问题，如cookie存储、缓存、编程风格、文档等的指南。

它也不是一个安全指南。当本文档触碰到一些安全相关的问题时，也是希望你自己做些研究来
确保你的PHP应用的安全问题。你的代码造成的问题应该都是自己的过错。

该文档也并不是在主张一种特定的编程风格、模式或者框架。

也不是在主张一种特定的方式来完成高层次任务如用户注册、登录系统等。本文档只限于
PHP的悠久历史所造成的一些易混淆或不明确的低层次任务。

它不是一个一劳永逸的解决方案，也不是一个唯一的方案。下面要讲述的一些方法对于你的
特定场景来说也许并不是最好的，存在很多不同的方式来达到同样的目的。特别是，高负载web
应用也许能从更加难懂的方案中获益更多。

## 我们在使用哪个版本的PHP？

### 带Suhosin-Patch的PHP 5.3.10-1ubuntu3.6，安装在Ubuntu 12.04 LTS上。

PHP是Web世界里的百年老龟，它的壳上铭刻着一段丰富、复杂、而粗糙的历史。在一个共享
主机的环境里，它的配置可能会限制你能做的事情。

为了保持清晰地叙述，我们将仅针对一个版本的PHP进行讲述。在2013年4月30日时，该版本
为**PHP 5.3.10-1ubuntu3.6 with Suhosin-Patch**。若你在**Ubuntu 12.04 LTS**服务器
上使用apt-get进行安装的就是该版本的PHP。

你也许发现这些方案中的一些在其他或者更老版本的PHP上也能工作。如果是这样的话，就*由
你来研究在这些更老版本上潜在的难以捉摸的bug或安全问题*。


## 存储密码

### 使用[phpass](http://www.openwall.com/phpass/)库来哈希和比较密码

*经phpass 0.3测试*

在存入数据库之前进行哈希保护用户密码的标准方式。许多常用的哈希算法如md5,甚至是sha1
对于密码存储都是不安全的，因为[骇客能够使用那些算法轻而易举地破解密码](http://arstechnica.com/security/2013/05/how-crackers-make-minced-meat-out-of-your-passwords/)。

对密码进行哈希最安全的方法是使用bcrypt算法。开源的phpass库以一个易于使用的类来提供
该功能。

{% highlight php %}
<?php
// Include the phpass library
require_once('phpass-03/PasswordHash.php')l

// Initialize the hasher without portable hashes (this is more secure)
$hasher = new PasswordHash(8, false);

// Hash the password. $hashedPassword will be a 60-character string.
$hashedPassword = $hasher->HashPassword('my super cool password');

// You can now safely store the contents of $hashedPassword in your database!

// Check if a user has provided the correct password by comparing what they
// typed with our hash
$hasher->CheckPassword('the wrong password', $hashedPassword);  // false

$hasher->CheckPassword('my super cool password', $hashedPassword);  // true
?>
{% endhighlight %}

**陷阱**

- 许多资源可能推荐你在哈希之前对你的密码“加盐”。想法很好，但phpass在HashPassword()函数中已经对你的密码“加盐”了，这意味着你不需要自己“加盐”。

**进一步阅读**

- [phpass](http://www.openwall.com/phpass/)
- [为什么使用md5或sha哈希密码是不安全的](http://blogs.msdn.com/b/lixiong/archive/2011/12/25/md5-sha1-salt-and-bcrypt.aspx)
- [怎样安全地存储密码](http://codahale.com/how-to-safely-store-a-password/)


## 连接并查询MySQL数据库

### 使用[PDO](http://php.net/manual/en/book.pdo.php)及其预处理语句功能。

在PHP中，有很多方式来连接到一个MySQL数据库。PDO（PHP数据对象）是其中最新且最健壮的一种。PDO跨多种不同类型数据库有一个一致的接口，使用面向对象的方式，支持更多的新数据库支持的特性。

你应该使用PDO的预处理语句函数来帮助防范SQL注入攻击。
