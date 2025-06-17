export interface DocumentAdapter {
  convertDocxToPdf(file: File): Promise<File>
  convertCsvToXls(file: File): Promise<File>
}
