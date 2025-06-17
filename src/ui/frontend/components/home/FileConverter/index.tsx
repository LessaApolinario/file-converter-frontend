import {
  useDownloadFileRef,
  useFileConverterOptions,
  useFileType,
  useHandleConvertFile,
  useIsConverting,
  useUpdateFile,
  useUpdateFileType,
} from '@/ui/frontend/contexts/document/hooks'
import { type ChangeEvent } from 'react'
import { FaPlus } from 'react-icons/fa'
import { IoIosArrowForward } from 'react-icons/io'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../../radix/select'

export function FileConverter() {
  const fileType = useFileType()
  const updateFile = useUpdateFile()
  const isConverting = useIsConverting()
  const updateFileType = useUpdateFileType()
  const downloadFileRef = useDownloadFileRef()
  const handleConvertFile = useHandleConvertFile()
  const fileConverterOptions = useFileConverterOptions()

  function handleFileChange(event: ChangeEvent<HTMLInputElement>) {
    const files = event.target.files
    if (files) {
      updateFile(files[0])
    }
  }

  return (
    <div className='grid h-20 cursor-pointer grid-cols-3 place-items-center gap-3'>
      <div className='text-center'>
        <Select onValueChange={updateFileType}>
          <SelectTrigger className='w-[20rem]'>
            <SelectValue placeholder='Selecione um conversor' />
          </SelectTrigger>
          <SelectContent>
            {fileConverterOptions.map((fileConverterOption) => {
              return (
                <SelectItem
                  className='cursor-pointer bg-zinc-700 text-zinc-200'
                  key={fileConverterOption.value}
                  value={fileConverterOption.value}
                >
                  {fileConverterOption.text}
                </SelectItem>
              )
            })}
          </SelectContent>
        </Select>
      </div>

      <label
        htmlFor='convertFileInput'
        className='text-bold flex w-full cursor-pointer items-center justify-center gap-3.5 rounded-xl bg-zinc-700 p-2 text-lg font-bold'
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
        className='text-bold flex w-full cursor-pointer items-center justify-center gap-3.5 rounded-xl bg-zinc-700 p-2 text-lg font-bold'
        onClick={handleConvertFile}
      >
        Converter
        <IoIosArrowForward />
      </button>

      <a ref={downloadFileRef} className='sr-only'></a>
    </div>
  )
}
