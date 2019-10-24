import { parseHeaders, processHeaders, flatterHeaders } from '../../src/helpers/headers'

describe('helpers:headers', () => {
  describe('parseHeaders', () => {
    test('should parse headers', () => {
      const parsed = parseHeaders(
        'Content-Type: application/json\r\n' + 'Connection: keep-alive\r\n' + 'key:\r\n' + ':aa'
      )

      expect(parsed['content-type']).toBe('application/json')
      expect(parsed['connection']).toBe('keep-alive')
      expect(parsed['key']).toBe('')
    })

    test('should return empty object if headers is empty string', () => {
      expect(parseHeaders('')).toEqual({})
    })
  })

  describe('processHeaders', () => {
    test('should nromalize Content-Type header name', () => {
      const headers: any = {
        'conTent-TYpe': 'text/plain',
        'Content-LEngth': 1024
      }

      // 只对了 content-type 做了规范化
      processHeaders({}, headers)

      expect(headers['Content-Type']).toBe('text/plain')
      expect(headers['conTent-TYpe']).toBeUndefined()
      expect(headers['Content-LEngth']).toBe(1024)
    })

    test('should set Content-Type if not set and data is PlainObject', () => {
      const headers: any = {}

      processHeaders({ a: 1 }, headers)

      expect(headers['Content-Type']).toBe('application/json;charset=utf-8')
    })

    test('should not set Content-Type if not set and data is not PlainObject', () => {
      const headers: any = {}

      processHeaders(new URLSearchParams('a=b'), headers)

      expect(headers['Content-Type']).toBeUndefined()
    })

    test('should do nothing if headers is undefined or null', () => {
      expect(processHeaders({}, undefined)).toBeUndefined()
      expect(processHeaders({}, null)).toBeNull()
    })
  })

  describe('flatterHeaders', () => {
    test('should flatten the headers and include common headers', () => {
      const headers = {
        Accept: 'application/json',
        common: {
          'X-COMMON-HEADER': 'common'
        },
        get: {
          'X-GET-HEADER': 'get'
        },
        post: {
          'X-POST-HEADER': 'post'
        }
      }

      expect(flatterHeaders(headers, 'get')).toEqual({
        Accept: 'application/json',
        'X-COMMON-HEADER': 'common',
        'X-GET-HEADER': 'get'
      })
      expect(flatterHeaders(headers, 'post')).toEqual({
        Accept: 'application/json',
        'X-COMMON-HEADER': 'common',
        'X-POST-HEADER': 'post'
      })
      expect(flatterHeaders(headers, 'put')).toEqual({
        Accept: 'application/json',
        'X-COMMON-HEADER': 'common'
      })
    })

    test('should do nothing if headers is undefined or null', () => {
      expect(flatterHeaders(undefined, 'get')).toBeUndefined()
      expect(flatterHeaders(null, 'get')).toBeNull()
    })
  })
})
