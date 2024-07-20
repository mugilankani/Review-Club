import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import AdminPanel from './component/admin/AdminPanel'
import ReviewClub from './component/user/ReviewClub'
import {  Routes, Route } from 'react-router-dom'
import LoginPage from './component/utils/Login'
function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Routes >
        <Route path="/" element={<ReviewClub />} />
        <Route path="/admin" element={<AdminPanel />} />
        <Route path="/Login" element={<LoginPage />} />
      </Routes>
    </>
  )
}

export default App
