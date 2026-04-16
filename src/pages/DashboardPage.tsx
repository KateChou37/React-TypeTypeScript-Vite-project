import { useNavigate } from 'react-router-dom'
import { logout } from '../slices/authSlice'
import { useAppDispatch, useAppSelector } from '../store/hooks'
import { useAuth } from '../hooks/useAuth'

function DashboardPage() {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const { user, token } = useAuth()
  const purchasedOrders = useAppSelector((state) =>
    state.orders.items.filter((order) => order.userEmail === user?.email),
  )

  const handleLogout = () => {
    dispatch(logout())
    void navigate('/login', { replace: true })
  }

  return (
    <section className="dashboard-shell">
      <div className="dashboard-grid">
        <div className="dashboard-card">
          <div className="section-heading">
            <span className="eyebrow">會員中心</span>
            <h1>我的帳戶</h1>
            <p className="section-copy">這個頁面只有登入後才可以進入，可查看目前登入資訊。</p>
          </div>

          <div className="summary-list">
            <div className="dashboard-info-row">
              <span>姓名</span>
              <strong>{user?.name}</strong>
            </div>
            <div className="dashboard-info-row">
              <span>Email</span>
              <strong>{user?.email}</strong>
            </div>
            <div className="dashboard-info-row">
              <span>JWT Token</span>
              <strong className="dashboard-token">{token}</strong>
            </div>
          </div>

          <div className="inline-actions">
            <button className="button-danger" onClick={handleLogout} type="button">
              登出
            </button>
          </div>
        </div>

        <section className="dashboard-card dashboard-orders">
          <div className="section-heading dashboard-orders-heading">
            <span className="eyebrow mb-0">購買紀錄</span>
            <h2>已購買列表</h2>
            <p className="section-copy">結帳完成後的訂單會顯示在這裡。</p>
          </div>

          {purchasedOrders.length > 0 ? (
            <div className="dashboard-order-list">
              {purchasedOrders.map((order) => (
                <article className="dashboard-order" key={order.orderId}>
                  <div className="dashboard-order__header">
                    <div>
                      <strong>訂單編號：{order.orderId}</strong>
                      <span className="muted">
                        {new Intl.DateTimeFormat('zh-TW', {
                          dateStyle: 'medium',
                          timeStyle: 'short',
                        }).format(new Date(order.purchasedAt))}
                      </span>
                    </div>
                    <strong>${order.total.toFixed(2)}</strong>
                  </div>

                  <div className="dashboard-order__items">
                    {order.items.map((item) => (
                      <div className="dashboard-order-product" key={`${order.orderId}-${item.id}`}>
                        <div className="dashboard-order-product__image-wrap">
                          {item.image ? (
                            <img
                              alt={item.title}
                              className="dashboard-order-product__image"
                              src={item.image}
                            />
                          ) : (
                            <i className="bi bi-headphones" aria-hidden="true" />
                          )}
                        </div>
                        <div>
                          <strong>{item.title}</strong>
                          <span className="muted">
                            {item.category} · 數量 {item.quantity}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </article>
              ))}
            </div>
          ) : (
            <div className="empty-state">
              <h2>目前沒有已購買訂單</h2>
              <p className="muted">完成結帳後，訂單會自動加入這個清單。</p>
            </div>
          )}
        </section>
      </div>
    </section>
  )
}

export default DashboardPage
