import { Link } from 'react-router-dom'
import { EmptyState } from '../components/EmptyState'
import { OrderSummary } from '../components/OrderSummary'
import { removeFromCart, updateQuantity } from '../slices/cartSlice'
import { useAppDispatch, useAppSelector } from '../store/hooks'

function CartPage() {
  const dispatch = useAppDispatch()
  const items = useAppSelector((state) => state.cart.items)

  if (items.length === 0) {
    return (
      <EmptyState
        title="購物車目前是空的"
        description="先挑幾款喜歡的耳機加入購物車，再比較音色、配戴感與價格。"
        ctaLabel="前往選購耳機"
        ctaTo="/products"
      />
    )
  }

  return (
    <div className="cart-layout">
      <section className="cart-card">
        <div className="section-heading">
          <h1>購物車</h1>
          <p className="section-copy">這些商品目前在等待結帳，送出訂單後會移到會員中心的已購買列表。</p>
        </div>

        <div className="section-stack">
          {items.map((item) => (
            <article className="cart-item" key={item.id}>
              <div className="cart-item-main">
                <div className="cart-item-image-wrap">
                  {item.image ? (
                    <img
                      alt={item.title}
                      className="cart-item-image"
                      decoding="async"
                      loading="lazy"
                      src={item.image}
                    />
                  ) : (
                    <div className="cart-item-image-placeholder" aria-hidden="true">
                      <i className="bi bi-headphones" />
                    </div>
                  )}
                </div>

                <div className="cart-item-content">
                  <div className="cart-item-top">
                    <div>
                      <h2>{item.title}</h2>
                      <p className="muted">{item.category}</p>
                    </div>
                    <strong>${(item.price * item.quantity).toFixed(2)}</strong>
                  </div>

                  <div className="inline-actions">
                    <div className="quantity-controls" aria-label={`Quantity controls for ${item.title}`}>
                      <button
                        className="icon-button"
                        onClick={() =>
                          dispatch(updateQuantity({ id: item.id, quantity: item.quantity - 1 }))
                        }
                        type="button"
                      >
                        -
                      </button>
                      <strong>{item.quantity}</strong>
                      <button
                        className="icon-button"
                        onClick={() =>
                          dispatch(updateQuantity({ id: item.id, quantity: item.quantity + 1 }))
                        }
                        type="button"
                      >
                        +
                      </button>
                    </div>

                    <button
                      className="button-danger"
                      onClick={() => dispatch(removeFromCart(item.id))}
                      type="button"
                    >
                      移除
                    </button>
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      <div className="section-stack">
        <OrderSummary />
        <Link className="button" to="/checkout">
          前往結帳
        </Link>
      </div>
    </div>
  )
}

export default CartPage
