import { Tooltip, Modal } from 'antd'
import { LogoutOutlined } from '@ant-design/icons'
import { http } from '@/utils'
import styles from './index.module.scss'

interface CompProps {
  isLoginPage?: boolean,
  isRegister?: boolean,
  onSwitch?: () => void
}

const Header: React.FC<CompProps> = ({ isLoginPage, isRegister, onSwitch }) => {
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
        } catch { }
      }
    })
  }

  return (
    <div className={styles.header + (isLoginPage ? ` ${styles['header-login']}` : ` ${styles['header-normal']}`)}>
      <div className={styles.container}>
        <div className={styles.logo}>
          <i className={`iconfont icon-sun ${styles['icon-sun']}`}></i>
          <span className={styles.brand}>阳 光 农 场</span>
        </div>
        <div className={styles.zone}>
          <div className={styles['zone-item']}>关于我们</div>
          {isLoginPage && <div className={styles['zone-item']} onClick={onSwitch}>{isRegister ? '登录' : '注册'}</div>}
          {!isLoginPage && <Tooltip placement='bottom' title='退出登录'>
            <LogoutOutlined onClick={onLogout} />
          </Tooltip>}
        </div>
      </div>
    </div>
  )
}

export default Header