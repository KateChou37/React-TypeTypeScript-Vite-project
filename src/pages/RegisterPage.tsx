// 註冊頁，處理會員建立、表單驗證與註冊後導頁。
import { zodResolver } from '@hookform/resolvers/zod'
import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { Link, useNavigate } from 'react-router-dom'
import { z } from 'zod'
import { clearAuthError, registerUser } from '../slices/authSlice'
import { useAppDispatch } from '../store/hooks'
import { useAuth } from '../hooks/useAuth'

const registerSchema = z.object({
  name: z.string().min(2, '姓名至少 2 個字'),
  email: z.email('請輸入有效的 Email'),
  password: z.string().min(6, '密碼至少 6 碼'),
})

type RegisterFormValues = z.infer<typeof registerSchema>

function RegisterPage() {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const { status, error, isAuthenticated } = useAuth()

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormValues>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      name: '',
      email: '',
      password: '',
    },
  })

  useEffect(() => {
    dispatch(clearAuthError())
  }, [dispatch])

  useEffect(() => {
    if (isAuthenticated) {
      void navigate('/dashboard', { replace: true })
    }
  }, [isAuthenticated, navigate])

  const onSubmit = async (values: RegisterFormValues) => {
    const result = await dispatch(registerUser(values))

    if (registerUser.fulfilled.match(result)) {
      void navigate('/dashboard', { replace: true })
    }
  }

  return (
    <section className="auth-shell">
      <div className="auth-card">
        <div className="section-heading">
          <span className="eyebrow">建立會員</span>
          <h1>註冊新帳號</h1>
          <p className="section-copy">建立帳號後即可進入會員中心，登入狀態也會持久保存。</p>
        </div>

        <form className="section-stack" onSubmit={(event) => void handleSubmit(onSubmit)(event)}>
          <div className="field">
            <label htmlFor="registerName">姓名</label>
            <input id="registerName" {...register('name')} />
            {errors.name ? <span className="error-text">{errors.name.message}</span> : null}
          </div>

          <div className="field">
            <label htmlFor="registerEmail">Email</label>
            <input id="registerEmail" type="email" {...register('email')} />
            {errors.email ? <span className="error-text">{errors.email.message}</span> : null}
          </div>

          <div className="field">
            <label htmlFor="registerPassword">密碼</label>
            <input id="registerPassword" type="password" {...register('password')} />
            {errors.password ? <span className="error-text">{errors.password.message}</span> : null}
          </div>

          {error ? <span className="error-text">{error}</span> : null}

          <button className="button w-100" disabled={status === 'loading'} type="submit">
            {status === 'loading' ? '註冊中...' : '建立帳號'}
          </button>
        </form>

        <p className="auth-helper">
          已經有帳號？
          <Link to="/login"> 前往登入</Link>
        </p>
      </div>
    </section>
  )
}

export default RegisterPage
