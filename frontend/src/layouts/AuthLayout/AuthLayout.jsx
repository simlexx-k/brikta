import { Outlet } from 'react-router-dom'

export const AuthLayout = () => (
  <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary/10 to-background">
    <div className="w-full max-w-md p-8">
      <Outlet />
    </div>
  </div>
) 