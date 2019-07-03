/**
 * 类继承
 */
class Father {
  name: string;

  constructor(name: string) {
    this.name = name
  } 

  say(letter: string) {
    console.log(`${this.name} as father s ay: ${letter}`)
  }
}

class Child extends Father {
  constructor(name: string) {
    super(name)
  }

  say(letter: string) {
    console.log(`${this.name} as child say: ${letter}`)
  }

  see() {
    console.log('see')
  }
}

// 虽然我们把他当作 Father，但是调用的方法还是子类的，这个和 Java 不一样
// 这里的 Father 是用于约束这个实例中只包含 Father 的属性和方法
const ChildInstance: Father = new Child('KokoTa')
ChildInstance.say('Hello')
// ChildInstance.see()

/**
 * readonly
 * 下面两个类是等价的
 */
class Test {
  constructor(readonly name: string){} // 参数属性，可以减少代码量，但不推荐
}
class Test2 {
  readonly name: string
  constructor(name: string) {
    this.name = name
  }
}

/**
 * 修改静态属性
 */
class StaticClass {
  static staticName = 'KokoTa'
}
let staticMaker: typeof StaticClass = StaticClass // typeof XXX 意味着类静态类型
staticMaker.staticName = 'Brain'
console.log(StaticClass.staticName)