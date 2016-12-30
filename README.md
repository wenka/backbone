# Backbone


## Backbone 简介

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Backbone 为复杂Javascript应用程序提供模型(models)、集合(collections)、视图(views)的结构。

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;backbone.js提供了一套web开发的框架，通过Models进行key-value绑定及custom事件处理,通过Collections提供一套丰富的API用于枚举功能,通过Views来进行事件处理及与现有的Application通过RESTful JSON接口进行交互.它是基于jquery和underscore的一个js框架。

**主要组成**

- Model：创建数据模型，进行数据验证、销毁或者保存。
- collection：model 的集合类。可以增加元素，删除元素，获取长度，排序，比较等一系列工具方法。
- view：绑定 html 模板，绑定页面元素的时间，初始的渲染，模型值改变后的重新渲染和界面元素的销毁等。
- Router：是对路由的处理，就像传统网站通过url现实不同的页面，在单页面应用（SPA）中通过Router来控制前面说的View的展示。

**运行过程**

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;通过Backbone，你可以把你的数据当作Models，通过Models你可以创建数据，进行数据验证，销毁或者保存到服务器上。当界面上的操作引起model中属性的变化时，model会触发change的事件。那些用来显示model状态的views会接受到model触发change的消息，进而发出对应的响应，并且重新渲染新的数据到界面。在一个完整的Backbone应用中，你不需要写那些胶水代码来从DOM中通过特殊的id来获取节点，或者手工的更新HTML页面，因为在model发生变化时，views会很简单的进行自我更新。

中文 API 网址：[http://www.css88.com/doc/backbone/](http://www.css88.com/doc/backbone/)

Backbone 源码：[https://github.com/jashkenas/backbone/](https://github.com/jashkenas/backbone/)

Backbone.js入门教程第二版：[http://www.kancloud.cn/kancloud/backbonejs-learning-note](http://www.kancloud.cn/kancloud/backbonejs-learning-note)