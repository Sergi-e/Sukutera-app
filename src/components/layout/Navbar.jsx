import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'

const NAV_LINKS = [
  { path: '/', label: 'Home' },
  { path: '/map', label: 'Live Map' },
  { path: '/leaderboard', label: 'Leaderboard' },
  { path: '/impact', label: 'Impact' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const location = useLocation()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => setOpen(false), [location])

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? 'py-3' : 'py-5'
      }`}
      style={{
        background: scrolled
          ? 'rgba(11, 31, 46, 0.95)'
          : 'linear-gradient(180deg, rgba(11,31,46,0.9) 0%, transparent 100%)',
        backdropFilter: scrolled ? 'blur(20px)' : 'none',
        borderBottom: scrolled ? '1px solid rgba(255,255,255,0.06)' : 'none',
      }}
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-3 group">
          <div
            className="w-9 h-9 rounded-xl flex items-center justify-center font-black text-white text-sm"
            style={{ background: 'linear-gradient(135deg, #0A7C6E, #1A4B7A)' }}
          >
            S
          </div>
          <div>
            <span className="font-bold text-lg tracking-wide text-white">Sukutera</span>
            <div className="text-xs leading-none" style={{ color: 'rgba(245,230,200,0.7)' }}>
              Lake Kivu, Rwanda
            </div>
          </div>
        </Link>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-1">
          {NAV_LINKS.map(({ path, label }) => {
            const active = location.pathname === path
            return (
              <Link
                key={path}
                to={path}
                className="px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200"
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

        {/* CTA */}
        <div className="hidden md:flex items-center gap-3">
          <Link
            to="/log"
            className="animate-pulse-glow px-5 py-2.5 rounded-xl font-semibold text-sm text-white transition-all duration-200 hover:scale-105"
            style={{
              background: 'linear-gradient(135deg, #0A7C6E, #0d9e8e)',
            }}
          >
            + Log Collection
          </Link>
        </div>

        {/* Hamburger */}
        <button
          className="md:hidden flex flex-col gap-1.5 p-2"
          onClick={() => setOpen(!open)}
          aria-label="Menu"
        >
          <span
            className="block w-6 h-0.5 transition-all duration-200"
            style={{
              background: 'rgba(255,255,255,0.8)',
              transform: open ? 'rotate(45deg) translate(5px, 5px)' : 'none',
            }}
          />
          <span
            className="block w-6 h-0.5 transition-all duration-200"
            style={{
              background: 'rgba(255,255,255,0.8)',
              opacity: open ? 0 : 1,
            }}
          />
          <span
            className="block w-6 h-0.5 transition-all duration-200"
            style={{
              background: 'rgba(255,255,255,0.8)',
              transform: open ? 'rotate(-45deg) translate(5px, -5px)' : 'none',
            }}
          />
        </button>
      </div>

      {/* Mobile menu */}
      {open && (
        <div
          className="md:hidden mt-2 mx-4 rounded-2xl p-4 flex flex-col gap-1"
          style={{ background: 'rgba(15,42,61,0.97)', border: '1px solid rgba(255,255,255,0.08)' }}
        >
          {NAV_LINKS.map(({ path, label }) => (
            <Link
              key={path}
              to={path}
              className="px-4 py-3 rounded-xl text-sm font-medium transition-colors"
              style={{
                color: location.pathname === path ? '#F5E6C8' : 'rgba(255,255,255,0.7)',
                background: location.pathname === path ? 'rgba(10,124,110,0.15)' : 'transparent',
              }}
            >
              {label}
            </Link>
          ))}
          <Link
            to="/log"
            className="mt-2 px-4 py-3 rounded-xl text-sm font-semibold text-center text-white"
            style={{ background: 'linear-gradient(135deg, #0A7C6E, #0d9e8e)' }}
          >
            + Log Collection
          </Link>
        </div>
      )}
    </nav>
  )
}
