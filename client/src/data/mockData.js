export const CHALLENGE_POOL = [
  {
    id: 1, title: 'The Labyrinth of Lost Code', category: 'Algorithms', difficulty: 'Legendary',
    xp: 500, time: 90,
    description: 'Solve a recursive maze-traversal algorithm using only pure functions. No loops permitted — the ancient law forbids it.',
  },
  {
    id: 2, title: 'Shadow of the SQL Throne', category: 'Databases', difficulty: 'Hard',
    xp: 300, time: 45,
    description: 'Write a single query to rank every guild member by points, using only one subquery and no CTEs.',
  },
  {
    id: 3, title: 'The Iron API Contract', category: 'System Design', difficulty: 'Medium',
    xp: 200, time: 60,
    description: 'Design and document a RESTful API for a quest-management system with auth, pagination, and error schemas.',
  },
  {
    id: 4, title: 'Scrolls of the Binary Tree', category: 'Data Structures', difficulty: 'Hard',
    xp: 350, time: 75,
    description: 'Implement an AVL tree with self-balancing rotations from scratch in the language of your choosing.',
  },
  {
    id: 5, title: 'Rune of the Regex', category: 'Scripting', difficulty: 'Easy',
    xp: 100, time: 20,
    description: 'Write a single regex pattern that validates an entire markdown-formatted email address including edge cases.',
  },
  {
    id: 6, title: 'The Forking Paths of Git', category: 'DevOps', difficulty: 'Medium',
    xp: 150, time: 30,
    description: 'Recover a deleted branch, cherry-pick three commits, and rebase onto main without merge conflicts.',
  },
  {
    id: 7, title: 'Crown of Components', category: 'Frontend', difficulty: 'Medium',
    xp: 220, time: 50,
    description: 'Build a fully accessible accordion component with keyboard navigation, ARIA roles, and CSS transitions.',
  },
  {
    id: 8, title: 'Vault of Vulnerabilities', category: 'Security', difficulty: 'Hard',
    xp: 320, time: 55,
    description: 'Identify and patch five OWASP vulnerabilities hidden inside a provided Express.js application.',
  },
  {
    id: 9, title: 'The Sorting Ceremony', category: 'Algorithms', difficulty: 'Easy',
    xp: 80, time: 15,
    description: 'Implement quicksort without referencing any documentation. Explain each partition step in comments.',
  },
  {
    id: 10, title: 'The Phantom Index', category: 'Databases', difficulty: 'Medium',
    xp: 180, time: 40,
    description: 'Profile a slow query, identify the missing index, add it, and show before/after execution plans.',
  },
  {
    id: 11, title: 'Citadel of Caches', category: 'System Design', difficulty: 'Legendary',
    xp: 550, time: 120,
    description: 'Design a distributed caching layer for a global quest feed. Handle cache invalidation, TTLs, and thundering herd.',
  },
  {
    id: 12, title: 'Heaps of Glory', category: 'Data Structures', difficulty: 'Medium',
    xp: 200, time: 45,
    description: 'Build a min-heap priority queue and use it to solve the top-K elements problem in O(n log k).',
  },
  {
    id: 13, title: 'The Pipeline Ritual', category: 'DevOps', difficulty: 'Hard',
    xp: 300, time: 60,
    description: 'Configure a GitHub Actions CI/CD pipeline that lints, tests, builds, and deploys on every push to main.',
  },
  {
    id: 14, title: 'Tokens of the Realm', category: 'Security', difficulty: 'Medium',
    xp: 200, time: 40,
    description: 'Implement JWT authentication with refresh tokens, proper expiry, and secure httpOnly cookie storage.',
  },
  {
    id: 15, title: 'The Canvas Covenant', category: 'Frontend', difficulty: 'Legendary',
    xp: 480, time: 100,
    description: 'Build an interactive particle animation on canvas that responds to mouse movement without any external libraries.',
  },
  {
    id: 16, title: 'Echo Chamber', category: 'Scripting', difficulty: 'Hard',
    xp: 280, time: 50,
    description: 'Write a Bash script that monitors a log file in real time and alerts when error rates exceed a threshold.',
  },
  {
    id: 17, title: 'The Trie of a Thousand Words', category: 'Data Structures', difficulty: 'Hard',
    xp: 330, time: 65,
    description: 'Implement a compressed trie for an autocomplete system that handles 10,000+ words with O(k) lookups.',
  },
  {
    id: 18, title: 'Dungeon of Dark Patterns', category: 'Frontend', difficulty: 'Easy',
    xp: 90, time: 25,
    description: 'Identify and refactor three UI dark patterns in a provided design mockup into accessible alternatives.',
  },
  {
    id: 19, title: 'The Chronicle of Commits', category: 'DevOps', difficulty: 'Easy',
    xp: 70, time: 15,
    description: 'Write a git-log one-liner that outputs a pretty commit history grouped by author with stats.',
  },
  {
    id: 20, title: 'Blood of the Schema', category: 'Databases', difficulty: 'Legendary',
    xp: 500, time: 110,
    description: 'Design and migrate a multi-tenant SaaS database schema with row-level security, audit logs, and soft deletes.',
  },
];

