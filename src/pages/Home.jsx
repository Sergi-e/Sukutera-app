import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { useCollections } from '../hooks/useCollections'
import { useCollectors } from '../hooks/useCollectors'
import { formatKg } from '../utils/formatters'
import { DISTRICT_TARGETS } from '../lib/constants'
import { STAKEHOLDER_CATEGORIES, STAKEHOLDERS } from '../lib/stakeholders'
import AnimateInView from '../components/ui/AnimateInView'
import LiveActivityFeed from '../components/home/LiveActivityFeed'
import WhyItMatters from '../components/home/WhyItMatters'
import HeroBackground from '../components/home/HeroBackground'
import FieldResearchGallery from '../components/home/FieldResearchGallery'

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
    }, 600)
    return () => {
      clearTimeout(timeout)
      if (frameRef.current) cancelAnimationFrame(frameRef.current)
    }
  }, [target])

  return <span>{value.toLocaleString()}{suffix}</span>
}

function StatCard({ icon, value, label, color, index }) {
  return (
    <AnimateInView variant="fade-up" delay={index * 100}>
      <div
        style={{
          background: 'rgba(15,42,61,0.7)',
          backdropFilter: 'blur(16px)',
          border: `1px solid ${color}30`,
          borderRadius: 16,
          padding: '20px 16px',
          textAlign: 'center',
        }}
      >
        <div style={{ fontSize: 28, marginBottom: 8 }}>{icon}</div>
        <div style={{ fontSize: 28, fontWeight: 900, color, lineHeight: 1 }}>{value}</div>
        <div style={{ fontSize: 13, marginTop: 6, color: 'rgba(255,255,255,0.55)' }}>{label}</div>
      </div>
    </AnimateInView>
  )
}

