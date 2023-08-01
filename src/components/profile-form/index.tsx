import React, { useState } from 'react'
import ImgCrop from 'antd-img-crop'
import { message, Form, Radio, Upload, Input, Button } from 'antd'
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons'
import type { UploadChangeParam } from 'antd/es/upload'
import type { RcFile, UploadFile, UploadProps } from 'antd/es/upload/interface'
import { REGEXP, UPLOAD_CONFIG, http } from '@/utils'
import { useAppSelector, useAppDispatch } from '@/hooks'
import { setUserByRequest } from '@/store/reducers/user-slice'
import { ROLES, ROLES_ARR } from '@/utils/constant'

interface compProps {
  inGuide?: boolean
}

const ProfileForm: React.FC<compProps> = ({ inGuide }) => {
  const user = useAppSelector(state => state.user)
  const dispatch = useAppDispatch()
  const [form] = Form.useForm()
  const rules = {
    name: [
      { required: true, message: '请输入姓名' },
    ],
    wechat: [
      { pattern: REGEXP.wechat, message: '6-20位，以字母开头，可包含字母、数字、下划线、减号' }
    ],
  }
  const [loading, setLoading] = useState(false)
  const [avatarId, setAvatarId] = useState(user.avatar_id)
  const [avatarUrl, setAvatarUrl] = useState(user.avatar_url)

  const onChange: UploadProps['onChange'] = (info: UploadChangeParam<UploadFile>) => {
    const { response } = info.file
    if (response) {
      setAvatarId(response.data.file_id)
      setAvatarUrl(response.data.file_url)
    }
  }

  const uploadProps: UploadProps = {
    listType: 'picture-card',
    className: 'avatar-uploader',
    action: '/api/files/upload-img',
    accept: UPLOAD_CONFIG.img.accepts.join(','),
    showUploadList: false,
    beforeUpload: async (file: RcFile) => {
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

  const onSave = async () => {
    try {
      const values = await form.validateFields()
      await http<null>('/user/save', {
        ...values,
        avatar_id: avatarId,
        avatar_url: avatarUrl,
      }, '保存中...')
      message.success('保存成功')
      if (inGuide) {
        window.location.replace('/home')
      } else {
        dispatch(setUserByRequest())
      }
    } catch { }
  }

  const uploadButton = (
    <div>
      {loading ? <LoadingOutlined /> : <PlusOutlined />}
      <div>Upload</div>
    </div>
  )

  return (
    <Form
      labelCol={{ span: 3 }}
      wrapperCol={{ span: 21 }}
      style={{ width: 480 }}
      requiredMark={false}
      colon={false}
      initialValues={user}
      form={form}>
      {inGuide && <Form.Item label="身份" name="role" rules={[
        () => ({
          validator(_, value) {
            if (value === ROLES.none) {
              return Promise.reject(new Error('请选择身份'))
            }
            return Promise.resolve()
          }
        })
      ]}>
        <Radio.Group>
          {ROLES_ARR.map(r => <Radio key={r.code} value={r.code}>{r.text}</Radio>)}
        </Radio.Group>
      </Form.Item>}
      <Form.Item label="头像">
        <ImgCrop modalOk="确定" modalCancel="取消">
          <Upload {...uploadProps}>
            {avatarUrl ?
              <img src={avatarUrl} alt="头像" style={{ width: '100%', borderRadius: '8px' }} /> :
              uploadButton}
          </Upload>
        </ImgCrop>
      </Form.Item>
      <Form.Item label="姓名" name="name" rules={rules.name}>
        <Input placeholder="请输入姓名" maxLength={30} />
      </Form.Item>
      <Form.Item label="手机号" name="mobile">
        <Input disabled placeholder="请输入手机号" />
      </Form.Item>
      <Form.Item label="微信号" name="wechat" rules={rules.wechat}>
        <Input placeholder="请输入微信号" />
      </Form.Item>
      <Form.Item labelCol={{ span: 0 }} wrapperCol={{ span: 24 }}>
        <div style={{ textAlign: inGuide ? 'center' : 'right' }}>
          <Button type="primary" onClick={onSave}>{inGuide ? '开始使用' : '保存'}</Button>
        </div>
      </Form.Item>
    </Form >
  )
}

export default ProfileForm