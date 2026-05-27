import { useMemo, useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import AnimateInView from '../ui/AnimateInView'
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

function StatCard({ label, value, sub, color, icon, highlight, href, index }) {
  const inner = (
    <div
      className="glass-card shimmer-border"
      style={{
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

  const card = href ? (
    <Link to={href} style={{ textDecoration: 'none', display: 'block', height: '100%' }}>
      {inner}
    </Link>
  ) : inner

  return (
    <AnimateInView variant="fade-up" delay={index * 100}>
      {card}
    </AnimateInView>
  )
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

  const cards = [
    {
      icon: '🏔️',
      label: 'Plastic Collected',
      value: <AnimatedKg target={stats.totalKg} />,
      sub: 'from Lake Kivu shores',
      color: '#0A7C6E',
      highlight: highlightKg,
    },
    {
      icon: '👥',
      label: 'Active Collectors',
      value: stats.totalCollectors,
      sub: 'across 3 districts',
      color: '#1A4B7A',
    },
    {
      icon: '⭐',
      label: 'Points Awarded',
      value: stats.totalPoints.toLocaleString(),
      sub: 'community incentives',
      color: '#F59E0B',
    },
    {
      icon: '🎯',
      label: 'Target Progress',
      value: `${stats.progress}%`,
      sub: `of ${formatKg(stats.totalTarget)} goal`,
      color: '#10B981',
    },
    {
      icon: '🔗',
      label: 'Ecosystem Partners',
      value: STAKEHOLDERS.length,
      sub: 'collectors · recyclers · compost',
      color: '#48CAE4',
      href: '/ecosystem',
    },
  ]

  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 16 }}>
      {cards.map((card, i) => (
        <StatCard key={card.label} {...card} index={i} />
      ))}
    </div>
  )
}
