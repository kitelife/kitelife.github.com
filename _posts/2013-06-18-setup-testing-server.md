---
layout: post
title: 搭建测试服务器(源码编译方式)
tags: [Linux, PHP, MySQL, Nginx, 服务器, Python, Git]
---

目前工作中开发流程还比较初级，甚至连测试服务器都没有，代码的变更都是直接先在开发人员的本地机器上简单测试一下，然后直接部署到生产服务器上，这就相当于生产服务器同时充当了测试服务器的角色，虽然开发的是面向公司内部的系统，但作为一个有理想有追求的码农，是不允许这样粗糙混乱的开发流程的，所以申请了台服务器，自己搭建个测试服务器。

由于公司的服务器统一使用SUSE Linux Server操作系统，并且版本较老，并且与Ubuntu、Centos等Linux发行版不同，SUSE Linux没有可用的软件源（不知是否与OpenSUSE的软件源兼容？），即没法使用系统的软件包管理工具。这样问题就很多了。

我选择源码编译的方式来安装所有涉及的软件。也许有人会说，为什么不在网络上查找RPM包然后安装呢？那么我想问一下RPM包本质上是个什么东西呢？RPM包（以及DEB包）其实就是将编译好的一些程序以一定的规则打包在一起，然后系统的包管理工具（yum、zypper）按照相同的规则将RPM包里文件复制到指定好的目录里。如果RPM包的依赖没有解决，是无法成功安装的。即使安装好了，若程序依赖的动态链接库等不存在或版本不匹配，也是无法正确运行的，比如libc库的版本过低，但明显你不能轻易替换libc库，因为系统中已安装的很多程序都依赖于libc库。那么相比源码编译方式，RPM包方式的问题更难解决。

需要安装的软件有Nginx、PHP、MySQL、Memcached、Redis、Mongodb、Python2.7（系统上自带了2.4版本，版本过老）、Git、Gitlab、Ruby（Gitlab基于Ruby on Rails实现），运维工具tmux、htop，以及基础依赖库curl（libcurl）、cmake、libxml2、libxslt、openssl、pcre、readline、zlib、ic4c、libevent等。

除Gitlab之外（因为Gitlab是个Web应用）的所有软件编译安装流程都类似：

1. `wget [下载链接]`   # 对于https协议的链接，也许需要添加 `--no-check-certificate` 来避免证书验证。
2. `tar -xvf [软件源码压缩包(*.tar.gz/*.tar)] / unzip [软件源码压缩包(*.zip)]`
3. `cd [源码目录] && ./configure [--prefix=...] [...]`  # openssl的是./config [...]
4. `make && make install`

其中最重要的步骤是`./configure`。在这一步中将指定软件的安装目录，以及其他参数（比如依赖的路径）。可以通过`./configure --help`来查看configure的选项列表，认真阅读一下，看看自己的编译是否需要带上某些选项。

软件在编译过程中可能会自动查找借助某些工具，若找不到可能就会编译失败，其查找的规则一般就是环境变量PATH。所以若发现是因为找不到某些工具软件导致编译失败，那得确认一下系统是否安装该工具，若已安装，则配置一下PATH（export PATH=$PATH:/path/to/tool/或export PATH=/path/to/tool/:$PATH）。

软件也可能依赖一些动态或静态链接库，其查找规则是`/etc/ld.so.conf`文件中指定的查找路径。编译过程中经常会因为未找到动态链接库而失败，如果该库已存在，可能需配置一下ld.so.conf，将依赖库的路径添加到ld.so.conf中，然后执行ldconfig。

很多时候编译失败了，但你并不知道编译过程尝试过去哪些路径中查找某个依赖库。直接阅读Makefile并修改不是个好主意。这时strace神器就派上用场了。**strace is a system call tracer, i.e. a debugging tool which prints out a trace of all the system calls made by a another process/program**。比如：`strace make`，就会输出大量跟踪信息。当编译因未找到依赖而中止后，回溯输出的跟踪信息，看看make过程找过哪些路径，然后将依赖文件软链接到这些路径中某一个，再重新编译。

从上述4个方面可以解决大多数编译过程中的依赖问题。

------

关于编译安装路径，我个人的看法是，基础依赖库，如openssl、zlib等在configure的时候不使用--prefix选项，即使用默认的安装路径，这样其他依赖于这些基础库的软件编译过程中发生依赖缺失问题的可能性要小一些。若系统原来存在老版本的依赖库，这样的默认安装路径方式一般并不会覆盖老版本文件，所以也不用担心会导致系统中已安装的软件运行存在问题。

------

关于mysql的编译安装过程可参考：[Linux下源码编译MySQL 5.5 与安装过程全记录](http://www.linuxidc.com/linux/2011-08/40087.htm)，过程较为复杂。

------

关于Python源码编译，除了可能存在依赖问题外，默认的配置（Modules/Setup.dist）没有启用一些标准库模块，这些模块在实际中又非常基础常用。所以在configure之前需要编辑Modules/Setup.dist文件，启用某些必要的模块（只需去除某些行前`#`符号，稍微阅读一些该文件就知道了），但某些模块又有其他依赖，从而导致Python编译失败，这样的模块可以不启用，所以可能需要多次来回尝试。在make编译结束时的输出信息中会提示哪些必要的模块没有启用，以及哪些模块已启用但编译失败了。你可以忽略这些模块，但之后Python的使用可能会存在一些问题。

------

由于Git可以支持HTTP、GIT、HTTPS、SSH协议，会依赖libssl、libcrypto、libcurl等库，libssl、libcrypto这两个库都由openssl编译产生，libcurl由curl编译产生。如果未能成功编译ssl支持，也能通过编译，只是在之后的使用中遇到HTTPS协议可能会有问题。如果使用Git遇到HTTPS协议不能成功验证证书时，可以设置`git config --global http.sslVerify false`来编译证书验证。

------

