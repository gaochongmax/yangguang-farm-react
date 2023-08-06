import React from 'react'
import type { MenuProps } from 'antd'
import { Select } from 'antd'
import FarmCard from '@/components/farm-card'
import ShedCard from '@/components/shed-card'
import AddCard from '@/components/add-card'
import './index.scss'

const FarmManage: React.FC = () => {
  const items: MenuProps['items'] = [
    {
      key: '1',
      label: '东新市村农场'
    }
  ]
  const onClick: MenuProps['onClick'] = ({ key }) => {
    console.log(key)
  }
  const onFarmChange = () => { }
  const onAddShed = () => { }
  return (
    <div className='g-page'>
      <div className='g-page-content farm-manege'>
        <div className='section current-farm'>
          <div className='section-label'>当前农场</div>
          <Select
            defaultValue='lucy'
            style={{ width: 150, marginRight: 20 }}
            onChange={onFarmChange}
            options={[
              { value: 'jack', label: 'Jack' },
              { value: 'lucy', label: 'Lucy' },
              { value: 'Yiminghe', label: 'yiminghe' },
              { value: 'disabled', label: 'Disabled', disabled: true },
            ]}
          />
        </div>
        <FarmCard />
        <div className='section'>
          <div className='section-label'>种植 / 采收记录（以棚为单位）</div>
        </div>
        <div className='shed-list'>
          <div className='shed-list-item'>
            <ShedCard />
          </div>
          <AddCard style={{ width: '200px', borderRadius: '10px', marginBottom: '10px' }} onClick={onAddShed}>新增棚</AddCard>
        </div>
      </div>
    </div>
  )
}

export default FarmManage