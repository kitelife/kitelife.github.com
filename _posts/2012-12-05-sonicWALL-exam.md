---
layout: post
title: 2012校招-sonicWALL的两道编程笔试题
tags: [找工作, 笔试, 编程, 算法]
---

求二叉树中两个结点的最近公共祖先
-----------------------------------

比如：对于树
>
>              A
>            /
>           B
>         /   \
>        C     D
>      /   \
>     E     F
>

结点D，F的最近公共祖先为B

实现：[见源码](https://github.com/youngsterxyf/Data-Structures-and-Algorithms/blob/master/nearest_common_ancestor.c)


求二进制整数部分bits求反后的值
------------------------------------

比如：对于整数0b1001101，将第2(begin)到第5(end)位(从右往左计数)上的bit求反，得到0b1110001。

    
    #include <stdio.h>
    
    int reverse_somebits(int a, int begin, int end)
    {
	    return a^((1<<end)|((1<<end)-1))^((1<<begin)-1);
    }
    
    void ten_to_two(int a)
    {
	    if(a < 2)
		    printf("%d", a);
	    else{
		    ten_to_two(a/2);
		    printf("%d", a%2);
	    }
    }
    
    int main()
    {
	    int a = 0b1001101;
	    int begin = 2, end = 5;
	    printf("0b");
	    ten_to_two(reverse_somebits(a, begin, end));
	    printf("\n");
	    return 0;
    }

注：我的思路没这么简洁，感谢[涛总](https://github.com/tinytitan)提供这么好的方法。
