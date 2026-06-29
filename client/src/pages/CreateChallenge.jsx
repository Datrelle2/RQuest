import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Layout from '../components/Layout'
import { useApp } from '../context/AppContext'
import { generateChallengeFromAPIs } from '../lib/api'
import { CATEGORIES } from '../data/mockData'

const DIFFICULTIES = ['Easy', 'Medium', 'Hard']

export default function CreateChallenge() {
  const { addCustomChallenge, setApiChallenge } = useApp()
  const navigate = useNavigate()

  const [title, setTitle]           = useState('')
  const [description, setDesc]      = useState('')
  const [category, setCategory]     = useState('')
  const [difficulty, setDifficulty] = useState('Medium')
  const [time, setTime]             = useState(30)
  const [xp, setXp]                 = useState(200)
  const [saving, setSaving]         = useState(false)
  const [generating, setGenerating] = useState(false)
  const [error, setError]           = useState('')
  const [success, setSuccess]       = useState('')

  async function handleCreate(e) {
    e.preventDefault()
    if (!title.trim() || !description.trim() || !category) {
      setError('Please fill in all required fields.')
      return
    }
    setError('')
    setSaving(true)
    await addCustomChallenge({ title, description, category, difficulty, time: Number(time), xp: Number(xp) })
    setSaving(false)
    setSuccess('Challenge created and set as your current challenge!')
    setTimeout(() => navigate('/dashboard'), 1500)
  }

  async function handleGenerateFromAPI() {
    setGenerating(true)
    setError('')
    try {
      const challenge = await generateChallengeFromAPIs()
      setApiChallenge(challenge)
      setSuccess('Challenge generated and set as your current quest!')
      setTimeout(() => navigate('/dashboard'), 1500)
    } catch {
      setError('Could not reach the API. Check your connection and try again.')
    } finally {
      setGenerating(false)
    }
  }

  return (
    <Layout>
      <div className="page-bc"><span style={{ color: 'var(--purple)' }}>◆</span> Random Quest</div>
      <div className="page-title">Create Challenge</div>
      <p className="page-sub" style={{ marginBottom: 28 }}>Build your own quest or generate one instantly</p>

      {/* Generate section */}
      <div style={S.apiCard}>
        <div style={S.apiLeft}>
          <div style={S.apiTitle}>Generate Challenge</div>
          <p style={S.apiDesc}>
            Instantly forge a unique random challenge and set it as your current quest.
          </p>
        </div>
        <button
          className="btn-primary"
          onClick={handleGenerateFromAPI}
          disabled={generating}
          style={{ padding: '10px 24px', flexShrink: 0 }}
        >
          {generating ? 'Generating…' : <><SparkleIcon /> Generate Challenge</>}
        </button>
      </div>

      <div style={S.divider}>
        <span style={S.dividerText}>— or craft your own —</span>
      </div>

      {/* Custom form */}
      <div style={S.card}>
        <form onSubmit={handleCreate} style={S.form}>
          <div style={S.row2}>
            <div className="form-group" style={{ flex: 1 }}>
              <label className="form-label">Challenge Title *</label>
              <input
                className="form-input"
                placeholder="Name your quest…"
                value={title}
                onChange={e => setTitle(e.target.value)}
                style={{ paddingLeft: 14 }}
              />
            </div>
            <div className="form-group" style={{ width: 200 }}>
              <label className="form-label">Category *</label>
              <select
                className="form-input"
                value={category}
                onChange={e => setCategory(e.target.value)}
                style={{ paddingLeft: 14 }}
              >
                <option value="">Select…</option>
                {CATEGORIES.map(c => (
                  <option key={c.id} value={c.label}>{c.label}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="form-group">
            <label className="form-label">Description *</label>
            <textarea
              className="form-input"
              placeholder="Describe the challenge in detail…"
              value={description}
              onChange={e => setDesc(e.target.value)}
              rows={4}
              style={{ paddingLeft: 14, paddingTop: 10, resize: 'vertical', minHeight: 100 }}
            />
          </div>

          <div style={S.row3}>
            <div className="form-group" style={{ flex: 1 }}>
              <label className="form-label">Difficulty</label>
              <div style={S.pills}>
                {DIFFICULTIES.map(d => (
                  <button
                    key={d} type="button"
                    onClick={() => {
                      setDifficulty(d)
                      const xpMap = { Easy: 100, Medium: 200, Hard: 300 }
                      setXp(xpMap[d])
                    }}
                    style={{
                      ...S.pill,
                      ...(difficulty === d ? S.pillActive : {}),
                    }}
                  >
                    {d}
                  </button>
                ))}
              </div>
            </div>

            <div className="form-group" style={{ width: 130 }}>
              <label className="form-label">Time (min)</label>
              <input
                className="form-input"
                type="number" min={5} max={300}
                value={time}
                onChange={e => setTime(e.target.value)}
                style={{ paddingLeft: 14 }}
              />
            </div>

            <div className="form-group" style={{ width: 130 }}>
              <label className="form-label">XP Reward</label>
              <input
                className="form-input"
                type="number" min={10} max={1000}
                value={xp}
                onChange={e => setXp(e.target.value)}
                style={{ paddingLeft: 14 }}
              />
            </div>
          </div>

          {error   && <p style={S.error}>{error}</p>}
          {success && <p style={S.successMsg}>{success}</p>}

          <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
            <button
              type="submit"
              className="btn-primary"
              disabled={saving}
              style={{ padding: '10px 32px' }}
            >
              {saving ? 'Creating…' : <><PlusIcon /> Create Challenge</>}
            </button>
          </div>
        </form>
      </div>
    </Layout>
  )
}

const S = {
  apiCard: {
    display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 20,
    background: 'linear-gradient(135deg, #12112a 0%, #0e0d20 100%)',
    border: '1px solid rgba(124,58,237,.3)',
    borderRadius: 12, padding: '22px 28px', marginBottom: 24,
  },
  apiLeft: { flex: 1 },
  apiTitle: { fontFamily: "'Cinzel',serif", fontSize: 15, fontWeight: 700, color: 'var(--text)', marginBottom: 6 },
  apiDesc: { fontSize: 13, color: 'var(--text-muted)', lineHeight: 1.6 },
  divider: { textAlign: 'center', marginBottom: 24 },
  dividerText: { fontSize: 12, color: 'var(--text-dim)', letterSpacing: '0.06em' },
  card: {
    background: 'var(--bg-card)', border: '1px solid var(--border)',
    borderRadius: 12, padding: '28px',
  },
  form: { display: 'flex', flexDirection: 'column', gap: 20 },
  row2: { display: 'flex', gap: 16, alignItems: 'flex-start' },
  row3: { display: 'flex', gap: 16, alignItems: 'flex-start', flexWrap: 'wrap' },
  pills: { display: 'flex', gap: 8, flexWrap: 'wrap' },
  pill: {
    padding: '6px 16px', borderRadius: 20,
    fontSize: 12, fontWeight: 500, cursor: 'pointer',
    background: 'var(--bg-card-2)', border: '1px solid var(--border)',
    color: 'var(--text-muted)', transition: 'all .15s',
  },
  pillActive: {
    background: 'var(--purple)', border: '1px solid var(--purple)',
    color: '#fff',
  },
  error: { fontSize: 12, color: '#f87171' },
  successMsg: { fontSize: 12, color: '#4ade80' },
}

function SparkleIcon() {
  return <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 3v1m0 16v1M4.22 4.22l.71.71m12.73 12.73.71.71M3 12H2m20 0h-1M4.22 19.78l.71-.71M18.36 5.64l.71-.71"/><circle cx="12" cy="12" r="3"/></svg>
}
function PlusIcon() {
  return <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
}
