import { useEffect, useRef } from 'react'
import mapboxgl from 'mapbox-gl'
import 'mapbox-gl/dist/mapbox-gl.css'
import { LAKE_KIVU_CENTER, PLASTIC_TYPES } from '../../lib/constants'
import { createPinElement } from './CollectionPin'
import { formatKg } from '../../utils/formatters'

mapboxgl.accessToken = import.meta.env.VITE_MAPBOX_TOKEN

export default function LiveMap({ collections = [], className = '' }) {
  const mapContainer = useRef(null)
  const mapRef = useRef(null)
  const markersRef = useRef([])

  useEffect(() => {
    if (mapRef.current) return

    mapRef.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/mapbox/navigation-night-v1',
      center: [LAKE_KIVU_CENTER.lng, LAKE_KIVU_CENTER.lat],
      zoom: 10,
      pitch: 30,
      bearing: -10,
    })

    mapRef.current.addControl(new mapboxgl.NavigationControl({ showCompass: true }), 'top-right')
    mapRef.current.addControl(new mapboxgl.ScaleControl({ maxWidth: 100, unit: 'metric' }), 'bottom-left')

    return () => {
      mapRef.current?.remove()
      mapRef.current = null
    }
  }, [])

  useEffect(() => {
    if (!mapRef.current) return

    const addMarkers = () => {
      markersRef.current.forEach((m) => m.remove())
      markersRef.current = []

      collections.forEach((c) => {
        if (!c.latitude || !c.longitude) return

        const el = createPinElement(c.plastic_type, c.weight_kg)
        const typeInfo = PLASTIC_TYPES[c.plastic_type] || PLASTIC_TYPES.Other

        const popup = new mapboxgl.Popup({
          offset: 16,
          className: 'sukutera-popup',
          closeButton: false,
          maxWidth: '220px',
        }).setHTML(`
          <div style="
            background: #0F2A3D;
            border: 1px solid rgba(255,255,255,0.1);
            border-radius: 12px;
            padding: 12px;
            font-family: Inter, sans-serif;
            color: #fff;
          ">
            <div style="display:flex;align-items:center;gap:8px;margin-bottom:8px;">
              <span style="
                display:inline-block;
                width:10px;height:10px;
                border-radius:50%;
                background:${typeInfo.color};
                box-shadow: 0 0 8px ${typeInfo.color};
              "></span>
              <span style="font-weight:600;font-size:13px;">${c.plastic_type}</span>
            </div>
            <div style="font-size:20px;font-weight:800;color:#F5E6C8;">${formatKg(c.weight_kg)}</div>
            ${c.district ? `<div style="font-size:11px;color:rgba(255,255,255,0.5);margin-top:4px;">${c.district} District</div>` : ''}
            ${c.notes ? `<div style="font-size:11px;color:rgba(255,255,255,0.6);margin-top:6px;line-height:1.4;">${c.notes}</div>` : ''}
            <div style="font-size:11px;color:#0A7C6E;margin-top:6px;font-weight:500;">+${typeInfo.points * Math.round(c.weight_kg)} pts</div>
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
  }, [collections])

  return (
    <div
      ref={mapContainer}
      className={className}
      style={{ width: '100%', height: '100%', borderRadius: 'inherit' }}
    />
  )
}
