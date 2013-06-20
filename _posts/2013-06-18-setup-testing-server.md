---
layout: post
title: 搭建测试服务器(源码编译方式)
tags: [Linux, PHP, MySQL, Nginx, 服务器, Python, Git]
---

目前工作中开发流程还比较初级，甚至连测试服务器都没有，代码的变更都是直接先在开发人员的本地机器上简单测试一下，然后直接部署到生产服务器上，这就相当于生产服务器同时充当了测试服务器的角色，虽然开发的是面向公司内部的系统，但作为一个有理想有追求的码农，是不允许这样粗糙混乱的开发流程的，所以申请了台服务器，自己搭建个测试服务器。

由于公司的服务器统一使用SUSE Linux Server操作系统，并且版本较老。与Ubuntu、Centos等Linux发行版不同，SUSE Linux没有可用的软件源（不知是否与OpenSUSE的软件源兼容？），即没法使用系统的软件包管理工具。这样问题就很多了。

我选择源码编译的方式来安装所有涉及的软件。也许有人会说，为什么不在网络上查找RPM包然后安装呢？那么先想一下RPM包本质上是个什么东西呢？RPM包（以及DEB包）其实就是将编译好的一些程序以一定的规则打包在一起，然后系统的包管理工具（yum、zypper）按照相同的规则（在依赖满足的情况下）将RPM包里文件复制到指定好的目录里。如果RPM包的依赖没有解决，是无法成功安装的。即使安装好了，若程序依赖的动态链接库等不存在或版本不匹配，也是无法正确运行的，比如libc库的版本过低，但明显你不能轻易替换libc库，因为系统中已安装的很多程序都依赖于libc库。那么相比源码编译方式，RPM包方式的问题更难解决。

需要安装的软件有Nginx、PHP、MySQL、Memcached、Redis、Mongodb、Python2.7（系统上自带了2.4版本，版本过老）、Git、Gitlab、Ruby（Gitlab基于Ruby on Rails实现），运维工具tmux、htop，以及基础依赖库curl（libcurl）、cmake、libxml2、libxslt、openssl、pcre、readline、zlib、ic4c、libevent等。

除Gitlab之外（因为Gitlab是个Web应用）的所有软件编译安装流程都类似：

1. `wget [下载链接]`   # 对于https协议的链接，也许需要添加 `--no-check-certificate` 来避免证书验证。
2. `tar -xvf [软件源码压缩包(*.tar.gz/*.tar)] / unzip [软件源码压缩包(*.zip)]`
3. `cd [源码目录] && ./configure [--prefix=...] [...]`  # openssl的是./config [...]
4. `make && make install`

其中最重要的步骤是`./configure`。在这一步中将指定软件的安装目录，以及其他参数（比如依赖的路径）。可以通过`./configure --help`来查看configure的选项列表，认真阅读一下，看看自己的编译是否需要带上某些选项。

软件在编译过程中可能会自动查找借助某些工具，若找不到可能就会编译失败，其查找的规则一般就是环境变量PATH。所以若发现是因为找不到某些工具软件导致编译失败，那得确认一下系统是否安装该工具，若已安装，则配置一下PATH（`export PATH=$PATH:/path/to/tool/`或`export PATH=/path/to/tool/:$PATH`）。

软件也可能依赖一些动态或静态链接库，其查找规则是`/etc/ld.so.conf`文件中指定的查找路径。编译过程中经常会因为未找到动态链接库而失败，如果该库已存在，可能需配置一下ld.so.conf，将依赖库的路径添加到ld.so.conf中，然后执行ldconfig。

很多时候编译失败了，但你并不知道编译过程尝试过去哪些路径中查找某个依赖库。直接阅读Makefile并修改不是个好主意。这时strace神器就派上用场了。**strace is a system call tracer, i.e. a debugging tool which prints out a trace of all the system calls made by a another process/program**。比如：`strace make`，就会输出大量跟踪信息。当编译因未找到依赖而中止后，回溯输出的跟踪信息，看看make过程找过哪些路径，然后将依赖文件软链接到这些路径中某一个，再重新编译。

从上述4个方面可以解决大多数编译过程中的依赖问题。

------

关于编译安装路径，我个人的看法是，基础依赖库，如openssl、zlib等在configure的时候不使用--prefix选项，即使用默认的安装路径，这样其他依赖于这些基础库的软件编译过程中发生依赖缺失问题的可能性要小一些。若系统原来存在老版本的依赖库，这样的默认安装路径方式一般并不会覆盖老版本文件，所以也不用担心会导致系统中已安装的软件运行存在问题。

------

