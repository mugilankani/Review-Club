import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import AdminPanel from './component/admin/AdminPanel'
import ReviewClub from './component/user/ReviewClub'
import {  Routes, Route } from 'react-router-dom'
function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Routes >
        <Route path="/" element={<ReviewClub />} />
        <Route path="/admin/dashboard" element={<AdminPanel />} />
      </Routes>
    </>
  )
}

export default App
