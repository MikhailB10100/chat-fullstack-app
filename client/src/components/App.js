import React, { useContext, useEffect } from 'react'
import LoginForm from './LoginForm'
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
      <LoginForm />
    )
  }

  return (
    <div>
      <h1>{store.isAuth ? `Your username: ${store.user.username}` : 'Unauthorized'}</h1>
      <button onClick={() => store.logout()}>Logout</button>
    </div>
  )
}

export default observer(App)