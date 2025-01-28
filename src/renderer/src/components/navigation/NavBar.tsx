import { Link } from 'react-router-dom'
import './navbar.css'

function NavBar() {
  return (
    <div className="navbar-wrap">
      <div className="branding-wrap">
        <div className="logo"></div>
        <h1 className="bussiness-name">Bussiness Name</h1>
      </div>
      <div className="nav-links">
        <h1>PettyCashier</h1>
        <Link to="/" className="nav-link">
          Dashboard
        </Link>
        <Link to="/report" className="nav-link">
          Report
        </Link>
      </div>
    </div>
  )
}

export default NavBar
