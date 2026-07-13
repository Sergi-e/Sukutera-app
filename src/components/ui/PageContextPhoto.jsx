import AnimateInView from './AnimateInView'
import FieldPhoto from './FieldPhoto'
import { FIELD_CAPTION } from '../../lib/images'

export default function PageContextPhoto({ src, fallbackKey, alt, caption = FIELD_CAPTION, className = '' }) {
  return (
    <AnimateInView variant="fade-up">
      <FieldPhoto
        src={src}
        fallbackKey={fallbackKey}
        alt={alt}
        lazy
        hoverZoom
        caption={caption}
        className={`page-context-photo ${className}`.trim()}
      />
    </AnimateInView>
  )
}
