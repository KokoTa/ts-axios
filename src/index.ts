import { AxiosRequestConfig } from './types/index'
import xhr from './xhr'
import { buildURL } from './helpers/url'

function axios(config: AxiosRequestConfig): void {
  processConfig(config) // 拼接请求路径
  xhr(config)
}

function processConfig(config: AxiosRequestConfig): void {
  const { url, params } = config
  config.url = buildURL(url, params)
}

export default axios
