// Redux auth slice，管理登入、註冊與登出狀態。
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { authApi } from '../api/authApi'
import { clearAuthSession, getAuthSession, saveAuthSession } from '../api/authStorage'
import type { AsyncStatus, AuthUser, LoginPayload, RegisterPayload } from '../types'

interface AuthState {
  user: AuthUser | null
  token: string | null
  status: AsyncStatus
  error: string | null
  isAuthenticated: boolean
}

const persistedSession = getAuthSession()

const initialState: AuthState = {
  user: persistedSession?.user ?? null,
  token: persistedSession?.token ?? null,
  status: 'idle',
  error: null,
  isAuthenticated: Boolean(persistedSession?.token),
}

// 登入 thunk：把 API 錯誤轉成 UI 可顯示的訊息。
export const loginUser = createAsyncThunk(
  'auth/loginUser',
  async (payload: LoginPayload, { rejectWithValue }) => {
    try {
      return await authApi.login(payload)
    } catch {
      return rejectWithValue('Email 或密碼錯誤。')
    }
  },
)

// 註冊 thunk：建立會員後直接回傳 token 與使用者資料。
export const registerUser = createAsyncThunk(
  'auth/registerUser',
  async (payload: RegisterPayload, { rejectWithValue }) => {
    try {
      return await authApi.register(payload)
    } catch {
      return rejectWithValue('註冊失敗，這個 Email 可能已被使用。')
    }
  },
)

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout(state) {
      state.user = null
      state.token = null
      state.status = 'idle'
      state.error = null
      state.isAuthenticated = false
      clearAuthSession()
    },
    clearAuthError(state) {
      state.error = null
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.status = 'loading'
        state.error = null
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.status = 'succeeded'
        state.user = action.payload.user
        state.token = action.payload.token
        state.isAuthenticated = true
        saveAuthSession(action.payload)
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.status = 'failed'
        state.error = (action.payload as string) ?? '登入失敗。'
      })
      .addCase(registerUser.pending, (state) => {
        state.status = 'loading'
        state.error = null
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.status = 'succeeded'
        state.user = action.payload.user
        state.token = action.payload.token
        state.isAuthenticated = true
        saveAuthSession(action.payload)
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.status = 'failed'
        state.error = (action.payload as string) ?? '註冊失敗。'
      })
  },
})

export const { clearAuthError, logout } = authSlice.actions
export default authSlice.reducer
