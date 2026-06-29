export const LEVELS = [
  { level: 1,  title: 'Quest Initiate',     xp: 0 },
  { level: 2,  title: 'Quest Novice',        xp: 300 },
  { level: 3,  title: 'Quest Apprentice',    xp: 750 },
  { level: 4,  title: 'Quest Journeyman',    xp: 1500 },
  { level: 5,  title: 'Quest Adept',         xp: 2700 },
  { level: 6,  title: 'Quest Veteran',       xp: 4500 },
  { level: 7,  title: 'Quest Champion',      xp: 7000 },
  { level: 8,  title: 'Quest Hero',          xp: 10500 },
  { level: 9,  title: 'Quest Legend',        xp: 15500 },
  { level: 10, title: 'Quest Master',        xp: 22500 },
  { level: 11, title: 'Crimson Herald',      xp: 32000 },
  { level: 12, title: 'Grand Herald',        xp: 45000 },
  { level: 13, title: 'Mythic Wanderer',     xp: 62000 },
  { level: 14, title: 'Eternal Seeker',      xp: 84000 },
  { level: 15, title: 'Divine Champion',     xp: 112000 },
]

export function getLevelInfo(totalXP) {
  const xp = totalXP ?? 0
  let current = LEVELS[0]
  for (let i = LEVELS.length - 1; i >= 0; i--) {
    if (xp >= LEVELS[i].xp) { current = LEVELS[i]; break }
  }
  const next = LEVELS[current.level] ?? null
  const xpIntoLevel = xp - current.xp
  const xpForThisLevel = next ? next.xp - current.xp : 0
  const progress = next ? Math.min(100, (xpIntoLevel / xpForThisLevel) * 100) : 100
  return { current, next, xpIntoLevel, xpForThisLevel, progress }
}

export function levelColor(level) {
  if (level <= 3)  return '#6b7280'
  if (level <= 5)  return '#22c55e'
  if (level <= 7)  return '#3b82f6'
  if (level <= 9)  return '#9d5ef5'
  if (level <= 11) return '#f59e0b'
  if (level <= 13) return '#ef4444'
  return '#ec4899'
}
