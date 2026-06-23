import { useApp } from '../context/AppContext'
import Layout from '../components/Layout'
import { CHALLENGE_POOL } from '../data/mockData'

function DiffBadge({ difficulty }) {
  return <span className={`badge badge-${difficulty?.toLowerCase()}`}>{difficulty}</span>
}

function ChallengeCard({ challenge, onSave, onComplete, onRedraw, featured }) {
  if (!challenge) return (
    <div style={{ ...S.challengeCard, ...S.featuredCard }}>
      <p style={{ color: 'var(--text-muted)', textAlign: 'center', padding: '40px 0' }}>
        No challenge found for your current preferences. Update your settings to continue.
      </p>
    </div>
  )

  if (featured) return (
    <div style={{ ...S.challengeCard, ...S.featuredCard }}>
      <div style={S.featuredTop}>
        <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
          <DiffBadge difficulty={challenge.difficulty} />
          <span className="badge-cat">{challenge.category}</span>
        </div>
        <div style={S.xpBadge}>+{challenge.xp} <span style={{ fontSize: 10, fontWeight: 500 }}>XP Reward</span></div>
      </div>
      <h2 style={S.featuredTitle}>{challenge.title}</h2>
      <p style={S.featuredDesc}>{challenge.description}</p>
      <div style={S.featuredMeta}>
        <span style={S.metaItem}><ClockIcon /> {challenge.time} min</span>
      </div>
      <div style={S.actions}>
        <button className="btn-primary" onClick={onComplete} style={{ padding: '10px 24px' }}>
          <PlayIcon /> Begin Challenge
        </button>
        <button className="btn-outline" onClick={onSave} style={{ padding: '10px 20px' }}>
          <BookmarkIcon /> Save for Later
        </button>
        <button className="btn-outline" onClick={onRedraw} style={{ padding: '10px 20px' }}>
          <RefreshIcon /> Redraw
        </button>
      </div>
    </div>
  )

  return (
    <div style={S.miniCard}>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
        <DiffBadge difficulty={challenge.difficulty} />
        <span className="badge-cat">{challenge.category}</span>
      </div>
      <h3 style={S.miniTitle}>{challenge.title}</h3>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 'auto', paddingTop: 12 }}>
        <span style={S.metaItem}><ClockIcon /> {challenge.time} min</span>
        <span style={{ fontSize: 12, color: 'var(--purple-light)', fontWeight: 600 }}>+{challenge.xp} XP</span>
      </div>
    </div>
  )
}

export default function Dashboard() {
  const { user, currentChallenge, saveChallenge, completeChallenge, redrawChallenge } = useApp()
  const extras = CHALLENGE_POOL.filter(c => c.id !== currentChallenge?.id).slice(0, 2)

  return (
    <Layout>
      <div className="page-bc"><span style={{ color: 'var(--purple)' }}>◆</span> Random Quest</div>
      <div className="page-title">Dashboard</div>
      <p className="page-sub" style={{ marginBottom: 28 }}>Welcome back, {user?.name}</p>

      {/* Stats row */}
      <div style={S.statsGrid}>
        {[
          { icon: <XpIcon />,      value: user?.totalXP?.toLocaleString(), label: 'Total XP' },
          { icon: <CheckIcon />,   value: user?.completedCount,             label: 'Quests Completed' },
          { icon: <TrophyIcon />,  value: `#${user?.rank}`,                 label: 'Current Rank' },
          { icon: <FlameIcon />,   value: `${user?.streak} Days`,           label: 'Active Streak' },
        ].map(s => (
          <div key={s.label} className="stat-card">
            <div className="stat-icon">{s.icon}</div>
            <div className="stat-value">{s.value}</div>
            <div className="stat-label">{s.label}</div>
          </div>
        ))}
      </div>

      {/* Current challenge */}
      <div style={S.sectionHeader}>
        <span style={S.sectionLabel}><span style={{ color: 'var(--purple)' }}>◆</span> Your Current Challenge</span>
        <span style={S.timer}>Expires in 14h 22m</span>
      </div>
      <ChallengeCard
        challenge={currentChallenge}
        featured
        onSave={() => saveChallenge(currentChallenge)}
        onComplete={completeChallenge}
        onRedraw={redrawChallenge}
      />

      {/* More from the realm */}
      <div style={{ ...S.sectionHeader, marginTop: 32 }}>
        <span style={S.sectionLabel}><span style={{ color: 'var(--purple)' }}>◆</span> More from the Realm</span>
      </div>
      <div style={S.miniGrid}>
        {extras.map(c => <ChallengeCard key={c.id} challenge={c} />)}
      </div>
    </Layout>
  )
}

