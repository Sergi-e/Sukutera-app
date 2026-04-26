import { PLASTIC_TYPES } from '../../lib/constants'

export function getPinColor(plasticType) {
  return PLASTIC_TYPES[plasticType]?.color ?? '#6B7280'
}

export function createPinElement(plasticType, weightKg) {
  const el = document.createElement('div')
  const color = getPinColor(plasticType)
  const size = Math.min(Math.max(weightKg * 4, 12), 36)

  el.style.cssText = `
    width: ${size}px;
    height: ${size}px;
    background: ${color};
    border-radius: 50%;
    border: 2px solid rgba(255,255,255,0.8);
    box-shadow: 0 0 ${size}px ${color}60, 0 2px 8px rgba(0,0,0,0.5);
    cursor: pointer;
    transition: transform 0.2s ease;
  `
  el.addEventListener('mouseenter', () => {
    el.style.transform = 'scale(1.3)'
  })
  el.addEventListener('mouseleave', () => {
    el.style.transform = 'scale(1)'
  })

  return el
}
