import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useApp } from '../context/AppContext'
import Layout from '../components/Layout'
import { CATEGORIES, DIFFICULTIES, FREQUENCIES } from '../data/mockData'

const CATEGORY_ICONS = {
  algorithms:        <AlgoIcon />,
  databases:         <DbIcon />,
  'system-design':   <ApiIcon />,
  'data-structures': <TreeIcon />,
  scripting:         <ScriptIcon />,
  devops:            <DevOpsIcon />,
  security:          <LockIcon />,
  frontend:          <FrontendIcon />,
}

export default function CategorySettings() {
  const { user, savePreferences, isNewUser } = useApp()
  const navigate = useNavigate()

  const [selected, setSelected] = useState(user?.categories ?? [])
  const [difficulty, setDiff]   = useState(user?.difficulty ?? 'Medium')
  const [frequency, setFreq]    = useState(user?.frequency ?? 'Daily')
  const [saved, setSaved]       = useState(false)

  function toggleCat(id) {
    setSelected(prev => prev.includes(id) ? prev.filter(c => c !== id) : [...prev, id])
  }

  function handleSave() {
    savePreferences(selected, difficulty, frequency)
    setSaved(true)
    setTimeout(() => setSaved(false), 2000)
    if (isNewUser) navigate('/dashboard')
  }

  return (
    <Layout>
      <div className="page-bc"><span style={{ color: 'var(--purple)' }}>◆</span> Random Quest</div>
      <div className="page-title">Category Settings</div>
      <p className="page-sub" style={{ marginBottom: 32 }}>Tailor which quests the Fate Wheel may draw for you</p>

      {/* Quest categories */}
      <div style={S.sectionLabel}>◆ Quest Categories</div>
      <div style={S.catGrid}>
        {CATEGORIES.map(cat => {
          const active = selected.includes(cat.id)
          return (
            <button key={cat.id} onClick={() => toggleCat(cat.id)} style={{
              ...S.catCard, ...(active ? S.catCardActive : {}),
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <div style={{ ...S.catIcon, ...(active ? S.catIconActive : {}) }}>
                  {CATEGORY_ICONS[cat.id]}
                </div>
                <div style={{ ...S.checkbox, ...(active ? S.checkboxActive : {}) }}>
                  {active && <span style={{ fontSize: 10, lineHeight: 1 }}>✓</span>}
                </div>
              </div>
              <div style={S.catLabel}>{cat.label}</div>
              <div style={S.catSub}>{cat.sub}</div>
            </button>
          )
        })}
      </div>

      {/* Difficulty */}
      <div style={{ ...S.sectionLabel, marginTop: 32 }}>◆ Preferred Difficulty</div>
      <div style={S.pillRow}>
        {DIFFICULTIES.map(d => (
          <button key={d} onClick={() => setDiff(d)} style={{
            ...S.pill, ...(difficulty === d ? S.pillActive : {}),
          }}>{d}</button>
        ))}
      </div>

      {/* Frequency */}
      <div style={{ ...S.sectionLabel, marginTop: 28 }}>◆ Challenge Frequency</div>
      <div style={S.pillRow}>
        {FREQUENCIES.map(f => (
          <button key={f} onClick={() => setFreq(f)} style={{
            ...S.pill, ...(frequency === f ? S.pillActive : {}),
          }}>{f}</button>
        ))}
      </div>

      <button className="btn-primary" onClick={handleSave} style={{ marginTop: 32, padding: '12px 28px' }}>
        <SaveIcon />
        {saved ? 'Preferences Saved!' : 'Save Preferences'}
      </button>
    </Layout>
  )
}

const S = {
  sectionLabel: {
    fontSize: 11, fontWeight: 600, color: 'var(--text-muted)',
    letterSpacing: '0.1em', textTransform: 'uppercase',
    marginBottom: 14, display: 'flex', alignItems: 'center', gap: 6,
  },
  catGrid: { display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 10, maxWidth: 500 },
  catCard: {
    background: 'var(--bg-card)', border: '1px solid var(--border)',
    borderRadius: 10, padding: '16px 18px', textAlign: 'left',
    cursor: 'pointer', transition: 'border-color .18s, background .18s',
  },
  catCardActive: {
    background: 'rgba(124,58,237,.1)', border: '1px solid rgba(124,58,237,.4)',
  },
  catIcon: {
    width: 32, height: 32, borderRadius: 7, background: 'var(--bg-card-2)',
    display: 'flex', alignItems: 'center', justifyContent: 'center',
    color: 'var(--text-muted)', marginBottom: 12,
    transition: 'background .18s, color .18s',
  },
  catIconActive: { background: 'var(--purple-dim)', color: 'var(--purple-light)' },
  checkbox: {
    width: 18, height: 18, borderRadius: 4, border: '1px solid var(--border)',
    display: 'flex', alignItems: 'center', justifyContent: 'center',
    color: '#fff', flexShrink: 0,
  },
  checkboxActive: { background: 'var(--purple)', borderColor: 'var(--purple)' },
  catLabel: { fontSize: 13, fontWeight: 600, color: 'var(--text)', marginBottom: 3 },
  catSub:   { fontSize: 11, color: 'var(--text-muted)' },
  pillRow: { display: 'flex', gap: 8, flexWrap: 'wrap' },
  pill: {
    padding: '8px 20px', borderRadius: 6, border: '1px solid var(--border)',
    background: 'transparent', color: 'var(--text-muted)', fontSize: 13, fontWeight: 500,
    cursor: 'pointer', transition: 'all .15s',
  },
  pillActive: {
    background: 'var(--purple)', borderColor: 'var(--purple)', color: '#fff',
  },
}

function AlgoIcon()    { return <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/></svg> }
function DbIcon()      { return <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><ellipse cx="12" cy="5" rx="9" ry="3"/><path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3"/><path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5"/></svg> }
function ApiIcon()     { return <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg> }
function TreeIcon()    { return <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg> }
function ScriptIcon()  { return <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><polyline points="4 17 10 11 4 5"/><line x1="12" y1="19" x2="20" y2="19"/></svg> }
function DevOpsIcon()  { return <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><circle cx="12" cy="12" r="3"/><path d="M19.07 4.93a10 10 0 1 1-14.14 0"/></svg> }
function LockIcon()    { return <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg> }
function FrontendIcon(){ return <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><rect x="2" y="3" width="20" height="14" rx="2"/><line x1="8" y1="21" x2="16" y2="21"/><line x1="12" y1="17" x2="12" y2="21"/></svg> }
function SaveIcon()    { return <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z"/><polyline points="17 21 17 13 7 13 7 21"/><polyline points="7 3 7 8 15 8"/></svg> }
