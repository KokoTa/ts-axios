/**
 * 工具函数
 */
const toString = Object.prototype.toString

export function isDate(val: any): val is Date {
  return toString.call(val) === '[object Date]'
}

export function isObject(val: any): boolean {
  return val !== null && typeof val === 'object'
}
