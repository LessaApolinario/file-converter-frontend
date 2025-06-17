import { RouterProvider } from 'react-router-dom'
import { router } from '../routes/router'
import { DocumentProvider } from '../contexts/document/DocumentProvider'
import { ViteDIContainer } from '../dicontainer/ViteDIContainer'

function App() {
  return (
    <DocumentProvider useCase={ViteDIContainer.getDocumentUseCase()}>
      <RouterProvider router={router} />
    </DocumentProvider>
  )
}

export default App
