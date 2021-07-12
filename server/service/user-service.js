const UserModel = require('../models/user-model')
const MessageModel = require('../models/message-model')
const bcrypt = require('bcrypt')
const tokenService = require('./token-service')
const UserDto = require('../dtos/uset-dto')
const MessageDto = require('../dtos/message-dto')
const ApiError = require('../exceptions/api-error')

class UserService {
  async registration(username, password) {
    const candidate = await UserModel.findOne({username})
    if (candidate) {
      throw ApiError.BadRequest(`Username '${username}' is already taken.`)
    }
    const hashPassword = await bcrypt.hash(password, 3)
    const user = await UserModel.create({username: username.trim(), password: hashPassword})

    const userDto = new UserDto(user)
    const tokens = tokenService.generateTokens({...userDto})
    await tokenService.saveToken(userDto.id, tokens.refreshToken)
    return {...tokens, user: userDto}
  }

  async login(username, password) {
    const user = await UserModel.findOne({username})
    if (!user) {
      throw ApiError.BadRequest('The user was not found')
    }
    const isPassEquals = await bcrypt.compare(password, user.password)
    if (!isPassEquals) {
      throw ApiError.BadRequest('Incorrect password')
    }
    const userDto = new UserDto(user)
    const tokens = tokenService.generateTokens({...userDto})

    await tokenService.saveToken(userDto.id, tokens.refreshToken)
    return {...tokens, user: userDto}
  }

  async logout(refreshToken) {
    const token = await tokenService.removeToken(refreshToken)
    return token
  }

  async refresh(refreshToken) {
    if (!refreshToken) {
      throw ApiError.UnathorizedError()
    }
    const userData = tokenService.validateRefreshToken(refreshToken)
    const tokenFromDb = await tokenService.findToken(refreshToken)
    if (!userData || !tokenFromDb) {
      throw ApiError.UnathorizedError()
    }
    const user = await UserModel.findById(userData.id)
    const userDto = new UserDto(user)
    const tokens = tokenService.generateTokens({...userDto})

    await tokenService.saveToken(userDto.id, tokens.refreshToken)
    return {...tokens, user: userDto}
  }

  async getAllUsers() {
    const users = await UserModel.find()
    const usersDto = users.map(item => new UserDto(item))
    return usersDto
  }

  async sendMessage(username, message) {
    const date = new Date()
    const msg = await MessageModel.create({date, username, message})

    const messageDto = new MessageDto(msg)
    return messageDto
  }

  async getMessages() {
    const messages = await MessageModel.find()
    const messagesDto = messages.map(item => new MessageDto(item))
    return messagesDto
  }
}

module.exports = new UserService()