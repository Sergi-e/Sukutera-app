import { Link } from 'react-router-dom'
import { PLASTIC_TYPES } from '../../lib/constants'
import { getOffTakersForPlastic, getCollectionPartner } from '../../lib/stakeholders'

export default function OffTakerGuide({ plasticType = 'PET' }) {
  const offTakers = getOffTakersForPlastic(plasticType)
  const collector = getCollectionPartner()
  const typeColor = PLASTIC_TYPES[plasticType]?.color || '#3B82F6'

  return (
    <div className="glass-card p-5">
      <h3 className="text-sm font-semibold text-white mb-1">Where does this waste go?</h3>
      <p className="text-xs mb-4" style={{ color: 'rgba(255,255,255,0.45)', lineHeight: 1.5 }}>
        Recommended partners for <span style={{ color: typeColor, fontWeight: 700 }}>{plasticType}</span> plastic in the value chain.
      </p>

      {collector && (
        <div
          className="rounded-xl p-3 mb-3"
          style={{ background: 'rgba(10,124,110,0.08)', border: '1px solid rgba(10,124,110,0.22)' }}
        >
          <div className="text-xs uppercase tracking-wide mb-1" style={{ color: 'rgba(255,255,255,0.35)' }}>
            Collection
          </div>
          <div className="text-sm font-semibold text-white">{collector.name}</div>
          <div className="text-xs mt-1" style={{ color: 'rgba(255,255,255,0.45)' }}>{collector.location}</div>
        </div>
      )}

      <div className="flex flex-col gap-2 mb-4">
        {offTakers.map((partner) => (
          <div
            key={partner.id}
            className="rounded-xl p-3"
            style={{ background: 'rgba(59,130,246,0.08)', border: '1px solid rgba(59,130,246,0.2)' }}
          >
            <div className="flex items-center gap-2">
              <div
                className="w-8 h-8 rounded-lg flex items-center justify-center text-xs font-bold text-white"
                style={{ background: 'rgba(59,130,246,0.25)', border: '1px solid rgba(59,130,246,0.35)' }}
              >
                {partner.initials}
              </div>
              <div>
                <div className="text-sm font-semibold text-white">{partner.name}</div>
                <div className="text-xs" style={{ color: 'rgba(255,255,255,0.4)' }}>{partner.district}</div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <Link
        to="/ecosystem"
        className="text-xs font-semibold underline underline-offset-4"
        style={{ color: '#0A7C6E' }}
      >
        View full partner directory →
      </Link>
    </div>
  )
}
