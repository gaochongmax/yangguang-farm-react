import React, { useEffect } from 'react'
import { useLocation, useRoutes, matchRoutes, BrowserRouter } from 'react-router-dom'
import { routes, flatRoutes } from './routes'

function matchRoute (path:string) {
  return flatRoutes.find(e => e.path === path)
}

const Guard = () => {
  let loaction = useLocation()

  useEffect(() => {
    console.log(matchRoutes(routes, loaction))
  }, [loaction])

  return useRoutes(routes)
}

const RouterGuard: React.FC = () => {
  return (
    <BrowserRouter>
      <Guard />
    </BrowserRouter>
  )
}

export default RouterGuard