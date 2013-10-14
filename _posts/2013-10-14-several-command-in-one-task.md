---
layout: post
title: 一项工作中涉及的几个命令
tags: [Linux, 命令行]
---

今天写了点shell脚本，在一些Linux服务器上进行了一些操作，涉及如下命令：

### 统计特定进程个数

如统计haproxy进程的个数

    ps -e | grep haproxy | wc -l


### 获取特定进程的pid

如获取haproxy进程的pid

    ps -e | grep haproxy | awk '{print $1}'


### 一对多添加ssh信任关系

如192.168.2.1用户usernameA到192.168.2.x用户usernameB的信任关系

1. 在192.168.2.1创建自己的公钥私钥：

        ssh-keygen -t rsa

提示输入时，全部留空回车。

2. 拷贝192.168.2.1的公钥到192.168.2.x机器上：

        ssh-copy-id "-p 22 usernameB@192.168.2.x"

这里192.168.2.x的sshd服务是开放22端口。

根据提示输入usernameB的密钥后，就会将192.168.2.1上/home/usernameA/.ssh/id_rsa.pub的内容拷贝192.168.2.x的/home/usernameB/.ssh/authorized_keys文件中。

以后通过`ssh -p 22 usernameB@192.168.2.x`访问192.168.2.x时都不在需要输入usernameB的密码。

### 修改网卡ip

如修改网卡eth0的ip。

文件/etc/sysconfig/network-scripts/ifcfg-eth0大致有如下所示内容：

    DEVICE='eth0'
    HWADDR=''
    NM_CONTROLLED='yes'
    ONBOOT='yes'
    IPADDR='192.168.2.193'
    NETMASK='255.255.255.0'
    GATEWAY='192.168.2.1'
    
将IPADDR的值修改为需指定的ip，保存后，执行如下命令：

    service network restart

或

    /etc/init.d/network restart

### 修改系统时间

通过命令`date`可以查看Linux服务器当前的时间，如：

    $ date
    Mon Oct 14 17:44:31 CST 2013

`date`命令加`-s`参数，即可修改系统的时间，如：

    $ date -s "Mon Oct 14 20:44:31 CST 2013"
    Mon Oct 14 20:44:31 CST 2013

在系统启动时，Linux系统将时间从CMOS中读到系统时间变量中，以后修改时间通过修改系统时间实现。为了保持系统时间与CMOS时间的一致性， Linux每隔一段时间会将系统时间写入CMOS。
由于该同步是每隔一段时间（大概是几分钟）进行的，在执行`date -s "xxx"`后，如果马上重启机器，修改时间就有可能没有被写入CMOS,这就是问题的原因。如果要确保修改生效可以执行如下命令：

    clock -w

参考：http://www.blogjava.net/itvincent/archive/2007/08/03/134242.html
