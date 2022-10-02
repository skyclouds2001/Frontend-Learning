/*
 * *****数组
 *
 * ***基本概念
 *
 * 在单一变量中存储多个值
 * 用索引号来访问和操作数组中存的值
 * 数组中存放的值称为元素
 * 数组不会溢出
 * 访问超出数组长度的元素返回 undefined
 *
 * ***创建方式
 * *new关键字
 *  var arr = new Array();
 *  不推荐
 * *使用数组文本
 *  var arr = [item1, item2]
 *  数组中的元素可以是任意数据类型，也可以是一个数组
 *  最后一个元素后不要写逗号
 *
 * ***数组元素
 * *访问数组元素
 *     var temp = arr[index1]
 *     forEach() 、map()方法
 * *添加或修改数组元素
 *     arr[arr.length] = item1'
 *     push()、unshift() 方法
 * *删除数组元素
 *     delete 运算符，会在数组中留下空洞
 *     pop() 、shift()、splice()、slice()方法，不会留下空洞
 * *数组长度
 *  可通过 length 属性得到
 *      arr.length
 *  可以通过修改数组 length 来删除后面元素
 *
 * *数组常用方法
 *  push()
 *      向数组末尾添加一个或多个新元素，并返回数组新的长度
 *  pop()
 *      从数组中删除最后一个元素，返回被删除的元素
 *  unshift()
 *      向数组开头添加一个或多个元素，返回数组新的长度
 *  shift()
 *      从数组中删除第一个元素，返回被删除的元素
 *
 * *数组遍历
 *  for 循环遍历
 *  forEach() 方法
 *      需要一个函数作为参数，称这种函数为回调函数
 *      第一个参数为当前遍历对象，第二个参数为当前遍历索引，第三个参数为当前遍历的数组
 *  map() 方法
 *      使用情况和 forEach 相同
 *      不同的是，forEach 方法不会返回值，map 方法会返回一个新的数组
 *
*/

var array = [1, 3, 56, 123, 34, "DEF", true, null, undefined, 2];

console.log(array);

console.log("array[0] = " + array[0]);

console.log("array.lenght = " + array.length);

array.pop();
array.push(20);
console.log(array);

array.shift();
array.unshift("first");
console.log(array);

// for 循环
for(var i=0; i<array.length; i++) {
    console.log(i, array[i]);
}

// forEach() 方法
array.forEach(function(item, index, array) {
    console.log(index, item);
})

// map() 方法
array.map(function(item, index) {
    console.log(index, item);
})

/*
 * *****slice 和 splice 方法
 *
 *  slice(start, end)
 *      不会改变原数组
 *      start 为开始索引位置，end 为终止索引位置
 *      从数组的某个片段截取出新数组并返回
 *      如果 end 省略，会切出剩下部分
 *      参数可以是一个负值，切除倒数第几个元素
 *  splice(start, num, ele...)
 *      改变原数组
 *      start 为开始索引位置，num 表示删除元素个数，ele 及以后表示自动插入到开始索引前的元素
 *      删除数组中指定元素，并将被删除元素返回
 *      可以在  start 索引位置前添加新项
*/

var array1 =  array.slice(3, 10);
console.log(array1);

/*
 其他方法

 concat()
    不改变原数组
    连接两个或多个数组，将新的数组返回
 join()
    不改变原数组
    将数组转换为一个字符串，并返回
    可以接受一个字符串作为参数，该字符串会成为数组中元素的连接符
 reverse()
    改变原数组
    反转数组
 sort()
    改变原数组
    默认按 Unicode 编码排序，因此对于数字排序不符合预期
    可传入一个比较函数自定义排序规则
    函数需定义两个形参
    浏览器会分别使用数组中的元素作为实参调用函数
    根据回调函数的返回值来决定元素排序，如果返回值大于 0 ，则交换位置
*/

console.log(array.join(" | "));

/*
 * *****call 和 apply 方法
 *
 * 需要通过函数对象来调用
 *
 * 调用 call() 和 apply() 时函数都会执行
 * 调用 call() 和 apply() 时可将一个对象指定为第一个参数
 *  函数执行时的 this 指向这个对象
 *  如果第一个参数不为对象，则 this 指向 window，严格模式下 this 为 undefined
 * call() 方法可以将实参在对象之后依次传递
 * apply() 方法将实参作为一个数组传递
 *
*/

var person = {
    fullName: function(city, country) {
      return this.firstName + " " + this.lastName + "," + city + "," + country;
    }
}

var person1 = {
    firstName:"John",
    lastName: "Doe"
}

// call 和 apply 的使用
person.fullName.call(person1, "Oslo", "Norway");
person.fullName.apply(person1, ["Oslo", "Norway"]);
