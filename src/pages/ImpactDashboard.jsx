import { useCollections } from '../hooks/useCollections'
import { useCollectors } from '../hooks/useCollectors'
import ImpactStats from '../components/dashboard/ImpactStats'
import PlasticBreakdown from '../components/dashboard/PlasticBreakdown'
import TimelineChart from '../components/dashboard/TimelineChart'
import Leaderboard from '../components/collectors/Leaderboard'
import { DISTRICT_TARGETS, PLASTIC_TYPES } from '../lib/constants'
import { formatKg, percentOf } from '../utils/formatters'

export default function ImpactDashboard() {
  const { collections } = useCollections()
  const { collectors } = useCollectors()

  const districtStats = Object.entries(DISTRICT_TARGETS).map(([name, target]) => {
    const kg = collections
      .filter((c) => c.district === name)
      .reduce((s, c) => s + (c.weight_kg || 0), 0)
    const pct = percentOf(kg, target.target_kg)
    const distCollectors = collectors.filter((c) => c.district === name).length
    return { name, kg, pct, target, distCollectors }
  })

  return (
    <div className="min-h-screen pt-24 pb-16 px-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-10">
          <div
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-medium mb-4"
            style={{ background: 'rgba(10,124,110,0.12)', border: '1px solid rgba(10,124,110,0.25)', color: '#0A7C6E' }}
          >
            📊 Impact Dashboard
          </div>
          <h1 className="text-4xl font-black text-white mb-2">Conservation Impact</h1>
          <p style={{ color: 'rgba(255,255,255,0.5)' }}>
            Real-time tracking across Lake Kivu's three collection districts
          </p>
        </div>

        {/* Top stats */}
        <div className="mb-8">
          <ImpactStats collections={collections} collectors={collectors} />
        </div>

        {/* Charts row */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          <div className="lg:col-span-2">
            <TimelineChart collections={collections} />
          </div>
          <div>
            <PlasticBreakdown collections={collections} />
          </div>
        </div>

        {/* District progress */}
        <div className="glass-card p-6 mb-8">
          <h3 className="text-lg font-semibold text-white mb-5">District Progress</h3>
          <div className="flex flex-col gap-5">
            {districtStats.map(({ name, kg, pct, target, distCollectors }) => {
              const colors = { Rubavu: '#3B82F6', Karongi: '#10B981', Rusizi: '#F59E0B' }
              const color = colors[name] || '#0A7C6E'
              return (
                <div key={name}>
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-3">
                      <div className="w-3 h-3 rounded-full" style={{ background: color }} />
                      <span className="font-semibold text-white">{name}</span>
                      <span className="text-xs" style={{ color: 'rgba(255,255,255,0.4)' }}>
                        {distCollectors} collector{distCollectors !== 1 ? 's' : ''}
                      </span>
                    </div>
                    <div className="text-right">
                      <span className="text-sm font-bold text-white">{formatKg(kg)}</span>
                      <span className="text-xs ml-2" style={{ color: 'rgba(255,255,255,0.4)' }}>
                        / {formatKg(target.target_kg)} target
                      </span>
                    </div>
                  </div>
                  <div className="h-3 rounded-full" style={{ background: 'rgba(255,255,255,0.06)' }}>
                    <div
                      className="h-3 rounded-full transition-all duration-1000"
                      style={{
                        width: `${pct}%`,
                        background: `linear-gradient(90deg, ${color}80, ${color})`,
                        boxShadow: `0 0 10px ${color}40`,
                      }}
                    />
                  </div>
                  <div className="flex justify-between mt-1">
                    <span className="text-xs" style={{ color: 'rgba(255,255,255,0.35)' }}>
                      {target.shoreline_km} km shoreline
                    </span>
                    <span className="text-xs font-medium" style={{ color }}>
                      {pct}%
                    </span>
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        {/* Leaderboard preview */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-1">
            <Leaderboard collectors={collectors} compact limit={5} />
          </div>
          <div className="lg:col-span-2 glass-card p-6">
            <h3 className="text-lg font-semibold text-white mb-5">Recent Collections</h3>
            <div className="flex flex-col gap-2">
              {collections.slice(0, 8).map((c, i) => {
                return (
                  <div
                    key={i}
                    className="flex items-center justify-between p-3 rounded-xl"
                    style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.05)' }}
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-2.5 h-2.5 rounded-full flex-shrink-0" style={{ background: PLASTIC_TYPES[c.plastic_type]?.color || '#6B7280', boxShadow: `0 0 6px ${PLASTIC_TYPES[c.plastic_type]?.color || '#6B7280'}` }} />
                      <div>
                        <div className="text-sm font-medium text-white">{c.district || 'Lake Kivu'}</div>
                        <div className="text-xs" style={{ color: 'rgba(255,255,255,0.4)' }}>
                          {c.notes || c.plastic_type}
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-sm font-bold" style={{ color: '#F5E6C8' }}>{formatKg(c.weight_kg)}</div>
                      <div className="text-xs" style={{ color: PLASTIC_TYPES[c.plastic_type]?.color || '#6B7280' }}>+{(PLASTIC_TYPES[c.plastic_type]?.points || 3) * Math.round(c.weight_kg)} pts</div>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
