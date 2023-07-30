import React from 'react'
import { useLocation, useRoutes, matchRoutes, Navigate, BrowserRouter } from 'react-router-dom'
import { message } from 'antd'
import { routes } from './routes'
import { useAppSelector } from '@/hooks'
import { ROLES } from '@/utils/constant'

const showToast = (msg: string) => {
  const timer = setTimeout(() => {
    message.warning(msg)
    clearTimeout(timer)
  }, 0)
}

const Guard = () => {
  const to = useRoutes(routes)
  const auth = useAppSelector(state => state.auth)
  const user = useAppSelector(state => state.user)
  const loaction = useLocation()
  const matches = matchRoutes(routes, loaction)

  // 由外层向内层查找权限配置
  let needLogin, needLogout, needRole
  matches?.forEach(v => {
    const { meta } = v.route
    if (meta?.auth) {
      needLogin = true
    }
    if (meta?.auth === false) {
      needLogout = true
    }
    if (meta?.role) {
      needRole = meta.role
    }
  })

  // 嵌套路由，路径不完整时，递归子路由拼接完整路径
  let fullPath
  const last = matches?.length && matches[matches.length - 1]
  if (last && last.route.children?.length) {
    fullPath = last.pathname === '/' ? '' : last.pathname
    let children = last.route.children
    while (children?.length) {
      const first = children[0]
      fullPath += ('/' + first.path)
      children = first.children || []
    }
  }

  // 需要登录访问
  if (needLogin && !auth) {
    showToast('未登录')
    return <Navigate to='/login' state={{ redirect: loaction }} replace />
  }
  // 需要登出访问
  if (needLogout && auth) {
    return <Navigate to='/' replace />
  }
  // 未完善用户信息
  if (auth && user.role === ROLES.none && last && !['*', '/complete'].includes(`${last.route.path}`)) {
    return <Navigate to='/complete' replace />
  }
  // 已完善用户信息
  if (auth && user.role !== ROLES.none && last && last.route.path === '/complete') {
    return <Navigate to='/' replace />
  }
  // 指定角色访问
  if (needRole && needRole !== user.role) {
    showToast('无权限访问')
    return <Navigate to='/' replace />
  }
  // 嵌套路由路径不完整自动重定向
  if (fullPath) {
    return <Navigate to={fullPath} replace />
  }

  return to
}

const RouterGuard: React.FC = () => {
  return (
    <BrowserRouter>
      <Guard />
    </BrowserRouter>
  )
}

export default RouterGuard