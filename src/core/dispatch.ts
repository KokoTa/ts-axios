import { AxiosRequestConfig, AxiosPromise } from '../types/index'
import xhr from './xhr'
import { buildURL } from '../helpers/url'
import { transformRequest, transformResponse } from '../helpers/data'
import { processHeaders, flatterHeaders } from '../helpers/headers'

function processConfig(config: AxiosRequestConfig): void {
  const { url, params, data, headers = {} } = config
  config.url = buildURL(url!, params) // 拼接请求路径，感叹号标识这个值一定不为空
  config.headers = processHeaders(headers, data) // 规范化请求头，这里处理头信息一定要放在处理数据之前
  console.log(config.headers)
  config.data = transformRequest(data) // 尝试转换为 json
  config.headers = flatterHeaders(config.headers, config.method!) // 请求头扁平化
}

function dispatch(config: AxiosRequestConfig): AxiosPromise {
  processConfig(config)
  return xhr(config).then(res => {
    res.data = transformResponse(res.data) // 如果没有设置 responseType，尝试解析为 json
    return res
  })
}

export default dispatch
