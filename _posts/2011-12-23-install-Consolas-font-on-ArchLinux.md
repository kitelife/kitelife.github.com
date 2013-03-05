---
layout: post
title: ArchLinux上安装Consolas字体
tags: [Linux, font]
---

\- 从[http://www.iplaysoft.com/consolas.html](http://www.iplaysoft.com/consolas.html)下载Consolas字体。

\- 然后

    sudo mkdir -p /usr/share/fonts/yahei
    sudo cp YaHei.Consolas.1.11b.ttf /usr/share/fonts/yahei/

\- 改变权限：

    sudo chmod 644 /usr/share/fonts/yahei/YaHei.Consolas.1.11b.ttf

\- 安装：

    cd /usr/share/fonts/yahei/
    sudo mkfontscale
    sudo mkfontdir
    sudo fc-cache -fv
