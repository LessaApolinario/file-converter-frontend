import { env } from '@/core/utils/env'
import axios from 'axios'
import { useMemo, useRef, useState, type ChangeEvent } from 'react'
import { FaPlus } from 'react-icons/fa'
import { IoIosArrowForward } from 'react-icons/io'

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../../radix/select'

interface FileConverterOption {
  value: string
  text: string
}

type FileConverterHandler = () => Promise<void>

export function FileConverter() {
  const [isConverting, setIsConverting] = useState(false)
  const [fileType, setFileType] = useState('')
  const [file, setFile] = useState<File | undefined>()
  const downloadFileRef = useRef<HTMLAnchorElement>(null)

  const options = useMemo<FileConverterOption[]>(() => {
    return [
      {
        value: 'docx-to-pdf',
        text: 'Docx para PDF',
      },
      {
        value: 'csv-to-xls',
        text: 'CSV para XLS',
      },
    ]
  }, [])

  function handleFileChange(event: ChangeEvent<HTMLInputElement>) {
    const files = event.target.files
    if (files) {
      setFile(files[0])
    }
  }

  function updateCurrentFileType(value: string) {
    setFileType(value)
  }

  async function convertDocxFileToPdf() {
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
  }

  async function convertCsvFileToXls() {
    console.log('Sem função ainda')
  }

  async function handleConvertFile() {
    try {
      setIsConverting(true)

      const availableConverters: Record<string, FileConverterHandler> = {
        'docx-to-pdf': convertDocxFileToPdf,
        'csv-to-xls': convertCsvFileToXls,
      }

      if (availableConverters[fileType] && !!fileType.length) {
        await availableConverters[fileType]()
      }

      setIsConverting(false)
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <div className='grid h-20 cursor-pointer grid-cols-3 place-items-center'>
      <div className='text-center'>
        <Select onValueChange={updateCurrentFileType}>
          <SelectTrigger className='w-[180px]'>
            <SelectValue placeholder='Selecione um conversor' />
          </SelectTrigger>
          <SelectContent>
            {options.map((option) => {
              return (
                <SelectItem
                  className='cursor-pointer bg-zinc-700 text-zinc-200'
                  key={option.value}
                  value={option.value}
                >
                  {option.text}
                </SelectItem>
              )
            })}
          </SelectContent>
        </Select>
      </div>

      <label
        htmlFor='convertFileInput'
        className='text-bold flex cursor-pointer items-center justify-center gap-3.5 rounded-xl bg-zinc-700 p-4 text-lg font-bold'
      >
        Selecionar arquivo <FaPlus />
        <input
          id='convertFileInput'
          type='file'
          className='sr-only'
          disabled={fileType === 'Selecione' || isConverting}
          onChange={handleFileChange}
        />
      </label>

      <button
        type='button'
        className='text-bold flex cursor-pointer items-center justify-center gap-3.5 rounded-xl bg-zinc-700 p-4 text-lg font-bold'
        onClick={handleConvertFile}
      >
        Converter
        <IoIosArrowForward />
      </button>

      <a ref={downloadFileRef} className='sr-only'></a>
    </div>
  )
}
