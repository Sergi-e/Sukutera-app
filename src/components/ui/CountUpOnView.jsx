import { useEffect, useRef, useState } from 'react'
import useInView from '../../hooks/useInView'

export default function CountUpOnView({
  target,
  suffix = '',
  prefix = '',
  decimals = 0,
  duration = 1800,
  className = '',
  style = {},
}) {
  const ref = useRef(null)
  const isInView = useInView(ref)
  const [value, setValue] = useState(0)
  const frameRef = useRef(null)

  useEffect(() => {
    if (!isInView) return

    let start = null
    const step = (timestamp) => {
      if (!start) start = timestamp
      const progress = Math.min((timestamp - start) / duration, 1)
      const eased = 1 - Math.pow(1 - progress, 3)
      const next = eased * target
      setValue(decimals > 0 ? Math.round(next * 10 ** decimals) / 10 ** decimals : Math.round(next))
      if (progress < 1) frameRef.current = requestAnimationFrame(step)
    }

    frameRef.current = requestAnimationFrame(step)
    return () => {
      if (frameRef.current) cancelAnimationFrame(frameRef.current)
    }
  }, [isInView, target, duration, decimals])

  const display = decimals > 0 ? value.toFixed(decimals) : value.toLocaleString()

  return (
    <span ref={ref} className={className} style={style}>
      {prefix}{display}{suffix}
    </span>
  )
}
