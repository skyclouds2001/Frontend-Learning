/*
 * *****this 关键字
 *      this 关键字指向的是它所属的对象
 *      解析器在调用函数时会向函数内部传递一个隐含的参数 this
 *
 * ***this 取值
 * 单独——全局对象 window
 * 方法——方法所有者对象
 * 函数——全局对象 window【严格模式——undefined】
 * 事件——接收事件的元素
 *
 * call() 和 apply() 方法可以将 this 引用到指定对象
 * this 的指向在函数定义的时候是确定不了的，只有函数执行的时候才能确定 this 到底指向谁
 *
*/

/*
 * *****工厂函数
 *
 *  使用工厂函数大批量创建对象。
 *  是通过在函数内部显式地创建对象，然后返回
 *
*/

function createPerson(name, age, sex){
    var obj = {};
    obj.name = name;
    obj.age = age;
    obj.sex = sex;

    obj.sayName = function () {
      console.log(this.name);
    }

    return obj;
}

var per1 = createPerson("孙悟空", 18, "男");

console.log(per1);
console.log(per1.sayName());

/*
 * *****arguments 对象
 *
 *  在调用函数时，浏览器每次会传递两个隐含的参数：this 和 arguments
 *      在调用函数时，函数的实参会在 arguments 中保存
 *      arguments 是一个类数组对象，他可以通过索引来操作数据，也可以获取长度
 *      arguments 对象里有个 callee 属性，指向当前函数
 *
 *
 *
*/

function fun(_a, _b){
    console.log(arguments);
    console.log(arguments.length);      // 打印 3
    console.log(arguments[0]);          // 打印 1
    console.log(arguments.callee);      // 打印 fun(a, b){...}
};

fun(1, 2, 3);

/*
 * *****构造函数
 *
 * ***基本概念
 *      构造函数中定义的属性和方法在每次创建对象时都会重新创建，即不会被不同对象共享
 *      构造函数称为一个类，构造函数创建的对象称为该类的实例
 *
 * ***语法
 *      构造函数的函数名首字母大写
 *      函数定义和普通函数没有区别
 *      构造函数通过 new 关键字创建对象
 *
 * ***执行流程
 *  构造函数的定义和普通函数没有区别，它能创建对象是因为使用了 new 关键字
 *
 *  1、立即创建一个新的对象
 *  2、将函数中的 this 指向新建对象
 *  3、逐行执行构造函数中代码
 *  4、将新建对象作为返回值返回
 *
 * ***instanceof 关键字
 *      使用 instanceof 关键字可以检测一个对象是否是一个类的实例。
 *      特别的，所有对象都是 Object 对象的后代
 *
*/

function Person(name, sex, age) {
    this.name = name;
    this.sex = sex;
    this.age = age;

    this.sayName = function () {
        console.log(this.name);
    }
}

var per1 = new Person("Tom", "Male", 30);

/*
 * *****原型对象
 *
 * ***prototype 原型
 *      每个函数都会创建一个 prototype 属性，这个属性是一个对象，是通过调用构造函数创建的对象的原型。在上面定义的属性和方法可以被对象实例共享
 *      所有 JS 对象都从原型继承属性和方法
 *
 * ***构造函数和构造函数的原型
 *      实例与构造函数的原型有直接联系，而实例与构造函数之间没有
 *
 * ***__proto__ 属性
 *      后代实例可以通过隐含的 __proto__ 属性来访问其继承的原型对象，也可以直接对原型的属性或方法进行修改，使构造函数的每个实例都能同步
 *      __proto__ 本质上是一个内部属性，而不是正式的对外 API，不过浏览器对这个属性进行了广泛支持
 *
 *  Object.setPrototypeOf()，写操作
 *  Object.getPrototypeOf()，读操作
 *
 * ***原型和 in 运算符
 *      使用 in 运算符检查某属性，如果对象中没有但是原型中有，也会返回 true
 *      可以使用对象的 hasOwnProperty() 方法来检查对象自身是否含有该属性
 *
 * ***原型层级
 * 使用一个函数的属性或方法
 *      自身有，直接使用
 *      自身没有，在原型对象中寻找，如果原型对象中有，则使用
 *      如果原型对象没有，继续查找原型的原型，直到 Object 对象的原型
 *      Object 原型没有原型，如果没有找到，返回 undefined
 *
 */

function Student() {
    this.name = "unknown-name";

    this.sayName = function () {
        console.log(this.name);
    }
}

console.log(Student);
console.log(Student.prototype);

var per2 = new Student();
// per2.saySex();

per2.sex = "unknown-sex";
per2.saySex = function() {
    console.log(this.sex);
};

console.log(per2);
console.log(per2.prototype);

Student.prototype.name = "孙悟空";
Person.prototype.sayName = function(){
    Student.log(this.name);
}

console.log(Student);
console.log(Student.prototype);

per2.saySex();

