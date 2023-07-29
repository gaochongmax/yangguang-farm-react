// import React from 'react'
import ReactDOM from 'react-dom/client'
import { Provider } from 'react-redux'
import { store } from './store'
// import { decrement, increment, incrementByAmount, incrementAsync } from '@/store/reducers/counterSlice'
import RouterGuard from './router/guard'
import './index.scss'

(async () => {
  // const res = store.dispatch(incrementAsync(3))
  // console.log(res)
  // const val = await res
  // console.log('await:', val)
  const root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement
  )
  root.render(
    // <React.StrictMode>
      <Provider store={store}>
        <RouterGuard />
      </Provider>
    // </React.StrictMode>
  )
})()
