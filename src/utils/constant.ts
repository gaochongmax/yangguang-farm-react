import type { CommonOption } from '@/types'

export const REGEXP: Record<string, RegExp> = {
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

export const CHUNK_SIZE = 200 * 1024 * 1024

export enum ROLES {
  none = 0,
  farmer,
  seller
}

export const ROLES_ARR: CommonOption[] = [
  {
    value: ROLES.farmer,
    label: '农场主'
  },
  {
    value: ROLES.seller,
    label: '商人'
  }
]

export enum CROPS {
  none = 0,
  aijiaocai,
  bocai,
  kongxincai,
  qincai,
  shanghaiqing,
  tonghao,
  xiancai,
  xiaobaicai
}

export const CROPS_ARR: CommonOption[] = [
  {
    value: CROPS.aijiaocai,
    label: '矮脚菜'
  },
  {
    value: CROPS.bocai,
    label: '菠菜'
  },
  {
    value: CROPS.kongxincai,
    label: '空心菜'
  },
  {
    value: CROPS.qincai,
    label: '芹菜'
  },
  {
    value: CROPS.shanghaiqing,
    label: '上海青'
  },
  {
    value: CROPS.tonghao,
    label: '茼蒿'
  },
  {
    value: CROPS.xiancai,
    label: '苋菜'
  },
  {
    value: CROPS.xiaobaicai,
    label: '小白菜'
  },
]

const getLabelByValue: (value: string | number, array: CommonOption[]) => string | number | undefined = (value, array) => {
  const f = array.find(v => v.value === value)
  if (f) {
    return f.label
  }
}

export const getRoleLabel: (value: string | number) => string | number | undefined = value => getLabelByValue(value, ROLES_ARR)