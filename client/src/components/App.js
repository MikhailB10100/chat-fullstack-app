import React, { useState, useContext, useEffect } from 'react'
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

  let body = ''

  if (store.isLoading) {
    body = <div>Loading...</div>
  }

  if (!store.isAuth) {
    body = <LoginForm />

  } else {
    store.getMessages()
    body = (
    <>
      <h1>{store.isAuth ? `Your username: ${store.user.username}` : 'Unauthorized'}</h1>
      <button onClick={() => store.logout()}>Logout</button>
      <Chat />
    </>
    )
  }

  return (
    <div className="content">{body}</div>
  )
}

export default observer(App)