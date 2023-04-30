import {withRouter, Link} from 'react-router-dom'
import Cookies from 'js-cookie'
import {AiFillHome} from 'react-icons/ai'
import {FiLogOut} from 'react-icons/fi'
import {BsBriefcaseFill} from 'react-icons/bs'

import './index.css'

const Header = props => {
  const onClickLogout = () => {
    const {history} = props
    Cookies.remove('jwt_token')
    history.replace('/login')
  }

  const renderWebsiteLogo = () => (
    <div className="logo-container">
      <Link to="/" className="link-item">
        <img
          src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
          alt="website logo"
          className="header-website-logo"
        />
      </Link>
    </div>
  )

  const renderHeaderLinks = () => (
    <>
      <ul className="nav-items-container-sm">
        <li className="nav-item">
          <Link to="/" className="link-item">
            <AiFillHome className="nav-icon" />
          </Link>
        </li>
        <li className="nav-item">
          <Link to="/jobs" className="link-item">
            <BsBriefcaseFill className="nav-icon" />
          </Link>
        </li>
        <li className="nav-item">
          <button
            type="button"
            className="header-logout-icon-button"
            onClick={onClickLogout}
          >
            <FiLogOut className="nav-icon" />
          </button>
        </li>
      </ul>
      <ul className="nav-items-container-lg">
        <li className="nav-item-lg nav-text">
          <Link to="/" className="link-item">
            Home
          </Link>
        </li>
        <li className="nav-item-lg nav-text">
          <Link to="/jobs" className="link-item">
            Jobs
          </Link>
        </li>
      </ul>
    </>
  )

  return (
    <nav className="navbar-container">
      <div className="navbar-responsive-container">
        {renderWebsiteLogo()}
        {renderHeaderLinks()}
        <button
          type="button"
          className="header-logout-button"
          onClick={onClickLogout}
        >
          Logout
        </button>
      </div>
    </nav>
  )
}

export default withRouter(Header)
