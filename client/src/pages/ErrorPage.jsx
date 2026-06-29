import { useNavigate, useRouteError } from 'react-router-dom'

export default function ErrorPage({ error: boundaryError }) {
  const routeError = useRouteError()
  const navigate = useNavigate()

  const error = boundaryError || routeError
  const message = error?.statusText || error?.message || 'Something went wrong.'

  return (
    <div style={S.page}>
      <div style={S.glow} />
      <div style={S.card}>
        <div style={S.iconWrap}>
          <AlertIcon />
        </div>
        <h1 style={S.title}>Quest Failed</h1>
        <p style={S.sub}>An unexpected error has occurred in the realm.</p>
        <p style={S.detail}>{message}</p>
        <div style={S.actions}>
          <button className="btn-primary" onClick={() => navigate('/dashboard')} style={{ padding: '11px 28px' }}>
            Return to Dashboard
          </button>
          <button className="btn-outline" onClick={() => navigate(-1)} style={{ padding: '11px 22px' }}>
            Go Back
          </button>
        </div>
      </div>
    </div>
  )
}

const S = {
  page: {
    minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center',
    background: 'var(--bg)', position: 'relative', overflow: 'hidden',
  },
  glow: {
    position: 'absolute', width: 500, height: 500, borderRadius: '50%',
    background: 'radial-gradient(circle, rgba(139,43,226,0.18) 0%, transparent 70%)',
    top: '50%', left: '50%', transform: 'translate(-50%, -50%)',
    pointerEvents: 'none',
  },
  card: {
    background: 'var(--bg-card)', border: '1px solid var(--border)',
    borderRadius: 16, padding: '48px 52px', maxWidth: 480, width: '90%',
    textAlign: 'center', position: 'relative', zIndex: 1,
    boxShadow: '0 8px 48px rgba(0,0,0,0.5)',
  },
  iconWrap: {
    width: 64, height: 64, borderRadius: '50%',
    background: 'rgba(239,68,68,.12)', border: '1px solid rgba(239,68,68,.3)',
    display: 'flex', alignItems: 'center', justifyContent: 'center',
    margin: '0 auto 24px', color: '#f87171',
  },
  title: {
    fontFamily: "'Cinzel', serif", fontSize: 28, fontWeight: 700,
    color: 'var(--text)', marginBottom: 10,
    textShadow: '0 0 30px rgba(180,79,255,.4)',
  },
  sub: { fontSize: 14, color: 'var(--text-muted)', marginBottom: 12 },
  detail: {
    fontSize: 12, color: 'var(--text-dim)',
    background: 'var(--bg-card-2)', border: '1px solid var(--border)',
    borderRadius: 8, padding: '10px 14px', marginBottom: 28,
    fontFamily: 'monospace', wordBreak: 'break-word',
  },
  actions: { display: 'flex', gap: 10, justifyContent: 'center', flexWrap: 'wrap' },
}

function AlertIcon() {
  return (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/>
      <line x1="12" y1="9" x2="12" y2="13"/>
      <line x1="12" y1="17" x2="12.01" y2="17"/>
    </svg>
  )
}
