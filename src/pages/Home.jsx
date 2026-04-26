import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { useCollections } from '../hooks/useCollections'
import { useCollectors } from '../hooks/useCollectors'
import { formatKg } from '../utils/formatters'
import { SEED_COLLECTORS, DISTRICT_TARGETS } from '../lib/constants'

function AnimatedNumber({ target, suffix = '' }) {
  const [value, setValue] = useState(0)
  const frameRef = useRef(null)

  useEffect(() => {
    let start = null
    const duration = 1800
    const step = (timestamp) => {
      if (!start) start = timestamp
      const progress = Math.min((timestamp - start) / duration, 1)
      const eased = 1 - Math.pow(1 - progress, 3)
      setValue(Math.round(eased * target))
      if (progress < 1) frameRef.current = requestAnimationFrame(step)
    }
    const timeout = setTimeout(() => {
      frameRef.current = requestAnimationFrame(step)
    }, 400)
    return () => {
      clearTimeout(timeout)
      if (frameRef.current) cancelAnimationFrame(frameRef.current)
    }
  }, [target])

  return (
    <span>
      {value.toLocaleString()}
      {suffix}
    </span>
  )
}

function HeroStat({ icon, value, label, color }) {
  return (
    <div
      className="glass-card shimmer-border p-5 text-center animate-fade-up"
      style={{ borderColor: `${color}30` }}
    >
      <div className="text-2xl mb-2">{icon}</div>
      <div className="text-3xl font-black" style={{ color }}>{value}</div>
      <div className="text-sm mt-1" style={{ color: 'rgba(255,255,255,0.55)' }}>{label}</div>
    </div>
  )
}

