import { useState } from 'react'
import { FIELD_IMAGE_FALLBACKS } from '../../lib/images'

export default function FieldPhoto({
  src,
  fallbackKey,
  alt,
  lazy = true,
  className = '',
  caption,
  hoverZoom = false,
  style = {},
}) {
  const [loaded, setLoaded] = useState(false)
  const [currentSrc, setCurrentSrc] = useState(src)

  function handleError() {
    if (fallbackKey && FIELD_IMAGE_FALLBACKS[fallbackKey]) {
      setCurrentSrc(FIELD_IMAGE_FALLBACKS[fallbackKey])
    }
  }

  return (
    <figure
      className={`field-photo ${hoverZoom ? 'field-photo--zoom' : ''} ${loaded ? 'field-photo--loaded' : ''} ${className}`.trim()}
      style={style}
    >
      <img
        src={currentSrc}
        alt={alt}
        loading={lazy ? 'lazy' : 'eager'}
        decoding="async"
        onLoad={() => setLoaded(true)}
        onError={handleError}
        className="field-photo__img"
      />
      {caption && <figcaption className="field-photo__caption">{caption}</figcaption>}
    </figure>
  )
}
