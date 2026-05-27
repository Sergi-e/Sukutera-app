import AnimateInView from '../ui/AnimateInView'
import CountUpOnView from '../ui/CountUpOnView'

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
  return (
    <section
      style={{
        padding: '64px 24px',
        background: 'linear-gradient(135deg, rgba(10,124,110,0.12) 0%, rgba(26,75,122,0.18) 100%)',
        borderTop: '1px solid rgba(255,255,255,0.06)',
        borderBottom: '1px solid rgba(255,255,255,0.06)',
      }}
    >
      <div style={{ maxWidth: 1120, margin: '0 auto' }}>
        <AnimateInView variant="fade-left">
          <div style={{ textAlign: 'center', marginBottom: 40 }}>
            <h2 style={{ fontSize: 30, fontWeight: 900, color: '#FFFFFF', marginBottom: 10 }}>
              Why It Matters
            </h2>
            <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: 15 }}>
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
              <div
                style={{
                  textAlign: 'center',
                  padding: '32px 24px',
                  borderRadius: 16,
                  background: 'rgba(15,42,61,0.65)',
                  border: `1px solid ${stat.color}25`,
                }}
              >
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
                <p style={{ fontSize: 14, color: 'rgba(255,255,255,0.55)', lineHeight: 1.5 }}>
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
