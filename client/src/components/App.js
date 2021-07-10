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
      <Chat />
    </>
    )
  }

  return (
    <div className="content">{body}</div>
  )
}

export default observer(App)