// Redux store 設定檔，整合各功能 slice 的 reducer。
import { configureStore } from '@reduxjs/toolkit'
import productReducer from '../slices/productSlice'
import cartReducer from '../slices/cartSlice'
import authReducer from '../slices/authSlice'
import orderReducer from '../slices/orderSlice'

export const store = configureStore({
  reducer: {
    products: productReducer,
    cart: cartReducer,
    auth: authReducer,
    orders: orderReducer,
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
