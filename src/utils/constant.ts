import type { ConstMap } from '@/types'

export const REGEXP = {
  mobile: /^1\d{10}$/,
  password: /^[a-zA-Z]\w{5,7}$/,
  wechat: /^[a-zA-Z][-_a-zA-Z0-9]{5,19}$/
}

export const UPLOAD_CONFIG = {
  img: {
    maxSize: 1024 * 1024 * 10,
    accepts: ['image/jpeg', 'image/png', 'image/bmp', 'image/gif']
  },
  video: {
    maxSize: 1024 * 1024 * 100,
    accepts: ['video/mp4', 'video/mpeg', 'video/x-msvideo', 'video/webm', 'video/3gpp', 'video/x-m4v', 'video/quicktime']
  },
}

export enum ROLES {
  none = 0,
  farmer,
  seller
}

export const ROLES_ARR: ConstMap[] = [
  {
    code: ROLES.farmer,
    text: '农场主'
  },
  {
    code: ROLES.seller,
    text: '商人'
  }
]

const getTextByCode: (code: string | number, arr: ConstMap[]) => string | number | undefined = (code, arr) => {
  const f = arr.find(v => v.code === code)
  if (f) {
    return f.text
  }
}

export const getRoleByCode: (code: string | number) => string | number | undefined = code => getTextByCode(code, ROLES_ARR)