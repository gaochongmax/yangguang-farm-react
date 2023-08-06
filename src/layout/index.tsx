import React from 'react'
import { Outlet } from 'react-router-dom'
import Aside from './aside'
import Header from './header'
import './index.scss'

const Layout: React.FC = () => (
  <div className='layout'>
    <div className='layout-aside'>
      <Aside />
    </div>
    <div className='layout-main'>
      <div className='layout-main-header'>
        <Header />
      </div>
      <div className='layout-main-body'>
        <Outlet />
      </div>
    </div>
  </div>
)

export default Layout