import { Method } from './../types/index'
/**
 * 请求头处理
 */
import { isPlainObject, deepMerge } from './util'

/**
 * 规范大小写
 * @param headers 请求头对象
 * @param normalizedName 请求头名称
 */
function normalizeHeaderName(headers: any, normalizedName: string): void {
  if (!headers) return
  Object.keys(headers).forEach(name => {
    if (name !== normalizedName && name.toUpperCase() === normalizedName.toUpperCase()) {
      headers[normalizedName] = headers[name]
      delete headers[name]
    }
  })
}

/**
 * 定义 Content-Type
 * @param data 发送的数据
 * @param headers 请求头对象
 */
export function processHeaders(data: any, headers: any): any {
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
export function parseHeaders(headers: string): any {
  let parsed = Object.create(null)
  if (!headers) return parsed

  headers.split('\r\n').forEach(line => {
    let [key, ...vals] = line.split(':') // 可能会出现 key: x:xx:xxx 的情况
    key = key.trim().toLowerCase()
    if (!key) return
    let val = vals.join(':')
    val = val.trim()
    parsed[key] = val
  })

  return parsed
}

/**
 * 请求头配置扁平化
 * @param headers 头信息配置对象(见 defaults.ts)
 * @param method 请求的方法
 */
export function flatterHeaders(headers: any, method: Method) {
  if (!headers) return headers

  // 先深拷贝所有键值对，然后过滤，只保留值为字符串的键值对；注意合并顺序
  headers = deepMerge(headers.common, headers[method], headers)

  // 删掉 headers 中的子对象，只保留值为字符串的键值对
  const methodsToDelete = ['get', 'post', 'put', 'delete', 'patch', 'head', 'options', 'common']
  methodsToDelete.forEach(method => {
    delete headers[method]
  })

  return headers
}
