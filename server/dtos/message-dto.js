module.exports = class MessageDto {
  date
  username
  message

  constructor(model) {
    this.date = model.date
    this.username = model.username
    this.message = model.message
  }
}