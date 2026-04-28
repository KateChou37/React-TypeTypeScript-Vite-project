// Redux product slice，管理商品列表與商品詳情的非同步載入狀態。
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { productApi } from '../api/productApi'
import type { AsyncStatus, Product } from '../types'

interface ProductState {
  items: Product[]
  currentProduct: Product | null
  productsStatus: AsyncStatus
  productDetailStatus: AsyncStatus
  error: string | null
}

const initialState: ProductState = {
  items: [],
  currentProduct: null,
  productsStatus: 'idle',
  productDetailStatus: 'idle',
  error: null,
}

// 載入商品列表，列表頁會依這個狀態呈現 loading/error/succeeded。
export const fetchProducts = createAsyncThunk(
  'products/fetchProducts',
  async (_, { rejectWithValue }) => {
    try {
      return await productApi.getProducts()
    } catch {
      return rejectWithValue('目前無法載入耳機商品，請稍後再試。')
    }
  },
)

// 載入單一商品詳情，詳情頁依 route id 觸發。
export const fetchProductById = createAsyncThunk(
  'products/fetchProductById',
  async (id: number, { rejectWithValue }) => {
    try {
      return await productApi.getProductById(id)
    } catch {
      return rejectWithValue('目前無法載入這款耳機商品。')
    }
  },
)

const productSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    clearCurrentProduct(state) {
      state.currentProduct = null
      state.productDetailStatus = 'idle'
      state.error = null
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.productsStatus = 'loading'
        state.error = null
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.productsStatus = 'succeeded'
        state.items = action.payload
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.productsStatus = 'failed'
        state.error = (action.payload as string) ?? '目前無法載入耳機商品。'
      })
      .addCase(fetchProductById.pending, (state) => {
        state.productDetailStatus = 'loading'
        state.error = null
      })
      .addCase(fetchProductById.fulfilled, (state, action) => {
        state.productDetailStatus = 'succeeded'
        state.currentProduct = action.payload
      })
      .addCase(fetchProductById.rejected, (state, action) => {
        state.productDetailStatus = 'failed'
        state.error = (action.payload as string) ?? '目前無法載入耳機商品詳情。'
      })
  },
})

export const { clearCurrentProduct } = productSlice.actions
export default productSlice.reducer
