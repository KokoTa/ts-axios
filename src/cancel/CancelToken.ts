import { CancelExecutor, CancelTokenSource, Canceler } from './../types/index';
import axios from '..';

interface ResolvePromise {
  (reason?: string): void
}

/**
 * 实例化这个类就意味着直接中断请求
 */
export default class CancelToken {
  promise: Promise<string>
  reason?: string

  constructor(executor: CancelExecutor) {
    let resolvePromise: ResolvePromise

    // 把 resolve 提取出来，然后在 executor 中执行，让 promise 从 pending 变为 resolved
    this.promise = new Promise<string>(resolve => {
      resolvePromise = resolve
    })

    // cancel 函数用来改变 promise 状态
    // 注意 executor 的逻辑是在生成实例时赋值的
    executor((message) => {
      if (this.reason) return
      this.reason = message
      resolvePromise(this.reason)
    })

  }

  // 工厂方法，生成实例
  static source(): CancelTokenSource {
    let cancel!: Canceler
    const token = new CancelToken((cancelFn) => {
      // 把取消函数赋到外边去
      cancel = cancelFn
    })
    return {
      cancel,
      token
    }
  }
}

/**
 * cancelToken 的使用方法
 * 方法一：直接生成实例
 */
// const CancelToken = axios.CancelToken
// let cancel
// axios.get('/', {
//   cancelToken: new CancelToken(c => cancel = c)
// })
// cancel()

/**
 * 方法二： 调用工厂方法生成实例，换汤不换药
 */
// const CancelToken = axios.CancelToken
// const source = CancelToken.source()
// axios.get('/', {
//   cancelToken: source.token
// })
// source.cancel()
