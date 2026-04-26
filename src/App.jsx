import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'
import Navbar from './components/layout/Navbar'
import Footer from './components/layout/Footer'
import Home from './pages/Home'
import MapView from './pages/MapView'
import LogCollection from './pages/LogCollection'
import LeaderboardPage from './pages/LeaderboardPage'
import ImpactDashboard from './pages/ImpactDashboard'

function AppLayout() {
  const location = useLocation()
  const isMapPage = location.pathname === '/map'

  return (
    <div className="flex flex-col min-h-screen" style={{ background: '#0B1F2E' }}>
      <Navbar />
      <main className={isMapPage ? 'flex-1 flex flex-col' : 'flex-1'}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/map" element={<MapView />} />
          <Route path="/log" element={<LogCollection />} />
          <Route path="/leaderboard" element={<LeaderboardPage />} />
          <Route path="/impact" element={<ImpactDashboard />} />
        </Routes>
      </main>
      {!isMapPage && <Footer />}
    </div>
  )
}

export default function App() {
  return (
    <BrowserRouter>
      <AppLayout />
    </BrowserRouter>
  )
}
