import { useState, useEffect } from 'react'

export default function useInView(ref, options = {}) {
  const [isInView, setIsInView] = useState(false)
  const threshold = options.threshold ?? 0.15

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true)
          observer.unobserve(el)
        }
      },
      { threshold, rootMargin: options.rootMargin ?? '0px' }
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [ref, threshold, options.rootMargin])

  return isInView
}
