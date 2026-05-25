import { PLASTIC_TYPES } from '../lib/constants'

export function calculatePoints(weightKg, plasticType) {
  const type = PLASTIC_TYPES[plasticType]
  if (!type) return 0
  return Math.round(weightKg * type.points)
}

export function getRank(totalPoints) {
  if (totalPoints >= 1000) return { label: 'Lake Guardian', color: '#F59E0B', icon: '🏆' }
  if (totalPoints >= 500) return { label: 'Shoreline Champion', color: '#10B981', icon: '🥇' }
  if (totalPoints >= 200) return { label: 'Eco Warrior', color: '#3B82F6', icon: '🥈' }
  if (totalPoints >= 50) return { label: 'Collector', color: '#0A7C6E', icon: '🥉' }
  return { label: 'Newcomer', color: '#6B7280', icon: '🌱' }
}

export function formatPoints(pts) {
  return pts.toLocaleString() + ' pts'
}
