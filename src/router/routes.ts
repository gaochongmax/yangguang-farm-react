import { lazy } from 'react'
import type { IndexRouteObject, NonIndexRouteObject } from 'react-router-dom'

interface AppRouteFields {
  meta?: {
    auth?: boolean
  }
}

type AppIndexRouteObject = IndexRouteObject & AppRouteFields
type AppNonIndexRouteObject = Omit<NonIndexRouteObject, 'children'> & AppRouteFields & {
  children?: (AppIndexRouteObject | AppNonIndexRouteObject)[]
}
export type AppRouteObject = AppIndexRouteObject | AppNonIndexRouteObject

export const routes: AppRouteObject[] = [
  {
    path: '/',
    Component: lazy(() => import('@/layout')),
    meta: {
      auth: true,
    },
    children: [
      {
        path: 'home',
        Component: lazy(() => import('@/pages/home')),
      },
      {
        path: 'market',
        Component: lazy(() => import('@/pages/market')),
      },
    ]
  },
  {
    path: '/login',
    Component: lazy(() => import('@/pages/login')),
    meta: {
      auth: false,
    },
  },
  {
    path: '/account/complete',
    Component: lazy(() => import('@/pages/account/complete')),
    meta: {
      auth: true,
    },
  },
  {
    path: '*',
    Component: lazy(() => import('@/pages/not-found')),
  },
]

// function flat (routes) {
//   for (const e of routes) {
//     if (e.children && e.children.length) {
//       flat(e.children)
//     } else {

//     }
//   }
// }

export const flatRoutes = routes
