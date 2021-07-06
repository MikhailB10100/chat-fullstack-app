import React, { createContext } from 'react'
import ReactDOM from 'react-dom'
import './scss/index.scss'
import Store from './store/store'
import LoginForm from './components/LoginForm'

const store = new Store()

export const Context = createContext({
  store
})

class App extends React.Component {

  render() {
    return (
      <Context.Provider value={{store}}>
        <LoginForm />
      </Context.Provider>
    )
  }
}

ReactDOM.render(<App />, document.getElementById('app'))