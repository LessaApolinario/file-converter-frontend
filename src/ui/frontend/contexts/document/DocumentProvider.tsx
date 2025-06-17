import type { DocumentUseCase } from '@/core/interfaces/usecases/DocumentUseCase'
import {
  useCallback,
  useMemo,
  useRef,
  useState,
  type PropsWithChildren,
} from 'react'
import {
  DocumentCTX,
  type FileConverterHandler,
  type FileConverterOption,
} from '.'

interface DocumentProviderProps {
  useCase: DocumentUseCase
}

export function DocumentProvider({
  useCase,
  children,
}: PropsWithChildren<DocumentProviderProps>) {
  const [isConverting, setIsConverting] = useState(false)
  const [fileType, setFileType] = useState('')
  const [file, setFile] = useState<File | null>(null)
  const downloadFileRef = useRef<HTMLAnchorElement>(null)

  const fileConverterOptions = useMemo<FileConverterOption[]>(() => {
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

  const convertDocxFileToPdf = useCallback(async () => {
    try {
      if (!file) {
        return
      }

      const convertedFile = await useCase.convertDocxToPdf(file)

      if (downloadFileRef.current) {
        const blob = new Blob([convertedFile], { type: 'application/pdf' })
        const url = window.URL.createObjectURL(blob)

        downloadFileRef.current.href = url
        downloadFileRef.current.download = file.name.replace('.docx', '.pdf')
        downloadFileRef.current.click()

        window.URL.revokeObjectURL(url)
      }
    } catch (error) {
      console.error(error)
    }
  }, [file, useCase])

  const convertCsvFileToXls = useCallback(async () => {
    if (!file) {
      return
    }

    const convertedFile = await useCase.convertCsvToXls(file)
    console.log('convertCsvFileToXls -> convertedFile: ', convertedFile)
  }, [file, useCase])

  const handleConvertFile = useCallback(async () => {
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
  }, [fileType, convertDocxFileToPdf, convertCsvFileToXls])

  const updateFile = useCallback((file: File | null) => {
    setFile(file)
  }, [])

  const updateFileType = useCallback((fileType: string) => {
    setFileType(fileType)
  }, [])

  return (
    <DocumentCTX.Provider
      value={{
        fileType,
        isConverting,
        downloadFileRef,
        fileConverterOptions,
        handleConvertFile,
        updateFile,
        updateFileType,
      }}
    >
      {children}
    </DocumentCTX.Provider>
  )
}
