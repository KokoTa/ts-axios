/**
 * 工具函数
 */
const toString = Object.prototype.toString

export function isDate(val: any): val is Date {
  return toString.call(val) === '[object Date]'
}

export function isObject(val: any): val is Object {
  return val !== null && typeof val === 'object'
}

export function isPlainObject(val: any): val is Object {
  return toString.call(val) === '[object Object]'
}

// 将 from 的值都赋值给 to
export function extend<T, U>(to: T, from: U): T & U {
  for (let key in from) { // for in 会遍历 prototype
    (to as T & U)[key] = from[key] as any
  }
  return to as T & U
}
