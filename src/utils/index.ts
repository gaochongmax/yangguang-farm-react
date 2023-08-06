import SparkMD5 from 'spark-md5'
import type { ValidateRules } from '@/types'
import { CHUNK_SIZE } from './constant'
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

/**
 * 生成文件hash
 * @param file 文件
 * @returns Promise<string>
 */
export const genFileHash: (file: File) => Promise<string> = (file) => {
  return new Promise((resolve, reject) => {
    let start = 0
    const fileReader = new FileReader()
    const spark = new SparkMD5.ArrayBuffer()
    const load = () => {
      fileReader.readAsArrayBuffer(file.slice(start, start += CHUNK_SIZE))
    }
    fileReader.onload = (e) => {
      spark.append(e.target?.result)
      if (start < file.size) {
        load()
      } else {
        const hash = spark.end()
        resolve(hash)
      }
    }
    fileReader.onerror = err => {
      reject(err)
    }
    load()
  })
}