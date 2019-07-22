import { AxiosRequestConfig, AxiosPromise, Method } from './../types/index';
import dispatch from './dispatch';

export default class Axios {
  request(config: AxiosRequestConfig): AxiosPromise {
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
