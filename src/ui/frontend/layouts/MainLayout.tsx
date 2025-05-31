import { Outlet } from 'react-router-dom'

export default function MainLayout() {
  return (
    <div className='min-h-screen bg-zinc-800 text-zinc-400'>
      <Outlet />
    </div>
  )
}
