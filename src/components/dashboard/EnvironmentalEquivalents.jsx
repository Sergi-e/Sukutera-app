import AnimateInView from '../ui/AnimateInView'
import { formatKg } from '../../utils/formatters'

function equivalentStats(totalKg) {
  const kg = totalKg || 54
  return [
    {
      icon: '🐟',
      text: `Protects breeding grounds of ~${Math.round(kg * 50).toLocaleString()} Sambaza fish`,
      color: '#3B82F6',
    },
    {
      icon: '🌊',
      text: `Removes plastic from ${(kg * 0.022).toFixed(1)}km of Lake Kivu shoreline`,
      color: '#0A7C6E',
    },
    {
      icon: '⚡',
      text: `Prevents ${(kg * 0.22).toFixed(1)}kg of microplastics entering water supply`,
      color: '#F59E0B',
    },
  ]
}

export default function EnvironmentalEquivalents({ totalKg }) {
  const items = equivalentStats(totalKg)

  return (
    <div
      style={{
        background: 'rgba(15,42,61,0.7)',
        backdropFilter: 'blur(16px)',
        border: '1px solid rgba(255,255,255,0.07)',
        borderRadius: 16,
        padding: 24,
        marginBottom: 24,
      }}
    >
      <AnimateInView variant="fade-left">
        <h3 style={{ fontSize: 16, fontWeight: 700, color: '#FFFFFF', marginBottom: 6 }}>
          Environmental Equivalents
        </h3>
        <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.5)', marginBottom: 24, marginTop: 0, lineHeight: 1.5 }}>
          What {formatKg(totalKg)} of plastic diverted means for Lake Kivu
        </p>
      </AnimateInView>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
          gap: 16,
        }}
      >
        {items.map((item, i) => (
          <AnimateInView key={item.text} variant="fade-up" delay={i * 100}>
            <div className="env-equiv-card" style={{ borderColor: `${item.color}30` }}>
              <div style={{ fontSize: 32, marginBottom: 10 }}>{item.icon}</div>
              <p style={{ fontSize: 14, color: 'rgba(255,255,255,0.75)', lineHeight: 1.55, margin: 0 }}>
                {item.text}
              </p>
            </div>
          </AnimateInView>
        ))}
      </div>
    </div>
  )
}
