import {
  buildURL,
  transformURL,
  isAbsoluteURL,
  combineURL,
  isURLSameOrigin
} from '../../src/helpers/url'

describe('helpers:url', () => {
  describe('buildURL', () => {
    test('should support null params', () => {
      expect(buildURL('/foo')).toBe('/foo')
    })

    test('should support params', () => {
      expect(
        buildURL('/foo', {
          foo: 'bar'
        })
      ).toBe('/foo?foo=bar')
    })

    test('should ignore if some param value is null', () => {
      expect(
        buildURL('/foo', {
          foo: 'bar',
          bar: null
        })
      ).toBe('/foo?foo=bar')
    })

    test('should ignore if the only param value is null', () => {
      expect(
        buildURL('/foo', {
          foo: null
        })
      ).toBe('/foo')
    })

    test('should support obj params', () => {
      expect(
        buildURL('/foo', {
          foo: {
            bar: 'baz'
          }
        })
      ).toBe('/foo?foo=' + encodeURI('{"bar":"baz"}'))
    })

    test('should support date params', () => {
      const date = new Date()

      expect(
        buildURL('/foo', {
          date: date
        })
      ).toBe('/foo?date=' + date.toISOString())
    })

    test('should support array params', () => {
      expect(
        buildURL('/foo', {
          foo: ['bar', 'baz']
        })
      ).toBe('/foo?foo[]=bar&foo[]=baz')
    })

    test('should support special char params', () => {
      expect(
        buildURL('/foo', {
          foo: '@:$'
        })
      ).toBe('/foo?foo=@:$')
    })

    test('should support existing params', () => {
      expect(
        buildURL('/foo?foo=bar', {
          bar: 'baz'
        })
      ).toBe('/foo?foo=bar&bar=baz')
    })

    test('should correct discard url hash mark', () => {
      expect(
        buildURL('/foo?foo=bar#hash', {
          bar: 'baz'
        })
      ).toBe('/foo?foo=bar&bar=baz')
    })

    test('should user serializer if provided', () => {
      const serilizer = jest.fn(() => {
        return 'foo=baz'
      })
      const params = { foo: 'bar' }

      expect(buildURL('/foo', params, serilizer)).toBe('/foo?foo=baz')
      expect(serilizer).toHaveBeenCalled() // 函数被调用了
      expect(serilizer).toHaveBeenCalledWith(params) // 函数被传参调用了
    })

    test('should support URLSearchParams', () => {
      expect(buildURL('/foo', new URLSearchParams('foo=bar'))).toBe('/foo?foo=bar')
    })
  })

  describe('isAbsoluteURL', () => {
    test('should return true if URL begins with valid scheme name', () => {
      expect(isAbsoluteURL('http://www.baidu.com')).toBeTruthy()
      expect(isAbsoluteURL('custom-scheme-v1.0://example.com')).toBeTruthy()
      expect(isAbsoluteURL('HTTP://example.com')).toBeTruthy()
    })

    test('should return false if URL begins with invalid scheme name', () => {
      expect(isAbsoluteURL('123://example.com')).toBeFalsy()
      expect(isAbsoluteURL('!valid://example.com')).toBeFalsy()
    })

    test('should return true if URL is protocol-relative', () => {
      expect(isAbsoluteURL('//example.com')).toBeTruthy()
    })

    test('should return false if URL is relative', () => {
      expect(isAbsoluteURL('/foo')).toBeFalsy()
      expect(isAbsoluteURL('foo')).toBeFalsy()
    })
  })

  describe('combineURL', () => {
    test('should combine URL', () => {
      expect(combineURL('http://example.com', '/test')).toBe('http://example.com/test')
    })

    test('should remove duplicate slashes', () => {
      expect(combineURL('http://example.com/', '/test')).toBe('http://example.com/test')
    })

    test('should insert missing slashes', () => {
      expect(combineURL('http://example.com', 'test')).toBe('http://example.com/test')
    })

    test('should not insert slashe when relative url is mising or empty', () => {
      expect(combineURL('http://example.com', '')).toBe('http://example.com')
    })

    test('should allow a single slash for relative url', () => {
      expect(combineURL('http://example.com', '/')).toBe('http://example.com/')
    })
  })

  describe('transformURL', () => {
    test('should return absolute URL', () => {
      expect(
        transformURL({
          baseURL: 'http://example.com',
          url: '/test',
          params: {
            foo: 'bar'
          },
          paramsSerializer: () => {
            return 'foo=baz'
          }
        })
      ).toBe('http://example.com/test?foo=baz')
    })
  })

  describe('isURLSameOrigin', () => {
    test('should detect same origin', () => {
      expect(isURLSameOrigin(window.location.href)).toBeTruthy()
    })

    test('should detect different origin', () => {
      expect(isURLSameOrigin('window.location.href')).toBeTruthy()
    })
  })
})
