import { AxiosRequestConfig, AxiosPromise, AxiosResponse } from '../types/index'
import { parseHeaders } from '../helpers/headers'
import { createError } from '../helpers/error'
import { isURLSameOrigin } from '../helpers/url'
import cookie from '../helpers/cookie'
import { isFormData } from '../helpers/util'

export default function xhr(config: AxiosRequestConfig): AxiosPromise {
  return new Promise((resolve, reject) => {
    const {
      data = null,
      url,
      method,
      headers = {},
      responseType,
      timeout,
      cancelToken,
      withCredentials,
      xsrfCookieName,
      xsrfHeaderName,
      onDownloadProgress,
      onUploadProgress,
      auth,
      validateStatus
    } = config

    const request = new XMLHttpRequest()

    // 配置请求属性
    function configureRequestParam() {
      if (responseType) {
        request.responseType = responseType
      }

      if (timeout) {
        request.timeout = timeout
      }

      if (withCredentials) {
        request.withCredentials = withCredentials
      }
    }

    // 配置请求头
    function configureRequestHeader() {
      // xsrf 处理
      if ((withCredentials || isURLSameOrigin(url!)) && xsrfCookieName && xsrfHeaderName) {
        // 把 token 从 cookie 中拿出来放到 header 里
        const value = cookie.read(xsrfCookieName)
        if (value) {
          headers[xsrfHeaderName] = value
        }
      }

      // 如果 data 类型是 FormData，则要删除 Content-Type 头，让浏览器去自己识别类型，因为 FormData 中可以保存多种类型的值(比如：字符串、文件等)
      if (isFormData(data)) {
        delete headers['Content-Type']
      }

      // 授权
      if (auth) {
        headers['Authorization'] = 'Basic ' + btoa(auth.username + ':' + auth.password)
      }

      // 赋值请求头
      Object.keys(headers).forEach(name => {
        if (data === null && name.toLowerCase() === 'content-type') {
          // 如果没数据就不需要赋值 content-type
          delete headers[name]
        } else {
          request.setRequestHeader(name, headers[name])
        }
      })
    }

    // 配置请求属性的处理事件
    function configureRequestEvent() {
      // 尝试执行 promise，这个 promise 是受控的
      if (cancelToken) {
        cancelToken.promise.then(reason => {
          request.abort()
          reject(reason)
        })
      }

      if (onDownloadProgress) {
        request.onprogress = onDownloadProgress
      }

      if (onUploadProgress) {
        request.upload.onprogress = onUploadProgress
      }

      request.onerror = () => {
        reject(createError('Network Error', config, null, request))
      }

      request.ontimeout = () => {
        reject(createError(`Timeout of ${timeout} ms exceeded`, config, 'ECONNABORTED', request))
      }
    }

    // 处理响应
    function processResponse() {
      function handleResponse(response: AxiosResponse) {
        if (!validateStatus || validateStatus(response.status)) {
          resolve(response)
        } else {
          reject(
            createError(
              `Request failed with status code ${response.status}`,
              config,
              null,
              request,
              response
            )
          )
        }
      }

      request.onreadystatechange = () => {
        if (request.readyState !== 4) {
          return
        }
        // 网络错误和超时错误时，status 为 0
        if (request.status === 0) {
          return
        }
        const resopnseHeaders = parseHeaders(request.getAllResponseHeaders())
        const responseData =
          responseType && responseType !== 'text' ? request.response : request.responseText
        const response: AxiosResponse = {
          data: responseData,
          status: request.status,
          statusText: request.statusText,
          headers: resopnseHeaders,
          config,
          request
        }
        handleResponse(response)
      }
    }

    request.open(method!.toUpperCase(), url!, true) // url! 表示即使 url 是可选属性，我们也可以断言它不为空，这时就需要我们保证代码的正确性了

    configureRequestParam()

    configureRequestHeader()

    configureRequestEvent()

    processResponse()

    request.send(data)
  })
}