关于mysql的编译安装过程可参考：[Linux下源码编译MySQL 5.5 与安装过程全记录](http://www.linuxidc.com/linux/2011-08/40087.htm)，过程较为复杂。

------

PHP源码编译默认不会产生php-fpm（PHP-FPM (FastCGI Process Manager) is an alternative PHP FastCGI implementation with some additional features useful for sites of any size, especially busier sites.），从`./configure --help`的输出中可以看到这样几行：

    --enable-fpm              Enable building of the fpm SAPI executable
    --with-fpm-user=USER  Set the user for php-fpm to run as. (default: nobody)
    --with-fpm-group=GRP  Set the group for php-fpm to run as. For a system user, this
                  should usually be set to match the fpm username (default: nobody)

这样只要在configure的时候提供这几个选项就可以启用php-fpm了。

为保证测试服务器上的PHP启用的扩展模块与生产服务器上的PHP一致，可通过phpinfo()函数来获知生产服务器上的PHP在configure编译的时候带了哪些选项。如图所示：

<img src="/assets/pics/php-configure.jpg" alt="php-configure.jpg">

但这样你得额外编译安装zlib、libmcrypt、libpng、freetype等库。

PHP configure的选项特别多。

最后我的configure命令为：

    ./configure --prefix=/usr/local/php --enable-fpm --with-mysql=/usr/local/mysql \
            --with-mysqli=/usr/local/mysql/bin/mysql_config --with-gd --enable-sockets \
            --enable-bcmath --enable-mbstring --enable-zip --with-zlib=/usr/local/zlib \
            --with-mcrypt --with-freetype-dir=/usr --with-curl

PHP安装完成后，可能还需编译安装一些扩展模块，比如：Redis、memcache、APC等。PHP扩展模块的编译安装流程大致如下：

    1. /usr/local/php/bin/phpize
    2. ./configure --with-php-config=/usr/local/php/bin/php-config [...]    # 可通过./configure --help查看该扩展configure可带的选项
    3. make && make install

如果扩展模块最后安装的路径并不是你期望的，则可以将所有编译好的扩展模块统一复制到同一个路径之下，然后修改php.ini（如果不存在，则可在/path/to/php/lib目录下新建一个）中extension_dir一项的值为扩展模块的统一路径，并为每个新增的扩展模块添加一行`extension=xxx.so`，如：

    extension=redis.so
    extension=memcache.so
    extension=apc.so

最后可通过phpinfo()函数来确认是否成功安装扩展。

------

关于Python源码编译，除了可能存在依赖问题外，默认的配置（Modules/Setup.dist）没有启用一些标准库模块，这些模块在实际中又非常基础常用。所以在configure之前需要编辑Modules/Setup.dist文件，启用某些必要的模块（只需去除某些行前`#`符号，稍微阅读一下该文件就知道了），但某些模块又有其他依赖，从而导致Python编译失败，这样的模块可以不启用，所以可能需要多次来回尝试。在make编译结束时的输出信息中会提示哪些必要的模块没有启用，以及哪些模块已启用但编译失败了。你可以忽略这些模块，但之后Python的使用可能会存在一些问题。

------

由于Git可以支持HTTP、GIT、HTTPS、SSH协议，会依赖libssl、libcrypto、libcurl、libmcrypt等库，libssl、libcrypto这两个库都由openssl编译产生，libcurl由curl编译产生。如果未能成功编译ssl支持，也能通过编译，只是在之后的使用中遇到HTTPS协议可能会有问题。如果使用Git遇到HTTPS协议不能成功验证证书时，可以设置`git config --global http.sslVerify false`来避免证书验证。

------

Gitlab是基于Ruby on Rails实现的类Github代码托管平台。其官方的安装教程见：[https://github.com/gitlabhq/gitlabhq/blob/5-0-stable/doc/install/installation.md](https://github.com/gitlabhq/gitlabhq/blob/5-0-stable/doc/install/installation.md)，不同Gitlab版本的安装过程有些不同，链接指向的是5-0-stable版本的安装教程。官方的安装教程是针对Ubuntu/Debian的，其他Linux发行版的安装过程会略有不同。

*由于我对于Ruby以及Ruby on Rails并不了解，以下内容可能有些表述不正确的地方，请注意。*

与Python的pip和easy_install一样，Ruby使用gem来管理第三方库，并通常使用bundle来管理应用的依赖问题（Ruby on Rails就使用bundle来管理依赖），bundle其实又借助了gem。

与Python的pypi以及Linux发行版的软件源一样，RubyGems在世界各地也有很多镜像。为了加快gem安装第三方库的过程，国内可以选择[淘宝的RubyGems镜像](http://ruby.taobao.org/)，更改镜像的方法见[淘宝RubyGems镜像网站](http://ruby.taobao.org/)上的说明。

对于bundle，要想修改它所使用的RubyGems镜像，可以通过编辑应用根目录中的Gemfile文件的第一行`source "http://xxxxx"`来修改。

安装Gitlab过程使用bundle安装Mysql2 gem等依赖时，可能会遇到这种类似的问题：

`
Installing mysql2 (0.3.11) with native extensions
Gem::Installer::ExtensionBuildError: ERROR: Failed to build gem native extension.
`

这是由于gem未找到mysql的一些头文件，即include目录中的文件。在Ubuntu/Debian中，可能可以通过`sudo apt-get install libmysqlclient-dev`来解决问题（可以通过系统包管理器安装的软件的dev包，其实就是源码编译安装后include目录中的内容）。对于我所处的系统环境，只能想法子让gem能找到include目录。

执行`bundle install [...]`后，找到mysql2 gem的目录，比如在我的Gitlab中路径为`gitlab/vendor/bundle/ruby/1.9.1/gems/mysql2-0.3.11`，再查看从子目录`ext/mysql2`中的extconf.rb文件，文件中有这样一段：

    dirs = ENV['PATH'].split(File::PATH_SEPARATOR) + %w[
    /opt
    /opt/local
    /opt/local/mysql
    /opt/local/lib/mysql5
    /usr
    /usr/local
    /usr/local/mysql
    /usr/local/mysql-*
    /usr/local/lib/mysql5
    ].map{|dir| "#{dir}/bin" }

我bundle install的时候之所以失败，是因为我把mysql安装到了/usr/local/mysql56目录，所以gem找不到mysql的include目录。直接在extconf.rb文件中添加mysql安装路径是没用的，因为每次执行bundle install都会重新生成该文件，所以我执行`cp -r /usr/local/mysql56 /usr/local/mysql`来创建了mysql目录，应该也可以通过软链接来实现。

其他某些gem依赖可能也会有这样的问题，可以通过这样类似的方式解决。


Ubuntu/Debian中安装nginx后，在nginx配置目录/etc/nginx中会自动生成sites-available、sites-enabled这两个目录，这两目录的关系是这样的：在sites-available目录中为每个可能需要nginx服务的应用编写一个虚拟主机配置文件（对于nginx配置即server模块），若某个应用现在需要nginx服务，则将它的配置文件从sites-available软链接到sites-enabled，而nginx的主配置文件nginx.conf的http模块的最后通过`include sites-enabled/*`将sites-enabled中所有的软链接配置文件包含进来。这种方式的好处在于模块化配置文件，非常灵活方便。但在SUSE中编译安装后，conf目录下并没有这两个目录，所以只能自己创建，并修改nginx.conf的http模块最后手动添加`include sites-enabled/*`一行即可。

之后在试用Gitlab时，发现无法查看代码文件中的内容，通过浏览器的开发者工具看到是个500 Server Error响应。查看gitlab/log目录中的unicorn.stderr.log日志文件，有如下错误信息：

    ActionView::Template::Error (Failed to get header.):
    9:   .file_content.code
    10:     - unless blob.empty?
    11:       %div{class: user_color_scheme_class}
    12:         = raw blob.colorize(formatter: :gitlab)
    13:     - else
    14:       %p.nothing_here_message Empty file
    app/models/tree.rb:6:in `colorize'
    app/views/tree/blob/_text.html.haml:12:in `_app_views_tree_blob__text_html_haml__128024721089489703_57418280'
    app/views/tree/_blob.html.haml:9:in `_app_views_tree__blob_html_haml__1829533197002461340_55995660'
    app/views/tree/_tree.html.haml:16:in `_app_views_tree__tree_html_haml___4517474428772753218_46927720'
    app/views/tree/show.html.haml:4:in `_app_views_tree_show_html_haml__3020201194833589280_44750920'
    app/controllers/tree_controller.rb:17:in `show'

查看网络资料可以知道这是由于代码高亮渲染的时候出了问题。Gitlab使用pygments.rb来高亮代码。pygments.rb是**Ruby wrapper for the Python [pygments syntax highlighter](http://pygments.org/)**。那么，高亮渲染失败可能有三种可能：(1)未找到合适的Python版本，pygments.rb依赖于Python 2.5+，(2)没有安装Python的pygments第三方库，(3)其他原因。很不幸，我遇到的是第三种可能。官方[Trouble-Shooting-Guide](https://github.com/gitlabhq/gitlab-public-wiki/wiki/Trouble-Shooting-Guide)对于该问题给出[解决方案](https://github.com/gitlabhq/gitlabhq/issues/2214#issuecomment-11137058)是针对第一种可能的。

在pyments.rb gem目录`gitlab/vendor/bundle/ruby/1.9.1/gems/pygments.rb-0.4.2`的子目录`lib/pygments`中有(且仅有)一个可执行的python源码文件mentos.py，pygments.rb应该就是通过该程序文件调用Python的pygments库来高亮代码的，我尝试执行该文件，执行失败，原因是标准库json的某行代码中对象调用了encode('hex')方法失败，提示不存在hex编码。经分析查找原因，问题出在标准库模块[binascii](http://docs.python.org/2/library/binascii.html)(The binascii module contains a number of methods to convert between binary and various ASCII-encoded binary representations)未编译安装。该模块需要编辑Modules/Setup.dist文件启用。启用后（可能还有其他相关模块，我是把其他很多模块一起启用了）重新编译Python就可以了。

------

源码编译安装软件遇到最多的问题是依赖缺失，有时会非常繁琐。经过这次经历，我深感操作系统的软件包管理器是多么的重要，能节省我们很多很多时间和精力！
