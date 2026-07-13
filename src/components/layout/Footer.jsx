import { Link } from 'react-router-dom'

const PLATFORM_LINKS = [
  { to: '/map', label: 'Live Map' },
  { to: '/log', label: 'Log Collection' },
  { to: '/leaderboard', label: 'Leaderboard' },
  { to: '/ecosystem', label: 'Ecosystem' },
  { to: '/impact', label: 'Impact Dashboard' },
]

export default function Footer() {
  return (
    <footer
      style={{
        marginTop: 'auto',
        background: 'rgba(11,31,46,0.95)',
        borderTop: '1px solid rgba(255,255,255,0.06)',
      }}
    >
      <div style={{ maxWidth: 1280, margin: '0 auto', padding: '48px 24px 32px' }}>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: 40,
            marginBottom: 32,
          }}
        >
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 14 }}>
              <div
                style={{
                  width: 32,
                  height: 32,
                  borderRadius: 10,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontWeight: 900,
                  color: '#fff',
                  fontSize: 13,
                  background: 'linear-gradient(135deg, #0A7C6E, #1A4B7A)',
                }}
              >
                S
              </div>
              <span style={{ fontWeight: 700, color: '#fff', fontSize: 16 }}>Sukutera</span>
            </div>
            <p style={{ fontSize: 14, lineHeight: 1.65, color: 'rgba(255,255,255,0.55)', margin: 0, maxWidth: 280 }}>
              Plastic waste tracking and incentive platform for Lake Kivu, Rwanda.
            </p>
          </div>

          <div>
            <h4 style={{ fontSize: 14, fontWeight: 600, color: '#fff', marginBottom: 14, marginTop: 0 }}>
              Platform
            </h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              {PLATFORM_LINKS.map(({ to, label }) => (
                <Link
                  key={to}
                  to={to}
                  style={{
                    fontSize: 14,
                    color: 'rgba(255,255,255,0.55)',
                    textDecoration: 'none',
                    transition: 'color 0.2s ease',
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = '#fff')}
                  onMouseLeave={(e) => (e.currentTarget.style.color = 'rgba(255,255,255,0.55)')}
                >
                  {label}
                </Link>
              ))}
            </div>
          </div>

          <div>
            <h4 style={{ fontSize: 14, fontWeight: 600, color: '#fff', marginBottom: 14, marginTop: 0 }}>
              Districts
            </h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              {['Rubavu', 'Karongi', 'Rusizi'].map((d) => (
                <span key={d} style={{ fontSize: 14, color: 'rgba(255,255,255,0.55)' }}>
                  {d} District
                </span>
              ))}
            </div>
          </div>
        </div>

        <div
          style={{
            paddingTop: 24,
            display: 'flex',
            flexWrap: 'wrap',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: 12,
            borderTop: '1px solid rgba(255,255,255,0.06)',
            fontSize: 12,
            color: 'rgba(255,255,255,0.4)',
          }}
        >
          <span>© 2026 Sukutera — Lake Kivu Conservation Initiative</span>
          <span style={{ paddingRight: 4 }}>Track. Sort. Sustain.</span>
        </div>
      </div>
    </footer>
  )
}
