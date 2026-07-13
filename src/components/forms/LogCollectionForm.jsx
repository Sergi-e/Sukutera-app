import { useState } from 'react'
import { PLASTIC_TYPES, DISTRICTS } from '../../lib/constants'
import { calculatePoints } from '../../utils/points'
import { supabase, TABLES } from '../../lib/supabase'
import { useCollectors } from '../../hooks/useCollectors'

const INITIAL = {
  collector_id: '',
  weight_kg: '',
  plastic_type: 'PET',
  notes: '',
  latitude: '',
  longitude: '',
  district: '',
}

export default function LogCollectionForm({ onSuccess, onPlasticTypeChange }) {
  const { collectors, loading: collectorsLoading } = useCollectors()
  const [form, setForm] = useState(INITIAL)
  const [status, setStatus] = useState(null) // 'loading' | 'success' | 'error'
  const [errorMsg, setErrorMsg] = useState('')
  const [locating, setLocating] = useState(false)
  const [lastEarnedPoints, setLastEarnedPoints] = useState(0)

  const pointsPreview = form.weight_kg && form.plastic_type
    ? calculatePoints(parseFloat(form.weight_kg) || 0, form.plastic_type)
    : 0

  function handleChange(e) {
    const { name, value } = e.target
    setForm((prev) => ({ ...prev, [name]: value }))
  }

  function detectLocation() {
    if (!navigator.geolocation) {
      setErrorMsg('Geolocation not supported by your browser.')
      return
    }
    setLocating(true)
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setForm((prev) => ({
          ...prev,
          latitude: pos.coords.latitude.toFixed(6),
          longitude: pos.coords.longitude.toFixed(6),
        }))
        setLocating(false)
      },
      (err) => {
        setErrorMsg('Could not get location: ' + err.message)
        setLocating(false)
      },
      { timeout: 10000 }
    )
  }

  async function handleSubmit(e) {
    e.preventDefault()
    setStatus('loading')
    setErrorMsg('')

    const payload = {
      collector_id: form.collector_id || null,
      weight_kg: parseFloat(form.weight_kg),
      plastic_type: form.plastic_type,
      notes: form.notes,
      latitude: parseFloat(form.latitude) || null,
      longitude: parseFloat(form.longitude) || null,
      district: form.district,
    }

    const earned = calculatePoints(payload.weight_kg, payload.plastic_type)

    if (!supabase) {
      // Demo mode — no Supabase connected
      await new Promise((r) => setTimeout(r, 700))
      setLastEarnedPoints(earned)
      setStatus('success')
      setForm(INITIAL)
      onSuccess?.()
      return
    }

    try {
      const { error: colErr } = await supabase.from(TABLES.COLLECTIONS).insert([payload])
      if (colErr) throw colErr

      if (form.collector_id) {
        await supabase.rpc('increment_collector_stats', {
          p_collector_id: form.collector_id,
          p_kg: payload.weight_kg,
          p_pts: earned,
        })
      }

      setLastEarnedPoints(earned)
      setStatus('success')
      setForm(INITIAL)
      onSuccess?.()
    } catch (err) {
      setStatus('error')
      setErrorMsg(err.message || 'Submission failed.')
    }
  }

  return (
    <form onSubmit={handleSubmit} className="form-stack">
      {/* Collector */}
      <div>
        <label className="form-field-label">Collector</label>
        <select
          name="collector_id"
          value={form.collector_id}
          onChange={handleChange}
          disabled={collectorsLoading}
          className="form-select w-full rounded-xl px-4 py-3 text-sm outline-none transition-all"
          style={{
            background: 'rgba(255,255,255,0.06)',
            border: '1px solid rgba(255,255,255,0.1)',
          }}
        >
          <option value="">— Select collector —</option>
          {collectors.map((c) => (
            <option key={c.id} value={c.id}>{c.name} ({c.district})</option>
          ))}
        </select>
      </div>

      {/* Weight */}
      <div>
        <label className="form-field-label">Weight (kg) *</label>
        <input
          type="number"
          name="weight_kg"
          value={form.weight_kg}
          onChange={handleChange}
          required
          min="0.1"
          max="500"
          step="0.1"
          placeholder="e.g. 4.5"
          className="w-full rounded-xl px-4 py-3 text-sm text-white outline-none transition-all placeholder:text-white/30"
          style={{
            background: 'rgba(255,255,255,0.06)',
            border: '1px solid rgba(255,255,255,0.1)',
          }}
        />
      </div>

      {/* Plastic Type */}
      <div>
        <label className="form-field-label">Plastic Type *</label>
        <div className="points-grid">
          {Object.entries(PLASTIC_TYPES).map(([type, info]) => {
            const ptsColor = type === 'PET' ? '#60A5FA' : info.color
            return (
            <button
              key={type}
              type="button"
              onClick={() => {
                setForm((prev) => ({ ...prev, plastic_type: type }))
                onPlasticTypeChange?.(type)
              }}
              className="points-grid-item"
              style={{
                textAlign: 'left',
                cursor: 'pointer',
                background: form.plastic_type === type ? `${info.color}25` : 'rgba(255,255,255,0.04)',
                border: form.plastic_type === type ? `1.5px solid ${info.color}60` : '1.5px solid rgba(255,255,255,0.08)',
                color: form.plastic_type === type ? '#fff' : 'rgba(255,255,255,0.55)',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <div style={{ width: 12, height: 12, borderRadius: '50%', background: info.color, flexShrink: 0 }} />
                <span style={{ fontSize: 14, fontWeight: 600 }}>{type}</span>
              </div>
              <div style={{ fontSize: 12, marginTop: 6, fontWeight: 600, color: form.plastic_type === type ? ptsColor : 'rgba(255,255,255,0.4)' }}>
                {info.points} pts/kg
              </div>
            </button>
          )})}
        </div>
      </div>

      {/* District */}
      <div>
        <label className="form-field-label">District</label>
        <select
          name="district"
          value={form.district}
          onChange={handleChange}
          className="form-select w-full rounded-xl px-4 py-3 text-sm outline-none"
          style={{
            background: 'rgba(255,255,255,0.06)',
            border: '1px solid rgba(255,255,255,0.1)',
          }}
        >
          <option value="">— Select district —</option>
          {DISTRICTS.map((d) => (
            <option key={d} value={d}>{d}</option>
          ))}
        </select>
      </div>

      {/* Location */}
      <div>
        <label className="form-field-label">GPS Location</label>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10, marginBottom: 12 }}>
          <input
            type="number"
            name="latitude"
            value={form.latitude}
            onChange={handleChange}
            placeholder="Latitude"
            step="0.0001"
            className="rounded-xl px-4 py-3 text-sm text-white outline-none placeholder:text-white/30"
            style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)' }}
          />
          <input
            type="number"
            name="longitude"
            value={form.longitude}
            onChange={handleChange}
            placeholder="Longitude"
            step="0.0001"
            className="rounded-xl px-4 py-3 text-sm text-white outline-none placeholder:text-white/30"
            style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)' }}
          />
        </div>
        <button
          type="button"
          onClick={detectLocation}
          disabled={locating}
          style={{
            fontSize: 13,
            padding: '10px 16px',
            borderRadius: 12,
            cursor: locating ? 'wait' : 'pointer',
            background: 'rgba(10,124,110,0.15)',
            border: '1px solid rgba(10,124,110,0.3)',
            color: '#34D399',
          }}
        >
          {locating ? '📡 Detecting…' : '📍 Use My Location'}
        </button>
      </div>

      {/* Notes */}
      <div>
        <label className="form-field-label">Notes (optional)</label>
        <textarea
          name="notes"
          value={form.notes}
          onChange={handleChange}
          rows={3}
          placeholder="Describe the collection site…"
          className="w-full rounded-xl px-4 py-3 text-sm text-white outline-none resize-none placeholder:text-white/30"
          style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)' }}
        />
      </div>

      {/* Points preview */}
      {pointsPreview > 0 && (
        <div
          className="rounded-xl p-4 flex items-center justify-between"
          style={{ background: 'rgba(10,124,110,0.12)', border: '1px solid rgba(10,124,110,0.25)' }}
        >
          <span className="text-sm" style={{ color: 'rgba(255,255,255,0.7)' }}>Points you'll earn</span>
          <span className="text-xl font-black" style={{ color: '#0A7C6E' }}>+{pointsPreview} pts</span>
        </div>
      )}

      {/* Error */}
      {status === 'error' && (
        <div className="rounded-xl p-3 text-sm" style={{ background: 'rgba(239,68,68,0.1)', border: '1px solid rgba(239,68,68,0.3)', color: '#FCA5A5' }}>
          {errorMsg}
        </div>
      )}

      {/* Success */}
      {status === 'success' && (
        <div
          className="rounded-xl p-4 text-sm"
          style={{ background: 'rgba(16,185,129,0.1)', border: '1px solid rgba(16,185,129,0.3)' }}
        >
          <div style={{ color: '#6EE7B7', fontWeight: 700, marginBottom: 4 }}>
            ✅ Collection logged successfully!
          </div>
          {lastEarnedPoints > 0 && (
            <div style={{ color: 'rgba(255,255,255,0.55)', fontSize: 12 }}>
              +{lastEarnedPoints} points earned · routed to ecosystem off-takers
            </div>
          )}
        </div>
      )}

      <button
        type="submit"
        disabled={status === 'loading'}
        style={{
          width: '100%',
          padding: '16px 24px',
          borderRadius: 12,
          fontWeight: 600,
          fontSize: 15,
          color: '#fff',
          border: 'none',
          cursor: status === 'loading' ? 'not-allowed' : 'pointer',
          opacity: status === 'loading' ? 0.6 : 1,
          background: 'linear-gradient(135deg, #0A7C6E, #0d9e8e)',
          marginTop: 4,
        }}
      >
        {status === 'loading' ? '⏳ Submitting…' : '🌊 Log Collection'}
      </button>
    </form>
  )
}
