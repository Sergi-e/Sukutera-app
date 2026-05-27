import { useState } from 'react'
import { Link } from 'react-router-dom'
import LiveMap from '../components/map/LiveMap'
import { useCollections } from '../hooks/useCollections'
import { PLASTIC_TYPES } from '../lib/constants'
import { getOffTakersForPlastic } from '../lib/stakeholders'
import { formatKg } from '../utils/formatters'

export default function MapView() {
  const { collections } = useCollections()
  const [filterType, setFilterType] = useState('All')

  const filtered = filterType === 'All'
    ? collections
    : collections.filter((c) => c.plastic_type === filterType)

  const totalKg = collections.reduce((s, c) => s + (c.weight_kg || 0), 0)
  const offTakers = filterType !== 'All' ? getOffTakersForPlastic(filterType) : []

  const btnBase = {
    padding: '5px 12px',
    borderRadius: 8,
    fontSize: 12,
    fontWeight: 600,
    cursor: 'pointer',
    border: 'none',
    display: 'inline-flex',
    alignItems: 'center',
    gap: 6,
    transition: 'all 0.15s ease',
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', paddingTop: 80, boxSizing: 'border-box' }}>

      {/* Top bar */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: 12,
          padding: '10px 24px',
          background: 'rgba(11,31,46,0.97)',
          borderBottom: '1px solid rgba(255,255,255,0.06)',
          flexShrink: 0,
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
          <h1 style={{ fontWeight: 800, fontSize: 16, color: '#FFFFFF', margin: 0 }}>
            Live Collection Map
          </h1>
          <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
            <span
              style={{
                width: 7, height: 7, borderRadius: '50%',
                background: '#34d399',
                display: 'inline-block',
                animation: 'pulse 2s ease-in-out infinite',
              }}
            />
            <span style={{ fontSize: 12, color: 'rgba(255,255,255,0.5)' }}>
              {collections.length} collections · {formatKg(totalKg)} total
            </span>
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: 10, flexWrap: 'wrap' }}>
          <Link
            to="/ecosystem"
            style={{
              padding: '5px 12px',
              borderRadius: 8,
              fontSize: 12,
              fontWeight: 600,
              textDecoration: 'none',
              background: 'rgba(59,130,246,0.12)',
              color: '#60A5FA',
              border: '1px solid rgba(59,130,246,0.25)',
            }}
          >
            🔗 Ecosystem
          </Link>
          <div style={{ display: 'flex', alignItems: 'center', gap: 6, flexWrap: 'wrap' }}>
            <button
              onClick={() => setFilterType('All')}
              style={{
                ...btnBase,
                background: filterType === 'All' ? 'rgba(10,124,110,0.25)' : 'rgba(255,255,255,0.06)',
                color: filterType === 'All' ? '#F5E6C8' : 'rgba(255,255,255,0.5)',
                border: filterType === 'All' ? '1px solid rgba(10,124,110,0.4)' : '1px solid rgba(255,255,255,0.08)',
              }}
            >
              All
            </button>
            {Object.entries(PLASTIC_TYPES).map(([type, info]) => (
              <button
                key={type}
                onClick={() => setFilterType(type)}
                style={{
                  ...btnBase,
                  background: filterType === type ? `${info.color}25` : 'rgba(255,255,255,0.06)',
                  color: filterType === type ? '#fff' : 'rgba(255,255,255,0.5)',
                  border: filterType === type ? `1px solid ${info.color}50` : '1px solid rgba(255,255,255,0.08)',
                }}
              >
                <span style={{ width: 7, height: 7, borderRadius: '50%', background: info.color, display: 'inline-block' }} />
                {type}
              </button>
            ))}
          </div>
        </div>
      </div>

      {filterType !== 'All' && offTakers.length > 0 && (
        <div
          style={{
            padding: '8px 24px',
            background: 'rgba(59,130,246,0.08)',
            borderBottom: '1px solid rgba(59,130,246,0.18)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: 10,
            flexShrink: 0,
          }}
        >
          <span style={{ fontSize: 12, color: 'rgba(255,255,255,0.55)' }}>
            <span style={{ color: PLASTIC_TYPES[filterType]?.color, fontWeight: 700 }}>{filterType}</span>
            {' '}collections route to:{' '}
            <span style={{ color: '#60A5FA', fontWeight: 600 }}>
              {offTakers.map((o) => o.name).join(' · ')}
            </span>
          </span>
          <Link to="/ecosystem" style={{ fontSize: 11, fontWeight: 600, color: '#0A7C6E', textDecoration: 'none' }}>
            Full directory →
          </Link>
        </div>
      )}

      <LiveMap collections={filtered} />
    </div>
  )
}
