# other

* 拟态

[在线设计网址](https://neumorphism.io/#ffffff)

* opacity、visibility、display: none

使用 opacity 和 visibility 属性时，元素还是会占据页面空间的；而使用 display 属性时，元素不占据页面空间

使用 opacity 和 display 属性时，子元素设置的 opacity 和 display 属性不起作用的；而使用 visibility 属性时，子元素如果设置为 visibility: visible;仍可以继续显示出来

使用 visibility 和 display 属性，自身的事件不会触发，而使用 opacity 属性，自身绑定的事件还是会触发的

visibility 和 display 属性是不会影响其他元素触发事件的，而 opacity 属性 如果遮挡住其他元素，其他的元素就不会触发事件了

dispaly 属性会产生回流，而 opacity 和 visibility 属性不会产生回流

dispaly 和 visibility 属性会产生重绘，而 opacity 属性不一定会产生重绘

 opacity 和 visibility 属性支持transition；而使用 display 属性不支持

* 贝叶尔曲线[在线查看器](http://yisibl.github.io/cubic-bezier/)

* clip-path[生成器](https://www.html.cn/tool/css-clip-path/)
