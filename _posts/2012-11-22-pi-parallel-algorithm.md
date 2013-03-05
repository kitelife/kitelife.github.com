---
layout: post
title: pi的一种并行算法
tags: [算法, 并行, Python]
---

我们都知道圆周率pi的值是3.141592653...，那么这个值是怎么算出来的呢？一种方式是通过某种方式算出圆的面积或者周长，然后根据公式$ S = pi \times r^2 $(或$ L = 2 \times pi \times r $)算出pi的值。但如何用计算机通过某种算法计算而得？有没有并行的算法？

[Introduction to Parallel Programming and MapReduce](/assets/files/mapreduce_intro.pdf)一文中介绍了一种基于概率的并行算法---假设有个正方形，里面有个內切圆。

![sample pic](/assets/pics/inscribe.png)

设内切圆的半径为$ r $，则

正方形的面积为$ S_z = 4r^2 $

内切圆的面积为$ S_y = pi \times r^2 $

那么$ pi = \frac{ S_y }{ r^2 } = \frac{ S_y }{ S_z/4 } = \frac{ 4S_y }{ S_z } $

大量生成属于正方形里的随机点(x, y)，并统计属于内切圆范围内的点的出现次数，当次数达到一定量级之后，属于内切圆范围内的点的数目与随机点的总数目的比即为$ \frac{ S_y }{ S_z } $的近似值，再乘以4即为pi的近似值。

并且由于任意两个随机数的生成是相互独立的，所以可以使用多个进程/线程/多个计算机来分别计算一定量的随机数，然后把它们计算所得属于内切圆范围的点的数目相加，再根据公式计算pi值。

假设r的值为单位1，则程序实现如下：

{% highlight py %}
import random
import math
import threading

def worker(taskNum):
    # set r = 1
    global allcount, mutex
    count = 0

    for _ in xrange(taskNum):
        x = random.uniform(-1, 1)
        y = random.uniform(-1, 1)
        if math.sqrt(x**2 + y**2)<=1:
            count += 1
    mutex.acquire()
    allcount += count
    mutex.release()

def main(task_all_num, worker_num):
    global allcount, mutex
    threads = []

    allcount = 0
    mutex = threading.Lock()
    task_num = task_all_num / worker_num
    for _ in xrange(0, worker_num):
        threads.append(threading.Thread(target=worker, args=(task_num,)))

    for t in threads:
        t.start()

    for t in threads:
        t.join()

    print 'pi: ', 4.0 * allcount / task_all_num

if __name__ == '__main__':

    TASKALLNUM = 40000000
    WORKERNUM = 40
    main(TASKALLNUM, WORKERNUM)
{% endhighlight %}

程序总共计算4千万次随机数，使用40个线程，计算得pi近似值为3.141298，由于是基于概率的，所以每次计算所得值会有差异，并且理论上来说随机数生成总次数越大，越精确。
