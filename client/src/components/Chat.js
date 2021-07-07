import React, {useState, useContext} from 'react'
import { Context } from '../index'
import { observer } from "mobx-react-lite";


const Chat = () => {
  const [message, setMessage] = useState('')
  const {store} = useContext(Context)
  const username = store.user.username

  const ch = () => {
    const res = store.chat.map((item, index) => {
      let date = new Date(item.date).toTimeString()
      let nick = <b>{item.username}:</b>
      return <p key={index}>{`${date.slice(0, 8)} ` }{nick}{` ${item.message}`}</p>
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
    <div>
      <div>{ch()}</div>
      <input 
        onChange={e => setMessage(e.target.value)}
        value={message}
        type='text'
        onKeyDown={e => {if (e.key === 'Enter') handleSubmit()}}
      />
      <button onClick={handleSubmit}>send</button>
    </div>
  )
}

export default observer(Chat)