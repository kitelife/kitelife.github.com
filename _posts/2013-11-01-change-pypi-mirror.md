---
layout: post
title: 修改PyPI源
tags: [Python, PyPI, pip, easy_install, ssl]
---

使用easy_install或pip安装Python第三方库，默认的源地址是：https://pypi.python.org/simple/ 。使用该源有两个问题:

1.
国内访问速度较慢

2.
由于该源使用https协议，若机器上没有安装openssl或ssl配置不对，将导致easy_install或pip访问该源失败

若想解决这两个问题，可以使用国内的PyPI镜像源。

从 [http://www.pypi-mirrors.org/](http://www.pypi-mirrors.org/) 可以看到国内的PyPI镜像源主要有三个:

- e.pypi.python.org
- pypi.douban.com
- pypi.hustunique.com

------

修改easy_install和pip使用的源有两种方式（以Linux上从镜像源e.pypi.python.org下载安装requests为例）：

**命令方式：针对一次使用，临时修改**

- easy_install

        easy_install -i http://e.pypi.python.org/simple requests

- pip

        pip install requests -i http://e.pypi.python.org/simple

注：*1. 源路径要包含/simple部分；2. 使用pip时-i参数应放在install xxx的后面*

**修改（若没有，则创建）easy_install/pip的配置文件** 

- easy_install：在`~/.pydistutils.cfg`配置文件中写入如下内容：

        [easy_install]
        index_url = http://e.pypi.python.org/simple

- pip：在`~/.pip/pip.conf`配置文件中写入：

        [global]
        index-url = http://e.pypi.python.org/simple

------

### 参考

- [修改easy_install和pip的镜像地址](http://www.lidaren.com/archives/886)
- [easy_install](http://pythonhosted.org/setuptools/easy_install.html)
- [pip configuration](http://www.pip-installer.org/en/latest/configuration.html)
