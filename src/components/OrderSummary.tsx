import { useAppSelector } from '../store/hooks'

export function OrderSummary() {
  const items = useAppSelector((state) => state.cart.items)
  const subtotal = items.reduce((total, item) => total + item.price * item.quantity, 0)
  const shipping = items.length > 0 ? 12 : 0
  const tax = subtotal * 0.08
  const total = subtotal + shipping + tax

  return (
    <aside className="summary-card">
      <div className="section-heading">
        <h2>訂單摘要</h2>
        <p className="section-copy">確認耳機商品、運費與稅額後再安心送出訂單。</p>
      </div>

      <ul className="summary-list list-reset">
        <li>
          <span>商品小計</span>
          <strong>${subtotal.toFixed(2)}</strong>
        </li>
        <li>
          <span>運費</span>
          <strong>${shipping.toFixed(2)}</strong>
        </li>
        <li>
          <span>稅額</span>
          <strong>${tax.toFixed(2)}</strong>
        </li>
      </ul>

      <div className="section-stack">
        <span className="muted">總計</span>
        <div className="summary-total">${total.toFixed(2)}</div>
      </div>
    </aside>
  )
}
