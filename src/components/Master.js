import {useState} from 'react'
import {v4 as uuid} from 'uuid'
import auth from '../services/auth'
import calculator from '../services/calculator'

const Master = props => {
  const [input, setInput] = useState('')
  const [output, setOutput] = useState('')
  const [activityLog, setActivityLog] = useState(
    localStorage.getItem('activityLog') === null
      ? []
      : JSON.parse(localStorage.getItem('activityLog')),
  )
  console.log('log', activityLog)

  const handleInputChange = e => {
    setInput(e.target.value)
  }

  const handleSubmit = e => {
    e.preventDefault()
    console.log(123)

    try {
      const result = calculator(input)

      localStorage.setItem(
        'activityLog',
        JSON.stringify([...activityLog, {id: uuid(), input, output: result}]),
      )

      setActivityLog([...activityLog, {id: uuid(), input, output: result}])
      setOutput(result)
    } catch (error) {
      setOutput('Error: Invalid expression')
      console.log(error)
    }
  }

  const handleLogout = () => {
    auth.logout()
    const {history} = props
    // console.log(history)
    history.replace('/')
  }

  const deleteEvaluations = () => {
    localStorage.removeItem('activityLog')
    setActivityLog([])
  }

  return (
    <div className="overall-container">
      <div
        className="login-container"
        style={{padding: '20px', borderRadius: '10px'}}
      >
        <h1>Master User</h1>
        <p>Allowed Operations: plus, minus, times, dividedBy</p>
        <p>Example Input: three(times(five())) #Outputs 15</p>
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="input">Input:</label>
            <input
              type="text"
              id="input"
              value={input}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <label htmlFor="output">Output:</label>
            <input type="text" id="output" value={output} disabled />
          </div>
          <button className="button" type="submit">
            Submit
          </button>
        </form>
        <h2>Activity Log</h2>
        <div style={{height: '30vh', overflow: 'auto'}}>
          {activityLog.length === 0 ? (
            'Evaluation yet to begin'
          ) : (
            <table>
              <thead>
                <tr key="headings">
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
          )}
        </div>

        <div
          style={{
            width: '100%',
            display: 'flex',
            justifyContent: 'space-around',
          }}
        >
          <button className="button" type="button" onClick={deleteEvaluations}>
            Clear
          </button>
          <button className="button" type="button" onClick={handleLogout}>
            Logout
          </button>
        </div>
      </div>
    </div>
  )
}

export default Master
