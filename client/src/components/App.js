import React, { useContext, useEffect } from 'react'
import LoginForm from './LoginForm/LoginForm'
import Chat from './Chat/Chat'
import { Context } from '@/index'
import { observer } from "mobx-react-lite";

const App = () => {
  const {store} = useContext(Context)
  const {isLoading, isAuth} = store
  useEffect(() => {
    if (localStorage.getItem('token')) {
      store.checkAuth()
    }
  }, [])

  useEffect(() => {
    if (isAuth) store.getMessages()
  }, [isAuth])

  return isLoading
          ? <h1>Loading ...</h1> 
          : (isAuth ? <Chat /> : <LoginForm />)
}

export default observer(App)
