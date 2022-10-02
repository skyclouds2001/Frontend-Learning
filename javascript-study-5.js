//////////Date 时间 对象
/*
 （1）创建 Date 对象
    new 关键字
    new Date()
        创建的时间对象默认封装当前时间
    new Date(dateString)
        从日期字符串创建一个新的时间对象
        日期字符串格式："月/日/年 时: 分: 秒"
    new Date(year, month, ...)
        传入 7 个数字参数：年、月、日、小时、分钟、秒、毫秒
        传入 5 个数字参数：年、月、日、小时、分钟
        传入 4 个数字参数：年、月、日、小时
        传入 3 个数字参数：年、月、日
        传入 2 个数字参数：年、月
        传入 1 个数字参数：毫秒
        JS 里月份从 0 到 11 计
    new Date(milliseconds)
        传入 1 个数字参数：毫秒

 （2）日期方法
    getDate()
        获取当前日期是几日
    getDay()
        获取当前日期是星期几
        返回值为 0 - 6，0 表示周日、1 表示周一 ...
    getMonth()
        获取当前日期月份
        返回值为 0 - 11，0 表示一月、1 表示二月 ...
    getFullYear()
        返回当前日期年份
    getHours()、getMinutes()、getSeconds()、getMillseconds()
    getTime()
        获取当前日期对象的时间戳

        时间戳，指的是从格林威治标准时间的 1970 年 1 月 1 日到当前时间的毫秒数
        计算机底层保存时间使用的都是时间戳
*/

var d = new Date();

console.log(d.getDate() + " " + d.getDay() + " " + (d.getMonth() + 1) + " " + d.getFullYear());
console.log(d.getTime());
console.log(d);

//////////Math 对象
/*
 （1）Math 属性
    Math.PI
    圆周率

 （2）Math 方法
    abs()
        计算一个数的绝对值
    ceil()
        向上取整
    floor()
        向下取整
    round()
        四舍五入
    random()
        生成一个 0 到 1 之间的随机数
    max()
        返回多个数中的最大值
    min()
        返回多个数中的最小值
    pow()
        返回 x 的 y 次幂
    sqrt()
        开方运算
*/

//////////包装类
/*
 将基本数据类型转换为对象
    Number()
    String()
    Boolean()
    不推荐显式使用
    浏览器会隐式使用：
        基本数据类型的值来调用属性和方法（toString()等），浏览器会临时使用包装类将其转换为对象，然后调用相应对象的属性和方法
        调用完之后会转换回基本数据类型
*/

/*
 字符串属性和方法
    字符串方法是 String 对象的方法

 （1）数组形式使用字符串
    字符串在底层是以字符数组形式保存的，可以以数组索引形式获取字符串中字符

 （2）length 属性
    获取字符串长度

 （3）字符串方法
    大部分方法不改变原字符串

    charAt()
        根据索引获取指定字符
    charCodeAt()
        根据索引获取指定字符的编码（Unicode 编码）
    String.fromCharCode()
        通过 String 构造方法调用
        根据字符编码获取字符
    concat()
        连接多个字符串，和 + 一样
    indexOf()
        检索字符串中是否含有指定内容
        如果含有，返回其第一次出现的索引
        如果不含有，返回第一次出现的索引
        可以指定第二个参数，指定开始查找的位置
    lastIndexOf()
        和 indexOf() 一样用法
        不同之处在于 lastIndexOf() 从后往前找
        可以指定第二个参数，指定开始查找位置，指定也是从前面开始第几个
    substring(start, end)
        从字符串中截取指定内容
        start 表示开始位置索引，end 表示结束位置索引
        用法和数组的 slice 方法一样
        不同之处
        不能传入负值，如果传入负值，默认使用 0
        还会自动调整参数位置，如果第二个参数小于第一个，则交换位置
    substr(start, num)
        从字符串中截取指定内容
        start 表示开始位置索引，num 表示截取长度
    split(str)
        将字符串拆分为数组
        str 为一字符串，根据该字符串拆分数组
    toUpperCase()
        将字符串转换为大写
    toLowerCase()
        将字符串转换为小写
*/

var s = "sedfggfdda";
console.log(s.length);
console.log(s[5]);
console.log(s.charAt(6));
console.log(s.charCodeAt(6));
console.log(s.indexOf("g"));
console.log(s.lastIndexOf("g"));
var a = s.split();
console.log(a);

/*
 document.getElementById()
    document.getElementById() 是一个 DOM 操作方法，可以获取指定 id 的标签对象
*/

/*
 onclick
    onclick 为 HTML 标签的一个属性，可以绑定一个函数。当用户点击该标签时，会调用这个函数
*/

/*
    document.write 是直接写入到页面的内容流，如果在写之前没有调用document.open, 浏览器会自动调用open。每次写完关闭之后重新调用该函数，会导致页面被重写
    innerHTML 则是DOM页面元素的一个属性，可以将内容写入一个具体 HTML 元素
    innerHTML 很多情况下都优于document.write，其原因在于其允许更精确的控制要刷新页面的那一个部分
*/
