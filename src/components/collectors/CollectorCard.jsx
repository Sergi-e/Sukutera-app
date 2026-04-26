import { getInitials, formatKg } from '../../utils/formatters'
import { getRank, formatPoints } from '../../utils/points'

export default function CollectorCard({ collector, rank, compact = false }) {
  const rankInfo = getRank(collector.total_points || 0)
  const initials = getInitials(collector.name)

  const districtColors = {
    Rubavu: '#3B82F6',
    Karongi: '#10B981',
    Rusizi: '#F59E0B',
  }
  const districtColor = districtColors[collector.district] || '#6B7280'

  if (compact) {
    return (
      <div className="flex items-center gap-3 p-3 rounded-xl transition-colors hover:bg-white/5">
        <span
          className="text-lg font-black w-7 text-center"
          style={{ color: rank <= 3 ? '#F5E6C8' : 'rgba(255,255,255,0.3)' }}
        >
          {rank <= 3 ? ['🥇', '🥈', '🥉'][rank - 1] : rank}
        </span>
        <div
          className="w-9 h-9 rounded-full flex items-center justify-center text-sm font-bold text-white flex-shrink-0"
          style={{ background: `linear-gradient(135deg, ${rankInfo.color}80, ${rankInfo.color}40)`, border: `1.5px solid ${rankInfo.color}60` }}
        >
          {initials}
        </div>
        <div className="flex-1 min-w-0">
          <div className="text-sm font-semibold text-white truncate">{collector.name}</div>
          <div className="text-xs" style={{ color: districtColor }}>{collector.district}</div>
        </div>
        <div className="text-right">
          <div className="text-sm font-bold" style={{ color: '#F5E6C8' }}>
            {formatPoints(collector.total_points || 0)}
          </div>
          <div className="text-xs" style={{ color: 'rgba(255,255,255,0.4)' }}>
            {formatKg(collector.total_kg || 0)}
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="glass-card p-5 hover:border-white/10 transition-all duration-200 hover:-translate-y-0.5">
      <div className="flex items-start gap-4">
        <div className="relative">
          <div
            className="w-14 h-14 rounded-2xl flex items-center justify-center text-lg font-black text-white"
            style={{ background: `linear-gradient(135deg, ${rankInfo.color}60, ${rankInfo.color}20)`, border: `2px solid ${rankInfo.color}50` }}
          >
            {initials}
          </div>
          <span
            className="absolute -top-1 -right-1 text-base"
            title={rankInfo.label}
          >
            {rankInfo.icon}
          </span>
        </div>

        <div className="flex-1">
          <div className="flex items-start justify-between">
            <div>
              <h3 className="font-semibold text-white">{collector.name}</h3>
              <div className="flex items-center gap-2 mt-0.5">
                <span
                  className="text-xs px-2 py-0.5 rounded-full font-medium"
                  style={{ background: `${districtColor}20`, color: districtColor }}
                >
                  {collector.district}
                </span>
                <span className="text-xs" style={{ color: 'rgba(255,255,255,0.4)' }}>
                  {rankInfo.label}
                </span>
              </div>
            </div>
            {rank && (
              <span className="text-2xl font-black" style={{ color: rank <= 3 ? '#F5E6C8' : 'rgba(255,255,255,0.3)' }}>
                {rank <= 3 ? ['🥇', '🥈', '🥉'][rank - 1] : `#${rank}`}
              </span>
            )}
          </div>

          <div className="flex gap-4 mt-3">
            <div>
              <div className="text-xl font-black" style={{ color: rankInfo.color }}>
                {formatPoints(collector.total_points || 0)}
              </div>
              <div className="text-xs" style={{ color: 'rgba(255,255,255,0.4)' }}>points earned</div>
            </div>
            <div>
              <div className="text-xl font-black text-white">{formatKg(collector.total_kg || 0)}</div>
              <div className="text-xs" style={{ color: 'rgba(255,255,255,0.4)' }}>collected</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
