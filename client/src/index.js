import React, { createContext } from 'react'
import ReactDOM from 'react-dom'
import './scss/index.scss'
import Store from './store/store'
import App from './components/App'

const store = new Store()
const socket = new WebSocket('ws://localhost:5000')

export const Context = createContext({
  store
})

socket.onmessage = event => {
  const r = JSON.parse(event.data).data
  store.getMessage(r)
}

ReactDOM.render(
  <Context.Provider value={{store}}>
    <App />
  </Context.Provider>,
  document.getElementById('app')
)

export default socket
