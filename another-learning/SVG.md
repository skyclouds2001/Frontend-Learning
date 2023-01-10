# SVG

阅读 [SVG 从入门到后悔，怎么不早点学起来（图解版）](https://juejin.cn/post/7118985770408345630) 笔记

## 概念

* 位图：放大会失真图像边缘有锯齿；是由像素点组成；前端的Canvas就是位图效果
* 矢量图：放大不会失真；使用 XML 描述图形；前端的svg即是矢量图效果

SVG是矢量图的其中一种格式。它是用 XML 来描述图形的

## 使用方法

* 在浏览器直接打开
* 内嵌到 HTML 中（推荐⭐⭐⭐）
* CSS 背景图（推荐⭐）
* 使用 img 标签引入（推荐⭐）
* 使用 iframe 标签引入（不推荐❌）
* 使用 embed 标签引入（不推荐❌）
* 使用 object 标签引入（不推荐❌）

在 HTML 中使用 SVG ，直接用 `<svg>` 标签即可，可使用 `width` 和 `height` 指定宽高，其默认宽度是 300px ，默认高度是 150px，与 `<canvas>` 标签是一样的

## 基本图形

* 矩形 rect

  默认填充色是黑色

  * x: 左上角x轴坐标
  * y: 左上角y轴坐标
  * width: 宽度
  * height: 高度
  * rx: 圆角，x轴的半径
  * ry: 圆角，y轴的半径

  `<rect width="100" height="100" x="100" y="100" rx="10" ry="10"></rect>`

* 圆形 circle

  * cx: 圆心在x轴的坐标
  * cy: 圆心在y轴的坐标
  * r: 半径

  `<circle cx="250" cy="250" r="100"></circle>`

* 椭圆  ellipse

  * cx: 圆心在x轴的坐标
  * cy: 圆心在y轴的坐标
  * rx: x轴的半径
  * ry: y轴的半径

  `<ellipse cx="475" cy="450" rx="25" ry="50"></ellipse>`

* 直线 line

  * x1: 起始点x坐标
  * y1: 起始点y坐标
  * x2: 结束点x坐标
  * y2: 结束点y坐标
  * stroke: 描边颜色

  需要使用设置 stroke 属性才会有绘制效果

  `<line x1="0" y1="0" x2="500" y2="500" stroke="green"></line>`

* 折线 polyline

  * points: 点集
  * stroke: 描边颜色
  * fill: 填充颜色

  一般将 fill 设置成 none 并设置 stroke 为一个有颜色的值，从而体现折线图形

  `<polyline points="500 0, 100 100, 0 500" stroke="blue" fill="none"></polyline>`

* 多边形 polygon

  * points: 点集
  * stroke: 描边颜色
  * fill: 填充颜色

  多边形 polygon 会自动闭合（自动将起始点和结束点链接起来）

  `<polygon points="500 0, 400 400, 0 500" stroke="none" fill="green"></polygon>`

* 直线路径 path

  在 SVG 里，所有基本图形都是 `<path>` 的简写

  d 属性包含所有描述轮廓的数据，主要用于绘制直线轮廓，包括以下主要的关键字

  * M: 起始点坐标，每个路径都必须以 M 开始
  * L: 轮廓坐标，是一个绝对位置，该关键字可以省略
  * l: 轮廓坐标，是一个相对位置
  * H: 和上一个点的Y坐标相等，是绝对位置
  * h: 和上一个点的Y坐标相等，是相对定位
  * V: 和上一个点的X坐标相等，是绝对位置
  * v: 和上一个点的X坐标相等，相对定位
  * Z: 关闭当前路径，会绘制一条直线回到当前子路径的起点

  关键字后根据类型不同分别附着2、1、0个数字（点的坐标）

  `<path d="M 0 0 L 50 50 L 50 100 L 100 400 L 400 400 L 400 100 L 50 50 Z" stroke="orange" fill="none" ></path>`

  `<path d="M 0 0 l 250 150 l 100 0 l 0 -100 l 50 50 l 50 0 l 0 350 l -350 0 l 0 -50 l -50 -50 l 100 0 l 0 -100 Z" stroke="red" fill="none" stroke-width="5" stroke-dasharray="25 5 10 5" stroke-dashoffset="5" stroke-linecap="round" stroke-linejoin="round"></path>`

  * A 关键字用于绘制椭圆弧 `A(rx, ry, xr, laf, sf, x, y)`

    * rx: 椭圆X轴半径
    * ry: 椭圆Y轴半径
    * xr: 椭圆旋转角度
    * laf: 是否选择弧长较长的那一段。0: 短边（小于180度）; 1: 长边（大于等于180度）
    * sf: 是否顺时针绘制。0: 逆时针; 1: 顺时针
    * x: 终点X轴坐标
    * y: 终点Y轴坐标

    开始点是由 M 决定的，确定2个点（包括开始点），再确定椭圆半径，即可画出2个椭圆，从而共可以切出4条弧线

    `<path d="M 125 75 A 100 50 0 0 0 225 125" stroke="red" fill="none" />`

## 基本属性

### 常见属性类型

* 属性样式  直接设置在元素属性上
* 内联样式  设置在元素 style 属性内
* 内部样式  写在 style 标签内
* 外部样式  写在独立的 css 文件中

### 常见属性类型

* fill    填充颜色，默认值是 #000000，即黑色
* stroke    描边颜色，默认是 transparent，即透明
* fill-opacity    填充颜色的不透明度
* stroke-opacity    描边颜色的不透明度
* stroke-width    描边的宽度
* stroke-dasharray    描边的样式，可以用于设置虚线（接收一串数字，可以用来代表线的长度和空隙的长度，数字之间用逗号或者空格分隔，建议传入偶数个数字）
* stroke-dashoffset    虚线设置偏移量（接收一串数字）
* stroke-linecap    线帽（线的起始点和结束点的位置）样式
  * butt    平头 | 默认
  * round    圆头
  * square    方头
* stroke-linejoin    拐角（折线的交接点）样式
  * miter    尖角 | 默认
  * round    圆角
  * bevel    平角
* shape-rendering    消除锯齿
  * crispEdges    关闭反锯齿功能
  * geometricPrecision    开启反锯齿功能

### 支持颜色值

* 颜色关键字
* 十六进制，支持简写形式
* RGB 和 RGBA
* HSL 和 HSLA

## 其他特殊元素

* 文本元素 text

  SVG 的文本对齐方式是以第一个字基线的左下角为基准

  * font-size 字号，接受一个数字
  * font-weight 粗体
    * normal: 默认（非粗体）
    * bold: 粗体
  * text-decoration 装饰线
    * none：默认（无装饰线）
    * underline: 下划线
    * overline: 上划线
    * line-through: 删除线
  * text-anchor 水平对齐方式
    * start: 左对齐
    * middle: 居中对齐
    * end: 右对齐
  * dominant-baseline 垂直对齐方式
    * auto: 默认的对齐方式，保持与父元素相同的配置。
    * text-after-edge: 在基线上方
    * middle: 居中基线
    * text-before-edge: 在基线下方
  * writing-mode 文字方向
    * tb: 指定为纵向文字

  ```xml
  <text x="250" y="250" fill="pink" font-size="50" font-weight="bold" text-decoration="underline" text-anchor="middle" dominant-baseline="middle">SVG</text>
  ```

* 多行文本 tspan

  tspan 要放在 text 里，而且会继承 text 设置的样式

  ```xml
  <text font-size="25">
    <tspan x="400" y="380">S</tspan>
    <tspan x="400" y="400">V</tspan>
    <tspan x="400" y="420">G</tspan>
  </text>
  ```
* 超链接 a

  ```xml
  <a xlink:href="https://developer.mozilla.org/zh-CN/docs/Web/SVG" xlink:title="svg" target="_blank">
    <text x="50" y="50" font-size="25">SVG</text>
  </a>
  ```

  * xlink:href 链接内容
  * xlink:title 提示信息
  * target 指定新打开页面形式的类型

* 图片 image

  ```xml
  <image xlink:href="https://img.zcool.cn/community/0167b95fc9ea7a11013ee04dc55982.jpg" width="50" height="50" x="100" y="100"></image>
  ```

## 其他资料

* [MDN SVG 参考](https://developer.mozilla.org/zh-CN/docs/Web/SVG)
* [SVG 在前端的7种使用方法](https://juejin.cn/post/7117876752633823269)
* [vertical-align 底线、基线、中线的含义](https://juejin.cn/post/7114690589480157214)
