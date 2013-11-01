---
layout: post 
title: Golang中如何让html/template不转义html标签
tags: [Golang, template, html]
---

近期在使用Golang的[net/http](http://golang.org/pkg/net/http/)和[html/template](http://golang.org/pkg/html/template/)开发一个简单的HAProxy负载均衡任务管理系统（见[搭建高可用负载均衡组件及缓存DNS](http://youngsterxyf.github.io/2013/10/16/high-availability-load-balancer-and-dns/)一文说明）。

[htmp/template](http://golang.org/pkg/html/template/)在渲染页面模板的时候默认会转义字符串中的html标签，但有时我们并不想转义html标签，以下图所示为例：

![add_haproxy_balance_task](https://raw.github.com/youngsterxyf/youngsterxyf.github.com/master/assets/pics/haproxy_task_add.jpg)

![list_haproxy_balance_task](https://raw.github.com/youngsterxyf/youngsterxyf.github.com/master/assets/pics/haproxy_task_list.jpg)

图1中“ip:port列表(一行一个)”和“说明”两个输入框的内容行与行是以`\n`分隔的；图2中，这两部分内容分别在表格的“后端机器列表”和“说明”两列中展示，但行与行其实是以`<br />`分隔的；那么在将数据存入数据库之前或从数据库中取出数据后，会将字符串中的`\n`替换为`<br />`。如果将替换后的数据以字符串类型传入模板，`<br />`标签渲染后的效果就是`<br />`文本而不是换行。

有两种方式避免`html/template`转义html标签：

1.
把字符串类型数据转换成`template.HTML`类型再传入模板进行渲染：

```go
lti := listenTaskInfo{
	Seq:      seq,
	Id:       row.Id,
	Servers:  template.HTML(strings.Join(strings.Split(row.Servers, "-"), "<br />")),
	Vip:      appConf.Vip,
	Vport:    row.VPort,
	Comment:  template.HTML(strings.Join(strings.Split(row.Comment, "\n"), "<br />")),
	LogOrNot: row.LogOrNot,
	DateTime: row.DateTime,
}
```

2.
`html/template`允许根据需要为模板变量添加一个处理函数，在模板解析的时候该函数就能对模板变量做进一步的处理，如：

```
<a href="/search?q={{. | urlquery}}">{{. | html}}</a>
```

`html/template`貌似并没有内置这样的函数让其不转义html标签，但提供了接口让我们按需自定义这类函数。那么我们可以自定义一个函数-在模板解析的时候将模板变量转换成`template.HTML`类型，如（该例子来自[How To Unescape Text In A Golang Html Template](http://coderdave.com/view/how-to-unescape-text-in-a-golang-html-template)）：

```go
func unescaped (x string) interface{} { return template.HTML(x) }
 
func renderTemplate(w http.ResponseWriter, tmpl string, view *Page) {
    t := template.New("")  
	t = t.Funcs(template.FuncMap{"unescaped": unescaped})
	t, err := t.ParseFiles("view.html", "edit.html")
	err = t.ExecuteTemplate(w, tmpl + ".html", view)
	if err != nil {
	    http.Error(w, err.Error(), http.StatusInternalServerError)
	}
}
```

这段代码使得模板解析的时候可以使用unescaped函数将模板变量x转换成`template.HTML`类型，关键是如下两句：

```go
// 定义函数unescaped
func unescaped (x string) interface{} { return template.HTML(x) }
// 在模板对象t中注册unescaped
t = t.Funcs(template.FuncMap{"unescaped": unescaped})
```

这样，在模板中就可以使用unescaped函数了，如：

```go
{{printf "%s" .Body | unescaped}} //[]byte
{{.Body | unescaped}} //string
```

实现不转义HTML标签，本质上，这两种方法是一样的，只不过一种是在字符串传入模板之前将其转换成`template.HTML`类型，另一种是在字符串传入模板之后解析之时转换。

除了`template.HTML`类型，`text/template`还定义了`template.JS`、`template.CSS`等数据类型。

### 参考

- [html/template](http://golang.org/pkg/html/template/)
- [How To Unescape Text In A Golang Html Template](http://coderdave.com/view/how-to-unescape-text-in-a-golang-html-template)
