import { Tooltip, Modal } from 'antd'
import { LogoutOutlined } from '@ant-design/icons'
import { useAppSelector } from '@/hooks'
import { http } from '@/utils'
import './index.scss'

const Header: React.FC = () => {
  const user = useAppSelector(state => state.user)
  const onLogout = () => {
    Modal.confirm({
      title: '提示',
      content: '确定要退出登录吗？',
      cancelText: '取消',
      okText: '确定',
      onOk: async () => {
        try {
          await http<null>('/user/logout')
          window.location.replace('/login')
        } catch {}
      }
    })
  }
  return (
    <div className="header">
      <img className="avatar" src={user.avatar_url} alt="头像" />
      <span className="name">{user.name}</span>
      <Tooltip placement="bottom" title="退出登录">
        <LogoutOutlined onClick={onLogout} />
      </Tooltip>
    </div>
  )
}

export default Header