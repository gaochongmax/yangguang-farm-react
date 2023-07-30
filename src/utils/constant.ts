export const REGEXP = {
  mobile: /^1\d{10}$/,
  password: /^[a-zA-Z]\w{5,7}$/
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
  retailer
}