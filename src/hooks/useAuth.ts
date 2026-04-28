// 封裝登入狀態查詢，讓頁面與路由守衛共用一致的驗證判斷。
import { useAppSelector } from '../store/hooks'

export function useAuth() {
  return useAppSelector((state) => state.auth)
}
