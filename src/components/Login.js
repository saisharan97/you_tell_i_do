import {useState} from 'react'
import {Redirect} from 'react-router-dom'
import auth from '../services/auth'
import './index.css'

const Login = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  const handleSubmit = e => {
    e.preventDefault()

    const role = auth.login(username, password)
    if (role) {
      setIsLoggedIn(true)
    } else {
      setError('Invalid username or password')
    }
  }

  if (isLoggedIn) {
    const role = auth.getRole(username)
    return <Redirect to={`/${role.toLowerCase()}`} />
  }

  return (
    <div className="overall-container">
      <div
        className="login-container"
        style={{padding: '20px', borderRadius: '10px'}}
      >
        <h1>Login Page</h1>
        <p>
          Sample credentials: <br />
          <br />
          Username: master, Password:master@123 <br />
          <br />
          Username: student, Password:student@123
        </p>
        <form onSubmit={handleSubmit} style={{width: '100%'}}>
          <div>
            <label htmlFor="username">Username:</label>
            <br />
            <input
              type="text"
              id="username"
              value={username}
              onChange={e => setUsername(e.target.value)}
            />
          </div>
          <br />
          <div>
            <label htmlFor="password">Password:</label>
            <br />

            <input
              type="password"
              id="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
            />
          </div>
          <button className="button" type="submit">
            Login
          </button>
          {error && <p style={{color: 'red'}}>{error}</p>}
        </form>
      </div>
    </div>
  )
}

export default Login
