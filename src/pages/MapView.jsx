import { useState } from 'react'
import LiveMap from '../components/map/LiveMap'
import { useCollections } from '../hooks/useCollections'
import { PLASTIC_TYPES } from '../lib/constants'
import { formatKg } from '../utils/formatters'

export default function MapView() {
  const { collections, loading } = useCollections()
  const [filterType, setFilterType] = useState('All')

  const filtered = filterType === 'All'
    ? collections
    : collections.filter((c) => c.plastic_type === filterType)

  const totalKg = collections.reduce((s, c) => s + (c.weight_kg || 0), 0)

  return (
    <div className="flex flex-col h-screen pt-16">
      {/* Top bar */}
      <div
        className="px-6 py-3 flex items-center justify-between flex-wrap gap-3"
        style={{ background: 'rgba(11,31,46,0.95)', borderBottom: '1px solid rgba(255,255,255,0.06)' }}
      >
        <div className="flex items-center gap-4">
          <h1 className="font-bold text-white">Live Collection Map</h1>
          <div className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-xs" style={{ color: 'rgba(255,255,255,0.5)' }}>
              {collections.length} collections · {formatKg(totalKg)} total
            </span>
          </div>
        </div>

        {/* Filter */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => setFilterType('All')}
            className="px-3 py-1.5 rounded-lg text-xs font-medium transition-all"
            style={{
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
              className="px-3 py-1.5 rounded-lg text-xs font-medium transition-all flex items-center gap-1.5"
              style={{
                background: filterType === type ? `${info.color}25` : 'rgba(255,255,255,0.06)',
                color: filterType === type ? '#fff' : 'rgba(255,255,255,0.5)',
                border: filterType === type ? `1px solid ${info.color}50` : '1px solid rgba(255,255,255,0.08)',
              }}
            >
              <span className="w-2 h-2 rounded-full" style={{ background: info.color }} />
              {type}
            </button>
          ))}
        </div>
      </div>

      {/* Map */}
      <div className="flex-1 relative">
        {!import.meta.env.VITE_MAPBOX_TOKEN || import.meta.env.VITE_MAPBOX_TOKEN === 'your_mapbox_token_here' ? (
          <div
            className="absolute inset-0 flex flex-col items-center justify-center gap-4 text-center px-6"
            style={{ background: '#0B1F2E' }}
          >
            <div className="text-5xl">🗺️</div>
            <h2 className="text-xl font-bold text-white">Map Ready</h2>
            <p className="text-sm max-w-sm" style={{ color: 'rgba(255,255,255,0.5)' }}>
              Add your Mapbox token to <code className="text-green-400">.env</code> to enable the live map.
              The map will show {filtered.length} collection pins centered on Lake Kivu.
            </p>
            <div className="glass-card p-4 text-left text-sm font-mono max-w-sm w-full">
              <div style={{ color: 'rgba(255,255,255,0.4)' }}># .env</div>
              <div style={{ color: '#F5E6C8' }}>VITE_MAPBOX_TOKEN=pk.eyJ1…</div>
            </div>
            {/* Mock pin list */}
            <div className="glass-card p-4 max-w-sm w-full">
              <div className="text-xs font-semibold text-white mb-3">
                {filtered.length} collection sites loaded
              </div>
              <div className="flex flex-col gap-2 max-h-40 overflow-y-auto">
                {filtered.slice(0, 8).map((c, i) => (
                  <div key={i} className="flex items-center justify-between text-xs">
                    <div className="flex items-center gap-2">
                      <div
                        className="w-2 h-2 rounded-full"
                        style={{ background: PLASTIC_TYPES[c.plastic_type]?.color || '#6B7280' }}
                      />
                      <span style={{ color: 'rgba(255,255,255,0.6)' }}>{c.district || 'Lake Kivu'}</span>
                    </div>
                    <span style={{ color: '#F5E6C8' }}>{formatKg(c.weight_kg)}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ) : (
          <LiveMap collections={filtered} className="h-full" />
        )}
      </div>
    </div>
  )
}
