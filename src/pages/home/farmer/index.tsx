import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Select, DatePicker } from 'antd'
import * as echarts from 'echarts'
import FarmCard from '@/components/farm-card'
import AddCard from '@/components/add-card'
import './index.scss'

const { RangePicker } = DatePicker

const option1 = {
  title: {
    text: '产量/kg'
  },
  tooltip: {
    trigger: 'axis'
  },
  legend: {
    data: ['Email', 'Union Ads', 'Video Ads', 'Direct', 'Search Engine']
  },
  grid: {
    left: '3%',
    right: '4%',
    bottom: '3%',
    containLabel: true
  },
  toolbox: {
    feature: {
      saveAsImage: {}
    }
  },
  xAxis: {
    type: 'category',
    boundaryGap: false,
    data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
  },
  yAxis: {
    type: 'value'
  },
  series: [
    {
      name: 'Email',
      type: 'line',
      stack: 'Total',
      data: [120, 132, 101, 134, 90, 230, 210]
    },
    {
      name: 'Union Ads',
      type: 'line',
      stack: 'Total',
      data: [220, 182, 191, 234, 290, 330, 310]
    },
    {
      name: 'Video Ads',
      type: 'line',
      stack: 'Total',
      data: [150, 232, 201, 154, 190, 330, 410]
    },
    {
      name: 'Direct',
      type: 'line',
      stack: 'Total',
      data: [320, 332, 301, 334, 390, 330, 320]
    },
    {
      name: 'Search Engine',
      type: 'line',
      stack: 'Total',
      data: [820, 932, 901, 934, 1290, 1330, 1320]
    }
  ]
}

const option3 = {
  legend: {},
  tooltip: {},
  dataset: {
    source: [
      ['product', '2012', '2013', '2014', '2015', '2016', '2017'],
      ['Milk Tea', 86.5, 92.1, 85.7, 83.1, 73.4, 55.1],
      ['Matcha Latte', 41.1, 30.4, 65.1, 53.3, 83.8, 98.7],
      ['Cheese Cocoa', 24.1, 67.2, 79.5, 86.4, 65.2, 82.5],
      ['Walnut Brownie', 55.2, 67.1, 69.2, 72.4, 53.9, 39.1]
    ]
  },
  series: [
    {
      name: '面积',
      type: 'pie',
      radius: '20%',
      center: ['25%', '30%']
      // No encode specified, by default, it is '2012'.
    },
    {
      name: '产量',
      type: 'pie',
      radius: '20%',
      center: ['50%', '30%'],
      encode: {
        itemName: 'product',
        value: '2013'
      }
    },
    {
      name: '销售额',
      type: 'pie',
      radius: '20%',
      center: ['75%', '30%'],
      encode: {
        itemName: 'product',
        value: '2014'
      }
    },
  ]
}

const FarmerHome: React.FC = () => {
  const navigate = useNavigate()

  useEffect(() => {
    const harvestChart = echarts.init(document.getElementById('harvest'))
    harvestChart.setOption(option1)
    const percentChart = echarts.init(document.getElementById('percent'))
    percentChart.setOption(option3)
  }, [])

  const onAddFarm = () => {
    navigate('/farm-edit')
  }

  const onFarmChange = () => {}

  return (
    <div className='g-page-content farmer-home'>
      <div className='section'>
        <div className='section-label'>农场列表</div>
        <div className='farm-list'>
          <div className='farm-list-item'>
            <FarmCard inList />
          </div>
          <div className='farm-list-item'>
            <FarmCard inList />
          </div>
          <AddCard style={{ width: '300px', borderRadius: '10px' }} onClick={onAddFarm}>新增农场</AddCard>
        </div>
      </div>
      <div className='section statistics'>
        <div className='section-label'>数据统计</div>
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
        <RangePicker />
      </div>
      <div id='harvest' style={{ height: '400px' }}></div>
      <div id='price' style={{ height: '400px' }}></div>
      <div id='percent' style={{ height: '400px' }}></div>
    </div>
  )
}

export default FarmerHome