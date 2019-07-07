import axios from '../../src/index'

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
  console.log(err)
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
  console.log(err)
})
