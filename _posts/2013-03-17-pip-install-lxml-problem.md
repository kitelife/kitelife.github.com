---
layout: post
title: pip install lxml编译失败问题解决
tags: [Python]
---

以前在遇到这个问题时，都是偷懒使用`sudo apt-get install python-lxml`（Debian系的Linux发行版）直接安装已打包好的deb包。但一方面这样安装的不是最新的库，另一方面我希望把所有的Python第三方库都限制在virtualenv中使用，所以希望使用`pip install lxml`，那么这个问题就必须解决了。

Google了一把，在[这里](http://stackoverflow.com/questions/5178416/pip-install-lxml-error)找到了解答。

其实在编译失败的log里，已经有提示：

>
>  make sure the development packages of libxml2 and libxslt are installed 
>

所以正确编译需先安装libxml2和libxslt这两个包。

{% highlight bash %}
sudo apt-get install libxml2
sudo apt-get install libxslt
{% endhighlight %}

另外，还需安装Python开发包python-dev：

{% highlight bash %}
sudo apt-get install python-dev
{% endhighlight %}

OK，再执行`pip install lxml`就没问题啦。
