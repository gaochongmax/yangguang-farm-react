import { Spin } from 'antd'

interface CompProps {
  fullScreen?: boolean,
  tip?: string,
  size?: 'small' | 'default' | 'large'
}

const Loading: React.FC<CompProps> = ({ fullScreen, tip, size = 'large' }) => (
  <Spin tip={tip} size={size}>
    <div style={fullScreen ? { width: '100vw', height: '100vh' } : { marginTop: '15vh' }}></div>
  </Spin>
)

export default Loading