import { AxiosRequestConfig } from './types/index'
import { processHeaders } from './helpers/headers'
import { transformRequest, transformResponse } from './helpers/data'

const defaults: AxiosRequestConfig = {
  method: 'get',
  timeout: 0,
  headers: {
    // 基本头信息(各个请求类型都会有的头信息)
    common: {
      Accept: 'application/json, text/plain, */*'
    },
    // 其他信息
    test: '123456'
  },
  // 请求前处理数据
  transformRequest: [
    // 处理请求头
    function(data: any, headers: any): any {
      // 处理请求头
      processHeaders(data, headers)
      // 转为 json
      return transformRequest(data)
    }
  ],
  // 响应前处理数据
  transformResponse: [
    // 解析 json 字符串
    function(data: any): any {
      return transformResponse(data)
    }
  ],
  xsrfCookieName: 'XSRF-TOKEN',
  xsrfHeaderName: 'X-XSRF-TOKEN'
}

// 根据不同请求类型设置头信息
const methodsNoData = ['delete', 'get', 'head', 'options']
methodsNoData.forEach(method => {
  defaults.headers[method] = {}
})
const methodWithData = ['post', 'put', 'patch']
methodWithData.forEach(method => {
  defaults.headers[method] = {
    'Content-Type': 'application/x-www-form-urlencoded'
  }
})

export default defaults
