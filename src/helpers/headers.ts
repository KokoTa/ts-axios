/**
 * 请求头处理
 */
import { isPlainObject } from './util'

/**
 * 规范请求头名称
 * @param headers 请求头对象
 * @param normalizedName 请求头名称
 */
function normalizeHeaderName (headers: any, normalizedName: string): void {
  if (!headers) return
  Object.keys(headers).forEach((name) => {
    if (name !== normalizedName && name.toUpperCase() === normalizedName.toUpperCase()) {
      headers[normalizedName] = headers[name]
      delete headers[name]
    }
  })
}

/**
 * 规范化请求头
 * @param headers 请求头对象
 * @param data 发送的数据
 */
export function processHeaders (headers: any, data: any): any {
  normalizeHeaderName(headers, 'Content-Type')

  if (isPlainObject(data)) {
    if (headers && !headers['Content-Type']) {
      headers['Content-Type'] = 'application/json;charset=utf-8'
    }
  }

  return headers
}


/**
 * 将 string header 转换成 key-value 格式
 * @param headers 请求头字符串
 */
export function parseHeaders (headers: string): any {
  let parsed = Object.create(null)
  if (!headers) return parsed

  headers.split('\r\n').forEach((line) => {
    let [key, val] = line.split(':')
    if (!key || !val) return
    key = key.trim().toLowerCase()
    val = val.trim()
    parsed[key] = val
  })

  return parsed
}
