import AnimateInView from '../ui/AnimateInView'

const STEPS = [
  { icon: '🤿', label: 'Collector', sub: 'Lake Kivu shores', color: '#52B788' },
  { icon: '📱', label: 'Sukutera Platform', sub: 'Log · Sort · Track', color: '#0A7C6E' },
  { icon: '♻️', label: 'Recycler / Composter', sub: 'Verified off-takers', color: '#3B82F6' },
  { icon: '📊', label: 'Impact', sub: 'Dashboard & funders', color: '#F5E6C8' },
]

export default function ValueChainFlow() {
  return (
    <AnimateInView variant="fade-up">
      <div
        style={{
          background: 'rgba(255,255,255,0.04)',
          border: '1px solid rgba(255,255,255,0.08)',
          borderRadius: 16,
          padding: '28px 24px',
          marginBottom: 24,
        }}
      >
        <div
          style={{
            fontSize: 10,
            textTransform: 'uppercase',
            letterSpacing: '0.1em',
            color: 'rgba(255,255,255,0.35)',
            marginBottom: 20,
            textAlign: 'center',
          }}
        >
          Value Chain Flow
        </div>

        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexWrap: 'wrap',
            gap: 12,
          }}
        >
          {STEPS.map((step, i) => (
            <div key={step.label} style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
              <div
                style={{
                  padding: '18px 20px',
                  borderRadius: 14,
                  background: 'rgba(255,255,255,0.04)',
                  border: `1px solid ${step.color}35`,
                  textAlign: 'center',
                  minWidth: 140,
                }}
              >
                <div style={{ fontSize: 28, marginBottom: 10 }}>{step.icon}</div>
                <div style={{ fontSize: 13, fontWeight: 700, color: step.color }}>{step.label}</div>
                <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.45)', marginTop: 6, lineHeight: 1.4 }}>{step.sub}</div>
              </div>
              {i < STEPS.length - 1 && (
                <span className="value-chain-arrow" aria-hidden="true">
                  →
                </span>
              )}
            </div>
          ))}
        </div>
      </div>
    </AnimateInView>
  )
}
