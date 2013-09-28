---
layout: post
title: 以示例学Git内部构造
tags: [Git, 翻译]
---

原文：[Learning Git Internals by Example](http://teohm.github.io/blog/2011/05/30/learning-git-internals-by-example/)

译者：[youngsterxyf](https://github.com/youngsterxyf)

状态：草稿

计划修订本文，未来可能会简化一些...

------

# 动机

从Subversion和Mercurial切换到Git之后的几个月，我始终觉得Git在本质上是不同于Subversion和Mercurial的，但没法确切地说出区别。
我经常在Github上看到tree、parent等术语，也搞不清楚它们确切的含义。

因此我决定花些时间学学Git。

我会尝试概述，并阐述一路走来学到的关于Git的关键信息...但这仅是有助于我回答Git与其他源码控制工具区别的Git内部构造基本知识。


# 实体、引用、索引（Objects，References，The Index）

要理解Git内部构造的核心，我们应理解三个东西： **实体**、**引用**、 **索引**。

我发现这个模型非常优雅。用一个小小的图表就能完全展现，也易于理解记忆。

![Big Picture](https://raw.github.com/youngsterxyf/youngsterxyf.github.com/master/assets/pics/git-internals/big-picture.png)

## 实体

你提交到一个Git代码仓库中的所有文件，包括每个提交的说明信息（the commit info）都在目录 `.git/objects/`中存储为**实体**。

一个实体以一个40字符长度的字符串（该实体内容的SHA1哈希值）来标识。

实体有**4类**:

1. *blob* - 存储文件内容。
2. *tree* - 存储目录结构和文件名。
3. *commit* - 存储提交的说明，组成Git的提交图谱。
4. *tag* - 存储带注释的标签（tag）。

下文的示例会阐明这些实体是如何相互关联的。

## 引用

Git中，一个*分支（branch）*、*远程分支（remote branch）*或一个*标签（tag）*（也称为轻量标签）仅是**指向一个实体的一个指针**，这里的实体通常是一个commit实体。

这些引用以文本文件的形式存储在目录`.git/refs/`中。

### 符号引用（Symbolic References）

Git有一种特殊的引用，称为*符号引用*。它并不直接指向一个实体，而是**指向另一个引用**。举例来说，`.git/HEAD`就是一个符号引用。它指向你正在工作的当前分支。

## 索引

索引是一个暂存区，以二进制文件的形式存储为文件`.git/index`。

当`git add`一个文件，Git将该文件的信息添加到索引中。当`git commit`，Git仅提交索引文件中列出的文件。

------

# 示例


