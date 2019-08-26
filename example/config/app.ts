import axios from '../../src/index'
import qs from 'qs'

axios.defaults.headers.common['test1'] = "Hello"
axios.defaults.headers.post['test2'] = "World"

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
