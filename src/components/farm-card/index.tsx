import { useNavigate } from 'react-router-dom'
import { FormOutlined } from '@ant-design/icons'
import './index.scss'

interface Props {
  inList?: boolean
}

const FarmCard: React.FC<Props> = ({ inList }) => {
  const navigate = useNavigate()
  const onEdit = () => {
    navigate('/farm-edit')
  }
  return (
    <div className='farm-card'>
      <div className='farm-card-row name-row'>东新市村农场</div>
      <div className='farm-card-row'>上海市奉贤区东新市村</div>
      <div className='farm-card-row'>菠菜、茼蒿、小青菜</div>
      <div className='farm-card-row'>8亩 / 20棚</div>
      {!inList && <>
        <div className='farm-card-row'>东新市村农场成立于2010年</div>
        {[1, 2, 3, 4].map((v, i) => <img key={i} className='picture' src='' alt='' />)}
        <div className='edit' onClick={onEdit}><FormOutlined /> 编辑</div>
      </>}
    </div>
  )
}

export default FarmCard