import { useForm } from 'react-hook-form'
import { Navigate } from 'react-router-dom'
import { OrderSummary } from '../components/OrderSummary'
import { submitCart } from '../slices/cartSlice'
import { addPurchasedOrder } from '../slices/orderSlice'
import { useAppDispatch, useAppSelector } from '../store/hooks'
import type { CheckoutFormValues } from '../types'

function CheckoutPage() {
  const dispatch = useAppDispatch()
  const { items, submitStatus, error, submission } = useAppSelector((state) => state.cart)
  const user = useAppSelector((state) => state.auth.user)
  const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0)
  const total = subtotal + (items.length > 0 ? 12 : 0) + subtotal * 0.08

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<CheckoutFormValues>({
    defaultValues: {
      firstName: '',
      lastName: '',
      email: '',
      address: '',
      city: '',
      postalCode: '',
      notes: '',
    },
  })

  if (items.length === 0 && submitStatus !== 'succeeded') {
    return <Navigate replace to="/cart" />
  }

  const onSubmit = async (values: CheckoutFormValues) => {
    const purchasedItems = items.map((item) => ({ ...item }))
    const result = await dispatch(
      submitCart({
        customer: values,
        items: items.map((item) => ({ productId: item.id, quantity: item.quantity })),
        total,
      }),
    )

    if (submitCart.fulfilled.match(result)) {
      dispatch(
        addPurchasedOrder({
          customer: values,
          items: purchasedItems,
          submission: result.payload,
          userEmail: user?.email ?? values.email,
        }),
      )
      reset()
    }
  }

  return (
    <div className="checkout-layout">
      <section className="checkout-form">
        <div className="section-heading">
          <h1>結帳資訊</h1>
          <p className="section-copy">填寫收件資料後，即可完成耳機商品訂單送出。</p>
        </div>

        {submitStatus === 'succeeded' && submission ? (
          <div className="status-card">
            <strong>{submission.message}</strong>
            <span className="muted">
              訂單編號：{submission.orderId} · 訂單金額：${submission.total.toFixed(2)}
            </span>
          </div>
        ) : null}

        <form className="section-stack" onSubmit={(event) => void handleSubmit(onSubmit)(event)}>
          <div className="field-grid">
            <div className="field">
              <label htmlFor="firstName">名字</label>
              <input
                id="firstName"
                {...register('firstName', { required: '請填寫名字。' })}
              />
              {errors.firstName ? <span className="error-text">{errors.firstName.message}</span> : null}
            </div>

            <div className="field">
              <label htmlFor="lastName">姓氏</label>
              <input
                id="lastName"
                {...register('lastName', { required: '請填寫姓氏。' })}
              />
              {errors.lastName ? <span className="error-text">{errors.lastName.message}</span> : null}
            </div>

            <div className="field full">
              <label htmlFor="email">Email</label>
              <input
                id="email"
                type="email"
                {...register('email', {
                  required: '請填寫 Email。',
                  pattern: {
                    value: /^\S+@\S+\.\S+$/,
                    message: '請輸入正確的 Email 格式。',
                  },
                })}
              />
              {errors.email ? <span className="error-text">{errors.email.message}</span> : null}
            </div>

            <div className="field full">
              <label htmlFor="address">收件地址</label>
              <input
                id="address"
                {...register('address', { required: '請填寫收件地址。' })}
              />
              {errors.address ? <span className="error-text">{errors.address.message}</span> : null}
            </div>

            <div className="field">
              <label htmlFor="city">城市</label>
              <input id="city" {...register('city', { required: '請填寫城市。' })} />
              {errors.city ? <span className="error-text">{errors.city.message}</span> : null}
            </div>

            <div className="field">
              <label htmlFor="postalCode">郵遞區號</label>
              <input
                id="postalCode"
                {...register('postalCode', { required: '請填寫郵遞區號。' })}
              />
              {errors.postalCode ? <span className="error-text">{errors.postalCode.message}</span> : null}
            </div>

            <div className="field full">
              <label htmlFor="notes">備註</label>
              <textarea id="notes" rows={4} {...register('notes')} />
            </div>
          </div>

          {submitStatus === 'failed' && error ? <span className="error-text">{error}</span> : null}

          <button className="button" disabled={submitStatus === 'loading'} type="submit">
            {submitStatus === 'loading' ? '送出訂單中...' : '送出訂單'}
          </button>
        </form>
      </section>

      <OrderSummary />
    </div>
  )
}

export default CheckoutPage
