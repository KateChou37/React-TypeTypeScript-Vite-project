// 應用程式路由表，集中配置公開頁、會員頁與登入限制。
import { AnimatePresence } from 'framer-motion'
import { lazy, Suspense } from 'react'
import { Navigate, Route, Routes, useLocation } from 'react-router-dom'
import { AppLayout } from '../components/AppLayout'
import { GuestRoute } from '../components/GuestRoute'
import { LoadingState } from '../components/LoadingState'
import { ProtectedRoute } from '../components/ProtectedRoute'

const HomePage = lazy(() => import('../pages/HomePage'))
const ProductsPage = lazy(() => import('../pages/ProductsPage'))
const ProductDetailPage = lazy(() => import('../pages/ProductDetailPage'))
const CartPage = lazy(() => import('../pages/CartPage'))
const CheckoutPage = lazy(() => import('../pages/CheckoutPage'))
const AboutPage = lazy(() => import('../pages/AboutPage'))
const LoginPage = lazy(() => import('../pages/LoginPage'))
const RegisterPage = lazy(() => import('../pages/RegisterPage'))
const DashboardPage = lazy(() => import('../pages/DashboardPage'))
const UIShowcasePage = lazy(() => import('../pages/UIShowcase'))

export function AppRouter() {
  const location = useLocation()

  return (
    <Suspense fallback={<LoadingState title="頁面載入中" description="正在準備下一個頁面。" />}>
      <AnimatePresence mode="wait">
        <Routes key={location.pathname} location={location}>
          <Route element={<AppLayout />}>
            <Route index element={<HomePage />} />
            <Route path="about" element={<AboutPage />} />
            <Route path="ui" element={<UIShowcasePage />} />
            <Route path="products" element={<ProductsPage />} />
            <Route path="products/:id" element={<ProductDetailPage />} />
            <Route path="cart" element={<CartPage />} />
            <Route path="checkout" element={<CheckoutPage />} />
            <Route element={<GuestRoute />}>
              <Route path="login" element={<LoginPage />} />
              <Route path="register" element={<RegisterPage />} />
            </Route>
            <Route element={<ProtectedRoute />}>
              <Route path="dashboard" element={<DashboardPage />} />
            </Route>
            <Route path="*" element={<Navigate replace to="/" />} />
          </Route>
        </Routes>
      </AnimatePresence>
    </Suspense>
  )
}
