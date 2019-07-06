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

export function processHeaders (headers: any, data: any): any {
  normalizeHeaderName(headers, 'Content-Type')

  if (isPlainObject(data)) { // 如果是数据是对象，就设置 type 为 json
    if (headers && !headers['Content-Type']) {
      headers['Content-Type'] = 'application/json;charset=utf-8'
    }
  }

  return headers
}
