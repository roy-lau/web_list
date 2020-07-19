

(function () {
  'use strict'
  // 函数声明
  function Animal() { }

  // 函数表达式
  var Animal = function (name, age) {
    this.name = name
    this.age = age
    // this.say = function(){
    //   console.log( this.name + ' ' + this.age)
    // }
  }

  Animal.prototype.say = function () {
    console.log(this.name + ' ' + this.age)
  }
  var cat = new Animal('小猫', 5)
  cat.say()

  // 寄生组合继承，有如下两个方法
  // 1. call() 2. apply()
  // 调用一个对象的一个方法，用另一个对象替换前对象
  // Animal.prototype.say.call(cat)
  // Animal.prototype.say.apply(cat)

  // var params = {
  //   name:'小猫 2',
  //   age:4
  // }
  // cat.say.call(params)

  var Cat = function (name, age) {
    // Animal.apply(this, arguments)
    // Animal.apply(this,[name,age])
    Animal.call(this, name, age)
  }
  // 浅克隆
  Cat.prototype = Object.create(Animal.prototype)
  // 直接负值，推荐浅克隆 
  // Cat.prototype = new Animal()
  Cat.prototype.say = function () {
    var p = {
      name: '父类的名字',
      age: 10
    }
    Animal.prototype.say.apply(p)
    console.log('这是子类的名字' + this.name + ' ' + this.age)
  }

  var cat1 = new Cat('猫崽子', 1)
})()