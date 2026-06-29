import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useApp } from '../context/AppContext'

export default function Login() {
  const { login } = useApp()
  const navigate = useNavigate()
  const [email, setEmail]       = useState('')
  const [password, setPassword] = useState('')
  const [showPw, setShowPw]     = useState(false)
  const [error, setError]       = useState('')
  const [loading, setLoading]   = useState(false)

  async function handleSubmit(e) {
    e.preventDefault()
    if (!email || !password) { setError('Please enter your email and password.'); return }
    setError('')
    setLoading(true)
    const result = await login(email, password)
    setLoading(false)
    if (result.status === 'ok') navigate('/dashboard')
    else setError(result.message)
  }

  return (
    <div style={S.page}>

      {/* ── Left panel ── */}
      <div style={S.left}>
        {/* Ambient glows */}
        <div style={S.glow1} />
        <div style={S.glow2} />

        {/* Centered logo block */}
        <div style={S.logoBlock}>
          <div style={S.crystalWrap}>
            <CrystalLogo size={180} />
          </div>
          <div style={S.brandLabel}>Random</div>
          <div style={S.brandName}>Quest</div>
        </div>

        {/* Quote */}
        <div style={S.quoteWrap}>
          <blockquote style={S.quote}>
            "The Quest is Not Chosen — It Is Drawn."
          </blockquote>
        </div>
      </div>

      {/* ── Right panel ── */}
      <div style={S.right}>
        <div style={S.formCard}>
          <h1 style={S.heading}>Enter the Realm</h1>
          <p style={S.sub}>Sign in to continue your quest</p>

          <form onSubmit={handleSubmit} style={S.form}>
            <div className="form-group">
              <label className="form-label">Email Address</label>
              <div className="input-wrap">
                <span className="input-icon"><MailIcon /></span>
                <input
                  className="form-input"
                  type="email" placeholder="herald@realm.io"
                  value={email} onChange={e => setEmail(e.target.value)}
                  autoComplete="email"
                />
              </div>
            </div>

            <div className="form-group">
              <label className="form-label">Password</label>
              <div className="input-wrap">
                <span className="input-icon"><LockIcon /></span>
                <input
                  className="form-input"
                  type={showPw ? 'text' : 'password'} placeholder="••••••••••"
                  value={password} onChange={e => setPassword(e.target.value)}
                  autoComplete="current-password"
                />
                <button type="button" className="input-toggle" onClick={() => setShowPw(v => !v)}>
                  {showPw ? <EyeOffIcon /> : <EyeIcon />}
                </button>
              </div>
            </div>

            {error && <p style={S.error}>{error}</p>}

            <button
              type="submit"
              className="btn-primary"
              style={{ width: '100%', padding: '13px' }}
              disabled={loading}
            >
              {loading ? 'Signing in…' : <><SignInIcon /> Sign In</>}
            </button>
          </form>

          <p style={S.switch}>
            No account?{' '}
            <Link to="/register" style={S.switchLink}>Register here</Link>
          </p>
        </div>
      </div>
    </div>
  )
}

