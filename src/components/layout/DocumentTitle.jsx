import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

const TITLES = {
  '/': 'Sukutera · Lake Kivu Conservation',
  '/map': 'Live Map · Sukutera',
  '/log': 'Log Collection · Sukutera',
  '/leaderboard': 'Leaderboard · Sukutera',
  '/ecosystem': 'Partner Ecosystem · Sukutera',
  '/impact': 'Impact Dashboard · Sukutera',
}

export default function DocumentTitle() {
  const { pathname } = useLocation()

  useEffect(() => {
    document.title = TITLES[pathname] || 'Page Not Found · Sukutera'
  }, [pathname])

  return null
}
