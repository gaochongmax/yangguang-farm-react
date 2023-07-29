import ReactDOM from 'react-dom/client'
import { Spin } from 'antd'

const maskStyle = {
  background: 'rgba(0,0,0,.2)',
  position: 'fixed',
  inset: '0',
  zIndex: '9999',
}

let isLoading: boolean = false
let el: HTMLDivElement | undefined
let root: ReactDOM.Root | undefined

export const $showLoading = (tip: string) => {
  if (isLoading) {
    $hideLoading()
  }
  isLoading = true
  el = document.createElement('div')
  el.setAttribute('id', 'loading')
  Object.assign(el.style, maskStyle)
  document.body.appendChild(el)
  root = ReactDOM.createRoot(el)
  root.render(
    <Spin tip={tip} size="large">
      <div style={{width: '100vw', height: '100vh'}}></div>
    </Spin>
  )
}

export const $hideLoading = () => {
  if (root) {
    root.unmount()
    document.body.removeChild(el as Node)
  }
  isLoading = false
}