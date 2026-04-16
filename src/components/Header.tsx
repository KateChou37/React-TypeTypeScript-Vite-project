import { useEffect, useState } from 'react'
import { NavLink, useLocation } from 'react-router-dom'
import { logout } from '../slices/authSlice'
import { useAppDispatch } from '../store/hooks'
import { useAppSelector } from '../store/hooks'

const links = [
  { to: '/', label: '首頁', end: true },
  { to: '/products', label: '耳機選購' },
  { to: '/about', label: '關於我們' },
  { to: '/cart', label: '購物車' },
]

const saleEndTime = new Date('2026-04-30T23:59:59+08:00').getTime()

function getCountdownTime() {
  const remaining = Math.max(saleEndTime - Date.now(), 0)

  return {
    days: Math.floor(remaining / (1000 * 60 * 60 * 24)),
    hours: Math.floor((remaining / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((remaining / (1000 * 60)) % 60),
    seconds: Math.floor((remaining / 1000) % 60),
    isEnded: remaining === 0,
  }
}

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const [countdownTime, setCountdownTime] = useState(getCountdownTime)
  const location = useLocation()
  const dispatch = useAppDispatch()
  const itemCount = useAppSelector((state) =>
    state.cart.items.reduce((total, item) => total + item.quantity, 0),
  )
  const { isAuthenticated, user } = useAppSelector((state) => state.auth)
  const shouldShowSaleCountdown = location.pathname === '/'
  const closeMenu = () => setIsMenuOpen(false)

  useEffect(() => {
    if (!shouldShowSaleCountdown) {
      return undefined
    }

    const timerId = window.setInterval(() => {
      setCountdownTime(getCountdownTime())
    }, 1000)

    return () => window.clearInterval(timerId)
  }, [shouldShowSaleCountdown])

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }

    handleScroll()
    window.addEventListener('scroll', handleScroll)

    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <>
      {shouldShowSaleCountdown ? (
        <div className="header-sale-countdown">
          <div className="container header-sale-countdown__inner">
            <div className="header-sale-countdown__copy">
              <span className="header-sale-countdown__label">7 折優惠</span>
              <strong>
                {countdownTime.isEnded ? '本次耳機優惠已結束' : '耳機全館 7 折優惠倒數'}
              </strong>
            </div>

            <div className="header-sale-countdown__timer" aria-label="耳機 7 折優惠倒數計時">
              {[
                { label: '天', value: countdownTime.days },
                { label: '時', value: countdownTime.hours },
                { label: '分', value: countdownTime.minutes },
                { label: '秒', value: countdownTime.seconds },
              ].map((item) => (
                <span className="header-sale-countdown__unit" key={item.label}>
                  <strong>{item.value.toString().padStart(2, '0')}</strong>
                  <span>{item.label}</span>
                </span>
              ))}
            </div>

            <NavLink className="header-sale-countdown__link" onClick={closeMenu} to="/products">
              立即搶購
            </NavLink>
          </div>
        </div>
      ) : null}

      <header className={`site-header esports-header u-border-cyber${isScrolled ? ' is-scrolled' : ''}`}>
        <div className="container header-inner">
          <div className="brand esports-brand">
            <NavLink className="brand-mark esports-brand-mark" onClick={closeMenu} to="/">
              <img
                alt="SoundNest 耳機館"
                className="esports-brand-mark__logo"
                src="/images/header/logo.png"
              />
            </NavLink>
          </div>

          <button
            aria-controls="primary-navigation"
            aria-expanded={isMenuOpen}
            aria-label={isMenuOpen ? '關閉主選單' : '開啟主選單'}
            className="header-menu-toggle"
            onClick={() => setIsMenuOpen((current) => !current)}
            type="button"
          >
            <i className={`bi ${isMenuOpen ? 'bi-x-lg' : 'bi-list'}`} />
          </button>

          <nav
            className={`nav-links esports-nav${isMenuOpen ? ' is-open' : ''}`}
            id="primary-navigation"
            aria-label="Primary"
          >
            {links.map((link) => (
              <NavLink
                key={link.to}
                className={({ isActive }) => `nav-link esports-nav-link${isActive ? ' active' : ''}`}
                end={link.end}
                onClick={closeMenu}
                to={link.to}
              >
                {link.label}
                {link.to === '/cart' && itemCount > 0 ? (
                  <span className="cart-badge" aria-label={`購物車內有 ${itemCount} 件商品`}>
                    {itemCount}
                  </span>
                ) : null}
              </NavLink>
            ))}

            <NavLink
              aria-label={isAuthenticated ? '會員中心' : '登入'}
              className={({ isActive }) =>
                `nav-link nav-icon-link esports-nav-link esports-nav-link--icon${isActive ? ' active' : ''}`
              }
              onClick={closeMenu}
              to={isAuthenticated ? '/dashboard' : '/login'}
            >
              <i className="bi bi-person-circle" />
              <span className="nav-icon-text">{isAuthenticated ? user?.name ?? '會員中心' : '登入'}</span>
            </NavLink>

            {isAuthenticated ? (
              <button
                className="ui-button ui-button--ghost nav-logout-button"
                onClick={() => {
                  dispatch(logout())
                  closeMenu()
                }}
                type="button"
              >
                登出
              </button>
            ) : null}
          </nav>
        </div>
      </header>
    </>
  )
}
