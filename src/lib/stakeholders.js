export const STAKEHOLDER_CATEGORIES = {
  collection: {
    id: 'collection',
    label: 'Waste Collection',
    icon: '🏗️',
    color: '#0A7C6E',
    roleLabel: 'Primary collection partners',
  },
  recycling: {
    id: 'recycling',
    label: 'Recycling Companies',
    icon: '♻️',
    color: '#3B82F6',
    roleLabel: 'Off-taker partners / end buyers',
  },
  compost: {
    id: 'compost',
    label: 'Compost & Organic Processors',
    icon: '🌿',
    color: '#10B981',
    roleLabel: 'Organic waste off-takers',
  },
}

export const STAKEHOLDERS = [
  {
    id: 'baj-ltd',
    category: 'collection',
    name: 'Baj Ltd',
    initials: 'BL',
    location: 'Saga Bay area, Rubavu District',
    district: 'Rubavu',
    description: 'Active waste collector operating at Lake Kivu shores.',
    role: 'Primary collection partner',
    contact: 'Saga Bay area, Rubavu District',
    featured: true,
  },
  {
    id: 'ecoplastic',
    category: 'recycling',
    name: 'Ecoplastic Rwanda',
    initials: 'ER',
    location: 'Kigali',
    district: 'Kigali',
    description: 'PET plastic recycler processing post-consumer bottles into new products.',
    role: 'Off-taker partner / end buyer',
    contact: 'Kigali, Rwanda',
    accepts: ['PET'],
  },
  {
    id: 'polytank',
    category: 'recycling',
    name: 'Polytank Rwanda',
    initials: 'PR',
    location: 'Kigali',
    district: 'Kigali',
    description: 'HDPE recycler and manufacturer serving agriculture and industrial sectors.',
    role: 'Off-taker partner / end buyer',
    contact: 'Kigali, Rwanda',
    accepts: ['HDPE'],
  },
  {
    id: 'cipla',
    category: 'recycling',
    name: 'CIPLA Quality Chemical',
    initials: 'CQ',
    location: 'Kigali',
    district: 'Kigali',
    description: 'Industrial plastic processor handling high-volume plastic waste streams.',
    role: 'Off-taker partner / end buyer',
    contact: 'Kigali, Rwanda',
    accepts: ['Mixed', 'Other'],
  },
  {
    id: 'rab',
    category: 'compost',
    name: 'Rwanda Agriculture Board (RAB)',
    initials: 'RA',
    location: 'Kigali',
    district: 'Kigali',
    description: 'National agriculture body supporting organic waste conversion to compost.',
    role: 'Organic waste off-taker',
    contact: 'Kigali, Rwanda',
    accepts: ['organic'],
  },
  {
    id: 'green-future',
    category: 'compost',
    name: 'Green Future Rwanda',
    initials: 'GF',
    location: 'Western Province',
    district: 'Western Province',
    description: 'Community composting initiative turning organic waste into soil inputs.',
    role: 'Organic waste off-taker',
    contact: 'Western Province, Rwanda',
    accepts: ['organic'],
  },
  {
    id: 'kigali-farms',
    category: 'compost',
    name: 'Kigali Farms',
    initials: 'KF',
    location: 'Kigali',
    district: 'Kigali',
    description: 'Organic waste processing for agricultural and urban farming applications.',
    role: 'Organic waste off-taker',
    contact: 'Kigali, Rwanda',
    accepts: ['organic'],
  },
]

export function getOffTakersForPlastic(plasticType) {
  return STAKEHOLDERS.filter(
    (s) => s.category === 'recycling' && s.accepts?.includes(plasticType)
  )
}

export function getCollectionPartner() {
  return STAKEHOLDERS.find((s) => s.featured)
}
