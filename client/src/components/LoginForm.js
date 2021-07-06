import React, {useState, useContext} from 'react'
import { Context } from '../index'

const LoginForm = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const {store} = useContext(Context)
  return (
    <div>
      <input 
        onChange={e => setUsername(e.target.value)}
        value={username}
        type='text'
        placeholder='username'
      />
      <input 
        onChange={e => setPassword(e.target.value)}
        value={password}
        type='password'
        placeholder='password'
      />
      <button onClick={() => store.login(username, password)}>Login</button>
      <button onClick={() => store.registration(username, password)}>Registration</button>
    </div>
  )
}

export default LoginForm