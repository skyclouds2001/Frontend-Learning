# Canvas

阅读 [Canvas 从入门到劝朋友放弃（图解版）](https://juejin.cn/post/7116784455561248775) 笔记
阅读 [Canvas 从进阶到退学](https://juejin.cn/post/7176055713733541943) 笔记

## 简介

Canvas 中文名叫 “画布”，是 HTML5 新增的一个标签， 允许开发者使用JS在这个标签上绘制各种图案，可用于动画、游戏、数据可视化、图片编辑器、实时视频处理等领域

如果要展示的数据量比较大，比如一条数据就是一个元素节点，那使用 canvas 会比较合适；如果用户操作的交互比较多，而且对清晰度有要求（矢量图），那么使用 svg 会比较合适


| Canvas | SVG |
| --- | --- |
| 用JS动态生成元素（一个HTML元素） | 用XML描述元素（类似HTML元素那样，可用多个元素来描述一个图形） |
| 位图（受屏幕分辨率影响） | 矢量图（不受屏幕分辨率影响） |
| 不支持事件 |	支持事件 |
| 数据发生变化需要重绘 | 不需要重绘 |

## 特性

canvas 有 默认的 宽度(300px) 和 高度(150px)

canvas 元素提供了 width 和 height 两个属性，用于设置元素的宽高，只需传入数字即可

不能通过 CSS 设置画布的宽高，否则会出现内容被拉伸的后果

线条的默认宽度是 1px ，默认颜色是黑色（默认情况下 canvas 会将线条的中心点和像素的底部对齐，可能会导致显示效果是 2px 和非纯黑色问题）

Canvas 使用的是 W3C 坐标系，从上往下，从左往右

## 基础图形

### 直线

```js
cxt.beginPath() // 重新开启一个路径

ctx.moveTo(100, 100) // 起点坐标
ctx.lineTo(200, 200) // 下一个点的坐标


cxt.lineWidth = 20 // 修改直线的宽度
cxt.strokeStyle = 'pink' // 修改直线的颜色
cxt.lineCap = 'round' // 修改直线两端样式

ctx.stroke() // 将上面的坐标用一条线连接起来
```

* lineWidth：线的粗细
* strokeStyle：线的颜色
* lineCap：线帽：默认: butt; 圆形: round; 方形: square

开辟新路径 beginPath()

在绘制多条线段的同时，还要设置线段样式，通常需要开辟新路径，否则样式之间会相互污染

因此在设置 beginPath() 的同时，也各自设置样式

### 折线

```js
ctx.beginPath()

ctx.lineWidth = 1
ctx.strokeStyle = 'black'
ctx.lineCap = 'butt'

ctx.moveTo(50, 200)
ctx.lineTo(100, 50)
ctx.lineTo(200, 200)
ctx.lineTo(250, 50)

ctx.stroke()
```

### 矩形

strokeRect(x, y, width, height)  描边矩形（x和y是矩形左上角起点；width 和 height 是矩形的宽高）

```js
ctx.beginPath()

ctx.strokeStyle = 'green'
ctx.strokeRect(50, 50, 200, 100)
```

fillRect() 填充矩形

```js
ctx.beginPath()

ctx.fillStyle = 'blue'
ctx.fillRect(0, 0, 50, 50)
```

若同时使用 strokeRect() 和 fillRect() ，会产生描边和填充的效果

类似，可以使用rect()绘制矩形，但rect()方法被调用后，不会立刻绘制矩形，而是需要调用 stroke() 或 fill() 辅助渲染

```js
ctx.beginPath()

ctx.strokeStyle = 'red'
ctx.fillStyle = 'pink'
ctx.rect(200, 200, 100, 100)
ctx.stroke()
ctx.fill()
```

使用 clearRect() 方法可以清空指定区域

`ctx.clearRect(225, 225, 50, 50)`

清空画布

`cxt.clearRect(0, 0, cnv.width, cnv.height)`

### 多边形

要绘制直线类型的图形，标记出起始点和每个拐角的点，然后再连线即可

```js
cxt.beginPath()

cxt.moveTo(50, 50)
cxt.lineTo(200, 50)
cxt.lineTo(200, 200)

cxt.closePath()

cxt.lineJoin = 'miter'
cxt.lineWidth = 2

cxt.stroke()
```

使用 cxt.closePath() 可以自动将终点和起始点连接起来

可设置 lineJoin 即线条连接的样式。miter: 默认; bevel: 斜面; round: 圆角

### 圆形半圆及弧线

`arc(x, y, r, sAngle, eAngle，counterclockwise)`

* x 和 y 圆心坐标
* r 半径
* sAngle 开始角度，单位弧度
* eAngle 结束角度，单位弧度
* counterclockwise 绘制方向（true: 逆时针; false: 顺时针），默认 false

```js
cxt.beginPath()
cxt.arc(350, 150, 80, 0, 360 * Math.PI / 180)
cxt.closePath()
cxt.stroke()
```

```js
cxt.beginPath()
cxt.arc(350, 150, 80, 0, 180 * Math.PI / 180)
cxt.closePath()
cxt.stroke()
```

```js
cxt.beginPath()
cxt.arc(400, 200, 100, 0, 30 * Math.PI / 180)
cxt.stroke()
```

`arcTo(cx, cy, x2, y2, radius)`

* cx 两切线交点的横坐标
* cy 两切线交点的纵坐标
* x2 结束点的横坐标
* y2 结束点的纵坐标
* radius 半径

(x1, y1) 是开始点，通常是由 moveTo() 或者 lineTo() 提供

arcTo() 方法利用 开始点、控制点和结束点形成的夹角，绘制一段与夹角的两边相切并且半径为 radius 的圆弧

## 基础样式

* 描边 stroke()
* 线条宽度 lineWidth
  * 默认值是 1，默认单位是 px
* 线条颜色 strokeStyle
* 线帽 lineCap
  * butt  默认值，无线帽
  * square  方形线帽
  * round  圆形线帽
* 拐角样式 lineJoin
  * miter  默认值，尖角
  * round  圆角
  * bevel  斜角
* 设置虚线 setLineDash()
  * 需要传入一个数组，且元素是数值型
  * 使用 cxt.getLineDash() 获取虚线不重复的距离
  * 使用 cxt.lineDashOffset 设置虚线的偏移位
* 填充 fill()
  * 使用 fillStyle 设置填充颜色，默认是黑色

## 文本

* 样式 font
  * `cxt.font = 'font-style font-variant font-weight font-size/line-height font-family'`
* 描边 strokeText()
  * `strokeText(text, x, y, maxWidth)`
  * text 字符串，要绘制的内容
  * x 横坐标，文本左边要对齐的坐标（默认左对齐）
  * y 纵坐标，文本底边要对齐的坐标
  * maxWidth 可选参数，表示文本渲染的最大宽度（px），如果文本超出 maxWidth 设置的值，文本会被压缩
* 设置描边颜色 strokeStyle
* 填充 fillText()
  * `fillText(text, x, y, maxWidth)`
* 设置填充颜色 fillStyle
* 获取文本长度 measureText()
* 水平对齐方式 textAlign
  * start 默认，在指定位置的横坐标开始
  * end 在指定坐标的横坐标结束
  * left 左对齐
  * right 右对齐
  * center 居中对齐
* 垂直对齐方式 textBaseline
  * alphabetic 默认，文本基线是普通的字母基线
  * top 文本基线是 em 方框的顶端
  * bottom 文本基线是 em 方框的底端
  * middle 文本基线是 em 方框的正中
  * hanging 文本基线是悬挂基线

## 图片

一种是在JS里加载图片再渲染，另一种是把DOM里的图片拿到 canvas 里渲染

渲染方式

`drawImage(image, dx, dy)`

* image 要渲染的图片对象
* dx 图片左上角的横坐标位置
* dy 图片左上角的纵坐标位置

`drawImage(image, dx, dy, dw, dh)`

* dw 用来定义图片的宽度
* dh 用来定义图片的高度

`drawImage(image, sx, sy, sw, sh, dx, dy, dw, dh)`

* sx 开始截取的横坐标
* sy 开始截取的纵坐标
* sw 截取的宽度
* sh 截取的高度

JS加载图片

* 创建 Image 对象
* 引入图片
* 等待图片加载完成
* 使用 drawImage() 方法渲染图片

DOM 版

* 从 DOM 里获取图片
* 使用 drawImage 渲染图片

## 变形

#### 平移

`translate(x,y)`

* 第一个参数代表x轴方向位移距离
* 第二个参数代表y轴方向位移距离

#### 缩放

`scale(x, y)`

* 第一个参数是x轴方向的缩放
* 第二个参数是y轴方向的缩放

#### 旋转

`rotate(deg)`

* 参数deg代表旋转的角度
* 默认的旋转原点是画布的左上角，也就是 (0, 0) 坐标
* 若需要修改旋转中心，可以使用 translate() 方法平移画布，通过计算移动到指定位置

#### 变换矩阵

`transform(a, b, c, d, e, f)`

* a  水平缩放（x轴方向） 默认值是 1
* b  水平倾斜（x轴方向） 默认值是 0
* c  垂直倾斜（y轴方向） 默认值是 0
* d  垂直缩放（y轴方向） 默认值是 1
* e  水平移动（x轴方向） 默认值是 0
* f  垂直移动（y轴方向） 默认值是 0

`setTransform(a, b, c, d, e, f)`

区别

* transform() 每次执行都会参考上一次变换后的结果
* setTransform() 每次调用都会基于最原始状态进行变换

## 控制像素

#### 获取像素数据

`getImageData(x, y, width, height)`

* x 和 y 代表选区的左上角坐标
* width 表示选区宽度
* height 表示选区高度

* data 图片像素数据集，以一维数组的形式存放，依次记录了各像素点的r、g、b、a值（取值范围在0~255之间）[若有x个像素，则data数组的长度即为4x]
* colorSpace 图片使用的色彩标准，这个属性在 Chrome 里有打印出来，Firefox 里没打印。不重要~
* height 图片高度
* width 图片宽度

#### 放置像素数据

`putImageData(imgData, x, y, dirtyX, dirtyY, dirtyWidth, dirtyHeight)`

* imageData  规定要放回画布的 ImageData 对象
* x  ImageData 对象左上角的 x 坐标，以像素计
* y  ImageData 对象左上角的 y 坐标，以像素计
* dirtyX  可选 | 水平值（x），以像素计，在画布上放置图像的位置
* dirtyY  可选 | 水平值（y），以像素计，在画布上放置图像的位置
* dirtyWidth  可选 | 在画布上绘制图像所使用的宽度
* dirtyHeight  可选 | 在画布上绘制图像所使用的高度

#### 透明效果

通过 getImageData() 获取的是一个数组类型的数据，每4个元素代表1个像素，就是 rgba，而 a 表示透明通道，所以只需修改每组像素的最后1个元素的值，就能修改图片的不透明度

## 渐变

#### 线性渐变 `createLinearGradient`

创建线性渐变对象  createLinearGradient(x1, y1, x2, y2)

第一个参数 stop 表示渐变色位置的偏移量，取值范围是 0 ~ 1。

第二个参数 color 表示颜色

在 canvas 中使用线性渐变步骤如下

创建线性渐变对象  createLinearGradient(x1, y1, x2, y2)

添加渐变颜色  addColorStop(stop, color)

设置为填充色或描边颜色  fillStyle 或 strokeStyle

#### 径向渐变 `createRadialGradient`

createRadialGradient(x1, y1, r1, x2, y2, r2)

x1, y1: 渐变开始的圆心坐标
r1: 渐变开始的圆心半径
x2, y2: 渐变结束的圆心坐标
r2: 渐变结束的圆心半径

同样使用 addColorStop 设置渐变颜色，同样支持多色渐变

渐变的定位坐标是参照画布的，超出定位的部分会使用最临近的那个颜色

建议创建每个图形之前都单独创建一个渐变色

## 阴影

* shadowOffsetX   设置或返回阴影与形状的水平距离；默认值是0，大于0时向正方向偏移
* shadowOffsetY   设置或返回阴影与形状的垂直距离；默认值是0，大于0时向正方向偏移
* shadowColor   设置或返回用于阴影的颜色；默认黑色
* shadowBlur   设置或返回用于阴影的模糊级别；默认值是0，数值越大模糊度越强
