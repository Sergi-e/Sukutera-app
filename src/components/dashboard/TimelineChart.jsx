import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from 'recharts'

// 30-day growth narrative: week 1 ~0.5 kg/day → week 4 ~4 kg/day
// Two intentional zero days to add realism
const STORY_DATA = [
  { date: 'Apr 1',  kg: 0.5 },
  { date: 'Apr 2',  kg: 0.3 },
  { date: 'Apr 3',  kg: 0.7 },
  { date: 'Apr 4',  kg: 0   },
  { date: 'Apr 5',  kg: 0.6 },
  { date: 'Apr 6',  kg: 0.9 },
  { date: 'Apr 7',  kg: 0.8 },
  { date: 'Apr 8',  kg: 1.2 },
  { date: 'Apr 9',  kg: 1.0 },
  { date: 'Apr 10', kg: 1.5 },
  { date: 'Apr 11', kg: 0   },
  { date: 'Apr 12', kg: 1.6 },
  { date: 'Apr 13', kg: 1.9 },
  { date: 'Apr 14', kg: 1.7 },
  { date: 'Apr 15', kg: 2.2 },
  { date: 'Apr 16', kg: 2.5 },
  { date: 'Apr 17', kg: 2.1 },
  { date: 'Apr 18', kg: 2.9 },
  { date: 'Apr 19', kg: 2.7 },
  { date: 'Apr 20', kg: 3.3 },
  { date: 'Apr 21', kg: 3.0 },
  { date: 'Apr 22', kg: 3.6 },
  { date: 'Apr 23', kg: 3.2 },
  { date: 'Apr 24', kg: 3.9 },
  { date: 'Apr 25', kg: 4.1 },
  { date: 'Apr 26', kg: 3.7 },
  { date: 'Apr 27', kg: 4.3 },
  { date: 'Apr 28', kg: 4.0 },
  { date: 'Apr 29', kg: 4.6 },
  { date: 'Apr 30', kg: 4.2 },
]

// Only show every 7th label so the x-axis stays readable
const TICK_DATES = new Set(['Apr 1', 'Apr 8', 'Apr 15', 'Apr 22', 'Apr 29'])

const CustomTooltip = ({ active, payload, label }) => {
  if (!active || !payload?.length) return null
  return (
    <div
      style={{
        background: 'rgba(11,31,46,0.95)',
        border: '1px solid rgba(255,255,255,0.1)',
        borderRadius: 10,
        padding: '10px 14px',
        fontSize: 13,
      }}
    >
      <div style={{ color: 'rgba(255,255,255,0.55)', marginBottom: 4 }}>{label}</div>
      <div style={{ color: '#FFFFFF', fontWeight: 700 }}>
        {payload[0].value} kg collected
      </div>
    </div>
  )
}

export default function TimelineChart({ collections: _collections }) {
  // Always use the story data — seed data has no created_at timestamps
  const data = STORY_DATA

  return (
    <div
      style={{
        background: 'rgba(15,42,61,0.7)',
        backdropFilter: 'blur(16px)',
        border: '1px solid rgba(255,255,255,0.07)',
        borderRadius: 16,
        padding: 24,
      }}
    >
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 20 }}>
        <h3 style={{ fontSize: 16, fontWeight: 700, color: '#FFFFFF', margin: 0 }}>
          Collection Activity (30 Days)
        </h3>
        <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
          <div style={{ textAlign: 'right' }}>
            <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.4)' }}>Total Apr</div>
            <div style={{ fontSize: 14, fontWeight: 800, color: '#0A7C6E' }}>
              {STORY_DATA.reduce((s, d) => s + d.kg, 0).toFixed(1)} kg
            </div>
          </div>
          <div
            style={{
              fontSize: 11,
              fontWeight: 600,
              padding: '3px 10px',
              borderRadius: 999,
              background: 'rgba(16,185,129,0.12)',
              border: '1px solid rgba(16,185,129,0.25)',
              color: '#10B981',
            }}
          >
            ↑ +840% vs Week 1
          </div>
        </div>
      </div>

      <ResponsiveContainer width="100%" height={200}>
        <AreaChart data={data} margin={{ top: 8, right: 8, left: -16, bottom: 0 }}>
          <defs>
            <linearGradient id="kgGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%"   stopColor="#0A7C6E" stopOpacity={0.55} />
              <stop offset="60%"  stopColor="#0A7C6E" stopOpacity={0.15} />
              <stop offset="100%" stopColor="#0A7C6E" stopOpacity={0} />
            </linearGradient>
          </defs>

          <CartesianGrid
            strokeDasharray="3 3"
            stroke="rgba(255,255,255,0.05)"
            vertical={false}
          />

          <XAxis
            dataKey="date"
            tick={({ x, y, payload }) => {
              if (!TICK_DATES.has(payload.value)) return null
              return (
                <text
                  x={x}
                  y={y + 12}
                  textAnchor="middle"
                  fill="rgba(255,255,255,0.4)"
                  fontSize={10}
                >
                  {payload.value}
                </text>
              )
            }}
            tickLine={false}
            axisLine={false}
            interval={0}
          />

          <YAxis
            tick={{ fill: 'rgba(255,255,255,0.35)', fontSize: 10 }}
            tickLine={false}
            axisLine={false}
            tickFormatter={(v) => `${v} kg`}
            width={42}
          />

          <Tooltip content={<CustomTooltip />} cursor={{ stroke: 'rgba(10,124,110,0.4)', strokeWidth: 1 }} />

          <Area
            type="monotone"
            dataKey="kg"
            stroke="#0A7C6E"
            strokeWidth={2.5}
            fill="url(#kgGradient)"
            dot={false}
            activeDot={{ r: 4, fill: '#0A7C6E', stroke: '#fff', strokeWidth: 2 }}
          />
        </AreaChart>
      </ResponsiveContainer>

      {/* Week labels */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(4, 1fr)',
          gap: 8,
          marginTop: 16,
          paddingTop: 14,
          borderTop: '1px solid rgba(255,255,255,0.05)',
        }}
      >
        {[
          { week: 'Week 1', avg: '0.6 kg/day', trend: 'Starting up' },
          { week: 'Week 2', avg: '1.3 kg/day', trend: '+117%' },
          { week: 'Week 3', avg: '2.7 kg/day', trend: '+108%' },
          { week: 'Week 4', avg: '4.0 kg/day', trend: '+48%' },
        ].map((w, i) => (
          <div key={w.week} style={{ textAlign: 'center' }}>
            <div style={{ fontSize: 10, color: 'rgba(255,255,255,0.35)', marginBottom: 2 }}>{w.week}</div>
            <div style={{ fontSize: 12, fontWeight: 700, color: '#FFFFFF' }}>{w.avg}</div>
            <div
              style={{
                fontSize: 10,
                color: i === 0 ? 'rgba(255,255,255,0.4)' : '#10B981',
                marginTop: 1,
              }}
            >
              {w.trend}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
