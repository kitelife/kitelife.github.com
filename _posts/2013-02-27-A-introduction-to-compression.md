---
layout: post
title: 【译文】数据压缩理论简介
tags: [理论, 翻译]
---

原文：[A introduction to compression](http://imrannazar.com/An-Introduction-to-Compression)

译者：[youngsterxyf](https://github.com/youngsterxyf)

最近我在思考GIF和JPEG图片格式之间的不同：为什么某些图片存储为GIF格式所占的磁盘空间更大，而另一些图片以JPEG格式存储要占用更大的磁盘空间？事实证明，这是因为不同的图片格式使用了不同的压缩方法。

压缩是一组程序的简便说法，这些程序能够将数据装进更小的存储空间中，也能将数据从压缩编码中重新取回。这是一个双向的过程：输入文件能够产生经过压缩的输出，并且算法根据压缩后的输出能够重新给你一个输入的拷贝。

##冗余：行程长度编码（Run-Length Encoding）

使压缩成为可能的是冗余：事实表明大多数的数据都以某种方式重复自己。例如，在一个文档中可能多次使用同一个单词，或者一张图片的多处包含相同的颜色。一个非常简单的冗余数据片段的示例如下所示：

> Redundancy: Before compression
> 
> AAAAABBWWWWWWWWWPPPPQZMMMMVVV

在这种情况下，冗余是明显的；整个样本中重复出现了一系列字母。压缩这种数据的一种简单方式是通过重复次数来代表重复出现的字母，从而削减了样本的总长度。

> Redundancy: After compression
>
> A5B2W9P4Q1Z1M4V3

算法读取样本编码后的版本将能够完美地重现原来的数据："A" 5次，"B"
2次，等等。这个简单算法的使用非常广泛，被称为行程长度编码（RLE）：写下字符的每次行程有多长。以古老的PCX图像格式为例来说明一种广泛使用的标准RLE。
<center>
<img src="/BlackWhite/assets/pics/compression-stripes.png"
alt="compression-stripes.png">
</center>
<center>图1：条纹（<a
href="http://www.thisisnotparis.com/">Gottschal</a>/<a
href="http://www.gluecksbazillus.de/">Schuster</a>）</center>

图1中有很多单色的实心方块。这张图片宽500个像素，高190个像素；作为一张原始位图，使用一个字节来表示一个像素，那么这张图片就产生95kB的数据。PCX算法计算图片中每行像素的行程长度，为相同颜色的连续像素保存行程长度：以这种方式，图片的大小减到了52kB。

## 频率：哈夫曼（Huffman）编码

RLE的一个主要问题是它处理的是数据中的连续值：图1中，RLE算法对图片的每个水平行进行独立的处理，然而其实所有的行都是相同的。这个问题可以通过整体地看待数据来缓解，构建一个表来记录在整个数据集中每个值出现的次数。

哈夫曼编码是一种借助这种“频率表”的方法，这种表记录着每个值出现的频率，并且为每一项分配一个编码。频率越高的项编码越短，较少出现的项也就得到长的编码。在计算中，这些编码一般是二进制编码，然后就可以组合成字节进行文件存储。

使用上面的例子，一个哈夫曼编码的过程如下所示：

> Huffman encoding: Before compression
>
> AAAAABBWWWWWWWWWPPPPQZMMMMVVV

<table border="1" align="center" width="40%">
  <tr><th>值</th><th>频率</th><th>编码</th></tr>
  <tr><td>Q</td><td>1</td><td>000000</td></tr>
  <tr><td>Z</td><td>1</td><td>000001</td></tr>
  <tr><td>B</td><td>2</td><td>00001</td></tr>
  <tr><td>V</td><td>3</td><td>0001</td></tr>
  <tr><td>P</td><td>4</td><td>001</td></tr>
  <tr><td>M</td><td>4</td><td>011</td></tr>
  <tr><td>A</td><td>5</td><td>01</td></tr>
  <tr><td>W</td><td>9</td><td>1</td></tr>
</table>
<center>
表1：频率和哈夫曼表
</center>

> Huffman encoding: After compression
>
> 01 01 01 01 01 00001 00001 1 1 1 1 1 1 1 1 1 001 001 001 001 000000 000001 011 011 011 011 0001 0001 0001
>
> UBù$€m±ˆ

使用哈夫曼编码，数据从29个字符减少到10个字节。当然这没包含频率与编码表，这个表必须和压缩后的数据一起存储才有意义；本例中，频率表比压缩后的数据还要大，但在多数情况下，频率表的大小是微不足道的。

当然，将RLE和哈夫曼编码结合使用是可能的，首先执行RLE，然后将压缩后的结果交给哈夫曼算法处理。对于简单的图片，这会产生特别好的结果：上面的图1通过使用GIF文件格式可以从一个95kB的位图压缩成一个4kB的文件，GIF文件格式就是结合使用了RLE，哈夫曼编码以及其他算法。

##感知：有损编码

上述方法可以用于以一种能够完美重现的方式对数据进行压缩。这种压缩的用例包括文档和软件程序，对于这种用例来说，任意值的丢失或损坏都可能使得文件不再有价值。

在特定情况下，对于需要处理的数据进行完美重现是不必要的：一个近似的结果就足够了。通常，这些情况出现在多媒体应用中：超出人类听觉范围的声音不需要记录，人眼无法识别的颜色与梯度的细微之处也无需重现。

一个经典的示例是MPEG音频标准---通过去除高频声音相关的额外数据来降低音频文件的大小。这个标准的Layer-3规格允许多种去除数据的设定，这样渐进地从音频样本中去除更多的信息。

<center>
<img src="/BlackWhite/assets/pics/compression-mp3.gif"
alt="compression-mp3.gif">
</center>
<center>
图2：经MPEG音频Layer-3编码的Yardım Et (<a href="http://www.morveotesi.com/">Mor ve Ötesi</a>, "Dünya Yalan Söylüyor")
</center>

上图2中，两个波形叠加在一起：红色的为原来的歌曲波形，覆盖在其上的蓝色是经充分压缩的变体。展示的样本长度为1.5秒；作为原来波形文件的一部分，这段样本存储为160kB的数据。经压缩的变体，长度相同，但仅占用48kB的空间。

这是通过MPEG音频压缩算法得到的，调整歌曲的频率属性，去除超出人类听力范围（高至大约20kHz）的部分。这样，如上可见，并未显著地影响产生的波形，因此经压缩的声音不会明显地不同于原有的声音。

##扔掉数据：视觉有损编码


