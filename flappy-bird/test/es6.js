
class Animal {
  constructor(name = '无名氏', age = 0) {
    this.name = name
    this.age = age
  }
  say() {
    console.log("Animal:", this.name, this.age)
  }
}

class Cat extends Animal {
  constructor(name, age) {
    super(name, age)
  }
  say() {
    super.say()
    console.log("Cat:", this.name, this.age)

  }
}

const cat = new Cat("小猫", 6)
cat.say()