export default function Home() {
  const { collections } = useCollections()
  const { collectors } = useCollectors()

  const totalKg = collections.reduce((s, c) => s + (c.weight_kg || 0), 0)
  const totalTarget = Object.values(DISTRICT_TARGETS).reduce((s, d) => s + d.target_kg, 0)
  const shorelineCoverage = Object.values(DISTRICT_TARGETS).reduce((s, d) => s + d.shoreline_km, 0)
  const coveragePct = Math.min(Math.round((totalKg / totalTarget) * 100), 100)

  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>

      {/* ─── HERO ─────────────────────────────────────────────────────── */}
      <section
        className="hero-section"
        style={{
          position: 'relative',
          minHeight: '100vh',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          textAlign: 'center',
          padding: '120px 24px 80px',
          overflow: 'hidden',
        }}
      >
        <HeroBackground />

        {/* Pulsing rings */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            pointerEvents: 'none',
            zIndex: 1,
          }}
        >
          {[320, 520, 720, 920].map((size, i) => (
            <div
              key={size}
              style={{
                position: 'absolute',
                width: size,
                height: size,
                borderRadius: '50%',
                border: `1px solid rgba(10,124,110,${0.07 - i * 0.015})`,
                animation: `ping ${4 + i * 0.6}s ease-in-out infinite`,
                animationDelay: `${i * 0.5}s`,
              }}
            />
          ))}
        </div>

        {/* Wave footer */}
        <div
          style={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            height: 120,
            background:
              'linear-gradient(180deg, transparent 0%, rgba(10,124,110,0.07) 50%, rgba(10,124,110,0.13) 100%)',
            zIndex: 1,
          }}
        />

        {/* ─── Content ─── */}
        <div style={{ position: 'relative', zIndex: 2, maxWidth: 860, width: '100%', margin: '0 auto' }}>

          {/* Live status — editorial chip, no pill */}
          <div className="animate-fade-up live-chip" style={{ animationDelay: '0s', marginBottom: 32 }}>
            <span
              style={{
                width: 6,
                height: 6,
                borderRadius: '50%',
                background: '#34d399',
                display: 'inline-block',
                flexShrink: 0,
                animation: 'pulse 2.5s ease-in-out infinite',
              }}
            />
            Live · Lake Kivu, Rwanda · 3 Districts Active
          </div>

          {/* SUKUTERA — Fraunces italic, the editorial serif with calligraphic warmth */}
          <h1
            className="animate-fade-up heading-display"
            style={{
              animationDelay: '0.1s',
              fontSize: 'clamp(58px, 11vw, 116px)',
              fontWeight: 800,
              marginBottom: 18,
            }}
          >
            Sukutera
          </h1>

          {/* Tagline — Space Grotesk uppercase, contrasts against the serif above */}
          <p
            className="animate-fade-up"
            style={{
              animationDelay: '0.2s',
              fontFamily: 'var(--font-sans)',
              fontSize: 'clamp(13px, 2.2vw, 17px)',
              fontWeight: 600,
              letterSpacing: '0.22em',
              textTransform: 'uppercase',
              color: 'var(--color-kivu)',
              marginBottom: 28,
            }}
          >
            Track · Sort · Sustain
          </p>

          {/* Sub-copy */}
          <p
            className="animate-fade-up"
            style={{
              animationDelay: '0.3s',
              fontFamily: 'var(--font-sans)',
              fontSize: 16,
              color: 'var(--color-stone)',
              lineHeight: 1.75,
              maxWidth: 540,
              margin: '0 auto 44px',
              fontWeight: 400,
            }}
          >
            Sukutera turns plastic collection into a reward economy along the shores of Lake
            Kivu — powered by community collectors, real-time data, and conservation science.
          </p>

          {/* CTA buttons */}
          <div
            className="animate-fade-up"
            style={{
              animationDelay: '0.4s',
              display: 'flex',
              flexWrap: 'wrap',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 14,
              marginBottom: 56,
            }}
          >
            <Link
              to="/log"
              style={{
                display: 'inline-block',
                padding: '13px 30px',
                borderRadius: 6,
                background: 'var(--color-kivu)',
                color: '#fff',
                fontFamily: 'var(--font-sans)',
                fontWeight: 600,
                fontSize: 14,
                letterSpacing: '0.04em',
                textDecoration: 'none',
                minWidth: 156,
                textAlign: 'center',
              }}
            >
              Log Collection
            </Link>
            <Link
              to="/map"
              style={{
                display: 'inline-block',
                padding: '12px 30px',
                borderRadius: 6,
                background: 'transparent',
                border: '1px solid rgba(238,228,202,0.22)',
                color: 'var(--color-parchment)',
                fontFamily: 'var(--font-sans)',
                fontWeight: 600,
                fontSize: 14,
                letterSpacing: '0.04em',
                textDecoration: 'none',
                minWidth: 156,
                textAlign: 'center',
              }}
            >
              View Live Map
            </Link>
            <Link
              to="/ecosystem"
              style={{
                display: 'inline-block',
                padding: '12px 30px',
                borderRadius: 6,
                background: 'transparent',
                border: '1px solid rgba(12,148,133,0.30)',
                color: 'var(--color-kivu)',
                fontFamily: 'var(--font-sans)',
                fontWeight: 600,
                fontSize: 14,
                letterSpacing: '0.04em',
                textDecoration: 'none',
                minWidth: 156,
                textAlign: 'center',
              }}
            >
              Partner Ecosystem
            </Link>
          </div>

          {/* ─── Editorial stat bar — DM Mono numbers, no card boxes ─── */}
          <div
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              justifyContent: 'center',
              gap: 0,
              maxWidth: 720,
              margin: '0 auto',
              borderTop: '1px solid rgba(238,228,202,0.10)',
              paddingTop: 28,
            }}
          >
            {[
              { value: Math.round(totalKg * 10) / 10, suffix: ' kg', label: 'Plastic Recovered', color: 'var(--color-kivu)' },
              { value: collectors.length, suffix: '', label: 'Active Collectors', color: 'var(--color-parchment)' },
              { value: shorelineCoverage, suffix: ' km', label: 'Shoreline Coverage', color: 'var(--color-parchment)' },
              { value: STAKEHOLDERS.length, suffix: '', label: 'Ecosystem Partners', color: 'var(--color-ember)' },
            ].map((s, i) => (
              <div
                key={s.label}
                style={{
                  flex: '1 1 150px',
                  padding: '0 20px 4px',
                  textAlign: 'center',
                  borderRight: i < 3 ? '1px solid rgba(238,228,202,0.08)' : 'none',
                }}
              >
                <div
                  className="metric-value"
                  style={{ fontSize: 'clamp(24px, 4vw, 36px)', color: s.color, marginBottom: 5 }}
                >
                  <AnimatedNumber target={s.value} suffix={s.suffix} />
                </div>
                <div style={{ fontSize: 10, fontWeight: 500, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--color-muted)' }}>
                  {s.label}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Scroll indicator */}
        <a
          href="#districts"
          aria-label="Scroll to districts"
          style={{
            position: 'absolute',
            bottom: 28,
            left: '50%',
            transform: 'translateX(-50%)',
            color: 'rgba(255,255,255,0.25)',
            animation: 'bounce 2s infinite',
            textDecoration: 'none',
          }}
        >
          <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <path d="M19 9l-7 7-7-7" />
          </svg>
        </a>
      </section>

      {/* ─── DISTRICTS ──────────────────────────────────────────────────── */}
      <section id="districts" style={{ padding: '80px 24px', background: 'rgba(15,42,61,0.45)' }}>
        <div style={{ maxWidth: 1120, margin: '0 auto' }}>
          <AnimateInView variant="fade-left">
            <div style={{ textAlign: 'center', marginBottom: 48 }}>
              <div className="eyebrow-label" style={{ justifyContent: 'center', borderLeft: 'none', borderBottom: '1px solid var(--color-kivu)', paddingLeft: 0, paddingBottom: 8, marginBottom: 16, display: 'inline-flex' }}>Coverage</div>
              <h2 className="heading-section" style={{ fontSize: 'clamp(26px, 4vw, 38px)', marginBottom: 12 }}>
                3 Districts. One Lake.
              </h2>
              <p style={{ color: 'var(--color-stone)', fontSize: 15, fontFamily: 'var(--font-sans)' }}>
                Collection activity across the Lake Kivu shoreline
              </p>
            </div>
          </AnimateInView>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 20 }}>
            {[
              { name: 'Rubavu', color: '#3B82F6', km: 28.4, target: 500, icon: '🌊', desc: 'Northern shore near Gisenyi, hub for tourism-related plastic recovery.' },
              { name: 'Karongi', color: '#10B981', km: 42.1, target: 750, icon: '⛵', desc: 'Western peninsula with longest shoreline and highest collection potential.' },
              { name: 'Rusizi', color: '#F59E0B', km: 35.7, target: 620, icon: '🦅', desc: 'Southern delta where the Rusizi River meets the lake — high inflow zone.' },
            ].map((d, di) => {
              const distKg = collections
                .filter((c) => c.district === d.name)
                .reduce((s, c) => s + (c.weight_kg || 0), 0)
              const pct = Math.min(Math.round((distKg / d.target) * 100), 100)
              return (
                <AnimateInView key={d.name} variant="fade-up" delay={di * 100}>
                  <div
                    style={{
                      background: 'rgba(15,42,61,0.7)',
                      backdropFilter: 'blur(16px)',
                      border: '1px solid rgba(255,255,255,0.07)',
                      borderRadius: 16,
                      padding: 24,
                      height: '100%',
                    }}
                  >
                  <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 14 }}>
                    <span style={{ fontSize: 30 }}>{d.icon}</span>
                    <div>
                      <div style={{ fontWeight: 700, color: '#FFFFFF', fontSize: 17 }}>{d.name}</div>
                      <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.4)' }}>{d.km} km shoreline</div>
                    </div>
                  </div>
                  <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.55)', lineHeight: 1.6, marginBottom: 18 }}>
                    {d.desc}
                  </p>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 12, color: 'rgba(255,255,255,0.45)', marginBottom: 8 }}>
                    <span>{formatKg(distKg)} collected</span>
                    <span>{pct}% of {formatKg(d.target)}</span>
                  </div>
                  <div style={{ height: 6, borderRadius: 3, background: 'rgba(255,255,255,0.07)' }}>
                    <div style={{ height: 6, borderRadius: 3, width: `${pct}%`, background: d.color, transition: 'width 0.8s ease' }} />
                  </div>
                  </div>
                </AnimateInView>
              )
            })}
          </div>
        </div>
      </section>

      <LiveActivityFeed collections={collections} collectors={collectors} />
      <WhyItMatters />
      <FieldResearchGallery />

      {/* ─── HOW IT WORKS ───────────────────────────────────────────────── */}
      <section style={{ padding: '80px 24px' }}>
        <div style={{ maxWidth: 1120, margin: '0 auto' }}>
          <AnimateInView variant="fade-left">
            <div style={{ textAlign: 'center', marginBottom: 48 }}>
              <div className="eyebrow-label" style={{ justifyContent: 'center', borderLeft: 'none', borderBottom: '1px solid var(--color-kivu)', paddingLeft: 0, paddingBottom: 8, marginBottom: 16, display: 'inline-flex' }}>Process</div>
              <h2 className="heading-section" style={{ fontSize: 'clamp(26px, 4vw, 38px)', marginBottom: 12 }}>
                How Sukutera Works
              </h2>
              <p style={{ color: 'var(--color-stone)', fontSize: 15, fontFamily: 'var(--font-sans)' }}>
                A simple loop that rewards conservation
              </p>
            </div>
          </AnimateInView>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 20 }}>
            {[
              { step: '01', icon: '🤿', title: 'Collect', desc: 'Gather plastic from Lake Kivu shorelines and sort by type.' },
              { step: '02', icon: '📱', title: 'Log', desc: 'GPS-tagged submissions with weight, plastic type and optional photo.' },
              { step: '03', icon: '⭐', title: 'Earn', desc: 'Points awarded instantly — PET earns most, Mixed earns least.' },
              { step: '04', icon: '🔗', title: 'Connect', desc: 'Verified recyclers and compost processors receive sorted waste through the ecosystem.' },
              { step: '05', icon: '📊', title: 'Impact', desc: 'Real-time dashboard tracks progress toward district conservation targets.' },
            ].map((item) => (
              <div
                key={item.step}
                style={{
                  background: 'rgba(15,42,61,0.7)',
                  border: '1px solid rgba(255,255,255,0.07)',
                  borderRadius: 16,
                  padding: '28px 20px',
                  textAlign: 'center',
                }}
              >
                <div style={{ fontSize: 11, fontWeight: 900, color: 'rgba(10,124,110,0.7)', letterSpacing: '0.12em', marginBottom: 12 }}>
                  {item.step}
                </div>
                <div style={{ fontSize: 38, marginBottom: 14 }}>{item.icon}</div>
                <div style={{ fontWeight: 700, color: '#FFFFFF', marginBottom: 8, fontSize: 16 }}>{item.title}</div>
                <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.5)', lineHeight: 1.6 }}>{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── ECOSYSTEM PREVIEW ──────────────────────────────────────────── */}
      <section style={{ padding: '80px 24px', background: 'rgba(15,42,61,0.45)' }}>
        <div style={{ maxWidth: 1120, margin: '0 auto' }}>
          <AnimateInView variant="fade-left">
            <div style={{ textAlign: 'center', marginBottom: 48 }}>
              <div className="eyebrow-label" style={{ justifyContent: 'center', borderLeft: 'none', borderBottom: '1px solid var(--color-kivu)', paddingLeft: 0, paddingBottom: 8, marginBottom: 16, display: 'inline-flex' }}>Partners</div>
              <h2 className="heading-section" style={{ fontSize: 'clamp(26px, 4vw, 38px)', marginBottom: 12 }}>
                Partner Ecosystem
              </h2>
              <p style={{ color: 'var(--color-stone)', fontSize: 15, fontFamily: 'var(--font-sans)', maxWidth: 520, margin: '0 auto' }}>
                Collectors, recyclers, and compost processors working together across Rwanda&apos;s circular economy
              </p>
            </div>
          </AnimateInView>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 20, marginBottom: 32 }}>
            {Object.values(STAKEHOLDER_CATEGORIES).map((category) => {
              const partners = STAKEHOLDERS.filter((s) => s.category === category.id)
              return (
                <div
                  key={category.id}
                  style={{
                    background: 'rgba(15,42,61,0.7)',
                    border: `1px solid ${category.color}25`,
                    borderLeft: `4px solid ${category.color}`,
                    borderRadius: 16,
                    padding: 24,
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 16 }}>
                    <span style={{ fontSize: 24 }}>{category.icon}</span>
                    <div>
                      <div style={{ fontWeight: 700, color: '#FFFFFF', fontSize: 16 }}>{category.label}</div>
                      <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.4)' }}>{partners.length} partners</div>
                    </div>
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                    {partners.slice(0, 3).map((p) => (
                      <div key={p.id} style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                        <div
                          style={{
                            width: 32,
                            height: 32,
                            borderRadius: 8,
                            flexShrink: 0,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            fontSize: 11,
                            fontWeight: 800,
                            color: '#fff',
                            background: `${category.color}30`,
                            border: `1px solid ${category.color}45`,
                          }}
                        >
                          {p.initials}
                        </div>
                        <div style={{ minWidth: 0 }}>
                          <div style={{ fontSize: 13, fontWeight: 600, color: '#fff', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                            {p.name}
                          </div>
                          <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.4)' }}>{p.district}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )
            })}
          </div>

          <div style={{ textAlign: 'center' }}>
            <Link
              to="/ecosystem"
              style={{
                display: 'inline-block',
                padding: '14px 32px',
                borderRadius: 14,
                background: 'rgba(255,255,255,0.07)',
                border: '1px solid rgba(10,124,110,0.4)',
                color: '#0A7C6E',
                fontWeight: 700,
                fontSize: 15,
                textDecoration: 'none',
              }}
            >
              View Full Partner Directory →
            </Link>
          </div>
        </div>
      </section>

      {/* ─── FUNDERS ────────────────────────────────────────────────────── */}
      <section style={{ padding: '40px 24px', borderTop: '1px solid rgba(255,255,255,0.06)' }}>
        <div
          style={{
            maxWidth: 1120,
            margin: '0 auto',
            display: 'flex',
            flexWrap: 'wrap',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: 20,
          }}
        >
          <p style={{ color: 'rgba(255,255,255,0.3)', fontSize: 13 }}>Funded &amp; supported by</p>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 14, alignItems: 'center' }}>
            <div
              style={{
                padding: '8px 20px',
                borderRadius: 10,
                background: 'rgba(245,230,200,0.06)',
                border: '1px solid rgba(245,230,200,0.12)',
                color: 'rgba(245,230,200,0.7)',
                fontSize: 13,
                fontWeight: 600,
              }}
            >
              National Geographic Society
            </div>
            <div
              style={{
                padding: '8px 20px',
                borderRadius: 10,
                background: 'rgba(26,75,122,0.15)',
                border: '1px solid rgba(26,75,122,0.3)',
                color: '#4B8FD5',
                fontSize: 13,
                fontWeight: 600,
              }}
            >
              The Nature Conservancy
            </div>
          </div>
        </div>
      </section>

    </div>
  )
}
