import React from "react"

function FormChanger({form, setForm, handleAuth}) {
  function changeForm(btnName, nextForm, text1, text2) {
    return (
      <>
        <div className="content-authorization_form-button">
        <button className={"authorization_form-button "} onClick={handleAuth}>{btnName}</button>
        </div>
        <span className="content-authorization_form-footer">
          {`${text1} `}
          <span 
            onClick={() => {
              setForm(nextForm)

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

  return form == 'login' 
          ? changeForm('Login', 'registration', `Don't have account yet?`, 'Sign up') 
          : changeForm('Registration', 'login', `Already have account?`, 'Sign in')
}



export default FormChanger