// 基礎 Button 元件，統一按鈕尺寸與視覺變體。
import { motion } from 'framer-motion'
import type { HTMLMotionProps } from 'framer-motion'
import type { PropsWithChildren } from 'react'

type ButtonVariant = 'primary' | 'secondary' | 'ghost' | 'neon'

interface ButtonProps extends Omit<HTMLMotionProps<'button'>, 'children'>, PropsWithChildren {
  variant?: ButtonVariant
}

export function Button({
  variant = 'primary',
  className = '',
  type = 'button',
  children,
  ...props
}: ButtonProps) {
  const classes = ['ui-button', `ui-button--${variant}`, className].filter(Boolean).join(' ')

  return (
    <motion.button
      className={classes}
      type={type}
      transition={{ duration: 0.16, ease: 'easeOut' }}
      whileHover={props.disabled ? undefined : { scale: 1.01, y: -1 }}
      whileTap={props.disabled ? undefined : { scale: 0.985, y: 1 }}
      {...props}
    >
      {children}
    </motion.button>
  )
}
