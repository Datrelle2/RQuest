import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useApp } from '../context/AppContext'
import Layout from '../components/Layout'
import { LEVELS, getLevelInfo, levelColor } from '../lib/levels'

export default function Profile() {
  const { user, updateProfile, deleteAccount } = useApp()
  const navigate = useNavigate()
  const [editing, setEditing]           = useState(false)
  const [name, setName]                 = useState(user?.name ?? '')
  const [email, setEmail]               = useState(user?.email ?? '')
  const [saved, setSaved]               = useState(false)
  const [confirmDelete, setConfirmDelete] = useState(false)
  const [deleting, setDeleting]         = useState(false)

  function handleSave() {
    updateProfile(name, email)
    setEditing(false)
    setSaved(true)
    setTimeout(() => setSaved(false), 2000)
  }

  async function handleDeleteAccount() {
    setDeleting(true)
    await deleteAccount()
    navigate('/login')
  }

  const { current, next, xpIntoLevel, xpForThisLevel, progress } = getLevelInfo(user?.totalXP)
  const color = levelColor(current.level)

  return (
    <Layout>
      <div className="page-bc"><span style={{ color: 'var(--purple)' }}>◆</span> Random Quest</div>
      <div className="page-title">Profile</div>
      <p className="page-sub" style={{ marginBottom: 28 }}>Manage your herald identity</p>

      {/* Identity card */}
      <div style={S.identityCard}>
        <div style={{ ...S.rankBanner, background: `linear-gradient(90deg, ${color} 0%, ${color}cc 100%)` }}>
          Level {current.level} — {current.title}
        </div>
        <div style={S.identityBody}>
          <div style={{ ...S.avatarBox, borderColor: `${color}55`, background: `${color}18` }}>
            <CrownIcon color={color} />
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
          { value: (user?.totalXP ?? 0).toLocaleString(), sub: `${current.title}`, label: 'Total XP' },
          { value: user?.completedCount ?? 0, sub: `quests finished`, label: 'Completed' },
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
          <span style={{ fontSize: 13, fontWeight: 600, color }}>
            Level {current.level} — {current.title}
          </span>
          {next ? (
            <span style={{ fontSize: 12, color: 'var(--text-muted)' }}>
              {xpIntoLevel.toLocaleString()} / {xpForThisLevel.toLocaleString()} XP
            </span>
          ) : (
            <span style={{ fontSize: 12, color }}>Max Level</span>
          )}
        </div>
        <div style={S.progressTrack}>
          <div style={{ ...S.progressFill, width: `${progress}%`, background: `linear-gradient(90deg, ${color} 0%, ${color}99 100%)` }} />
        </div>
        {next ? (
          <div style={S.progressSub}>
            {(xpForThisLevel - xpIntoLevel).toLocaleString()} XP to Level {next.level} — {next.title}
          </div>
        ) : (
          <div style={S.progressSub}>You have reached the highest rank.</div>
        )}
      </div>

      {/* Level chart */}
      <div style={{ ...S.sectionLabel, marginTop: 28 }}>◆ Level Progression</div>
      <div style={S.levelTable}>
        {LEVELS.map((lvl, i) => {
          const isCurrentLevel = lvl.level === current.level
          const isPast = lvl.level < current.level
          const col = levelColor(lvl.level)
          const nextXp = LEVELS[i + 1]?.xp
          const gap = nextXp ? (nextXp - lvl.xp).toLocaleString() : '—'
          return (
            <div key={lvl.level} style={{
              ...S.levelRow,
              ...(isCurrentLevel ? { background: `${col}14`, border: `1px solid ${col}44` } : {}),
              opacity: isPast ? 0.5 : 1,
            }}>
              <div style={{ ...S.levelBadge, background: `${col}22`, color: col, borderColor: `${col}55` }}>
                {lvl.level}
              </div>
              <div style={S.levelMeta}>
                <span style={{ ...S.levelTitle, color: isCurrentLevel ? col : 'var(--text)' }}>{lvl.title}</span>
                {isCurrentLevel && <span style={{ ...S.currentTag, color: col, borderColor: `${col}55`, background: `${col}18` }}>Current</span>}
              </div>
              <div style={S.levelXpGroup}>
                <span style={S.levelXpLabel}>Starts at</span>
                <span style={S.levelXpVal}>{lvl.xp.toLocaleString()} XP</span>
              </div>
              <div style={S.levelXpGroup}>
                <span style={S.levelXpLabel}>Gap</span>
                <span style={{ ...S.levelXpVal, color: 'var(--text-muted)' }}>+{gap}</span>
              </div>
            </div>
          )
        })}
      </div>

      {/* Danger zone */}
      <div style={S.dangerZone}>
        <div style={S.dangerLabel}>◆ Danger Zone</div>
        {confirmDelete ? (
          <div style={S.confirmBox}>
            <p style={S.confirmText}>This will permanently delete your account and all quest data. This cannot be undone.</p>
            <div style={{ display: 'flex', gap: 10 }}>
              <button onClick={handleDeleteAccount} disabled={deleting} style={S.confirmDeleteBtn}>
                {deleting ? 'Deleting…' : 'Yes, delete my account'}
              </button>
              <button onClick={() => setConfirmDelete(false)} style={S.cancelBtn}>Cancel</button>
            </div>
          </div>
        ) : (
          <button onClick={() => setConfirmDelete(true)} style={S.deleteAccountBtn}>
            <TrashIcon /> Delete Account
          </button>
        )}
      </div>
    </Layout>
  )
}

