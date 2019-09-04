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
  for (let key in from) {
    // for in 会遍历 prototype
    ;(to as T & U)[key] = from[key] as any
  }
  return to as T & U
}

// 深拷贝，后者 key 值会覆盖前者同名 key 值
export function deepMerge(...objs: any[]): any {
  const result = Object.create(null)
  // 遍历多个对象的键值对，然后合并到一个新的对象上
  objs.forEach(obj => {
    if (obj) {
      Object.keys(obj).forEach(key => {
        const val = obj[key]
        if (isPlainObject(val)) {
          if (isPlainObject(result[key])) {
            result[key] = deepMerge(result[key], val)
          } else {
            result[key] = deepMerge(val)
          }
        } else {
          result[key] = val
        }
      })
    }
  })

  return result
}
