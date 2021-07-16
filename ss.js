for (let i=4; i<15; i++) {
    
  const user = {username: `klevak${i}`, password: 12345}
  fetch ('http://localhost:5000/api/registration', {
    method: 'Post',
    body: JSON.stringify(user)
  }).then(() => {
    const message = {username: user.username, message: 'Hi there'}

    fetch ('http://localhost:5000/api/sendmessage', {
      method: 'Post',
      body: JSON.stringify(message)
    }) 
  })

  
}