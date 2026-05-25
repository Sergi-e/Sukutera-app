import { useMemo } from 'react'
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, Legend } from 'recharts'
import { PLASTIC_TYPES } from '../../lib/constants'
import { formatKg, percentOf } from '../../utils/formatters'

export default function PlasticBreakdown({ collections }) {
  const data = useMemo(() => {
    const totals = {}
    collections.forEach((c) => {
      totals[c.plastic_type] = (totals[c.plastic_type] || 0) + (c.weight_kg || 0)
    })
    const total = Object.values(totals).reduce((a, b) => a + b, 0)
    return Object.entries(totals).map(([type, kg]) => ({
      name: PLASTIC_TYPES[type]?.label ?? type,
      type,
      value: kg,
      percent: percentOf(kg, total),
      color: PLASTIC_TYPES[type]?.color ?? '#6B7280',
    }))
  }, [collections])

  const CustomTooltip = ({ active, payload }) => {
    if (!active || !payload?.length) return null
    const d = payload[0].payload
    return (
      <div className="glass-card p-3 text-sm">
        <div className="font-semibold text-white">{d.name}</div>
        <div style={{ color: d.color }}>{formatKg(d.value)}</div>
        <div style={{ color: 'rgba(255,255,255,0.5)' }}>{d.percent}% of total</div>
      </div>
    )
  }

  return (
    <div className="glass-card p-6">
      <h3 className="text-lg font-semibold text-white mb-5">Plastic Type Breakdown</h3>
      <ResponsiveContainer width="100%" height={240}>
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            innerRadius={70}
            outerRadius={100}
            paddingAngle={3}
            dataKey="value"
          >
            {data.map((entry) => (
              <Cell key={entry.type} fill={entry.color} stroke="transparent" />
            ))}
          </Pie>
          <Tooltip content={<CustomTooltip />} />
        </PieChart>
      </ResponsiveContainer>

      {/* Legend */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginTop: 8 }}>
        {data.map((d) => (
          <div key={d.type} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontSize: 13 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <div style={{ width: 10, height: 10, borderRadius: '50%', background: d.color, flexShrink: 0 }} />
              <span style={{ color: 'rgba(255,255,255,0.75)' }}>{d.name}</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              <span style={{ fontWeight: 600, color: '#FFFFFF' }}>{formatKg(d.value)}</span>
              <span style={{
                fontSize: 11, padding: '2px 7px', borderRadius: 6,
                background: `${d.color}20`, color: d.color, fontWeight: 600,
              }}>
                {d.percent}%
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
