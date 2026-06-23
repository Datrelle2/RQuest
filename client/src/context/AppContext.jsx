import { createContext, useContext, useState } from 'react'
import { DEFAULT_USER, HISTORY_SEED, SAVED_SEED, pickChallenge } from '../data/mockData'

const AppContext = createContext(null)

export function AppProvider({ children }) {
  const [user, setUser]                     = useState(null)
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [isNewUser, setIsNewUser]           = useState(false)
  const [currentChallenge, setCurrentChallenge] = useState(null)
  const [savedChallenges, setSavedChallenges]   = useState([])
  const [history, setHistory]               = useState([])

  function login(email, password) {
    if (!email || !password) return false
    const u = { ...DEFAULT_USER }
    setUser(u)
    setIsAuthenticated(true)
    setIsNewUser(false)
    setSavedChallenges([...SAVED_SEED])
    setHistory([...HISTORY_SEED])
    setCurrentChallenge(pickChallenge(u.categories, u.difficulty))
    return true
  }

  function register(name, email, password) {
    if (!name || !email || !password) return false
    const u = {
      ...DEFAULT_USER,
      id: Date.now(),
      name, email,
      totalXP: 0, completedCount: 0, streak: 0, longestStreak: 0,
      rank: 9999, level: 1, levelTitle: 'Quest Initiate',
      nextLevel: 2, nextLevelTitle: 'Quest Novice', xpForNext: 500,
      categories: [], difficulty: 'Mixed', frequency: 'Daily',
    }
    setUser(u)
    setIsAuthenticated(true)
    setIsNewUser(true)
    setSavedChallenges([])
    setHistory([])
    setCurrentChallenge(null)
    return true
  }

  function logout() {
    setUser(null)
    setIsAuthenticated(false)
    setIsNewUser(false)
    setCurrentChallenge(null)
    setSavedChallenges([])
    setHistory([])
  }

  function savePreferences(categories, difficulty, frequency) {
    setUser(prev => ({ ...prev, categories, difficulty, frequency }))
    setCurrentChallenge(pickChallenge(categories, difficulty))
    setIsNewUser(false)
  }

  function saveChallenge(challenge) {
    setSavedChallenges(prev =>
      prev.find(c => c.id === challenge.id) ? prev : [...prev, challenge]
    )
  }

  function unsaveChallenge(id) {
    setSavedChallenges(prev => prev.filter(c => c.id !== id))
  }

  function completeChallenge() {
    if (!currentChallenge) return
    const entry = { ...currentChallenge, date: new Date().toISOString().slice(0, 10), completed: true }
    setHistory(prev => [entry, ...prev])
    setUser(prev => ({
      ...prev,
      totalXP: prev.totalXP + currentChallenge.xp,
      completedCount: prev.completedCount + 1,
      streak: prev.streak + 1,
    }))
    setCurrentChallenge(pickChallenge(user?.categories, user?.difficulty))
  }

  function redrawChallenge() {
    setCurrentChallenge(pickChallenge(user?.categories, user?.difficulty))
  }

  function updateProfile(name, email) {
    setUser(prev => ({ ...prev, name, email }))
  }

  return (
    <AppContext.Provider value={{
      user, isAuthenticated, isNewUser,
      currentChallenge, savedChallenges, history,
      login, register, logout,
      savePreferences, saveChallenge, unsaveChallenge,
      completeChallenge, redrawChallenge, updateProfile,
    }}>
      {children}
    </AppContext.Provider>
  )
}

export function useApp() {
  const ctx = useContext(AppContext)
  if (!ctx) throw new Error('useApp must be used inside AppProvider')
  return ctx
}
