import AnimateInView from '../ui/AnimateInView'
import { PLASTIC_TYPES } from '../../lib/constants'
import { formatKg, timeAgo } from '../../utils/formatters'

const FEED_OFFSETS = ['12 min ago', '28 min ago', '1 hr ago', '2 hrs ago', '4 hrs ago']

export default function LiveActivityFeed({ collections, collectors }) {
  const collectorMap = Object.fromEntries(collectors.map((c) => [c.id, c.name]))

  const recent = [...collections]
    .slice(0, 5)
    .map((c, i) => ({
      ...c,
      collectorName: collectorMap[c.collector_id] || 'Community Collector',
      timeLabel: c.created_at ? timeAgo(c.created_at) : FEED_OFFSETS[i] || 'Recently',
    }))

  return (
    <section style={{ padding: '80px 24px' }}>
      <div style={{ maxWidth: 1120, margin: '0 auto' }}>
        <AnimateInView variant="fade-left">
          <div style={{ marginBottom: 32 }}>
            <h2 style={{ fontSize: 30, fontWeight: 900, color: '#FFFFFF', marginBottom: 10 }}>
              Live Activity Feed
            </h2>
            <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: 15 }}>
              Latest collections logged across Lake Kivu shores
            </p>
          </div>
        </AnimateInView>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
          {recent.map((item, i) => {
            const color = PLASTIC_TYPES[item.plastic_type]?.color || '#6B7280'
            return (
              <AnimateInView key={`${item.collector_id}-${i}`} variant="fade-right" delay={i * 100}>
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    gap: 16,
                    padding: '18px 22px',
                    borderRadius: 14,
                    background: 'rgba(15,42,61,0.7)',
                    border: '1px solid rgba(255,255,255,0.07)',
                    borderLeft: `4px solid ${color}`,
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: 14, minWidth: 0 }}>
                    <div
                      style={{
                        width: 10,
                        height: 10,
                        borderRadius: '50%',
                        background: color,
                        boxShadow: `0 0 10px ${color}`,
                        flexShrink: 0,
                      }}
                    />
                    <div style={{ minWidth: 0 }}>
                      <div style={{ fontSize: 14, fontWeight: 700, color: '#fff' }}>
                        {item.collectorName}
                      </div>
                      <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.45)', marginTop: 2 }}>
                        {item.district} · {item.plastic_type} · {item.notes || 'Shoreline collection'}
                      </div>
                    </div>
                  </div>
                  <div style={{ textAlign: 'right', flexShrink: 0 }}>
                    <div style={{ fontSize: 15, fontWeight: 800, color: '#F5E6C8' }}>
                      {formatKg(item.weight_kg)}
                    </div>
                    <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.35)', marginTop: 2 }}>
                      {item.timeLabel}
                    </div>
                  </div>
                </div>
              </AnimateInView>
            )
          })}
        </div>
      </div>
    </section>
  )
}
