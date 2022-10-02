"use strict";
/*      JavaScript      */

/*
 * *****1
 * JavaScript 标准：ECMAScript
 * ES6 - ES2016 ES2017……
 *
 * *****JavaScript 引擎
 * 对 JavaScript 进行解释、编译和执行
 * 不同浏览器使用的引擎不同
 *
 * *****JavaScript 特点
 *  ·解释性语言
 *  ·类似于 C 和 Java 的语法结构
 *  ·动态语言
 *  ·基于原型的面向对象
 */

/*
 * *****2
 *
 * window.alert()
 * 控制浏览器跳出警告框
 *
 * document.write()
 * 写入内容至 HTML 文件末尾
 *
 * //window.prompt()
 * //可提示用户进行输入的对话框
 *
 * console.log()
 * 向浏览器控制台写入内容
 *
 * //element.innerHTML
 * //写入 HTML 元素
 */

window.alert("Hello World!");

document.write("<p>GOTO</p>");

console.log("AND == &");

/*
 * *****3
 *
 * *****JavaScript 编写位置
 *
 * 写在 script 标签之间
 *      可以在head中，也可以在body中
 * 部分属性中（不推荐使用）
 *      onclick="代码"
 *      href="javascript:;代码"
 * 外部 js 文件中，通过 script 标签引入（推荐）
 *      <script type="text/javascript" src="index.js"></script>
 *
 * 可以放在 head 标签内，也可以放在 body 标签内。
 * 一般推荐放置在 body 标签最末尾，因为 HTML 文档按顺序解析渲染，如果将 JS 文件放在开头，而且文件比较大或者其他因素，会阻塞网页渲染，影响网站加载速度
 */

/*
 * *****4
 *
 * *****语句
 * 由 web 浏览器“执行”的“指令”
 * 每条语句后以分号结尾
 *
 * *****注释
 * 单行注释，//
 * 多行注释，
 *
 * ·严格区分大小写
 * ·以分号结尾
 * ·自动忽略多个空格和换行，可进行代码格式化
 */

/*
 * *****5
 *
 * *****字面量&变量
 * 字面量：不可改变的值
 *      1、2、"hello"、null、infinity ...
 * 变量：值存放字面量，可以任意改变值
 *
 * 使用var 声明变量
 */
var a;
var b = "Goto the village";
a = 1000;
console.log(a);
console.log(b);

/*
 * *****6
 *
 * *****标识符：变量名、函数名、属性名……
 *
 * 采用 unicode 编码保存
 *
 * ·可含有字母、数字、_、$ 等符号
 * ·不能以数字开头
 * ·不能是关键字或保留字
 * ·一般采用驼峰命名法
 *
 */

/*
 * *****7
 *
 * *****数据类型
 *
 * 基本数据类型
 * ·String，字符串
 * ·Number，数值
 * ·Boolean，布尔值
 * ·Null，空值
 * ·Undefined，未定义
 * 引用数据类型
 * ·Object，对象
 *
 * *****字符串
 * 需要使用引号-双引号单引号均可，但需匹配
 * 双引号单引号可以嵌套使用
 *
 */
var s71 = "set 'SET' ";
var s72 = ' "DEF" def';
var s73 = "sed \" sed \' sed \\ sed \n ";

/*
 * *****8
 *
 * *****数值
 *
 * 需要使用引号-双引号单引号均可，但需匹配
 * 双引号单引号可以嵌套使用
 *
 *
 * 特殊字面量
 *
 * 最大值 Number.MAX_VALUE
 * 最小值 Number.MIN_VALUE
 * 正无穷，表示超出数值上限 infinity
 * 负无穷，表示超出数值下限 -infinity
 *
 * 非数值 NaN
 *
 * typeof 检查变量类型
 *
 */
var n1 = 120;
var n2 = 120.102;

var n3 = Number.MAX_VALUE;
var n4 = Number.MIN_VALUE;
var n5 = Infinity;
var n6 = -Infinity;

var n7 = NaN;

/*
 * *****9
 *
 * *****布尔值
 *
 *  true false
 *
 */
var b1 = true;
var b2 = false;

/*
 * *****10
 *
 * *****空值
 *
 *  null
 * 表示空对象
 *
 * *****未定义
 *
 *  undefined
 * 变量未声名、变量声名但未定义
 *
 */

var n = null;
var u = undefined;

/*
 * *****11
 *
 * *****强制类型转换
 *
 * *****转换为 String
 *
 * *****toString() 方法
 *      null 和 undefined 没有
 *
 * *****String() 函数
 *      Number 和 Boolean 调用的是 toString() 方法
 *       null 和 undefined，直接返回 "null" 或 "undefined"
 *
 */

