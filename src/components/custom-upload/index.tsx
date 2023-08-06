import React, { useState } from 'react'
import { Upload } from 'antd'
import { PlusOutlined } from '@ant-design/icons'
import type { RcFile, UploadProps } from 'antd/es/upload'
import type { UploadFile } from 'antd/es/upload/interface'
import { REGEXP, UPLOAD_CONFIG, http } from '@/utils'

const getBase64 = (file: RcFile): Promise<string> =>
  new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onload = () => resolve(reader.result as string)
    reader.onerror = (error) => reject(error)
  })

const CutomUpload: React.FC = () => {
  const [fileList, setFileList] = useState<UploadFile[]>([])

  const accept = UPLOAD_CONFIG.img.accepts.join(',') + ',' + UPLOAD_CONFIG.video.accepts.join(',')
  const multiple = true

  const beforeUpload: UploadProps['beforeUpload'] = (file: RcFile, fileList: RcFile[]) => {
    // console.log(file)
    // console.log(fileList)
    // setFileList([...fileList, file])
    return false
  }

  const onPreview = async (file: UploadFile) => {
    console.log('onPreview', file)
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj as RcFile)
    }
  }

  const onChange: UploadProps['onChange'] = ({ fileList: newFileList }) => {
    console.log(newFileList)
    newFileList.forEach(v => {
      if (UPLOAD_CONFIG.img.accepts.includes(v.type as string) && UPLOAD_CONFIG.img.maxSize < (v.size as number)) {
        v.status = 'error'
        v.error = new Error('文件过大')
      }
    })
    setFileList(newFileList)
  }

  const uploadProps: UploadProps = {
    listType: 'picture-card',
    accept,
    multiple,
    fileList,
    beforeUpload,
    onPreview,
    onChange,
  }

  const uploadButton = (
    <div>
      <PlusOutlined />
      <div style={{ marginTop: 8 }}>可多选</div>
    </div>
  )

  return (
    <Upload {...uploadProps}>
      {fileList.length >= 8 ? null : uploadButton}
    </Upload>
  )
}

export default CutomUpload