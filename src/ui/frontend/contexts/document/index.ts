import type { RefObject } from 'react'
import { createContext } from 'use-context-selector'

export interface FileConverterOption {
  value: string
  text: string
}

export interface DownloadFileOptions {
  type: string
  convertedFile: File
  from: string
  to: string
}

export type FileConverterHandler = () => Promise<void>

export interface DocumentProps {
  fileType: string
  isConverting: boolean
  downloadFileRef: RefObject<HTMLAnchorElement | null>
  fileConverterOptions: FileConverterOption[]
  handleConvertFile(): Promise<void>
  updateFile(file: File | null): void
  updateFileType(fileType: string): void
}

export const DocumentCTX = createContext({} as DocumentProps)
