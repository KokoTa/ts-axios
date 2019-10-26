import { AxiosResponse } from './../src/types/index'
import './JasmineConfig'
import axios, { AxiosRequestConfig, AxiosError } from './../src/index'
import { getAjaxRequest } from './helper'

describe('instance', () => {
  beforeEach(() => {
    jasmine.Ajax.install()
  })

  afterEach(() => {
    jasmine.Ajax.uninstall()
  })

  test('should make a http request without verb helper', () => {
    const instance = axios.create()

    instance('/foo')

    return getAjaxRequest().then(req => {
      expect(req.url).toBe('/foo')
    })
  })

  test('should make a http request', () => {
    const instance = axios.create()

    instance.get('/foo')

    return getAjaxRequest().then(req => {
      expect(req.url).toBe('/foo')
      expect(req.method).toBe('GET') // xhr open 的时候大写化了
    })
  })

  test('should make a post request', () => {
    const instance = axios.create()

    instance.post('/foo')

    return getAjaxRequest().then(req => {
      expect(req.method).toBe('POST')
    })
  })

  test('should make a put request', () => {
    const instance = axios.create()

    instance.put('/foo')

    return getAjaxRequest().then(req => {
      expect(req.method).toBe('PUT')
    })
  })

  test('should make a patch request', () => {
    const instance = axios.create()

    instance.patch('/foo')

    return getAjaxRequest().then(req => {
      expect(req.method).toBe('PATCH')
    })
  })

  test('should make a options request', () => {
    const instance = axios.create()

    instance.options('/foo')

    return getAjaxRequest().then(req => {
      expect(req.method).toBe('OPTIONS')
    })
  })

  test('should make a delete request', () => {
    const instance = axios.create()

    instance.delete('/foo')

    return getAjaxRequest().then(req => {
      expect(req.method).toBe('DELETE')
    })
  })

  test('should make a head request', () => {
    const instance = axios.create()

    instance.head('/foo')

    return getAjaxRequest().then(req => {
      expect(req.method).toBe('HEAD')
    })
  })

  test('should use instance options', () => {
    const instance = axios.create({ timeout: 1000 })

    instance.get('/foo')

    return getAjaxRequest().then(req => {
      expect(req.timeout).toBe(1000)
    })
  })

  test('should have defaults.headers', () => {
    const instance = axios.create({
      baseURL: 'http://example.com'
    })

    expect(typeof instance.defaults.headers).toBe('object')
    expect(typeof instance.defaults.headers.common).toBe('object')
  })

  test('should have interceptors on the instance', done => {
    axios.interceptors.request.use(config => {
      config.timeout = 2000
      return config
    })

    const instance = axios.create()

    instance.interceptors.request.use(config => {
      config.withCredentials = true
      return config
    })

    let response: AxiosResponse
    instance.get('/foo').then(res => (response = res))

    getAjaxRequest().then(req => {
      req.respondWith({
        status: 200
      })

      setTimeout(() => {
        expect(response.config.timeout).toBe(0) // axios 的设置和 instance 的设置是无关的
        expect(response.config.withCredentials).toBeTruthy()
        done()
      }, 100)
    })
  })

  test('should get config uri', () => {
    const fakeConfig: AxiosRequestConfig = {
      baseURL: 'http://www.baidu.com',
      url: '/get/1',
      params: {
        a: 1,
        b: 2
      }
    }

    expect(axios.getUri(fakeConfig)).toBe('http://www.baidu.com/get/1?a=1&b=2')
  })
})
