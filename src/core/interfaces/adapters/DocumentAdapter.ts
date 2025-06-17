export interface DocumentAdapter {
  convertDocxToPdf(file: File): Promise<File>
  convertCsvToXls(fileBuffer: File): Promise<File>
}