const S = {
  page: {
    display: 'flex', height: '100vh', overflow: 'hidden',
    background: 'var(--bg)',
  },
  left: {
    flex: '0 0 58%', position: 'relative',
    background: 'linear-gradient(145deg, #07071a 0%, #0f0b24 45%, #0a0818 100%)',
    display: 'flex', flexDirection: 'column',
    alignItems: 'center', justifyContent: 'center',
    padding: '48px 60px',
    gap: 48,
    overflow: 'hidden',
  },
  glow1: {
    position: 'absolute', top: '15%', left: '20%',
    width: 480, height: 480, borderRadius: '50%',
    background: 'radial-gradient(circle, rgba(124,58,237,.22) 0%, transparent 65%)',
    pointerEvents: 'none',
  },
  glow2: {
    position: 'absolute', bottom: '10%', right: '15%',
    width: 300, height: 300, borderRadius: '50%',
    background: 'radial-gradient(circle, rgba(157,94,245,.12) 0%, transparent 70%)',
    pointerEvents: 'none',
  },
  logoBlock: {
    display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 14,
    position: 'relative', zIndex: 1,
  },
  crystalWrap: {
    filter: 'drop-shadow(0 0 32px rgba(124,58,237,0.55)) drop-shadow(0 0 8px rgba(196,181,253,0.3))',
    marginBottom: 4,
  },
  brandLabel: {
    fontFamily: "'Cinzel', serif", fontSize: 15, color: 'var(--text-muted)',
    letterSpacing: '0.35em', textTransform: 'uppercase',
  },
  brandName: {
    fontFamily: "'Cinzel', serif", fontSize: 52, color: 'var(--text)',
    fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase',
    lineHeight: 1, marginTop: -6,
  },
  quoteWrap: {
    textAlign: 'center', zIndex: 1,
    borderTop: '1px solid rgba(124,58,237,.2)',
    paddingTop: 36, width: '100%', maxWidth: 420,
  },
  quote: {
    fontFamily: "'Cinzel', serif", fontSize: 18, fontWeight: 600,
    color: 'var(--text)', lineHeight: 1.5, fontStyle: 'normal', marginBottom: 10,
  },
  right: {
    flex: 1, background: '#050509',
    display: 'flex', alignItems: 'center', justifyContent: 'center',
    padding: '32px',
  },
  formCard: {
    width: '100%', maxWidth: 380,
    background: 'var(--bg-card)', border: '1px solid var(--border)',
    borderRadius: 16, padding: '42px 38px',
  },
  heading: {
    fontFamily: "'Cinzel', serif", fontSize: 24, fontWeight: 700,
    color: 'var(--text)', marginBottom: 6,
  },
  sub: { fontSize: 13, color: 'var(--text-muted)', marginBottom: 28 },
  form: { display: 'flex', flexDirection: 'column', gap: 18 },
  error: { fontSize: 12, color: '#f87171', textAlign: 'center', background: 'rgba(248,113,113,.08)', border: '1px solid rgba(248,113,113,.2)', borderRadius: 8, padding: '8px 12px' },
  switch: { marginTop: 22, textAlign: 'center', fontSize: 13, color: 'var(--text-muted)' },
  switchLink: { color: 'var(--purple-light)', fontWeight: 600 },
}

