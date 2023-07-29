import React, { useState } from 'react'
import ImgCrop from 'antd-img-crop'
import { message, Form, Radio, Upload, Input, Button } from 'antd'
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons'
import type { UploadChangeParam } from 'antd/es/upload'
import type { RcFile, UploadFile, UploadProps } from 'antd/es/upload/interface'
import { UPLOAD_CONFIG } from '@/utils'

interface compProps {
  profile?: object
}

const ProfileForm: React.FC<compProps> = (props) => {
  console.log('props:', props)
  const [loading, setLoading] = useState(false)
  const [imgUrl, setImgUrl] = useState('')

  const onChange: UploadProps['onChange'] = (info: UploadChangeParam<UploadFile>) => {
    console.log(info.file)
    setImgUrl('')
  }

  const uploadProps: UploadProps = {
    listType: 'picture-card',
    className: 'avatar-uploader',
    action: '/api/files/upload-img',
    accept: UPLOAD_CONFIG.img.accepts.join(','),
    showUploadList: false,
    beforeUpload: async (file: RcFile) => {
      console.log(file)
      const limited = file.size > UPLOAD_CONFIG.img.maxSize
      if (limited) {
        message.warning('文件尺寸过大')
      } else {
        setLoading(true)
      }
      return !limited
    },
    onChange
  }

  // const onDelete = async () => {
  //   try {
  //     await http('/files/delete', {
  //       file_id: '64bd2a482bde0e56f19d7a5e'
  //     })
  //   } catch (e) {}
  // }

  const uploadButton = (
    <div>
      {loading ? <LoadingOutlined/> : <PlusOutlined/>}
      <div>Upload</div>
    </div>
  )

  return (
    <>
      <Form
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        style={{ maxWidth: 600 }}>
        <Form.Item label="身份">
          <Radio.Group>
            <Radio>农场主</Radio>
            <Radio>商人</Radio>
          </Radio.Group>
        </Form.Item>
        <Form.Item label="头像">
          <ImgCrop modalOk="确定" modalCancel="取消">
            <Upload {...uploadProps}>
              {imgUrl ? <img src={imgUrl} alt="头像"/> : uploadButton}
            </Upload>
          </ImgCrop>
        </Form.Item>
        <Form.Item label="姓名">
          <Input />
        </Form.Item>
        <Form.Item label="手机号">
          <Input />
        </Form.Item>
        <Form.Item label="微信号">
          <Input />
        </Form.Item>
      </Form>
      <Button type="primary">下一步</Button>
    </>
  )
}

export default ProfileForm