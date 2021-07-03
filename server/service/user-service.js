const UserModel = require('../models/user-model')
const bcrypt = require('bcrypt')
const tokenService = require('./token-service')
const UserDto = require('../dtos/uset-dto')
const ApiError = require('../exceptions/api-error')

class UserService {
  async registration(username, password) {
    const candidate = await UserModel.findOne({username})
    if (candidate) {
      throw ApiError.BadRequest(`Username '${username}' is already taken.`)
    }
    const hashPassword = await bcrypt.hash(password, 3)
    const user = await UserModel.create({username, password: hashPassword})

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
}

module.exports = new UserService()