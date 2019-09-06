import { AxiosError } from './../../src/types/index';
import axios from '../../src/index'
import Nprogress from 'nprogress'
import 'nprogress/nprogress.css'
import qs from 'qs'

/**
 * withCredentails
 */
document.cookie = 'a=b;'
document.cookie = 'aa=bb;'

axios.get('/more/get').then((res) => console.log(res))

axios.get('http://localhost:8888/more/get', {
  withCredentials: false
}).then((res) => console.log(res))

axios.get('http://localhost:8888/more/get', {
  withCredentials: true
}).then((res) => console.log(res))

/**
 * cookie name
 */
const instance = axios.create({
  xsrfCookieName: 'COOKIE-TOKEN',
  xsrfHeaderName: 'HEADER-TOKEN'
})

instance.get('/more/get').then((res) => console.log(res))

/**
 * progress
 */

// 计算进度条百分比
function getPercent(loaded: number, total: number) {
  console.log(loaded, total)
  return loaded / total
}
// 进图条操作函数
function loadBar() {
  const start = () => {
    instance.interceptors.request.use((config) => {
      Nprogress.start()
      return config
    })
  }

  const update = () => {
    const progress = (e: ProgressEvent) => {
      Nprogress.set(getPercent(e.loaded, e.total))
    }
    instance.defaults.onDownloadProgress = progress
    instance.defaults.onUploadProgress = progress
  }

  const end = () => {
    instance.interceptors.response.use((response) => {
      Nprogress.done()
      return response
    }, (err) => {
      Nprogress.done()
      return Promise.reject(err)
    })
  }

  start()
  update()
  end()
}
loadBar()

// 下载逻辑
const download = document.querySelector('#download')
download.addEventListener('click', () => {
  instance.get('https://tse4-mm.cn.bing.net/th?id=OIP.f8OZbEc42FwD-qi4gF15HQAAAA&w=177&h=171&c=7&o=5&pid=1.7')
})

// 上传逻辑
const upload = document.querySelector('#upload')
const fileDOM = document.querySelector('#file') as HTMLInputElement
upload.addEventListener('click', () => {
  const data = new FormData()
  if (fileDOM.files) {
    data.append('file', fileDOM.files[0])
    instance.post('/more/upload', data)
  }
})

/**
 * auth
 */
axios.post('/more/post', {
  a: 1
}, {
  auth: {
    username: 'KokoTa',
    password: '123456'
  }
}).then((res) => console.log(res))

/**
 * validateStatus
 */
axios.get('/more/304')
  .then((res) => console.log(res))
  .catch((e: AxiosError) => console.log(e.message))
axios.get('/more/304', {
    validateStatus(status: number) {
      return status >= 200 && status < 400
    }
  })
  .then((res) => console.log(res))
  .catch((e: AxiosError) => console.log(e.message))

/**
 * validateSerializer
 */
axios.get('/more/get', {
  params: new URLSearchParams('a=b&c=d')
}).then((res) => console.log(res))

axios.get('/more/get', {
  params: {
    a: 1,
    b: 2,
    c: ['a', 'b', 'c']
  }
}).then((res) => console.log(res))

axios.get('/more/get', {
  params: {
    a: 1,
    b: 2,
    c: ['a', 'b', 'c']
  },
  paramsSerializer(params) {
    return qs.stringify(params, {
      arrayFormat: 'brackets'
    })
  }
})

/**
 * baseURL
 */
instance.defaults.baseURL = 'https://tse4-mm.cn.bing.net/'
instance.get('/th?id=OIP.f8OZbEc42FwD-qi4gF15HQAAAA&w=177&h=171&c=7&o=5&pid=1.7')
instance.get('https://tse4-mm.cn.bing.net/th?id=OIP.f8OZbEc42FwD-qi4gF15HQAAAA&w=177&h=171&c=7&o=5&pid=1.7')

/**
 * all/spread/getUri
 */
function getA() {
  return axios.get('/more/a')
}
function getB() {
  return axios.get('/more/b')
}

axios.all([getA(), getB()])
  .then(([resA, resB]) => {
    console.log(resA.data, resB.data)
  })

axios.all([getA(), getB()])
  .then(axios.spread((resA, resB) => {
    console.log(resA.data, resB.data)
  }))

const fackConfig = {
  baseURL: 'http://www.baidu.com',
  url: '/get/1',
  params: {
    a: 1,
    b: 2,
    c: ['a', 'b', 'c']
  }
}
console.log(axios.getUri(fackConfig))
