import { apiClient } from './axios'
import type { AuthResponse, LoginPayload, RegisterPayload } from '../types'

export const authApi = {
  async login(payload: LoginPayload) {
    const response = await apiClient.post<AuthResponse>('/login', payload)
    return response.data
  },
  async register(payload: RegisterPayload) {
    const response = await apiClient.post<AuthResponse>('/register', payload)
    return response.data
  },
}