export const LEADERBOARD_DATA = [
  { rank: 1,  name: 'Aelindra Voss',   quests: 32, points: 12970 },
  { rank: 2,  name: 'Kaine Morrow',    quests: 31, points: 11740 },
  { rank: 3,  name: 'Sable Thorne',    quests: 32, points: 11487 },
  { rank: 4,  name: 'Ryven Cross',     quests: 30, points: 11338 },
  { rank: 5,  name: 'Isolde Vane',     quests: 27, points: 11095 },
  { rank: 6,  name: 'Caelan Dusk',     quests: 19, points: 10828 },
  { rank: 7,  name: 'Morrigan Hale',   quests: 26, points: 10680 },
  { rank: 8,  name: 'Zephyr Ash',      quests: 26, points: 10413 },
  { rank: 9,  name: 'Lyric Stone',     quests: 23, points: 10220 },
  { rank: 10, name: 'Tarquin Vale',    quests: 18, points: 9992  },
  { rank: 11, name: 'Seraph Mox',      quests: 72, points: 9769  },
  { rank: 12, name: 'Briar Wren',      quests: 68, points: 9500  },
  { rank: 13, name: 'Corvus Fenn',     quests: 60, points: 9338  },
  { rank: 14, name: 'Elara Dusk',      quests: 64, points: 9073  },
  { rank: 15, name: 'Hadrian Salt',    quests: 65, points: 8861  },
  { rank: 16, name: 'Vesper Lowe',     quests: 49, points: 8674  },
  { rank: 17, name: 'Dorian Myst',     quests: 52, points: 8438  },
  { rank: 18, name: 'Fable Quinn',     quests: 51, points: 8201  },
  { rank: 19, name: 'Orren Shade',     quests: 54, points: 7975  },
  { rank: 20, name: 'Calyx Wren',      quests: 47, points: 7789  },
  { rank: 21, name: 'Merys Cole',      quests: 43, points: 7537  },
  { rank: 22, name: 'Bastian Fog',     quests: 52, points: 7306  },
  { rank: 23, name: 'Lycam Marsh',     quests: 48, points: 7200  },
  { rank: 24, name: 'Ondine Raith',    quests: 44, points: 7041  },
  { rank: 25, name: 'Soren Veld',      quests: 41, points: 6882  },
  { rank: 26, name: 'Aldric Vane',     quests: 41, points: 7840  },
  { rank: 27, name: 'Thessaly Rue',    quests: 38, points: 6510  },
  { rank: 28, name: 'Callen Bright',   quests: 36, points: 6340  },
  { rank: 29, name: 'Nymira Stone',    quests: 35, points: 6201  },
  { rank: 30, name: 'Fen Darrow',      quests: 33, points: 6050  },
  { rank: 31, name: 'Isora Blacke',    quests: 32, points: 5920  },
  { rank: 32, name: 'Wren Tallow',     quests: 30, points: 5770  },
  { rank: 33, name: 'Crest Moray',     quests: 29, points: 5640  },
  { rank: 34, name: 'Lyanna Dorne',    quests: 28, points: 5500  },
  { rank: 35, name: 'Talon Frost',     quests: 27, points: 5360  },
  { rank: 36, name: 'Selwyn Arc',      quests: 26, points: 5210  },
  { rank: 37, name: 'Mira Voss',       quests: 25, points: 5080  },
  { rank: 38, name: 'Oswin Pryce',     quests: 24, points: 4940  },
  { rank: 39, name: 'Edric Hale',      quests: 23, points: 4810  },
  { rank: 40, name: 'Solis Crane',     quests: 22, points: 4670  },
  { rank: 41, name: 'Vesna Quill',     quests: 21, points: 4530  },
  { rank: 42, name: 'Thornton Wick',   quests: 20, points: 4400  },
  { rank: 43, name: 'Eira Sand',       quests: 19, points: 4260  },
  { rank: 44, name: 'Cato Elm',        quests: 18, points: 4130  },
  { rank: 45, name: 'Lyra Gloom',      quests: 17, points: 3990  },
  { rank: 46, name: 'Brennan Kale',    quests: 16, points: 3850  },
  { rank: 47, name: 'Nia Frost',       quests: 15, points: 3710  },
  { rank: 48, name: 'Corvyn Ash',      quests: 14, points: 3580  },
  { rank: 49, name: 'Tessera Moon',    quests: 13, points: 3440  },
  { rank: 50, name: 'Aldous Pike',     quests: 12, points: 3300  },
];

