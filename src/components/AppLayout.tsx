import { PageTransition } from './PageTransition'
import { Outlet } from 'react-router-dom'
import { Header } from './Header'

export function AppLayout() {
  return (
    <div className="app-shell">
      <Header />
      <main className="page">
        <div className="container">
          <PageTransition>
            <Outlet />
          </PageTransition>
          <p className="footer-note">
            Copyright © 2026 Kate Chou 專注聲音體驗的耳機選品商城，整合會員、購物車、結帳與商品瀏覽流程，此為sideproject，僅展示部分功能與頁面。
          </p>
        </div>
      </main>
    </div>
  )
}
