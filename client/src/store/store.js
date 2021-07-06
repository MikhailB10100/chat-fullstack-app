import AuthService from "../service/AuthService"
import { makeAutoObservable } from 'mobx'
import axios from "axios"
import { API_URL } from "../http"

export default class Store {
  user = {
    username: '',
    password: ''
  }
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

  async login(username, password) {
    try {
      const response = await AuthService.login(username, password)
      console.log(response)
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
      console.log(response)
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
      console.log(response)
      localStorage.setItem('token', response.data.accessToken)
      this.setAuth(true)
      this.setUser(response.data.user)
    } catch (e) {
      console.log(e.response?.data?.message)
    } finally {
      this.setLoading(false)
    }
  }
}