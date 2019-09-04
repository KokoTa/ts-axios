import { AxiosRequestConfig, AxiosPromise } from '../types/index'
import xhr from './xhr'
import { buildURL } from '../helpers/url'
import { flatterHeaders } from '../helpers/headers'
import transform from './transform'

function processConfig(config: AxiosRequestConfig): void {
  const { url, params, data, headers = {} } = config // 这里不抽取 data 和 headers 为副本，我们要直接操作其对应的原始对象
  config.url = buildURL(url!, params) // 拼接请求路径，感叹号标识这个值一定不为空
  config.data = transform(config.data, config.headers, config.transformRequest) // 根据函数改变 data 和 headers
  config.headers = flatterHeaders(config.headers, config.method!) // 请求头扁平化
}

function throwErrorIfCancelTokenUsed(config: AxiosRequestConfig) {
  if (config.cancelToken) { // 如果取消器已经被使用过，那么就直接抛出错误，不用继续请求了
    config.cancelToken.throwIfRequested()
  }
}

function dispatch(config: AxiosRequestConfig): AxiosPromise {
  throwErrorIfCancelTokenUsed(config)
  processConfig(config)
  return xhr(config).then(res => {
    res.data = transform(res.data, res.headers, res.config.transformResponse) // 根据函数改变 data 和 headers
    return res
  })
}

export default dispatch
