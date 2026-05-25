export function formatKg(kg) {
  const n = typeof kg === 'number' && !isNaN(kg) ? kg : 0
  if (n >= 1000) return `${(n / 1000).toFixed(1)}t`
  return `${n.toFixed(1)} kg`
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
