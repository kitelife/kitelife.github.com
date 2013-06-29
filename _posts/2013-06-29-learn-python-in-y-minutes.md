---
layout: post
title: Y分钟学会Python（译）
tags: [Python, 翻译]
---

原文：[Learn Python in Y Minutes](http://learnxinyminutes.com/docs/python/)

译者：[youngsterxyf](https://github.com/youngsterxyf)

Python由Guido Van Rossum发明于90年代初期，是目前最流行的编程语言之一，因其语法的清晰简洁我爱上了Python，其代码基本上可以
说是可执行的伪代码。

非常欢迎反馈！你可以通过推特[@louiedinh](https://twitter.com/louiedinh)或louiedinh AT gmail联系我。

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
(1 + 3) * 2 #=> 8


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

# 可以通过分片(slice)语法来查看列表中某个区间的数据
# 以数学角度来说，这是一个闭合/开放区间
li[1:3] #=> [2, 4]
# 省略结束位置
li[2:] #=> [4, 3]
# 省略开始位置
li[:3] #=> [1, 2, 4]

# 使用del从列表中删除任意元素
del li[2] #li现在为[1, 2, 3]

# 列表可以相加
li + other_li #=> [1, 3, 3, 4, 5, 6] - 注意：li和other_li并未改变

# 以extend来连结列表
li.extend(other_li) # 现在li为[1, 2, 3, 4, 5, 6]

# 以in来检测列表中是否存在某元素
1 in li #=> True

# 以len函数来检测列表长度
len(li) #=> 6

# 元组类似列表，但不可变
tup  = (1, 2, 3)
tup[0] #=> 1
try:
    tup[0] = 3 # 抛出一个TypeError异常
except TypeError:
    print "Tuples cannot be mutated."

# 可以在元组上使用和列表一样的操作
len(tup) #=> 3
tup + (4, 5, 6) #=> (1, 2, 3, 4, 5, 6)
tup[:2] #=> (1, 2)
2 in tup #=> True

# 可以将元组解包到变量
a, b, c = (1, 2, 3) # 现在a等于1，b等于2，c等于3
# 如果你省略括号，默认也会创建元组
d, e, f = 4, 5, 6
# 看看两个变量互换值有多简单
e, d = d, e     #现在d为5，e为4


# 字典存储映射关系
empty_dict = {}
# 这是一个预先填充的字典
filled_dict = {"one": 1, "two": 2, "three": 3}

# 以[]语法查找值
filled_dict['one'] #=> 1

# 以列表形式获取所有的键
filled_dict.keys() #=> ["three", "two", "one"]
# 注意 - 字典键的顺序是不确定的
# 你的结果也许和上面的输出结果并不一致

# 以in来检测字典中是否存在某个键
"one" in filled_dict #=> True
1 in filled_dict #=> False

# 试图使用某个不存在的键会抛出一个KeyError异常
filled_dict['four'] #=> 抛出KeyError异常

# 使用get方法来避免KeyError
filled_dict.get("one") #=> 1
filled_dict.get("four") #=> None

# get方法支持一个默认参数，不存在某个键时返回该默认参数值
filled_dict.get("one", 4) #=> 1
filled_dict.get("four", 4) #=> 4

# setdefault方法是一种添加新的键-值对到字典的安全方式
filled_dict.setdefault("five", 5) #filled_dict["five"]设置为5
filled_dict.setdefault("five", 6) #filled_dict["five"]仍为5


# 集合
empty_set = set()
# 以几个值初始化一个集合
filled_set = set([1, 2, 2, 3, 4]) # filled_set现为set([1, 2, 3, 4, 5])

# 以&执行集合交运算
other_set = set([3, 4, 5, 6])
filled_set & other_set #=> set([3, 4, 5])
# 以|执行集合并运算
filled_set | other_set #=> set([1, 2, 3, 4, 5, 6])
# 以-执行集合差运算
set([1, 2, 3, 4]) - set([2, 3, 5]) #=> set([1, 4])

# 以in来检测集合中是否存在某个值
2 in filled_set #=> True
10 in filled_set #=> False


####################################################
## 3. 控制流程
####################################################

# 创建个变量
some_var = 5

# 以下是一个if语句。缩进在Python是有重要意义的。
# 打印 "some_var is smaller than 10"
if some_var > 10:
    print "some_var is totally bigger than 10."
elif some_var < 10:
    print "some_var is smaller than 10."
else:
    print "some_var is indeed 10."


"""
For循环在列表上迭代
输出：
    dog is a mammal
    cat is a mammal
    mouse is a mammal
"""
for animal in ["dog", "cat", "mouse"]:
    # 可以使用%来插补格式化字符串
    print "%s is a mammal" % animal

"""
while循环直到未满足某个条件。
输出：
    0
    1
    2
    3
"""
x = 0
while x < 4:
    print x
    x += 1    # x = x + 1的一种简写

# 使用try/except块来处理异常

# 对Python 2.6及以上版本有效
try:
    # 使用raise来抛出一个错误
    raise IndexError("This is an index error")
except IndexError as e:
    pass    # pass就是什么都不干。通常这里用来做一些恢复工作

# 对于Python 2.7及以下版本有效
try:
    raise IndexError("This is an index error")
except IndexError, e:   # 没有"as"，以逗号替代
    pass


####################################################
## 4. 函数
####################################################

# 使用def来创建新函数
def add(x, y):
    print "x is %s and y is %s" % (x, y)
    return x + y    # 以一个return语句来返回值

# 以参数调用函数
add(5, 6) #=> 11 并输出 "x is 5 and y is 6"
# 另一种调用函数的方式是关键字参数
add(x=5, y=6)   # 关键字参数可以任意顺序输入

# 可定义接受可变数量的位置参数的函数
def varargs(*args):
    return args

varargs(1, 2, 3) #=> (1, 2, 3)


# 也可以定义接受可变数量关键字参数的函数
def keyword_args(**kwargs):
    return kwargs

# 调用一下该函数看看会发生什么
keyword_args(big="foot", loch="ness") #=> {"big": "foo", "loch": "ness"}

# 也可以一次性接受两种参数
def all_the_args(*args, **kwargs):
    print args
    print kwargs
"""
all_the_args(1, 2, a=3, b=4)输出：
    [1, 2]
    {"a": 3, "b": 4}
"""

# 在调用一个函数时也可以使用*和**
args = (1, 2, 3, 4)
kwargs = {"a": 3, "b": 4}
foo(*args)  #等价于foo(1, 2, 3, 4)
foo(**kwargs)   # 等价于foo(a=3, b=4)
foo(*args, **kwargs)    # 等价于foo(1, 2, 3, 4, a=3, b=4)

# Python的函数是一等函数
def create_adder(x):
    def adder(y):
        return x + y
    return adder

add_10 = create_adder(10)
add_10(3) #=> 13

# 也有匿名函数
(lamda x: x > 2)(3) #=> True

# 有一些内置的高阶函数
map(add_10, [1, 2, 3]) #=> [11, 12, 13]
filter(lamda x: x > 5, [3, 4, 5, 6, 7]) #=>[6, 7]

# 可以使用列表推导来实现映射和过滤
[add_10(i) for i in [1, 2, 3]] #=> [11, 13, 13]
[x for x in [3, 4, 5, 6,7 ] if x > 5] #=> [6, 7]

####################################################
## 5. 类
####################################################

# 创建一个子类继承自object来得到一个类
class Human(object):

    # 类属性。在该类的所有示例之间共享
    species = "H. sapiens"

    # 基本初始化构造方法
    def __init__(self, name):
        # 将参数赋值给实例的name属性
        self.name = name

    # 实例方法。所有示例方法都以self为第一个参数
    def say(self, msg):
        return "%s: %s" % (self.name, msg)

    # 类方法由所有实例共享
    # 以调用类为第一个参数进行调用
    @classmethod
    def get_species(cls):
        return cls.species

    # 静态方法的调用不需要一个类或实例的引用
    @staticmethod
    def grunt():
        return "*grunt*"

# 实例化一个类
i = Human(name="Ian")
print i.say("hi")       # 输出"Ian: hi"

j = Human("Joel")
print j.say("hello")        # 输出"Joel: hello"

# 调用类方法
i.get_species() #=> "H. sapiens"

# 修改共享属性
Human.species = "H. neanderthalensis"
i.get_species() #=> "H. neanderthalensis"
j.get_species() #=> "H. neanderthalensis"

# 调用静态方法
Human.grunt()   #=> "*grunt*"
{% endhighlight %}

### 进一步阅读
想要学习更多？试试[笨方法学习Python](http://learnpythonthehardway.org/book/)。