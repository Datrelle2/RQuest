import { useState, useEffect } from 'react'
import Layout from '../components/Layout'
import { getInitials } from '../data/mockData'
import { isSupabaseConnected } from '../lib/supabase'
import { fetchLeaderboard } from '../services/challengeService'

const TIERS = [
  {
    title: 'Crimson Quest Master',
    range: 'Rank 1–3',
    desc: 'The undisputed elite. They have conquered the far reaches of the realm.',
    color: '#f59e0b',
    bg: 'linear-gradient(135deg, rgba(245,158,11,.12) 0%, rgba(245,158,11,.04) 100%)',
    border: 'rgba(245,158,11,.3)',
  },
  {
    title: 'Quest Knight',
    range: 'Rank 4–6',
    desc: 'Battle-hardened veterans who know the weight of the challenge.',
    color: '#9d5ef5',
    bg: 'linear-gradient(135deg, rgba(157,94,245,.12) 0%, rgba(157,94,245,.04) 100%)',
    border: 'rgba(157,94,245,.3)',
  },
  {
    title: 'Quest Squire',
    range: 'Rank 7–10',
    desc: 'Proven adventurers still climbing toward greatness.',
    color: '#3b82f6',
    bg: 'linear-gradient(135deg, rgba(59,130,246,.12) 0%, rgba(59,130,246,.04) 100%)',
    border: 'rgba(59,130,246,.3)',
  },
]

function tierOf(rank) {
  if (rank <= 3)  return TIERS[0]
  if (rank <= 6)  return TIERS[1]
  return TIERS[2]
}

const MEDALS = ['🥇', '🥈', '🥉']

export default function Leaderboard() {
  const [entries, setEntries] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!isSupabaseConnected) {
      setLoading(false)
      return
    }
    fetchLeaderboard()
      .then(data => setEntries(data))
      .finally(() => setLoading(false))
  }, [])

  return (
    <Layout>
      <div className="page-bc"><span style={{ color: 'var(--purple)' }}>◆</span> Random Quest</div>
      <div className="page-title">Leaderboard</div>
      <p className="page-sub" style={{ marginBottom: 28 }}>
        The top 10 heralds of the realm — ranked by glory
      </p>

      {/* Tier legend */}
      <div style={S.tierGrid}>
        {TIERS.map(t => (
          <div key={t.title} style={{ ...S.tierCard, background: t.bg, border: `1px solid ${t.border}` }}>
            <div style={{ ...S.tierTitle, color: t.color }}>{t.title}</div>
            <div style={S.tierRange}>{t.range}</div>
            <p style={S.tierDesc}>{t.desc}</p>
          </div>
        ))}
      </div>

      {/* Table */}
      <div style={S.table}>
        <div style={S.thead}>
          <span style={S.thRank}>#</span>
          <span style={S.thHerald}>Herald</span>
          <span style={S.thCenter}>Rank</span>
          <span style={S.thNum}>Quests</span>
          <span style={S.thNum}>Points</span>
        </div>

        {loading && (
          <div style={S.empty}>Loading…</div>
        )}

        {!loading && entries.length === 0 && (
          <div style={S.empty}>
            <div style={S.emptyIcon}>🏆</div>
            <div style={S.emptyTitle}>No heralds yet</div>
            <p style={S.emptyDesc}>Be the first to complete quests and claim your place on the leaderboard.</p>
          </div>
        )}

        {!loading && entries.map(entry => {
          const tier = tierOf(entry.rank)
          return (
            <div key={entry.rank} style={{
              ...S.row,
              ...(entry.rank <= 3 ? S.rowTop : {}),
            }}>
              <span style={{ ...S.rankNum, ...(entry.rank <= 3 ? { color: '#f59e0b' } : {}) }}>
                {entry.rank <= 3 ? MEDALS[entry.rank - 1] : entry.rank}
              </span>
              <div style={S.herald}>
                <div style={S.avatar}>{getInitials(entry.name)}</div>
                <span style={S.name}>{entry.name}</span>
              </div>
              <span style={{ ...S.tierBadge, color: tier.color, borderColor: tier.border, background: tier.bg }}>
                {tier.title}
              </span>
              <span style={S.num}>{entry.quests}</span>
              <span style={{ ...S.num, color: 'var(--text)', fontWeight: 600 }}>
                {entry.points.toLocaleString()}
              </span>
            </div>
          )
        })}
      </div>
    </Layout>
  )
}

const S = {
  tierGrid: { display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 14, marginBottom: 28 },
  tierCard: { borderRadius: 12, padding: '20px 22px' },
  tierTitle: { fontFamily: "'Cinzel',serif", fontSize: 13, fontWeight: 700, marginBottom: 4 },
  tierRange: { fontSize: 11, color: 'var(--text-muted)', marginBottom: 8, textTransform: 'uppercase', letterSpacing: '0.08em' },
  tierDesc:  { fontSize: 12, color: 'var(--text-muted)', lineHeight: 1.5, margin: 0 },
  table: {
    background: 'var(--bg-card)', border: '1px solid var(--border)',
    borderRadius: 12, overflow: 'hidden',
  },
  thead: {
    display: 'flex', alignItems: 'center', gap: 12,
    padding: '10px 20px', borderBottom: '1px solid var(--border)',
    fontSize: 10, fontWeight: 600, color: 'var(--text-dim)',
    textTransform: 'uppercase', letterSpacing: '0.1em',
  },
  row: {
    display: 'flex', alignItems: 'center', gap: 12,
    padding: '13px 20px', borderBottom: '1px solid var(--border-subtle)',
    transition: 'background .15s',
  },
  rowTop: { background: 'rgba(245,158,11,.05)' },
  thRank:   { width: 36, flexShrink: 0 },
  thHerald: { flex: 1 },
  thCenter: { width: 170, textAlign: 'center', flexShrink: 0 },
  thNum:    { width: 70, textAlign: 'right', flexShrink: 0 },
  rankNum:  { width: 36, fontSize: 15, fontWeight: 700, color: 'var(--text-muted)', flexShrink: 0 },
  herald:   { flex: 1, display: 'flex', alignItems: 'center', gap: 10 },
  avatar: {
    width: 32, height: 32, borderRadius: '50%',
    background: 'var(--purple-dim)', color: 'var(--purple-light)',
    display: 'flex', alignItems: 'center', justifyContent: 'center',
    fontSize: 11, fontWeight: 700, flexShrink: 0,
  },
  name: { fontSize: 13, fontWeight: 500, color: 'var(--text)' },
  tierBadge: {
    width: 170, textAlign: 'center', flexShrink: 0,
    fontSize: 10, fontWeight: 600, letterSpacing: '0.06em',
    padding: '3px 8px', borderRadius: 4, border: '1px solid',
  },
  num: { width: 70, textAlign: 'right', fontSize: 13, color: 'var(--text-muted)', flexShrink: 0 },
  empty: { padding: '48px 20px', textAlign: 'center' },
  emptyIcon: { fontSize: 32, marginBottom: 12 },
  emptyTitle: { fontSize: 15, fontWeight: 600, color: 'var(--text)', marginBottom: 8 },
  emptyDesc: { fontSize: 13, color: 'var(--text-muted)', maxWidth: 340, margin: '0 auto' },
}
