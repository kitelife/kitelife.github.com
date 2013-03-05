---
layout: post
title: Git操作：强制删除提交到远程版本库的数据与版本记录
tags: [Git, 版本控制]
---

今天因为某些尚不明了的问题导致，博客的Git pages始终构建失败，于是想在远程版本库中删除前几次提交。在[该网页](http://www.douban.com/note/189603387/)上找到了解决方案：

	git reset --hard HEAD~2                   # 取消当前版本之前的两次提交
	git push origin HEAD --force              # 强制提交到远程版本库，从而删除之前的两次提交数据

