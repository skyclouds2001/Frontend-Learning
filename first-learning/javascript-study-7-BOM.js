/*
 *      BOM    浏览器对象模型
 *
 * BOM 对象
 *      Window      代表整个浏览器窗口          是网页的全局对象
 *      Navigator   代表当前浏览器的信息        可以用来识别不同的浏览器
 *      Location    代表当前浏览器地址栏信息    可以获取地址信息或者操作浏览器跳转页面
 *      History     代表浏览器的历史记录        可以通过该对象来操作浏览器历史记录      不能够获取具体的历史记录，只能操作浏览器向前或向后翻页
 *      Screen      代表用户屏幕信息            可以获取到用户的显示器相关信息
*/

console.log(window);
console.log(navigator);
console.log(location);
console.log(history);
console.log(screen);

/*
 * Window 对象
 *
 *  全局 JS 对象，函数和变量为 window 对象的成员
 *
*/

/*
 * Navigator对象
 *
 *  代表当前浏览器信息，可以用来识别不同浏览器
 *      userAgent 是一个字符串，包含有用来描述浏览器信息的内容
 *      不同的浏览器有不同的 userAgent
 *
*/

console.log(navigator.userAgent);

// 判断浏览器

var ua = navigator.userAgent;
if(/firefox/i.test(ua)){
  console.log("Firefox");
}else if(/chrome/i.test(ua)){
  console.log("Chrome");
}else if(/msie/i.test(ua)){
  console.log("IE");
}else if("ActiveXObject" in window){
  console.log("IE11(Edge)");
}

// console.log(navigator.javaEnabled());

/*
 * History 对象
 *  可以操控浏览器向前向后翻页
 *
 * length 属性
 *      可以获取到当前访问的链接数量
 * back() 方法
 *      可以用来回退到上一个页面
 * forward() 方法
 *      可以用来跳转到下一个页面
 * go() 方法
 *      页面跳转，正数向前，负数向后
 *
*/

console.log(history.length);

/*
 * Location 对象
 *  封装了浏览器的地址栏信息
 *
 *  location 使用
 *      直接打印 location 对象，可以打印当前页面的完整路径
 *      直接给 location 对象赋值为新的路径（相对或绝对路径），则页面会自动跳转到该路径，并且会生成历史记录
 *
 *  属性和方法
 *
 *  href 属性
 *      返回当前页面完整路径，相当于直接打印 location 对象
 *  hostname 属性
 *      返回路径上主机名
 *  pathname 属性
 *      返回路径名
 *  protocol 属性
 *      返回协议名
 *  port 属性
 *      返回端口号
 *  assign() 方法
 *      相当于直接给 location 赋值
 *  reload() 方法
 *      用来重新加载页面
 *      传true会强制清空缓存刷新页面
 *  replace() 方法
 *      用来跳转到其他页面，不会生成历史记录
 *
*/

console.log(location.href);
console.log(location.hostname);
console.log(location.pathname);
console.log(location.protocol);

/*
 * Window 对象
 *  代表浏览器窗口
 *
 * 全局对象
 *  所有全局 JS 对象，函数和变量自动成为 window 对象的成员
 *
 *  全局变量是 window 对象的属性
 *      innerHeight、innerWidth 等变量
 *      document、navigator 等对象
 *  全局函数是 window 对象的方法
 *      alert()、open() 等函数
 *  全局 JS 对象可以直接用变量名调用，省去 window. 前缀
 *      比如 window.document 或 document 都可
 *
 * 定时调用
 *  setInterval(fun, time) 方法
 *      可以将一个函数每隔一段时间调用一次
 *      第一个参数为回调函数
 *      第二个参数为数值，表示每次调用的间隔时间，单位为毫秒
 *      返回值为数值，用来作为定时器的唯一标识
 *      在绑定定时器前记得清除同一元素上的定时器
 *  clearInterval() 方法
 *      可以关闭定时调用
 *      参数为定时器的唯一标识
 *
 * 延时调用
 *  setTimeout(fun, time) 方法
 *      可以将一个函数隔一段时间后执行，且只会执行一次
 *      用法同 setInterval
 *  clearTImeout() 方法
 *      关闭延时调用
 *      用法同 clearInterval
 *
*/

var p1 = document.getElementById("p1");
var k = 1;
var timer1 = setInterval(function () {
    p1.innerHTML = ++k;

    if(k == 100) {
        clearInterval(timer1);
    }
}, 100);

// object.className 修改class属性
