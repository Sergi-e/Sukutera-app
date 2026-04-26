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
      <div className="flex flex-col gap-2 mt-2">
        {data.map((d) => (
          <div key={d.type} className="flex items-center justify-between text-sm">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full" style={{ background: d.color }} />
              <span style={{ color: 'rgba(255,255,255,0.75)' }}>{d.name}</span>
            </div>
            <div className="flex items-center gap-3">
              <span className="font-medium text-white">{formatKg(d.value)}</span>
              <span
                className="text-xs px-1.5 py-0.5 rounded"
                style={{ background: `${d.color}20`, color: d.color }}
              >
                {d.percent}%
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
