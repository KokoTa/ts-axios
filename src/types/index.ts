import { get } from 'https'
import { transformRequest } from '../helpers/data'

/**
 * 类型声明文件
 */

export type Method =
  | 'get'
  | 'GET'
  | 'post'
  | 'POST'
  | 'put'
  | 'PUT'
  | 'delete'
  | 'DELETE'
  | 'head'
  | 'HEAD'
  | 'options'
  | 'OPTIONS'
  | 'patch'
  | 'PATCH'

export interface AxiosRequestConfig {
  url?: string // 通过扩展接口调用后，url 就不是必选属性了
  method?: Method
  data?: any
  params?: any
  headers?: any
  responseType?: XMLHttpRequestResponseType // TS 自带的类型
  timeout?: number
  transformRequest?: AxiosTransformer | AxiosTransformer[]
  transformResponse?: AxiosTransformer | AxiosTransformer[]
  cancelToken?: CancelToken

  [propName: string]: any
}

export interface AxiosResponse<T = any> {
  data: T
  status: number
  statusText: string
  headers: any
  config: AxiosRequestConfig
  request: any
}

// 使用 Promise 泛型接口，指定 resolve 返回的数据为 AxiosResponse；注意这里 T = any 意味着传不传泛型都可以
export interface AxiosPromise<T = any> extends Promise<AxiosResponse<T>> {}

export interface AxiosError extends Error {
  isAxiosError: boolean
  config: AxiosRequestConfig
  code?: string | null
  request?: any
  response?: AxiosResponse
}

export interface Axios {
  defaults: AxiosRequestConfig

  interceptors: {
    request: AxiosInterceptorManager<AxiosRequestConfig>
    response: AxiosInterceptorManager<AxiosResponse>
  }

  request<T = any>(config: AxiosRequestConfig): AxiosPromise<T>

  get<T = any>(url: string, config?: AxiosRequestConfig): AxiosPromise<T>
  delete<T = any>(url: string, config?: AxiosRequestConfig): AxiosPromise<T>
  head<T = any>(url: string, config?: AxiosRequestConfig): AxiosPromise<T>
  options<T = any>(url: string, config?: AxiosRequestConfig): AxiosPromise<T>

  post<T = any>(url: string, data?: any, config?: AxiosRequestConfig): AxiosPromise<T>
  put<T = any>(url: string, data?: any, config?: AxiosRequestConfig): AxiosPromise<T>
  patch<T = any>(url: string, data?: any, config?: AxiosRequestConfig): AxiosPromise<T>
}

// Axios 默认可以调用自己，但也可以通过扩展接口调用
export interface AxiosInstance extends Axios {
  <T = any>(config: AxiosRequestConfig): AxiosPromise<T>
  <T = any>(url: string, config?: AxiosRequestConfig): AxiosPromise<T>
}

export interface AxiosInterceptorManager<T> {
  use(resolved: ResolvedFn<T>, rejected?: RejectedFn): number // 返回一个拦截器 id，用于拦截器的删除
  eject(id: number): void
}

// 泛型类型可能是 AxiosRequestConfig 或者 AxiosResponse
export interface ResolvedFn<T> {
  (val: T): T | Promise<T>
}

export interface RejectedFn {
  (error: any): any
}

export interface AxiosTransformer {
  (data: any, headrs?: any): any
}

export interface AxiosStatic extends AxiosInstance {
  create(config: AxiosRequestConfig): AxiosInstance
}

// 取消类实例类型
export interface CancelToken {
  promise: Promise<string> // 一个 pending 状态的 promise，执行取消操作时触发，中断请求
  reason?: string
}

// 取消函数
export interface Canceler {
  (message?: string): void
}

// 取消执行器
export interface CancelExecutor {
  (cancel: Canceler): void
}

export interface CancelTokenSource {
  token: CancelToken
  cancel: Canceler
}

// 取消类类类型
export interface CancelTokenStatic {
  new(executor: CancelExecutor): CancelToken
  source(): CancelTokenSource
}
