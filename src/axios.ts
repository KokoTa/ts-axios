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

axios.CancelToken = CancelToken
axios.Cancel = Cancel
axios.isCancel = isCancel

export default axios
