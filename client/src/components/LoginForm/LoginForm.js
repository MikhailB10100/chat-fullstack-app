import React, {useState, useContext, useEffect} from 'react'
import { Context } from '@/index'
import { observer } from "mobx-react-lite";
import DataInput from './data_input'
import FormChanger from './form_changer'

const LoginForm = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [form, setForm] = useState('login')
  const {store} = useContext(Context)
  
  useEffect(() => {
    setUsername('')
    setPassword('')
  }, [form])

  const handleAuth = () => form == 'login' ? store.login(username, password) : store.registration(username, password)
      
  return (
    <div className="content" style={{minHeight: '100vh'}}>
      <div className="wrap">
        <div className="content-authorization_form">
          <span className="content-authorization_form-welcome">Welcome</span>
          <DataInput value={username} fn={setUsername} field='Username' form={form} handleAuth={handleAuth}/>
          <DataInput value={password} fn={setPassword} field='Password' type='Password' form={form} handleAuth={handleAuth}/>
          <FormChanger form={form} setForm={setForm} handleAuth={handleAuth}/>
        </div>
      </div>
    </div>
  )
}

export default observer(LoginForm)
