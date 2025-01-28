import Dashboard from '@renderer/components/dashboard/Dashboard'
import NavBar from '@renderer/components/navigation/NavBar'
import './dashboardpage.css'

function DashboardPage() {
  return (
    <div className="dash-body">
      <NavBar />
      <Dashboard />
    </div>
  )
}

export default DashboardPage
