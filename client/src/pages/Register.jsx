import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useApp } from '../context/AppContext'

function PasswordReqs({ pw }) {
  const checks = [
    { label: '8+ characters',    ok: pw.length >= 8 },
    { label: 'Number',           ok: /\d/.test(pw) },
    { label: 'Uppercase letter', ok: /[A-Z]/.test(pw) },
    { label: 'Special character',ok: /[^a-zA-Z0-9]/.test(pw) },
  ]
  return (
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '4px 16px', marginTop: 4 }}>
      {checks.map(c => (
        <span key={c.label} style={{
          fontSize: 11, display: 'flex', alignItems: 'center', gap: 5,
          color: c.ok ? 'var(--easy)' : 'var(--text-muted)',
        }}>
          <span>{c.ok ? '✓' : '·'}</span>{c.label}
        </span>
      ))}
    </div>
  )
}

export default function Register() {
  const { register } = useApp()
  const navigate = useNavigate()
  const [name, setName]         = useState('')
  const [email, setEmail]       = useState('')
  const [password, setPassword] = useState('')
  const [confirm, setConfirm]   = useState('')
  const [showPw, setShowPw]     = useState(false)
  const [showCf, setShowCf]     = useState(false)
  const [error, setError]       = useState('')

  function handleSubmit(e) {
    e.preventDefault()
    setError('')
    if (password !== confirm) { setError('Passwords do not match.'); return }
    if (password.length < 8)  { setError('Password too short.'); return }
    register(name, email, password)
    navigate('/settings')
  }

  return (
    <div style={S.page}>
      <div style={S.inner}>
        <div style={S.logoWrap}>
          <div style={S.logoBox}><DiamondIcon /></div>
          <div>
            <div style={S.logoLabel}>Random</div>
            <div style={S.logoName}>Quest</div>
          </div>
        </div>

        <div style={S.divider}>
          <span style={S.dividerDot}>◆</span>
        </div>

        <h1 style={S.heading}>Sign the Ledger</h1>
        <p style={S.sub}>Create your account and begin your journey</p>

        <div style={S.card}>
          <form onSubmit={handleSubmit} style={S.form}>
            <div className="form-group">
              <label className="form-label">Display Name</label>
              <div className="input-wrap">
                <span className="input-icon"><UserIcon /></span>
                <input className="form-input" type="text" placeholder="Aldric Vane"
                  value={name} onChange={e => setName(e.target.value)} autoComplete="name" />
              </div>
            </div>

            <div className="form-group">
              <label className="form-label">Email Address</label>
              <div className="input-wrap">
                <span className="input-icon"><MailIcon /></span>
                <input className="form-input" type="email" placeholder="herald@realm.io"
                  value={email} onChange={e => setEmail(e.target.value)} autoComplete="email" />
              </div>
            </div>

            <div className="form-group">
              <label className="form-label">Password</label>
              <div className="input-wrap">
                <span className="input-icon"><LockIcon /></span>
                <input className="form-input" type={showPw ? 'text' : 'password'} placeholder="••••••••••"
                  value={password} onChange={e => setPassword(e.target.value)} />
                <button type="button" className="input-toggle" onClick={() => setShowPw(v => !v)}>
                  {showPw ? <EyeOffIcon /> : <EyeIcon />}
                </button>
              </div>
            </div>

            <div className="form-group">
              <label className="form-label">Confirm Password</label>
              <div className="input-wrap">
                <span className="input-icon"><LockIcon /></span>
                <input className="form-input" type={showCf ? 'text' : 'password'} placeholder="••••••••••"
                  value={confirm} onChange={e => setConfirm(e.target.value)} />
                <button type="button" className="input-toggle" onClick={() => setShowCf(v => !v)}>
                  {showCf ? <EyeOffIcon /> : <EyeIcon />}
                </button>
              </div>
              <PasswordReqs pw={password} />
            </div>

            {error && <p style={{ fontSize: 12, color: '#f87171', textAlign: 'center' }}>{error}</p>}

            <button type="submit" className="btn-primary" style={{ width: '100%', padding: '12px', marginTop: 4 }}>
              <ShieldIcon /> Create Account
            </button>
          </form>
        </div>

        <p style={S.switch}>
          Already a herald?{' '}
          <Link to="/" style={{ color: 'var(--purple-light)', fontWeight: 600 }}>Sign In</Link>
        </p>
      </div>
    </div>
  )
}

const S = {
  page: {
    minHeight: '100vh', background: '#050509',
    display: 'flex', alignItems: 'center', justifyContent: 'center',
    padding: '40px 16px',
  },
  inner: {
    width: '100%', maxWidth: 480,
    display: 'flex', flexDirection: 'column', alignItems: 'center',
  },
  logoWrap: { display: 'flex', alignItems: 'center', gap: 10, marginBottom: 20 },
  logoBox: {
    width: 34, height: 34, background: 'var(--purple)', borderRadius: 8,
    display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff',
  },
  logoLabel: { fontFamily: "'Cinzel',serif", fontSize: 9, color: 'var(--text-muted)', letterSpacing: '0.1em', textTransform: 'uppercase' },
  logoName:  { fontFamily: "'Cinzel',serif", fontSize: 13, color: 'var(--text)', fontWeight: 700, letterSpacing: '0.06em', textTransform: 'uppercase' },
  divider: {
    width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center',
    gap: 12, marginBottom: 22,
    '&::before': { content: '""', flex: 1, height: 1, background: 'var(--border)' },
  },
  dividerDot: { color: 'var(--purple)', fontSize: 10 },
  heading: { fontFamily: "'Cinzel',serif", fontSize: 24, fontWeight: 700, color: 'var(--text)', marginBottom: 6 },
  sub: { fontSize: 13, color: 'var(--text-muted)', marginBottom: 28 },
  card: {
    width: '100%',
    background: 'var(--bg-card)', border: '1px solid var(--border)',
    borderRadius: 14, padding: '32px',
  },
  form: { display: 'flex', flexDirection: 'column', gap: 18 },
  switch: { marginTop: 20, fontSize: 13, color: 'var(--text-muted)' },
}

function DiamondIcon() {
  return <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2L2 9l10 13L22 9z"/></svg>
}
function UserIcon() {
  return <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
}
function MailIcon() {
  return <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
}
function LockIcon() {
  return <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
}
function EyeIcon() {
  return <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>
}
function EyeOffIcon() {
  return <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94"/><path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19"/><line x1="1" y1="1" x2="23" y2="23"/></svg>
}
function ShieldIcon() {
  return <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
}
