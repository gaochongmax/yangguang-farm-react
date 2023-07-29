import React, { useState, useEffect } from 'react'
import ProfileForm from '@/components/profile-form'
import { http } from '@/utils'

interface User {
  name: string,
  mobile: string
}

const AccountProfile: React.FC = () => {
  const [isLoading, setLoading] = useState(true)
  const [profile, setProfile] = useState({})

  useEffect(() => {
    let isUnmounted = false;
    (async () => {
      let res: User
      try {
        res = await http<User>('/user/profile', undefined)
        if (!isUnmounted) {
          setProfile(res)
          setLoading(false)
        }
      } catch (e) {
        
      } finally {
        // console.log(res)
      }
      // const res = await Promise.resolve({name: 'zhangs', mobile: '1234'})
      // const res = await (await fetch('/api/user/profile', {method: 'POST'})).json()
    })()

    return () => {
      isUnmounted = true
    }
  }, [])

  const onRequest = async () => {
    try {
      const res = await http<User>('/user/profile', undefined, '请求中...')
      setProfile(res as User)
    } catch (e) {
      console.log(e)
    }
  }

  return (
    isLoading ?
      <div>加载中...</div> :
      <>
        <ProfileForm profile={profile}></ProfileForm>
        <button onClick={onRequest}>请求</button>
      </>
  )
}

export default AccountProfile