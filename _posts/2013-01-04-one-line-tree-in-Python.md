---
layout: post
title: 一行Python代码定义树（译）
tags: [Python, 翻译]
---

原文：[One-line Tree in Python](https://gist.github.com/2012250)

译者：[youngsterxyf](https://github.com/youngsterxyf)

使用Python内置的[defaultdict](http://docs.python.org/2/library/collections.html#collections.defaultdict)可以轻松定义一棵树：

	def tree(): return defaultdict(tree)

就这样！

这段代码简单地说明一棵树是一个字典，其缺省的值（译注：与键对应的值的概念）是树。

（如果你正随着我写下代码，请先确保 `from collections import defaultdict` ）

（还有：Hacker News读者@zbuc指出这种方法被称为[自动唤醒](https://en.wikipedia.org/wiki/Autovivification)。Cool！）

## 示例
### JSON形式

现在我们可以创建JSON式的嵌套字典，而无需显式创建子级字典——当我们引用它们，就会神奇地自动产生：

	users = tree()
	users['harold']['username'] = 'hrldcpr'
	users['handler']['username'] = 'matthandlersux'

我们可以使用 `print(json.dumps(users))` 将这棵树作为JSON打印出来（译注：先 `import json` ），得到如下输出：

	{"harold": {"username": "hrldcpr"}, "handler": {"username": "matthandlersux"}}

### 无需赋值

我们甚至根本不用赋值操作就可以构建树结构：

	taxonomy = tree()
	taxonomy['Animalia']['Chordata']['Mammalia']['Carnivora']['Felidae']['Felis']['cat']
	taxonomy['Animalia']['Chordata']['Mammalia']['Carnivora']['Felidae']['Panthera']['lion']
	taxonomy['Animalia']['Chordata']['Mammalia']['Carnivora']['Canidae']['Canis']['dog']
	taxonomy['Animalia']['Chordata']['Mammalia']['Carnivora']['Canidae']['Canis']['coyote']
	taxonomy['Plantae']['Solanales']['Solanaceae']['Solanum']['tomato']
	taxonomy['Plantae']['Solanales']['Solanaceae']['Solanum']['potato']
	taxonomy['Plantae']['Solanales']['Convolvulaceae']['Ipomoea']['sweet potato']

这次我们打印得好看些，不过需要先将其转换成标准字典：

	def dicts(t): return {k: dicts(t[k]) for k in t}

现在可以使用 `pprint(dicts(taxonomy))` 漂亮地打印该数据结构（译注：先 `from pprint import pprint` ）：

	{'Animalia': {'Chordata': {'Mammalia': {'Carnivora': {'Canidae': {'Canis': {'coyote': {},
                                                                                'dog': {}}},
                                                          'Felidae': {'Felis': {'cat': {}},
                                                                      'Panthera': {'lion': {}}}}}}},
     'Plantae': {'Solanales': {'Convolvulaceae': {'Ipomoea': {'sweet potato': {}}},
                               'Solanaceae': {'Solanum': {'potato': {},
                                                          'tomato': {}}}}}}

我们引用的子级结构都以字典形式存在，叶子为空字典。

### 迭代

迭代遍历这棵树会比较有趣，也是因为结构在引用的时候就会自动产生。

例如，假设我们正在解析一个新动物的列表，添加到上面的 `taxonomy` 中，我们希望调用如下这样的一个函数：

	add(taxonomy, 'Animalia,Chordata,Mammalia,Cetacea,Balaenopteridae,Balaenoptera,blue whale'.split(','))

可以简单地这样实现：

	def add(t, keys):
		for key in keys:
			t = t[key]

再一次我们根本没有对字典赋值，仅通过引用这些键就创建了新的结构：

	{'Animalia': {'Chordata': {'Mammalia': {'Carnivora': {'Canidae': {'Canis': {'coyote': {},
                                                                                'dog': {}}},
                                                          'Felidae': {'Felis': {'cat': {}},
                                                                      'Panthera': {'lion': {}}}},
                                            'Cetacea': {'Balaenopteridae': {'Balaenoptera': {'blue whale': {}}}}}}},
     'Plantae': {'Solanales': {'Convolvulaceae': {'Ipomoea': {'sweet potato': {}}},
                               'Solanaceae': {'Solanum': {'potato': {},
                                                          'tomato': {}}}}}}

## 总结

这个可能不是很有用，且需要一些令人费解的代码（见如上 `add()` ）。但是如果你喜欢Python，我希望这个会让你觉得有趣或者值得去理解。
