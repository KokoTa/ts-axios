/**
 * 泛型接口
 */
interface FanI<T> {
  (arg: T): T;
}

function fn(arg) {
  return arg;
}

const f1: FanI<string> = fn;

/**
 * 泛型类，只应用于实例属性和方法，静态的不行
 */
class FanC<T> {
  value: T;
  add: (x: T, y: T) => T;
}

const f2 = new FanC<number>();

/**
 * 利用接口约束泛型
 */
interface LengthInterface {
  length: number;
}

function identity<T extends LengthInterface>(arg: T): T {
  console.log(arg.length);
  return arg;
}

identity([ 1, 2, 3 ]);

/**
 * 利用 keyof 约束泛型，约束 K 必须是 T 内部的属性
 */
function getType<T, K extends keyof T>(obj: T, key: K) {
  return obj[key];
}

const x = {
  a: 1,
  b: 2,
  c: 3
};

getType(x, 'a');

/**
 * 利用类约束泛型，这里约定 T 继承自 Animal
 */
class Animal {
  type: string;
}

class AnimalTag {
  tag: string;
}

class Dog extends Animal {
  obj: AnimalTag;
}

class Other {
  obj: AnimalTag;
}

function createInstance<T extends Animal>(C: new () => T): T {
  return new C();
}

const animalInstance = createInstance(Dog);
console.log(animalInstance.obj.tag);
