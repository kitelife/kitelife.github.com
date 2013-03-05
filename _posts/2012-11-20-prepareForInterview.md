---
layout: post
title: 面试准备
tags: [找工作, 面试, 英语]
---

### 自我介绍 ###

我叫夏永锋，目前是一名上海交大的硕士研究生，将于2013年3月毕业。现在作为一名web开发实习生在Google CSR部门实习。实习的工作内容主要包括：开发维护部门旗下的几个网站以及服务器日常运维。

我的老家是江西省婺源县，她非常美丽，有“中国最美的乡村”的美誉。

我喜欢写程序，羽毛球，长跑。我觉得编程是一种乐趣，编程是程序员的魔法。

My name is Xia yongfeng, currently i am a master candidate from School of Software, Shanghai Jiaotong University. And i will graduate in 2013. Now I am a web development intern in Google CSR. The work content of the internship mainly includes the development and maintenance of some websites of our department, as well as the maintenance of web server.

My hometown is WuYuan County in Jiangxi Province. She is so beautiful, resulting reputation as "China's most beautiful countryside."

I love coding, badminton, long-distance running. To me, coding is a pleasure, is just for fun, coding is the magic of programmer.

### 为什么选择我们公司？ ###

微软：也许它是世界上最大的软件公司，并且我喜欢微软的技术。

Microsoft: Maybe it is the biggest software corporation in the world, and i like the technology from Microsoft. I think this is my reason to choose Microsoft.

### 选择你的一个项目介绍一下 ###

那么就来说说我的一个个人小项目吧---简易FTP搜索引擎，这个小项目的由来是因为我们实验室有个ftp服务器，经过很多年的积累，上面的文件非常非常多，也比较乱。如果直接用ftp客户端去查找下载会非常麻烦，所以我就想能不能做个类搜索引擎，能够快速地搜索ftp上的文件，并提供下载。项目主要分成两部分---索引部分和搜索部分，索引部分由服务器端的一个python小程序实现，利用linux内核的文件系统实时监控功能，对ftp目录和文件夹进行实时索引，将索引(包含文件名和ftp下载链接)保存在berkerlyDB中。搜索部分是一个类google主页的搜索网页，用户输入查询关键字，服务器上的一个python CGI脚本接收用户输入，根据输入查询数据库，并返回结果。

I like to talk about a personal small project with you --- a simple FTP search engine. Why do i choose this project？ In our lab，there is a ftp server, existing over several years, many, and more and more files/directories on the server. If we use a ftp client to look for some file and to download it, this will be a terrible thing. So i think why i don't implement a service like search engine to search ftp file and download it quickly. This project can be divided into two main parts --- indexing part and searching part. The indexing part is implemented with a short python program on the server, it use the real-time monitoring function of linux kernel to make real-time index for files and directories in ftp, and store index data(includes filename and download link) into a berkerly DB. And the searching part is a web page like google's main page. user enters keyword for searching, a python cgi script on the server receives the input, then searches the Database, then returns results.
