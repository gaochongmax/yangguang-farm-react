import ReactDOM from 'react-dom/client'
import Loading from '@/components/loading'

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
  root.render(<Loading fullScreen tip={tip} />)
}

export const $hideLoading = () => {
  if (root) {
    root.unmount()
    document.body.removeChild(el as Node)
  }
  isLoading = false
}