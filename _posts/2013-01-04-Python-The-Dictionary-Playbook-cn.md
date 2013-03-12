---
layout: post
title: Python：字典剧本（译）
tags: [Python, 翻译]
---

原文： [Python: The Dictionary Playbook](http://blog.amir.rachum.com/post/39501813266/python-the-dictionary-playbook)

译者： [youngsterxyf](https://github.com/youngsterxyf)

我经常碰到关于Python中字典的各种样板代码，因此我决定在此展示一些，并分享完成相同操作的更加简洁的方式。

上演： **字典剧本**

![playbook](/assets/pics/The_playbook.png)

1.
“你在吗？”

这个相当简单，但不可错过 - 找出某个键(key)是否存在于字典中。

*蹩脚的版本*

	dct.has_key(key)

*Pythonic的方式*

	key in dct

2.
“尤达测试”(译注：尤达的意思见[yoda](http://en.wikipedia.org/wiki/Yoda))

对于那些掌握了“你在吗”剧本的程序员来说，这通常是另一个简单但是令人讨厌的事情。它不仅仅可用于字典数据类型，但非常普通。

*干这事，你必须不能这样*

	not key in dct

*英语，你会说吗？*

	key not in dct

3.
“无论如何也要得到其值”

这个非常流行。你有一个字典和一个键，然后想修改这个键对应的值。例如，将该值加1（比方说你正在计算某些东西）。

*样板*

	if key not in dct:
		dct[key] = 0
	dct[key] = dct[ket] + 1

*巧妙的方式*

	dct[key] = dct.get(key, 0) + 1

如果存在该键， `dct.get(key[, default])` 返回 `dct[key]` ，否则返回 `default` 。

*更棒的方式*

如果你使用Python 2.7，并且想统计元素的数目，可以使用[Counter](http://docs.python.org/2/library/collections.html#collections.Counter)。

	>>> from collections import Counter
	>>> d = [1, 1, 1, 2, 2, 3, 1, 1]
	>>> Counter(d)
	Counter({1: 5, 2: 2, 3: 1})

这里有个更完整的例子：

	>>> counter = Counter()
	... for _ in range(10):
	...     num = int(raw_input("Enter a number: "))
	...     counter.update([num]) 
	...
	... for key, value in counter.iteritems():
	...     print "You have entered {}, {} times!".format(key, value) 
	Enter a number: 1
	Enter a number: 1
	Enter a number: 2
	Enter a number: 3
	Enter a number: 51
	Enter a number: 1
	Enter a number: 1
	Enter a number: 1
	Enter a number: 2
	Enter a number: 3
	You have entered 1, 5 times!
	You have entered 2, 2 times!
	You have entered 3, 2 times!
	You have entered 51, 1 times!

4.
“创造可能”(译注：这里"make it happen"还不知道该如何翻译)

有时你的字典中包含可变对象，你想初始化并修改它们。比方你要把一些数据整理存入一个字典，其值是列表（示例来自[Stack Overflow上的这个解答](http://stackoverflow.com/questions/3483520/use-cases-for-the-setdefault-dict-method/3483652#3483652)）

*详细说明*

	dct = {}
	for (key, value) in data:
		if key in dct:
			dct[key].append(value)
		else:
			dct[key] = [value]

*以pythonic方式实现*

	dct = {}
	for (key, value) in data:
		group = dct.setdefault(key, []) 	#key可能已经存在
		group.append(value)

如果键存在， `setdefault(key, [])` 返回 `dct[key]` ，否则将键对应的值设置为 `default` 并返回。与 `get` 相比，当缺省值是一个你可以修改的对象时，这种方式使你不需要将修改后的值再次插入字典中。

*Rocking it out* (译注：真心不知道这句该如何翻译)

	dct = defaultdict(list)
	for (key, value) in data:
		dct[key].append(value)		# 所有键都有一个缺省值

`defaultdict` 非常赞！不言自明 —— 带有缺省值的字典。这意味这每次访问 `dct` 中的某个键，如果不存在（通常会抛出一个 `KeyError` 异常），则以缺省值作为其值创建该键。这就好似使用 `setdefault` 来完成每次访问。

我发现 `defaultdict` 的一个有趣用法是实现[稀疏数据结构](http://en.wikipedia.org/wiki/Sparse_matrix)。设置好 *defaultdict* 的缺省值，以坐标（或者任何合适的东西）作为其键。我曾这样去表示多维网格，肯定比使用复杂的列表嵌套简单得多。

更有意思的一个使用示例见[一行代码定义树](https://gist.github.com/2012250)
