import { useState } from 'react'
import { useApp } from '../context/AppContext'
import Layout from '../components/Layout'

export default function Profile() {
  const { user, updateProfile } = useApp()
  const [editing, setEditing] = useState(false)
  const [name, setName]   = useState(user?.name ?? '')
  const [email, setEmail] = useState(user?.email ?? '')
  const [saved, setSaved] = useState(false)

  function handleSave() {
    updateProfile(name, email)
    setEditing(false)
    setSaved(true)
    setTimeout(() => setSaved(false), 2000)
  }

  const xpProgress = ((user?.totalXP ?? 0) / (user?.xpForNext ?? 10000)) * 100

  return (
    <Layout>
      <div className="page-bc"><span style={{ color: 'var(--purple)' }}>◆</span> Random Quest</div>
      <div className="page-title">Profile</div>
      <p className="page-sub" style={{ marginBottom: 28 }}>Manage your herald identity</p>

      {/* Identity card */}
      <div style={S.identityCard}>
        <div style={S.rankBanner}>
          Herald of the Third Rank
        </div>
        <div style={S.identityBody}>
          <div style={S.avatarBox}>
            <CrownIcon />
          </div>
          <div style={{ flex: 1 }}>
            {editing ? (
              <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                <div className="input-wrap">
                  <span className="input-icon"><UserIcon /></span>
                  <input className="form-input" value={name} onChange={e => setName(e.target.value)} />
                </div>
                <div className="input-wrap">
                  <span className="input-icon"><MailIcon /></span>
                  <input className="form-input" type="email" value={email} onChange={e => setEmail(e.target.value)} />
                </div>
                <div style={{ display: 'flex', gap: 8 }}>
                  <button className="btn-primary" onClick={handleSave} style={{ padding: '8px 18px', fontSize: 12 }}>Save</button>
                  <button className="btn-outline" onClick={() => setEditing(false)} style={{ padding: '8px 18px', fontSize: 12 }}>Cancel</button>
                </div>
              </div>
            ) : (
              <>
                <div style={S.heroName}>{user?.name}</div>
                <div style={S.heroEmail}>{user?.email}</div>
                {saved && <span style={{ fontSize: 12, color: 'var(--easy)' }}>✓ Profile updated</span>}
              </>
            )}
          </div>
          {!editing && (
            <button onClick={() => setEditing(true)} style={S.editBtn}>
              <PencilIcon /> Edit
            </button>
          )}
        </div>
      </div>

      {/* Quest record */}
      <div style={S.sectionLabel}>◆ Quest Record</div>
      <div style={S.statsGrid}>
        {[
          { value: user?.totalXP?.toLocaleString(), sub: `Level ${user?.level} — ${user?.levelTitle}`, label: 'Total XP' },
          { value: `#${user?.rank}`, sub: `Top 1% of ${(284 * 30).toLocaleString()} heralds`, label: 'Global Rank' },
          { value: user?.completedCount, sub: `out of ${(user?.completedCount ?? 0) + 6} drawn`, label: 'Completed' },
          { value: `${user?.longestStreak} Days`, sub: 'Personal best', label: 'Longest Streak' },
        ].map(s => (
          <div key={s.label} className="stat-card">
            <div className="stat-value" style={{ fontSize: 22 }}>{s.value}</div>
            <div style={{ fontSize: 11, color: 'var(--purple-light)', marginTop: 4 }}>{s.sub}</div>
            <div className="stat-label" style={{ marginTop: 6 }}>{s.label}</div>
          </div>
        ))}
      </div>

      {/* XP progress */}
      <div style={S.progressCard}>
        <div style={S.progressHeader}>
          <span style={{ fontSize: 13, fontWeight: 600, color: 'var(--text)' }}>
            Level {user?.level} — {user?.levelTitle}
          </span>
          <span style={{ fontSize: 12, color: 'var(--text-muted)' }}>
            {user?.totalXP?.toLocaleString()} / {user?.xpForNext?.toLocaleString()} XP
          </span>
        </div>
        <div style={S.progressTrack}>
          <div style={{ ...S.progressFill, width: `${xpProgress}%` }} />
        </div>
        <div style={S.progressSub}>
          {(user?.xpForNext - user?.totalXP).toLocaleString()} XP needed to reach Level {user?.nextLevel} — {user?.nextLevelTitle}
        </div>
      </div>
    </Layout>
  )
}

const S = {
  identityCard: {
    background: 'var(--bg-card)', border: '1px solid var(--border)',
    borderRadius: 12, overflow: 'hidden', marginBottom: 32, maxWidth: 520,
  },
  rankBanner: {
    background: 'linear-gradient(90deg, var(--purple) 0%, #9d5ef5 100%)',
    color: '#fff', fontSize: 11, fontWeight: 600, letterSpacing: '0.1em',
    textTransform: 'uppercase', padding: '6px 20px',
  },
  identityBody: { display: 'flex', alignItems: 'flex-start', gap: 16, padding: '20px 22px' },
  avatarBox: {
    width: 54, height: 54, background: 'var(--purple-dim)',
    border: '1px solid rgba(124,58,237,.3)', borderRadius: 10,
    display: 'flex', alignItems: 'center', justifyContent: 'center',
    color: 'var(--purple-light)', flexShrink: 0,
  },
  heroName:  { fontSize: 18, fontWeight: 700, color: 'var(--text)', marginBottom: 4 },
  heroEmail: { fontSize: 13, color: 'var(--text-muted)' },
  editBtn: {
    display: 'flex', alignItems: 'center', gap: 5,
    fontSize: 12, color: 'var(--text-muted)',
    background: 'var(--bg-card-2)', border: '1px solid var(--border)',
    padding: '6px 14px', borderRadius: 6, cursor: 'pointer',
    transition: 'border-color .15s', flexShrink: 0, marginLeft: 'auto',
  },
  sectionLabel: {
    fontSize: 11, fontWeight: 600, color: 'var(--text-muted)',
    letterSpacing: '0.1em', textTransform: 'uppercase',
    marginBottom: 14, display: 'flex', alignItems: 'center', gap: 6,
  },
  statsGrid: { display: 'grid', gridTemplateColumns: 'repeat(2,1fr)', gap: 12, maxWidth: 520, marginBottom: 16 },
  progressCard: {
    background: 'var(--bg-card)', border: '1px solid var(--border)',
    borderRadius: 12, padding: '18px 22px', maxWidth: 520,
  },
  progressHeader: { display: 'flex', justifyContent: 'space-between', marginBottom: 10 },
  progressTrack: { height: 8, background: 'var(--border)', borderRadius: 4, overflow: 'hidden' },
  progressFill: { height: '100%', background: 'linear-gradient(90deg, var(--purple) 0%, var(--purple-light) 100%)', borderRadius: 4, transition: 'width .4s' },
  progressSub: { fontSize: 12, color: 'var(--text-muted)', marginTop: 8 },
}

function CrownIcon() {
  return <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M2 20h20M5 20l2-9 5 4 5-4 2 9"/><circle cx="12" cy="5" r="2"/><circle cx="4" cy="11" r="2"/><circle cx="20" cy="11" r="2"/></svg>
}
function PencilIcon() {
  return <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>
}
function UserIcon() {
  return <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
}
function MailIcon() {
  return <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
}
