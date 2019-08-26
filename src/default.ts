import { AxiosRequestConfig } from './types/index'

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
  }
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
