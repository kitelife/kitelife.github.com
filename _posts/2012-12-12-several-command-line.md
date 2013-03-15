---
layout: post
title: 几个组合命令
tags: [Linux, 命令行]
---

1.
Debian系Linux下查找某个软件包(以indent为例)：

    apt-cache search indent | awk '{if($1~/^indent$/) print $0}'

APT包管理工具也提供了类似功能的命令选项：

    apt-cache pkgnames 'indent'

只不过这个输出仅有包名没有简介信息。

2.
对当前目录下的所有C源码文件使用indent进行格式化：

    ls | grep '\.c$' | xargs indent

其实如下也是可以的：

    indent *.c

但因为shell会对\*进行展开，如果当前目录下的C源码文件数目很大时，可能会造成命令行长度过长的问题。
