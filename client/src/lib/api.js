import axios from 'axios'

export async function fetchBoredActivity() {
  const { data } = await axios.get('https://www.boredapi.com/api/activity')
  return data
}

export async function fetchAdvice() {
  const { data } = await axios.get('https://api.adviceslip.com/advice', {
    headers: { Accept: 'application/json' },
  })
  return data.slip
}

const DIFF_BY_ACCESSIBILITY = {
  low:    'Easy',
  medium: 'Medium',
  high:   'Hard',
}

function accessibilityTier(val) {
  const n = parseFloat(val)
  if (isNaN(n)) return 'Medium'
  if (n < 0.34) return 'Easy'
  if (n < 0.67) return 'Medium'
  return 'Hard'
}

const XP_MAP = { Easy: 100, Medium: 200, Hard: 300 }

export async function generateChallengeFromAPIs() {
  const [actResult, advResult] = await Promise.allSettled([
    fetchBoredActivity(),
    fetchAdvice(),
  ])

  const act = actResult.status === 'fulfilled' ? actResult.value : null
  const adv = advResult.status === 'fulfilled' ? advResult.value : null

  if (!act && !adv) throw new Error('Both APIs failed')

  const difficulty = act?.accessibility != null
    ? accessibilityTier(act.accessibility)
    : 'Medium'

  const category = act?.type
    ? act.type.charAt(0).toUpperCase() + act.type.slice(1)
    : 'General'

  const description = adv?.advice ?? act?.activity ?? ''

  return {
    id: `api-${Date.now()}`,
    title: act?.activity ?? 'Daily Surprise Challenge',
    category,
    difficulty,
    xp: XP_MAP[difficulty],
    time: Math.max(10, (act?.participants ?? 1) * 20),
    description,
    source: 'api',
  }
}
