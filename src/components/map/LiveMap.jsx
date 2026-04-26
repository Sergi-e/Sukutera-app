import { useEffect, useRef } from 'react'
import mapboxgl from 'mapbox-gl'
import 'mapbox-gl/dist/mapbox-gl.css'
import { LAKE_KIVU_CENTER, PLASTIC_TYPES } from '../../lib/constants'
import { createPinElement } from './CollectionPin'
import { formatKg } from '../../utils/formatters'

mapboxgl.accessToken = import.meta.env.VITE_MAPBOX_TOKEN

const CENTER = [LAKE_KIVU_CENTER.lng, LAKE_KIVU_CENTER.lat]

function formatDate(iso) {
  if (!iso) return 'Recently'
  try {
    return new Date(iso).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })
  } catch {
    return 'Recently'
  }
}

export default function LiveMap({ collections = [], collectors = [], className = '' }) {
  const mapContainer = useRef(null)
  const mapRef       = useRef(null)
  const markersRef   = useRef([])

  // Build a fast collector id → name lookup
  const collectorMap = collectors.reduce((m, c) => {
    m[c.id] = c.name
    return m
  }, {})

  // ── Init map once ───────────────────────────────────────────────────────────
  useEffect(() => {
    if (mapRef.current) return

    mapRef.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/mapbox/dark-v11',
      center: CENTER,
      zoom: 6,           // start zoomed out
      pitch: 28,
      bearing: -8,
    })

    // Fly in to Lake Kivu on load
    mapRef.current.on('load', () => {
      mapRef.current.flyTo({
        center: CENTER,
        zoom: 10,
        duration: 2600,
        pitch: 28,
        easing: (t) => 1 - Math.pow(1 - t, 3), // ease-out cubic
      })
    })

    mapRef.current.addControl(new mapboxgl.NavigationControl({ showCompass: true }), 'top-right')
    mapRef.current.addControl(new mapboxgl.ScaleControl({ maxWidth: 100, unit: 'metric' }), 'bottom-left')

    return () => {
      mapRef.current?.remove()
      mapRef.current = null
    }
  }, [])

  // ── Markers: re-render when collections change ──────────────────────────────
  useEffect(() => {
    if (!mapRef.current) return

    const addMarkers = () => {
      // Clear old markers
      markersRef.current.forEach((m) => m.remove())
      markersRef.current = []

      collections.forEach((c) => {
        if (!c.latitude || !c.longitude) return

        const typeInfo      = PLASTIC_TYPES[c.plastic_type] || PLASTIC_TYPES.Other
        const collectorName = collectorMap[c.collector_id] || 'Unknown Collector'
        const date          = formatDate(c.created_at)
        const pts           = typeInfo.points * Math.round(c.weight_kg || 0)

        const el = createPinElement(c.plastic_type, c.weight_kg)

        const popup = new mapboxgl.Popup({
          offset: 18,
          closeButton: false,
          maxWidth: '240px',
        }).setHTML(`
          <div style="
            background: #0F2A3D;
            border: 1px solid rgba(255,255,255,0.1);
            border-radius: 14px;
            padding: 14px;
            font-family: Inter, sans-serif;
            color: #fff;
            min-width: 200px;
          ">
            <div style="display:flex;align-items:center;gap:8px;margin-bottom:10px;">
              <span style="
                display:inline-block;width:10px;height:10px;border-radius:50%;
                background:${typeInfo.color};box-shadow:0 0 8px ${typeInfo.color};
              "></span>
              <span style="font-weight:700;font-size:13px;">${c.plastic_type}</span>
              <span style="
                margin-left:auto;font-size:10px;font-weight:600;
                padding:2px 8px;border-radius:999px;
                background:${typeInfo.color}20;color:${typeInfo.color};
              ">${c.district || 'Lake Kivu'}</span>
            </div>

            <div style="font-size:22px;font-weight:900;color:#F5E6C8;line-height:1;margin-bottom:6px;">
              ${formatKg(c.weight_kg)}
            </div>

            <div style="font-size:12px;color:rgba(255,255,255,0.55);margin-bottom:4px;">
              👤 ${collectorName}
            </div>

            <div style="font-size:11px;color:rgba(255,255,255,0.4);margin-bottom:8px;">
              📅 ${date}
            </div>

            ${c.notes ? `
              <div style="
                font-size:11px;color:rgba(255,255,255,0.55);
                padding:6px 8px;border-radius:8px;
                background:rgba(255,255,255,0.04);
                margin-bottom:8px;line-height:1.5;
              ">${c.notes}</div>
            ` : ''}

            <div style="
              display:flex;align-items:center;justify-content:space-between;
              padding-top:8px;border-top:1px solid rgba(255,255,255,0.06);
            ">
              <span style="font-size:11px;color:rgba(255,255,255,0.35);">Points earned</span>
              <span style="font-size:13px;font-weight:800;color:#10B981;">+${pts} pts</span>
            </div>
          </div>
        `)

        const marker = new mapboxgl.Marker({ element: el })
          .setLngLat([c.longitude, c.latitude])
          .setPopup(popup)
          .addTo(mapRef.current)

        markersRef.current.push(marker)
      })
    }

    if (mapRef.current.isStyleLoaded()) {
      addMarkers()
    } else {
      mapRef.current.on('load', addMarkers)
    }
  }, [collections, collectors])

  return (
    <div
      ref={mapContainer}
      className={className}
      style={{ width: '100%', height: '100%', borderRadius: 'inherit' }}
    />
  )
}
