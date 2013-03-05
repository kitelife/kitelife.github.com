---
layout: post
title: 博大精深的ps命令
tags: [Linux, 命令行, 工具]
---

Linux命令行里如何获取所有的进程号(pid)？

1.
第一种方法是通过ps -e或者ps aux获得所有进程的信息，然后通过管道传给grep或者awk进行数据过滤，比如

    ps -e | awk '{print $1}'

2.
其实通过ps自身的选项就可以实现： 

    ps -eo pid
    
而且输出还是排好序的。

但ps命令在输出进程信息之前先输出一行header，比如ps -e的输出header是：

    PID TTY          TIME CMD

如何去除这个header呢？当然用各种过滤方法可以实现，但ps自身的选项也可以实现：

    ps -eo pid h

或者

    ps -eo pid --no-headers

