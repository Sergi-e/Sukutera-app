import { useState } from 'react'
import { Link } from 'react-router-dom'
import AnimateInView from '../components/ui/AnimateInView'
import LogCollectionForm from '../components/forms/LogCollectionForm'
import OffTakerGuide from '../components/stakeholders/OffTakerGuide'
import PageContextPhoto from '../components/ui/PageContextPhoto'
import { FIELD_IMAGES } from '../lib/images'

export default function LogCollection() {
  const [submitted, setSubmitted] = useState(false)
  const [plasticType, setPlasticType] = useState('PET')

  return (
    <div style={{ minHeight: '100vh', paddingTop: 88, paddingBottom: 64, paddingLeft: 24, paddingRight: 24, boxSizing: 'border-box' }}>
      <div style={{ maxWidth: 960, margin: '0 auto' }}>
        <AnimateInView variant="fade-left">
          <div style={{ marginBottom: 32 }}>
            <Link
              to="/"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 8,
                fontSize: 14,
                marginBottom: 24,
                textDecoration: 'none',
                color: 'rgba(255,255,255,0.45)',
              }}
              onMouseEnter={(e) => (e.currentTarget.style.color = 'rgba(255,255,255,0.8)')}
              onMouseLeave={(e) => (e.currentTarget.style.color = 'rgba(255,255,255,0.45)')}
            >
              ← Back to Home
            </Link>
            <h1 style={{ fontSize: 30, fontWeight: 900, color: '#fff', marginBottom: 8, marginTop: 0 }}>
              Log a Collection
            </h1>
            <p style={{ fontSize: 14, color: 'rgba(255,255,255,0.5)', margin: 0, lineHeight: 1.55 }}>
              Record your plastic collection, earn points, and route sorted waste to the right off-taker.
            </p>
          </div>
        </AnimateInView>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: 24,
            alignItems: 'start',
          }}
        >
          <AnimateInView variant="fade-left">
            <div className="glass-card glass-card--spacious">
              <LogCollectionForm
                onSuccess={() => setSubmitted(true)}
                onPlasticTypeChange={setPlasticType}
              />
            </div>
          </AnimateInView>

          <AnimateInView variant="fade-right">
            <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
              <PageContextPhoto
                src={FIELD_IMAGES.shoreline}
                fallbackKey="shoreline"
                alt="Plastic pollution along the Lake Kivu shoreline at Saga Bay"
              />
              <OffTakerGuide plasticType={plasticType} />

              <div className="glass-card">
                <h3 style={{ fontSize: 14, fontWeight: 600, color: '#fff', marginBottom: 16, marginTop: 0 }}>
                  Points Guide
                </h3>
                <div className="points-grid">
                  {[
                    { type: 'PET', pts: 10, color: '#60A5FA', desc: 'Bottles & packaging' },
                    { type: 'HDPE', pts: 8, color: '#34D399', desc: 'Containers & pipes' },
                    { type: 'Mixed', pts: 5, color: '#FBBF24', desc: 'Assorted plastic' },
                    { type: 'Other', pts: 3, color: '#9CA3AF', desc: 'Unidentified types' },
                  ].map((item) => (
                    <div
                      key={item.type}
                      className="points-grid-item"
                      style={{
                        background: plasticType === item.type ? `${item.color}18` : `${item.color}10`,
                        border: plasticType === item.type ? `1.5px solid ${item.color}50` : `1px solid ${item.color}25`,
                      }}
                    >
                      <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 6 }}>
                        <div style={{ width: 10, height: 10, borderRadius: '50%', background: item.color }} />
                        <span style={{ fontWeight: 600, fontSize: 14, color: '#fff' }}>{item.type}</span>
                      </div>
                      <div style={{ fontSize: 18, fontWeight: 900, color: item.color, lineHeight: 1.2 }}>
                        {item.pts} pts/kg
                      </div>
                      <div style={{ fontSize: 12, marginTop: 6, color: 'rgba(255,255,255,0.45)' }}>
                        {item.desc}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </AnimateInView>
        </div>

        {submitted && (
          <div className="mt-6 flex flex-col items-center gap-3">
            <Link
              to="/leaderboard"
              className="text-sm underline underline-offset-4 transition-colors"
              style={{ color: '#0A7C6E' }}
            >
              View the leaderboard →
            </Link>
            <Link
              to="/ecosystem"
              className="text-sm underline underline-offset-4 transition-colors"
              style={{ color: 'rgba(255,255,255,0.45)' }}
            >
              See where collected waste goes →
            </Link>
          </div>
        )}
      </div>
    </div>
  )
}
