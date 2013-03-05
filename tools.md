---
layout: page
title: 工具集
---

##VIM

配置文件：[https://github.com/youngsterxyf/mydotfiles](https://github.com/youngsterxyf/mydotfiles)

###插件
- [Vundle](https://github.com/gmarik/vundle)(插件管理)
- [vim-javascript](https://github.com/vim-scripts/vim-javascript)(JavaScript语法高亮与自动缩进)
- [The-NERD-Tree](https://github.com/vim-scripts/The-NERD-tree)(文件系统树状浏览窗口)
- [vim-markdown](https://github.com/plasticboy/vim-markdown)(Markdown格式高亮)
- [awk.vim](https://github.com/vim-scripts/awk.vim)(awk代码自动缩进)
- [jedi-vim](https://github.com/davidhalter/jedi-vim)(Python代码自动完成，对jedi自动完成库的vim绑定)
- [pep8](https://github.com/vim-scripts/pep8)(检查Python源码是否符合PEP8风格)

##Git
###书籍：
* [Pro Git](http://git-scm.com/book/zh/)
* Git Community Book
* [Git Internals](https://peepcode.com/products/git-internals-pdf)
* [Git Reference](http://git-scm.com/docs)

##Latex

##命令行工具与解决方案
- 系统负载监控：top/htop/nmon

- 查看所有进程：`ps -e`或`ps aux`，另外可通过`ps -e | grep name`来模糊查找是否存在特定进程

- 根据进程名终止进程：`sudo pkill process_name`

- 以树状分支罗列目录内容：`tree [dir_name]`

- 大数据传输：1.`scp -P remoteport username@remoteip:remotedir localdir`或`scp -P remoteport localfile username@remoteip:remotedir`；2.scp之外可以使用命令组合：`gzip -c /home/xiayf/data | ssh username@ip "gunzip -c - > /home/xiayf/data"`

- `ping ip -f`：持续不断地ping某台服务器(泛洪？)，可能会ping死那台服务器

- 重装Ubuntu，一个个安装程序太麻烦，可先在原来的Ubuntu上执行`dpkg --get-selections|awk '{print $1}' > o.txt`导出一个所有已安装程序的列表，然后就可以一键安装了：`cat o.txt | xargs sudo apt-get install`

- 打包后，以 gzip 压缩：`tar -zcvf /tmp/etc.tar.gz /etc`；打包后，以 bzip2 压缩：`tar -jcvf /tmp/etc.tar.bz2 /etc`

- 在Linux系统下, 可以用一个命令很容易批量删除.svn的文件夹：`find . -name .svn -type d -exec rm -fr {} \;`

- 查看当前正在监听的网络端口：`lsof -i` 或者 `netstat -tlnp`

- linux下查看某目录占用的空间大小：`du -h -s`或`du -h -s /* | sort`

- python内嵌的简单便捷HTTP Server：`python -m SimpleHTTPServer Port`

- Python命令行美化输出json数据：`python -mjson.tool json_filename`或者通过管道`some_cmd | python -mjson.tool`，也可以直接在命令行使用双引号包围一个json数据字符串来替代json_filename的位置。

- [Linux性能分析工具](/BlackWhite/assets/pics/linux-performance-analysis-tools.png)

- [酷毙的Linux单行命令](http://www.commandlinefu.com/commands/browse/sort-by-votes)

##工具列表

桌面环境：KDE

Shell：Bash

输入法：Fcitx + Google拼音

翻墙：Goagent + Chrome插件SwitchySharp或Firefox插件AutoProxy

命令行窗口复用：tmux

图形化Web浏览器：Google Chrome/Firefox

命令行Web浏览器：lynx

终端：Terminator/Guake

截屏：KSnapshot

虚拟机：VirtualBox

IDE：vim/PyCharm(Python)/Zend Studio(PHP)/CodeBlocks(C/C++)/Eclipse/TeXstudio

屏幕录像：XVidCap

音频播放器：深度音乐播放器/Audacious/[cplay](https://github.com/youngsterxyf/cplay)

视频播放器：VLC/MPlayer/SMPlayer

翻译：Google Translate/有道词典chrome插件

图片浏览：GPicView/Shotwell

数据统计图命令行绘制工具：GnuPlot

PDF阅读器：Okular(支持EPUB格式)

BT下载器：Transmission

FTP客户端：FileZilla

RSS阅读：Akregator/Google Reader

即时通讯(GTalk/MSN)：Pidgin/KDE IM Contacts/WebQQ

办公套件：LibreOffice

日程管理：Trello(Chrome插件+Andriod应用)

数据备份同步：Dropbox(+Andriod应用)(注：[linux下安装使用Dropbox](https://www.dropbox.com/install#linux-install-content))

文档记录与在线编辑：Evernote(+chrome插件Web Clipper+Andriod应用)/Google Drive/Readability(仅可记录阅读，Chrome插件+Andriod应用)
