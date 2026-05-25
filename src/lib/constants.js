export const LAKE_KIVU_CENTER = { lat: -1.7389, lng: 29.0167 }

export const DISTRICTS = ['Rubavu', 'Karongi', 'Rusizi']

export const PLASTIC_TYPES = {
  PET: { color: '#3B82F6', points: 10, label: 'PET Bottles' },
  HDPE: { color: '#10B981', points: 8, label: 'HDPE Containers' },
  Mixed: { color: '#F59E0B', points: 5, label: 'Mixed Plastic' },
  Other: { color: '#6B7280', points: 3, label: 'Other' },
}

export const DISTRICT_TARGETS = {
  Rubavu: { shoreline_km: 28.4, target_kg: 500 },
  Karongi: { shoreline_km: 42.1, target_kg: 750 },
  Rusizi: { shoreline_km: 35.7, target_kg: 620 },
}

export const MAPBOX_STYLE = 'mapbox://styles/mapbox/navigation-night-v1'

export const SEED_COLLECTIONS = [
  // Rubavu district
  { collector_id: 'seed-1', latitude: -1.6784, longitude: 29.2544, weight_kg: 4.2, plastic_type: 'PET', district: 'Rubavu', notes: 'Near Gisenyi beach' },
  { collector_id: 'seed-2', latitude: -1.6901, longitude: 29.2611, weight_kg: 2.8, plastic_type: 'HDPE', district: 'Rubavu', notes: 'Hotel shoreline' },
  { collector_id: 'seed-1', latitude: -1.6845, longitude: 29.2478, weight_kg: 6.1, plastic_type: 'Mixed', district: 'Rubavu', notes: 'Market area runoff' },
  { collector_id: 'seed-3', latitude: -1.7012, longitude: 29.2390, weight_kg: 1.5, plastic_type: 'PET', district: 'Rubavu', notes: 'Fishing dock' },
  // Karongi district
  { collector_id: 'seed-4', latitude: -2.0673, longitude: 29.3901, weight_kg: 3.7, plastic_type: 'Mixed', district: 'Karongi', notes: 'Karongi peninsula' },
  { collector_id: 'seed-5', latitude: -2.0812, longitude: 29.3745, weight_kg: 5.4, plastic_type: 'PET', district: 'Karongi', notes: 'Near ferry terminal' },
  { collector_id: 'seed-4', latitude: -2.0590, longitude: 29.4012, weight_kg: 2.1, plastic_type: 'HDPE', district: 'Karongi', notes: 'Rocky inlet' },
  { collector_id: 'seed-6', latitude: -2.0934, longitude: 29.3612, weight_kg: 8.3, plastic_type: 'Mixed', district: 'Karongi', notes: 'Community effort' },
  // Rusizi district
  { collector_id: 'seed-7', latitude: -2.4834, longitude: 28.9051, weight_kg: 5.0, plastic_type: 'PET', district: 'Rusizi', notes: 'Rusizi delta shore' },
  { collector_id: 'seed-8', latitude: -2.4712, longitude: 28.9123, weight_kg: 3.3, plastic_type: 'Other', district: 'Rusizi', notes: 'River mouth area' },
  { collector_id: 'seed-7', latitude: -2.4923, longitude: 28.8978, weight_kg: 4.8, plastic_type: 'HDPE', district: 'Rusizi', notes: 'Lakeside village' },
  { collector_id: 'seed-9', latitude: -2.4645, longitude: 28.9201, weight_kg: 7.2, plastic_type: 'Mixed', district: 'Rusizi', notes: 'Seasonal high water mark' },
]

export const SEED_COLLECTORS = [
  { id: 'seed-1', name: 'Amina Uwimana', phone: '+250781234567', district: 'Rubavu', total_kg: 48.3, total_points: 420 },
  { id: 'seed-2', name: 'Jean-Paul Habimana', phone: '+250782345678', district: 'Rubavu', total_kg: 31.2, total_points: 285 },
  { id: 'seed-3', name: 'Chantal Mukamurera', phone: '+250783456789', district: 'Rubavu', total_kg: 22.7, total_points: 198 },
  { id: 'seed-4', name: 'Emmanuel Nkurunziza', phone: '+250784567890', district: 'Karongi', total_kg: 55.1, total_points: 487 },
  { id: 'seed-5', name: 'Vestine Kayitesi', phone: '+250785678901', district: 'Karongi', total_kg: 39.8, total_points: 351 },
  { id: 'seed-6', name: 'Patrick Nzeyimana', phone: '+250786789012', district: 'Karongi', total_kg: 28.4, total_points: 243 },
  { id: 'seed-7', name: 'Marie-Claire Ingabire', phone: '+250787890123', district: 'Rusizi', total_kg: 61.7, total_points: 534 },
  { id: 'seed-8', name: 'Innocent Bizimana', phone: '+250788901234', district: 'Rusizi', total_kg: 44.5, total_points: 388 },
  { id: 'seed-9', name: 'Solange Mukamana', phone: '+250789012345', district: 'Rusizi', total_kg: 37.1, total_points: 321 },
]
