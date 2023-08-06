import { FormOutlined } from '@ant-design/icons'
import './index.scss'

const ShedCard: React.FC = () => {
  return (
    <div className='shed-card'>
      <div className='shed-card-row name-row'>1号棚</div>
      <div className='shed-card-row'>2023.07.25 除草</div>
      <div className='shed-card-row'>2023.07.24 施肥</div>
      <div className='shed-card-row'>2023.07.23 打药</div>
      <div className='shed-card-row'>2023.07.22 浇水</div>
      <div className='shed-card-row'>2023.07.21 种植菠菜</div>
      <div className='view-more'>查看更多记录</div>
      <div className='edit'>
        <FormOutlined /> 编辑
      </div>
    </div>
  )
}

export default ShedCard