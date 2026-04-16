export interface Product {
  id: number
  title: string
  category: string
  price: number
  inventory: number
  rating: number
  description: string
  features: string[]
  image?: string
  images?: string[]
}

export interface CartItem extends Product {
  quantity: number
}

export interface CheckoutFormValues {
  firstName: string
  lastName: string
  email: string
  address: string
  city: string
  postalCode: string
  notes: string
}

export interface CartSubmissionPayload {
  customer: CheckoutFormValues
  items: Array<{
    productId: number
    quantity: number
  }>
  total: number
}

export interface CartSubmissionResponse {
  message: string
  orderId: string
  total: number
}

export interface PurchasedOrder {
  orderId: string
  message: string
  total: number
  purchasedAt: string
  userEmail: string
  customer: CheckoutFormValues
  items: CartItem[]
}

export interface AuthUser {
  id: number
  name: string
  email: string
}

export interface AuthResponse {
  token: string
  user: AuthUser
}

export interface LoginPayload {
  email: string
  password: string
}

export interface RegisterPayload {
  name: string
  email: string
  password: string
}

export type AsyncStatus = 'idle' | 'loading' | 'succeeded' | 'failed'
