const {Schema, model} = require('mongoose')

const MessageSchema = new Schema({
  date: {type: Date},
  username: {type: String},
  message: {type: String}
})

module.exports = model('Message', MessageSchema)