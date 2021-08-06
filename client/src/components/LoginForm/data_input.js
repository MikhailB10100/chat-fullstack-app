import React, { useState, useEffect } from "react"

function DataInput ({value, fn, field, type = 'text', form, handleAuth}) {
  const [style, setStyle] = useState({top: '0px', fontSize: '20px'})
  
  useEffect(() => {
    setStyle({top: '0px', fontSize: '20px'})
  }, [form])

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
        onKeyDown={e => {if(e.key == 'Enter') handleAuth()}}
      />
      <span className="content-authorization_form-input_focus" data-placeholder="Username" style={style}>{field}</span>
    </div>
  ) 
}

export default DataInput