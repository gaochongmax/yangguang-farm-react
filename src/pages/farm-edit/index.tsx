import { Form, Input, InputNumber, Checkbox, Row, Col } from 'antd'
import CityPicker from '@/components/city-picker'
import CustomUpload from '@/components/custom-upload'
import { CROPS_ARR } from '@/utils'

const FarmEdit: React.FC = () => {
  // const onDelete = async () => {
  //   try {
  //     await http('/files/delete', {
  //       file_id: '64bd2a482bde0e56f19d7a5e'
  //     })
  //   } catch (e) {}
  // }
  return (
    <div className='g-page'>
      <div className='g-page-content farm-edit'>
        <Form
          labelCol={{ span: 3 }}
          wrapperCol={{ span: 21 }}
          style={{ width: 600 }}
          requiredMark={false}
          colon={false}>
          <Form.Item label='农场名称' name='name'>
            <Input />
          </Form.Item>
          <Form.Item label='农场地址'>
            <Row>
              <Col>
                <CityPicker />
              </Col>
              <Col>
                <Input placeholder='请填写详细地址' />
              </Col>
            </Row>
          </Form.Item>
          <Form.Item label='主要作物' name='crops'>
            <Checkbox.Group>
              {CROPS_ARR.map(v => <Checkbox style={{ lineHeight: '32px' }} key={v.value} value={v.value}>{v.label}</Checkbox>)}
            </Checkbox.Group>
          </Form.Item>
          <Form.Item label='规模 / 亩' name='scale'>
            <InputNumber min={0} />
          </Form.Item>
          <Form.Item label='农场简介' name='description'>
            <Input.TextArea rows={6} />
          </Form.Item>
          <Form.Item label='农场图册'>
            <CustomUpload />
          </Form.Item>
        </Form>
      </div>
    </div>
  )
}

export default FarmEdit