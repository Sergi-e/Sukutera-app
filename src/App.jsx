import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'
import Navbar from './components/layout/Navbar'
import Footer from './components/layout/Footer'
import ScrollToTop from './components/layout/ScrollToTop'
import DocumentTitle from './components/layout/DocumentTitle'
import Home from './pages/Home'
import MapView from './pages/MapView'
import LogCollection from './pages/LogCollection'
import LeaderboardPage from './pages/LeaderboardPage'
import EcosystemPage from './pages/EcosystemPage'
import ImpactDashboard from './pages/ImpactDashboard'
import NotFound from './pages/NotFound'

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
          <Route path="/ecosystem" element={<EcosystemPage />} />
          <Route path="/impact" element={<ImpactDashboard />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      {!isMapPage && <Footer />}
    </div>
  )
}

export default function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <DocumentTitle />
      <AppLayout />
    </BrowserRouter>
  )
}
