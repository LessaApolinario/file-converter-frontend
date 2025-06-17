export interface DocumentUseCase {
  convertDocxToPdf(file: File): Promise<File>
  convertCsvToXls(file: File): Promise<File>
}
