---
layout: post
title: 电脑重装记
tags: [笔记]
---

一台电脑使用时间长了，速度就会越来越慢，也会越来越“脏”，因为经过时间的积累，电脑里多了很多的软件、文件等，这些文件和软件中很多以后是不需要的，在当时因为各种原因而下载或安装了，那么我们就会经常去清理，但对于有点洁癖的人来说，这是不够的，所以会过段时间后就会选择重装电脑，一切重新开始。当然一般都是等到无法忍受的时候，不得已而为之，为什么呢？因为电脑重装后，要想重新打造成一个令自己满意的使用环境需要花一些时间和精力，所以破旧立新也是需要勇气的。

我笔记本的操作系统是Ubuntu+KDE，从安装使用到现在将近一年了，期间经过7个月的实习，所以将笔记本打造成一个开发环境和测试服务器，Nginx+PHP+Mysql+Memcached啥的都安装全了，还有其他的一些软件都不知道安装了些什么。另外，由于做兴趣项目，我主要选择Python进行开发，对于Python第三方库主要有两种安装方式：一种是使用操作系统本身的软件包管理工具，Ubuntu下即为apt-get；另一种是使用Python的包管理工具，如easy_install，pip。通过这两种方式我的系统里安装了很多大大小小的Python第三方库，也懒得去整理了，所以干脆重装，原来实习时使用的那一套开发环境和测试服务器之后也不一定用得到，并且决定之后所有的Python第三方库全部在virtualenv下安装，保持系统干净。

那么仍旧装Ubuntu呢还是装其它的Linux发行版呢？如ArchLinux、Gentoo Linux。我想这应该看需求，如果你是想折腾系统或不断尝试最新的软件包的话，那当然首选Gentoo，或Archlinux。但因为我只是希望有个稳定的开发环境和使用环境，不想太多折腾，所以决定还是选择Kubuntu。

重装电脑也是个繁琐的过程。

1.
首先需要制作安装盘，由于刻录CD/DVD啥的太麻烦，所以我一般使用[UNetbootin](http://unetbootin.sourceforge.net/)制作U盘安装盘，方便得多。

2.
然后就是保存各种数据：


\* 浏览器书签、扩展程序---可使用浏览器的同步功能；

\* 记录原来系统中安装的软件列表---对于Debian系的Linux，可以使用命令`dpkg --get-selections | awk '{print $1}' > software_list.txt `来得到；

\* 除了使用系统软件包管理工具安装的软件，可能你还手动编译过软件或下载使用免安装的软件，如果以后会用到的话也可以一并保存；

\* 各种软件的配置文件，比如.vimrc，.bashrc，Nginx配置文件等，我是将这些配置文件像代码一样使用版本控制存放在Github上的；

\* 系统环境的各种字体配置，比如vim我使用YaHei Manaco字体，命令行终端使用Source Code Pro字体，其它的主要使用Lucida Sans Unicode字体、WenQuanYi Micro Hei、WenQuanYi Zen Hei和YaHei Consolas Hybrid字体；

\* 最后最重要的就是各种文档音频视频数据。

3.
备份好各种数据后，就可以重装了。

4.
但最耗时间的是怎么把一个刚重装好的系统重新打造成一个自己满意的使用环境，因为如果当初安装某些软件时候没做笔记而又忘了怎么折腾的话，你就又得重新查资料寻找安装方法了。

上述文字记录了我重装电脑之前的一些想法，以及给自己提个醒---不要忘记备份各种数据。

---

安装完成后，遇到如下几个问题：

1.
中文显示不太正常，使用命令`apt-cache search wenquanyi`，找出所有文泉驿开源字体，安装即可。

2.
`pip install gevent`安装gevent，没法正常编译，只好使用`sudo apt-get install python-gevent`

（*2013-03-17补*：先`sudo apt-get install libevent-dev`安装libevent-dev就可以正常编译了）

3.
[powerline-shell](https://github.com/milkbikis/powerline-shell)中的特殊字体在终端中没法正常显示，按照文档说明使用工具[fontpatcher](https://github.com/Lokaltog/vim-powerline/tree/develop/fontpatcher)来生成适用于powerline-shell的字体。可fontpatcher依赖于fontforge，`pip install fontforge`却说找不到fontforge，好吧，还是`sudo apt-get install python-fontforge`安装。然后按照普通字体的安装方式安装即可。

4.
KDE的Nepomuk Semantic Desktop功能耗资源比较厉害，在System Settings -> Desktop Search关闭这项功能。

5.
添加fcitx输入法开机自启动：`cd ~/.kde/Autostart; ln -s /usr/bin/fcitx`

最后附上一张重装后的桌面截图：

<img src="/assets/pics/print-scr.png" alt="print-scr.png">
