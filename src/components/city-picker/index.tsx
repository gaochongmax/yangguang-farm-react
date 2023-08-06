import { Cascader } from 'antd'
import { AREA } from '@/utils/area'

const CityPicker: React.FC = () => {
  const onChange = (value: any, selectedOptions: any) => {
    console.log(value)
    console.log(selectedOptions)
  }
  return <Cascader placeholder='请选择' options={AREA} onChange={onChange} />
}

export default CityPicker