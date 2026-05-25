import { useState } from 'react'
import { Link } from 'react-router-dom'
import LogCollectionForm from '../components/forms/LogCollectionForm'
import OffTakerGuide from '../components/stakeholders/OffTakerGuide'

export default function LogCollection() {
  const [submitted, setSubmitted] = useState(false)
  const [plasticType, setPlasticType] = useState('PET')

  return (
    <div style={{ minHeight: '100vh', paddingTop: 88, paddingBottom: 64, paddingLeft: 24, paddingRight: 24, boxSizing: 'border-box' }}>
      <div style={{ maxWidth: 960, margin: '0 auto' }}>
        {/* Header */}
        <div className="mb-8">
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-sm mb-6 transition-colors"
            style={{ color: 'rgba(255,255,255,0.45)' }}
            onMouseEnter={(e) => (e.currentTarget.style.color = 'rgba(255,255,255,0.8)')}
            onMouseLeave={(e) => (e.currentTarget.style.color = 'rgba(255,255,255,0.45)')}
          >
            ← Back to Home
          </Link>
          <h1 className="text-3xl font-black text-white mb-2">Log a Collection</h1>
          <p className="text-sm" style={{ color: 'rgba(255,255,255,0.5)' }}>
            Record your plastic collection, earn points, and route sorted waste to the right off-taker.
          </p>
        </div>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: 24,
            alignItems: 'start',
          }}
        >
          {/* Form */}
          <div className="glass-card p-6 md:p-8">
            <LogCollectionForm
              onSuccess={() => setSubmitted(true)}
              onPlasticTypeChange={setPlasticType}
            />
          </div>

          {/* Sidebar */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
            <OffTakerGuide plasticType={plasticType} />

            <div className="glass-card p-5">
              <h3 className="text-sm font-semibold text-white mb-3">Points Guide</h3>
              <div className="grid grid-cols-2 gap-3">
                {[
                  { type: 'PET', pts: 10, color: '#3B82F6', desc: 'Bottles & packaging' },
                  { type: 'HDPE', pts: 8, color: '#10B981', desc: 'Containers & pipes' },
                  { type: 'Mixed', pts: 5, color: '#F59E0B', desc: 'Assorted plastic' },
                  { type: 'Other', pts: 3, color: '#6B7280', desc: 'Unidentified types' },
                ].map((item) => (
                  <div
                    key={item.type}
                    className="rounded-xl p-3"
                    style={{
                      background: plasticType === item.type ? `${item.color}18` : `${item.color}10`,
                      border: plasticType === item.type ? `1.5px solid ${item.color}50` : `1px solid ${item.color}25`,
                    }}
                  >
                    <div className="flex items-center gap-1.5 mb-1">
                      <div className="w-2.5 h-2.5 rounded-full" style={{ background: item.color }} />
                      <span className="font-semibold text-sm text-white">{item.type}</span>
                    </div>
                    <div className="text-lg font-black" style={{ color: item.color }}>
                      {item.pts} pts/kg
                    </div>
                    <div className="text-xs mt-0.5" style={{ color: 'rgba(255,255,255,0.4)' }}>
                      {item.desc}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
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
