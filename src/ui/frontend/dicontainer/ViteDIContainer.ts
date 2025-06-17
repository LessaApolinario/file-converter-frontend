import type { DocumentUseCase } from '@/core/interfaces/usecases/DocumentUseCase'
import { DocumentService } from '@/core/services/DocumentService'
import { DocumentAPI } from '@/infra/document'

export class ViteDIContainer {
  static getDocumentUseCase(): DocumentUseCase {
    return new DocumentService(new DocumentAPI())
  }
}
