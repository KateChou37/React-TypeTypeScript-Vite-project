// 基礎 Card 元件，提供一致的卡片容器樣式。
import { motion } from 'framer-motion'
import type { HTMLMotionProps } from 'framer-motion'
import type { PropsWithChildren } from 'react'

interface CardProps extends Omit<HTMLMotionProps<'div'>, 'children'>, PropsWithChildren {
  hoverEffect?: boolean
  bodyClassName?: string
}

export function Card({
  className = '',
  bodyClassName = '',
  children,
  hoverEffect = true,
  ...props
}: CardProps) {
  return (
    <motion.div
      className={['ui-card', className].filter(Boolean).join(' ')}
      transition={{ duration: 0.22, ease: 'easeOut' }}
      whileHover={hoverEffect ? { y: -4, boxShadow: 'var(--shadow-panel), var(--glow-primary)' } : undefined}
      {...props}
    >
      <div className={['ui-card__body', bodyClassName].filter(Boolean).join(' ')}>{children}</div>
    </motion.div>
  )
}
