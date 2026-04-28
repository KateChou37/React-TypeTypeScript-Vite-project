// 共用空狀態元件，用於沒有資料或購物車為空的畫面。
import { Link } from 'react-router-dom'

interface EmptyStateProps {
  title: string
  description: string
  ctaLabel?: string
  ctaTo?: string
}

export function EmptyState({ title, description, ctaLabel, ctaTo }: EmptyStateProps) {
  return (
    <div className="empty-state">
      <h2>{title}</h2>
      <p className="muted">{description}</p>
      {ctaLabel && ctaTo ? (
        <div className="inline-actions">
          <Link className="button" to={ctaTo}>
            {ctaLabel}
          </Link>
        </div>
      ) : null}
    </div>
  )
}
