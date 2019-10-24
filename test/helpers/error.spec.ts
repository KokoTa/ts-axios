import { createError } from '../../src/helpers/error'
import { AxiosRequestConfig, AxiosResponse } from '../../src/types'

describe('helpers:error', () => {
  test('should create an error with message, config, code, request, response and isAxiosError', () => {
    const request = new XMLHttpRequest()
    const config: AxiosRequestConfig = { method: 'post' }
    const response: AxiosResponse = {
      status: 200,
      statusText: 'ok',
      headers: null,
      request,
      config,
      data: { a: 1 }
    }

    const error = createError('bad request', config, 'something', request, response)

    expect(error instanceof Error).toBeTruthy()
    expect(error.message).toBe('bad request')
    expect(error.config).toBe(config)
    expect(error.code).toBe('something')
    expect(error.request).toBe(request)
    expect(error.response).toBe(response)
    expect(error.isAxiosError).toBeTruthy()
  })
})
