/**
 * 类接口和构造器接口要区分清楚
 */
interface ClassInterface {
  log(msg: string): void;
}
interface ClassConstructor {
  new (name: string, age: number): ClassInterface;
}

class Person implements ClassInterface {
  constructor(name: string, age: number) {}

  log(msg) {
    console.log(msg);
  }
}

function createPerson(C: ClassConstructor, name: string, age: number): ClassInterface {
  return new C(name, age);
}

const person = createPerson(Person, 'KokoTa', 24);

console.log(person);

/**
 * 当接口继承了某个类，而这个类中有私有属性，则子类必须继承这个类才能使用该接口
 */
class FatherClass {
  private name: string
}
interface FatherInstance extends FatherClass {
  age: number
}
class ChildClass extends FatherClass implements FatherInstance {
  age: number
}