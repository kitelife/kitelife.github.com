---
layout: post
title: FTP是90年代的，使用Git取代它来部署代码吧！（译）
tags: [Git, 翻译]
---

原文：[FTP is so 90's. Let's deploy via Git instead!](https://coderwall.com/p/xczkaq?&p=1&q=)

译者：[youngsterxyf](https://github.com/youngsterxyf)

首先，在你的服务器上创建一个目录，并在其中初始化一个空的git仓库。我喜欢使用`~/www/`目录来存放网站代码，
因此我会这么做：

    mkdir ~/www/example.com && cd ~/www/example.com
    git init

接着，设置你服务器上的git仓库以便很好地通过`git push`来部署代码。

    git config core.worktree ~/www/example.com
    git config receive.denycurrentbranch ignore

最后，为git设置一个post-receive钩子来检出`master`分支，这样，你的web服务器就可以为那个分支的代码文件服务了。
（记住，`^D`是Control+D，或任何一种你shell的[EOT字符](http://en.wikipedia.org/wiki/End-of-transmission_character)）。

    cat > .git/hooks/post-receive
    #!/bin/sh
    git checkout -f
    ^D
    chmod +x .git/hooks/post-receive

谨记：若需要一个构建过程，你可以在post-receive钩子中添加任何你想要添加的东西。例如，我的sinatra项目其中之一使用了如下的
post-receive钩子：

{% highlight bash %}
#!/bin/sh
git checkout -f
bundle install
touch ~/www/example.com/tmp/restart.txt
{% endhighlight %}

回到你的本地机器，为代码部署准备好你的git仓库。

    cd ~/www/dev/example.com
    git remote add origin \
    ssh://user@example.com/home/user/www/example.com

对于第一次推送代码到服务器，执行如下命令。

    git push origin master

现在，任何时候你想部署本地的变更，只要简单地执行如下命令！

    git push
