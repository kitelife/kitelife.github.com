---
layout: post
title: python周刊-第70期（译）
tags: [python, python-weekly, 翻译]
---

原文：[issue 70 of Python Weekly](http://us2.campaign-archive1.com/?u=e2e180baf855ac797ef407fc7&id=7fc9a4c2e2&e=59f9a3c7e0)

译者：[youngsterxyf](https://github.com/youngsterxyf)

**文章，教程和讲座(Articles, Tutorials and Talks)**

[使用Python Hacking超级马里奥(Hacking Super Mario Bros. With Python)](http://jakevdp.github.com/blog/2013/01/13/hacking-super-mario-bros-with-python/)

This post shows how you can use matplotlib's animation tool to create animated
gifs based on Super Mario Bros in Python.

该文展示如何使用matplotlib的动画工具使用Python创建超级马里奥的动画效果gif图。

[实现一个Python OAuth 2.0 提供方 - 第2部分 - 授权服务提供方(Implementing a Python OAuth 2.0 Provider - Part2 - Authorization Provider)](http://tech.shift.com/post/40299429203/implementing-a-python-oauth-2-0-provider-part-2)

Last week, the first part covered the Basics of the OAuth 2.0 Authorization
Flow. This second part will walk through how we used pyoauth2 to set up a
minimal Authorization Provider for SHIFT. This post covers setting up endpoints
for steps 2 and 5 from the overview.

上周，第一部分阐述了OAuth 2.0授权的基本流程。
该第二部分将大致讲述怎样使用pyoauth2为SHIFT公司建立一个最基本的授权提供方。该文概述授权流程从第2步到第5步端到端的具体实现。

[优化你的App Engine应用(Optimizing Your App Engine App)](http://proppy-appstats.appspot.com/#1)

In this presentation, Johan Euphrosine, Google Developer Program Engineer,
   shows Datastore pattern and Anti-pattern and how to optimize your App Engine
   App with Appstats.

该演讲稿中，谷歌开发者计划工程师，Johan
Euphrosine，解释了数据存储模式与反模式，以及怎样使用Appstats优化App
Engine应用。

[使用Rmagic来弥补Python统计分析工具包的缺失(Filling in Python's gaps in statistics packages with Rmagic)](http://www.randalolson.com/2013/01/14/filling-in-pythons-gaps-in-statistics-packages-with-rmagic/)

Rmagic is a package which allows you to run R code within the IPython
interface. This post explains how it works.

Rmagic是一个允许通过IPython接口执行R代码的Python包。该文解释了Rmagic是如何工作的。

[使用Filepicker和Twilio实现通过短信息服务发送图片(Sending Images via SMS with Filepicker and Twilio)](http://www.twilio.com/blog/2013/01/sending-images-via-sms-with-filepicker-and-twilio.html)

Filepicker.io provides APIs to connect, process, and store any piece of content
in your web application. For example if you are building an application that
needs to send files or photos to your users via SMS, then you can use
Filepicker.io with Twilio to make this happen. Let's explore how to build this.

Filepicker.io提供API用于连接，处理，以及存储你的web应用中的任何内容。例如，如果你正在构建的应用需要通过短消息服务给用户发送文件或照片，那么你可以使用Filepicker.io配合Twilio来实现。该文探讨了如何构建这一功能。

[Versi教程(Versi Tutorial)](http://lightbird.net/larks/versi.html)

Versi is a clone of the Reversi game. The goal of the game is to capture more
tiles than your enemy. You can capture the enemy's tiles by placing a new piece
on the blank tile so that one or more of enemy pieces are enclosed on a line
between your placed piece and one of your existing pieces.

Versi是黑白棋游戏的克隆版本。这个游戏的目标是比你的敌人捕获更多的棋子。你可以在空白之处放置新棋子来捕获敌人的棋子，这样，一行中，在刚放置的棋子与你原来就有的棋子之间就包围了一个或多个敌人的棋子。

[使用Pandas与Matplotlib进行蒙特卡洛法Web服务器统计分析(Monte Carlo Web-Server Statistics using Pandas and Matplotlib)](http://ganwellresource.blogspot.com/2013/01/monte-carlo-web-server-statistics-using.html)

The author collected the web-server statistic-data by connecting to random web
servers and asking it for its name. He was able to maintain 80'0000 concurrent
connections on linux using tornados ioloop when he hit the limit of the
upstream-bandwidth at home.

通过连接到随机选择的web服务器并请求其名称，作者收集了一些web服务器统计数据。文中说明作者使用tornado的ioloop能够维持80'0000个并发连接，直到达到家庭带宽的上限。

[使用Django，Node.js以及Socket.IO等实现实时应用(Realtime Django Using Node.js and Socket.IO)](http://maxburstein.com/blog/realtime-django-using-nodejs-and-socketio/)

The goal of this post is to show you how to build a realtime chatroom using
Django, Redis, and Socket.IO. At a high level this post will show you how you
can convert your REST based app into a realtime web app.

该文的目的是阐述如何使用Django, Redis,
    以及Socket.IO构建一个实时网络聊天室。从较高层面来看，该文将阐述如何将基于REST的应用转变为实时web应用。

[科学家们在使用哪个版本的Python解释器以及相关的库？(What Python Installations Are Scientists Using?)](http://astrofrog.github.com/blog/2013/01/13/what-python-installations-are-scientists-using/)

This post gives you an overview of the results of a survey conducted to find
out what Python, Numpy, and Scipy versions the Scientists are using.

该文概述了一个调查的结果，该调查旨在找出科学家们正在使用哪个版本的Python解释器，Numpy以及Scipy。

[Python与Django Web开发(Web Development with Python and Django)](http://www.slideshare.net/mpirnat/web-development-with-python-and-django)

Slides from CodeMash 2013 Precompiler session, "Web Development with Python and
Django", including a breezy introduction to the Python programming language and
the Django web framework. The example code repository is available
[here](https://github.com/finiteloopsoftware/django-precompiler/).

来自CodeMash 2013预编译器会议的幻灯片，“Python与Django
Web开发”，生动地介绍了Python程序设计语言和Django
Web框架。示例代码库见[这里](https://github.com/finiteloopsoftware/django-precompiler/)。

[可替代Bash实用脚本的Python脚本(Python Scripts as a Replacement for Bash Utility Scripts)](http://www.linuxjournal.com/content/python-scripts-replacement-bash-utility-scripts)

Instead of replacing a series of bash commands with one Python script, it often
is better to have Python do only the heavy lifting in the middle. This allows
for more modular and reusable scripts, while also tapping into the power of all
that Python offers. Using stdin as a file object allows Python to read input,
     which is piped to it from other commands, and writing to stdout allows it
     to continue passing the information through the piping system. Combining
     information like this can make for some very powerful programs.

相较于使用一个Python脚本来替换一系列的bash命令，仅使用Python来完成其中的重活会更好些。这样的脚本模块化和可复用性更好，同时利用了Python的优势。将标准输入作为一个文件对象来使用，允许Python读取其他命令通过管道提供给它的输入。写到标准输出也允许Python通过管道系统继续传递信息。像这样把信息结合起来能够产生一些非常强大的程序。

[pytest入门(pytest introduction)](http://pythontesting.net/framework/pytest-introduction/)

A post giving you an overview of pytest, a simple example, then throw pytest at
my markdown.py project. It also cover fixtures, test discovery, and running
unittests with pytest.

该文章先概述pytest，而后给出一个简单的示例，并将pytest应用于作者的markdown.py项目。文章也涵盖了Pytest的一些测试夹具，测试发现，以及配合pytest执行unittests。

[PyHacking攻略(PyHacking step by step)](http://raspberry-python.blogspot.com/2013/01/pyhacking-step-by-step.html)

[增强Python Shell以更快速地构建应用，同时减少重复工作(Beefing up the Python Shell to build apps faster and DRYer)](http://benplesser.com/2013/01/10/beefing-up-the-python-shell-to-build-apps-faster-and-dryer/)

[Salt Stack起步---另一个Python实现的配置管理系统(Getting Started with Salt Stack-the Other Configuration Management System Built with Python)](http://www.linuxjournal.com/content/getting-started-salt-stack-other-configuration-management-system-built-python)

[使用Python管理Apple iCloud笔记(Managing Apple iCloud Notes with Python)](http://blog.rootshell.be/2013/01/11/managing-apple-icloud-notes-with-python/)

[如何使用Python实现一个可撤销可重做的Maya命令(How to implement an undoable and redoable Maya command in Python)](http://www.youtube.com/watch?v=BZyXe3MhEyI)

[Python-使用concurrent.futures并行化计算密集型任务(Python - paralellizing CPU-bound tasks with concurrent.futures)](http://eli.thegreenplace.net/2013/01/16/python-paralellizing-cpu-bound-tasks-with-concurrent-futures/)

**有趣的项目，工具和库(Interesting Projects, Tools and Libraries)**

[howdoi](https://github.com/gleitz/howdoi)

Are you a hack programmer? Do you find yourself constantly Googling for how to
do basic programming tasks? Howdoi gives quick answers to many proragmming
questions via the command line.

你是一个程序员新手？你发现自己经常使用Google搜索如何完成一些基本的编程任务？对于许多编程问题，Howdoi能够通过命令行快速地给出答案。

[Baboon Project](http://baboon-project.org/)

Do you waste your time in resolving merge conflicts with your favorite source code manager? Do you want to get rid of "Merge Hell"? Baboon is the solution for you! It's a lightweight daemon that detects merge conflicts before they actually happen. In fact, it detects them in real time.

你还在浪费时间解决你喜爱的源码管理工具中的合并冲突？你想摆脱“合并地狱”么？Baboon就是这样的一个解决方案！它是一个轻量的后台程序，目标是在合并冲突真正发生之前就检测到。事实上，它能够实时检测存在的合并冲突。

[ToPy](https://code.google.com/p/topy/)

ToPy solves the problem to obtain a 2D(or 3D, depending on the input file) solid-void (black and white) solution. The result is (a) an optimally stiff structure for minimum compliance problems, (b) an optimal distribution of two materials for heat conduction problems and (c) an optimal distribution of material for efficient mobility.

ToPy旨在解决获取一个2D（或3D，根据输入文件而定）实-虚（黑和白）结构方案的问题。程序的结果是(a)最小合规问题的一个最佳刚性结构，(b)热传导问题中两种材料的一个最佳分布以及(c)有效流动性问题中材料的一个最佳分布。

[Simple AI](https://github.com/simpleai-team/simpleai)

This lib implements many of the artificial intelligence algorithms described on the book "Artificial Intelligence, a Modern Approach", from Stuart Russel and Peter Norvig. We strongly recommend you to read the book, or at least the introductory chapters and the ones related to the components you want to use, because we won't explain the algorithms here.

这个代码库实现了许多Stuart Russel和Peter Norvig所著“人工智能---一种现代方法”一书中描述的人工智能算法。我们强烈推荐你阅读这本书，或者至少是入门的章节以及与你想要使用的部分相关的章节，因为我们不会解释这些算法。

[Radon](https://github.com/rubik/radon)

Radon is a tool for Python that computes various metrics from the source code.

Radon是一个为Python源码计算多种度量指标的工具。

[Scrappy](https://github.com/louist87/Scrappy)

Python module to rename media collections based on scrapes from thetvdb.com. CLI and GUI tools.

基于从thetvdb.com网站获取的信息对媒体集进行重命名的Python模块。命令行和图形用户界面工具。

[pyelasticssearch](https://github.com/rhec/pyelasticsearch)

pyelasticsearch is a clean, future-proof, high-scale API to elasticsearch.

pyelasticsearch为elasticsearch(译注：一种开源的分布式搜索引擎，官网见http://www.elasticsearch.org/ )提供一个干净的、经得起时间考验的、高可扩展的API。

[import_or_pip](https://github.com/ubershmekel/import_or_pip)

A python module that lets you import a module or pip install it if it isn't found.

该Python模块允许你在程序中import一个模块或者当没找到要import的模块时会使用pip自动安装。

[doko](https://bitbucket.org/larsyencken/doko)

A simple command-line utility (and Python module) to determine your current location.

一个简单的命令行工具（以及Python模块）用于确定你当前的位置。

**书籍(Books)**

[ArcGIS Python脚本编程(Python Scripting for ArcGIS)](http://www.amazon.com/gp/product/1589482824/ref=as_li_qf_sp_asin_tl?ie=UTF8&tag=pythonweekly-20&linkCode=as2&camp=1789&creative=9325&creativeASIN=1589482824)

Python Scripting for ArcGIS is a guide to help experienced users of ArcGIS for Desktop get started with Python scripting. This book teaches how to write Python code that works with spatial data to automate geoprocessing tasks in ArcGIS. Readers can thus learn the skill set needed to create custom tools.

ArcGIS Python脚本编程是一本帮助有经验的ArchGIS桌面用户入门Python脚本编程的指南。该书讲解了如何编写Python代码处理空间数据以自动化ArcGIS中的地理数据处理任务。因此，读者能够学习到一些用于创建定制化工具的技巧。

**即将来临的大事和在线研讨会(Upcoming Events and Webinars)**

[马萨诸塞州,剑桥-2013年1月-波士顿Python会议(Boston Python Meetup January 2013 - Cambridge, MA)](http://meetup.bostonpython.com/events/77229092/)

There will be following two presentations

- Zipline - A new, BSD-licensed quantitative trading system which allows easy backtesting of investment algorithms on historical data.
- Hython - A lisp variant that's fully hosted on and fully interoperable (in both directions) with Python.

将会有以下两个报告

- Zipline - 一个新的、基于BSD许可协议的量化交易系统，允许轻松地对历史数据进行投资算法的事后检验。
- Hython - 一个完全模仿Python语法并完全可与Python互操作（双向的）的lisp变种语言。（译注：是这个[hython](https://github.com/MaskRay/Hython)么？）

[纽约州，纽约-2013年1月-Django-NYC会议(Django-NYC Meetup January 2013 - New York, NY)](http://www.djangonyc.org/events/98408042/)

This month we'll be taking a look at security. Our guide will be Levi Gross from Matasano. Most of the times security talks are boring. They speak about abstract topics like SQL injection and Cross Site Scripting however, rarely do they show you these bugs in the wild (due to the legal concerns). In this talk we will take a practical look at Django's security features and limitations.

本月我们将讨论安全问题。我们的指导者为来自Matasano的Levi Gross。多数时候，关于安全的演讲总是很枯燥。他们谈论SQL注入和跨网站脚本攻击一类的抽象话题，却很少向你展示在真实环境下的这些bug（考虑到法律问题）。本次演讲中我们将从实际出发看看Django的安全特性与限制。
