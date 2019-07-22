import { AxiosInstance } from './types/index';
import Axios from './core/Axios';
import { extend } from './helpers/util';

function createInstance(): AxiosInstance {
  const context = new Axios()
  const instance = Axios.prototype.request.bind(context)

  extend(instance, context) // 合并原型方法

  return instance as AxiosInstance
}

const axios = createInstance()

export default axios
