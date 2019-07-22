import axios from '../../src/index'

/**
 * 扩展接口测试
 */
axios({
  url: '/extend/post',
  method: 'post',
  data: {
    msg: 'origin request'
  }
})

axios('/extend/post', {
  method: 'post',
  data: {
    msg: 'origin request'
  }
})

axios.get('/extend/get')
axios.options('/extend/options')
axios.delete('/extend/delete')
axios.head('/extend/head')
axios.post('/extend/post', { msg: 'post' })
axios.put('/extend/put', { msg: 'put' })
axios.patch('/extend/patch', { msg: 'patch' })

/**
 * 泛型约束返回数据
 */
interface ResponseType<T=any> {
  code: number,
  message: string,
  result: T
}
interface UserType {
  name: string,
  age: number
}

function getUser<T>() {
  return axios<ResponseType<T>>('/extend/user')
    .then(res => res.data)
    .catch(err => console.log(err))
}

async function getData() {
  const data = await getUser<UserType>()
  if (data) console.log(data);
}

getData()
