---
layout: post
title: Windows上安装PHP开发测试环境
tags: [笔记, PHP]
---

先从HTTP请求处理流程图来看看我们所需的PHP开发测试环境包含哪些组件。

<img src="/assets/pics/php-development-env.jpg" alt="PHP开发测试环境">

从图中可以看出系统包含如下几种组件之间的交互：

- Nginx与PHP-CGI(PHP)的交互
- PHP-CGI(PHP)与文件系统、分布式内存对象缓存系统、数据库之间的交互

除了PHP与文件系统之间的交互，其他几种交互均为客户端-服务器模式，以Socket方式进行连接，都需要安装配置相关组件。

对于Nginx与PHP-CGI(PHP)的交互，PHP-CGI默认打开9000端口，等待Nginx转发过来的请求，所以需要在Nginx配置文件中添加类似于如下所示的虚拟主机配置：

    server {
        listen  8000;
        server_name localhost;

        location / {
            root    html;   # 这里为你的网站的根目录
            index   index.php index.html index.htm;
        }

        location ~ \.php$ {
            root    html;   # 这里也设置为你的网站的根目录
            fastcgi_pass    127.0.0.1:9000; # 这里设置为你的PHP-CGI监听的网络地址
            fastcgi_index   index.php;
            fastcgi_param   SCRIPT_FILENAME $document_root$fastcgi_script_name;
            include fastcgi_params;
        }
    }

在Windows上，直接双击运行php-cgi.exe文件打开PHP-CGI服务，貌似没用，可以在CMD中执行`php-cgi.exe -b 127.0.0.1:9000`来打开服务。

对于Nginx.exe，可以直接双击nginx.exe来运行，但如果要停止nginx的运行或者重新加载配置文件，则可以在CMD中执行如下相应的命令：

    nginx -s stop	fast shutdown
    nginx -s quit	graceful shutdown
    nginx -s reload	 changing configuration, starting new worker processes with a new configuration, graceful shutdown of old worker processes
    nginx -s reopen	re-opening log files

另外，Nginx的虚拟主机配置信息中，root指令指定的网站根目录路径应遵从Unix的格式，而不是Windows的格式，即使用**/**而不是**\\**来分割目录层次。

Nginx与PHP的Windows版本可分别从：[Nginx for Windows](http://nginx.org/en/download.html)，[PHP for Windows](http://windows.php.net/download/)。无需安装，解压缩即可。PHP-CGI的可执行文件php-cgi.exe也在PHP的压缩包中。

---

对于分布式内存对象系统，以Memcached和Redis为例。PHP通过扩展包与它们交互，所以需要下载相应的扩展包，并配置PHP。

以PHP 5.3版本为例，可分别从[http://downloads.php.net/pierre/](http://downloads.php.net/pierre/)、[http://blog.phpwind.me/wp-content/plugins/download-monitor/download.php?id=9](http://blog.phpwind.me/wp-content/plugins/download-monitor/download.php?id=9)下载PHP的memcached扩展包与redis扩展包，注意扩展包对应的php版本号必须与你安装的PHP的版本号一致。

解压缩后将php_memcache.dll和php_redis.dll文件复制到PHP的ext目录下。

然后将PHP目录下的php.ini-development文件重命名为php.ini，打开php.ini，首先删除`;extension_dir="ext"`一行行首的分号，然后删除`;extension=php_memcache.dll`一行行首的分号，并在其后添加一行`extension=php_redis.dll`。

对于Memcached和Redis的服务器端程序，可分别从：[Memcached for Windows](http://downloads.northscale.com/memcached-win32-1.4.4-14.zip)、[Redis for Windows](https://github.com/dmajkic/redis/downloads)下载。

Memcached的默认端口为11211。

关于Redis的配置见：[http://redis.io/topics/config](http://redis.io/topics/config)

关于windows下redis和php的redis扩展的安装，可进一步参考[http://blog.phpwind.me/?p=152](http://blog.phpwind.me/?p=152)

---

PHP与MySQL之间的交互，类似于PHP与分布式内存对象系统之间的交互。只不过PHP的压缩包的ext目录下已经包含了`php_mysql.dll`和`php_mysqli.dll`扩展包，只需修改php.ini配置文件即可：删除`;extension=php_mysql.dll`和`;extension=php_mysqli.dll`两行行首的分号。

MySQL的服务器端程序从MySQL官网下载，默认端口为3306。


---

除了上述安装配置，你可能还需要在php.ini中启用`extension=php_mbstring.dll`、`extension=php_soap.dll`等扩展。

---

安装配置完毕后，启动Nginx、PHP-CGI、MySQL（可选）、Redis/Memcached（可选）。在某个Nginx虚拟主机中指定的网站根目录下添加测试文件phpinfo.php，其内容如下：

    <?php
        phpinfo();
    ?>

通过浏览器访问该网页，若PHP环境配置成功，则会看到一个当前PHP环境的详细信息列表，从中可以看到当前所启动的PHP扩展，若未找到memcache、redis、mysql这几个扩展包信息，则说明未成功启用。

---

如果你测试某些以前别人写的PHP代码，发现结果与预期的不相符，则看看是不是那些代码中使用了PHP短标记`<?`和`?>`。PHP默认不启用短标记，所以你需要修改php.ini，删除`;short_open_tag = On`一行之前的分号。

另外，注意Nginx虚拟主机所使用的端口不要和Windows中其他网络应用的端口冲突。
