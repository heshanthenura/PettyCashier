import Dashboard from '@renderer/components/dashboard/Dashboard'
import NavBar from '@renderer/components/navigation/NavBar'
import './dashboardpage.css'
import Table from '@renderer/components/transtable/Table'

function DashboardPage() {
  return (
    <div className="dash-body">
      <NavBar />
      <Dashboard />
      <Table />
    </div>
  )
}

export default DashboardPage
