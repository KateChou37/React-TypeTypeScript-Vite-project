import type { HTMLAttributes, PropsWithChildren } from 'react'

type BadgeVariant = 'primary' | 'secondary' | 'accent'

interface BadgeProps extends HTMLAttributes<HTMLSpanElement>, PropsWithChildren {
  variant?: BadgeVariant
}

export function Badge({
  variant = 'primary',
  className = '',
  children,
  ...props
}: BadgeProps) {
  const classes = [
    'ui-badge',
    variant !== 'primary' ? `ui-badge--${variant}` : '',
    className,
  ]
    .filter(Boolean)
    .join(' ')

  return (
    <span className={classes} {...props}>
      {children}
    </span>
  )
}
