import React, { useEffect, useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import {
  HomeOutlined,
  AppstoreOutlined,
  MessageOutlined,
  ShoppingOutlined,
  SettingOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined
} from '@ant-design/icons'
import type { MenuProps } from 'antd'
import { Menu } from 'antd'
import { useAppSelector } from '@/hooks'
import { ROLES } from '@/utils'
import './index.scss'

type MenuItem = Required<MenuProps>['items'][number]

function getItem(
  label: React.ReactNode,
  key: React.Key,
  icon?: React.ReactNode,
  children?: MenuItem[],
  type?: 'group',
): MenuItem {
  return {
    key,
    icon,
    children,
    label,
    type,
  } as MenuItem
}

const roleMenuItem: Record<Omit<ROLES, ROLES.none> & number, MenuItem> = {
  [ROLES.farmer as number]: getItem('农场管理', '/farm-manage', <AppstoreOutlined />),
  [ROLES.seller as number]: getItem('店铺管理', '/store-manage', <AppstoreOutlined />),
}

const slicePath = (path: string): string => {
  const index = path.lastIndexOf('/')
  return path.slice(index)
}

const Aside: React.FC = (props) => {
  const navigate = useNavigate()
  const loaction = useLocation()
  const user = useAppSelector(state => state.user)
  const [collapsed, setCollapsed] = useState(false)
  const [currentKey, setCurrentKey] = useState([slicePath(loaction.pathname)])
  const items: MenuItem[] = [
    getItem('首页', '/home', <HomeOutlined />),
    roleMenuItem[user.role],
    getItem('消息', '/im', <MessageOutlined />),
    getItem('市场', '/market', <ShoppingOutlined />, [
      getItem('商城', '/mall'),
      getItem('交易记录', '/record'),
      getItem('求购 / 转让信息', '/exchange'),
    ]),
    getItem('设置', '/settings', <SettingOutlined />, [
      getItem('个人信息', '/profile'),
      getItem('收货地址', '/address'),
    ]),
  ]

  const onClick: MenuProps['onClick'] = (item) => {
    const path = item.keyPath.reverse().join('')
    navigate(path)
  }

  useEffect(() => {
    setCurrentKey([slicePath(loaction.pathname)])
  }, [loaction])

  return (
    <div className={'aside' + (collapsed ? ' collapsed' : '')}>
      <div className='aside-top'>
        <i className='iconfont icon-sun'></i>
        <span className='brand'>阳 光 农 场</span>
      </div>
      <div className='aside-middle'>
        <Menu
          mode='inline'
          theme='dark'
          inlineCollapsed={collapsed}
          defaultSelectedKeys={currentKey}
          items={items}
          onClick={onClick}
        />
      </div>
      <div className='aside-bottom' onClick={() => setCollapsed(!collapsed)}>
        {collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
      </div>
    </div>
  )
}

export default Aside