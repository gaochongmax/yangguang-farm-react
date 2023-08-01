import { Tooltip, Modal } from 'antd'
import { LogoutOutlined } from '@ant-design/icons'
import { useAppSelector } from '@/hooks'
import { http, ROLES, getRoleByCode } from '@/utils'
import './index.scss'

const Header: React.FC = () => {
  const user = useAppSelector(state => state.user)
 
  const confirm = (content: string, onOk: (...args: any[]) => any) => {
    Modal.confirm({
      title: '提示',
      content,
      cancelText: '取消',
      okText: '确定',
      onOk
    })
  }
  const onSwitchRole = () => {
    const currentRole = getRoleByCode(user.role)
    const swtchRoleCode = user.role === ROLES.farmer ? ROLES.seller : ROLES.farmer
    const swtchRoleText = getRoleByCode(swtchRoleCode)
    const content = `您当前身份是${currentRole}，确定要切换为${swtchRoleText}？`
    const onOk = async () => {
      try {
        await http<null>('/user/switch-role')
        window.location.replace('/')
      } catch { }
    }
    confirm(content, onOk)
  }
  const onLogout = () => {
    const onOk = async () => {
      try {
        await http<null>('/user/logout')
        window.location.replace('/login')
      } catch { }
    }
    confirm('确定要退出登录吗？', onOk)
  }
  return (
    <div className="layout-header">
      <img className="avatar" src={user.avatar_url} alt="头像" />
      <span className="name">{user.name}</span>
      <Tooltip placement="bottom" title="切换身份">
        <i className="iconfont icon-exchange" onClick={onSwitchRole} />
      </Tooltip>
      <Tooltip placement="bottom" title="退出登录">
        <LogoutOutlined onClick={onLogout} />
      </Tooltip>
    </div>
  )
}

export default Header