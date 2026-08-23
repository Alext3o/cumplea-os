import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Experience from '@/pages/Experience'
import Admin from '@/pages/Admin'

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Experiencia principal */}
        <Route path="/" element={<Experience />} />

        {/* Panel de administración — protegido por Supabase Auth */}
        <Route path="/admin" element={<Admin />} />

        {/* Cualquier ruta desconocida → experiencia */}
        <Route path="*" element={<Experience />} />
      </Routes>
    </BrowserRouter>
  )
}
