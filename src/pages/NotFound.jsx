import { Link } from 'react-router-dom'

export default function NotFound() {
  return (
    <div
      style={{
        minHeight: '100vh',
        paddingTop: 120,
        paddingBottom: 64,
        paddingLeft: 24,
        paddingRight: 24,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        boxSizing: 'border-box',
      }}
    >
      <div style={{ textAlign: 'center', maxWidth: 420 }}>
        <div style={{ fontSize: 64, fontWeight: 900, color: 'rgba(10,124,110,0.35)', lineHeight: 1, marginBottom: 12 }}>
          404
        </div>
        <h1 style={{ fontSize: 28, fontWeight: 800, color: '#fff', marginBottom: 10 }}>
          Page not found
        </h1>
        <p style={{ fontSize: 14, color: 'rgba(255,255,255,0.5)', lineHeight: 1.65, marginBottom: 28 }}>
          This route doesn&apos;t exist. Head back to the dashboard or explore the partner ecosystem.
        </p>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10, justifyContent: 'center' }}>
          <Link
            to="/"
            style={{
              padding: '10px 20px',
              borderRadius: 10,
              background: 'linear-gradient(135deg, #0A7C6E, #0d9e8e)',
              color: '#fff',
              fontSize: 13,
              fontWeight: 700,
              textDecoration: 'none',
            }}
          >
            Go Home
          </Link>
          <Link
            to="/ecosystem"
            style={{
              padding: '10px 20px',
              borderRadius: 10,
              background: 'rgba(255,255,255,0.06)',
              border: '1px solid rgba(255,255,255,0.12)',
              color: 'rgba(255,255,255,0.75)',
              fontSize: 13,
              fontWeight: 600,
              textDecoration: 'none',
            }}
          >
            View Ecosystem
          </Link>
        </div>
      </div>
    </div>
  )
}
