import {Switch, Route} from 'react-router-dom'
import Login from './components/Login'
import Master from './components/Master'
import Student from './components/Student'
import './App.css'

function App() {
  return (
    <Switch>
      <Route exact path="/" component={Login} />
      <Route exact path="/master" component={Master} />
      <Route exact path="/student" component={Student} />
    </Switch>
  )
}

export default App
