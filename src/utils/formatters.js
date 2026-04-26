export function formatKg(kg) {
  if (kg >= 1000) return `${(kg / 1000).toFixed(1)}t`
  return `${kg.toFixed(1)} kg`
}

export function formatDate(dateStr) {
  return new Intl.DateTimeFormat('en-RW', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  }).format(new Date(dateStr))
}

export function formatShortDate(dateStr) {
  return new Intl.DateTimeFormat('en-RW', {
    day: 'numeric',
    month: 'short',
  }).format(new Date(dateStr))
}

export function getInitials(name) {
  return name
    .split(' ')
    .map((n) => n[0])
    .join('')
    .toUpperCase()
    .slice(0, 2)
}

export function percentOf(value, total) {
  if (!total) return 0
  return Math.round((value / total) * 100)
}
