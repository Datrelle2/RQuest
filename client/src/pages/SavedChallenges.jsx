import { useApp } from '../context/AppContext'
import Layout from '../components/Layout'

export default function SavedChallenges() {
  const { savedChallenges, unsaveChallenge } = useApp()

  return (
    <Layout>
      <div className="page-bc"><span style={{ color: 'var(--purple)' }}>◆</span> Random Quest</div>
      <div className="page-title">Saved Challenges</div>
      <p className="page-sub" style={{ marginBottom: 28 }}>
        {savedChallenges.length} bookmarked scroll{savedChallenges.length !== 1 ? 's' : ''}
      </p>

      {savedChallenges.length === 0 ? (
        <div style={S.empty}>
          <BookmarkIcon />
          <p>No saved challenges yet. Bookmark a challenge from your dashboard to revisit it here.</p>
        </div>
      ) : (
        <div style={S.grid}>
          {savedChallenges.map(c => (
            <div key={c.id} style={S.card}>
              <div style={S.cardTop}>
                <span className={`badge badge-${c.difficulty?.toLowerCase()}`}>{c.difficulty}</span>
                <span className="badge-cat">{c.category}</span>
              </div>
              <h3 style={S.title}>{c.title}</h3>
              <p style={S.desc}>{c.description}</p>
              <div style={S.footer}>
                <div style={S.meta}>
                  <span style={S.metaItem}><ClockIcon /> {c.time} min</span>
                  <span style={S.xp}>+{c.xp} XP</span>
                </div>
                <button onClick={() => unsaveChallenge(c.id)} style={S.savedBtn}>
                  <BookmarkFilledIcon /> Saved
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </Layout>
  )
}

const S = {
  grid: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 },
  card: {
    background: 'var(--bg-card)', border: '1px solid var(--border)',
    borderRadius: 12, padding: '20px 22px',
    display: 'flex', flexDirection: 'column', gap: 10,
  },
  cardTop: { display: 'flex', justifyContent: 'space-between', alignItems: 'center' },
  title: { fontSize: 15, fontWeight: 600, color: 'var(--text)', lineHeight: 1.3 },
  desc: { fontSize: 13, color: 'var(--text-muted)', lineHeight: 1.6, flex: 1 },
  footer: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 4 },
  meta: { display: 'flex', gap: 14, alignItems: 'center' },
  metaItem: { display: 'flex', alignItems: 'center', gap: 4, fontSize: 12, color: 'var(--text-muted)' },
  xp: { fontSize: 12, color: 'var(--purple-light)', fontWeight: 600 },
  savedBtn: {
    display: 'flex', alignItems: 'center', gap: 5,
    fontSize: 12, fontWeight: 600, color: '#f87171',
    background: 'rgba(248,113,113,.1)', padding: '4px 12px', borderRadius: 6,
    cursor: 'pointer', border: 'none',
    transition: 'background .15s',
  },
  empty: {
    display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 14,
    padding: '80px 0', color: 'var(--text-muted)', fontSize: 14,
  },
}

function ClockIcon() {
  return <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
}
function BookmarkIcon() {
  return <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"/></svg>
}
function BookmarkFilledIcon() {
  return <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor"><path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"/></svg>
}
