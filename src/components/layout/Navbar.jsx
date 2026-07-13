import { useState, useEffect, useRef } from 'react'
import { Link, useLocation } from 'react-router-dom'

const NAV_LINKS = [
  { path: '/', label: 'Home' },
  { path: '/map', label: 'Live Map' },
  { path: '/leaderboard', label: 'Leaderboard' },
  { path: '/ecosystem', label: 'Ecosystem' },
  { path: '/impact', label: 'Impact' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [hidden, setHidden] = useState(false)
  const [open, setOpen] = useState(false)
  const lastScrollY = useRef(0)
  const location = useLocation()

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY
      setScrolled(y > 40)

      if (y < 80) {
        setHidden(false)
      } else if (y > lastScrollY.current) {
        setHidden(true)
      } else {
        setHidden(false)
      }

      lastScrollY.current = y
    }

    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => setOpen(false), [location])

  return (
    <nav
      className={`navbar-smart ${hidden ? 'navbar-smart--hidden' : ''}`}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 50,
        paddingTop: scrolled ? 12 : 20,
        paddingBottom: scrolled ? 12 : 20,
        background: scrolled
          ? 'rgba(11, 31, 46, 0.95)'
          : 'linear-gradient(180deg, rgba(11,31,46,0.9) 0%, transparent 100%)',
        backdropFilter: scrolled ? 'blur(20px)' : 'none',
        borderBottom: scrolled ? '1px solid rgba(255,255,255,0.06)' : 'none',
      }}
    >
      <div className="navbar-inner">
        <Link
          to="/"
          style={{ display: 'flex', alignItems: 'center', gap: 12, textDecoration: 'none', flexShrink: 0 }}
        >
          <div
            style={{
              width: 36,
              height: 36,
              borderRadius: 12,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontWeight: 900,
              color: '#fff',
              fontSize: 14,
              background: 'linear-gradient(135deg, #0A7C6E, #1A4B7A)',
            }}
          >
            S
          </div>
          <div>
            <span style={{ fontWeight: 700, fontSize: 18, letterSpacing: '0.02em', color: '#fff' }}>
              Sukutera
            </span>
            <div className="navbar-brand-sub">Lake Kivu, Rwanda</div>
          </div>
        </Link>

        <div className="navbar-links">
          {NAV_LINKS.map(({ path, label }) => {
            const active = location.pathname === path
            return (
              <Link
                key={path}
                to={path}
                className="nav-link"
                style={{
                  color: active ? '#F5E6C8' : 'rgba(255,255,255,0.65)',
                  background: active ? 'rgba(10,124,110,0.18)' : 'transparent',
                }}
                onMouseEnter={(e) => {
                  if (!active) e.currentTarget.style.color = '#fff'
                }}
                onMouseLeave={(e) => {
                  if (!active) e.currentTarget.style.color = 'rgba(255,255,255,0.65)'
                }}
              >
                {label}
              </Link>
            )
          })}
        </div>

        <div className="navbar-cta-wrap">
          <Link to="/log" className="nav-cta-btn">
            + Log Collection
          </Link>
        </div>

        <button
          type="button"
          onClick={() => setOpen(!open)}
          aria-label="Menu"
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: 6,
            padding: 8,
            background: 'transparent',
            border: 'none',
            cursor: 'pointer',
          }}
          className="navbar-mobile-toggle"
        >
          <span
            style={{
              display: 'block',
              width: 24,
              height: 2,
              background: 'rgba(255,255,255,0.8)',
              transition: 'all 0.2s',
              transform: open ? 'rotate(45deg) translate(5px, 5px)' : 'none',
            }}
          />
          <span
            style={{
              display: 'block',
              width: 24,
              height: 2,
              background: 'rgba(255,255,255,0.8)',
              transition: 'all 0.2s',
              opacity: open ? 0 : 1,
            }}
          />
          <span
            style={{
              display: 'block',
              width: 24,
              height: 2,
              background: 'rgba(255,255,255,0.8)',
              transition: 'all 0.2s',
              transform: open ? 'rotate(-45deg) translate(5px, -5px)' : 'none',
            }}
          />
        </button>
      </div>

      {open && (
        <div
          style={{
            marginTop: 8,
            marginLeft: 16,
            marginRight: 16,
            borderRadius: 16,
            padding: 16,
            display: 'flex',
            flexDirection: 'column',
            gap: 4,
            background: 'rgba(15,42,61,0.97)',
            border: '1px solid rgba(255,255,255,0.08)',
          }}
          className="navbar-mobile-menu"
        >
          {NAV_LINKS.map(({ path, label }) => (
            <Link
              key={path}
              to={path}
              style={{
                padding: '12px 16px',
                borderRadius: 12,
                fontSize: 14,
                fontWeight: 500,
                textDecoration: 'none',
                color: location.pathname === path ? '#F5E6C8' : 'rgba(255,255,255,0.7)',
                background: location.pathname === path ? 'rgba(10,124,110,0.15)' : 'transparent',
              }}
            >
              {label}
            </Link>
          ))}
          <Link
            to="/log"
            style={{
              marginTop: 8,
              padding: '12px 16px',
              borderRadius: 12,
              fontSize: 14,
              fontWeight: 600,
              textAlign: 'center',
              color: '#fff',
              textDecoration: 'none',
              background: 'linear-gradient(135deg, #0A7C6E, #0d9e8e)',
            }}
          >
            + Log Collection
          </Link>
        </div>
      )}
    </nav>
  )
}
