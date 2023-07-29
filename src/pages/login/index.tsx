import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Form, Input, Button } from 'antd'
import { encrypt, REGEXP, http, ResException } from '@/utils'
import { useAppDispatch, useAppSelector } from '@/hooks'
import { decrement, increment, incrementByAmount, incrementAsync } from '@/store/reducers/counterSlice'
import './index.scss'

interface User {
  name: string,
  mobile: string
}

const Login: React.FC = () => {
  const dispatch = useAppDispatch()
  const count = useAppSelector(state => state.counter.value)
  const navigate = useNavigate()
  const [isRegister, setRegister] = useState(false)
  const [form] = Form.useForm()
  const rules = {
    mobile: [
      { required: true, message: '请输入手机号' },
      { pattern: REGEXP.mobile, message: '手机号格式错误' }
    ],
    password: [
      { required: true, message: '请输入密码' },
      { pattern: REGEXP.password, message: '以字母开头，仅包含字母、数字、下划线，长度6-8位' }
    ],
  }
  function onSwitch() {
    setRegister(!isRegister)
  }
  async function onRegister() {
    try {
      const { mobile, password } = await form.validateFields()
      await http<string>('/user/register', {
        mobile,
        password: encrypt(password)
      }, '注册登录中...')
    } catch (e) {}
  }
  async function onLogin() {
    try {
      const { mobile, password } = await form.validateFields()
      await http<boolean>('/user/login', {
        mobile,
        password: encrypt(password)
      }, '登录中...')
      navigate('/account/complete')
    } catch (e: any) {
      if (e instanceof ResException) {
        console.log(e.code)
      }
    }
  }
  async function onGetInfo() {
    try {
      const user = await http<User>('/user/profile', undefined, '请求中...')
      console.log(user)
    } catch (e) {
      console.log('catch:', e)
    }
  }
  return (
    <div className="login">
      <div className="title">欢迎登录</div>
      <div>
        <button onClick={() => dispatch(decrement())}>-</button>
        <span style={{margin: '5px', fontSize: '20px'}}>{count}</span>
        <button onClick={() => dispatch(increment())}>+</button>
        <button onClick={() => dispatch(incrementByAmount(5))}>+</button>
        <button onClick={() => dispatch(incrementAsync(5))}>+</button>
      </div>
      <div className="login-form-wrap">
        <Form form={form}>
          <Form.Item name="mobile" rules={rules.mobile}>
            <Input placeholder="手机号"/>
          </Form.Item>
          <Form.Item name="password" rules={rules.password}>
            <Input placeholder="密码"/>
          </Form.Item>
          {isRegister &&
            <Form.Item name="confirm_password" rules={[
              { required: true, message: '请再次输入密码' },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue('password') === value) {
                    return Promise.resolve()
                  }
                  return Promise.reject(new Error('两次输入的密码不一致'))
                }
              })
            ]}>
              <Input placeholder="再次输入密码"/>
            </Form.Item>
          }
        </Form>
        <Button type="primary" style={{ width: '100%' }} onClick={isRegister ? onRegister : onLogin}>{isRegister ? '注册并登录' : '登 录'}</Button>
        <Button type="primary" style={{ width: '100%' }} onClick={onGetInfo}>查询</Button>
        <div className="switch-mode">
          <span>{isRegister ? '已' : '没'}有账号？</span>
          <Button type="link" onClick={onSwitch}>{isRegister ? '登录' : '注册'}</Button>
        </div>
      </div>
    </div>
  )
}

export default Login