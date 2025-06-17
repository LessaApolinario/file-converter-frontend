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
  type DownloadFileOptions,
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

  const downloadFile = useCallback(
    ({ type, convertedFile, from, to }: DownloadFileOptions) => {
      if (downloadFileRef.current && file) {
        const blob = new Blob([convertedFile], { type })
        const url = window.URL.createObjectURL(blob)

        downloadFileRef.current.href = url
        downloadFileRef.current.download = file.name.replace(from, to)
        downloadFileRef.current.click()

        window.URL.revokeObjectURL(url)
      }
    },
    [file]
  )

  const convertDocxFileToPdf = useCallback(async () => {
    try {
      if (!file) {
        return
      }

      const convertedFile = await useCase.convertDocxToPdf(file)

      downloadFile({
        type: 'application/pdf',
        convertedFile,
        from: '.docx',
        to: '.pdf',
      })
    } catch (error) {
      console.error(error)
    }
  }, [file, useCase, downloadFile])

  const convertCsvFileToXls = useCallback(async () => {
    try {
      if (!file) {
        return
      }

      const convertedFile = await useCase.convertCsvToXls(file)

      downloadFile({
        type: 'text/csv',
        convertedFile,
        from: '.csv',
        to: '.xls',
      })
    } catch (error) {
      console.error(error)
    }
  }, [file, useCase, downloadFile])

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
