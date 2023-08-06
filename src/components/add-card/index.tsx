import React from 'react'
import { PlusOutlined } from '@ant-design/icons'

const defaultStyle: React.CSSProperties = {
  flex: '0 0 auto',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  background: 'rgba(0, 0, 0, .02)',
  border: '1px dashed #d9d9d9',
  color: 'rgba(0, 0, 0, 0.88)',
  cursor: 'pointer',
}

interface Props {
  style: React.CSSProperties,
  onClick: () => void,
  children?: React.ReactNode
}

const AddCard: React.FC<Props> = ({ style, onClick, children }) => {
  const mergedStyle = Object.assign({}, defaultStyle, style)
  return (
    <div style={mergedStyle} onClick={onClick}>
      <PlusOutlined style={{ fontSize: '20px' }} />
      {children}
    </div>
  )
}

export default AddCard