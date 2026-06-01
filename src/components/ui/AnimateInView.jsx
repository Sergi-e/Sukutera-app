import { useRef } from 'react'
import useInView from '../../hooks/useInView'

export default function AnimateInView({
  children,
  variant = 'fade-up',
  delay = 0,
  className = '',
  style = {},
  as: Tag = 'div',
}) {
  const ref = useRef(null)
  const isInView = useInView(ref)

  return (
    <Tag
      ref={ref}
      className={`scroll-reveal scroll-reveal--${variant} ${isInView ? 'scroll-reveal--visible' : ''} ${className}`.trim()}
      style={{ ...style, transitionDelay: `${delay}ms` }}
    >
      {children}
    </Tag>
  )
}
