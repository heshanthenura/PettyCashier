import { HashRouter as Router, Route, Routes } from 'react-router-dom'
import Report from './pages/report/Report'
import DashboardPage from './pages/bashboard/DashboardPage'

function App(): JSX.Element {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<DashboardPage />} />
          <Route path="/report" element={<Report />} />
        </Routes>
      </Router>
    </>
  )
}

export default App
