// import {Redirect} from 'react-router-dom'
import auth from '../services/auth'

const Student = props => {
  const activityLog = JSON.parse(localStorage.getItem('activityLog')) || []

  const handleLogout = () => {
    auth.logout()
    const {history} = props
    console.log(history)
    history.replace('/')
  }

  return (
    <div className="overall-container">
      <div
        className="login-container"
        style={{
          padding: '20px',
          borderRadius: '10px',
          overflow: 'auto',
        }}
      >
        <h1>Student</h1>
        <h2>Activity Log</h2>

        <div style={{height: '70vh', overflow: 'auto'}}>
          <table>
            <thead>
              <tr>
                <th>Input</th>
                <th>Output</th>
              </tr>
            </thead>
            <tbody>
              {activityLog.map(entry => (
                <tr key={entry.id}>
                  <td>{entry.input}</td>
                  <td>{entry.output}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <button className="button" type="button" onClick={handleLogout}>
          Logout
        </button>
      </div>
    </div>
  )
}

export default Student
