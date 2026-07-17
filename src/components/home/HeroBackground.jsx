import { useEffect, useRef, useState } from 'react'
import { FIELD_IMAGES, FIELD_IMAGE_FALLBACKS } from '../../lib/images'

export default function HeroBackground() {
  const heroRef = useRef(null)
  const [parallaxY, setParallaxY] = useState(0)
  const [bgUrl, setBgUrl] = useState(FIELD_IMAGES.hero)
  const [loaded, setLoaded] = useState(false)

  useEffect(() => {
    const img = new Image()
    img.src = FIELD_IMAGES.hero
    img.onload = () => {
      setBgUrl(FIELD_IMAGES.hero)
      setLoaded(true)
    }
    img.onerror = () => {
      setBgUrl(FIELD_IMAGE_FALLBACKS.hero)
      setLoaded(true)
    }
  }, [])

  useEffect(() => {
    const onScroll = () => {
      if (!heroRef.current) return
      setParallaxY(window.scrollY * 0.4)
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    onScroll()
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <>
      {/* TODO: Replace with actual field photo from /public/images/hero-lake.jpg */}
      <div
        ref={heroRef}
        className={`hero-bg-photo ${loaded ? 'field-photo--loaded' : ''}`}
        style={{
          backgroundImage: `url(${bgUrl})`,
          transform: `translate3d(0, ${parallaxY}px, 0) scale(1.08)`,
        }}
        aria-hidden="true"
      />
      <div className="hero-bg-overlay" aria-hidden="true" />
    </>
  )
}
