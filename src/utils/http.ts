import axios from 'axios'
import type { AxiosRequestConfig } from 'axios'
import { message as Message } from 'antd'
import GoDB from 'godb'
import { CHUNK_SIZE } from './constant'
import { $showLoading, $hideLoading } from './loading'
import { genFileHash } from '.'

// 定义响应异常
export class ResException {
  code: number
  data?: any
  message?: string
  constructor(code: number, data: any, message: string) {
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
export function http<U>(
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

const schema = {
  fileTable: {
    hash: {
      type: String,
      unique: true,
    },
  },
}
const fileDB = new GoDB('fileDB', schema)
const fileTable = fileDB.table('fileTable')

export const getFileByHash = (hash: string) => {
  return new Promise((resolve, reject) => {
    fileTable.get({hash}).then((file) => resolve(file.file))
  })
}

interface FileData {
  url: string
}

export const uploadFile = async (file: File, controller?: AbortController, onUploadProgress?: AxiosRequestConfig['onUploadProgress']) => {
  console.log(file)
  const hash = await genFileHash(file)
  fileTable.add({ hash, file })
  if (file.size <= CHUNK_SIZE) {
    const formData = new FormData()
    formData.append('file', file)
    formData.append('hash', hash)
    return await http('/files/upload-file', formData, undefined, {
      method: 'post',
      headers: { 'Content-Type': 'multipart/form-data' },
      signal: controller?.signal,
      onUploadProgress: (e) => {
        const appAxiosProgressEvent = { ...e, controller }
        onUploadProgress && onUploadProgress(appAxiosProgressEvent)
      }
    })
  } else {
    const uploaded = await http<Array<string> | FileData>('/files/get-uploaded-chunks', { hash })
    if (!Array.isArray(uploaded)) {
      onUploadProgress && onUploadProgress({
        total: file.size,
        bytes: file.size,
        loaded: file.size,
        progress: 1,
        upload: true
      })
      return uploaded
    }
    const promises = []
    const total = Math.ceil(file.size / CHUNK_SIZE)
    let count = uploaded.length
    for (let i = 0; i < total; i++) {
      if (uploaded?.includes(`${i}`)) continue
      const formData = new FormData()
      formData.append('chunk', file.slice(i * CHUNK_SIZE, i * CHUNK_SIZE + CHUNK_SIZE))
      formData.append('index', `${i}`)
      formData.append('hash', hash)
      promises.push(http('/files/upload-chunk', formData, undefined, {
        method: 'post',
        headers: { 'Content-Type': 'multipart/form-data' },
        signal: controller?.signal,
        // eslint-disable-next-line no-loop-func
      }).then(() => {
        count++
        onUploadProgress && onUploadProgress({
          total: file.size,
          bytes: file.size,
          loaded: count < total ? count * CHUNK_SIZE : file.size,
          progress: count < total ? (count * CHUNK_SIZE) / file.size : 1,
          upload: true
        })
      }))
    }
    try {
      await Promise.all(promises)
      http('/files/joint-chunks', {
        hash,
        name: file.name,
        type: file.type,
        size: file.size,
      })
    } catch (e) {
      console.log('Promise.all', e)
    }
  }
}
