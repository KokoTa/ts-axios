import { CancelExecutor, CancelTokenSource, Canceler } from './../types/index';
import Cancel from './Cancel'

interface ResolvePromise {
  (reason?: Cancel): void
}

/**
 * 实例化这个类就意味着直接中断请求
 */
export default class CancelToken {
  promise: Promise<Cancel>
  reason?: Cancel

  constructor(executor: CancelExecutor) {
    let resolvePromise: ResolvePromise

    // 把 resolve 提取出来，然后在 executor 中执行，让 promise 从 pending 变为 resolved
    this.promise = new Promise<Cancel>(resolve => {
      resolvePromise = resolve
    })

    // 注意 executor 的逻辑是在生成实例时赋值的
    executor((message) => {
      // cancel 函数用来改变 promise 状态
      if (this.reason) return
      this.reason = new Cancel(message)
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

  // 如果这个实例已经被使用过，则下次使用直接抛出错误
  throwIfRequested() {
    if (this.reason) {
      throw this.reason
    }
  }

}
