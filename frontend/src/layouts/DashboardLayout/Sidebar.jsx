export const DashboardSidebar = () => (
  <aside className="w-64 bg-background border-r p-4">
    <nav className="space-y-1">
      <a href="/dashboard" className="flex items-center p-2 text-sm font-medium rounded-md hover:bg-accent">
        Dashboard
      </a>
      <a href="/dashboard/files" className="flex items-center p-2 text-sm font-medium rounded-md hover:bg-accent">
        Files
      </a>
    </nav>
  </aside>
) 