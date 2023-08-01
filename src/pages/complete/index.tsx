import React from 'react'
import Header from '@/components/header'
import ProfileForm from '@/components/profile-form'
import './index.scss'

const Complete: React.FC = () => {
  return (
    <div className="complete">
      <Header />
      <div className="title">完善身份信息</div>
      <div className="tip">请您先完善信息，完善后即可使用</div>
      <div className="tip">进入系统后，您可以切换身份以及更换手机号</div>
      <ProfileForm inGuide />
    </div>
  )
}

export default Complete