"use strict";

/*
 * *****DOM 概念
 *
 * DOM = 文档对象模型（Document Object Model）
 * DOM 定义了访问文档的标准
 *
 * ***W3C DOM 标准
 *  Core DOM - 所有文档类型的标准模型
 *  XML DOM - XML 文档的标准模型
 *  HTML DOM - HTML 文档的标准模型
 *
 * ***HTML DOM
 *  HTML DOM 是 HTML 的标准对象模型和编程接口，通过 HTML DOM，JS 能够访问和改变 HTML 文档的所有元素
 *      文档，表示整个 HTML 网页文档
 *      对象，网页中每一个部分都被转换为对象
 *      模型，使用模型来表示对象之间关系
 *
*/

/*
 * *****节点
 *
 * 节点是构成 HTML 文档的最基本单元
 *
 * ***分类
 *  文档节点，整个 HTML 文档
 *  元素节点，HTML 元素
 *  属性节点，元素的属性
 *  文本节点，元素中的文本内容
 *
 * ***节点对象的属性
 * 节点对象的属性：
 *  nodeName    文档节点：#document      元素节点：标签名     属性节点：属性名    文本节点：#text
 *  nodeType    文档节点：9              元素节点：1          属性节点：2        文本节点：3
 *  nodeValue   文档节点：null           元素节点：null       属性节点：属性值   文本节点：文本内容
 *
 * *****文档对象
 *  文档对象 document 代表整个网页，这个对象是 window 对象的属性
 *  文档对象是网页中所有其他对象的拥有者
 *
*/

/*
 * *****DOM 查询
 *
 * ***获取元素节点
 *  通过 document 对象调用
 *      *document.getElementById()          通过 id 属性获取一个元素节点对象
 *      document.getElementsByTagName()     通过 标签名 获取一组元素节点对象
 *          返回一个类数组对象
 *      document.getElementsByName()        通过 name 属性获取一组元素节点对象
 *          返回一个类数组对象
 *      document.getElementsByClassName()   通过 class 属性获取一组元素节点对象
 *          返回一个类数组对象
 *      document.querySelector()            通过 CSS 选择器形式获取第一个匹配元素节点对象
 *      document.querySelectorAll()         通过 CSS 选择器形式获取一组元素节点对象
 *          返回一个类数组对象
 *
 * ***获取元素的子节点
 *  通过指定元素节点对象调用
 *      el.getElementsByTagName()           获取当前节点的指定标签名的后代节点
 *          返回一个类数组对象
 *      *el.innerHTML                       表示当前节点内部的 HTML 代码
 *          返回 HTML 代码字符串
 *      el.childNodes                       表示当前节点的所有子节点
 *          返回类数组对象（包括文本节点、注释节点等在内的所有节点）
 *      el.children                         表示当前节点的所有子元素节点
 *          返回的类数组对象中只包括元素节点
 *      el.firstChild                       表示当前节点的第一个子节点（注意不是子元素节点）
 *          返回节点对象
 *      el.firstElementChild                表示当前节点的第一个子元素节点
 *          返回元素节点对象
 *      el.lastChild                        表示当前节点的最后一个子节点
 *          返回节点对象
 *      el.lastElementChild                 表示当前节点的最后一个子元素节点
 *          返回元素节点对象
 *
 * ***获取元素的父节点和兄弟节点
 *  通过指定元素节点对象调用
 *      el.parentNode                       表示当前节点的父亲节点
 *          返回元素节点对象
 *      el.previousSibling                  表示当前节点的前一个兄弟节点
 *          返回节点对象
 *      el.previousElementSibling           表示当前节点的前一个兄弟元素节点
 *          返回元素节点对象
 *      el.nextSibling                      表示当前节点的后一个兄弟节点
 *          返回节点对象
 *      el.nextElementSibling               表示当前节点的后一个兄弟元素节点
 *          返回元素节点对象
 *
 * ***其他查询方法
 *      document.body                       获取 body 元素
 *      document.documentElement            获取 html 元素
 *      document.all                        获取文档中所有元素
 *
 * ***获取和更改元素属性
 *      el.attr     获取元素节点后可以直接通过属性名获取属性值
 *          class 属性需要用 className
 *          更改可以直接用赋值表达式 al.attr = value;
 *
*/

