import axios, { AxiosError } from '../../src/index'

/**
 * GET
 */
axios({
  method: 'get',
  url: '/base/get',
  params: {
    foo: ['bar', 'baz']
  }
})

axios({
  method: 'get',
  url: '/base/get',
  params: {
    foo: {
      bar: 'baz'
    }
  }
})

const date = new Date()
axios({
  method: 'get',
  url: '/base/get',
  params: {
    foo: date
  }
})

axios({
  method: 'get',
  url: '/base/get',
  params: {
    foo: 'bar',
    baz: null
  }
})

axios({
  method: 'get',
  url: '/base/get?foo=bar',
  params: {
    bar: 'baz'
  }
})

axios({
  method: 'get',
  url: '/base/get#hash',
  params: {
    foo: 'bar'
  }
})

axios({
  method: 'get',
  url: '/base/get',
  params: {
    foo: '@:$'
  }
})

/**
 * POST
 */
axios({
  method: 'post',
  url: '/base/post',
  data: {
    a: 1,
    b: 2
  }
})

axios({
  method: 'post',
  url: '/base/post',
  headers: {
    'content-type': 'application/json',
    'accept': 'application/json, text/plain, */*'
  },
  data: {
    a: 1,
    b: 2
  }
})

const paramsString = "q=URLUtils.searchParams&topic=api"
const searchParams = new URLSearchParams(paramsString) // 查询字符串对象 "[object URLSearchParams]"，浏览器会自动设置合适的 content-type 为 application/x-www-form-urlencoded;charset=UTF-8（覆盖掉我们自己设置的值），formData 等类型同理
axios({
  method: 'post',
  url: '/base/post',
  data: searchParams
})

const arr = new Int32Array([23, 31]) // 二进制数据 "[object Int32Array]"
axios({
  method: 'post',
  url: '/base/buffer',
  data: arr
})

/**
 * Promise
 */
axios({
  method: 'post',
  url: '/base/post',
  data: {
    a: 1,
    b: 2
  }
}).then((res) => {
  console.log(res)
}).catch((err) => {
  console.error(err)
})

axios({
  method: 'post',
  url: '/base/post',
  responseType: 'json', // 设置返回数据的类型
  data: {
    a: 1,
    b: 2
  }
}).then((res) => {
  console.log(res)
}).catch((err) => {
  console.error(err)
})

/**
 * Error
 */

// 返回错误码
axios({
  method: 'get',
  url: '/base/error'
}).then((res) => {
  console.log(res)
}).catch((err) => {
  console.error(err)
})

// 网络错误，这里设置一个 5s 的定时器，在 5s 内通过 chrome 控制台选择 offline 模式，使 5s 后的请求失败
// setTimeout(() => {
//   axios({
//     method: 'get',
//     url: '/base/error'
//   }).then((res) => {
//     console.log(res)
//   }).catch((err) => {
//     console.error(err)
//   })
// }, 5000);

// 请求未超时
axios({
  method: 'get',
  url: '/base/timeout'
}).then((res) => {
  console.log(res)
}).catch((err) => {
  console.error(err)
})

// 请求超时
axios({
  method: 'get',
  url: '/base/timeout',
  timeout: 1000
}).then((res) => {
  console.log(res)
}).catch((err: AxiosError) => {
  console.error(err.message)
})
