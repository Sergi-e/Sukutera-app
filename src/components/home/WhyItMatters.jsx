import { useState } from 'react'
import AnimateInView from '../ui/AnimateInView'
import CountUpOnView from '../ui/CountUpOnView'
import { FIELD_IMAGES, FIELD_IMAGE_FALLBACKS } from '../../lib/images'

const STATS = [
  {
    value: 1.2,
    suffix: 'M tons',
    label: 'of plastic enter African lakes yearly',
    color: '#3B82F6',
    decimals: 1,
  },
  {
    value: 47,
    suffix: '%',
    label: 'of Lake Kivu waste is recoverable PET',
    color: '#0A7C6E',
    decimals: 0,
  },
  {
    value: 3,
    suffix: '',
    label: 'districts now covered by Sukutera',
    color: '#F5E6C8',
    decimals: 0,
  },
]

export default function WhyItMatters() {
  const [imgSrc, setImgSrc] = useState(FIELD_IMAGES.collector)

  return (
    <section className="why-it-matters">
      <img
        src={imgSrc}
        alt=""
        aria-hidden="true"
        className="why-it-matters__photo"
        onError={() => setImgSrc(FIELD_IMAGE_FALLBACKS.collector)}
      />
      <div className="why-it-matters__overlay" aria-hidden="true" />

      <div className="why-it-matters__content">
        <AnimateInView variant="fade-left">
          <div style={{ textAlign: 'center', marginBottom: 40 }}>
            <h2 style={{ fontSize: 30, fontWeight: 900, color: '#FFFFFF', marginBottom: 10 }}>
              Why It Matters
            </h2>
            <p style={{ color: 'rgba(255,255,255,0.65)', fontSize: 15 }}>
              The scale of the challenge — and the opportunity at Lake Kivu
            </p>
          </div>
        </AnimateInView>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
            gap: 24,
          }}
        >
          {STATS.map((stat, i) => (
            <AnimateInView key={stat.label} variant="fade-up" delay={i * 100}>
              <div className="why-it-matters__stat-card">
                <div
                  style={{
                    fontSize: 'clamp(36px, 5vw, 52px)',
                    fontWeight: 900,
                    color: stat.color,
                    lineHeight: 1,
                    marginBottom: 12,
                  }}
                >
                  <CountUpOnView
                    target={stat.value}
                    suffix={stat.suffix}
                    decimals={stat.decimals}
                  />
                </div>
                <p style={{ fontSize: 14, color: 'rgba(255,255,255,0.75)', lineHeight: 1.5 }}>
                  {stat.label}
                </p>
              </div>
            </AnimateInView>
          ))}
        </div>
      </div>
    </section>
  )
}
