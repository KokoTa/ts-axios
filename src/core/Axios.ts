import { AxiosRequestConfig, AxiosPromise, Method, AxiosResponse, ResolvedFn, RejectedFn } from './../types/index';
import dispatch from './dispatch';
import InterceptorManager from './InterceptorManager';

interface Interceptor {
  request: InterceptorManager<AxiosRequestConfig> // 类实例类型
  response: InterceptorManager<AxiosResponse>
}

interface PromiseChain<T> {
  resolved: ResolvedFn<T> | ((config: AxiosRequestConfig) => AxiosPromise), // 注意这里允许两种类型
  rejected?: RejectedFn // 拦截器的 reject 是可选的
}

export default class Axios {
  interceptors: Interceptor

  constructor() {
    this.interceptors = {
      request: new InterceptorManager<AxiosRequestConfig>(),
      response: new InterceptorManager<AxiosResponse>()
    }
  }

  request(url: any, config?: any): AxiosPromise {
    if (typeof url === 'string') { // 当请求参数有两个，即调用形式和 get/delete/head... 一样
      if (!config) config = {}
      config.url = url
    } else { // 当请求参数只有一个时，url 就是 config
      config = url
    }

    // 请求时并不是直接请求，而是经过一系列中间件后再发送请求
    const chain: PromiseChain<any>[] = [
      {
        resolved: dispatch,
        rejected: undefined
      }
    ]

    // 添加拦截器(中间件)，请求拦截器的顺序是先添加后执行
    this.interceptors.request.forEach((interceptor) => {
      chain.unshift(interceptor)
    })
    // 响应拦截器的顺序是先添加先执行
    this.interceptors.response.forEach((interceptor) => {
      chain.push(interceptor)
    })

    // 开始执行调用连
    let promise = Promise.resolve(config)

    while(chain.length) {
      const { resolved, rejected } = chain.shift()!
      promise = promise.then(resolved, rejected)
    }

    return promise
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