export const CATEGORIES = [
  { id: 'algorithms',      label: 'Algorithms',      sub: 'Sorting, searching, recursion' },
  { id: 'databases',       label: 'Databases',       sub: 'SQL, NoSQL, query optimization' },
  { id: 'system-design',   label: 'System Design',   sub: 'APIs, architecture, scalability' },
  { id: 'data-structures', label: 'Data Structures', sub: 'Trees, graphs, heaps, queues' },
  { id: 'scripting',       label: 'Scripting',       sub: 'Regex, shell, automation' },
  { id: 'devops',          label: 'DevOps',          sub: 'CI/CD, containers, git' },
  { id: 'security',        label: 'Security',        sub: 'Encryption, auth, vulnerabilities' },
  { id: 'frontend',        label: 'Frontend',        sub: 'UI, accessibility, performance' },
];

export const DIFFICULTIES = ['Easy', 'Medium', 'Hard', 'Legendary', 'Mixed'];
export const FREQUENCIES  = ['Daily', 'Every 2 Days', 'Weekly'];

export const DEFAULT_USER = {
  id: 1,
  name: 'Aldric Vane',
  email: 'aldric.vane@realm.io',
  totalXP: 7840,
  completedCount: 41,
  streak: 9,
  longestStreak: 12,
  rank: 284,
  level: 18,
  levelTitle: 'Knight Errant',
  nextLevel: 19,
  nextLevelTitle: 'Quest Warden',
  xpForNext: 10000,
  categories: ['algorithms', 'databases', 'system-design'],
  difficulty: 'Medium',
  frequency: 'Daily',
};

export const HISTORY_SEED = [
  { id: 101, title: 'Rune of the Regex',          category: 'Scripting',       difficulty: 'Easy',   xp: 100, date: '2026-06-20', completed: true },
  { id: 102, title: 'The Forking Paths of Git',   category: 'DevOps',          difficulty: 'Medium', xp: 150, date: '2026-06-18', completed: true },
  { id: 103, title: 'Shadow of the SQL Throne',   category: 'Databases',       difficulty: 'Hard',   xp: 300, date: '2026-06-15', completed: true },
  { id: 104, title: 'Crown of Components',        category: 'Frontend',        difficulty: 'Medium', xp: 220, date: '2026-06-12', completed: true },
  { id: 105, title: 'The Iron API Contract',      category: 'System Design',   difficulty: 'Medium', xp: 200, date: '2026-06-09', completed: true },
];

export const SAVED_SEED = [
  { ...CHALLENGE_POOL[1] },
  { ...CHALLENGE_POOL[2] },
  { ...CHALLENGE_POOL[3] },
  { ...CHALLENGE_POOL[4] },
  { ...CHALLENGE_POOL[5] },
];

export function pickChallenge(categories = [], difficulty = 'Mixed') {
  let pool = CHALLENGE_POOL;
  if (categories.length > 0) {
    const catLabels = categories.map(c => CATEGORIES.find(x => x.id === c)?.label).filter(Boolean);
    const filtered = pool.filter(ch => catLabels.includes(ch.category));
    if (filtered.length > 0) pool = filtered;
  }
  if (difficulty !== 'Mixed') {
    const filtered = pool.filter(ch => ch.difficulty === difficulty);
    if (filtered.length > 0) pool = filtered;
  }
  return pool[Math.floor(Math.random() * pool.length)];
}

export function getRankTier(rank) {
  if (rank <= 10)  return 'Crimson Quest Master';
  if (rank <= 25)  return 'Quest Knight';
  return 'Quest Squire';
}

export function getInitials(name = '') {
  return name.split(' ').map(w => w[0]).join('').toUpperCase().slice(0, 2);
}
