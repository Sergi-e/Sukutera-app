import { Link } from 'react-router-dom'
import { PLASTIC_TYPES } from '../../lib/constants'
import { getOffTakersForPlastic, getCollectionPartner } from '../../lib/stakeholders'

export default function OffTakerGuide({ plasticType = 'PET' }) {
  const offTakers = getOffTakersForPlastic(plasticType)
  const collector = getCollectionPartner()
  const typeColor = PLASTIC_TYPES[plasticType]?.color || '#3B82F6'

  return (
    <div className="glass-card">
      <h3 style={{ fontSize: 14, fontWeight: 600, color: '#fff', marginBottom: 6, marginTop: 0 }}>
        Where does this waste go?
      </h3>
      <p style={{ fontSize: 12, marginBottom: 16, color: 'rgba(255,255,255,0.5)', lineHeight: 1.55, marginTop: 0 }}>
        Recommended partners for <span style={{ color: typeColor, fontWeight: 700 }}>{plasticType}</span> plastic in the value chain.
      </p>

      {collector && (
        <div
          style={{
            padding: '14px 16px',
            borderRadius: 12,
            marginBottom: 12,
            background: 'rgba(10,124,110,0.08)',
            border: '1px solid rgba(10,124,110,0.22)',
          }}
        >
          <div style={{ fontSize: 11, textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 6, color: 'rgba(255,255,255,0.4)' }}>
            Collection
          </div>
          <div style={{ fontSize: 14, fontWeight: 600, color: '#fff' }}>{collector.name}</div>
          <div style={{ fontSize: 12, marginTop: 4, color: 'rgba(255,255,255,0.5)' }}>{collector.location}</div>
        </div>
      )}

      <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginBottom: 16 }}>
        {offTakers.map((partner) => (
          <div
            key={partner.id}
            style={{
              padding: '14px 16px',
              borderRadius: 12,
              background: 'rgba(59,130,246,0.08)',
              border: '1px solid rgba(59,130,246,0.2)',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
              <div
                style={{
                  width: 36,
                  height: 36,
                  borderRadius: 10,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: 12,
                  fontWeight: 700,
                  color: '#fff',
                  flexShrink: 0,
                  background: 'rgba(59,130,246,0.25)',
                  border: '1px solid rgba(59,130,246,0.35)',
                }}
              >
                {partner.initials}
              </div>
              <div>
                <div style={{ fontSize: 14, fontWeight: 600, color: '#fff' }}>{partner.name}</div>
                <div style={{ fontSize: 12, marginTop: 2, color: 'rgba(255,255,255,0.45)' }}>{partner.district}</div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <Link
        to="/ecosystem"
        style={{ fontSize: 12, fontWeight: 600, color: '#34D399', textDecoration: 'underline', textUnderlineOffset: 4 }}
      >
        View full partner directory →
      </Link>
    </div>
  )
}
