import type { InputHTMLAttributes } from 'react'

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string
  helperText?: string
  error?: string
}

export function Input({ id, label, helperText, error, className = '', ...props }: InputProps) {
  const classes = ['ui-input', error ? 'ui-input--error' : '', className].filter(Boolean).join(' ')

  return (
    <div className="field">
      {label ? <label htmlFor={id}>{label}</label> : null}
      <input className={classes} id={id} {...props} />
      {error ? <span className="error-text">{error}</span> : helperText ? <span className="muted">{helperText}</span> : null}
    </div>
  )
}
