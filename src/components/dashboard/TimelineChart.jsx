import { useMemo } from 'react'
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from 'recharts'
import { formatShortDate } from '../../utils/formatters'

function generateTimeline(collections) {
  if (!collections.length) {
    // Generate synthetic 30-day timeline for demo
    const data = []
    for (let i = 29; i >= 0; i--) {
      const d = new Date()
      d.setDate(d.getDate() - i)
      data.push({
        date: formatShortDate(d.toISOString()),
        kg: Math.round(Math.random() * 15 + 3),
      })
    }
    return data
  }

  const byDate = {}
  collections.forEach((c) => {
    const d = c.created_at ? formatShortDate(c.created_at) : 'Today'
    byDate[d] = (byDate[d] || 0) + (c.weight_kg || 0)
  })
  return Object.entries(byDate).map(([date, kg]) => ({ date, kg: Math.round(kg * 10) / 10 }))
}

const CustomTooltip = ({ active, payload, label }) => {
  if (!active || !payload?.length) return null
  return (
    <div className="glass-card p-3 text-sm">
      <div style={{ color: 'rgba(255,255,255,0.6)' }}>{label}</div>
      <div className="font-semibold text-white mt-1">{payload[0].value} kg collected</div>
    </div>
  )
}

export default function TimelineChart({ collections }) {
  const data = useMemo(() => generateTimeline(collections), [collections])

  return (
    <div className="glass-card p-6">
      <h3 className="text-lg font-semibold text-white mb-5">Collection Activity (30 Days)</h3>
      <ResponsiveContainer width="100%" height={200}>
        <AreaChart data={data} margin={{ top: 4, right: 4, left: -20, bottom: 0 }}>
          <defs>
            <linearGradient id="kgGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#0A7C6E" stopOpacity={0.5} />
              <stop offset="95%" stopColor="#0A7C6E" stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
          <XAxis
            dataKey="date"
            tick={{ fill: 'rgba(255,255,255,0.4)', fontSize: 10 }}
            tickLine={false}
            axisLine={false}
            interval="preserveStartEnd"
          />
          <YAxis
            tick={{ fill: 'rgba(255,255,255,0.4)', fontSize: 10 }}
            tickLine={false}
            axisLine={false}
          />
          <Tooltip content={<CustomTooltip />} />
          <Area
            type="monotone"
            dataKey="kg"
            stroke="#0A7C6E"
            strokeWidth={2}
            fill="url(#kgGradient)"
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  )
}
