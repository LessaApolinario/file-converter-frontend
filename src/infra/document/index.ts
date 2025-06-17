import type { DocumentAdapter } from '@/core/interfaces/adapters/DocumentAdapter'
import { BaseAPI } from '../clients/BaseAPI'

export class DocumentAPI extends BaseAPI implements DocumentAdapter {
  async convertDocxToPdf(file: File): Promise<File> {
    const formData = new FormData()
    formData.append('file', file)

    const response = await this.client.post('/document/docx-to-pdf', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
      responseType: 'blob',
    })

    return response.data
  }

  async convertCsvToXls(file: File): Promise<File> {
    const formData = new FormData()
    formData.append('file', file)

    const response = await this.client.post(
      '/spreadsheet/csv-to-xls',
      formData,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        responseType: 'blob',
      }
    )

    return response.data
  }
}
