import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useApp } from '../context/AppContext'
import Layout from '../components/Layout'
import { CATEGORIES, DIFFICULTIES } from '../data/mockData'

const CATEGORY_ICONS = {
  adventure:   <AdventureIcon />,
  social:      <SocialIcon />,
  creative:    <CreativeIcon />,
  food:        <FoodIcon />,
  fitness:     <FitnessIcon />,
  learning:    <LearningIcon />,
  mindfulness: <MindfulnessIcon />,
  kindness:    <KindnessIcon />,
  tech:        <TechIcon />,
  nostalgia:   <NostalgiaIcon />,
  photography: <PhotoIcon />,
  diy:         <DiyIcon />,
}

export default function CategorySettings() {
  const { user, savePreferences, isNewUser } = useApp()
  const navigate = useNavigate()

  const [selected, setSelected] = useState(user?.categories ?? [])
  const [difficulty, setDiff]   = useState(user?.difficulty ?? 'Medium')
  const [saved, setSaved]       = useState(false)

  function toggleCat(id) {
    setSelected(prev => prev.includes(id) ? prev.filter(c => c !== id) : [...prev, id])
  }

  function handleSave() {
    savePreferences(selected, difficulty)
    setSaved(true)
    setTimeout(() => setSaved(false), 2000)
    if (isNewUser) navigate('/dashboard')
  }

  return (
    <Layout>
      <div className="page-bc"><span style={{ color: 'var(--purple)' }}>◆</span> Random Quest</div>
      <div className="page-title">Category Settings</div>
      <p className="page-sub" style={{ marginBottom: 32 }}>Choose the types of quests the Fate Wheel may draw for you</p>

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
  catGrid: { display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 10 },
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

function AdventureIcon()   { return <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 17l4-8 4 4 4-6 4 10"/><path d="M3 21h18"/></svg> }
function SocialIcon()      { return <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg> }
function CreativeIcon()    { return <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 20h9"/><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"/></svg> }
function FoodIcon()        { return <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 8h1a4 4 0 0 1 0 8h-1"/><path d="M2 8h16v9a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4V8z"/><line x1="6" y1="1" x2="6" y2="4"/><line x1="10" y1="1" x2="10" y2="4"/><line x1="14" y1="1" x2="14" y2="4"/></svg> }
function FitnessIcon()     { return <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M6 4v6a6 6 0 0 0 12 0V4"/><line x1="6" y1="4" x2="18" y2="4"/></svg> }
function LearningIcon()    { return <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/></svg> }
function MindfulnessIcon() { return <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z"/><path d="M12 6v6l4 2"/></svg> }
function KindnessIcon()    { return <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg> }
function TechIcon()        { return <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="3" width="20" height="14" rx="2"/><line x1="8" y1="21" x2="16" y2="21"/><line x1="12" y1="17" x2="12" y2="21"/></svg> }
function NostalgiaIcon()   { return <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg> }
function PhotoIcon()       { return <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"/><circle cx="12" cy="13" r="4"/></svg> }
function DiyIcon()         { return <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"/></svg> }
function SaveIcon()        { return <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z"/><polyline points="17 21 17 13 7 13 7 21"/><polyline points="7 3 7 8 15 8"/></svg> }
