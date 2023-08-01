export * from './modules/constant'
export * from './modules/user'

interface RegExpRule {
  pattern: RegExp,
  message: string,
}
export interface ValidateRules {
  requiredMsg?: string,
  lengthRange?: [number, number],
  regExpRule?: RegExpRule,
  sensitive?: boolean
}