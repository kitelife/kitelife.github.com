---
layout: post
title: 从URL监控问题谈网站Web架构
tag: [监控, 架构, Web, 工作笔记]
---

之前工作中实现了一个对站点进行URL监控的功能。原理是：

- cron脚本定时从一台Nginx服务器上获得Nginx配置文件（包括upstream配置），在解析配置得到：`域名->upstream名`（可能有多个）、`upstream名->属于该upstream的服务器ip列表`，存入数据库；

- 用户通过Web界面配置URL监控项，配置过程为：

  1. 输入要监控的URL，如http://www.sample.com/test.php ，前端JS解析出域名部分www.sample.com，向后端发送AJAX请求，得到该域名相关的upstream；
  2. 用户选择正确的那个upstream（Nginx可以将对不同URL的请求转发到不同的upstream后端机器）；
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

近几天，该URL监控功能出现了误报的问题，原因为：对于某些域名或URL的请求，在经过Nginx前端转发机时被Nginx修改了请求头HOST字段，然后才转发到后端机器，而**后端机器Nginx虚拟主机配置的server\_name字段的值是与前端转发机修改后的请求头HOST字段一致的**，而该URL监控功能的请求是绕过前端转发机直接向后端服务器发送请求，请求头HOST字段为URL中的域名部分，与后端服务器Nginx虚拟主机配置的server_name字段的值不一致，所以后端服务器不会接受该请求。

那么怎样在保持该URL监控方式的三大好处的前提下解决该问题呢？

目前我能想到的就是**编写程序从Nginx配置文件中解析得什么样的请求被修改了头部HOST字段**，但这个难度又实在太大，不可行，了解Nginx的人应该知道Nginx配置可以有多灵活多复杂。

换个思路想想，URL监控的目的是什么？**是监控服务于特定URL的所有服务器都正常，还是仅监控特定URL服务是否正常？**

个人认为，URL监控的目的应该是**监控特定URL服务是否正常**，而**实际提供该URL服务的每台后端服务器是否工作正常，应该通过心跳检测、服务器上的进程监控程序、Nginx前端转发机负载均衡状态等来监控**。这样，也就绕过了上述的问题。

------

上述问题的存在一方面也是因为网站的Web架构中有一个前端转发机，那么为什么要有这个前端转发机呢？好处是什么？弊处又是什么？若有弊处，如何解决？

个人理解，好处主要有如下三点：


- 网络安全

- Nginx提供的负载均衡

- 将系统作为一个整体来看，其提供的服务可以通过GSLB基于用户ip地理信息和运营商，尽可能加速访问速度


### 网络安全

- 前端转发机通过防火墙、Nginx白名单等方式为所有后端服务器提供统一的安全策略；

- 前端转发机将实际提供服务的机器与互联网隔离，后端服务器上代码和数据不会直接受到攻击和窃取。


### Nginx提供的负载均衡

- 对于某些服务，单台后端服务器可能无法支撑负载，基于Nginx的负载均衡功能可以使用多台机器来分流请求。

### 通过GSLB加速整个系统提供的服务

要想利用GSLB进行加速，需要为系统在每个（大）运营商的网络中都部署一台前端转发机，各个前端转发机以专线或者其他有效方式与后端服务器连接。

假设所有前端转发机共享域名x.xxx.com，在记录有该域名信息的DNS服务器上对应该域名就有多个ip。该系统对外提供www.example.com、www.a.example.com、www.b.example.com等站点的服务。用户在访问这几个站点时，域名www.example.com、www.a.example.com、www.b.example.com的DNS解析过程是先将这些域名都CNAME为x.xxx.com，然后查找到x.xxx.com对应的ip返回给用户端。记录x.xxx.com的授权DNS服务器在接收到域名x.xxx.com的DNS请求后，通过与该DNS服务器关联的GSLB控制设备根据请求来自的运营商（以及地理信息等其他信息）得到访问最快的前端转发机ip返回给用户端。

各个前端转发服务器通过Nginx虚拟主机配置的server_name参数和HTTP请求的头部HOST字段来区分对不同站点的请求。

上述环节中，记录x.xxx.com的授权服务器如果放在某个运营商网络里，对于其他运营商网络里的用户，DNS解析过程就会比较慢，从而大大影响了访问速度。一个有效的解决方案是：该DNS服务器同时接入多个运营商网络。

如果网站代码进行动静分离，静态内容通常会采用CDN方式来加速，我想CDN技术也是基于GSLB来实现的吧？

对于有钱的大厂来说，按区域部署IDC后，GSLB更能显示其优势吧？！

------

上图中所示的网站Web架构当然也有其弊处：

- Nginx前端转发机会成为系统单点
- Nginx前端转发机可能会成为系统的性能瓶颈


### 系统单点

对于该问题，可以使用keepalived来实现双机热备。


### 性能瓶颈

如果真的成了性能瓶颈，可以对前端转发机Nginx的功能进行拆分，即尽可能简化前端转发机Nginx的配置，如每个虚拟主机配置为仅转发请求。在前端转发机与后端服务器之间增加一层负载均衡服务器，负载均衡、访问控制、rewrite等功能放在该层完成。演变后的系统结构图如下所示：

![add_load_balance_level](https://raw.github.com/youngsterxyf/youngsterxyf.github.com/master/assets/pics/add_load_balance_level.png)

[高清无码大图](https://raw.github.com/youngsterxyf/youngsterxyf.github.com/master/assets/pics/add_load_balance_level.png)

此外，我想只能加强服务器硬件或者将系统拆分成多个小系统了吧。


------

欢迎拍砖！
