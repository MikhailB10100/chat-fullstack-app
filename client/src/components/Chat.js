import React, {useState, useContext, useEffect, useRef} from 'react'
import { Context } from '../index'
import { observer } from "mobx-react-lite";


const Chat = () => {
  const [message, setMessage] = useState('')
  const {store} = useContext(Context)
  const username = store.user.username
  const color = 'wheat'
  const messagesArea = () => {
    const res = store.chat.map((item, index) => {
      const time = new Date(item.date).toTimeString()
      const nick = item.username
      const usermessage = nick == username
      return (
      <span className="msg-line" style={{alignItems: usermessage ? 'flex-end' : 'flex-start'}} key={`message${index}`}>
        <div className="message">
          <div className="message-header">
            <div className="message-header-username">{usermessage ? '' : nick}</div>
            <div className="message-header-time">{`${time.slice(0, 5)} `}</div>
          </div>
          <div className="message-content" style={{background: usermessage ? `${color}` : ''}}>{item.message}</div>
        </div>
      </span>
      )
    })
    return res
  }

  const handleSubmit = () => {
    if (message != '') {
      store.sendMessage(username, message)
      setMessage('')
    }
  }

  const messagesEndRef = useRef(null)
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "auto" })
  } 
  useEffect(() => {
    scrollToBottom()
  }, [messagesArea]);

  return (
    <>
      <div className="header">
        <div className="header-content">
          <div className="header-name">Just chat</div>
          <div className="header-user">
            <div className="header-user-username">
              <h1><b>{store.user.username}</b></h1>
            </div>
              <button className="header-user-logout_button" onClick={() => store.logout()}>Logout</button>
          </div>
        </div>
      </div>
      <div className="content" style={{alignItems: 'normal'}}>
        <div className="content-chat">
          <div className="content-chat-communication_area" >
            {messagesArea()}
            <div ref={messagesEndRef}></div>
          </div>
          <div className="chat-send_message">
            <input 
              onChange={e => setMessage(e.target.value)}
              className="chat-send_message-input"
              value={message}
              type='text'
              onKeyDown={e => {if (e.key === 'Enter') handleSubmit()}}
              autoFocus
            />
            <button className="chat-send_message-button"onClick={handleSubmit}>send</button>
          </div>
        </div>
      </div>
    </>
  )
}

export default observer(Chat)
