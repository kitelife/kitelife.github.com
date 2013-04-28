---
layout: post
title: 编译安装MemcacheQ
tags: [笔记, 工作, 服务器, 技术]
---

MemcacheQ是一个MemcacheDB的变种，用来提供简单的消息队列服务。（注：MemcacheDB并不是一个数据缓存解决方案，而是一个为数据持久化设计的分布式的键-值对数据存储系统，采用memcache协议，以BerkeleyDB作为存储后端，[主页](http://memcachedb.org/)）。

MemcacheQ依赖于BerkeleyDB和libevent，所以需先编译安装这两者。

1.
从[Oracle官网](http://www.oracle.com/technetwork/products/berkeleydb/downloads/index.html)上下载某一版本的BerkeleyDB（这里以5.0.32版本为例）

解压缩： `tar -xvf db-5.0.32.tar.gz`

进入db-5.0.32/build_unix目录后执行： 1) `../dist/configure` , 2) `make` , 3) `sudo make install`

默认情况下，会把BerkeleyDB安装到`/usr/local/BerkeleyDB.5.3`目录下。

2.
从[libevent官网](http://libevent.org/)下载libevent, 这里以2.0.21版本为例：

同样解压缩，进入libevent-2.0.21-stable/目录，执行 1) `./configure` , 2) `make` , 3) `sudo make install`

默认情况下，这样会把libevent编译好后的一些库文件放到`/usr/local/lib`目录下。

3.
从[https://code.google.com/p/memcacheq/downloads/list](https://code.google.com/p/memcacheq/downloads/list)下载memcacheq，当前版本为0.2.0。由于memcacheq的configure文件第3571行：`bdbdir="/usr/local/BerkeleyDB.4.7"`，硬编码了依赖于BerkeleyDB 4.7版本，但在Oracle官网上已经不提供4.7版本的下载，所以需要将该处的版本4.7改为之前所编译的BerkeleyDB版本，如5.0。

然后执行 1) `./configure -prefix=/usr/local/memcacheq -enable-threads`（`-prefix`选项指定将memcacheq安装到/usr/local/memcacheq目录下），2) `make` , 3) `sudo make install` 。

4.
在Linux上，memcacheq启动时要想成功动态链接BerkeleyDB和libevent的库文件，得先手动配置动态链接库查找路径：编辑文件`/etc/ld.so.conf`，在末尾添加两行：

    /usr/local/lib
    /usr/local/BerkeleyDB.5.0/lib

保存后，在命令行执行： `ldconfig`即可。

---

启动memcacheq: `/usr/local/memcacheq/bin/memcacheq -d -r -H /tmp/memcacheq -N -R -v -L 1024 -B 1024 > /tmp/mq_error.log 2>&1`

相关选项的含义可以通过`memcacheq -h`来查看。

memcacheq默认打开的网络端口为22201，可通过命令`netstat -tlnp`来查看。

---

若想编写PHP程序来测试使用memcacheq，需要先安装配置PHP [memcache扩展模块](http://cn2.php.net/memcache)，可先通过`php -m | grep memcache`来查看是否已安装。测试程序如下：

{% highlight php %}
<?php
$memcache_obj = memcache_connect('127.0.0.1', 22201);

// push数据进入队列demoqueue1
$set_rs = memcache_set($memcache_obj, 'demoqueue1', 'message body here', 0, 0);
var_dump($set_rs);

// 从队列demoqueue1中pop出数据
$get_rs = memcache_get($memcache_obj, 'demoqueue1');
var_dump($get_rs);

memcache_close($memcache_obj);
?>
{% endhighlight %}

### 参考资料

1. [http://memcachedb.org/memcacheq/](http://memcachedb.org/memcacheq/)

2. [http://memcachedb.org/memcacheq/INSTALL.html](http://memcachedb.org/memcacheq/INSTALL.html)
