import { FileConverter } from '@/components/home/FileConverter'

export default function HomePage() {
  return (
    <main className='min-h-screen'>
      <div className='flex min-h-screen flex-col items-center justify-center'>
        <div className='flex flex-col items-center justify-center'>
          <h2 className='mb-16 text-center text-3xl'>Conversor de arquivos</h2>

          <FileConverter />
        </div>
      </div>
    </main>
  )
}