var first = document.getElementsByTagName("li")[0];
var node1 = first.parentNode;
var node2 = first.previousSibling;
var node3 = first.previousElementSibling;
var node4 = first.nextSibling;
var node5 = first.nextElementSibling;
console.log(node1);             // 打印 <ul>...</ul>
console.log(node2);             // 打印 #text
console.log(node3);             // 打印 <li><li>
console.log(node4);             // 打印 #text
console.log(node5);             // 打印 <li><li>

/*
 * *****DOM 增删改
 *
 * ***创建节点
 *      document.createElement()                根据标签名创建元素节点
 *      document.createTextNode()           根据文本内容创建文本节点
 *
 * ***添加节点
 *      father.appendChild(son)                 向父节点中添加新的子节点
 *      father.insertBefore(son1, sonNew)   向父节点的指定子节点前插入新的子节点
 *
 * ***删除节点
 *      father.removeChild(son)                 删除父节点中指定子节点
 *          比较好用的方式，son.fatherNode.removeChild(son)
 *
 * ***替换节点
 *      father.replaceChild(sonOld, sonNew)     将父节点的指定子节点替换为新的子节点
 *          也可以直接用 innerHTML 对 DOM 改动，但是会使整个 innerHTML 所代表的元素节点发生改变，改动较大
 *
*/

var li = document.createElement("li");
document.getElementById("b3").onclick = function() {
    first.appendChild(li);
};

/*
 * *****操作 CSS 样式
 *
 * ***获取 CSS 样式对象
 *
 *  el.style.attr                               通过 style 属性可以获取或修改内联 CSS 样式
 *      读取和修改
 *      通过 style 属性读取和设置的都是内联样式
 *      通过赋值语句 el.style.attr = value 可以设置样式
 *      内联样式优先级较高，但是覆盖不了设置了 !important 的样式
 *      CSS 中属性名中含有 "-" 的，需要将属性名改为驼峰式，例如 background-color  ->  backgroundColor
 *      属性值是字符串
 *  window.getComuptedStyle()                   读取元素当前样式
 *      读取
 *      需要两个参数，第一个是要获取样式的元素
 *      第二个可以传递一个伪元素，一般不用，传 null
 *      返回封装了当前元素样式的对象
 *
 * ***兼容处理
 *  自定义获取元素样式属性值的通用方法
 *
 * ***其他样式相关属性
 *      el.clientWidth、el.clientHeight             获取元素可见宽度和高度
 *          返回数值
 *          包括内容区和内边距
 *      el.offsetWidth、el.offsetHeight             获取元素宽度和高度
 *          返回数值
 *          包括内容区、内边距和边框
 *      el.offsetParent                             获取当前元素的定位（position）父元素
 *          返回元素节点对象
 *      el.offsetTop、el.offsetLeft                 获取当前元素相对于定位父元素的偏移量
 *          返回数值
 *      el.scrollWidth、el.scrollHeight             获取元素滚动区域的宽高
 *          返回数值
 *          当父元素的宽高比子元素的小时，子元素会溢出父元素，此时子元素的可滚动区域宽高可以由父元素的 scrollWidth、scrollHeight 得到
 *      el.scrollLeft、el.scrollTop                 获取元素水平或垂直滚动的距离
 *          返回数值
 *          可滚动区域的水平和垂直滚动距离可以由父元素的 scrollWidth、scrollHeight 得到
 *          当满足 scrollHeight - scrollTop == clientHeight 时，滚动到底部
*/

