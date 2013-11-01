---
layout: page
title: 工具集
---

## Sublime Text

### 参考资料：

- [Setting up Sublime Text for Python development](http://dbader.org/blog/setting-up-sublime-text-for-python-development)
- [Sublime Text 2 Documentation](http://www.sublimetext.com/docs/2/)
- [SublimeREPL](http://sublimerepl.readthedocs.org/en/latest/), [Github - SublimeREPL](https://github.com/wuub/SublimeREPL)
- [colorsublime](http://colorsublime.com/)
- [Package Control](https://sublime.wbond.net/)

## VIM

配置文件：[https://github.com/youngsterxyf/mydotfiles](https://github.com/youngsterxyf/mydotfiles)

### 快捷键

- 跳到行尾： `shift + a` , 跳到行首： `shift + b`

- 删除N行： `N + d`，复制N行： `N + yy`

- 跳到最后一行： `G`，跳到第一行： `gg`

- 剪切： `dd`，粘贴： `p`

+ vim + ctags:
  - `Ctrl + ]`自动跳转至定义;
  - `Ctrl + t`返回上一次查看位置。

- 块操作: 1. `^` → 到行头；2. `<C-v>` → 开始块操作；3. `<C-d>` → 向下移动 (你也可以使用hjkl来移动光标，或是使用%，或是别的)；4. `I-- [ESC]` → I是插入，插入“--”，按ESC键来为每一行生效。

### 插件
- [Vundle](https://github.com/gmarik/vundle)(插件管理)
- [vim-javascript](https://github.com/vim-scripts/vim-javascript)(JavaScript语法高亮与自动缩进)
- [The-NERD-Tree](https://github.com/vim-scripts/The-NERD-tree)(文件系统树状浏览窗口)
- [vim-markdown](https://github.com/plasticboy/vim-markdown)(Markdown格式高亮)
- [awk.vim](https://github.com/vim-scripts/awk.vim)(awk代码自动缩进)
- [jedi-vim](https://github.com/davidhalter/jedi-vim)(Python代码自动完成，对jedi自动完成库的vim绑定)
- [pep8](https://github.com/vim-scripts/pep8)(检查Python源码是否符合PEP8风格)
- [vim-gitgutter](https://github.com/airblade/vim-gitgutter)(A Vim plugin which shows a git diff in the 'gutter' (sign column). It shows whether each line has been added, modified, and where lines have been removed.)
- [jshint.vim](https://github.com/walm/jshint.vim)(jshint的vim前端插件)
- [vim-powerline](https://github.com/Lokaltog/vim-powerline)(实现更美观、功能更多的vim状态栏)
- [molokai](https://github.com/tomasr/molokai)(Molokai Color Scheme for Vim)
- [vim-monokai-refined](https://github.com/jaromero/vim-monokai-refined)(Port of Monokai Refined for TextMate/Sublime Text)
- [indentLine](https://github.com/Yggdroot/indentLine)(缩进线)
- [vim-css-color](https://github.com/skammer/vim-css-color)(css显示颜色值代表的颜色)
- [vim-golang](https://github.com/jnwhiteh/vim-golang)(go代码高亮、自动缩进等)

### 资料

[超级牛逼的VIM配置](https://github.com/joedicastro/dotfiles/tree/master/vim)

[spf13-vim - The Ultimate Vim Distribution](http://vim.spf13.com/)

[Learn Vimscript the Hard Way](http://learnvimscriptthehardway.stevelosh.com/)

[VIM标签页（tab）](http://www.pythonclub.org/linux/vim/tabs)

[Vim的分屏功能](http://coolshell.cn/articles/1679.html)

[100 Vim commands every programmer should know](http://www.catswhocode.com/blog/100-vim-commands-every-programmer-should-know)

## Git

### 书籍：
* [Pro Git](http://git-scm.com/book/zh/)
* Git Community Book
* [Git Internals](https://peepcode.com/products/git-internals-pdf)
* [Git Reference](http://git-scm.com/docs)

## Latex

- [LaTeX项目主页](http://www.latex-project.org/)
- [CTEX项目主页](http://www.ctex.org/HomePage)
- [LaTeX编辑部](http://zzg34b.w3.c361.com/index.htm)
- [浙江大学理学院数学系-TeX和LaTex论坛](http://www.math.zju.edu.cn/ligangliu/latexforum/)
- [Tex-StackExchange](http://tex.stackexchange.com/)

### Beamer

- [Beamer theme gallery](http://deic.uab.es/~iblanes/beamer_gallery/) 
- [beamer-theme-matrix](http://www.hartwork.org/beamer-theme-matrix/)
- [如何准备演讲（beamer版）](http://www.bjt.name/2013/01/beamer-presentation/)
- [Beamer演示学习笔记](http://zoho.is-programmer.com/user_files/zoho/File/beamerlog-1112.pdf)
- [A Beamer Quickstart](http://www.math.umbc.edu/~rouben/beamer/)

### 绘图语言与绘图工具

- GnuPlot
- Asymptote
- MetaPost

## 开发工具

- VIM / Sublime Text
- Eclipse（Java/Python）
- JetBrains PyCharm（Python）
- JetBrains PhpStorm <s>Zend Studio</s>（PHP）
- CodeBlocks（C/C++）
- Racket（Scheme）
- Wappalyzer（Chrome、Firefox插件，用于检测网站所使用的技术，非常赞）
- TeXstudio（Latex）（算开发工具么？）
- Git/SVN（源码控制）
- jshint（JavaScript代码检查命令行工具）
- virtualenv（Python虚拟环境）
- IPython（可在virtualenv虚拟环境中通过pip install ipython安装使用）
- ack/codequery（代码搜索工具）

## 命令行工具与解决方案

- （置顶）[命令行乐园](http://www.commandlinefu.com/commands/browse)

- Linux上如何删除文本文件中来自Windows的CRLF(^M)的换行符：`dos2unix filename`

- Windows命令行下查看本地路由表： `route print`

- 系统监控工具：``Glances``，可以监控本机也可以通过客户端服务器模式监控其他机器；Glances提供了基于XML/RPC的API便于其他程序调用，可编程；Glances可以将数据输出保存到csv或html格式的文件方便其他程序处理（报告或绘制图形）。Glances是用Python开发的，使用psutil库来采集系统数据，在用户的终端上实时动态的显示重要的系统数据和变化。显示的数据包括：CPU、内存、磁盘、网络等使用情况，内核、运行队列、负载、I/O 状态、消耗资源最多的进程等等。

- 修改文件编码： `iconv -f encoding -t encoding inputfile`

- 查看防火墙设置（包含防火墙规则绑定的网卡）： `iptables -nvL`

- 使用一行python命令查看/解压缩/创建zip文件：1.查看 - `python -m zipfile -l
test.zip`, 2.解压缩 - `python -m zipfile -e test.zip test`, 3.创建 - `python -m
zipfile -c release.zip *.py`

- 查看所有用户的crontab任务(root权限执行)： `for user in $(cut -f1 -d: /etc/passwd); do echo "### Crontabs for $user ####"; crontab -u $user -l; done`

- 删除当前目录下大小为0的文件，且不进一步递归查找：`find -size 0 -prune -exec rm {} \;`

- 从命令行使用HTTP协议做测试的强大工具：cURL，参考 [9 uses for cURL worth knowing](https://httpkit.com/resources/HTTP-from-the-Command-Line/)

- 追踪命令执行过程中的系统调用和信号： `strace`

- CPU/磁盘/网络等系统资源统计工具： `dstat`（很好很强大，可替代vmstat，iostat，ifstat）

- 查看PHP会动态加载的扩展模块： `php -m`

- 递归查找当前目录下所有名为test.txt的文件： `find ./ -name test.txt`

- Windows上查看端口占用情况：`netstat -ano`

- 查看LINUX发行版的名称及其版本号的命令：1. `cat /etc/issue`；2. `lsb_release -a`；3. `cat /etc/redhat-release`(针对redhat，Fedora)

- [ack-grep](http://betterthangrep.com/) --- 比grep更好用的搜索工具，专为程序员优化

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

- Python命令行美化输出json数据：`python -mjson.tool json_filename`或者通过管道`some_cmd | python -mjson.tool`，也可以直接在命令行使用双引号包围一个json数据字符串来替代json_filename的位置。而且，如果你安装了 Pygments 模块，可以高亮地打印JSON：`echo '{"json":"obj"}' | python -mjson.tool | pygmentize -l json`。

- 保存某个virtualenv中已安装的package列表，并在另一个virtualenv中原样恢复：1.`(some_env)$pip freeze > requirements.txt`; 2. `(another_env)$pip install -r requirements.txt`

- [Linux性能分析工具](/assets/pics/linux-performance-analysis-tools.png)

- [酷毙的Linux单行命令](http://www.commandlinefu.com/commands/browse/sort-by-votes)

- [Gnome/KDE键盘快捷键](http://www.novell.com/coolsolutions/tip/2289.html)

## 日常使用工具

桌面环境：KDE

Shell：zsh + [oh-my-zsh](https://github.com/robbyrussell/oh-my-zsh) <s>Bash + [powerline-shell](https://github.com/milkbikis/powerline-shell)</s>

输入法：Fcitx + Google拼音，ibus拼音

翻墙：Goagent + Chrome插件SwitchySharp或Firefox插件AutoProxy

命令行窗口复用：tmux + tmux-powerline

图形化Web浏览器：Google Chrome/Firefox

命令行Web浏览器：lynx

终端：Terminator

截屏：KSnapshot

虚拟机：VirtualBox

屏幕录像：XVidCap

音频播放器：Songbird/深度音乐播放器/Audacious/[cplay](https://github.com/youngsterxyf/cplay)

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

办公套件：WPS office <s>LibreOffice</s>

日程管理：Trello(Chrome插件+Andriod应用)

思维导图：XMind / www.mindmeister.com / www.wisemapping.com

数据备份同步：Dropbox(+Andriod应用)(注：[linux下安装使用Dropbox](https://www.dropbox.com/install#linux-install-content))

文档记录与在线编辑：Evernote(+chrome插件Web Clipper+Andriod应用)/Google Drive/Readability(仅可记录阅读，Chrome插件+Andriod应用)
