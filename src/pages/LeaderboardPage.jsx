import { Link } from 'react-router-dom'
import { useCollectors } from '../hooks/useCollectors'
import AnimateInView from '../components/ui/AnimateInView'
import Leaderboard from '../components/collectors/Leaderboard'
import { formatKg } from '../utils/formatters'

export default function LeaderboardPage() {
  const { collectors, loading } = useCollectors()

  const sorted = [...collectors].sort((a, b) => (b.total_points || 0) - (a.total_points || 0))
  const totalKg = collectors.reduce((s, c) => s + (c.total_kg || 0), 0)

  return (
    <div style={{ minHeight: '100vh', paddingTop: 88, paddingBottom: 64, paddingLeft: 24, paddingRight: 24, boxSizing: 'border-box' }}>
      <div className="max-w-3xl mx-auto">
        <AnimateInView variant="fade-left">
          <div className="text-center mb-10">
            <div
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-medium mb-4"
              style={{ background: 'rgba(245,230,200,0.08)', border: '1px solid rgba(245,230,200,0.15)', color: '#F5E6C8' }}
            >
              🏆 Community Leaderboard
            </div>
            <h1 className="text-4xl font-black text-white mb-3">Top Collectors</h1>
            <p style={{ color: 'rgba(255,255,255,0.5)' }}>
              {collectors.length} collectors · {formatKg(totalKg)} total recovered
            </p>
          </div>
        </AnimateInView>

        {/* Podium — top 3 */}
        {sorted.length >= 3 && (
          <div
            style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'flex-end',
              gap: 12,
              maxWidth: 420,
              margin: '0 auto 40px',
              width: '100%',
            }}
          >
            {[sorted[1], sorted[0], sorted[2]].map((c, pos) => {
              const actualRank = pos === 0 ? 2 : pos === 1 ? 1 : 3
              const podiumHeights = [96, 128, 80]
              const podiumColors = ['#9CA3AF', '#F5E6C8', '#CD7F32']
              const color = podiumColors[pos]
              const initials = c?.name?.split(' ').map((n) => n[0]).join('').toUpperCase().slice(0, 2) || '??'
              return (
                <div
                  key={c?.id}
                  style={{
                    flex: '0 0 120px',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    gap: 8,
                  }}
                >
                  {/* Initials avatar — no broken img tags */}
                  <div
                    style={{
                      width: 48,
                      height: 48,
                      borderRadius: '50%',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontWeight: 900,
                      fontSize: 14,
                      color: '#fff',
                      background: `linear-gradient(135deg, ${color}60, ${color}20)`,
                      border: `2px solid ${color}50`,
                      flexShrink: 0,
                    }}
                  >
                    {initials}
                  </div>
                  <div
                    style={{
                      fontSize: 11,
                      fontWeight: 600,
                      color: '#fff',
                      textAlign: 'center',
                      maxWidth: 90,
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                      whiteSpace: 'nowrap',
                    }}
                  >
                    {c?.name?.split(' ')[0]}
                  </div>
                  {/* Podium block */}
                  <div
                    style={{
                      width: '100%',
                      height: podiumHeights[pos],
                      borderRadius: '10px 10px 0 0',
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      justifyContent: 'flex-end',
                      paddingBottom: 10,
                      background: `${color}15`,
                      border: `1px solid ${color}30`,
                    }}
                  >
                    <div style={{ fontSize: 22 }}>{['🥈', '🥇', '🥉'][pos]}</div>
                    <div style={{ fontSize: 12, fontWeight: 900, color }}>#{actualRank}</div>
                  </div>
                </div>
              )
            })}
          </div>
        )}

        {loading && (
          <div className="text-center py-12" style={{ color: 'rgba(255,255,255,0.4)' }}>
            Loading collectors…
          </div>
        )}

        <Leaderboard collectors={collectors} />

        <div
          style={{
            marginTop: 32,
            padding: '20px 24px',
            borderRadius: 16,
            background: 'rgba(15,42,61,0.7)',
            border: '1px solid rgba(255,255,255,0.07)',
            display: 'flex',
            flexWrap: 'wrap',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: 16,
          }}
        >
          <div>
            <div style={{ fontSize: 14, fontWeight: 700, color: '#fff', marginBottom: 4 }}>
              Keep the momentum going
            </div>
            <div style={{ fontSize: 13, color: 'rgba(255,255,255,0.45)' }}>
              Log more collections or explore where recovered waste goes next.
            </div>
          </div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10 }}>
            <Link
              to="/log"
              style={{
                padding: '9px 18px',
                borderRadius: 10,
                background: 'linear-gradient(135deg, #0A7C6E, #0d9e8e)',
                color: '#fff',
                fontSize: 13,
                fontWeight: 700,
                textDecoration: 'none',
              }}
            >
              + Log Collection
            </Link>
            <Link
              to="/ecosystem"
              style={{
                padding: '9px 18px',
                borderRadius: 10,
                background: 'rgba(255,255,255,0.06)',
                border: '1px solid rgba(255,255,255,0.12)',
                color: 'rgba(255,255,255,0.75)',
                fontSize: 13,
                fontWeight: 600,
                textDecoration: 'none',
              }}
            >
              View Ecosystem →
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
