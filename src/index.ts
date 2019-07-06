import { AxiosRequestConfig } from './types/index'
import xhr from './xhr'
import { buildURL } from './helpers/url'
import { transformRequest } from './helpers/data'
import { processHeaders } from './helpers/headers'

function axios(config: AxiosRequestConfig): void {
  processConfig(config)
  xhr(config)
}

function processConfig(config: AxiosRequestConfig): void {
  const { url, params, data, headers = {} } = config
  config.url = buildURL(url, params) // 拼接请求路径
  config.headers = processHeaders(headers, data) // 规范化请求头，这里处理头信息一定要放在处理数据之前
  config.data = transformRequest(data) // 转换请求数据
}


export default axios
