import { MapContainer, TileLayer, CircleMarker, Popup } from 'react-leaflet'
import { LAKE_KIVU_CENTER, PLASTIC_TYPES } from '../../lib/constants'
import { formatKg } from '../../utils/formatters'

function getMarkerColor(plasticType) {
  return PLASTIC_TYPES[plasticType]?.color ?? '#6B7280'
}

function getLocationName(collection) {
  return collection.notes || collection.district || 'Lake Kivu'
}

export default function LiveMap({ collections = [], className = '' }) {
  return (
    <div
      className={`sukutera-map ${className}`.trim()}
      style={{ height: '75vh', width: '100%' }}
    >
      <MapContainer
        center={[LAKE_KIVU_CENTER.lat, LAKE_KIVU_CENTER.lng]}
        zoom={11}
        style={{ height: '100%', width: '100%' }}
        scrollWheelZoom
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {collections.map((c, index) => {
          if (c.latitude == null || c.longitude == null) return null

          const color = getMarkerColor(c.plastic_type)
          const locationName = getLocationName(c)

          return (
            <CircleMarker
              key={c.id ?? `${c.latitude}-${c.longitude}-${index}`}
              center={[c.latitude, c.longitude]}
              radius={10}
              pathOptions={{
                color: '#ffffff',
                weight: 2,
                fillColor: color,
                fillOpacity: 0.8,
              }}
            >
              <Popup>
                <div className="sukutera-popup">
                  <div className="sukutera-popup__title">{locationName}</div>
                  <div className="sukutera-popup__row">
                    <span>Weight</span>
                    <strong>{formatKg(c.weight_kg)}</strong>
                  </div>
                  <div className="sukutera-popup__row">
                    <span>Type</span>
                    <strong style={{ color }}>{c.plastic_type}</strong>
                  </div>
                  <div className="sukutera-popup__row">
                    <span>District</span>
                    <strong>{c.district || 'Lake Kivu'}</strong>
                  </div>
                </div>
              </Popup>
            </CircleMarker>
          )
        })}
      </MapContainer>
    </div>
  )
}
