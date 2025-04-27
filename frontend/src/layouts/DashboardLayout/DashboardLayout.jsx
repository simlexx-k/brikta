import { Outlet } from 'react-router-dom'
import { DashboardSidebar } from './Sidebar'
import { DashboardTopNav } from './TopNav'

export const DashboardLayout = () => (
  <div className="flex h-screen bg-background">
    <DashboardSidebar />
    <div className="flex-1 flex flex-col overflow-hidden">
      <DashboardTopNav />
      <main className="flex-1 overflow-x-hidden overflow-y-auto p-6">
        <Outlet />
      </main>
    </div>
  </div>
) 