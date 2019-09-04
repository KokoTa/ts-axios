import axios from '../../src/index'


/**
 * cancelToken 的使用方法
 * 方法一：直接生成实例
 */
const CancelToken = axios.CancelToken
let cancel
axios.get('/simple/get', {
  cancelToken: new CancelToken(c => cancel = c)
}).catch((err) => {
  if (axios.isCancel(err)) {
    console.log(err.message);
  }
})
cancel("cancel 1")

/**
 * 方法二： 调用工厂方法生成实例，换汤不换药
 */
const CancelToken2 = axios.CancelToken
const source = CancelToken2.source()
axios.get('/simple/get', {
  cancelToken: source.token
}).catch((err) => {
  if (axios.isCancel(err)) {
    console.log(err.message);
  }
})
source.cancel("cancel 2")

/**
 * 测试 throwIfRequested
 */
axios.get('/simple/get', {
  cancelToken: source.token
}).catch((err) => {
  if (axios.isCancel(err)) {
    console.log(err.message);
  }
})
source.cancel("cancel 3")