export default function Home() {
  const { collections } = useCollections()
  const { collectors } = useCollectors()

  const totalKg = collections.reduce((s, c) => s + (c.weight_kg || 0), 0)
  const totalPts = collectors.reduce((s, c) => s + (c.total_points || 0), 0)
  const totalTarget = Object.values(DISTRICT_TARGETS).reduce((s, d) => s + d.target_kg, 0)
  const progress = Math.round((totalKg / totalTarget) * 100)

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero */}
      <section className="relative min-h-screen flex flex-col items-center justify-center text-center px-6 overflow-hidden">
        {/* Background layers */}
        <div
          className="absolute inset-0"
          style={{
            background: 'radial-gradient(ellipse 80% 60% at 50% 70%, #0A7C6E18 0%, transparent 70%), radial-gradient(ellipse 60% 50% at 30% 40%, #1A4B7A20 0%, transparent 60%), #0B1F2E',
          }}
        />

        {/* Animated rings */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          {[300, 500, 700, 900].map((size, i) => (
            <div
              key={size}
              className="absolute rounded-full border"
              style={{
                width: size,
                height: size,
                borderColor: `rgba(10,124,110,${0.06 - i * 0.01})`,
                animation: `pulse ${3 + i * 0.5}s ease-in-out infinite`,
                animationDelay: `${i * 0.4}s`,
              }}
            />
          ))}
        </div>

        {/* Lake wave decoration */}
        <div
          className="absolute bottom-0 left-0 right-0 h-32 pointer-events-none"
          style={{
            background: 'linear-gradient(180deg, transparent 0%, rgba(10,124,110,0.08) 50%, rgba(10,124,110,0.15) 100%)',
          }}
        />

        <div className="relative z-10 max-w-4xl mx-auto">
          {/* Badge */}
          <div
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-8 text-sm font-medium animate-fade-up"
            style={{
              background: 'rgba(10,124,110,0.15)',
              border: '1px solid rgba(10,124,110,0.35)',
              color: '#F5E6C8',
            }}
          >
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse inline-block" />
            Live · Lake Kivu, Rwanda · 3 Districts Active
          </div>

          {/* Tagline */}
          <h1
            className="text-6xl md:text-8xl font-black leading-none tracking-tight mb-6 animate-fade-up delay-100"
            style={{ color: '#FFFFFF' }}
          >
            Track.{' '}
            <span className="gradient-text">Sort.</span>{' '}
            Sustain.
          </h1>

          <p
            className="text-lg md:text-xl max-w-2xl mx-auto leading-relaxed mb-10 animate-fade-up delay-200"
            style={{ color: 'rgba(255,255,255,0.6)' }}
          >
            Sukutera turns plastic collection into a reward economy along the shores of Lake Kivu —
            powered by community collectors, real-time data, and conservation science.
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-14 animate-fade-up delay-300">
            <Link
              to="/log"
              className="animate-pulse-glow px-8 py-4 rounded-2xl font-bold text-base text-white transition-all duration-200 hover:scale-105"
              style={{ background: 'linear-gradient(135deg, #0A7C6E, #0d9e8e)', minWidth: 180 }}
            >
              + Log Collection
            </Link>
            <Link
              to="/map"
              className="px-8 py-4 rounded-2xl font-bold text-base transition-all duration-200 hover:scale-105"
              style={{
                background: 'rgba(255,255,255,0.07)',
                border: '1px solid rgba(255,255,255,0.15)',
                color: 'rgba(255,255,255,0.85)',
                minWidth: 180,
              }}
            >
              🗺 View Live Map
            </Link>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 animate-fade-up delay-400">
            <HeroStat
              icon="♻️"
              value={<AnimatedNumber target={Math.round(totalKg * 10) / 10} suffix=" kg" />}
              label="Plastic Recovered"
              color="#0A7C6E"
            />
            <HeroStat
              icon="👥"
              value={<AnimatedNumber target={collectors.length} />}
              label="Active Collectors"
              color="#1A4B7A"
            />
            <HeroStat
              icon="⭐"
              value={<AnimatedNumber target={totalPts} />}
              label="Points Earned"
              color="#F59E0B"
            />
            <HeroStat
              icon="🎯"
              value={<AnimatedNumber target={progress} suffix="%" />}
              label="Annual Target"
              color="#10B981"
            />
          </div>
        </div>

        {/* Scroll indicator */}
        <div
          className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce"
          style={{ color: 'rgba(255,255,255,0.3)' }}
        >
          <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <path d="M19 9l-7 7-7-7" />
          </svg>
        </div>
      </section>

      {/* Districts section */}
      <section className="py-20 px-6" style={{ background: 'rgba(15,42,61,0.5)' }}>
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-black text-white mb-3">
              3 Districts. One Lake.
            </h2>
            <p className="text-base" style={{ color: 'rgba(255,255,255,0.5)' }}>
              Collection activity across the Lake Kivu shoreline
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { name: 'Rubavu', color: '#3B82F6', km: 28.4, target: 500, icon: '🌊', desc: 'Northern shore near Gisenyi, hub for tourism-related plastic recovery.' },
              { name: 'Karongi', color: '#10B981', km: 42.1, target: 750, icon: '⛵', desc: 'Western peninsula with longest shoreline and highest collection potential.' },
              { name: 'Rusizi', color: '#F59E0B', km: 35.7, target: 620, icon: '🦅', desc: 'Southern delta where the Rusizi River meets the lake — high inflow zone.' },
            ].map((d) => {
              const distKg = collections.filter((c) => c.district === d.name).reduce((s, c) => s + (c.weight_kg || 0), 0)
              const pct = Math.min(Math.round((distKg / d.target) * 100), 100)
              return (
                <div key={d.name} className="glass-card p-6 hover:-translate-y-1 transition-transform duration-200">
                  <div className="flex items-center gap-3 mb-4">
                    <span className="text-3xl">{d.icon}</span>
                    <div>
                      <h3 className="font-bold text-white text-lg">{d.name}</h3>
                      <div className="text-xs" style={{ color: 'rgba(255,255,255,0.45)' }}>
                        {d.km} km shoreline
                      </div>
                    </div>
                  </div>
                  <p className="text-sm mb-5 leading-relaxed" style={{ color: 'rgba(255,255,255,0.55)' }}>
                    {d.desc}
                  </p>
                  <div className="mb-2 flex justify-between text-xs" style={{ color: 'rgba(255,255,255,0.5)' }}>
                    <span>{formatKg(distKg)} collected</span>
                    <span>{pct}% of {formatKg(d.target)}</span>
                  </div>
                  <div className="h-2 rounded-full" style={{ background: 'rgba(255,255,255,0.07)' }}>
                    <div
                      className="h-2 rounded-full transition-all duration-700"
                      style={{ width: `${pct}%`, background: d.color }}
                    />
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-black text-white mb-3">How Sukutera Works</h2>
            <p className="text-base" style={{ color: 'rgba(255,255,255,0.5)' }}>
              A simple loop that rewards conservation
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {[
              { step: '01', icon: '🤿', title: 'Collect', desc: 'Collectors gather plastic from Lake Kivu shorelines and sort by type.' },
              { step: '02', icon: '📱', title: 'Log', desc: 'GPS-tagged submissions with weight, plastic type and photo upload.' },
              { step: '03', icon: '⭐', title: 'Earn', desc: 'Points awarded instantly based on weight and plastic type quality.' },
              { step: '04', icon: '📊', title: 'Impact', desc: 'Real-time dashboard shows progress toward district conservation targets.' },
            ].map((item) => (
              <div key={item.step} className="glass-card p-6 text-center">
                <div
                  className="text-xs font-black mb-3"
                  style={{ color: 'rgba(10,124,110,0.6)', letterSpacing: '0.1em' }}
                >
                  {item.step}
                </div>
                <div className="text-4xl mb-4">{item.icon}</div>
                <h3 className="font-bold text-white mb-2">{item.title}</h3>
                <p className="text-sm leading-relaxed" style={{ color: 'rgba(255,255,255,0.5)' }}>
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Funders */}
      <section className="py-12 px-6" style={{ borderTop: '1px solid rgba(255,255,255,0.06)' }}>
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <p className="text-sm" style={{ color: 'rgba(255,255,255,0.35)' }}>
            Funded & supported by
          </p>
          <div className="flex flex-wrap items-center gap-6">
            <div
              className="px-5 py-2.5 rounded-xl text-sm font-semibold"
              style={{ background: 'rgba(245,230,200,0.06)', border: '1px solid rgba(245,230,200,0.1)', color: 'rgba(245,230,200,0.7)' }}
            >
              National Geographic Society
            </div>
            <div
              className="px-5 py-2.5 rounded-xl text-sm font-semibold"
              style={{ background: 'rgba(26,75,122,0.15)', border: '1px solid rgba(26,75,122,0.25)', color: '#4B8FD5' }}
            >
              The Nature Conservancy
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
