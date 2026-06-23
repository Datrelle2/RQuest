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

  function handleSubmit(e) {
    e.preventDefault()
    setError('')
    const ok = login(email, password)
    if (ok) navigate('/dashboard')
    else setError('Invalid credentials. Try any email + password.')
  }

  return (
    <div style={S.page}>
      {/* Left panel */}
      <div style={S.left}>
        <div style={S.leftGlow} />
        <div style={S.logoWrap}>
          <div style={S.logoBox}><DiamondIcon /></div>
          <div>
            <div style={S.logoLabel}>Random</div>
            <div style={S.logoName}>Quest</div>
          </div>
        </div>
        <div style={S.quoteWrap}>
          <blockquote style={S.quote}>
            "The Quest is Not Chosen — It Is Drawn."
          </blockquote>
          <cite style={S.cite}>— The Quest Codex, Vol. III</cite>
        </div>
        <div style={S.stats}>
          {[
            { value: '12k+', label: 'Adventurers' },
            { value: '30k+', label: 'Quests' },
            { value: '6',    label: 'Seasons' },
          ].map(s => (
            <div key={s.label} style={S.stat}>
              <span style={S.statVal}>{s.value}</span>
              <span style={S.statLabel}>{s.label}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Right panel */}
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
              <div style={{ textAlign: 'right' }}>
                <span style={S.forgot}>Forgot password?</span>
              </div>
            </div>

            {error && <p style={S.error}>{error}</p>}

            <button type="submit" className="btn-primary" style={{ width: '100%', padding: '12px' }}>
              <SignInIcon /> Sign In
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
    background: 'linear-gradient(135deg, #0b0b18 0%, #100d20 50%, #0e0b1a 100%)',
    display: 'flex', flexDirection: 'column',
    padding: '32px 48px',
    overflow: 'hidden',
  },
  leftGlow: {
    position: 'absolute', top: '20%', left: '30%',
    width: 400, height: 400, borderRadius: '50%',
    background: 'radial-gradient(circle, rgba(124,58,237,.18) 0%, transparent 70%)',
    pointerEvents: 'none',
  },
  logoWrap: {
    display: 'flex', alignItems: 'center', gap: 10, marginBottom: 'auto',
  },
  logoBox: {
    width: 32, height: 32, background: 'var(--purple)', borderRadius: 7,
    display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff',
    flexShrink: 0,
  },
  logoLabel: { fontFamily: "'Cinzel',serif", fontSize: 9, color: 'var(--text-muted)', letterSpacing: '0.1em', textTransform: 'uppercase' },
  logoName:  { fontFamily: "'Cinzel',serif", fontSize: 13, color: 'var(--text)', fontWeight: 700, letterSpacing: '0.06em', textTransform: 'uppercase' },
  quoteWrap: { marginTop: 'auto', marginBottom: 60 },
  quote: {
    fontFamily: "'Cinzel', serif", fontSize: 22, fontWeight: 600,
    color: 'var(--text)', lineHeight: 1.4, fontStyle: 'normal',
    marginBottom: 12,
  },
  cite: { fontSize: 12, color: 'var(--text-muted)', fontStyle: 'normal' },
  stats: { display: 'flex', gap: 40, paddingTop: 24, borderTop: '1px solid var(--border-subtle)' },
  stat: { display: 'flex', flexDirection: 'column', gap: 2 },
  statVal: { fontFamily: "'Cinzel',serif", fontSize: 20, fontWeight: 700, color: 'var(--text)' },
  statLabel: { fontSize: 11, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.08em' },
  right: {
    flex: 1,
    background: '#050509',
    display: 'flex', alignItems: 'center', justifyContent: 'center',
    padding: '32px',
  },
  formCard: {
    width: '100%', maxWidth: 360,
    background: 'var(--bg-card)', border: '1px solid var(--border)',
    borderRadius: 14, padding: '36px 32px',
  },
  heading: {
    fontFamily: "'Cinzel', serif", fontSize: 22, fontWeight: 700,
    color: 'var(--text)', marginBottom: 6,
  },
  sub: { fontSize: 13, color: 'var(--text-muted)', marginBottom: 28 },
  form: { display: 'flex', flexDirection: 'column', gap: 18 },
  forgot: { fontSize: 12, color: 'var(--purple-light)', cursor: 'pointer' },
  error: { fontSize: 12, color: '#f87171', textAlign: 'center' },
  switch: { marginTop: 20, textAlign: 'center', fontSize: 13, color: 'var(--text-muted)' },
  switchLink: { color: 'var(--purple-light)', fontWeight: 600 },
}

function DiamondIcon() {
  return <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2L2 9l10 13L22 9z"/></svg>
}
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
