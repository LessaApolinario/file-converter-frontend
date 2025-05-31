import { useRef, useState, type ChangeEvent } from 'react'
import { FaPlus } from 'react-icons/fa'
import axios from 'axios'
import { env } from '@/core/utils/env'

export function FileConverter() {
  const [isConverting, setIsConverting] = useState(false)
  const [file, setFile] = useState<File | undefined>()
  const downloadFileRef = useRef<HTMLAnchorElement>(null)

  function handleFileChange(event: ChangeEvent<HTMLInputElement>) {
    const files = event.target.files
    if (files) {
      setFile(files[0])
    }
  }

  async function handleConvertFile() {
    try {
      setIsConverting(true)

      if (!file) {
        console.log('Sem arquivo')
        return
      }

      const formData = new FormData()
      formData.append('file', file)

      const response = await axios.post(
        `${env.VITE_FILE_CONVERTER_API_URL}/api/document/docx-to-pdf`,
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
          responseType: 'blob',
        }
      )

      if (downloadFileRef.current) {
        const blob = new Blob([response.data], { type: 'application/pdf' })
        const url = window.URL.createObjectURL(blob)

        downloadFileRef.current.href = url
        downloadFileRef.current.download = file.name.replace('.docx', '.pdf')
        downloadFileRef.current.click()

        window.URL.revokeObjectURL(url)
      }

      setIsConverting(false)
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <div className='grid h-20 cursor-pointer grid-cols-3 place-items-center rounded-xl border-2'>
      <div className='bg-zinc-200 text-center text-zinc-800'>Select</div>

      <label htmlFor='convertFileInput' className='cursor-pointer px-4'>
        <span className='flex items-center justify-center gap-2 text-center text-xl'>
          Converter arquivo
          <FaPlus className='text-2xl' />
        </span>

        <input
          id='convertFileInput'
          type='file'
          className='sr-only'
          disabled={isConverting}
          onChange={handleFileChange}
        />
      </label>

      <button
        type='button'
        className='text-bold h-full w-full cursor-pointer rounded-tr-xl rounded-br-xl bg-zinc-700 text-lg font-bold'
        onClick={handleConvertFile}
      >
        Converter
      </button>

      <a ref={downloadFileRef} className='sr-only'></a>
    </div>
  )
}
