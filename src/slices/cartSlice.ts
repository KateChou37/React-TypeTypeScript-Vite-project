// Redux cart slice，管理購物車項目、數量與結帳送出狀態。
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { cartApi } from '../api/cartApi'
import type {
  AsyncStatus,
  CartItem,
  CartSubmissionPayload,
  CartSubmissionResponse,
  Product,
} from '../types'

interface CartState {
  items: CartItem[]
  status: AsyncStatus
  submitStatus: AsyncStatus
  error: string | null
  submission: CartSubmissionResponse | null
}

const initialState: CartState = {
  items: [],
  status: 'idle',
  submitStatus: 'idle',
  error: null,
  submission: null,
}

// 非同步送出購物車，失敗時回傳可直接顯示在 UI 的中文錯誤訊息。
export const submitCart = createAsyncThunk(
  'cart/submitCart',
  async (payload: CartSubmissionPayload, { rejectWithValue }) => {
    try {
      return await cartApi.submitCart(payload)
    } catch {
      return rejectWithValue('目前無法完成結帳，請稍後再試。')
    }
  },
)

// cart slice 同時管理本地購物車操作與結帳請求生命週期。
const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart(state, action: { payload: Product }) {
      const existingItem = state.items.find((item) => item.id === action.payload.id)

      if (existingItem) {
        existingItem.quantity += 1
      } else {
        state.items.push({ ...action.payload, quantity: 1 })
      }
    },
    removeFromCart(state, action: { payload: number }) {
      state.items = state.items.filter((item) => item.id !== action.payload)
    },
    updateQuantity(
      state,
      action: {
        payload: {
          id: number
          quantity: number
        }
      },
    ) {
      const item = state.items.find((entry) => entry.id === action.payload.id)

      if (!item) {
        return
      }

      if (action.payload.quantity <= 0) {
        state.items = state.items.filter((entry) => entry.id !== action.payload.id)
        return
      }

      item.quantity = Math.min(action.payload.quantity, item.inventory)
    },
    clearCart(state) {
      state.items = []
      state.submission = null
      state.submitStatus = 'idle'
      state.error = null
    },
    resetCartStatus(state) {
      state.submitStatus = 'idle'
      state.error = null
      state.submission = null
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(submitCart.pending, (state) => {
        state.submitStatus = 'loading'
        state.error = null
      })
      .addCase(submitCart.fulfilled, (state, action) => {
        state.submitStatus = 'succeeded'
        state.submission = action.payload
        state.items = []
      })
      .addCase(submitCart.rejected, (state, action) => {
        state.submitStatus = 'failed'
        state.error = (action.payload as string) ?? '目前無法完成結帳。'
      })
  },
})

export const {
  addToCart,
  clearCart,
  removeFromCart,
  resetCartStatus,
  updateQuantity,
} = cartSlice.actions

export default cartSlice.reducer
