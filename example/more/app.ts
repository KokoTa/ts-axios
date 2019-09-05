import axios from '../../src/index'


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
