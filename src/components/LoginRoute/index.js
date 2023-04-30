import {Component} from 'react'
import {Redirect} from 'react-router-dom'
import Cookies from 'js-cookie'

import './index.css'

class LoginRoute extends Component {
  state = {
    username: '',
    password: '',
    showErrorMsg: false,
    errorMsg: '',
  }

  onLoginSuccess = data => {
    const jwtToken = data.jwt_token
    const {history} = this.props
    Cookies.set('jwt_token', jwtToken, {expires: 30})

    history.replace('/')
  }

  onLoginFailure = data => {
    const errorMsg = data.error_msg
    this.setState({
      errorMsg,
      showErrorMsg: true,
    })
  }

  onSubmitLoginDetails = async event => {
    event.preventDefault()

    const {username, password} = this.state
    const userDetails = {
      username,
      password,
    }
    const loginUrl = 'https://apis.ccbp.in/login'
    const options = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    }

    const response = await fetch(loginUrl, options)
    if (response.ok) {
      const data = await response.json()
      this.onLoginSuccess(data)
    } else {
      const data = await response.json()
      this.onLoginFailure(data)
    }
  }

  onChangeUsername = event => {
    this.setState({username: event.target.value})
  }

  onChangePassword = event => {
    this.setState({password: event.target.value})
  }

  renderUsernameField = () => {
    const {username} = this.state

    return (
      <div className="input-container">
        <label htmlFor="username" className="login-label">
          USERNAME
        </label>
        <input
          type="text"
          placeholder="Username"
          className="login-input"
          value={username}
          id="username"
          onChange={this.onChangeUsername}
        />
      </div>
    )
  }

  renderPasswordField = () => {
    const {password} = this.state

    return (
      <div className="input-container">
        <label htmlFor="password" className="login-label">
          PASSWORD
        </label>
        <input
          type="password"
          placeholder="Password"
          className="login-input"
          value={password}
          id="password"
          onChange={this.onChangePassword}
        />
      </div>
    )
  }

  renderWebsiteLogo = () => (
    <div className="login-logo-container">
      <img
        src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
        className="login-logo"
        alt="website logo"
      />
    </div>
  )

  renderLoginButton = () => (
    <button type="submit" className="login-submit-button">
      Login
    </button>
  )

  renderErrorMsg = () => {
    const {errorMsg} = this.state
    return <p className="login-error-msg">{errorMsg}</p>
  }

  render() {
    const {showErrorMsg, errorMsg} = this.state
    const jwtToken = Cookies.get('jwt_token')

    if (jwtToken !== undefined) {
      return <Redirect to="/" />
    }

    return (
      <div className="login-bg-container">
        <div className="login-responsive-container">
          <div className="login-card">
            <form className="login-form" onSubmit={this.onSubmitLoginDetails}>
              {this.renderWebsiteLogo()}
              {this.renderUsernameField()}
              {this.renderPasswordField()}
              {this.renderLoginButton()}
              {showErrorMsg && <p className="login-error-msg">*{errorMsg}</p>}
            </form>
          </div>
        </div>
      </div>
    )
  }
}

export default LoginRoute
