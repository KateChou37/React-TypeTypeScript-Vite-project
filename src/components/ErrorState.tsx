// 共用錯誤狀態元件，提供訊息與可選的重試動作。
interface ErrorStateProps {
  message: string
  actionLabel?: string
  onAction?: () => void
}

export function ErrorState({ message, actionLabel = '重新嘗試', onAction }: ErrorStateProps) {
  return (
    <div className="status-card" role="alert">
      <strong>發生了一點問題。</strong>
      <span className="muted">{message}</span>
      {onAction ? (
        <button className="button-secondary" onClick={onAction} type="button">
          {actionLabel}
        </button>
      ) : null}
    </div>
  )
}
