/**
 * 这里指定了 C 为最佳通用类型
 */
class C {}

class A extends C {}

class B extends C {}

function createAB(): C[] {
  return [ new A(), new B() ];
}

/**
 * 这里的 e 默认会匹配 onclick 的上下文类型(系统自带的类型)
 * 上下文类型中没有 title 属性，会报错
 * 这里手动添加了一个 any 类型，不报错
 */
// window.onclick = function(e: any) {
//   console.log(e.title);
// };

/**
 * 交叉类型
 * 这里是合并对象的一个栗子
 */
function reset<T, U>(arr1: T, arr2: U): T & U {
  let res = {} as T & U; // 这里我们显式定义 res 是一个交叉类型对象，res: T&U = {} 会报错
  for (let i in arr1) {
    res[i] = arr1[i] as any; // 注意这里不使用 as any 会报错
  }
  for (let i in arr2) {
    res[i] = arr2[i] as any;
  }
  return res;
}

const r = reset({ a: 1 }, { b: 2 })
console.log(r)

/**
 * 联合类型
 * 这里是一个接口适配的栗子
 */
interface Bird {
  fly()
  speak()
}
interface Fish {
  swim()
  speak()
}

function getPet(): Bird | Fish {
  return {
    fly() {},
    swim() {},
    speak() {}
  }
}

const pet = getPet()
pet.speak() // 不会报错
// pet.swim() // 会报错，由于返回的是联合类型，所以可以使用的只能是共同存在的属性或方法

/**
 * 类型保护，解决了上个栗子的问题
 */
function isFish(pet: Fish | Bird): pet is Fish {
  return (pet as Fish).swim !== undefined
}

if (isFish(pet)) { // TS 会根据 pet is Fish 自动推导
  pet.swim()
} else {
  pet.fly()
}

/**
 * 编译器可能不能识别 null，因此用到的时候需要加 ! 断言
 */
function broken(name: string | null): string {
  function getBroken(str: string) {
    return str!.charAt(0)
  }
  name = name || 'Brain'
  return getBroken(name)
}

console.log(broken('KokoTa'))
