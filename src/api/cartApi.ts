// 購物車 API 包裝，負責送出結帳資料。
import { apiClient } from './axios'
import type { CartSubmissionPayload, CartSubmissionResponse } from '../types'

export const cartApi = {
  async submitCart(payload: CartSubmissionPayload) {
    const response = await apiClient.post<CartSubmissionResponse>('/cart', payload)
    return response.data
  },
}
