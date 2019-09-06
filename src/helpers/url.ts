import { AxiosRequestConfig } from './../types/index';
/**
 * 请求路径处理文件
 */
import { isDate, isPlainObject, isURLSearchParams } from './util'

/**
 * 转义，有一些字符还需要再转义回来
 * @param val 需要转义的值
 */
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
 * 拼接 URL 参数字段
 * @param url 请求路径
 * @param params 请求参数
 */
export function buildURL(url: string, params?: any, paramsSerializer?: (params: any) => string): string {
  if (!params) {
    return url
  }

  let serializedParams;

  if (paramsSerializer) {
    // 检查是否有自定义序列化函数
    serializedParams = paramsSerializer(params)
  } else if (isURLSearchParams(params)) {
    // 检查是否是 URLSearchParams 类型
    serializedParams = params.toString()
  } else {
    const parts: string[] = []

    Object.keys(params).forEach(key => {
      const val = params[key]
      // 如果值为空
      if (val === null || val === undefined) {
        return
      }

      // 如果值不为空
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

    serializedParams = parts.join('&')
  }


  if (serializedParams) {
    const hashIndex = url.indexOf('#')
    if (hashIndex !== -1) {
      url = url.slice(0, hashIndex) // 不要 hash
    }
    url += (url.indexOf('?') === -1 ? '?' : '&') + serializedParams // 判断 url 是否尾部已经带参数
  }

  return url
}

/**
 * 拼接 URL
 */
export function transformURL(config: AxiosRequestConfig): string {
  let { url, params, paramsSerializer, baseURL } = config // 这里不抽取 data 和 headers 为副本，我们要直接操作其对应的原始对象
  if (baseURL && !isAbsoluteURL(url!)) { // 检查是否有传 baseURL 且 url 不为绝对地址
    url = combineURL(baseURL, url)
  }
  return buildURL(url!, params, paramsSerializer) // 拼接请求路径，感叹号标识这个值一定不为空
}

/**
 * 检查是否是绝对路径
 * @param url 请求路径
 */
export function isAbsoluteURL(url: string): boolean {
  return /(^[a-z][a-z\d\+\-\.]*:)?\/\//i.test(url)
}

/**
 * 拼接 url
 */
export function combineURL(baseURL: string, relativeURL?: string): string {
  return relativeURL ? baseURL.replace(/\/+$/, '') + '/' + relativeURL.replace(/^\/+/, '') : baseURL
}

/**
 * 检查是否请求地址和当前地址同源
 * @param url 请求地址
 */
const curOrigin = parseURL(window.location.href)
export function isURLSameOrigin(url: string): boolean {
  const requestOrigin = parseURL(url)

  return (curOrigin.protocol === requestOrigin.protocol &&
          curOrigin.host === requestOrigin.host)
}

/**
 * 解析页面的协议和地址
 * @param url 需要解析的地址
 */
interface URLOrigin {
  protocol: string
  host: string
}
function parseURL(url: string): URLOrigin {
  const a = document.createElement('a')
  a.href = url

  const { protocol, host } = a

  return { protocol, host }
}
