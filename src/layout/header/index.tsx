import { Tooltip, Modal } from 'antd'
import { LogoutOutlined } from '@ant-design/icons'
import './index.scss'

const Header: React.FC = () => {
  const onLogout = () => {
    Modal.confirm({
      title: '提示',
      content: '确定要退出登录吗？',
      cancelText: '取消',
      okText: '确定',
      onOk: () => {}
    })
  }
  return (
    <div className="header">
      <img className="avatar" src="" alt="" />
      <span className="name">用户名</span>
      <Tooltip placement="bottom" title="退出登录">
        <LogoutOutlined onClick={onLogout}/>
      </Tooltip>
    </div>
  )
}

export default Header