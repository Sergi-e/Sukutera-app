import { useMemo, useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { formatKg, percentOf } from '../../utils/formatters'
import { DISTRICT_TARGETS } from '../../lib/constants'
import { STAKEHOLDERS } from '../../lib/stakeholders'

function AnimatedKg({ target }) {
  const [displayed, setDisplayed] = useState(target)
  const prevRef = useRef(target)
  const frameRef = useRef(null)

  useEffect(() => {
    const from = prevRef.current
    const to = target
    if (from === to) return

    const duration = 900
    let start = null

    const step = (ts) => {
      if (!start) start = ts
      const p = Math.min((ts - start) / duration, 1)
      const eased = 1 - Math.pow(1 - p, 3)
      setDisplayed(from + (to - from) * eased)
      if (p < 1) {
        frameRef.current = requestAnimationFrame(step)
      } else {
        prevRef.current = to
      }
    }

    if (frameRef.current) cancelAnimationFrame(frameRef.current)
    frameRef.current = requestAnimationFrame(step)
    return () => { if (frameRef.current) cancelAnimationFrame(frameRef.current) }
  }, [target])

  return <span>{formatKg(displayed)}</span>
}

function StatCard({ label, value, sub, color, delay, icon, highlight, href }) {
  const inner = (
    <div
      className="glass-card shimmer-border animate-fade-up"
      style={{
        animationDelay: delay,
        padding: 24,
        transition: 'box-shadow 0.4s ease, transform 0.2s ease',
        boxShadow: highlight ? `0 0 28px ${color}55` : undefined,
        height: '100%',
      }}
    >
      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: 12 }}>
        <span style={{ fontSize: 28 }}>{icon}</span>
        <span
          style={{
            fontSize: 11,
            fontWeight: 600,
            padding: '3px 9px',
            borderRadius: 999,
            background: `${color}20`,
            color,
          }}
        >
          Live
        </span>
      </div>
      <div style={{ fontSize: 30, fontWeight: 900, color, lineHeight: 1, marginTop: 4 }}>
        {value}
      </div>
      <div style={{ fontSize: 13, fontWeight: 600, color: '#FFFFFF', marginTop: 6 }}>{label}</div>
      {sub && (
        <div style={{ fontSize: 11, marginTop: 4, color: 'rgba(255,255,255,0.45)' }}>{sub}</div>
      )}
    </div>
  )

  if (href) {
    return (
      <Link to={href} style={{ textDecoration: 'none', display: 'block' }}>
        {inner}
      </Link>
    )
  }

  return inner
}

export default function ImpactStats({ collections, collectors, highlightKg }) {
  const stats = useMemo(() => {
    const totalKg = collections.reduce((s, c) => s + (c.weight_kg || 0), 0)
    const totalCollectors = collectors.length
    const totalPoints = collectors.reduce((s, c) => s + (c.total_points || 0), 0)
    const totalTarget = Object.values(DISTRICT_TARGETS).reduce((s, d) => s + d.target_kg, 0)
    const progress = percentOf(totalKg, totalTarget)
    return { totalKg, totalCollectors, totalPoints, progress, totalTarget }
  }, [collections, collectors])

  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 16 }}>
      <StatCard
        icon="🏔️"
        label="Plastic Collected"
        value={<AnimatedKg target={stats.totalKg} />}
        sub="from Lake Kivu shores"
        color="#0A7C6E"
        delay="0s"
        highlight={highlightKg}
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
      <StatCard
        icon="🔗"
        label="Ecosystem Partners"
        value={STAKEHOLDERS.length}
        sub="collectors · recyclers · compost"
        color="#48CAE4"
        delay="0.4s"
        href="/ecosystem"
      />
    </div>
  )
}
