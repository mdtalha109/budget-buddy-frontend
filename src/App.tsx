
import { Route, Routes } from 'react-router-dom'
import './App.css'

import LoginPage from './pages/auth/Login'
import RegisterPage from './pages/auth/Register'

function App() {

  return (

    <Routes>
      <Route path='/auth/login' element={<LoginPage />} />
      <Route path='/auth/register' element={<RegisterPage />} />
    </Routes>

  )
}

export default App
