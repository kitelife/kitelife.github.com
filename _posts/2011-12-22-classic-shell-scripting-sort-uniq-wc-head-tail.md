---
layout: post
title: 《Classic Shell Scripting》：sort, uniq, wc, head, tail
tags: [Linux, Shell]
---

一.sort
----------

就像awk,cut与join一样，sort将输入看作具有多条记录的数据流，而记录是由可变宽度的字段组成，记录是以换行符作为定界符，字段的定界符则是空白字符或是用户指定的单个字符。

语法

    sort [ options ] [ file(s)]

用途

    将输入行按照键值字段与数据类型选项以及locale排序

主要选项

    -b : 忽略开头的空白
    -c : 检查输入是否已正确地排序。如输入未经排序，但退出码(exit code)为非零值，则不会有任何输出
    -d : 字典顺序，仅文字数字与空白才有意义
    -g : 一般数值，以浮点数字类型比较字段
    -f : 将混用的字母都看作相同大小写，也就是以不管字母大小写的方式排序。
    -i : 忽略无法打印的字符
    -k : 定义排序键值字段
    -m : 将已排序的输入文件，合并为一个排序后的输出数据流
    -n : 以整数类型比较字段
    -o outfile : 将输出写到指定的文件，而非标准输出。如果该文件为输入文件之一，则sort在进行排序与写到输出文件之前，会先将它复制到一个临时的文件。
    -r : 倒置排序的顺序为由大到小，而非默认的由小到大。
    -t char : 使用单个字符char作为默认的字段分隔字符，取代默认的空白字符
    -u : 只有惟一的记录：丢弃所有具有相同键值的记录，只留其中的第一条。只有键值字段是重要的，也就是说，被丢弃的记录其他部分可能是不同值。

行为模式

    sort会读取指定的文件，如果未给定文件，则读取标准输入，再将排序好的数据写至标准输出。

**举例如下**:

    sort -t: -k1,1 /etc/passwd    #以用户名称排序
    sort -t: -k3nr /etc/passwd    #反向UID的排序
    sort -t: -k4n -k3n /etc/passwd   #先以GID排序，再以UID排序

sort排序算法并不稳定，幸好GNU实现了coreutils弥补不足，它可以通过--stable选项补救此问题。

二.uniq
------------

uniq常用于管道中，用来删除已使用sort排序完成的重复记录：sort ... | uniq | ...

范例：

    sort latin-numbers | uniq     #显示唯一的，排序后的记录，重复则仅取唯一行。
    sort latin-numbers | uniq -c  #计数唯一的，排序后的记录
    sort latin-numbers | uniq -d  #仅显示重复的记录
    sort latin-numbers | uniq -u  #仅显示未重复的记录

三.wc
-----------

    echo Testing one two three | wc -c  #计算字节数
    echo Testing one two three | wc -l  #计算行数
    echo Testing one two three | wc -w  #计算字数/单词数

-c选项原本是表示字符数，但因为有多字节字符集的编码存在---像UTF-8，因此在当前系统上，字节数已不再等于字符数了，也因此，POSIX出现了-m选项，用以计算多字节字符，对8位字符数据而言，它等同于-c。

虽然wc最常处理的是来自于管道的输入数据，但它也接受命令行的文件参数，可以生成一行一个结果: wc /etc/passwd /etc/group

四.head and tail
-------------------------

有时，你会需要从文本文件里把几行字---多半是靠近开头或结尾的几行，提取出来。

    head [-n] n [ file(s) ]    #取出文件的前n行

同样功能的命令有:

    awk 'FNR <= n' [ file(s) ]
    sed [-e] nq    [ file(s) ]

\- tail:

    tail [-n] n [ file(s) ]   #取出文件的后n行

