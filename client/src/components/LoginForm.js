import React, {useState, useContext} from 'react'
import { Context } from '../index'
import { observer } from "mobx-react-lite";
import { makeAutoObservable } from 'mobx'

const LoginForm = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [form, setForm] = useState('login')
  const {store} = useContext(Context)

  const handleAuth = () => form == 'login' ? store.login(username, password) : store.registration(username, password)

  const createInput = (value, fn, field, type='text') => {
    const [style, setStyle] = useState()
    return (
      <div className="content-authorization_form-input">
        <input 
          onChange={e => {fn(e.target.value)}}
          onBlur={() => {
            if (!value) setStyle({top: '0px', fontSize: '20px'})
          }}
          onFocus={() => setStyle({top: '-20px', fontSize: '15px'})}
          className="authorization_form-input login"
          value={value}
          type={type}
          onKeyDown={e => {if (e.key === 'Enter') handleAuth()}}
        />
        <span className="content-authorization_form-input_focus" data-placeholder="Username" style={style}>{field}</span>
      </div>
    )
  }

  const changeForm = (btnName, nForm, text1, text2) => {
  return (
      <>
        <div className="content-authorization_form-button">
        <button className={"authorization_form-button "} onClick={handleAuth}>{btnName}</button>
        </div>
        <span className="content-authorization_form-footer">
          {`${text1} `}
          <span 
            onClick={() => {
              setForm(nForm)
              setUsername('')
              setPassword('')
            }}
            style={{cursor: 'pointer', color: 'blue'}}
            onMouseDown={(e) => e.preventDefault()}
          >
            {text2}
          </span>
        </span>
      </>
    )
  }

  const formChanger = (form) => {
    if (form == 'login') {
      return changeForm(
        'Login',
        'registration', 
        `Don't have account yet?`, 
        'Sign up'
      )
    } else {
      return changeForm(
        'Registration', 
        'login', 
        `Already have account?`, 
        'Sign in'
      )
    }
  }
      
  return (
    <div className="wrap">
      <div className="content-authorization_form">
        <span className="content-authorization_form-welcome">Welcome</span>
        {createInput(username, setUsername, 'Username')}
        {createInput(password, setPassword, 'Password', 'password')}
        {formChanger(form)}
      </div>
    </div>
  )
}

export default observer(LoginForm)