---
layout: page
title: 工具集
---

##VIM

配置文件：[https://github.com/youngsterxyf/mydotfiles](https://github.com/youngsterxyf/mydotfiles)

[Vim的分屏功能](http://coolshell.cn/articles/1679.html)

###插件
- [Vundle](https://github.com/gmarik/vundle)(插件管理)
- [vim-javascript](https://github.com/vim-scripts/vim-javascript)(JavaScript语法高亮与自动缩进)
- [The-NERD-Tree](https://github.com/vim-scripts/The-NERD-tree)(文件系统树状浏览窗口)
- [vim-markdown](https://github.com/plasticboy/vim-markdown)(Markdown格式高亮)
- [awk.vim](https://github.com/vim-scripts/awk.vim)(awk代码自动缩进)
- [jedi-vim](https://github.com/davidhalter/jedi-vim)(Python代码自动完成，对jedi自动完成库的vim绑定)
- [pep8](https://github.com/vim-scripts/pep8)(检查Python源码是否符合PEP8风格)
- [vim-gitgutter](https://github.com/airblade/vim-gitgutter)(A Vim plugin which shows a git diff in the 'gutter' (sign column). It shows whether each line has been added, modified, and where lines have been removed.)
- [jshint.vim](https://github.com/walm/jshint.vim)（jshint的vim前端插件）
- [vim-powerline](https://github.com/Lokaltog/vim-powerline)(实现更美观、功能更多的vim状态栏)
- [molokai](https://github.com/tomasr/molokai)(Molokai Color Scheme for Vim)
- [indentLine](https://github.com/Yggdroot/indentLine)(缩进线)

##Git
###书籍：
* [Pro Git](http://git-scm.com/book/zh/)
* Git Community Book
* [Git Internals](https://peepcode.com/products/git-internals-pdf)
* [Git Reference](http://git-scm.com/docs)

##Latex

##开发工具

- VIM（主力工具）
- Eclipse（Java/Python）
- PyCharm（Python）
- Zend Studio（PHP）
- CodeBlocks（C/C++）
- Racket（Scheme）
- TeXstudio（Latex）（算开发工具么？）
- Git（源码控制）
- jshint（JavaScript代码检查命令行工具）
- virtualenv（Python虚拟环境）
- IPython（可在virtualenv虚拟环境中通过pip install ipython安装使用）

##命令行工具与解决方案

- 禁用触摸板：`sudo rmmod psmouse`，开启触摸板：`sudo modprobe psmouse`

- 将man手册转换为pdf格式打印出来阅读，如直接将man命令的手册页转换为pdf格式:`man -t man | ps2pdf - > man.pdf`

- 显示进程树：`pstree`

- 更新Python第三方软件包：`pip install -U [package_name]` 

- 从命令行安装.deb文件：`sudo dpkg -i package.deb`

- 打印环境变量：`printenv`

- 查看通过USB接口连接的硬件：`lsusb`

- 查看已安装的软件包：`dpkg --get-selections`

- 由大到小输出home目录下的所有文件（递归的）：`du -a ~/ | sort -n -r | less`

- 每隔x秒执行命令command，显示输出：`watch -n [number_of_seconds] [command]`

- 监听来自端口的网络输入，存入文件中：`netcat -l [recieving_port] > file_copied`

- 将命令的输出通过管道经网络传递给目标ip端口：`[command] | netcat -w [number_of_seconds_before_timeout] [target_ip] [target_port]`

- 使用tar压缩文件并将文件作为流输出，通过管道经网络传递给目标ip端口：`sudo tar -czf - [filename] | netcat -w [number_of_seconds_before_timeout] [target_ip] [target_port]`

- `traceroute`：查看到目标机器/ip的网络路由，如`traceroute www.google.com.hk`

- `nmap`：扫描机器检查开放的网络端口，如`nmap 127.0.0.1`---扫描本地机器的开放端口

- `tee`：在标准输出显示的同时输出到文件，如`ls | tee ls.txt`

- 显示软件包的详细描述信息：`apt-cache show [package_name]`

- `ls`按文件名逆序输出结果：`ls -r`；递归遍历目录：`ls -R`；按时间顺序：`ls -t`，按时间逆序：`ls -tr`；按文件大小排序：`ls -S`。（默认按文件名排序，`-r`表示逆序，`-t`表示按时间排序，`-S`表示按文件大小排序，`-h`表示以方便人阅读的形式输出）

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

- 保存某个virtualenv中已安装的package列表，并在另一个virtualenv中原样恢复：1.`(some_env)$pip freeze > requirements.txt`; 2. `(another_env)$pip install -r requirements.txt`

- [Linux性能分析工具](/assets/pics/linux-performance-analysis-tools.png)

- [酷毙的Linux单行命令](http://www.commandlinefu.com/commands/browse/sort-by-votes)

- [Gnome/KDE键盘快捷键](http://www.novell.com/coolsolutions/tip/2289.html)

##日常使用工具

桌面环境：KDE

Shell：Bash + [powerline-shell](https://github.com/milkbikis/powerline-shell)

输入法：Fcitx + Google拼音

翻墙：Goagent + Chrome插件SwitchySharp或Firefox插件AutoProxy

命令行窗口复用：tmux + tmux-powerline

图形化Web浏览器：Google Chrome/Firefox

命令行Web浏览器：lynx

终端：Terminator

截屏：KSnapshot

虚拟机：VirtualBox

屏幕录像：XVidCap

音频播放器：深度音乐播放器/Audacious/[cplay](https://github.com/youngsterxyf/cplay)

视频播放器：VLC/MPlayer/SMPlayer/深度影音

翻译：Google Translate/有道词典chrome插件

图片浏览：GPicView/Shotwell

数据统计图命令行绘制工具：GnuPlot

PDF阅读器：Okular(支持EPUB格式)

BT下载器：Transmission

FTP客户端：FileZilla

RSS阅读：Akregator/Google Reader

Email阅读：Thunderbird/Gmail

即时通讯(GTalk/MSN)：Pidgin/KDE IM Contacts/WebQQ

办公套件：LibreOffice

日程管理：Trello(Chrome插件+Andriod应用)

数据备份同步：Dropbox(+Andriod应用)(注：[linux下安装使用Dropbox](https://www.dropbox.com/install#linux-install-content))

文档记录与在线编辑：Evernote(+chrome插件Web Clipper+Andriod应用)/Google Drive/Readability(仅可记录阅读，Chrome插件+Andriod应用)
