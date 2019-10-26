import './JasmineConfig'
import { getAjaxRequest } from './helper'
import axios from '../src'

/**
 * 之前从基础方法角度来测试 headers
 * 现在从业务逻辑角度测试 headers
 */

// 测试信息头
function testHeaderValue(headers: any, key: string, val?: string): void {
  let found = false

  for (let k in headers) {
    if (k.toLowerCase() === key.toLowerCase()) {
      found = true
      expect(headers[k]).toBe(val)
      break
    }
  }

  if (!found) {
    if (typeof val === 'undefined') {
      expect(headers.hasOwnProperty(key)).toBeFalsy()
    } else {
      throw new Error(key + ' was not found in headers')
    }
  }
}

describe('headers', () => {
  beforeEach(() => {
    jasmine.Ajax.install()
  })

  afterEach(() => {
    jasmine.Ajax.uninstall()
  })

  test('should use default common headers', () => {
    const headers = axios.defaults.headers.common

    axios('/foo')

    return getAjaxRequest().then(req => {
      for (let key in headers) {
        if (headers.hasOwnProperty(key)) {
          expect(req.requestHeaders[key]).toEqual(headers[key]) // 可能是对象，所以用 toEqual
        }
      }
    })
  })

  test('should add extra headers for post', () => {
    axios.post('/foo', 'fizz=buzz')

    return getAjaxRequest().then(req => {
      testHeaderValue(req.requestHeaders, 'Content-Type', 'application/x-www-form-urlencoded')
    })
  })

  test('should use application/json when posting an object', () => {
    axios.post('/foo/bar', {
      firstName: 'foo',
      lastName: 'bar'
    })

    return getAjaxRequest().then(req => {
      testHeaderValue(req.requestHeaders, 'Content-Type', 'application/json;charset=utf-8')
    })
  })

  test('should remove content-type if data is empty', () => {
    axios.post('/foo')

    return getAjaxRequest().then(req => {
      testHeaderValue(req.requestHeaders, 'Content-Type', undefined)
    })
  })

  test('should preserve content-type if data is false', () => {
    axios.post('/foo', false)

    return getAjaxRequest().then(req => {
      testHeaderValue(req.requestHeaders, 'Content-Type', 'application/x-www-form-urlencoded')
    })
  })

  test('should preserve content-type if data is FormData', () => {
    const data = new FormData()
    data.append('foo', 'bar')

    axios.post('/foo', data)

    return getAjaxRequest().then(req => {
      testHeaderValue(req.requestHeaders, 'Content-Type', undefined)
    })
  })
})
