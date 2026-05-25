import { Link } from 'react-router-dom'

export default function Footer() {
  return (
    <footer
      style={{
        background: 'rgba(11,31,46,0.95)',
        borderTop: '1px solid rgba(255,255,255,0.06)',
      }}
      className="mt-auto"
    >
      <div className="max-w-7xl mx-auto px-6 py-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-3 mb-3">
              <div
                className="w-8 h-8 rounded-lg flex items-center justify-center font-black text-white text-sm"
                style={{ background: 'linear-gradient(135deg, #0A7C6E, #1A4B7A)' }}
              >
                S
              </div>
              <span className="font-bold text-white">Sukutera</span>
            </div>
            <p className="text-sm leading-relaxed" style={{ color: 'rgba(255,255,255,0.5)' }}>
              Plastic waste tracking and incentive platform for Lake Kivu, Rwanda.
            </p>
            <div className="flex gap-3 mt-4">
              <span className="text-xs px-2 py-1 rounded-md" style={{ background: 'rgba(10,124,110,0.15)', color: '#0A7C6E' }}>
                National Geographic Society
              </span>
              <span className="text-xs px-2 py-1 rounded-md" style={{ background: 'rgba(26,75,122,0.2)', color: '#4B8FD5' }}>
                The Nature Conservancy
              </span>
            </div>
          </div>

          {/* Links */}
          <div>
            <h4 className="text-sm font-semibold text-white mb-3">Platform</h4>
            <div className="flex flex-col gap-2">
              {[
                { to: '/map', label: 'Live Map' },
                { to: '/log', label: 'Log Collection' },
                { to: '/leaderboard', label: 'Leaderboard' },
                { to: '/ecosystem', label: 'Ecosystem' },
                { to: '/impact', label: 'Impact Dashboard' },
              ].map(({ to, label }) => (
                <Link
                  key={to}
                  to={to}
                  className="text-sm transition-colors hover:text-white"
                  style={{ color: 'rgba(255,255,255,0.5)' }}
                >
                  {label}
                </Link>
              ))}
            </div>
          </div>

          {/* Districts */}
          <div>
            <h4 className="text-sm font-semibold text-white mb-3">Districts</h4>
            <div className="flex flex-col gap-2">
              {['Rubavu', 'Karongi', 'Rusizi'].map((d) => (
                <span key={d} className="text-sm" style={{ color: 'rgba(255,255,255,0.5)' }}>
                  {d} District
                </span>
              ))}
            </div>
          </div>
        </div>

        <div
          className="pt-6 flex flex-col md:flex-row items-center justify-between gap-2 text-xs"
          style={{ borderTop: '1px solid rgba(255,255,255,0.06)', color: 'rgba(255,255,255,0.35)' }}
        >
          <span>© 2026 Sukutera — Lake Kivu Conservation Initiative</span>
          <span>Track. Sort. Sustain.</span>
        </div>
      </div>
    </footer>
  )
}
