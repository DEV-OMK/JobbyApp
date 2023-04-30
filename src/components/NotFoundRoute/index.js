import './index.css'

const NotFoundRoute = () => (
  <div className="not-found-bg-container">
    <div className="not-found-responsive-container">
      <img
        src="https://assets.ccbp.in/frontend/react-js/jobby-app-not-found-img.png"
        alt="not found"
        className="not-found-image"
      />
      <h1 className="not-found-title">Page Not Found</h1>
      <p className="not-found-caption">
        we are sorry, the page you requested could not be found
      </p>
    </div>
  </div>
)

export default NotFoundRoute
