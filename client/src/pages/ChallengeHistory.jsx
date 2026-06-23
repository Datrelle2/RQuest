import { useState } from 'react'
import { useApp } from '../context/AppContext'
import Layout from '../components/Layout'

const FILTERS = ['All', 'Easy', 'Medium', 'Hard', 'Legendary']

export default function ChallengeHistory() {
  const { history } = useApp()
  const [filter, setFilter] = useState('All')

  const filtered = filter === 'All' ? history : history.filter(c => c.difficulty === filter)

  const totalXP  = history.reduce((s, c) => s + (c.xp ?? 0), 0)
  const bestStreak = 9
  const avgDiff = history.length
    ? ['Easy','Medium','Hard','Legendary'][
        Math.round(history.reduce((s, c) => s + ['Easy','Medium','Hard','Legendary'].indexOf(c.difficulty), 0) / history.length)
      ] ?? 'Hard'
    : '—'

  return (
    <Layout>
      <div className="page-bc"><span style={{ color: 'var(--purple)' }}>◆</span> Random Quest</div>
      <div className="page-title">Challenge History</div>
      <p className="page-sub" style={{ marginBottom: 28 }}>All quests you have undertaken</p>

      {/* Stats */}
      <div style={S.statsGrid}>
        {[
          { value: history.length, label: 'Total Completed' },
          { value: totalXP.toLocaleString(), label: 'Total XP Earned' },
          { value: `${bestStreak} Days`, label: 'Best Streak' },
          { value: avgDiff, label: 'Avg Difficulty' },
        ].map(s => (
          <div key={s.label} className="stat-card" style={{ padding: '14px 18px' }}>
            <div className="stat-value" style={{ fontSize: 22 }}>{s.value}</div>
            <div className="stat-label">{s.label}</div>
          </div>
        ))}
      </div>

      {/* Filter tabs */}
      <div style={S.tabs}>
        {FILTERS.map(f => (
          <button key={f} onClick={() => setFilter(f)} style={{
            ...S.tab, ...(filter === f ? S.tabActive : {}),
          }}>{f}</button>
        ))}
      </div>

      {/* List */}
      {filtered.length === 0 ? (
        <p style={{ color: 'var(--text-muted)', padding: '40px 0', textAlign: 'center' }}>
          No {filter !== 'All' ? filter.toLowerCase() : ''} challenges completed yet.
        </p>
      ) : (
        <div style={S.list}>
          {filtered.map((c, i) => (
            <div key={c.id ?? i} style={S.row}>
              <span style={S.num}>{String(i + 1).padStart(2, '0')}</span>
              <div style={S.rowMain}>
                <div style={S.rowTitle}>{c.title}</div>
                <div style={S.rowSub}>{c.category}</div>
              </div>
              <span className={`badge badge-${c.difficulty?.toLowerCase()}`}>{c.difficulty}</span>
              <span style={S.xp}>+{c.xp} XP</span>
              <span style={S.date}>{c.date}</span>
              <span style={S.check}>✓</span>
            </div>
          ))}
        </div>
      )}
    </Layout>
  )
}

const S = {
  statsGrid: { display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 12, marginBottom: 24 },
  tabs: { display: 'flex', gap: 4, marginBottom: 20, background: 'var(--bg-card)', borderRadius: 8, padding: 4, alignSelf: 'flex-start', width: 'fit-content' },
  tab: {
    padding: '6px 16px', borderRadius: 6, fontSize: 12, fontWeight: 500,
    color: 'var(--text-muted)', background: 'transparent', border: 'none', cursor: 'pointer',
    transition: 'all .15s',
  },
  tabActive: { background: 'var(--purple)', color: '#fff' },
  list: {
    background: 'var(--bg-card)', border: '1px solid var(--border)',
    borderRadius: 12, overflow: 'hidden',
  },
  row: {
    display: 'flex', alignItems: 'center', gap: 16,
    padding: '14px 20px', borderBottom: '1px solid var(--border-subtle)',
  },
  num: { fontSize: 12, color: 'var(--text-dim)', width: 22, flexShrink: 0 },
  rowMain: { flex: 1 },
  rowTitle: { fontSize: 14, fontWeight: 600, color: 'var(--text)' },
  rowSub: { fontSize: 12, color: 'var(--text-muted)', marginTop: 2 },
  xp: { fontSize: 12, fontWeight: 600, color: 'var(--purple-light)', minWidth: 60, textAlign: 'right' },
  date: { fontSize: 12, color: 'var(--text-muted)', minWidth: 80, textAlign: 'right' },
  check: { color: 'var(--easy)', fontSize: 14, flexShrink: 0 },
}
