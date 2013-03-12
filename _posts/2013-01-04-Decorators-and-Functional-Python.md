---
layout: post
title: 装饰器与函数式Python（译）
tags: [Python, 翻译]
---

原文：[Decorators and Functional Python](http://www.brianholdefehr.com/decorators-and-functional-python)

译者：[youngsterxyf](https://github.com/youngsterxyf)

装饰器是Python的一大特色。除了在语言中的原本用处，还帮助我们以一种有趣的方式（函数式）进行思考。

我打算自底向上解释装饰器如何工作。首先解释几个话题以帮助理解装饰器。然后，深入一点探索几个简单的装饰器以及它们如何工作。最后，讨论一些更高级的使用装饰器的方式，比如：传递可选参数给装饰器或者串接几个装饰器。

首先以我能想到的最简单的方式来定义Python函数是什么。基于该定义，我们可以类似的简单方式来定义装饰器。

> 函数是一个完成特定任务的可复用代码块。

好的，那么装饰器又是什么呢？

> 装饰器是一个修改其他函数的函数。

现在在装饰器的定义上进行详述，先解释一些先决条件。

## 函数是一等对象

Python中，所有东西都是对象。这意味着可以通过名字引用函数，以及像其他对象那样传递。例如：

	def traveling_function():
		print "Here I am!"

	function_dict = {
		"func": traveling_function
	}

	trav_func = function_dict['func']
	trav_func()
	# >> Here I am!

`traveling_function` 被赋值给 `function_dict` 字典中键 `func` 的值，仍旧可以正常调用。

## 一等函数允许高阶函数

我们可以像其他对象那样传递函数。可以将函数作为值传递给字典，放在列表中，或者作为对象的属性进行赋值。那为什么不能作为参数传给另一个函数呢？当然可以！如果一个函数接受另一个函数作为其参数或者返回另一个函数，则称之为高阶函数。

	def self_absorbed_function():
		return "I'm an amazing function!"

	def printer(func):
		print "The function passed to me says: " + func()

	# Call `printer` and give it `self_absorbed_function` as an argument
	printer(self_absorbed_function)
	# >>> The function passed to me says: I'm an amazing function!

现在你也看到函数可以作为参数传给另一个函数，而且传给函数的函数还可以调用。这允许我们创建一些有意思的函数，例如装饰器。

## 装饰器基础

本质上，装饰器就是一个以另一个函数为参数的函数。大多数情况下，它们会返回所包装函数的一个修改版本。来看个我们能想到的最简单的装饰器---同一性（identity）装饰器，或许对我们理解装饰器的工作原理有所帮助。

    def identity_decorator(func):
        def wrapper():
            func()
        return wrapper

    def a_function():
        print "I'm a normal function."

    # `decorated_function` 是 `identity_function` 返回的函数，也就是嵌套函数 `wrapper`
    decorated_function = identity_function(a_function)

    # 如下调用 `identity_function` 返回的函数
    decorated_function()
    # >>> I'm a normal function

这里， `identity_decorator`
根本没有修改它包装的函数，只是简单地返回一个函数（wrapper），这个函数在被调用之时，会去调用原来作为 `identity_decorator` 参数的函数。这是个没有用处的装饰器！

关于 `identity_decorator` 的有趣之处是 `wrapper` 能够访问变量 `func` ，即使
`func` 并非是它的参数。这归因于闭包。

## 闭包

> 闭包是一个花哨的术语，意为声明一个函数时，该函数会维持一个指向声明所处词法环境的引用。

上例中定义的函数 `wrapper` 能够在其局部作用域（local scope）中访问
`func`。这意味着在 `wrapper` （返回并赋值给变量 `decorated_function` ）的整个生命周期内，它都可以访问 `func` 变量。一旦 `identity_decorator`返回，那么访问 `func` 的唯一方式就是通过 `decorated_function` 。 `func` 只作为一个变量存在于 `decorated_function` 作用域环境的内部。

## 一个简单的装饰器

现在我们来创建一个确实有点用的装饰器。这个装饰器所做的就是记录它所修改的函数被调用了多少次。

    def logging_decorator(func):
        def wrapper():
            wrapper.count += 1
            print "The function I modify has been called {0} time(s)".format(wrapper.count)
            func()
        wrapper.count = 0
        return wrapper

    def a_function():
        print "I'm a normal function."

    modified_function = logging_decorator(a_function)

    modified_function()
    # >>> The function I modify has been called 1 time(s).
    # >>> I'm a normal function.

    modified_function()
    # >>> The function I modify has been called 2 time(s).
    # >>> I'm a normal function.

我们说装饰器会修改函数，这样来想对理解也是有帮助的。但如例子所见，
`logging_decorator` 返回的是一个类似于 `a_function`
的新函数，只是多了一个日志特性。

上例中， `logging_decorator` 不仅接受一个函数作为参数，并且返回一个函数，
`wrapper` 。每次 `logging_decorator` 返回的函数得到调用，它就对 `wrapper.count` 的值加1，打印出来，然后调用 `logging_decorator` 包装的函数。

你也许正疑惑为什么我们的计数器是 `wrapper` 的一个属性而不是一个普通的变量。难道 `wrapper` 的闭包环境不是让我们访问在其局部作用域中声明的任意变量么？是的，但有个问题。Python中，闭包允许对其函数作用域链中任一变量的进行任意读操作，但只允许对可变对象（列表、字典、等等）进行写操作。整数在Python中是非可变对象，因此我们不能修改 `wrapper` 内部整型变量的值。相反，我们将计数器作为 `wrapper` 的一个属性---一个可变对象，因此可以随我们自己增大它的值。

## 装饰器语法

在前一个例子中，我们看到可以将一个函数作为参数传给装饰器，从而使用装饰器函数对该函数进行包装。然而，Python还有一个语法模式使得这一切更加直观，更容易阅读，一旦你熟悉了装饰器。

    # In the previous example, we used our decorator function by passing the
    # function we wanted to modify to it, and assigning the result to a variable
    def some_function():
        print "I'm happiest when decorated."

    # Here we will make the assigned variable the same name as the wrapped function
    some_function = logging_decorator(some_function)

---

    # We can achieve the exact same thing with this syntax:

    @logging_decorator
    def some_function():
        print "I'm happiest when decorated"

使用装饰器语法，鸟瞰其中发生的事情：

1. 解释器到达被装饰的函数，编译 `some_function`，并将其命名为 'some_function'。
2. 然后将该函数传递给装饰行中指定的装饰器函数（ `logging_function` ）。
3. 装饰器函数（通常是用来包装原函数的另一个函数）的返回值取代原来的函数（`some_function` ），绑定到变量名 `some_function` 。

将这些步骤记住，让我们来更清晰地解释 `identity_decorator` 。

    def identity_decorator(func):
        # Everything here happens when the decorator LOADS and is passed
        # the function as decribed in step 2 above
        def wrapper():
            # Things here happen each time the final wrapped function gets CALLED
            func()
        return wrapper

希望那些注释有助于理解。每次调用被包装的函数，仅执行装饰器返回的函数中的指令。返回函数之外的指令仅执行一次---上述步骤2中描述的：装饰器首次接收到传递给它的待包装函数之时。

在观察更多的有意思的装饰器之前，我想再解释一样东西。

## \*args与\*\*kwargs

以前你也许有时会把这两者相混淆了。让我们一次性地讨论它们。

* 通过在形参列表中使用 `*args` 语法，python函数能够接收可变数量的位置参数(positional arguments)。 `*args` 会将所有没有关键字的参数放入一个参数元组中，在函数里可以访问元组中的参数。相反，将 `*args` 用于函数调用时的实参列表之时，它会将参数元组展开成一系列的位置参数。

---

    def function_with_many_arguments(*args):
        print args

    # `args` within the function will be a tuple of any arguments we pass
    # which can be used within the function like any other tuple
    function_with_many_arguments('hello', 123, True)
    # >>> ('hello', 123, True)

---

    def function_with_3_parameters(num, boolean, string):
        print "num is " + str(num)
        print "boolean is " + str(boolean)
        print "string is " + string

    arg_list = [1, False, 'decorators']

    # arg_list will be expanded into 3 positional arguments by the `*` symbol
    function_with_3_parameters(*arg_list)
    # >>> num is 1
    # >>> boolean is False
    # >>> string is decorators

重述一遍：在形参列表中， `*args`会将一系列的参数压缩进一个名为'args'的元组，而在实参列表中， `*args` 会将一个可迭代的参数数据结构展开为一系列的位置实参应用于函数。

如你所见在实参展开的例子中， `*` 符号可与'args'之外的名字一起使用。当压缩/展开一般的参数列表，使用 `*args` 的形式仅仅是一种惯例。

* `**kwargs` 与 `*args` 的行为类似，但用于关键字参数而非位置参数。如果在函数的形参列表中使用 `**kwargs` ，它会收集函数收到的所有额外关键字参数，放入一个字典中。如果用于函数的实参列表，它会将一个字典展开为一系列的关键字参数。

---

    def funtion_with_many_keyword_args(**kwargs):
        print kwargs

    function_with_many_keyword_args(a='apples', b='bananas', c='cantalopes')
    # >> {'a':'apples', 'b':'bananas', 'c':'cantalopes'}

---

    def multiply_name(count=0, name=''):
        print name * count

    arg_dict = {'count': 3, 'name': 'Brian'}
    
    multiply_name(**arg_dict)
    # >> BrianBrianBrian

既然你理解了 `*args` 与 `**kwargs` 的工作原理，那么我们就继续研究一个你会发现很有用的装饰器。

## 缓存制表（Memoization）

缓存制表是避免潜在的昂贵的重复计算的一种方法，通过缓存函数每次执行的结果来实现。这样，下一次函数以相同的参数执行，就可以从缓存中获取返回结果，不需要再次计算结果。

    from functools import wraps

    def memoize(func):
        cache = {}

        @wraps(func)
        def wrapper(*args):
            if args not in cache:
                cache[args] = func(*args)
            return cache[args]
        return wrapper

    @memoize
    def an_expensive_function(arg1, arg2, arg3):
        ...

你可能注意到了示例代码中一个奇怪的 `@wraps` 装饰器。在完整地讨论 `memoize`
之前我将简要地解释这个装饰器。

* 使用装饰器的一个副作用是被包装的函数失去了本来有的 `__name__` ， `__doc__` ， 以及 `__module__` 属性。 `wraps` 函数是一个包装另一个装饰器返回的函数的装饰器，将那三个属性的值恢复为函数未装饰之时的值。例如： 如果不使用 `wraps` 装饰器， `an_expensive_function` 的名字（通过 `an_expensive_function.__name__` 可以看到）将是 'wrapper' 。

我认为 `memoize` 是一个很好的装饰器用例。它服务于一个很多函数都需要的目的，通过将它创建为一个通用装饰器，我们可以将它的功能应用于任一能够从其中获益的函数。这就避免了在多种不同的场合重复实现这个功能。因为不需要重复自己，所以我们的代码更容易维护，并且更容易阅读和理解。只要读一个单词你就能立刻理解函数使用了缓存制表。

需要提醒的是：缓存制表仅适用于纯函数。也就是说给定一个特定的参数设置，函数确定总会产生相同的结果。如果函数依赖于不作为参数传递的全局变量、I/O、或者其它任意可能影响返回值的东西，缓存制表会产生令人迷惑的结果！并且，一个纯函数不会有任何副作用。因此，如果你的函数会增大一个计数器，或者调用另一个对象的方法，或者其它任意不在函数的返回结果中表示的东西，当结果是从缓存中返回时，副作用操作并不会得到执行。

## 类的装饰器

最初，我们说装饰器是一个修改另一个函数的函数，但其实它们可以用于修改类或者方法。对类进行装饰并不常见，但某些情况下作为元类(metaclass)的一个替代，类的装饰器是一个有用的工具。

    foo = ['important', 'foo', 'stuff']

    def add_foo(klass):
        klass.foo = foo
        return klass


    @add_foo
    class Person(object):
        pass

    brian = Person()

    print brian.foo
    # >> ['important', 'foo', 'stuff']

现在，类 `Person` 的任一对象都有一个超级重要的 `foo`
属性！注意，因为我们装饰的是一个类，所以装饰器返回的不是一个函数，而是一个类。更新一下装饰器的定义：

> 装饰器是一个修改函数、或方法、或类的函数。

## 装饰器类

事实证明我早先对你隐瞒了一些其它事情。不仅装饰器可以装饰一个类，并且装饰器也可以是一个类！对于装饰器的唯一要求就是它的返回值必须可调用(callable)。这意味着装饰器必须实现 `__call__` 魔术方法，当你调用一个对象时，会隐式调用这个方法。函数当然是隐式设置这个方法的。我们重新将 `identity_decorator` 创建为一个类来看看它是如何工作的。

    class IdentityDecorator(object):
        def __init__(self, func):
            self.func = func

        def __call__(self):
            self.func()

    
    @IdentityDecorator
    def a_function():
        print "I'm a normal function."

    a_function()
    # >> I'm a normal function.

如下是上例中发生的事情：

* 当 `IdentityDecorator` 装饰 `a_function` 时，它的行为就和装饰器函数一样。这个代码片段等价于上例中的装饰器语法： `a_function = IdentityDecorator(a_function)` 。调用（实例化）该装饰器类时，需将其装饰的函数作为一个实参传递给它。

* 实例化 `IdentityDecorator` 之时，会以被装饰的函数作为实参调用初始化函数 `__init__` 。本例中，初始化函数所做的事情就是将被装饰函数赋值给一个属性，这样之后就可以通过其它方法进行调用。

* 最后，调用 `a_function` （实际上是返回的包装了 `a_function` 的 `IdentityDecorator` 对象）之时，会调用对象的 `__call__` 方法。这仅是一个同一性装饰器，所以方法只是简单地调用了该类所装饰的函数。

再次更新一下我们对装饰器的定义！

> 装饰器是一个修改函数、方法或者类的可调用对象。

## 带参数的装饰器

有时，需要根据不同的情况改变装饰器的行为。你可以通过传参来做到这一点。

    from functools import wraps

    def argumentative_decorator(gift):
        def func_wrapper(func):
            @wraps(func)
            def returned_wrapper(*arg, **kwargs):
                 print "I don't like this " + gift + "you gave me!"
                 return func(gift, *args, **kwargs)
            return returned_wrapper
        return func_wrapper

    @argumentative_decorator("sweater")
    def grateful_function(gift):
        print "I love the " + gift + "!Thank you!"

    grateful_function()
    # >> I don't like this sweater you gave me!
    # >> I love the sweater! Thank you!


我们来看看如果不使用装饰器语法这个装饰器函数是如何工作的：

    # If we tried to invoke without an argument:
    grateful_function = argumentative_function(grateful_function)

    # But when given an argument, the pattern changes to:
    grateful_function = argumentative_decorator("sweater")(grateful_function)

需要注意的地方是：当给定参数，首先仅以那些参数调用装饰器---被包装的函数并不在参数中。装饰器调用返回后，装饰器要包装的函数被传递给装饰器初始调用返回的函数（本例中，为 `argumentative_decorator("sweater")` 的返回值）。

逐步地：

1. 解释器到达被装饰函数之处，编译 `grateful_function` ，并将其绑定到名字'grateful_function'。
2. 传递参数"sweater"调用 `argumentative_decorator` ，返回 `func_wrapper` 。
3. 以 `grateful_function` 为参调用 `func_wrapper` ，返回 `returned_wrapper` 。
4. 最后， `returned_wrapper` 取代原来的函数 `grateful_function` ，并绑定到名字'grateful_function' 。

我想这一过程相比没有装饰器参数理解起来更难一点，但是如果你花些时间将其理解通透，我希望是有意义的。

## 带可选参数的装饰器

有多种方式让装饰器接受可选参数。根据你是想使用位置参数、关键字参数还是两者皆是，需要使用稍微不同的模式。如下我将展示一种接受一个可选关键字参数的方式：

    from functools import wraps

    GLOBAL_NAME = "Brian"

    def print_name(function=None, name=GLOBAL_NAME):
        def actual_decorator(function):
            @wraps(function)
            def returned_func(*args, **kwargs):
                print "My name is " + name
                return function(*args, **kwargs)
            return returned_func

        if not function:    # User passed in a name argument
            def waiting_for_func(function):
                return actual_decorator(function)
            return waiting_for_func

        else:
            return actual_decorator(function)

    @print_name
    def a_function():
        print "I like the name!"

    @print_name(name='Matt')
    def another_function():
        print "Hey, that's new!"

    a_function()
    # >> My name is Brian
    # >> I like that name!

    another_function()
    # >> My name is Matt
    # >> Hey, that's new!

如果我们传递关键字参数 `name` 给 `print_name`
，那么它的行为就与前一个例子中的 `argumentative_decorator` 相似。即，首先以
`name` 为参调用 `print_name` 。然后，将待包装的函数传递给首次调用返回的函数。

如果我们没有提供 `name` 实参， `print_name` 的行为就与前面我们看到的不带参数的装饰器一样。装饰器仅以待包装的函数作为唯一的参数进行调用。

`print_name`
支持两种可能性。它会检查是否收到作为参数的被包装函数。如果没有，则返回函数
`waiting_for_func`
，该函数可以被包装函数作为参数进行调用。如果收到被包装函数作为参数，则跳过中间步骤，直接调用 `actual_decorator` 。

## 串接装饰器

现在来探索一下今天要讲的最后一个装饰器的特性：串接。你可以在任意给定的函数之上堆叠使用多个装饰器， 这种构建函数的方式与使用多重继承构建类相类似。不过最好不要疯狂使用这种特性。

    @print_name('Sam')
    @logging_decorator
    def some_function():
        print "I'm the wrapped function!"

    some_function()
    # >> My name is Sam
    # >> The function I modify has been called 1 time(s).
    # >> I'm the wrapped function!

当你串接使用装饰器时，它们堆叠的顺序是自底向上的。将被包装的函数 `some_function` 经编译后传递给它之上的第一个装饰器（ `logging_decorator` ）。然后第一个装饰器的返回值被传递给第二个装饰器。依此逐个应用链上每个装饰器。

因为我们使用的两个装饰器都是 `print`
一个值，然后执行传递给它们的函数，这意味着当调用被包装函数时，链中的最后一个装饰器 `print_name` 打印输出中的第一行。

## 总结

我认为装饰器最大的好处之一在于让你能够从更高的抽象层次进行思考。假如你开始阅读一个函数定义，看到有一个 `memoize` 装饰器，你立刻就能明白你正在看的是一个使用缓存制表的函数。如果缓存制表的代码包含在函数体内，就会需要额外的脑力进行解析，并且会有引入误解的可能。使用装饰器也允许代码复用，从而节省时间、简化调试，并且使得重构更加容易。

玩玩装饰器也是一种很好的学习函数式概念（如高阶函数与闭包）的方式。

我希望本文阅读起来很愉快，并且内容翔实。