// window.getComputedStyle(box1, null);

function getStyle(el, name){
    if(window.getComputedStyle){
        // 正常浏览器
        return getComputedStyle(el, null)[name];
    }else{
        // IE8 及以下
        return el.currentStyle[name];
    }
}

/*
 * *****事件
 *
 * JS 和 HTML 之间的交互是通过事件来实现的
 * 事件通常与函数结合使用，在事件发生之前函数不会被执行（例如当用户单击按钮时）
 *
 * ***基本概念
 *  在 HTML 相关属性可以绑定处理函数，称为事件属性。如 onclick 等
 *  绑定在事件属性上的函数就是事件处理函数（响应函数）
 *  事件属性一般以 on 开头
 *
 * ***事件绑定
 *  事件属性中写 JS 代码
 *  事件属性绑定处理函数
 *      处理函数中的 this 指向的是绑定事件的对象
 *  el.addEventListener()       为元素绑定处理函数
 *      可以绑定多个处理函数，执行顺序为绑定顺序
 *      第一个参数为事件名，不需要前缀 "on"
 *      第二个参数为回调函数
 *      第三个参数为布尔值，表示是否在捕获阶段触发事件，一般传 false
 *      this 指向绑定事件的对象
 *
 *  el.attachEvent()            为元素绑定处理函数
 *      可以绑定多个处理函数，执行顺序与绑定顺序相反
 *      第一个参数为事件名，需要前缀 "on"
 *      第二个参数为回调函数
 *      this 指向 window
 *
 * ***兼容处理
 *  bind() 函数参数
 *      obj，要绑定事件的对象
 *      eventStr，事件名（没有 on 前缀）
 *      callback，回调函数
 *
*/

function bind(obj, eventStr, callback){
    // 大部分浏览器
        if(obj.addEventListener){
            obj.addEventListener(eventStr, callback, false);
        }else{
    // IE8 及以下
        obj.attachEvent("on" + eventStr, function(){
            // 将 this 指向从 window 改变为绑定对象
            callback.call(obj);
        });
    }
}



li.addEventListener("click", p1, false);

function p1 () {
    alert("clicked b1");
}

window.onload = function () {
    document.getElementById("b2").onclick = function() {
        alert("clicked b2");
    };
};

/*
 * *****事件对象
 *
 * ***概念
 *  当事件的响应函数被触发时，浏览器会将一个事件对象作为实参传递进响应函数，在事件对象中封装了当前事件的所有信息
 *
 * ***用法及兼容性
 *  在 IE8 及以下浏览器中，事件对象是作为 window 对象的属性储存的，window.event
 *  在火狐浏览器中，事件对象只通过实参传递，window.event 不支持
 *  chrome 两者都支持
 *
 * ***兼容处理
 *  event = event || window.event;
 *
*/

event = event || window.event;

/*
 * *****事件冒泡（bubble）
 *
 *  事件冒泡即事件向上传导，当元素上的事件被触发时，其祖先元素的事件也会被触发
 *  在开发中大部分情况下冒泡是有用的，如果不希望事件冒泡可以通过事件对象来取消冒泡
 *      event.cancelBubble = true;          取消冒泡
*/

/*
 * *****事件委派
 *
 *  将事件统一绑定给元素共同的祖先元素，这样后代元素的事件触发时，会一直冒泡到祖先元素，通过祖先函数的响应函数来处理事件
 *  事件委派利用了事件冒泡，通过委派可以减少事件绑定次数，提高程序性能
 *      event.target        获取触发特定事件的元素
*/

/*
 * *****事件传播
 *
 *  捕获阶段
 *      进行事件捕获，默认不会触发
 *  目标阶段
 *      捕获到目标事件，在目标元素上触发事件
 *  冒泡阶段
 *
 * 如果希望在捕获阶段触发事件，可以在 addEventListener 中将第三个参数设为 true
 *
*/
