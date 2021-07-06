import React, { createContext } from 'react'
import ReactDOM from 'react-dom'
import './scss/index.scss'
import Store from './store/store'
import App from './components/App'

const store = new Store()

export const Context = createContext({
  store
})

ReactDOM.render(
  <Context.Provider value={{store}}>
    <App />
  </Context.Provider>,
  document.getElementById('app')
)