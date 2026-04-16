import { apiClient } from './axios'
import type { Product } from '../types'

export const productApi = {
  async getProducts() {
    const response = await apiClient.get<Product[]>('/products')
    return response.data
  },
  async getProductById(id: number) {
    const response = await apiClient.get<Product>(`/products/${id}`)
    return response.data
  },
}
