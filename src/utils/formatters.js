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

export function timeAgo(dateStr) {
  if (!dateStr) return 'Recently'
  const diff = Date.now() - new Date(dateStr).getTime()
  const mins = Math.floor(diff / 60000)
  if (mins < 1) return 'Just now'
  if (mins < 60) return `${mins} min ago`
  const hrs = Math.floor(mins / 60)
  if (hrs < 24) return `${hrs} hr${hrs !== 1 ? 's' : ''} ago`
  const days = Math.floor(hrs / 24)
  return `${days} day${days !== 1 ? 's' : ''} ago`
}
