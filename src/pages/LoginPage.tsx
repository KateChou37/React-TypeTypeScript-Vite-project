// 登入頁，處理表單驗證、登入請求與導回來源頁。
import { zodResolver } from '@hookform/resolvers/zod'
import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { z } from 'zod'
import { Button } from '../components/ui/Button'
import { Input } from '../components/ui/Input'
import { clearAuthError, loginUser } from '../slices/authSlice'
import { useAppDispatch } from '../store/hooks'
import { useAuth } from '../hooks/useAuth'

const loginSchema = z.object({
  email: z.email('請輸入有效的 Email'),
  password: z.string().min(6, '密碼至少 6 碼'),
})

type LoginFormValues = z.infer<typeof loginSchema>

function LoginPage() {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const location = useLocation()
  const { status, error, isAuthenticated } = useAuth()

  const from = (location.state as { from?: { pathname?: string } } | null)?.from?.pathname ?? '/dashboard'

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  })

  useEffect(() => {
    dispatch(clearAuthError())
  }, [dispatch])

  useEffect(() => {
    if (isAuthenticated) {
      void navigate(from, { replace: true })
    }
  }, [from, isAuthenticated, navigate])

  const onSubmit = async (values: LoginFormValues) => {
    const result = await dispatch(loginUser(values))

    if (loginUser.fulfilled.match(result)) {
      void navigate(from, { replace: true })
    }
  }

  return (
    <section className="auth-shell esports-login-shell">
      <div className="auth-card esports-login-card ui-card u-grid-overlay">
        <div className="esports-login-card__side">
          <span className="ui-badge ui-badge--secondary">Member Access</span>
          <h1 className="esports-login-card__title">登入</h1>
          <p className="section-copy">
            進入你的 SoundNest 會員中心，查看訂單、收藏耳機裝備，並接收最新電競音訊裝備更新。
          </p>
          <div className="esports-login-card__stats">
            <div className="esports-login-stat">
              <span>低延遲模式</span>
              <strong>24 ms</strong>
            </div>
            <div className="esports-login-stat">
              <span>玩家推薦</span>
              <strong>9.4 / 10</strong>
            </div>
          </div>
        </div>

        <div className="esports-login-card__form">
          <div className="section-heading">
            <span className="eyebrow">會員登入</span>
            <h2 className="section-title">輸入帳號密碼</h2>
            <p className="section-copy">輸入已註冊的帳號密碼，登入後即可進入會員中心。</p>
          </div>

          <form className="section-stack" onSubmit={(event) => void handleSubmit(onSubmit)(event)}>
            <Input
              id="loginEmail"
              label="Email"
              placeholder="輸入你的 Email"
              type="email"
              error={errors.email?.message}
              {...register('email')}
            />

            <Input
              id="loginPassword"
              label="密碼"
              placeholder="輸入你的密碼"
              type="password"
              error={errors.password?.message}
              {...register('password')}
            />

            {error ? <span className="error-text">{error}</span> : null}

            <Button className="w-100" disabled={status === 'loading'} type="submit">
              {status === 'loading' ? '登入中...' : '立即登入'}
            </Button>
          </form>

          <p className="auth-helper">
            還沒有帳號？
            <Link to="/register"> 建立新帳號</Link>
          </p>
        </div>
      </div>
    </section>
  )
}

export default LoginPage
