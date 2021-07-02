const UserModel = require('../models/user-model')
const bcrypt = require('bcrypt')
const tokenService = require('./token-service')
const UserDto = require('../dtos/uset-dto')

class UserService {
  async registration(username, password) {
    const candidate = await UserModel.findOne({username})
    if (candidate) {
      throw new Error(`Username '${username}' is already taken.`)
    }
    const hashPassword = await bcrypt.hash(password, 3)
    const user = await UserModel.create({username, password: hashPassword})

    const userDto = new UserDto(user)
    const tokens = tokenService.generateTokens({...userDto})
    await tokenService.saveToken(userDto.id, tokens.refreshToken)

    return {...tokens, user: userDto}
  }
}

module.exports = new UserService()