import { Link } from 'react-router-dom'
import { useCollectors } from '../hooks/useCollectors'
import Leaderboard from '../components/collectors/Leaderboard'
import { formatKg } from '../utils/formatters'

export default function LeaderboardPage() {
  const { collectors, loading } = useCollectors()

  const sorted = [...collectors].sort((a, b) => (b.total_points || 0) - (a.total_points || 0))
  const totalKg = collectors.reduce((s, c) => s + (c.total_kg || 0), 0)

  return (
    <div style={{ minHeight: '100vh', paddingTop: 88, paddingBottom: 64, paddingLeft: 24, paddingRight: 24, boxSizing: 'border-box' }}>
      <div className="max-w-3xl mx-auto">
        {/* Header */}
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

        {/* Podium — top 3 */}
        {sorted.length >= 3 && (
          <div className="grid grid-cols-3 gap-3 mb-10">
            {[sorted[1], sorted[0], sorted[2]].map((c, pos) => {
              const actualRank = pos === 0 ? 2 : pos === 1 ? 1 : 3
              const heights = ['h-24', 'h-32', 'h-20']
              const podiumColors = ['#9CA3AF', '#F5E6C8', '#CD7F32']
              const color = podiumColors[pos]
              return (
                <div key={c?.id} className="flex flex-col items-center gap-2">
                  <div
                    className="w-12 h-12 rounded-full flex items-center justify-center font-black text-white text-sm"
                    style={{
                      background: `linear-gradient(135deg, ${color}60, ${color}20)`,
                      border: `2px solid ${color}50`,
                    }}
                  >
                    {c?.name?.split(' ').map((n) => n[0]).join('').toUpperCase().slice(0, 2)}
                  </div>
                  <div className="text-xs font-semibold text-white text-center truncate max-w-[90px]">
                    {c?.name?.split(' ')[0]}
                  </div>
                  <div
                    className={`w-full rounded-t-xl flex flex-col items-center justify-end pb-3 ${heights[pos]}`}
                    style={{ background: `${color}15`, border: `1px solid ${color}30` }}
                  >
                    <div className="text-xl">{['🥈', '🥇', '🥉'][pos]}</div>
                    <div className="text-xs font-black" style={{ color }}>
                      #{actualRank}
                    </div>
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
