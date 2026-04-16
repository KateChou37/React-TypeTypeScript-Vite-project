import axios from 'axios'
import { mockAdapter } from './mockAdapter'

export const apiClient = axios.create({
  baseURL: '/api',
  adapter: mockAdapter,
  timeout: 5000,
})
