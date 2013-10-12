---
layout: post
title: 从URL监控问题谈网站Web架构
tag: [监控, 架构, Web, 工作笔记]
---

之前工作中实现了一个对站点进行URL监控的功能。原理是：

- cron脚本定时从一台Nginx服务器上获得Nginx配置文件（包括upstream配置），在解析配置得到：`域名->upstream名`（可能有多个）、`upstream名->属于该upstream的服务器ip列表`，存入数据库；

- 用户通过Web界面配置URL监控项，配置过程为：

  1. 输入要监控的URL，如http://www.sample.com/test.php ，前端JS解析出域名部分www.sample.com，向后端发送AJAX请求，得到该域名相关的upstream；
  2. 用户选择正确的那个upstream（Nginx可以将对不同URL的请求转发到不同的upstream后端机器）
  3. 然后填写监控告警信息接收人等其他配置信息，提交即可。

- 另一个cron脚本定时地:

  1. 从数据库中读取URL监控项数据；
  2. 根据监控项中的upstream名，从数据库中读取属于该upstream的ip列表；
  3. 逐个使用ip列表中的ip替换URL的域名部分，将域名部分作为HTTP请求头的HOST字段的值；
  4. 使用libcurl库或curl命令发出请求（如使用curl命令：`curl -H "www.sample.com" http://192.168.1.1/test.php`）；
  5. 如果响应码非200或非3xx等，则发送告警信息。

这种方式的好处是**不仅能够检测URL指代的web页面或服务是否正常，还能检测提供该web页面或服务的每台服务器是否服务正常**。

该URL监控功能基于的网站Web架构也是上了一定流量的网站通常采用的架构，大致如下图所示：

![nginx-frontend-forward](https://raw.github.com/youngsterxyf/youngsterxyf.github.com/master/assets/pics/nginx_frontend_forward.png)

[高清无码大图](https://raw.github.com/youngsterxyf/youngsterxyf.github.com/master/assets/pics/nginx_frontend_forward.png)

该Web架构中，使用一台Nginx服务器作为统一入口来接收所有请求，对请求进行规则匹配和负载均衡后转发到某台后端实际提供服务的服务器上。**在转发请求之前，该Nginx服务器可能会因为某些原因对请求的某些参数（如请求的头部字段）进行修改**。

从上图也可以看出，该URL监控方式还有一个好处：监控的请求不需要经过Nginx前端转发机。

------

近几天，该URL监控功能出现了误报的问题，原因为：对于某些域名或URL的请求，在经过Nginx前端转发机时被Nginx修改了请求头HOST字段，然后才转发到后端机器，而**后端机器Nginx虚拟主机配置的server_name字段的值是与前端转发机修改后的请求头HOST字段一致的**，而该URL监控功能的请求是绕过前端转发机直接向后端服务器发送请求，请求头HOST字段为URL中的域名部分，与后端服务器Nginx虚拟主机配置的server_name字段的值不一致，所以后端服务器不会接受该请求。


