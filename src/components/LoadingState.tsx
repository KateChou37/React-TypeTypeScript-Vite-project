// 共用載入狀態元件，統一呈現等待中的畫面。
interface LoadingStateProps {
  title?: string
  description?: string
}

export function LoadingState({
  title = '資料載入中',
  description = '請稍候，我們正在整理畫面內容。',
}: LoadingStateProps) {
  return (
    <div className="status-card" role="status" aria-live="polite">
      <div className="spinner" />
      <strong>{title}</strong>
      <span className="muted">{description}</span>
    </div>
  )
}
