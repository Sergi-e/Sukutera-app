import { useState } from 'react'
import CollectorCard from './CollectorCard'

export default function Leaderboard({ collectors, compact = false, limit }) {
  const [district, setDistrict] = useState('All')

  const filtered = collectors
    .filter((c) => district === 'All' || c.district === district)
    .sort((a, b) => (b.total_points || 0) - (a.total_points || 0))
    .slice(0, limit)

  if (compact) {
    return (
      <div className="glass-card p-4">
        <h3 className="text-base font-semibold text-white mb-3">Top Collectors</h3>
        <div className="flex flex-col gap-0.5">
          {filtered.map((c, i) => (
            <CollectorCard key={c.id} collector={c} rank={i + 1} compact />
          ))}
        </div>
      </div>
    )
  }

  return (
    <div>
      {/* District filter */}
      <div className="flex gap-2 mb-6">
        {['All', 'Rubavu', 'Karongi', 'Rusizi'].map((d) => (
          <button
            key={d}
            onClick={() => setDistrict(d)}
            className="px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200"
            style={{
              background: district === d ? 'rgba(10,124,110,0.25)' : 'rgba(255,255,255,0.05)',
              color: district === d ? '#F5E6C8' : 'rgba(255,255,255,0.6)',
              border: district === d ? '1px solid rgba(10,124,110,0.4)' : '1px solid rgba(255,255,255,0.08)',
            }}
          >
            {d}
          </button>
        ))}
      </div>

      <div className="flex flex-col gap-3">
        {filtered.map((c, i) => (
          <CollectorCard key={c.id} collector={c} rank={i + 1} />
        ))}
        {filtered.length === 0 && (
          <div className="glass-card p-8 text-center" style={{ color: 'rgba(255,255,255,0.4)' }}>
            No collectors in this district yet.
          </div>
        )}
      </div>
    </div>
  )
}
