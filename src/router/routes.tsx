import { lazy, Suspense } from 'react'
import type { IndexRouteObject, NonIndexRouteObject } from 'react-router-dom'
import Loading from '@/components/loading'

/**
 * 扩展额外的路由信息
 * auth：是否需要登录访问
 * role: 限定角色可访问
 */
interface AppRouteExtra {
  meta?: {
    auth?: boolean,
    role?: number,
  }
}
type AppIndexRouteObject = IndexRouteObject & AppRouteExtra
type AppNonIndexRouteObject = Omit<NonIndexRouteObject, 'children'> & AppRouteExtra & {
  children?: (AppIndexRouteObject | AppNonIndexRouteObject)[]
}
type AppRouteObject = AppIndexRouteObject | AppNonIndexRouteObject

/**
 * 实现懒加载
 * @param path 文件所在目录路径  为了在import()里使用变量，约定：组件文件名都是index.tsx
 * @returns JSX.Element
 */
const fullScreenPaths: string[] = ['layout', 'pages/login', 'pages/complete', 'pages/not-found']
function lazyLoad(path: string): JSX.Element {
  const Component = lazy(() => import(`@/${path}/index.tsx`))
  const fullScreen = fullScreenPaths.includes(path)

  return (
    <Suspense fallback={<Loading fullScreen={fullScreen} />}>
      <Component />
    </Suspense>
  )
}

export const routes: AppRouteObject[] = [
  {
    path: '/',
    element: lazyLoad('layout'),
    meta: {
      auth: true
    },
    children: [
      {
        path: 'home',
        element: lazyLoad('pages/home'),
      },
      {
        path: 'farm-manage',
        element: lazyLoad('pages/farm-manage'),
        meta: {
          role: 1
        }
      },
      {
        path: 'farm-edit',
        element: lazyLoad('pages/farm-edit'),
        meta: {
          role: 1
        }
      },
      {
        path: 'store-manage',
        element: lazyLoad('pages/store-manage'),
        meta: {
          role: 2
        }
      },
      {
        path: 'im',
        element: lazyLoad('pages/im'),
      },
      {
        path: 'market',
        children: [
          {
            path: 'mall',
            element: lazyLoad('pages/market/mall'),
          },
          {
            path: 'record',
            element: lazyLoad('pages/market/record'),
          },
          {
            path: 'exchange',
            element: lazyLoad('pages/market/exchange'),
          },
        ]
      },
      {
        path: 'settings',
        children: [
          {
            path: 'profile',
            element: lazyLoad('pages/settings/profile'),
          },
          {
            path: 'address',
            element: lazyLoad('pages/settings/address'),
          },
        ]
      }
    ]
  },
  {
    path: '/login',
    element: lazyLoad('pages/login'),
    meta: {
      auth: false,
    },
  },
  {
    path: '/complete',
    element: lazyLoad('pages/complete'),
    meta: {
      auth: true,
    },
  },
  {
    path: '/demo',
    element: lazyLoad('pages/demo'),
  },
  {
    path: '*',
    element: lazyLoad('pages/not-found'),
  },
]
