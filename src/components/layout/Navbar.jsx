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
      if (y < 80) setHidden(false)
      else if (y > lastScrollY.current) setHidden(true)
      else setHidden(false)
      lastScrollY.current = y
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => setOpen(false), [location])

  return (
    <nav
      className={`navbar-smart fixed top-0 left-0 right-0 z-50 ${hidden ? 'navbar-smart--hidden' : ''} ${scrolled ? 'py-3' : 'py-5'}`}
      style={{
        fontFamily: 'var(--font-sans)',
        background: scrolled
          ? 'rgba(7, 17, 26, 0.96)'
          : 'linear-gradient(180deg, rgba(7,17,26,0.85) 0%, transparent 100%)',
        backdropFilter: scrolled ? 'blur(16px)' : 'none',
        borderBottom: scrolled ? '1px solid rgba(238,228,202,0.06)' : 'none',
      }}
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        {/* Wordmark — Fraunces italic logotype */}
        <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: 10, textDecoration: 'none' }}>
          <div
            style={{
              width: 34,
              height: 34,
              borderRadius: 8,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontFamily: 'var(--font-display)',
              fontStyle: 'italic',
              fontWeight: 800,
              fontSize: 18,
              color: '#fff',
              background: 'var(--color-kivu)',
              flexShrink: 0,
            }}
          >
            S
          </div>
          <div>
            <span
              style={{
                fontFamily: 'var(--font-display)',
                fontStyle: 'italic',
                fontWeight: 700,
                fontSize: 18,
                letterSpacing: '-0.02em',
                color: 'var(--color-parchment)',
                lineHeight: 1,
              }}
            >
              Sukutera
            </span>
            <div
              style={{
                fontFamily: 'var(--font-sans)',
                fontSize: 9,
                letterSpacing: '0.12em',
                textTransform: 'uppercase',
                color: 'var(--color-muted)',
                lineHeight: 1,
                marginTop: 2,
              }}
            >
              Lake Kivu, Rwanda
            </div>
          </div>
        </Link>

        {/* Desktop nav links */}
        <div className="hidden md:flex items-center gap-0">
          {NAV_LINKS.map(({ path, label }) => {
            const active = location.pathname === path
            return (
              <Link
                key={path}
                to={path}
                style={{
                  fontFamily: 'var(--font-sans)',
                  padding: '6px 14px',
                  fontSize: 13,
                  fontWeight: active ? 600 : 400,
                  letterSpacing: '0.02em',
                  color: active ? 'var(--color-parchment)' : 'var(--color-stone)',
                  textDecoration: 'none',
                  borderBottom: active ? '1px solid var(--color-kivu)' : '1px solid transparent',
                  paddingBottom: 5,
                  transition: 'color 0.15s ease, border-color 0.15s ease',
                }}
                onMouseEnter={(e) => {
                  if (!active) e.currentTarget.style.color = 'var(--color-parchment)'
                }}
                onMouseLeave={(e) => {
                  if (!active) e.currentTarget.style.color = 'var(--color-stone)'
                }}
              >
                {label}
              </Link>
            )
          })}
        </div>

        {/* CTA */}
        <div className="hidden md:flex">
          <Link
            to="/log"
            style={{
              fontFamily: 'var(--font-sans)',
              padding: '8px 20px',
              borderRadius: 6,
              background: 'var(--color-kivu)',
              color: '#fff',
              fontSize: 13,
              fontWeight: 600,
              letterSpacing: '0.04em',
              textDecoration: 'none',
            }}
          >
            + Log Collection
          </Link>
        </div>

        {/* Mobile hamburger */}
        <button
          className="md:hidden flex flex-col gap-1.5 p-2"
          onClick={() => setOpen(!open)}
          aria-label="Menu"
        >
          {[0, 1, 2].map((i) => (
            <span
              key={i}
              className="block w-5 h-px transition-all duration-200"
              style={{
                background: 'var(--color-stone)',
                transform:
                  i === 0 && open ? 'rotate(45deg) translate(4px, 4px)'
                  : i === 2 && open ? 'rotate(-45deg) translate(4px, -4px)'
                  : 'none',
                opacity: i === 1 && open ? 0 : 1,
              }}
            />
          ))}
        </button>
      </div>

      {/* Mobile drawer */}
      {open && (
        <div
          className="md:hidden mt-2 mx-4 rounded-xl p-4 flex flex-col gap-1"
          style={{
            background: 'rgba(7,17,26,0.98)',
            border: '1px solid rgba(238,228,202,0.08)',
            fontFamily: 'var(--font-sans)',
          }}
        >
          {NAV_LINKS.map(({ path, label }) => (
            <Link
              key={path}
              to={path}
              style={{
                padding: '11px 14px',
                fontSize: 14,
                fontWeight: location.pathname === path ? 600 : 400,
                color: location.pathname === path ? 'var(--color-parchment)' : 'var(--color-stone)',
                textDecoration: 'none',
                borderLeft: location.pathname === path ? '2px solid var(--color-kivu)' : '2px solid transparent',
                paddingLeft: 14,
              }}
            >
              {label}
            </Link>
          ))}
          <Link
            to="/log"
            style={{
              marginTop: 8,
              padding: '11px 14px',
              borderRadius: 6,
              background: 'var(--color-kivu)',
              color: '#fff',
              fontSize: 14,
              fontWeight: 600,
              textAlign: 'center',
              textDecoration: 'none',
            }}
          >
            + Log Collection
          </Link>
        </div>
      )}
    </nav>
  )
}
