---
layout: post
title: 日志信息命令行实时输出
tags: [linux, 命令, 调试]
---

Web开发中很多时候需要边看web服务器的日志输出边调试代码。一般的做法使用tail命令输出日志文件的末尾几行日志信息。

    tail -10 /var/log/nginx/access.log  # 输出末尾10行

但这样的输出是静态的。在这个命令执行之后，日志文件里新增的日志信息无法直接看到。调试的时候，一遍又一遍地使用这样的命令去查询就显得非常麻烦。那有没有办法来监听日志文件的变化，实时输出最新的日志信息呢？ **xtail** 就专为这个问题而存在的。它可以监听文件或者目录(监听目录就是监听该目录下的所有文件)。比如我在写本文时，在另一个命令行窗口里执行：

    xtail ./

那么每次vim保存内容时，那个窗口就会产生事件输出最新的文件内容。

这样在调试web程序的时候就很方便啦。

其实tail本身就支持监听文件并实时命令行输出。在xtail的[项目主页](http://www.unicom.com/sw/xtail)上有这样的说明：

>xtail watches the growth of files. It's like running a tail -f on a bunch of files at once. My favorite usage is:
>
>$ xtail /var/log/\*
>
>You can specify both filenames and directories on the command line. If you specify a directory, it watches all the files in that directory. It will notice when new files are created (and start watching them) or when old files are deleted (and stop watching them).

从中可以看出，tail的-f选项是支持文件监听并实时输出的。tail的man page里说明如下:

>-f, --follow[={name|descriptor}]
>
>   output appended data as the file grows; -f,  --follow,  and --follow=descriptor are equivalent
>
