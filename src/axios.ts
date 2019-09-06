import { AxiosRequestConfig, AxiosStatic } from './types/index'
import Axios from './core/Axios'
import { extend } from './helpers/util'
import defaultConfig from './default'
import mergeConfig from './core/mergeConfig';

import CancelToken from './cancel/CancelToken'
import Cancel, { isCancel } from './cancel/Cancel'

function createInstance(initConfig: AxiosRequestConfig): AxiosStatic {
  const context = new Axios(initConfig) // 生成 Axios 实例，实例包含所有请求方法
  const instance = Axios.prototype.request.bind(context) // 单独提取 request 方法，即 demo 中调用 axios() 等于调用 Axios.prototype.request
  // console.log(instance, context)

  extend(instance, context) // 合并，让 intance 函数拥有所有请求方法

  return instance as AxiosStatic
}

const axios = createInstance(defaultConfig)

// 创建新实例
axios.create = function(config: AxiosRequestConfig) {
  return createInstance(mergeConfig(defaultConfig, config))
}

// 取消器
axios.CancelToken = CancelToken
// 取消消息
axios.Cancel = Cancel
// 判断是否取消
axios.isCancel = isCancel

// Promise.all 的返回数组
// spread 方法传入 callback，这个函数的传参格式是 a1, a2, a3 这种格式，它是用户定义的处理函数
// spread 方法返回一个函数，这个函数中的 arr 就是 Promise.all 中返回的数组
// 两个方法结合起来本质上就是让 [a1, a2, a3] 变成 a1, a2, a3
axios.all = (promises) => {
  return Promise.all(promises)
}
axios.spread = (callback) => {
  return (arr) => {
    return callback.apply(null, arr)
  }
}

// 返回类本身
axios.Axios = Axios

export default axios
