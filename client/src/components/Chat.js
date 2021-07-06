import React, {useState, useContext} from 'react'
import { Context } from '../index'
import { observer } from "mobx-react-lite";


const Chat = () => {
  const [message, setMessage] = useState('')
  const {store} = useContext(Context)
  const username = store.user.username
  
  return (
    <div>
      <div>{store.chat.map((item, index) => {
        let d = item.date
        let un = <b>{item.username}:</b>
          return <p key={index}>{`${d} ` }{un}{` ${item.message}`}</p>
        })}</div>
      <input 
        onChange={e => setMessage(e.target.value)}
        value={message}
        type='text'
      />
      <button onClick={() => {store.sendMessage(username, message)}}>send</button>
    </div>
  )
}

export default observer(Chat)