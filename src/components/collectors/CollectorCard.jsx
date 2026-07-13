import { getInitials, formatKg } from '../../utils/formatters'
import { getRank, formatPoints } from '../../utils/points'

export default function CollectorCard({ collector, rank, compact = false }) {
  const rankInfo = getRank(collector.total_points || 0)
  const initials = getInitials(collector.name)

  const districtColors = {
    Rubavu: '#60A5FA',
    Karongi: '#34D399',
    Rusizi: '#FBBF24',
  }
  const districtColor = districtColors[collector.district] || '#9CA3AF'

  if (compact) {
    return (
      <div
        className="panel-row"
        style={{
          background: 'transparent',
          borderRadius: 12,
          transition: 'background 0.2s ease',
        }}
        onMouseEnter={(e) => (e.currentTarget.style.background = 'rgba(255,255,255,0.04)')}
        onMouseLeave={(e) => (e.currentTarget.style.background = 'transparent')}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, minWidth: 0, flex: 1 }}>
          <span
            style={{
              fontSize: 16,
              fontWeight: 900,
              width: 28,
              textAlign: 'center',
              flexShrink: 0,
              color: rank <= 3 ? '#F5E6C8' : 'rgba(255,255,255,0.35)',
            }}
          >
            {rank <= 3 ? ['🥇', '🥈', '🥉'][rank - 1] : rank}
          </span>
          <div
            style={{
              width: 36,
              height: 36,
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: 13,
              fontWeight: 700,
              color: '#fff',
              flexShrink: 0,
              background: `linear-gradient(135deg, ${rankInfo.color}80, ${rankInfo.color}40)`,
              border: `1.5px solid ${rankInfo.color}60`,
            }}
          >
            {initials}
          </div>
          <div style={{ minWidth: 0 }}>
            <div style={{ fontSize: 14, fontWeight: 600, color: '#fff', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
              {collector.name}
            </div>
            <div style={{ fontSize: 12, color: districtColor, marginTop: 2 }}>{collector.district}</div>
          </div>
        </div>
        <div style={{ textAlign: 'right', flexShrink: 0, paddingLeft: 12 }}>
          <div style={{ fontSize: 14, fontWeight: 700, color: '#F5E6C8' }}>
            {formatPoints(collector.total_points || 0)}
          </div>
          <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.45)', marginTop: 2 }}>
            {formatKg(collector.total_kg || 0)}
          </div>
        </div>
      </div>
    )
  }

  return (
    <div
      className="glass-card"
      style={{ transition: 'transform 0.2s ease, border-color 0.2s ease' }}
      onMouseEnter={(e) => {
        e.currentTarget.style.borderColor = 'rgba(255,255,255,0.12)'
        e.currentTarget.style.transform = 'translateY(-2px)'
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.borderColor = 'rgba(255,255,255,0.08)'
        e.currentTarget.style.transform = 'translateY(0)'
      }}
    >
      <div style={{ display: 'flex', alignItems: 'flex-start', gap: 16 }}>
        <div style={{ position: 'relative', flexShrink: 0 }}>
          <div
            style={{
              width: 56,
              height: 56,
              borderRadius: 16,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: 18,
              fontWeight: 900,
              color: '#fff',
              background: `linear-gradient(135deg, ${rankInfo.color}60, ${rankInfo.color}20)`,
              border: `2px solid ${rankInfo.color}50`,
            }}
          >
            {initials}
          </div>
          <span
            style={{
              position: 'absolute',
              top: -4,
              right: -4,
              fontSize: 14,
              lineHeight: 1,
            }}
            title={rankInfo.label}
          >
            {rankInfo.icon}
          </span>
        </div>

        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 12 }}>
            <div>
              <h3 style={{ fontWeight: 600, color: '#fff', margin: 0, fontSize: 16 }}>{collector.name}</h3>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginTop: 6, flexWrap: 'wrap' }}>
                <span
                  style={{
                    fontSize: 11,
                    fontWeight: 600,
                    padding: '3px 10px',
                    borderRadius: 999,
                    background: `${districtColor}22`,
                    color: districtColor,
                    border: `1px solid ${districtColor}44`,
                  }}
                >
                  {collector.district}
                </span>
                <span style={{ fontSize: 12, color: 'rgba(255,255,255,0.45)' }}>{rankInfo.label}</span>
              </div>
            </div>
            {rank && (
              <span
                style={{
                  fontSize: rank <= 3 ? 22 : 20,
                  fontWeight: 900,
                  flexShrink: 0,
                  color: rank <= 3 ? '#F5E6C8' : 'rgba(255,255,255,0.35)',
                }}
              >
                {rank <= 3 ? ['🥇', '🥈', '🥉'][rank - 1] : `#${rank}`}
              </span>
            )}
          </div>

          <div style={{ display: 'flex', gap: 28, marginTop: 16 }}>
            <div>
              <div style={{ fontSize: 22, fontWeight: 900, color: rankInfo.color, lineHeight: 1.1 }}>
                {formatPoints(collector.total_points || 0)}
              </div>
              <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.45)', marginTop: 6 }}>points earned</div>
            </div>
            <div>
              <div style={{ fontSize: 22, fontWeight: 900, color: '#fff', lineHeight: 1.1 }}>
                {formatKg(collector.total_kg || 0)}
              </div>
              <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.45)', marginTop: 6 }}>collected</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
