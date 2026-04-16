import { createSlice } from '@reduxjs/toolkit'
import type { CartItem, CartSubmissionResponse, CheckoutFormValues, PurchasedOrder } from '../types'

const ORDERS_KEY = 'soundnest-purchased-orders'

interface OrderState {
  items: PurchasedOrder[]
}

interface AddPurchasedOrderPayload {
  submission: CartSubmissionResponse
  customer: CheckoutFormValues
  items: CartItem[]
  userEmail: string
}

function canUseStorage() {
  return typeof window !== 'undefined' && typeof window.localStorage !== 'undefined'
}

function getStoredOrders() {
  if (!canUseStorage()) {
    return []
  }

  const value = window.localStorage.getItem(ORDERS_KEY)
  return value ? (JSON.parse(value) as PurchasedOrder[]) : []
}

function saveStoredOrders(orders: PurchasedOrder[]) {
  if (!canUseStorage()) {
    return
  }

  window.localStorage.setItem(ORDERS_KEY, JSON.stringify(orders))
}

const initialState: OrderState = {
  items: getStoredOrders(),
}

const orderSlice = createSlice({
  name: 'orders',
  initialState,
  reducers: {
    addPurchasedOrder(state, action: { payload: AddPurchasedOrderPayload }) {
      const { customer, items, submission, userEmail } = action.payload
      const purchasedOrder: PurchasedOrder = {
        orderId: submission.orderId,
        message: submission.message,
        total: submission.total,
        purchasedAt: new Date().toISOString(),
        userEmail,
        customer,
        items,
      }

      state.items.unshift(purchasedOrder)
      saveStoredOrders(state.items)
    },
    clearPurchasedOrders(state) {
      state.items = []
      saveStoredOrders(state.items)
    },
  },
})

export const { addPurchasedOrder, clearPurchasedOrders } = orderSlice.actions
export default orderSlice.reducer
