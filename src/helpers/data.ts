/**
 * 数据转换文件
 */
import { isPlainObject } from './util'

/**
 * 转为 json 字符串
 * @param data 发送的数据
 */
export function transformRequest(data: any): any {
  if (isPlainObject(data)) {
    return JSON.stringify(data)
  }
  return data
}

/**
 * 转为 json 对象
 * @param data 接收的数据
 */
export function transformResponse(data: any): any {
  if (typeof data === 'string') {
    try {
      data = JSON.parse(data)
    } catch (e) {
      // do nothing
    }
  }
  return data
}
