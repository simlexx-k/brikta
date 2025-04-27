import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { WelcomePage } from '@/pages/Welcome/Welcome'
import { DashboardPage } from '@/pages/Dashboard/Dashboard'
import { Layout } from '@/components/layout/Layout'
import { PublicLayout } from '@/layouts/PublicLayout/PublicLayout'
import { AuthLayout } from '@/layouts/AuthLayout/AuthLayout'
import { DashboardLayout } from '@/layouts/DashboardLayout/DashboardLayout'
import { AboutPage } from '@/pages/About/About'
import { LoginPage } from '@/pages/Login/Login'
import { RegisterPage } from '@/pages/Register/Register'
import { DashboardHome } from '@/pages/DashboardHome/DashboardHome'
import { FileManager } from '@/pages/FileManager/FileManager'

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public Routes */}
        <Route element={<PublicLayout />}>
          <Route path="/" element={<WelcomePage />} />
          <Route path="/about" element={<AboutPage />} />
        </Route>

        {/* Auth Routes */}
        <Route element={<AuthLayout />}>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
        </Route>

        {/* Dashboard Routes */}
        <Route element={<DashboardLayout />}>
          <Route path="/dashboard" element={<DashboardHome />} />
          <Route path="/dashboard/files" element={<FileManager />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}