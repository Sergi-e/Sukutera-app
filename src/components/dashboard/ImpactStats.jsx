import { useMemo } from 'react'
import { formatKg, percentOf } from '../../utils/formatters'
import { DISTRICT_TARGETS } from '../../lib/constants'

function StatCard({ label, value, sub, color, delay, icon }) {
  return (
    <div
      className="glass-card shimmer-border p-6 animate-fade-up"
      style={{ animationDelay: delay }}
    >
      <div className="flex items-start justify-between mb-3">
        <span className="text-3xl">{icon}</span>
        <span
          className="text-xs font-medium px-2 py-1 rounded-full"
          style={{ background: `${color}20`, color }}
        >
          Live
        </span>
      </div>
      <div className="text-3xl font-black mt-2" style={{ color }}>
        {value}
      </div>
      <div className="text-sm font-medium text-white mt-1">{label}</div>
      {sub && (
        <div className="text-xs mt-1" style={{ color: 'rgba(255,255,255,0.45)' }}>
          {sub}
        </div>
      )}
    </div>
  )
}

export default function ImpactStats({ collections, collectors }) {
  const stats = useMemo(() => {
    const totalKg = collections.reduce((s, c) => s + (c.weight_kg || 0), 0)
    const totalCollectors = collectors.length
    const totalPoints = collectors.reduce((s, c) => s + (c.total_points || 0), 0)

    const districtTotals = {}
    collections.forEach((c) => {
      if (c.district) districtTotals[c.district] = (districtTotals[c.district] || 0) + c.weight_kg
    })
    const totalTarget = Object.values(DISTRICT_TARGETS).reduce((s, d) => s + d.target_kg, 0)
    const progress = percentOf(totalKg, totalTarget)

    return { totalKg, totalCollectors, totalPoints, progress, totalTarget }
  }, [collections, collectors])

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      <StatCard
        icon="🏔️"
        label="Plastic Collected"
        value={formatKg(stats.totalKg)}
        sub="from Lake Kivu shores"
        color="#0A7C6E"
        delay="0s"
      />
      <StatCard
        icon="👥"
        label="Active Collectors"
        value={stats.totalCollectors}
        sub="across 3 districts"
        color="#1A4B7A"
        delay="0.1s"
      />
      <StatCard
        icon="⭐"
        label="Points Awarded"
        value={stats.totalPoints.toLocaleString()}
        sub="community incentives"
        color="#F59E0B"
        delay="0.2s"
      />
      <StatCard
        icon="🎯"
        label="Target Progress"
        value={`${stats.progress}%`}
        sub={`of ${formatKg(stats.totalTarget)} goal`}
        color="#10B981"
        delay="0.3s"
      />
    </div>
  )
}
