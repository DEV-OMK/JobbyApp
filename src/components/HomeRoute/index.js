import {Component} from 'react'
import {Link} from 'react-router-dom'
import Header from '../Header'

import './index.css'

class HomeRoute extends Component {
  renderHomeContent = () => (
    <div className="home-content-container">
      <h1 className="home-title">Find The Job That Fits Your Life</h1>
      <p className="home-description">
        Millions of people are searching for jobs, salary information, company
        reviews. Find the job that fits your abilities and potential.
      </p>
      <Link to="/jobs" className="link-item">
        <button type="button" className="home-find-jobs-button">
          Find Jobs
        </button>
      </Link>
    </div>
  )

  render() {
    return (
      <>
        <Header />
        <div className="home-bg-container">
          <div className="home-responsive-container">
            {this.renderHomeContent()}
          </div>
        </div>
      </>
    )
  }
}

export default HomeRoute
