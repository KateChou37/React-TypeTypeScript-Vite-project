// 驗證 API 包裝，提供登入與註冊請求。
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
