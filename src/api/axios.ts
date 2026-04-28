// Axios 用戶端設定，依環境決定是否接上本機 mock adapter。
import axios from 'axios'
import { mockAdapter } from './mockAdapter'

export const apiClient = axios.create({
  baseURL: '/api',
  adapter: mockAdapter,
  timeout: 5000,
})
