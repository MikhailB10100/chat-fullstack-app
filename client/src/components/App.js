import React, { useContext, useEffect } from 'react'
import LoginForm from './LoginForm'
import Chat from './Chat'
import { Context } from '../index'
import { observer } from "mobx-react-lite";

const App = () => {
  const {store} = useContext(Context)
  useEffect(() => {
    if (localStorage.getItem('token')) {
      store.checkAuth()
    }
  }, [])

  if (store.isLoading) {
    return <div>Loading...</div>
  }

  if (!store.isAuth) {
    return (
      <div>
        <LoginForm />
      </div>
    )
  } else {
    store.getMessages()
  }

  return (
    <div>
      <h1>{store.isAuth ? `Your username: ${store.user.username}` : 'Unauthorized'}</h1>
      <button onClick={() => store.logout()}>Logout</button>
      <Chat />
    </div>
  )
}

export default observer(App)