/*
 * *****12
 *
 * *****转换为 Number
 *
 * *****Number() 函数
 * ·String -> Number
 *      如果是纯数字的字符串，则转换为相应数值
 *      如果字符串中有非数值内容，转换为 NaN
 *      如果字符串是空串或者是一个全是空格的字符串，转换为 0
 * ·Boolean -> Number
 *      true 转换为 1
 *      false 转换为 0
 * ·Null -> Number
 *      null 转换为 0
 * ·Undefined -> Number
 *      undefined 转换为 NaN
 *
 *  *****parseInt() 函数
 *      可以将字符串开头有效整数取出来
 *      其他数据类型，会先把数据转换为字符串，再提取出有效整数，故都为 NaN
 *
 * *****parseFloat() 函数
 *      可以将字符串开头有效小数取出来
 *      其他数据类型，会先把数据转换为字符串，再提取出有效小数，显然都为 NaN
 *
 * *****13
 *
 * *****提取其他进制数
 *  可以用 parseInt(str, hex) 来提取出有效几进制的数
 *      16 进制，0x 开头
 *      8 进制，0 开头，避免使用
 *      二进制， 0b 开头，浏览器不一定支持
 *
 */

var s = parseInt("123", 16);
console.log(s);

/*
 * *****14
 *
 * *****转为Boolean
 *
 * Boolean() 函数
 *
 * 数字 0、NaN、空串 ""、null、undefined 转换为 false
 * 其余皆为 true
 *
 */

console.log(Boolean(0));
console.log(Boolean(NaN));
console.log(Boolean(""));
console.log(Boolean(null));
console.log(Boolean(undefined));

/*
 * *****15
 *
 * *****运算符
 *
 * *****typeof运算符
 *  以字符串形式返回变量或字面量类型
 *
 * *****算术运算符
 *  +   -   *   /   %   **   ++  --
 *  1·String 类型的值和其他类型的值进行运算，会将值转换为 String 再将字符串拼接
 *  2·Number 类型的值和其他类型的值进行运算时，会将值转换为 Number 再进行运算
 *
 * *****16
 *
 * *****一元运算符
 *  +   -
 * 正号（+）    对于 Number 类型数值无作用      对于非 Number 类型值，转换为 Number 类型
 * 负号（-）    对于 Number 类型数值符号取反并返回结果      对于非 Number 类型值，转换为 Number 类型，再将符号取反
 *
 * *****17&18
 *
 * *****自增、自减运算符
 * 自增（++）
 *      通过自增可以使变量在自身的基础上加一
 *      会改变原变量值
 * 自减（--）
 *      通过自减可以使变量在自身的基础上减一
 *      会改变原变量值
 *
 * 变量前，++a
 *  先自增，再执行当前语句
 * 变量后，a++
 *  先执行当前语句，再自增
 *
 * *****19&20
 *
 * *****逻辑运算符
 *  &&  ||   !
 *  Boolean 值直接操作
 *  非 Boolean 值，先转换为 Boolean 值再进行操作
 *  其中与&或返回原值
 *
 * *****21
 *
 * *****赋值运算符
 *  =   +=  -=  *=  /=  %=
 *
 * *****22&23&24
 *
 * *****关系运算符
 *  ==   ===   !=   !===   <   >   <=   >=
 * ·两 Number 类型数值，意思明显
 * ·两 String 类型数值，比较字符的 Unicode 编码
 *      可用于实现排序
 * ·其他先转为 Number 类型再进行比较
 * ·特别的，任何值和 NaN 比较，返回 false
 *      可使用isNaN()函数判断是否为 NaN
 *
 * ==等值
 * ===等值且等类型
 * !=不等值且不等型
 * !==不等值或不等型
 *
 * *****25
 *
 * *****条件运算符
 *  条件表达式 ? 语句1 : 语句2
 *
 * *****其他运算符
 *  逗号运算符（,）可以声名多个变量
 *
 *
 * *****位运算符
 *  &  |  ^  ~  <<  >>  >>>
 * >>保留符号右移
 * >>>不保留符号右移
 *
 * *****26
 *
 * *****运算符的优先级
 *
 * *****27
 * *****代码块
 *  大括号
 *
 */

/*
 *
 * 顺序结构，按照语句出现的先后顺序依次执行
 * 条件结构，按照给定的逻辑来决定执行顺序
 * 循环结构，根据代码逻辑条件判断是否重复执行某一段程序
 *
 * if () {
 * }
 * else if () {
 * }
 * else {
 * }
 *
 * switch () {
 *     case X:
 *         ......
 *         break;
 *     default:
 *         ......
 * }
 * 进行全等比较（===）
 *
 * while () {
 * }
 *
 * do {
 * }
 * while();
 *
 * for (...;...;...) {
 * }
 *
 * break continue
 *
 */


/*
 * *****严格模式
 * 定义 JS 代码应该以“严格模式”执行
 * 在 JS 代码第一行写上 "use strict";
 *
 * *****使用 Unicode 编码
 * \u0030
 * &#0;
 *
 */