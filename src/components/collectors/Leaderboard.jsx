import { useState } from 'react'
import AnimateInView from '../ui/AnimateInView'
import CollectorCard from './CollectorCard'

export default function Leaderboard({ collectors, compact = false, limit }) {
  const [district, setDistrict] = useState('All')

  const filtered = collectors
    .filter((c) => district === 'All' || c.district === district)
    .sort((a, b) => (b.total_points || 0) - (a.total_points || 0))
    .slice(0, limit)

  if (compact) {
    return (
      <div className="glass-card">
        <h3 style={{ fontSize: 16, fontWeight: 600, color: '#fff', marginBottom: 16, marginTop: 0 }}>
          Top Collectors
        </h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
          {filtered.map((c, i) => (
            <AnimateInView key={c.id} variant="fade-up" delay={i * 100}>
              <CollectorCard collector={c} rank={i + 1} compact />
            </AnimateInView>
          ))}
        </div>
      </div>
    )
  }

  return (
    <div>
      <div className="leaderboard-filters">
        {['All', 'Rubavu', 'Karongi', 'Rusizi'].map((d) => (
          <button
            key={d}
            type="button"
            onClick={() => setDistrict(d)}
            style={{
              padding: '8px 16px',
              borderRadius: 12,
              fontSize: 14,
              fontWeight: 500,
              cursor: 'pointer',
              transition: 'all 0.2s ease',
              background: district === d ? 'rgba(10,124,110,0.25)' : 'rgba(255,255,255,0.05)',
              color: district === d ? '#F5E6C8' : 'rgba(255,255,255,0.6)',
              border: district === d ? '1px solid rgba(10,124,110,0.4)' : '1px solid rgba(255,255,255,0.08)',
            }}
          >
            {d}
          </button>
        ))}
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
        {filtered.map((c, i) => (
          <AnimateInView key={c.id} variant="fade-up" delay={i * 100}>
            <CollectorCard collector={c} rank={i + 1} />
          </AnimateInView>
        ))}
        {filtered.length === 0 && (
          <div className="glass-card" style={{ textAlign: 'center', color: 'rgba(255,255,255,0.4)' }}>
            No collectors in this district yet.
          </div>
        )}
      </div>
    </div>
  )
}
