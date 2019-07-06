/**
 * 请求路径处理文件
 */
import { isDate, isPlainObject } from './util'

// 转义，有一些字符还需要再转义回来
function encode(val: string): string {
  // encodeURIComponent 转义除了字母、数字、(、)、.、!、~、*、'、-和_之外的所有字
  return encodeURIComponent(val)
    .replace(/%40/g, '@')
    .replace(/%3A/gi, ':') // 带有字母的都要以 ig 模式匹配，因为有可能会包含小写
    .replace(/%24/g, '$')
    .replace(/%2C/gi, ',')
    .replace(/%20/g, '+')
    .replace(/%5B/gi, '[')
    .replace(/%5D/gi, ']')
}

/**
 * 拼接请求路径
 * @param url 请求路径
 * @param params 请求参数
 */
export function buildURL(url: string, params?: any): string {
  if (!params) {
    return url
  }

  const parts: string[] = []

  Object.keys(params).forEach(key => {
    const val = params[key]
    // 如果值为空
    if (val === null || val === undefined) {
      return
    }

    // 如果值不为空，那就赋为数组形式
    let vals = []
    if (Array.isArray(val)) {
      vals = val
      key += '[]'
    } else {
      vals = [val]
    }
    vals.forEach(val => {
      if (isDate(val)) {
        val = val.toISOString()
      } else if (isPlainObject(val)) {
        val = JSON.stringify(val)
      }
      parts.push(`${encode(key)}=${encode(val)}`)
    })
  })

  let serializedParams: string = parts.join('&')

  if (serializedParams) {
    const hashIndex = url.indexOf('#')
    if (hashIndex !== -1) {
      url = url.slice(0, hashIndex) // 不要 hash
    }
    url += (url.indexOf('?') === -1 ? '?' : '&') + serializedParams // 判断 url 是否尾部已经带参数
  }

  return url
}
