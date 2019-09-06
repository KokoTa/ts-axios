import { AxiosRequestConfig, AxiosPromise } from '../types/index'
import xhr from './xhr'
import { buildURL, isAbsoluteURL, combineURL, transformURL } from '../helpers/url'
import { flatterHeaders } from '../helpers/headers'
import transform from './transform'

function processConfig(config: AxiosRequestConfig): void {
  config.url = transformURL(config) // 拼接 URL
  config.data = transform(config.data, config.headers, config.transformRequest) // 根据函数改变 data 和 headers
  config.headers = flatterHeaders(config.headers, config.method!) // 请求头扁平化
}

function throwErrorIfCancelTokenUsed(config: AxiosRequestConfig) {
  if (config.cancelToken) {
    // 检查取消器是否被使用，如果是则直接抛出错误，不用继续请求了
    config.cancelToken.throwIfRequested()
  }
}

// 执行 dispatch 之前会先执行 request 拦截器，返回数据后再执行 response 拦截器
function dispatch(config: AxiosRequestConfig): AxiosPromise {
  throwErrorIfCancelTokenUsed(config)
  processConfig(config)
  return xhr(config).then(res => {
    res.data = transform(res.data, res.headers, res.config.transformResponse) // 根据函数改变 data 和 headers
    return res
  })
}

export default dispatch
