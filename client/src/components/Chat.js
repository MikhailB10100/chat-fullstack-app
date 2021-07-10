import React, {useState, useContext} from 'react'
import { Context } from '../index'
import { observer } from "mobx-react-lite";


const Chat = () => {
  const [message, setMessage] = useState('')
  const {store} = useContext(Context)
  const username = store.user.username

  
  const ch = () => {
    const res = store.chat.map((item, index) => {
      const date = new Date(item.date).toTimeString()
      const nick = <b>{`${item.username}:`}</b>
      return <p key={index}>{`${date.slice(0, 8)} `}{nick}{` ${item.message}`}</p>
    })
    return res
  }

  const handleSubmit = () => {
    if (message != '') {
      store.sendMessage(username, message)
      setMessage('')
    }
  }

  return (
    <div className="wrap">
       <div className="content-chat">
        <div className="content-chat-header">
          <div className="chat-header-username">
            <h1>Your username: <b>{store.user.username}</b></h1>
          </div>
          <div className="chat-header-logout_button">
            <button className="logout_button" onClick={() => store.logout()}>Logout</button>
          </div>
        </div>
        <div className="content-chat-communication_area">{ch()}</div>
        <div className="content-chat-send_message">
          <input 
            onChange={e => setMessage(e.target.value)}
            className="content-chat-message_input"
            value={message}
            type='text'
            onKeyDown={e => {if (e.key === 'Enter') handleSubmit()}}
            autoFocus
          />
          <button className="content-chat-send_button"onClick={handleSubmit}>{'>'}</button>
        </div>
      </div>
    </div>
  )
}

export default observer(Chat)