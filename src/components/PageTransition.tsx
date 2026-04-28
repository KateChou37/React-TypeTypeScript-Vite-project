// 頁面轉場包裝元件，讓 route 切換時套用一致動畫。
import { motion } from 'framer-motion'
import type { PropsWithChildren } from 'react'
import { useLocation } from 'react-router-dom'

export function PageTransition({ children }: PropsWithChildren) {
  const location = useLocation()

  return (
    <motion.div
      animate={{ opacity: 1, y: 0 }}
      initial={{ opacity: 0, y: 18 }}
      key={location.pathname}
      transition={{ duration: 0.24, ease: 'easeOut' }}
    >
      {children}
    </motion.div>
  )
}
