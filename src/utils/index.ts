import type { ValidateRules } from '@/types'
export * from './constant'
export * from './http'
export * from './loading'
export * from './security'

/**
 * 校验逻辑方法
 * @param roles
 * @returns fn: () => Promise<Error | undefined>
 */
export function validate(roles: ValidateRules): ((value: string | undefined) => Promise<Error | true>) {
  return (value) => {
    return new Promise((resolve, reject) => {
      value = value ? value.trim() : ''
      const { length } = value
      const { requiredMsg, lengthRange, regExpRule, sensitive } = roles
      if (requiredMsg && !length) {
        return reject(new Error(requiredMsg))
      }
      if (lengthRange) {
        const min = Math.min(...lengthRange)
        const max = Math.max(...lengthRange)
        if (length < min || length > max) {
          return reject(new Error(`长度在${min}~${max}个字符`))
        }
      }
      if (regExpRule && !regExpRule.pattern.test(value)) {
        return reject(new Error(regExpRule.message))
      }
      if (sensitive) {
        // TODO 校验敏感词
      }
      resolve(true)
    })
  }
}