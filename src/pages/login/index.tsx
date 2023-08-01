import React, { useState } from 'react'
import { useLocation } from 'react-router-dom'
import Header from '@/components/header'
import { encrypt, REGEXP, http, ResException, validate } from '@/utils'
import { ValidateRules } from '@/types'
import './index.scss'

interface Rules {
  mobile: ValidateRules,
  password: ValidateRules,
}

const rules: Rules = {
  mobile: {
    requiredMsg: '请输入手机号',
    regExpRule: {
      pattern: REGEXP.mobile,
      message: '手机号格式错误'
    }
  },
  password: {
    requiredMsg: '请输入密码',
    regExpRule: {
      pattern: REGEXP.password,
      message: '以字母开头，可包含字母、数字、下划线，长度6-8位'
    }
  },
}

interface Form {
  mobile: string,
  password: string,
  confirmPassword: string,
}

type K = keyof Form

const initialValue = {
  mobile: '',
  password: '',
  confirmPassword: ''
}

const Login: React.FC = () => {
  const location = useLocation()
  const redirect = location.state?.redirect
  const backUrl = redirect ? redirect.pathname + redirect.search : ''
  const [isRegister, setRegister] = useState(false)
  const [isSubmited, setSubmited] = useState(false)
  const [form, setForm] = useState(initialValue)
  const [errors, setErrors] = useState(initialValue)

  const onSwitch = () => {
    setRegister(!isRegister)
    setForm(initialValue)
    setErrors(initialValue)
  }

  const onInput = (e: React.ChangeEvent<HTMLInputElement>, field: K) => {
    const { value } = e.target
    setForm(v => Object.assign({}, v, { [field]: value }))
    // 首次校验在提交时进行，后续输入时也校验，提升用户体验
    if (isSubmited) {
      validateField(field, value)
    }
  }

  const validateField = async (field: K, value: string): Promise<boolean> => {
    let message = ''
    try {
      if (field === 'confirmPassword') {
        message = value === form.password ? '' : '两次输入的密码不一致'
      } else {
        await validate(rules[field])(value)
      }
    } catch (e) {
      message = (e as Error).message
    } finally {
      setErrors(v => Object.assign({}, v, { [field]: message }))
    }
    return !message
  }

  const validateAll = async (): Promise<boolean> => {
    const entries = Object.entries(form).slice(0, isRegister ? undefined : -1)
    const promises = entries.map(([k, v]) => validateField(k as K, v))
    return (await Promise.all(promises)).every(v => v)
  }

  const onLogin = async () => {
    try {
      setSubmited(true)
      if (!await validateAll()) return
      await http<boolean>('/user/login', {
        mobile: form.mobile,
        password: encrypt(form.password)
      }, '登录中...')
      window.location.replace(backUrl)
    } catch (e: any) {
      if (e instanceof ResException) {
        console.log(e.code)
      }
    }
  }

  const onRegister = async () => {
    try {
      setSubmited(true)
      if (!await validateAll()) return
      await http<string>('/user/register', {
        mobile: form.mobile,
        password: encrypt(form.password)
      }, '注册登录中...')
      window.location.replace('/complete')
    } catch (e) { }
  }

  return (
    <div className="login">
      <Header isLoginPage isRegister={isRegister} onSwitch={onSwitch} />
      <div className="container">
        <div className="form-item">
          <input
            className="form-item-input"
            placeholder="手机号"
            maxLength={11}
            autoComplete="off"
            value={form.mobile}
            onChange={e => onInput(e, 'mobile')} />
          <div className="form-item-error">{errors.mobile}</div>
        </div>
        <div className="form-item">
          <input
            className="form-item-input"
            type="password"
            placeholder="密 码"
            autoComplete="new-password"
            value={form.password}
            onChange={e => onInput(e, 'password')} />
          <div className="form-item-error">{errors.password}</div>
        </div>
        {isRegister && <div className="form-item">
          <input
            className="form-item-input"
            type="password"
            placeholder="再次输入密码"
            autoComplete="new-password"
            value={form.confirmPassword}
            onChange={e => onInput(e, 'confirmPassword')} />
          <div className="form-item-error">{errors.confirmPassword}</div>
        </div>}
        <div className="login-button" onClick={isRegister ? onRegister : onLogin}>{isRegister ? '注册并登录' : '登 录'}</div>
      </div>
    </div>
  )
}

export default Login