const S = {
  statsGrid: { display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 14, marginBottom: 28 },
  sectionHeader: { display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 14 },
  sectionLabel: { fontSize: 11, fontWeight: 600, color: 'var(--text-muted)', letterSpacing: '0.1em', textTransform: 'uppercase', display: 'flex', alignItems: 'center', gap: 6 },
  timer: { fontSize: 12, color: 'var(--purple-light)', background: 'var(--purple-dim)', padding: '3px 10px', borderRadius: 20 },
  challengeCard: { background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: 12, padding: 24 },
  featuredCard: {
    background: 'linear-gradient(135deg, #12112a 0%, #0e0d20 100%)',
    border: '1px solid rgba(124,58,237,.3)',
  },
  featuredTop: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 },
  xpBadge: {
    background: 'var(--purple-dim)', color: 'var(--purple-light)',
    padding: '4px 12px', borderRadius: 20,
    fontSize: 16, fontWeight: 700, fontFamily: "'Cinzel',serif",
    display: 'flex', alignItems: 'baseline', gap: 5,
  },
  featuredTitle: {
    fontFamily: "'Cinzel',serif", fontSize: 22, fontWeight: 700,
    color: 'var(--text)', marginBottom: 10,
  },
  featuredDesc: { fontSize: 14, color: 'var(--text-muted)', lineHeight: 1.6, marginBottom: 16 },
  featuredMeta: { display: 'flex', gap: 16, marginBottom: 20 },
  metaItem: { display: 'flex', alignItems: 'center', gap: 5, fontSize: 12, color: 'var(--text-muted)' },
  actions: { display: 'flex', gap: 10, flexWrap: 'wrap' },
  miniGrid: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 },
  miniCard: {
    background: 'var(--bg-card)', border: '1px solid var(--border)',
    borderRadius: 10, padding: '18px 20px',
    display: 'flex', flexDirection: 'column', minHeight: 130,
  },
  miniTitle: { fontSize: 15, fontWeight: 600, color: 'var(--text)', lineHeight: 1.3, marginTop: 8 },
}

function XpIcon() {
  return <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
}
function CheckIcon() {
  return <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
}
function TrophyIcon() {
  return <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6"/><path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18"/><path d="M4 22h16"/><path d="M10 22v-4h4v4"/><path d="M8 4h8v6a4 4 0 0 1-8 0V4z"/></svg>
}
function FlameIcon() {
  return <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M8.5 14.5A2.5 2.5 0 0 0 11 17c2.5 0 2-2.5 5-2.5 1 0 2.5.5 2.5 2.5 0 2-1 3.5-3.5 5-2-.5-4-1.5-5.5-3S6 15 6 12c0-3 2-5 4-6"/><path d="M11.5 2c0 2-1.5 3.5-1.5 5 0 1.5 1.5 3 1.5 3S13 8.5 13 7c0-1.5-1.5-3-1.5-5z"/></svg>
}
function PlayIcon() {
  return <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="5 3 19 12 5 21 5 3"/></svg>
}
function BookmarkIcon() {
  return <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"/></svg>
}
function RefreshIcon() {
  return <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="23 4 23 10 17 10"/><path d="M20.49 15a9 9 0 1 1-2.12-9.36L23 10"/></svg>
}
function ClockIcon() {
  return <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
}