const S = {
  identityCard: {
    background: 'var(--bg-card)', border: '1px solid var(--border)',
    borderRadius: 12, overflow: 'hidden', marginBottom: 32, maxWidth: 760,
    marginLeft: 'auto', marginRight: 'auto',
  },
  rankBanner: {
    color: '#fff', fontSize: 11, fontWeight: 600, letterSpacing: '0.1em',
    textTransform: 'uppercase', padding: '6px 20px',
  },
  identityBody: { display: 'flex', alignItems: 'flex-start', gap: 16, padding: '20px 22px' },
  avatarBox: {
    width: 54, height: 54,
    border: '1px solid', borderRadius: 10,
    display: 'flex', alignItems: 'center', justifyContent: 'center',
    flexShrink: 0,
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
    maxWidth: 760, marginLeft: 'auto', marginRight: 'auto',
  },
  statsGrid: { display: 'grid', gridTemplateColumns: 'repeat(2,1fr)', gap: 12, maxWidth: 760, marginBottom: 16, marginLeft: 'auto', marginRight: 'auto' },
  progressCard: {
    background: 'var(--bg-card)', border: '1px solid var(--border)',
    borderRadius: 12, padding: '18px 22px', maxWidth: 760,
    marginLeft: 'auto', marginRight: 'auto',
  },
  progressHeader: { display: 'flex', justifyContent: 'space-between', marginBottom: 10 },
  progressTrack: { height: 8, background: 'var(--border)', borderRadius: 4, overflow: 'hidden' },
  progressFill: { height: '100%', borderRadius: 4, transition: 'width .4s' },
  progressSub: { fontSize: 12, color: 'var(--text-muted)', marginTop: 8 },
  levelTable: {
    maxWidth: 760, display: 'flex', flexDirection: 'column', gap: 6, marginBottom: 28,
    marginLeft: 'auto', marginRight: 'auto',
  },
  levelRow: {
    display: 'flex', alignItems: 'center', gap: 14,
    padding: '10px 14px', borderRadius: 9,
    border: '1px solid transparent',
    background: 'var(--bg-card)',
    transition: 'opacity .2s',
  },
  levelBadge: {
    width: 30, height: 30, borderRadius: 8, border: '1px solid',
    display: 'flex', alignItems: 'center', justifyContent: 'center',
    fontSize: 12, fontWeight: 700, flexShrink: 0,
  },
  levelMeta: { flex: 1, display: 'flex', alignItems: 'center', gap: 8 },
  levelTitle: { fontSize: 13, fontWeight: 600 },
  currentTag: {
    fontSize: 9, fontWeight: 700, letterSpacing: '0.08em',
    padding: '2px 6px', borderRadius: 4, border: '1px solid',
    textTransform: 'uppercase',
  },
  levelXpGroup: { display: 'flex', flexDirection: 'column', alignItems: 'flex-end', minWidth: 80 },
  levelXpLabel: { fontSize: 9, color: 'var(--text-dim)', textTransform: 'uppercase', letterSpacing: '0.06em' },
  levelXpVal: { fontSize: 12, fontWeight: 600, color: 'var(--text)' },
  dangerZone: {
    maxWidth: 760, marginTop: 28, marginLeft: 'auto', marginRight: 'auto',
    background: 'rgba(239,68,68,.04)', border: '1px solid rgba(239,68,68,.2)',
    borderRadius: 12, padding: '18px 22px',
  },
  dangerLabel: {
    fontSize: 11, fontWeight: 600, color: 'rgba(239,68,68,.7)',
    letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 14,
  },
  deleteAccountBtn: {
    display: 'flex', alignItems: 'center', gap: 7,
    background: 'transparent', border: '1px solid rgba(239,68,68,.4)',
    color: 'rgba(239,68,68,.85)', padding: '8px 16px', borderRadius: 7,
    fontSize: 12, fontWeight: 500, cursor: 'pointer',
  },
  confirmBox: { display: 'flex', flexDirection: 'column', gap: 12 },
  confirmText: { fontSize: 13, color: 'rgba(239,68,68,.85)', margin: 0, lineHeight: 1.5 },
  confirmDeleteBtn: {
    background: 'rgba(239,68,68,.9)', border: 'none',
    color: '#fff', padding: '8px 18px', borderRadius: 7,
    fontSize: 12, fontWeight: 600, cursor: 'pointer',
  },
  cancelBtn: {
    background: 'transparent', border: '1px solid var(--border)',
    color: 'var(--text-muted)', padding: '8px 18px', borderRadius: 7,
    fontSize: 12, cursor: 'pointer',
  },
}

function TrashIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="3 6 5 6 21 6"/>
      <path d="M19 6l-1 14H6L5 6"/>
      <path d="M10 11v6"/>
      <path d="M14 11v6"/>
      <path d="M9 6V4h6v2"/>
    </svg>
  )
}
function CrownIcon({ color }) {
  return <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke={color ?? 'currentColor'} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M2 20h20M5 20l2-9 5 4 5-4 2 9"/><circle cx="12" cy="5" r="2"/><circle cx="4" cy="11" r="2"/><circle cx="20" cy="11" r="2"/></svg>
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
