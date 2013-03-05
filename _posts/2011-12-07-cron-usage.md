---
layout: post
title: Linux添加定时任务
tags: [Linux]
---

在Linux下如果希望某个任务定时地执行，一般是使用cron服务器，将任务添加到cron任务列表中。

启动，关闭，重启cron(需超级用户权限)
--------------------------------------

    /etc/init.d/cron start
    /etc/init.d/cron stop
    /etc/init.d/cron restart

注:archlinux下为/etc/rc.d/crond start|stop|restart

查看用户设置的定时任务列表
------------------------------

    crontab [-u xxx] -l       #  xxx为用户名

编辑用户的定时任务列表(超级用户权限)
----------------------------------------

    crontab -u xxx -e

删除用户的定时任务列表(超级用户权限)
-----------------------------------------

    crontab -u xxx -r

定时任务的编辑规则
--------------------------

cron的定时任务由两部分组成：（1）设置的时间（2）该时间下要执行的任务命令。

时间分5个部分，依次为：

    minute              0-59
    hour                0-23 
    day of month        1-31
    month               1-12
    day of week         0-7 (0 or 7 is Sun, or use names)

示例（每天临晨2点备份数据库）
---------------------------------

    0 2 * * * mysqldump -hhostname -uusername -ppassword databasename > backupfile.sql

使设置生效
-------------

设置完成后，重启cron即可使设置的计划任务定时执行了

详细内容参考
----------------

[http://fanqiang.chinaunix.net/system/linux/2005-06-13/3306.shtml](http://fanqiang.chinaunix.net/system/linux/2005-06-13/3306.shtml)

[http://fanqiang.chinaunix.net/adm/storage/2005-03-23/2985.shtml](http://fanqiang.chinaunix.net/adm/storage/2005-03-23/2985.shtml)

[http://now-code.com/archives/196](http://now-code.com/archives/196)
