import React, { useState } from 'react'
import ProfileForm from '@/components/profile-form'
import { http } from '@/utils'

interface User {
  name: string,
  mobile: string
}

const Profile: React.FC = () => {
  const [isLoading] = useState(true)
  const [profile, setProfile] = useState({})

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

export default Profile