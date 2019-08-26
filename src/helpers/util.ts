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

  objs.forEach(obj => {
    if (obj) {
      Object.keys(obj).forEach(key => {
        const val = obj[key]
        // 判断是否是对象来进行递归
        if (isPlainObject(val)) {
          // 如果是对象，那么还需要判断是否存在对应键值对，存在的话需要合并
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
