---
layout: post
title: Y分钟学会Python（译）
tags: [Python, 翻译]
---

原文：[Learn Python in Y Minutes](http://learnxinyminutes.com/docs/python/)

译者：[youngsterxyf](https://github.com/youngsterxyf)

Python由Guido Van Rossum发明于90年代初期，是目前最流行的编程语言之一，因其语法的清晰简洁我爱上了Python，其代码基本上可以
说是可执行的伪代码。

非常欢迎反馈！你可以通过推特[@louiedinh](https://twitter.com/louiedinh)或louiedinh[at][谷歌email服务]联系我。

备注：本文是专门针对Python 2.7的，但应该是适用于Python 2.x的。很快我也会为Python 3写这样的一篇文章！

{% highlight python%}
# 单行注释以井字符开头
""" 我们可以使用三个双引号（"）或单引号（'）
    来编写多行注释
"""


##########################################################
## 1. 基本数据类型和操作符
##########################################################

# 数字
3 #=> 3

# 你预想的数学运算
1 + 1 #=> 2
8 - 1 #=> 7
10 * 2 #=> 20
35 / 5 #=> 7

# 除法略显诡异。整数相除会自动向下取小于结果的最大整数
11 / 4 #=> 2

# 还有浮点数和浮点数除法（译注：除数和被除数两者至少一个为浮点数，结果才会是浮点数）
2.0     # 这是一个浮点数
5.0 / 2.0 #=> 2.5 额...语法更明确一些

# 使用括号来强制优先级
(1 +３) * 2 #=> 8


# 布尔值也是基本类型数据
True
False

# 使用not来求反
not True #=> False
not False #=> True

# 相等比较使用==
1 == 1 #=> True
2 == 1 #=> False

# 不相等比较使用!=
1 != 1 #=> False
2 != 1 #=> True

# 更多的比较方式
1 < 10 #=> True
1 > 10 #=> False
2 <= 2 #=> True
2 >= 2 #=> True

# 比较操作可以串接！
1 < 2 < 3 #=> True
2 < 3 < 2 #=> False

# 可以使用"或'创建字符串
"This is a string."
'This is also a string.'

# 字符串也可以相加！
"Hello " + "world!" #=> "Hello world!"

# 字符串可以看作是一个字符列表
"This is a string"[0] #=> 'T'

# None是一个对象
None #=> None


####################################################
## 2. 变量与数据容器
####################################################

# 打印输出非常简单
print "I'm Python. Nice to meet you!"

# 赋值之前不需要声明变量
some_var = 5    # 约定使用 小写_字母_和_下划线 的命名方式
some_var #=> 5

# 访问之前未赋值的变量会产生一个异常
try:
    some_other_var
except NameError:
    print "Raises a name error"

# 赋值时可以使用条件表达式
some_var = a if a > b else b
# 如果a大于b，则将a赋给some_var，
# 否则将b赋给some_var

# 列表用于存储数据序列
li = []
# 你可以一个预先填充的列表开始
other_li = [4, 5, 6]

# 使用append将数据添加到列表的末尾
li.append(1)    #li现在为[1]
li.append(2)    #li现在为[1, 2]
li.append(4)    #li现在为[1, 2, 4]
li.append(3)    #li现在为[1, 2, 4, 3]

# 使用pop从列表末尾删除数据
li.pop()    #=> 3，li现在为[1, 2, 4]
# 把刚刚删除的数据存回来
li.append(3)    # 现在li再一次为[1, 2, 4, 3]

# 像访问数组一样访问列表
li[0] #=> 1
# 看看最后一个元素
li[-1] #=> 3

# 越界访问会产生一个IndexError
try:
    li[4] # 抛出一个IndexError异常
except IndexError:
    print "Raises an IndexError"



{% endhighlight %}