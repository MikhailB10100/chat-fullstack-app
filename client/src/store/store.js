import AuthService from "../service/AuthService"
import { makeAutoObservable } from 'mobx'
import axios from "axios"
import { API_URL } from "../http"
import socket from '../index'

export default class Store {
  user = {}
  chat = []
  isAuth = false
  isLoading = false

  constructor() {
    makeAutoObservable(this)
  }

  setAuth(bool) {
    this.isAuth = bool
  }

  setUser(user) {
    this.user = user
  }

  setLoading(bool) {
    this.isLoading = bool
  }

  setChat(chat) {
    this.chat = chat
  }

  addMessage(msg) {
    this.chat.push(msg)
  }

  async login(username, password) {
    try {
      const response = await AuthService.login(username, password)
      localStorage.setItem('token', response.data.accessToken)
      this.setAuth(true)
      this.setUser(response.data.user)
    } catch (e) {
      console.log(e.response?.data?.message)
    }
  }

  async registration(username, password) {
    try {
      const response = await AuthService.registration(username, password)
      localStorage.setItem('token', response.data.accessToken)
      this.setAuth(true)
      this.setUser(response.data.user)
    } catch (e) {
      console.log(e.response?.data?.message)
    }
  }

  async logout() {
    try {
      const response = await AuthService.logout()
      localStorage.removeItem('token', response.data.accessToken)
      this.setAuth(false)
      this.setUser({})
    } catch (e) {
      console.log(e.response?.data?.message)
    }
  }

  async checkAuth() {
    this.setLoading(true)
    try {
      const response = await axios.get(`${API_URL}/refresh`, {withCredentials: true})
      localStorage.setItem('token', response.data.accessToken)
      this.setAuth(true)
      this.setUser(response.data.user)
    } catch (e) {
      console.log(e.response?.data?.message)
    } finally {
      this.setLoading(false)
    }
  }

  async sendMessage(username, message) {
    try {
      const response = await AuthService.sendMessage(username, message)
      socket.send(JSON.stringify(response))
    } catch (e) {
      console.log(e.response?.data?.message)
    }
  }

  async getMessage(msg) {
    try {
      this.addMessage(msg)
    } catch (e) {
      console.log(e)
    }
  }

  async getMessages() {
    try {
      this.setLoading(true)
      const response = await AuthService.getMessages()
      this.setChat(response.data)
      this.setLoading(false)
    } catch (e) {
      console.log(e.response?.data?.message)
    }
  }
}