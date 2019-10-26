import { AxiosRequestConfig } from './../types/index'
import { isPlainObject, deepMerge } from '../helpers/util'

/**
 * 根据不同键值来使用不同的合并策略
 */
const strat = Object.create(null)
const onlyConfig2Keys: string[] = ['url', 'params', 'data']
const deepConfigKeys: string[] = ['headers', 'auth']

// 优先使用配置2策略
function priConfig2(val1: any, val2: any): any {
  return val2 !== undefined ? val2 : val1
}
// 只使用配置2策略
function onlyConfig2(val1: any, val2: any): any {
  return val2 !== undefined ? val2 : undefined
}
// 深度合并策略
function deepMergeConfig(val1: any, val2: any): any {
  if (isPlainObject(val2)) {
    return deepMerge(val1, val2)
  } else if (typeof val2 !== 'undefined') {
    return val2
  } else if (isPlainObject(val1)) {
    return deepMerge(val1)
  } else {
    return val1
  }
}

// 让不同的 key 有不同的配置策略
onlyConfig2Keys.forEach(key => {
  strat[key] = onlyConfig2
})
deepConfigKeys.forEach(key => {
  strat[key] = deepMergeConfig
})

/**
 * 配置合并
 */
export default function mergeConfig(
  config1: AxiosRequestConfig,
  config2?: AxiosRequestConfig
): AxiosRequestConfig {
  if (!config2) {
    config2 = {}
  }

  // 下面会用到 for in 遍历，由于该遍历会遍历原型，所以使用 create 创建对象
  const config = Object.create(null)

  // 合并配置2（覆盖 config1 配置并新增 config2 独有的键值）
  for (let key in config2) {
    mergeField(key)
  }

  // 合并配置1（因为可能存在 config1 独有的键值）
  for (let key in config1) {
    if (!config2[key]) {
      mergeField(key)
    }
  }

  // 配置合并函数
  function mergeField(key: string): void {
    const mergeFn = strat[key] || priConfig2

    // 这里 config1[key] 会报错的原因是 key 有可能为任意值，因此需要在对应的接口中声明 key 默认为 string
    // 这里 config2[key] 会报错的原因是 虽然我们让 config2 = {}，但引用 config2 时是在 mergeFiled 函数内部引用的，检测不了，需要强制断言
    config[key] = mergeFn(config1[key], config2![key])
  }

  return config
}
