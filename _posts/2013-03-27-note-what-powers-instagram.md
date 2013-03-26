---
layout: post
title: 读文笔记：What Powers Instagram
tags: [笔记]
---

原文：[What Powers Instagram: Hundreds of Instances, Dozens of Technologies](http://instagram-engineering.tumblr.com/post/13649370142/what-powers-instagram-hundreds-of-instances-dozens-of)


*该文从多个方面介绍Instagram整个系统栈(stack)的组成，罗列所使用的组件。我觉得重要的不是用了哪些组件和工具，而是在构建一个系统时，应注意哪些问题，从哪些层面对系统进行优化。*


构建系统的核心原则：


- 保持简单

- 不重复造轮子

- 尽可能使用经实践验证可靠的技术


### OS/虚拟主机

在Amazon EC2上运行Ubuntu Linux 11.04。之前的Ubuntu版本在高流量的情况会产生各种不可预料的冻结事件（freezing episodes）。


### 负载均衡

对Instagram的每个请求都会经过负载均衡机器。以前使用两台**Nginx**机器，并在两者之间使用DNS轮循（Round-Robin）。
这种方法的缺点是当有机器退出使用时DNS需要花些时间来更新。后来使用Amazon的Elastic负载均衡器，并在ELB层面终止SSL（注：不太懂这个），
从而降低nginx的CPU负载。


### 应用服务器

Django；多个应用服务器，由于无状态，所以容易横向扩展。

使用[Gunicorn](http://gunicorn.org/)作为WSGI服务器。曾使用mod_wsgi和Apache，但Gunicorn更容易配置，CPU负载更小。

使用[Fabric](http://fabric.readthedocs.org/en/1.3.3/index.html)来一次性在多个虚拟主机实例上运行命令（比如部署代码）。


### 数据存储

大多数数据（用户信息、图片元数据、标签等）都存在PostgreSQL中。将数据切分到多个主机实例上（分区集群shard cluster）。

使用[vmtouch](http://hoytech.com/vmtouch/)来诊断与控制文件系统缓存（即哪些数据在内存中）。

所有PostgreSQL实例都使用流式复制以主-副本配置方式运行，并使用EBS快照频繁备份系统。

使用[Pgbouncer](http://pgfoundry.org/projects/pgbouncer/)作为PostgreSQL的连接池。

图片直接存储在Amazon S3上。使用Amazon CloudFront作为CDN。

广泛使用[Redis](http://redis.io/)，驱动主要的数据源(main feed)、活动数据源(activity feed)、会话系统（[Instagram的Django会话后端](https://gist.github.com/mikeyk/910392)）。也以主-副本设置运行Redis，副本机器不断地将数据库保存到磁盘，并使用EBS快照来备份这些DB转储数据。因为Redis支持写副本，所以在多台Redis机器之间进行在线故障转移（online failover）非常容易。

使用Memcached做缓存，通过pylibmc和libmemcached连接memcached。


### 任务队列与推送通知

任务队列系统：[Gearman](http://gearman.org/)

推送通知：[pyapns](https://github.com/samuraisam/pyapns)，性价比高


### 监控

使用[Munin](http://munin-monitoring.org/)为整个系统的各种指标绘制图表，如果某些指标超出了常规范围会提醒管理员。基于[Python-Munin](http://samuelks.com/python-munin/)编写Munin插件为非系统级的指标绘制图表。

使用[Pingdom](http://pingdom.com/)对服务进行外部监控。

使用[PagerDuty](http://pagerduty.com/)来处理通知和事件。

使用[Sentry](https://pypi.python.org/pypi/django-sentry)来记录Python错误报告，这样任何时候都可以登录系统（实时地）看到系统中正在发生什么错误。
