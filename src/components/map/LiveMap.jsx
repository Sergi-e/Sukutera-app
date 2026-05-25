import { useEffect, useMemo } from 'react'
import { MapContainer, TileLayer, CircleMarker, Popup, useMap } from 'react-leaflet'
import 'leaflet/dist/leaflet.css'
import { LAKE_KIVU_CENTER, PLASTIC_TYPES } from '../../lib/constants'
import { formatKg } from '../../utils/formatters'

const CENTER = [LAKE_KIVU_CENTER.lat, LAKE_KIVU_CENTER.lng]
const START_ZOOM = 8
const END_ZOOM = 11

function markerColor(plasticType) {
  return PLASTIC_TYPES[plasticType]?.color || PLASTIC_TYPES.Other.color
}

function FlyToLakeKivu() {
  const map = useMap()

  useEffect(() => {
    map.flyTo(CENTER, END_ZOOM, { duration: 2.6 })
  }, [map])

  return null
}

function CollectionPopup({ collection, collectorName }) {
  const color = markerColor(collection.plastic_type)

  return (
    <div className="live-map-popup">
      <div className="live-map-popup__header">
        <span className="live-map-popup__dot" style={{ background: color }} />
        <span className="live-map-popup__type">{collection.plastic_type}</span>
      </div>
      <p className="live-map-popup__name">{collectorName}</p>
      <p className="live-map-popup__weight">{formatKg(collection.weight_kg)}</p>
      <p className="live-map-popup__district">{collection.district || 'Lake Kivu'}</p>
    </div>
  )
}

export default function LiveMap({ collections = [], collectors = [], className = '' }) {
  const collectorMap = useMemo(
    () =>
      collectors.reduce((map, collector) => {
        map[collector.id] = collector.name
        return map
      }, {}),
    [collectors],
  )

  const points = useMemo(
    () => collections.filter((c) => c.latitude && c.longitude),
    [collections],
  )

  return (
    <div className={`live-map-wrap ${className}`.trim()}>
      <MapContainer center={CENTER} zoom={START_ZOOM} scrollWheelZoom className="live-map-container">
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <FlyToLakeKivu />
        {points.map((collection, index) => {
          const color = markerColor(collection.plastic_type)

          return (
            <CircleMarker
              key={collection.id ?? `${collection.latitude}-${collection.longitude}-${index}`}
              center={[collection.latitude, collection.longitude]}
              radius={10}
              pathOptions={{
                color,
                fillColor: color,
                fillOpacity: 0.85,
                weight: 2,
              }}
            >
              <Popup>
                <CollectionPopup
                  collection={collection}
                  collectorName={collectorMap[collection.collector_id] || 'Unknown Collector'}
                />
              </Popup>
            </CircleMarker>
          )
        })}
      </MapContainer>
    </div>
  )
}
