import React from 'react'

interface CompProps {
  children: React.ReactNode
}

export class ErrorBoundary extends React.Component<CompProps> {
  constructor (props: CompProps) {
    super(props)
    this.state = { err: null }
  }
  state = { err: null }

  static getDerivedStateFromError(error: any) {
    // 更新 state 使下一次渲染能够显示降级后的 UI
    return { error }
  }
  componentDidCatch(error: any, errorInfo: any) {
    console.error(error, errorInfo)
  }
  render() {
    if (this.state.err) {
      // 你可以自定义降级后的 UI 并渲染
      return <div className="error">Something went wrong.</div>
    }
    return this.props.children
  }
}