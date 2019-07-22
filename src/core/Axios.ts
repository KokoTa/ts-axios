import { AxiosRequestConfig, AxiosPromise, Method } from './../types/index';
import dispatch from './dispatch';

export default class Axios {
  request(url: any, config?: any): AxiosPromise {
    if (typeof url === 'string') { // 当请求参数有两个，即调用形式和 get/delete/head... 等一样
      if (!config) config = {}
      config.url = url
    } else { // 当请求参数只有一个时，url 就是 config
      config = url
    }
    return dispatch(config)
  }

  // 无数据请求通用函数
  requestMethodWithoutData(method: Method, url: string, config?: AxiosRequestConfig): AxiosPromise {
    return this.request({
      ...config || {},
      method,
      url,
    })
  }
  // 带数据请求通用函数
  requestMethodWithData(method: Method, url: string, data: any, config?: AxiosRequestConfig): AxiosPromise {
    return this.request({
      ...config || {},
      method,
      url,
      data,
    })
  }

  get(url: string, config?: AxiosRequestConfig): AxiosPromise {
    return this.requestMethodWithoutData('get', url, config)
  }
  delete(url: string, config?: AxiosRequestConfig): AxiosPromise {
    return this.requestMethodWithoutData('delete', url, config)
  }
  head(url: string, config?: AxiosRequestConfig): AxiosPromise {
    return this.requestMethodWithoutData('head', url, config)
  }
  options(url: string, config?: AxiosRequestConfig): AxiosPromise {
    return this.requestMethodWithoutData('options', url, config)
  }

  post(url: string, data?: any, config?: AxiosRequestConfig): AxiosPromise {
    return this.requestMethodWithData('post', url, data, config)
  }
  put(url: string, data?: any, config?: AxiosRequestConfig): AxiosPromise {
    return this.requestMethodWithData('put', url, data, config)
  }
  patch(url: string, data?: any, config?: AxiosRequestConfig): AxiosPromise {
    return this.requestMethodWithData('patch', url, data, config)
  }
}
