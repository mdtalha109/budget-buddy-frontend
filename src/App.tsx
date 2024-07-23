import { useEffect } from 'react'
import { Route, Routes, useNavigate } from 'react-router-dom'
import { Toaster } from 'react-hot-toast';
import PrivateRoute from './components/routes/PrivateRoute'
import LoginPage from './pages/auth/Login'
import RegisterPage from './pages/auth/Register'
import Dashboard from './pages/dashboard'
import MainLayout from './layout/MainLayout'
import useAuth from './hooks/useAuth'
import Expense from './pages/Expense'
import Incomes from './pages/incomes'
import PublicRoute from './components/routes/PublicRoute';
import Profile from './pages/profile';


function App() {

  return (
    <>
      <Routes>
        <Route path="/auth" element={<PublicRoute />}>
            <Route path="login" element={<LoginPage />} />
            <Route path="register" element={<RegisterPage />} />
        </Route>


        <Route path="/" element={<PrivateRoute />}>
          <Route path="/" element={<MainLayout />}>
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="expenses" element={<Expense />} />
            <Route path="incomes" element={<Incomes />} />
            <Route path="profile" element={<Profile />} />
          </Route>
        </Route>
      </Routes>
      <Toaster/>
    </>
  )
}

export default App
