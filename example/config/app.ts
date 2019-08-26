import { AxiosTransformer } from './../../src/types/index';
import axios from '../../src/index'
import qs from 'qs'

axios.defaults.headers.common['test1'] = "Hello"
axios.defaults.headers.post['test2'] = "World"

/**
 * config merge
 */
axios({
  url: '/config/post',
  method: 'post',
  data: qs.stringify({
    a: 1
  }),
  headers: {
    test3: 'HAHAHA'
  }
}).then((res) => console.log(res.data))


/**
 * data transfrom
 */
axios({
  url: '/config/post',
  method: 'post',
  data: {
    a: 1
  },
  transformRequest: [
    function(data) {
      return qs.stringify(data)
    },
    ...axios.defaults.transformRequest as AxiosTransformer[] // 该默认函数数组只有一个函数，作用是处理请求头
  ],
  transformResponse: [
    ...axios.defaults.transformResponse as AxiosTransformer[], // 该默认函数数组只有一个函数，作用是解析 json 字符串
    function(data) {
      if (typeof data === 'object') {
        data.b = 2
      }
      return data
    }
  ]
}).then((res) => console.log(res.data))

/**
 * create instance
 */
const config = {
  transformRequest: [
    function(data) {
      return qs.stringify(data)
    },
    ...axios.defaults.transformRequest as AxiosTransformer[] // 该默认函数数组只有一个函数，作用是处理请求头
  ],
  transformResponse: [
    ...axios.defaults.transformResponse as AxiosTransformer[], // 该默认函数数组只有一个函数，作用是解析 json 字符串
    function(data) {
      if (typeof data === 'object') {
        data.b = 2
      }
      return data
    }
  ]
}

const instance = axios.create(config)

instance({
  url: '/config/post',
  method: 'post',
  data: {
    a: 1
  }
}).then((res) => console.log(res.data))
