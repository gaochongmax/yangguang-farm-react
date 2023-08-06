import { useState } from "react"
import { uploadFile, getFileByHash, http } from "@/utils"
import { Progress } from 'antd'

let file: File | undefined
let controller = new AbortController()

const Demo: React.FC = () => {
  const [fileInputKey, setFileInputKey] = useState('file')
  const [percent, setPercent] = useState(0)
  const onChage: React.ChangeEventHandler<HTMLInputElement> = async (e) => {
    if (!e.target.files?.length) return
    file = e.target.files[0]
    try {
      const res = await uploadFile(file, controller, (progressEvent) => {
        console.log(progressEvent)
        if (progressEvent.progress) {
          setPercent(+progressEvent.progress.toFixed(2) * 100)
        }
      })
      console.log(res)
    } catch (e) {
      console.log(e)
    }
  }

  const onClear = () => {
    setFileInputKey(`file${new Date()}`)
  }

  const onCancel = () => {
    controller.abort()
  }

  const onContinue = async () => {
    try {
      if (!file) return
      controller = new AbortController()
      const res = await uploadFile(file, controller, (progressEvent) => {
        console.log(progressEvent)
        if (progressEvent.progress) {
          setPercent(+progressEvent.progress.toFixed(2) * 100)
        }
      })
      console.log(res)
    } catch (e) {
      console.log(e)
    }
  }
  return (
    <>
      <input type='file' multiple key={fileInputKey} onChange={onChage} />
      <button onClick={onClear}>清空</button>
      <button onClick={onCancel}>暂停上传</button>
      <button onClick={onContinue}>继续上传</button>
      <div style={{ width: 500 }}>
        <Progress percent={percent} />
      </div>
    </>
  )
}

export default Demo