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
  url: string
  method?: Method
  data?: any
  params?: any,
  headers?: any,
  responseType?: XMLHttpRequestResponseType // TS 自带的类型
}

export interface AxiosResponse {
  data: any
  status: number
  statusText: string
  headers: any
  config: AxiosRequestConfig
  request: any
}

// 使用 Promise 泛型接口，指定 resolve 出来的数据为 AxiosResponse
export interface AxiosPromise extends Promise<AxiosResponse> {

}
