/**
 * 请求头处理
 */
import { isPlainObject } from './util'

// 规范大小写
function normalizeHeaderName (headers: any, normalizedName: string): void {
  if (!headers) return
  Object.keys(headers).forEach((name) => {
    if (name !== normalizedName && name.toUpperCase() === normalizedName.toUpperCase()) {
      headers[normalizedName] = headers[name]
      delete headers[name]
    }
  })
}

// 设置 content-type 为 json
export function processHeaders (headers: any, data: any): any {
  normalizeHeaderName(headers, 'Content-Type')

  if (isPlainObject(data)) {
    if (headers && !headers['Content-Type']) {
      headers['Content-Type'] = 'application/json;charset=utf-8'
    }
  }

  return headers
}


// 将 string header 转换成 key-value 格式
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
