import cookie from '../../src/helpers/cookie'

describe('helpers:cookie', () => {
  test('should read cookies', () => {
    document.cookie = 'foo=123'
    expect(cookie.read('foo')).toBe('123')
  })

  test('should return null if cookie name is not exist', () => {
    document.cookie = 'foo=123'
    expect(cookie.read('bar')).toBeNull()
  })
})
