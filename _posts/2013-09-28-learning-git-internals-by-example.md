---
layout: post
title: 通过示例学习Git内部构造（译）
tags: [Git, 翻译]
---

原文：[Learning Git Internals by Example](http://teohm.github.io/blog/2011/05/30/learning-git-internals-by-example/)

译者：[youngsterxyf](https://github.com/youngsterxyf)

------

状态：草稿

计划修订本文，未来可能会简化一些...

## 动机

从Subversion和Mercurial切换到Git之后的几个月，我始终觉得Git在本质上是不同于Subversion和Mercurial的，但没法确切地说出区别。
我经常在Github上看到tree、parent等术语，也搞不清楚它们确切的含义。

因此我决定花些时间学学Git。

我会尝试概述，并阐述一路走来学到的关于Git的关键信息...但这仅是有助于我回答Git与其他源码控制工具区别的Git内部构造基本知识。


## 实体、引用、索引（Objects，References，The Index）

要理解Git内部构造的核心，我们应理解三个东西： **实体**、**引用**、 **索引**。

我发现这个模型非常优雅。用一个小小的图表就能完全展现，也易于理解记忆。

![Big Picture](https://raw.github.com/youngsterxyf/youngsterxyf.github.com/master/assets/pics/git-internals/big-picture.png)

### 实体

你提交到一个Git代码仓库中的所有文件，包括每个提交的说明信息（the commit info）都在目录 `.git/objects/`中存储为**实体**。

一个实体以一个40字符长度的字符串（该实体内容的SHA1哈希值）来标识。

实体有**4类**:

1. *blob* - 存储文件内容。
2. *tree* - 存储目录结构和文件名。
3. *commit* - 存储提交的说明，组成Git的提交图谱。
4. *tag* - 存储带注释的标签（tag）。

下文的示例会阐明这些实体是如何相互关联的。

### 引用

Git中，一个*分支（branch）*、*远程分支（remote branch）*或一个*标签（tag）*（也称为轻量标签）仅是**指向一个实体的一个指针**，这里的实体通常是一个commit实体。

这些引用以文本文件的形式存储在目录`.git/refs/`中。

#### 符号引用（Symbolic References）

Git有一种特殊的引用，称为*符号引用*。它并不直接指向一个实体，而是**指向另一个引用**。举例来说，`.git/HEAD`就是一个符号引用。它指向你正在工作的当前分支。

### 索引

索引是一个暂存区，以二进制文件的形式存储为文件`.git/index`。

当`git add`一个文件，Git将该文件的信息添加到索引中。当`git commit`，Git仅提交索引文件中列出的文件。

------

## 示例

我们来演练一个简单的示例，创建一个Git代码仓库，提交一些文件，看看幕后`.git`目录中都发生了些什么。

### 初始化新的代码仓库

    $ git init canai


![初始化代码仓库后](https://raw.github.com/youngsterxyf/youngsterxyf.github.com/master/assets/pics/git-internals/init.png)

发生了什么呢？

- 创建了空目录`.git/objects/`和`.git/refs/`。
- 还没有索引（Index）文件。
- 创建了符号索引文件`HEAD`。

        $ cat .git/HEAD
        ref: refs/heads/master


### 添加新文件

    $ echo "A roti canai project." >> README
    $ git add README


![添加新文件后](https://raw.github.com/youngsterxyf/youngsterxyf.github.com/master/assets/pics/git-internals/new-file.png)

发生了什么呢？

- 创建了索引（Index）文件。它有一个SHA1哈希值指向一个blob实体。

        $ git ls-files --stage
        100644 5f89c6f016cad2d419e865df380595e39b1256db 0 README


- 创建了一个blob实体。README文件的内容存储在该blob中。

        # .git/objects/5f/89c6f016cad2d419e865df380595e39b1256db
        $ git cat-file blob 5f89c6
        A roti canai project.


### 首次提交

    $ git commit -m'first commit'
    [master (root-commit) d9976cf] first commit
     1 files changed, 1 insertions(+), 0 deletions(-)
     create mode 100644 README


![首次提交后](https://raw.github.com/youngsterxyf/youngsterxyf.github.com/master/assets/pics/git-internals/first-commit.png)

发生了什么呢？

- 创建了分支‘master’引用，指向‘master’分支中最新的commit实体。

        $ cat .git/refs/heads/master 
        d9976cfe0430557885d162927dd70186d0f521e8


- 创建了第一个commit实体，指向代码仓库根目录tree实体。

        # .git/objects/d9/976cfe0430557885d162927dd70186d0f521e8
        $ git cat-file commit d9976cf
        tree 0ff699bbafc5d17d0637bf058c924ab405b5dcfe
        author Huiming Teo <huiming@favoritemedium.com> 1306739524 +0800
        committer Huiming Teo <huiming@favoritemedium.com> 1306739524 +0800

        first commit


- 创建了tree实体。该tree代表目录“canai”。

        # .git/objects/0f/f699bbafc5d17d0637bf058c924ab405b5dcfe
        $ git ls-tree 0ff699
        100644 blob 5f89c6f016cad2d419e865df380595e39b1256db  README


### 添加一个修改过的文件

    $ echo "Welcome everyone." >> README
    $ git add README


![添加一个修改过的文件后](https://raw.github.com/youngsterxyf/youngsterxyf.github.com/master/assets/pics/git-internals/modified-file.png)

发生了什么呢？

- 更新了索引（Index）文件。注意到了吗？它记录了一个新blob。

        $ git ls-files --stage
        100644 1192db4c15e019da7fc053225d09dea14bc3ac07 0 README


- 创建了一个新的blob实体。README的整个内容被存入一个新的blob。

        # .git/objects/11/92db4c15e019da7fc053225d09dea14bc3ac07
        $ git cat-file blob 1192db
        A roti canai project.
        Welcome everyone.


### 向子目录中添加文件

    $ mkdir doc
    $ echo "[[TBD]] manual toc" >> doc/manual.txt
    $ git add doc


![向子目录添加文件后](https://raw.github.com/youngsterxyf/youngsterxyf.github.com/master/assets/pics/git-internals/subdir.png)

发生了什么呢？

- 更新了索引（Index）文件。

        $ git ls-files --stage
        100644 1192db4c15e019da7fc053225d09dea14bc3ac07 0 README
        100644 ea283e4fb22719fad512405d41dffa050cd16f9a 0 doc/manual.txt


- 创建了一个新的blob实体。

        # .git/objects/ea/283e4fb22719fad512405d41dffa050cd16f9a
        $ git cat-file blob ea283
        [[TBD]] manual toc


### 第二次提交

    $ git commit -m'second commit'
    [master 556eaf3] second commit
     2 files changed, 2 insertions(+), 0 deletions(-)
     create mode 100644 doc/manual.txt


![第二次提交后](https://raw.github.com/youngsterxyf/youngsterxyf.github.com/master/assets/pics/git-internals/second-commit.png)

发生了什么呢？

- 更新了分支“master”引用，指向该分支中最新的commit实体。

        $ cat .git/refs/heads/master 
        556eaf374886d4c07a1906b9fdcaba195292b96


- 创建了第二个commit实体。注意它的“parent”是指向首个commit实体。这样形成了一个提交图谱。

        $ git cat-file commit 556e
        tree 7729a8b15b747bce541a9752a8f10d57daf221b6
        parent d9976cfe0430557885d162927dd70186d0f521e8
        author Huiming Teo <huiming@favoritemedium.com> 1306743598 +0800
        committer Huiming Teo <huiming@favoritemedium.com> 1306743598 +0800

        second commit


- 创建了一个新的代码仓库根目录tree实体。

        $ git ls-tree 7729
        100644 blob 1192db4c15e019da7fc053225d09dea14bc3ac07  README
        040000 tree 6ff17d485bf857514f299f0bde0e2a5c932bd055  doc


- 创建了一个新的子目录tree实体。

        $ git ls-tree 6ff1
        100644 blob ea283e4fb22719fad512405d41dffa050cd16f9a  manual.txt

### 添加一个注释标签（annotated tag）

    $ git tag -a -m'this is annotated tag' v0.1 d9976


![添加一个注释标签后](https://raw.github.com/youngsterxyf/youngsterxyf.github.com/master/assets/pics/git-internals/annotated-tag.png)

发生了什么呢？

- 创建了一个标签引用，指向一个tag实体。

        $ cat .git/refs/tags/v0.1 
        c758f4820f02acf20bb3f6d7f6098f25ee6ed730


- 创建了一个tag实体。

        $ git cat-file tag c758
        object d9976cfe0430557885d162927dd70186d0f521e8
        type commit
        tag v0.1
        tagger Huiming Teo <huiming@favoritemedium.com> 1306744918 +0800

        this is annotated tag


### 添加一个新的（轻量的）标签

    $ git tag root-commit d9976


![添加一个新的轻量标签后](https://raw.github.com/youngsterxyf/youngsterxyf.github.com/master/assets/pics/git-internals/new-tag.png)

发生了什么呢？

- 创建了一个标签引用，指向一个commit实体。

        $ cat .git/refs/tags/root-commit 
        d9976cfe0430557885d162927dd70186d0f521e8


## 补充阅读

- [Git社区书](http://book.git-scm.com/index.html)“第7章：内部构造探究”
- [Pro Git](http://progit.org/book/ch9-0.html)“第9章：Git内部构造”。

## 接下来做什么呢？

寻找适合分布式团队、长期项目的一个最小化git工作流。