/* ── Crystal gem logo ─────────────────────────────────────────────────────── */
function CrystalLogo({ size }) {
  const id = 'lg'
  return (
    <svg width={size} height={size} viewBox="0 0 100 115" fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id={`${id}A`} x1="10" y1="0" x2="90" y2="115" gradientUnits="userSpaceOnUse">
          <stop offset="0%"   stopColor="#c4b5fd"/>
          <stop offset="45%"  stopColor="#7c3aed"/>
          <stop offset="100%" stopColor="#3b0764"/>
        </linearGradient>
        <linearGradient id={`${id}B`} x1="50" y1="0" x2="50" y2="50" gradientUnits="userSpaceOnUse">
          <stop offset="0%"   stopColor="#ffffff" stopOpacity="0.28"/>
          <stop offset="100%" stopColor="#ffffff" stopOpacity="0"/>
        </linearGradient>
        <linearGradient id={`${id}C`} x1="50" y1="45" x2="50" y2="115" gradientUnits="userSpaceOnUse">
          <stop offset="0%"   stopColor="#a78bfa" stopOpacity="0.18"/>
          <stop offset="100%" stopColor="#4c1d95" stopOpacity="0.9"/>
        </linearGradient>
      </defs>

      {/* ── Crown (top half) ── */}
      {/* Outer crown shape */}
      <polygon points="50,2 92,32 78,50 22,50 8,32" fill={`url(#${id}A)`} stroke="rgba(196,181,253,0.35)" strokeWidth="1"/>

      {/* Table facet highlight */}
      <polygon points="50,2 92,32 78,50 22,50 8,32" fill={`url(#${id}B)`}/>

      {/* Star facets from apex */}
      <polygon points="50,2  92,32  64,24" fill="rgba(255,255,255,0.16)"/>
      <polygon points="50,2  8,32   36,24" fill="rgba(255,255,255,0.10)"/>
      <polygon points="50,2  64,24  50,22  36,24" fill="rgba(255,255,255,0.22)"/>

      {/* Lower crown facets */}
      <polygon points="92,32 78,50 64,24" fill="rgba(0,0,0,0.22)"/>
      <polygon points="8,32  22,50 36,24" fill="rgba(255,255,255,0.08)"/>
      <polygon points="64,24 78,50 22,50 36,24 50,22" fill="rgba(255,255,255,0.06)"/>

      {/* Crown facet lines */}
      <line x1="50"  y1="2"  x2="64" y2="24" stroke="rgba(196,181,253,0.3)" strokeWidth="0.7"/>
      <line x1="50"  y1="2"  x2="36" y2="24" stroke="rgba(196,181,253,0.3)" strokeWidth="0.7"/>
      <line x1="50"  y1="2"  x2="50" y2="22" stroke="rgba(255,255,255,0.4)" strokeWidth="0.8"/>
      <line x1="36"  y1="24" x2="64" y2="24" stroke="rgba(196,181,253,0.25)" strokeWidth="0.6"/>
      <line x1="36"  y1="24" x2="22" y2="50" stroke="rgba(196,181,253,0.2)" strokeWidth="0.6"/>
      <line x1="64"  y1="24" x2="78" y2="50" stroke="rgba(196,181,253,0.2)" strokeWidth="0.6"/>

      {/* Girdle */}
      <line x1="22" y1="50" x2="78" y2="50" stroke="rgba(196,181,253,0.45)" strokeWidth="1.2"/>

      {/* ── Pavilion (bottom half) ── */}
      <polygon points="22,50 78,50 50,113" fill={`url(#${id}C)`} stroke="rgba(196,181,253,0.3)" strokeWidth="1"/>

      {/* Pavilion facets */}
      <polygon points="22,50 50,50 50,113" fill="rgba(255,255,255,0.07)"/>
      <polygon points="78,50 50,50 50,113" fill="rgba(0,0,0,0.18)"/>

      {/* Pavilion facet lines */}
      <line x1="50" y1="50" x2="50"  y2="113" stroke="rgba(196,181,253,0.3)" strokeWidth="0.7"/>
      <line x1="22" y1="50" x2="50"  y2="80"  stroke="rgba(196,181,253,0.18)" strokeWidth="0.6"/>
      <line x1="78" y1="50" x2="50"  y2="80"  stroke="rgba(196,181,253,0.18)" strokeWidth="0.6"/>
      <line x1="50" y1="80" x2="50"  y2="113" stroke="rgba(196,181,253,0.12)" strokeWidth="0.5"/>

      {/* ── Central sparkle ── */}
      <circle cx="50" cy="20" r="3.5" fill="white" opacity="0.7"/>
      <line x1="50" y1="10" x2="50" y2="30"  stroke="white" strokeWidth="1" opacity="0.4"/>
      <line x1="40" y1="20" x2="60" y2="20"  stroke="white" strokeWidth="1" opacity="0.4"/>
      <line x1="43" y1="13" x2="57" y2="27"  stroke="white" strokeWidth="0.7" opacity="0.25"/>
      <line x1="57" y1="13" x2="43" y2="27"  stroke="white" strokeWidth="0.7" opacity="0.25"/>
    </svg>
  )
}

/* ── Form icons ───────────────────────────────────────────────────────────── */
function MailIcon() {
  return <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
}
function LockIcon() {
  return <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
}
function EyeIcon() {
  return <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>
}
function EyeOffIcon() {
  return <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94"/><path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19"/><line x1="1" y1="1" x2="23" y2="23"/></svg>
}
function SignInIcon() {
  return <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4"/><polyline points="10 17 15 12 10 7"/><line x1="15" y1="12" x2="3" y2="12"/></svg>
}
