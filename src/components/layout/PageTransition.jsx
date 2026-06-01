import { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'

export default function PageTransition({ children }) {
  const { pathname } = useLocation()
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    setVisible(false)
    const id = requestAnimationFrame(() => setVisible(true))
    return () => cancelAnimationFrame(id)
  }, [pathname])

  return (
    <div className={`page-transition ${visible ? 'page-transition--visible' : ''}`}>
      {children}
    </div>
  )
}
