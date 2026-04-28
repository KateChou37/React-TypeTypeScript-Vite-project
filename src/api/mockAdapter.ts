// Axios mock adapter，模擬商品、購物車與會員相關後端端點。
import type { AxiosAdapter, AxiosResponse, InternalAxiosRequestConfig } from 'axios'
import { getStoredUsers, saveStoredUsers } from './authStorage'
import { mockProducts } from './mockData'
import type {
  AuthResponse,
  CartSubmissionPayload,
  CartSubmissionResponse,
  LoginPayload,
  RegisterPayload,
} from '../types'

// 模擬網路延遲，讓載入狀態在開發環境中更接近真實 API。
const wait = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms))

// 建立符合 AxiosResponse 介面的回應物件，讓 mock 端點可直接回傳。
const createResponse = <T>(
  config: InternalAxiosRequestConfig,
  data: T,
  status = 200,
): AxiosResponse<T> => ({
  data,
  status,
  statusText: status === 200 ? 'OK' : 'Created',
  headers: {},
  config,
})

// 依 request method 與 URL 分派到對應的 mock 後端邏輯。
export const mockAdapter: AxiosAdapter = async (config) => {
  await wait(450)

  const method = config.method?.toLowerCase()
  const url = config.url ?? ''

  if (method === 'get' && url === '/products') {
    return createResponse(config, mockProducts)
  }

  if (method === 'get' && url.startsWith('/products/')) {
    const id = Number(url.split('/').pop())
    const product = mockProducts.find((item) => item.id === id)

    if (!product) {
      throw new Error('Product not found.')
    }

    return createResponse(config, product)
  }

  if (method === 'post' && url === '/cart') {
    const payload =
      typeof config.data === 'string'
        ? (JSON.parse(config.data) as CartSubmissionPayload)
        : (config.data as CartSubmissionPayload)

    const response: CartSubmissionResponse = {
      message: 'Order placed successfully.',
      orderId: `ORD-${Date.now().toString().slice(-6)}`,
      total: payload.total,
    }

    return createResponse(config, response, 201)
  }

  // 登入時改讀 localStorage 內的 mock 使用者清單。
  if (method === 'post' && url === '/login') {
    const payload =
      typeof config.data === 'string'
        ? (JSON.parse(config.data) as LoginPayload)
        : (config.data as LoginPayload)

    const users = getStoredUsers()
    const matchedUser = users.find(
      (user) => user.email === payload.email && user.password === payload.password,
    )

    if (!matchedUser) {
      throw new Error('Invalid credentials')
    }

    const response: AuthResponse = {
      token: `mock-jwt-token-${matchedUser.id}`,
      user: {
        id: matchedUser.id,
        name: matchedUser.name,
        email: matchedUser.email,
      },
    }

    return createResponse(config, response, 201)
  }

  // 註冊時檢查 email 是否重複，成功後寫回 mock 使用者資料。
  if (method === 'post' && url === '/register') {
    const payload =
      typeof config.data === 'string'
        ? (JSON.parse(config.data) as RegisterPayload)
        : (config.data as RegisterPayload)

    const users = getStoredUsers()
    const exists = users.some((user) => user.email === payload.email)

    if (exists) {
      throw new Error('Email already exists')
    }

    const newUser = {
      ...payload,
      id: users.length > 0 ? Math.max(...users.map((user) => user.id)) + 1 : 1,
    }

    saveStoredUsers([...users, newUser])

    const response: AuthResponse = {
      token: `mock-jwt-token-${newUser.id}`,
      user: {
        id: newUser.id,
        name: newUser.name,
        email: newUser.email,
      },
    }

    return createResponse(config, response, 201)
  }

  throw new Error(`Unknown endpoint: ${method?.toUpperCase()} ${url}`)
}
