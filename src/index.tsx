import React, { useState, useEffect } from 'react'
import ReactDOM from 'react-dom/client'
import { Provider } from 'react-redux'
import { store } from '@/store'
import { setAuthByRequest } from '@/store/reducers/auth-slice'
import { setUserByRequest } from '@/store/reducers/user-slice'
import RouterGuard from '@/router/guard'
import '@/index.scss'

const Loading = () => (
  <h1>加载中...</h1>
)

const App: React.FC = () => {
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    (async () => {
      try {
        const res = await store.dispatch(setAuthByRequest())
        if (res) {
          await store.dispatch(setUserByRequest())
        }
        setLoading(false)
      } catch (e) {
        console.log(e)
      }
    })()
  }, [])

  return (
    <>
      {loading ? <Loading /> : (
        <React.StrictMode>
          <Provider store={store}>
            <RouterGuard />
          </Provider>
        </React.StrictMode>
      )}
    </>
  )
}

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
)
root.render(<App />)