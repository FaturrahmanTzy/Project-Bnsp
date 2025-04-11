import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Dashboard from './pages/Dashboard'
import Pendaftran from './pages/Pendaftran'
import EditePendaftaran from './pages/EditePendaftaran'
import ErrorPage from './pages/ErrorPage'

const App = () => {
  return (
    <div>
      <Router>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/pendaftaran" element={<Pendaftran />} />
          <Route path="/Pendaftaran/edit/:id" element={< EditePendaftaran />} />
          <Route path="*" element={< ErrorPage />} />
          {/* Tambahkan route lain sesuai kebutuhan */}
        </Routes>
      </Router>
    </div>
  )
}

export default App
