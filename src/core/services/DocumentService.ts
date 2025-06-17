import type { DocumentAdapter } from '../interfaces/adapters/DocumentAdapter'
import type { DocumentUseCase } from '../interfaces/usecases/DocumentUseCase'

export class DocumentService implements DocumentUseCase {
  private readonly adapter: DocumentAdapter

  constructor(adapter: DocumentAdapter) {
    this.adapter = adapter
  }

  convertDocxToPdf(file: File): Promise<File> {
    return this.adapter.convertDocxToPdf(file)
  }

  convertCsvToXls(file: File): Promise<File> {
    return this.adapter.convertCsvToXls(file)
  }
}
