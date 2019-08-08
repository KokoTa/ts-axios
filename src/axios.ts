import { AxiosInstance } from './types/index';
import Axios from './core/Axios';
import { extend } from './helpers/util';

function createInstance(): AxiosInstance {
  const context = new Axios() // 生成 Axios 实例，实例包含所有请求方法
  const instance = Axios.prototype.request.bind(context) // 单独提取 request 方法，即 demo 中调用 axios() 等于调用 Axios.prototype.request
  // console.log(instance, context)

  extend(instance, context) // 合并，让 intance 函数拥有所有请求方法

  return instance as AxiosInstance
}

const axios = createInstance()

export default axios
