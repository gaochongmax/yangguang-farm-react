import axios from 'axios'
import type { AxiosRequestConfig } from 'axios'
import { message as Message } from 'antd'
import { $showLoading, $hideLoading } from './loading'

// 定义响应异常
export class ResException {
  code: number
  data?: any
  message?: string
  constructor (code: number, data: any, message: string) {
    this.code = code
    this.data = data
    this.message = message
  }
}

const instance = axios.create({
  baseURL: '/api',
  headers: { 'X-Request-With': 'XMLHttpRequest' }
})

instance.interceptors.response.use(
  // 请求成功
  res => {
    const { code, data, message } = res.data
    if (code === 0) {
      return data
    }
    // 有异常，提示相关信息后抛出
    Message.error(message)
    throw new ResException(code, data, message)
  },
  // 请求失败
  err => {
    Message.error(err.message)
    throw err
  }
)

/**
 * 常用请求方法
 * @param url    请求的路径
 * @param data   请求参数
 * @param tip    loading文字，没有不显示loading
 * @param config 额外配置项
 * @returns      Promise<U> 调用时指定类型
 */
export function http<U> (
  url: string,
  data: any = undefined,
  tip: string = '',
  config: AxiosRequestConfig = { method: 'post' }
): Promise<U> {
  if (tip) {
    $showLoading(tip)
  }
  const _config = Object.assign({ url, data }, config)
  return new Promise((resolve, reject) => {
    instance.request(_config).then(res => {
      resolve(res as U)
    }).catch(err => {
      reject(err)
    }).finally(() => {
      if (tip) {
        $hideLoading()
      }
    })
  })
}