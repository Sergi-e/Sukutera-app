import { useState, useEffect, useRef, useCallback } from 'react'
import { Link } from 'react-router-dom'
import { useCollections } from '../hooks/useCollections'
import { useCollectors } from '../hooks/useCollectors'
import ImpactStats from '../components/dashboard/ImpactStats'
import PlasticBreakdown from '../components/dashboard/PlasticBreakdown'
import TimelineChart from '../components/dashboard/TimelineChart'
import Leaderboard from '../components/collectors/Leaderboard'
import { DISTRICT_TARGETS, PLASTIC_TYPES, DISTRICTS } from '../lib/constants'
import { STAKEHOLDER_CATEGORIES, STAKEHOLDERS } from '../lib/stakeholders'
import { formatKg, percentOf } from '../utils/formatters'

const DEMO_MAX = 5

function weightedPlastic() {
  const r = Math.random()
  if (r < 0.40) return 'PET'
  if (r < 0.70) return 'Mixed'
  if (r < 0.90) return 'HDPE'
  return 'Other'
}

function randomBetween(min, max) {
  return Math.round((Math.random() * (max - min) + min) * 10) / 10
}

// ─── Toast ────────────────────────────────────────────────────────────────────
function Toast({ toast, onDone }) {
  const [leaving, setLeaving] = useState(false)

  useEffect(() => {
    const leaveTimer = setTimeout(() => setLeaving(true), 2600)
    const doneTimer  = setTimeout(() => onDone(toast.id), 3200)
    return () => { clearTimeout(leaveTimer); clearTimeout(doneTimer) }
  }, [toast.id, onDone])

  return (
    <div
      style={{
        background: 'rgba(11,31,46,0.97)',
        border: '1px solid rgba(10,124,110,0.4)',
        borderRadius: 12,
        padding: '12px 16px',
        minWidth: 280,
        maxWidth: 340,
        boxShadow: '0 8px 32px rgba(0,0,0,0.4)',
        animation: leaving ? 'toastOut 0.5s ease forwards' : 'toastIn 0.35s ease forwards',
        pointerEvents: 'none',
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
        <div
          style={{
            width: 36,
            height: 36,
            borderRadius: '50%',
            background: `${PLASTIC_TYPES[toast.type]?.color || '#0A7C6E'}20`,
            border: `1px solid ${PLASTIC_TYPES[toast.type]?.color || '#0A7C6E'}50`,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: 16,
            flexShrink: 0,
          }}
        >
          ♻️
        </div>
        <div>
          <div style={{ fontSize: 13, fontWeight: 700, color: '#FFFFFF', lineHeight: 1.3 }}>
            {toast.name}
          </div>
          <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.6)', marginTop: 2 }}>
            {toast.kg} kg of{' '}
            <span style={{ color: PLASTIC_TYPES[toast.type]?.color }}>{toast.type}</span>
            {' · '}{toast.district}
          </div>
        </div>
        <div style={{ marginLeft: 'auto', textAlign: 'right', flexShrink: 0 }}>
          <div style={{ fontSize: 13, fontWeight: 800, color: '#10B981' }}>+{toast.pts} pts</div>
          <div style={{ fontSize: 10, color: 'rgba(255,255,255,0.35)', marginTop: 1 }}>just now</div>
        </div>
      </div>
      {/* Progress bar */}
      <div style={{ height: 2, background: 'rgba(255,255,255,0.06)', borderRadius: 1, marginTop: 10 }}>
        <div
          style={{
            height: 2,
            background: '#0A7C6E',
            borderRadius: 1,
            animation: 'toastProgress 3s linear forwards',
            width: '100%',
          }}
        />
      </div>
    </div>
  )
}

// ─── Main page ────────────────────────────────────────────────────────────────
export default function ImpactDashboard() {
  const { collections } = useCollections()
  const { collectors } = useCollectors()

  const [demoCollections, setDemoCollections] = useState([])
  const [demoRunning, setDemoRunning]         = useState(false)
  const [demoCount, setDemoCount]             = useState(0)
  const [demoComplete, setDemoComplete]       = useState(false)
  const [highlightKg, setHighlightKg]         = useState(false)
  const [toasts, setToasts]                   = useState([])

  const timerRef = useRef(null)
  const countRef = useRef(0)

  const removeToast = useCallback((id) => {
    setToasts((prev) => prev.filter((t) => t.id !== id))
  }, [])

  const fireOne = useCallback(() => {
    if (!collectors.length) return

    const collector = collectors[Math.floor(Math.random() * collectors.length)]
    const kg        = randomBetween(1.5, 8)
    const type      = weightedPlastic()
    const district  = DISTRICTS[Math.floor(Math.random() * DISTRICTS.length)]
    const pts       = Math.round(kg * (PLASTIC_TYPES[type]?.points || 3))

    const newCol = {
      id: `demo-${Date.now()}`,
      collector_id: collector.id,
      weight_kg: kg,
      plastic_type: type,
      district,
      notes: 'Live demo',
    }

    setDemoCollections((prev) => [...prev, newCol])
    setHighlightKg(true)
    setTimeout(() => setHighlightKg(false), 1200)

    setToasts((prev) => [
      ...prev,
      { id: Date.now(), name: collector.name.split(' ')[0], kg, type, district, pts },
    ])

    countRef.current += 1
    setDemoCount(countRef.current)

    if (countRef.current >= DEMO_MAX) {
      clearInterval(timerRef.current)
      setDemoRunning(false)
      setDemoComplete(true)
    }
  }, [collectors])

  useEffect(() => {
    if (demoRunning) {
      fireOne()
      timerRef.current = setInterval(fireOne, 3000)
    }
    return () => clearInterval(timerRef.current)
  }, [demoRunning, fireOne])

  const startDemo = () => {
    countRef.current = 0
    setDemoCount(0)
    setDemoComplete(false)
    setDemoRunning(true)
  }

  const resetDemo = () => {
    clearInterval(timerRef.current)
    setDemoRunning(false)
    setDemoComplete(false)
    setDemoCount(0)
    setDemoCollections([])
    setToasts([])
    countRef.current = 0
  }

  const allCollections = [...collections, ...demoCollections]

  const districtStats = Object.entries(DISTRICT_TARGETS).map(([name, target]) => {
    const kg = allCollections
      .filter((c) => c.district === name)
      .reduce((s, c) => s + (c.weight_kg || 0), 0)
    const pct = percentOf(kg, target.target_kg)
    const distCollectors = collectors.filter((c) => c.district === name).length
    return { name, kg, pct, target, distCollectors }
  })

  return (
    <div style={{ minHeight: '100vh', paddingTop: 88, paddingBottom: 64, paddingLeft: 24, paddingRight: 24, boxSizing: 'border-box' }}>
      <div style={{ maxWidth: 1200, margin: '0 auto' }}>

        {/* ─── Header ─── */}
        <div style={{ marginBottom: 32 }}>
          <div
            style={{
              display: 'inline-flex', alignItems: 'center', gap: 8,
              padding: '5px 14px', borderRadius: 999, marginBottom: 14,
              background: 'rgba(10,124,110,0.12)', border: '1px solid rgba(10,124,110,0.25)',
              color: '#0A7C6E', fontSize: 12, fontWeight: 600,
            }}
          >
            📊 Impact Dashboard
          </div>
          <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', flexWrap: 'wrap', gap: 16 }}>
            <div>
              <h1 style={{ fontSize: 36, fontWeight: 900, color: '#FFFFFF', margin: 0, lineHeight: 1.1 }}>
                Conservation Impact
              </h1>
              <p style={{ color: 'rgba(255,255,255,0.5)', marginTop: 6, fontSize: 14 }}>
                Real-time tracking across Lake Kivu's three collection districts
              </p>
            </div>

            {/* ─── Demo button cluster ─── */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              {demoComplete ? (
                <>
                  <div
                    style={{
                      padding: '8px 16px', borderRadius: 10, fontSize: 13, fontWeight: 700,
                      background: 'rgba(16,185,129,0.12)', border: '1px solid rgba(16,185,129,0.3)',
                      color: '#10B981',
                    }}
                  >
                    ✓ Demo Complete — {demoCount} collections added
                  </div>
                  <button
                    onClick={resetDemo}
                    style={{
                      padding: '9px 18px', borderRadius: 10, fontSize: 13, fontWeight: 700,
                      background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.12)',
                      color: 'rgba(255,255,255,0.7)', cursor: 'pointer',
                    }}
                  >
                    ↺ Reset Demo
                  </button>
                </>
              ) : demoRunning ? (
                <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                  <div style={{ display: 'flex', gap: 6 }}>
                    {Array.from({ length: DEMO_MAX }).map((_, i) => (
                      <div
                        key={i}
                        style={{
                          width: 8, height: 8, borderRadius: '50%',
                          background: i < demoCount ? '#0A7C6E' : 'rgba(255,255,255,0.12)',
                          transition: 'background 0.3s ease',
                        }}
                      />
                    ))}
                  </div>
                  <div style={{ fontSize: 13, color: 'rgba(255,255,255,0.5)' }}>
                    {demoCount}/{DEMO_MAX} logged…
                  </div>
                </div>
              ) : (
                <button
                  onClick={startDemo}
                  style={{
                    display: 'flex', alignItems: 'center', gap: 8,
                    padding: '10px 22px', borderRadius: 12, fontSize: 14, fontWeight: 700,
                    background: 'linear-gradient(135deg, #0A7C6E, #0d9e8e)',
                    color: '#FFFFFF', border: 'none', cursor: 'pointer',
                    animation: 'pulse-glow 2.5s ease-in-out infinite',
                    boxShadow: '0 0 20px rgba(10,124,110,0.4)',
                  }}
                >
                  ▶ Run Live Demo
                </button>
              )}
            </div>
          </div>
        </div>

        {/* ─── Stat cards ─── */}
        <div style={{ marginBottom: 32 }}>
          <ImpactStats
            collections={allCollections}
            collectors={collectors}
            highlightKg={highlightKg}
          />
        </div>

        {/* ─── Charts ─── */}
        <div className="impact-charts-grid">
          <div style={{ minWidth: 0 }}>
            <TimelineChart collections={allCollections} />
          </div>
          <div style={{ minWidth: 0 }}>
            <PlasticBreakdown collections={allCollections} />
          </div>
        </div>

        {/* ─── District progress ─── */}
        <div
          style={{
            background: 'rgba(15,42,61,0.7)', backdropFilter: 'blur(16px)',
            border: '1px solid rgba(255,255,255,0.07)', borderRadius: 16,
            padding: 24, marginBottom: 24,
          }}
        >
          <h3 style={{ fontSize: 16, fontWeight: 700, color: '#FFFFFF', marginBottom: 20 }}>
            District Progress
          </h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
            {districtStats.map(({ name, kg, pct, target, distCollectors }) => {
              const colors = { Rubavu: '#3B82F6', Karongi: '#10B981', Rusizi: '#F59E0B' }
              const color = colors[name] || '#0A7C6E'
              return (
                <div key={name}>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 8 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                      <div style={{ width: 10, height: 10, borderRadius: '50%', background: color }} />
                      <span style={{ fontWeight: 700, color: '#FFFFFF', fontSize: 14 }}>{name}</span>
                      <span style={{ fontSize: 12, color: 'rgba(255,255,255,0.4)' }}>
                        {distCollectors} collector{distCollectors !== 1 ? 's' : ''}
                      </span>
                    </div>
                    <div style={{ textAlign: 'right' }}>
                      <span style={{ fontSize: 14, fontWeight: 700, color: '#FFFFFF' }}>{formatKg(kg)}</span>
                      <span style={{ fontSize: 12, marginLeft: 8, color: 'rgba(255,255,255,0.4)' }}>
                        / {formatKg(target.target_kg)} target
                      </span>
                    </div>
                  </div>
                  <div style={{ height: 10, borderRadius: 5, background: 'rgba(255,255,255,0.06)' }}>
                    <div
                      style={{
                        height: 10, borderRadius: 5,
                        width: `${pct}%`,
                        background: `linear-gradient(90deg, ${color}80, ${color})`,
                        boxShadow: `0 0 10px ${color}40`,
                        transition: 'width 0.8s ease',
                      }}
                    />
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 4 }}>
                    <span style={{ fontSize: 11, color: 'rgba(255,255,255,0.35)' }}>
                      {target.shoreline_km} km shoreline
                    </span>
                    <span style={{ fontSize: 11, fontWeight: 600, color }}>{pct}%</span>
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        {/* ─── Partner ecosystem strip ─── */}
        <div
          style={{
            background: 'rgba(15,42,61,0.7)',
            backdropFilter: 'blur(16px)',
            border: '1px solid rgba(255,255,255,0.07)',
            borderRadius: 16,
            padding: '20px 24px',
            marginBottom: 24,
            display: 'flex',
            flexWrap: 'wrap',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: 16,
          }}
        >
          <div>
            <h3 style={{ fontSize: 16, fontWeight: 700, color: '#FFFFFF', marginBottom: 6 }}>
              Partner Ecosystem
            </h3>
            <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.45)', margin: 0, maxWidth: 480 }}>
              {STAKEHOLDERS.length} verified partners across collection, recycling, and compost — closing the circular economy loop.
            </p>
          </div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10, alignItems: 'center' }}>
            {Object.values(STAKEHOLDER_CATEGORIES).map((cat) => (
              <div
                key={cat.id}
                style={{
                  padding: '6px 12px',
                  borderRadius: 999,
                  fontSize: 11,
                  fontWeight: 600,
                  background: `${cat.color}12`,
                  color: cat.color,
                  border: `1px solid ${cat.color}28`,
                }}
              >
                {STAKEHOLDERS.filter((s) => s.category === cat.id).length} {cat.label.split(' ')[0].toLowerCase()}
              </div>
            ))}
            <Link
              to="/ecosystem"
              style={{
                padding: '8px 16px',
                borderRadius: 10,
                background: 'rgba(10,124,110,0.15)',
                border: '1px solid rgba(10,124,110,0.35)',
                color: '#0A7C6E',
                fontSize: 13,
                fontWeight: 700,
                textDecoration: 'none',
              }}
            >
              View Directory →
            </Link>
          </div>
        </div>

        {/* ─── Bottom grid ─── */}
        <div className="impact-bottom-grid">
          <Leaderboard collectors={collectors} compact limit={5} />
          <div
            className="impact-recent-panel"
            style={{
              background: 'rgba(15,42,61,0.7)', backdropFilter: 'blur(16px)',
              border: '1px solid rgba(255,255,255,0.07)', borderRadius: 16, padding: 24,
              minWidth: 0,
            }}
          >
            <h3 style={{ fontSize: 16, fontWeight: 700, color: '#FFFFFF', marginBottom: 16 }}>
              Recent Collections
            </h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              {allCollections.slice(0, 8).map((c, i) => {
                const typeColor = PLASTIC_TYPES[c.plastic_type]?.color || '#6B7280'
                const pts = (PLASTIC_TYPES[c.plastic_type]?.points || 3) * Math.round(c.weight_kg)
                const isDemo = c.id?.startsWith('demo-')
                return (
                  <div
                    key={i}
                    style={{
                      display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                      padding: '10px 14px', borderRadius: 10,
                      background: isDemo ? 'rgba(10,124,110,0.08)' : 'rgba(255,255,255,0.03)',
                      border: isDemo ? '1px solid rgba(10,124,110,0.25)' : '1px solid rgba(255,255,255,0.05)',
                      transition: 'all 0.3s ease',
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                      <div style={{ width: 8, height: 8, borderRadius: '50%', background: typeColor, boxShadow: `0 0 6px ${typeColor}`, flexShrink: 0 }} />
                      <div>
                        <div style={{ fontSize: 13, fontWeight: 600, color: '#FFFFFF' }}>
                          {c.district || 'Lake Kivu'}
                          {isDemo && <span style={{ marginLeft: 6, fontSize: 10, color: '#0A7C6E', fontWeight: 700 }}>DEMO</span>}
                        </div>
                        <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.4)' }}>{c.notes || c.plastic_type}</div>
                      </div>
                    </div>
                    <div style={{ textAlign: 'right' }}>
                      <div style={{ fontSize: 13, fontWeight: 700, color: '#F5E6C8' }}>{formatKg(c.weight_kg)}</div>
                      <div style={{ fontSize: 11, color: typeColor }}>+{pts} pts</div>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      </div>

      {/* ─── Toast container ─── */}
      <div
        style={{
          position: 'fixed', bottom: 24, right: 24,
          display: 'flex', flexDirection: 'column', gap: 10,
          zIndex: 1000,
        }}
      >
        {toasts.map((t) => (
          <Toast key={t.id} toast={t} onDone={removeToast} />
        ))}
      </div>
    </div>
  )
}
