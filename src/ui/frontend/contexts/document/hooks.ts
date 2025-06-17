import { useContextSelector } from 'use-context-selector'
import { DocumentCTX } from '.'

export function useFileType() {
  return useContextSelector(DocumentCTX, (ctx) => ctx.fileType)
}

export function useIsConverting() {
  return useContextSelector(DocumentCTX, (ctx) => ctx.isConverting)
}

export function useDownloadFileRef() {
  return useContextSelector(DocumentCTX, (ctx) => ctx.downloadFileRef)
}

export function useFileConverterOptions() {
  return useContextSelector(DocumentCTX, (ctx) => ctx.fileConverterOptions)
}

export function useHandleConvertFile() {
  return useContextSelector(DocumentCTX, (ctx) => ctx.handleConvertFile)
}

export function useUpdateFile() {
  return useContextSelector(DocumentCTX, (ctx) => ctx.updateFile)
}

export function useUpdateFileType() {
  return useContextSelector(DocumentCTX, (ctx) => ctx.updateFileType)
}
