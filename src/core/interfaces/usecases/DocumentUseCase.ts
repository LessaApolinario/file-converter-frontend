export interface DocumentUseCase {
  convertDocxToPdf(file: File): Promise<File>
  convertCsvToXls(fileBuffer: File): Promise<File>
}
