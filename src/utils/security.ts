import * as CryptoJS from 'crypto-js'

const SECRET_KEY = 'yangguangfarm'

/**
 * @description aes加密
 * @param {string} word 需要加密的字符串
 */
export const encrypt = (word: string) => {
  return CryptoJS.AES.encrypt(word, SECRET_KEY).toString()
}

/**
 * @description aes解密
 * @param {string} ciphertext 需要解密的字符串
 */
export const decrypt = (ciphertext: string) => {
  return CryptoJS.AES.decrypt(ciphertext, SECRET_KEY).toString(CryptoJS.enc.Utf8)
}
