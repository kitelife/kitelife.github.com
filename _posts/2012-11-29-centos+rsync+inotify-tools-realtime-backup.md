---
layout: post
title: CentOS + rsync + inotify-tools实时备份配置
tags: [服务器, 工具, Linux]
---

现实中，服务器可能会因为各种原因而crash掉，从而造成数据丢失或者服务的暂时不可用。为了提高服务的可用性以及数据的安全性，就需要对数据进行备份，以便数据恢复或者服务的动态切换(将访问请求动态重定向到备份服务器)。

常见的备份方法是定时的rsync任务或者远程拷贝。但这种方式，如果定时的间隔较大，那么服务器宕掉后，还是会丢失部分数据，动态切换的服务也不是宕机前的最新状态。为了支持实时数据同步，Linux 2.6.13 内核中新引入文件系统变化通知机制inotify，一旦对文件系统有改动，就会触发相关事件任务。通过结合rsync，inotify能够很好地完成实时同步任务。

主服务器：1.1.1.1
备份服务器：0.0.0.0

**配置步骤**：

1.
主服务器，备份服务器上安装rsync:

    sudo yum install rsync

2.
主服务器上安装inotify-tools:

    sudo yum install inotify-tools

3.
备份服务器上添加配置文件/etc/rsyncd.conf

    readonly=no
    chroot=no
    uid=root
    gid=root
    hosts allow=1.1.1.1
    hosts deny=0.0.0.0/32
    max connections=10
    log file=/var/log/rsyncd.log
    pid file=/var/run/rsyncd.pid
    lock file=/var/run/rsync.lock
    auth users=tongbu
    secrets file=/etc/rsync.pass
    
    [website1]
    path=/home/yongfeng/apps/website1.org/webroot/upload
    
    [website2]
    path=/home/yongfeng/apps/website2.com/webroot/upload
    
    [website3]
    path=/home/yongfeng/apps/website3.com/webroot/upload

以及配置文件/etc/rsync.pass

    tongbu:somesecurepassword

给密码文件赋权:

    sudo chmod 400 /etc/rsync.pass

（注：tongbu就是用户名，与rsyncd.conf中auth users的值一致。somesecurepassword是密码，会在后面主服务器上的配置密码文件用到）

4.
在备份服务器上创建需要的目录:

    sudo mkdir -p /home/yongfeng/apps/website1.org/webroot/upload
    sudo mkdir -p /home/yongfeng/apps/website2.com/webroot/upload
    sudo mkdir -p /home/yongfeng/apps/website3.com/webroot/upload

5.
在主服务器上添加配置文件/etc/rsync-client.pass：

    somesecurepassword

赋权限:

    chmod 600 /etc/rsync-client.pass

6.
在主服务器上添加要执行的脚本/home/autoscript/rsyncInotify.sh:

    #!/bin/sh
    src[0]='/var/www/apps/website1.org/webroot/upload,website1'
    src[1]='/var/www/apps/website2.com/webroot/upload,website2'
    src[2]='/var/www/apps/website3.com/webroot/upload,website3'

    for item in ${src[@]}; do
        fromdir=`echo $item | awk -F"," '{print $1}'`
        module=`echo $item | awk -F"," '{print $2}'`
        
        /usr/bin/inotifywait -mrq --timefmt '%d/%m/%y %H:%M' --format '%T%w%f' --event modify,delete,move,create,attrib ${fromdir} | while read file event
        do
            echo $event'-'$file
            rsync -avz --delete --password-file=/etc/rsync-client.pass ${fromdir}'/' tongbu@0.0.0.0::${module}
            echo "*******************************"
        done &
    done

赋可执行权限:

    sudo chmod +x rsyncInotify.sh

7.
在备份服务器的防火墙中添加规则以允许rsync服务请求---可通过直接编辑文件/etc/sysconfig/iptables，在文件中添加一行内容：

    -A INPUT -s 1.1.1.1 -p tcp -m tcp --dport 873 -j ACCEPT

8.
备份服务器启动rsync服务:

    sudo /usr/bin/rsync --daemon

9.
主服务器启动rsync+inotify服务:

    sudo /home/autoscript/tongbu/rsyncInotify.sh

10.
在备份服务器上将rsync服务设置为开机自启动服务---直接编辑配置文件/etc/rc.d/rc.local，添加一行内容：

    /usr/bin/rsync --daemon

11.
在主服务器上将rsyncInotify.sh设置为开始自启动---直接编辑配置文件/etc/rc.d/rc.local，添加一行内容：

    /home/autoscript/tongbu/rsyncInotify.sh >> /home/autoscript/tongbu/tongbu.log

**存在的问题**

1.由于rsync命令并没有提供start, stop或者restart等选项，所以想关闭rsync服务，可直接使用sudo pkill rsync杀死rsync服务进程(额，这样是不是过分了点？但我想到的最简便的方法就是这个了)

2.同样rsyncInotify.sh也存在这样的问题，即使使用sudo pkill rsyncInotify.sh杀死了进程还不够，因为rsyncInotify.sh脚本中调用了inotifywait命令，所以还得sudo pkill inotifywait，否则可能会因为inotifywait进程开得太多，而无法正常运行rsyncInotify.sh。

**参考文献**

1.[rsync+inotify实现目录实时同步](http://jasonyu.cn/post/271/)

2.[inotify-rsync实时同步脚本](http://blog.leezhong.com/project/2010/12/13/inotify-rsync.html)

3.[rsync常见错误](http://www.lvtao.net/html/1968.html)
