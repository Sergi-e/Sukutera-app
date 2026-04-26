import { useState } from 'react'
import LiveMap from '../components/map/LiveMap'
import { useCollections } from '../hooks/useCollections'
import { useCollectors } from '../hooks/useCollectors'
import { PLASTIC_TYPES } from '../lib/constants'
import { formatKg } from '../utils/formatters'

const hasToken = () => {
  const t = import.meta.env.VITE_MAPBOX_TOKEN
  return t && t !== 'your_mapbox_token_here' && t.startsWith('pk.')
}

export default function MapView() {
  const { collections } = useCollections()
  const { collectors }  = useCollectors()
  const [filterType, setFilterType] = useState('All')

  const filtered = filterType === 'All'
    ? collections
    : collections.filter((c) => c.plastic_type === filterType)

  const totalKg = collections.reduce((s, c) => s + (c.weight_kg || 0), 0)

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
    <div style={{ display: 'flex', flexDirection: 'column', height: '100vh', paddingTop: 80, boxSizing: 'border-box' }}>

      {/* ─── Top bar ─────────────────────────────────────────────────────── */}
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
        {/* Title + live indicator */}
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

        {/* Plastic type filter */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 6, flexWrap: 'wrap' }}>
          <button
            onClick={() => setFilterType('All')}
            style={{
              ...btnBase,
              background: filterType === 'All' ? 'rgba(10,124,110,0.25)' : 'rgba(255,255,255,0.06)',
              color:      filterType === 'All' ? '#F5E6C8'               : 'rgba(255,255,255,0.5)',
              border:     filterType === 'All' ? '1px solid rgba(10,124,110,0.4)' : '1px solid rgba(255,255,255,0.08)',
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
                background: filterType === type ? `${info.color}25`             : 'rgba(255,255,255,0.06)',
                color:      filterType === type ? '#fff'                         : 'rgba(255,255,255,0.5)',
                border:     filterType === type ? `1px solid ${info.color}50`   : '1px solid rgba(255,255,255,0.08)',
              }}
            >
              <span style={{ width: 7, height: 7, borderRadius: '50%', background: info.color, display: 'inline-block' }} />
              {type}
            </button>
          ))}
        </div>
      </div>

      {/* ─── Map / placeholder ───────────────────────────────────────────── */}
      <div style={{ flex: 1, position: 'relative', overflow: 'hidden' }}>
        {hasToken() ? (
          <LiveMap collections={filtered} collectors={collectors} style={{ width: '100%', height: '100%' }} />
        ) : (
          <div
            style={{
              position: 'absolute', inset: 0,
              display: 'flex', flexDirection: 'column',
              alignItems: 'center', justifyContent: 'center',
              gap: 20, textAlign: 'center', padding: 24,
              background: '#0B1F2E',
            }}
          >
            <div style={{ fontSize: 52 }}>🗺️</div>
            <div>
              <h2 style={{ fontSize: 20, fontWeight: 800, color: '#FFFFFF', marginBottom: 8 }}>
                Map Ready
              </h2>
              <p style={{ fontSize: 14, color: 'rgba(255,255,255,0.5)', maxWidth: 360, lineHeight: 1.6 }}>
                Add your Mapbox token to <code style={{ color: '#34d399' }}>.env</code> to enable
                the live map. {filtered.length} collection pins will appear centered on Lake Kivu.
              </p>
            </div>

            <div
              style={{
                background: 'rgba(15,42,61,0.7)', border: '1px solid rgba(255,255,255,0.08)',
                borderRadius: 12, padding: '12px 16px', textAlign: 'left',
                fontFamily: 'monospace', fontSize: 13, maxWidth: 360, width: '100%',
              }}
            >
              <div style={{ color: 'rgba(255,255,255,0.35)', marginBottom: 4 }}># sukutera/.env</div>
              <div style={{ color: '#F5E6C8' }}>VITE_MAPBOX_TOKEN=pk.eyJ1…</div>
            </div>

            {/* Pin preview list */}
            <div
              style={{
                background: 'rgba(15,42,61,0.7)', border: '1px solid rgba(255,255,255,0.07)',
                borderRadius: 12, padding: 16, maxWidth: 360, width: '100%',
              }}
            >
              <div style={{ fontSize: 12, fontWeight: 700, color: '#FFFFFF', marginBottom: 12 }}>
                {filtered.length} collection sites loaded
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 8, maxHeight: 160, overflowY: 'auto' }}>
                {filtered.slice(0, 8).map((c, i) => (
                  <div key={i} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                      <div style={{
                        width: 8, height: 8, borderRadius: '50%',
                        background: PLASTIC_TYPES[c.plastic_type]?.color || '#6B7280',
                        flexShrink: 0,
                      }} />
                      <span style={{ fontSize: 12, color: 'rgba(255,255,255,0.6)' }}>
                        {c.district || 'Lake Kivu'} · {c.plastic_type}
                      </span>
                    </div>
                    <span style={{ fontSize: 12, color: '#F5E6C8', fontWeight: 600 }}>
                      {formatKg(c.weight_kg)}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
