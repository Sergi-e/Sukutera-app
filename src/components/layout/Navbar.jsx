import { useState, useEffect, useRef } from 'react'
import { Link, useLocation } from 'react-router-dom'

const NAV_LINKS = [
  { path: '/',            label: 'Home',        num: '01' },
  { path: '/map',         label: 'Live Map',    num: '02' },
  { path: '/leaderboard', label: 'Leaderboard', num: '03' },
  { path: '/ecosystem',   label: 'Ecosystem',   num: '04' },
  { path: '/impact',      label: 'Impact',      num: '05' },
]

export default function Navbar() {
  const [scrolled, setScrolled]   = useState(false)
  const [hidden, setHidden]       = useState(false)
  const [open, setOpen]           = useState(false)
  const lastScrollY               = useRef(0)
  const location                  = useLocation()

  /* lock body scroll when menu is open */
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [open])

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY
      setScrolled(y > 40)
      if (y < 80)                        setHidden(false)
      else if (y > lastScrollY.current)  setHidden(true)
      else                               setHidden(false)
      lastScrollY.current = y
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => setOpen(false), [location])

  return (
    <>
      {/* ─── Bar ──────────────────────────────────────────────── */}
      <nav
        className={`navbar-smart fixed top-0 left-0 right-0 z-50 ${hidden && !open ? 'navbar-smart--hidden' : ''} ${scrolled ? 'py-3' : 'py-5'}`}
        style={{
          fontFamily: 'var(--font-sans)',
          background: open
            ? 'transparent'
            : scrolled
              ? 'rgba(7,17,26,0.96)'
              : 'linear-gradient(180deg, rgba(7,17,26,0.85) 0%, transparent 100%)',
          backdropFilter: scrolled && !open ? 'blur(16px)' : 'none',
          borderBottom: scrolled && !open ? '1px solid rgba(238,228,202,0.06)' : 'none',
        }}
      >
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between" style={{ position: 'relative', zIndex: 60 }}>

          {/* Wordmark */}
          <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: 10, textDecoration: 'none' }}>
            <div style={{
              width: 34, height: 34, borderRadius: 8,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontFamily: 'var(--font-display)', fontStyle: 'italic',
              fontWeight: 800, fontSize: 18, color: '#fff',
              background: 'var(--color-kivu)', flexShrink: 0,
            }}>S</div>
            <div>
              <span style={{
                fontFamily: 'var(--font-display)', fontStyle: 'italic',
                fontWeight: 700, fontSize: 18, letterSpacing: '-0.02em',
                color: open ? '#fff' : 'var(--color-parchment)', lineHeight: 1,
              }}>Sukutera</span>
              <div style={{
                fontFamily: 'var(--font-sans)', fontSize: 9,
                letterSpacing: '0.12em', textTransform: 'uppercase',
                color: 'var(--color-muted)', lineHeight: 1, marginTop: 2,
              }}>Lake Kivu, Rwanda</div>
            </div>
          </Link>

          {/* Desktop links */}
          <div className="hidden md:flex items-center gap-0">
            {NAV_LINKS.map(({ path, label }) => {
              const active = location.pathname === path
              return (
                <Link key={path} to={path} style={{
                  fontFamily: 'var(--font-sans)', padding: '6px 14px', paddingBottom: 5,
                  fontSize: 13, fontWeight: active ? 600 : 400, letterSpacing: '0.02em',
                  color: active ? 'var(--color-parchment)' : 'var(--color-stone)',
                  textDecoration: 'none',
                  borderBottom: active ? '1px solid var(--color-kivu)' : '1px solid transparent',
                  transition: 'color 0.15s ease, border-color 0.15s ease',
                }}
                onMouseEnter={e => { if (!active) e.currentTarget.style.color = 'var(--color-parchment)' }}
                onMouseLeave={e => { if (!active) e.currentTarget.style.color = 'var(--color-stone)' }}
                >{label}</Link>
              )
            })}
          </div>

          {/* Desktop CTA */}
          <div className="hidden md:flex">
            <Link to="/log" style={{
              fontFamily: 'var(--font-sans)', padding: '8px 20px', borderRadius: 6,
              background: 'var(--color-kivu)', color: '#fff', fontSize: 13,
              fontWeight: 600, letterSpacing: '0.04em', textDecoration: 'none',
            }}>+ Log Collection</Link>
          </div>

          {/* Mobile toggle — morphs to × */}
          <button
            className="md:hidden"
            onClick={() => setOpen(o => !o)}
            aria-label={open ? 'Close menu' : 'Open menu'}
            style={{
              background: 'none', border: 'none', cursor: 'pointer',
              width: 40, height: 40, display: 'flex', flexDirection: 'column',
              alignItems: 'center', justifyContent: 'center', gap: 5, padding: 0,
            }}
          >
            <span style={{
              display: 'block', width: 22, height: 1.5, borderRadius: 2,
              background: open ? '#fff' : 'var(--color-stone)',
              transition: 'transform 0.3s ease, opacity 0.2s ease',
              transform: open ? 'rotate(45deg) translate(4.5px, 4.5px)' : 'none',
            }} />
            <span style={{
              display: 'block', width: 22, height: 1.5, borderRadius: 2,
              background: open ? '#fff' : 'var(--color-stone)',
              transition: 'opacity 0.2s ease',
              opacity: open ? 0 : 1,
            }} />
            <span style={{
              display: 'block', width: 22, height: 1.5, borderRadius: 2,
              background: open ? '#fff' : 'var(--color-stone)',
              transition: 'transform 0.3s ease, opacity 0.2s ease',
              transform: open ? 'rotate(-45deg) translate(4.5px, -4.5px)' : 'none',
            }} />
          </button>
        </div>
      </nav>

      {/* ─── Full-screen mobile overlay ──────────────────────── */}
      <div
        className="md:hidden"
        style={{
          position: 'fixed', inset: 0, zIndex: 49,
          background: 'var(--color-ink, #07111A)',
          display: 'flex', flexDirection: 'column',
          /* slide down on open */
          transform: open ? 'translateY(0)' : 'translateY(-100%)',
          transition: 'transform 0.45s cubic-bezier(0.77, 0, 0.18, 1)',
          pointerEvents: open ? 'auto' : 'none',
          overflow: 'hidden',
        }}
      >
        {/* Faint field-photo texture in background */}
        <div style={{
          position: 'absolute', inset: 0,
          backgroundImage: 'url(/images/hero-lake.jpg)',
          backgroundSize: 'cover', backgroundPosition: 'center',
          opacity: 0.08, pointerEvents: 'none',
        }} />

        {/* Teal accent strip — left edge */}
        <div style={{
          position: 'absolute', left: 0, top: 0, bottom: 0,
          width: 3, background: 'var(--color-kivu)', opacity: 0.6,
        }} />

        {/* Nav links — large editorial numbered list */}
        <div style={{
          flex: 1, display: 'flex', flexDirection: 'column',
          justifyContent: 'center', padding: '80px 40px 32px',
        }}>
          {NAV_LINKS.map(({ path, label, num }, i) => {
            const active = location.pathname === path
            return (
              <Link
                key={path}
                to={path}
                style={{
                  display: 'flex', alignItems: 'baseline', gap: 16,
                  textDecoration: 'none', padding: '14px 0',
                  borderBottom: '1px solid rgba(238,228,202,0.07)',
                  /* stagger in */
                  opacity: open ? 1 : 0,
                  transform: open ? 'translateX(0)' : 'translateX(-24px)',
                  transition: `opacity 0.4s ease ${0.15 + i * 0.07}s, transform 0.4s ease ${0.15 + i * 0.07}s`,
                }}
              >
                {/* Small mono index */}
                <span style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: 10, fontWeight: 400,
                  letterSpacing: '0.08em',
                  color: active ? 'var(--color-kivu)' : 'var(--color-muted)',
                  lineHeight: 1,
                  paddingTop: 6,
                  minWidth: 24,
                }}>{num}</span>

                {/* Large Fraunces label */}
                <span style={{
                  fontFamily: 'var(--font-display)',
                  fontStyle: active ? 'italic' : 'normal',
                  fontWeight: active ? 700 : 500,
                  fontSize: 'clamp(32px, 9vw, 48px)',
                  letterSpacing: '-0.02em',
                  lineHeight: 1.05,
                  color: active ? 'var(--color-parchment)' : 'rgba(238,228,202,0.45)',
                  transition: 'color 0.2s ease',
                }}>{label}</span>

                {/* Active tick */}
                {active && (
                  <span style={{
                    marginLeft: 'auto', width: 8, height: 8,
                    borderRadius: '50%', background: 'var(--color-kivu)',
                    flexShrink: 0, alignSelf: 'center',
                  }} />
                )}
              </Link>
            )
          })}
        </div>

        {/* Bottom strip — CTA + tagline */}
        <div style={{
          padding: '24px 40px 40px',
          borderTop: '1px solid rgba(238,228,202,0.07)',
          display: 'flex', flexDirection: 'column', gap: 14,
          opacity: open ? 1 : 0,
          transform: open ? 'translateY(0)' : 'translateY(16px)',
          transition: 'opacity 0.4s ease 0.45s, transform 0.4s ease 0.45s',
        }}>
          <Link
            to="/log"
            style={{
              display: 'block', padding: '15px 24px', borderRadius: 6,
              background: 'var(--color-kivu)', color: '#fff',
              fontFamily: 'var(--font-sans)', fontSize: 14, fontWeight: 600,
              letterSpacing: '0.06em', textTransform: 'uppercase',
              textDecoration: 'none', textAlign: 'center',
            }}
          >
            + Log Collection
          </Link>

          {/* Tagline */}
          <p style={{
            fontFamily: 'var(--font-display)', fontStyle: 'italic',
            fontSize: 13, color: 'var(--color-muted)',
            textAlign: 'center', letterSpacing: '0.01em', margin: 0,
          }}>
            Track · Sort · Sustain — Lake Kivu, Rwanda
          </p>
        </div>
      </div>
    </>
  )
}
