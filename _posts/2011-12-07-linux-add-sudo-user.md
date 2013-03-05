---
layout: post
title: Linux添加sudo用户权限
tags: [linux]
---

Linux中很多命令需要使用超级用户权限，在这些命令前添加sudo然后直接执行是很方便的。

那么就先要将自己的用户名添加到sudoers中：

- 使用su命令切换到超级用户(在提示后输入root的密码)
- 使用visudo命令(编辑/etc/sudoers文件)，也可以直接使用编辑器编辑
- 找到root ALL=(ALL) ALL 这一行，在其下面一行添加xxx ALL=(ALL) ALL，其中xxx为你的用户名

- 保存即可起效
