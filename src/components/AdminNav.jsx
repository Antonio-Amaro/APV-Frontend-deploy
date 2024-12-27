import { Link } from 'react-router-dom'

const AdminNav = () => {
  return (
    <nav className='flex gap-3'>
        <Link
            to="/admin/perfil"
            className='font-bold uppercase text-gray-500 border-b-2 border-transparent hover:border-b-2 hover:border-b-gray-500 hover:transition-all'
        >
        Perfil</Link>
        <Link
            to="/admin/cambiar-password"
            className='font-bold uppercase text-gray-500 border-b-2 border-transparent hover:border-b-2 hover:border-b-gray-500 hover:transition-all'
        >
        Cambiar Password</Link>
    </nav>
  )
}

export default AdminNav