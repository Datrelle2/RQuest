import { createContext, useContext, useState, useEffect } from 'react'
import { DEFAULT_USER, HISTORY_SEED, SAVED_SEED, pickChallenge } from '../data/mockData'
import { isSupabaseConnected } from '../lib/supabase'
import * as auth from '../services/authService'
import * as challengeSvc from '../services/challengeService'
function fetchChallenge(categories, difficulty) {
  return pickChallenge(categories, difficulty)
}

const AppContext = createContext(null)

export function AppProvider({ children }) {
  const [user, setUser]                         = useState(null)
  const [isAuthenticated, setIsAuthenticated]   = useState(false)
  const [isNewUser, setIsNewUser]               = useState(false)
  const [currentChallenge, setCurrentChallenge] = useState(null)
  const [savedChallenges, setSavedChallenges]   = useState([])
  const [history, setHistory]                   = useState([])
  const [loading, setLoading]                   = useState(isSupabaseConnected)

  useEffect(() => {
    if (!isSupabaseConnected) return

    auth.getSession().then(async session => {
      if (session?.user) {
        const profile = await challengeSvc.fetchUserProfile(session.user.id)
        const u = profile ?? {
          id: session.user.id,
          name: session.user.user_metadata?.name || session.user.email,
          email: session.user.email,
        }
        setUser(u)
        setIsAuthenticated(true)
        const [saved, hist] = await Promise.all([
          challengeSvc.fetchSavedChallenges(session.user.id),
          challengeSvc.fetchHistory(session.user.id),
        ])
        setSavedChallenges(saved)
        setHistory(hist)
        setCurrentChallenge(fetchChallenge(u.categories || [], u.difficulty || 'Mixed'))
      }
      setLoading(false)
    })

    const { data: { subscription } } = auth.onAuthStateChange((event) => {
      if (event === 'SIGNED_OUT') {
        setUser(null)
        setIsAuthenticated(false)
        setCurrentChallenge(null)
        setSavedChallenges([])
        setHistory([])
      }
    })
    return () => subscription.unsubscribe()
  }, [])

  async function login(email, password) {
    if (!isSupabaseConnected) {
      if (!email || !password) return { status: 'error', message: 'Email and password are required.' }
      const u = { ...DEFAULT_USER }
      setUser(u)
      setIsAuthenticated(true)
      setIsNewUser(false)
      setSavedChallenges([...SAVED_SEED])
      setHistory([...HISTORY_SEED])
      setCurrentChallenge(fetchChallenge(u.categories, u.difficulty))
      return { status: 'ok' }
    }
    try {
      const { user: supaUser } = await auth.signIn(email, password)
      const profile = await challengeSvc.fetchUserProfile(supaUser.id)
      const u = profile ?? {
        id: supaUser.id,
        name: supaUser.user_metadata?.name || supaUser.email,
        email: supaUser.email,
      }
      setUser(u)
      setIsAuthenticated(true)
      setIsNewUser(false)
      const [saved, hist] = await Promise.all([
        challengeSvc.fetchSavedChallenges(supaUser.id),
        challengeSvc.fetchHistory(supaUser.id),
      ])
      setSavedChallenges(saved)
      setHistory(hist)
      setCurrentChallenge(fetchChallenge(u.categories || [], u.difficulty || 'Mixed'))
      return { status: 'ok' }
    } catch (err) {
      const msg = err?.message || ''
      if (msg.toLowerCase().includes('email not confirmed'))
        return { status: 'error', message: 'Please confirm your email before signing in. Check your inbox.' }
      if (msg.toLowerCase().includes('invalid login'))
        return { status: 'error', message: 'Invalid email or password.' }
      return { status: 'error', message: msg || 'Sign in failed. Please try again.' }
    }
  }

  async function register(name, email, password) {
    if (!isSupabaseConnected) {
      if (!name || !email || !password) return { status: 'error', message: 'All fields are required.' }
      const u = {
        ...DEFAULT_USER,
        id: Date.now(),
        name, email,
        totalXP: 0, completedCount: 0,
        categories: [], difficulty: 'Mixed',
      }
      setUser(u)
      setIsAuthenticated(true)
      setIsNewUser(true)
      setSavedChallenges([])
      setHistory([])
      setCurrentChallenge(null)
      return { status: 'ok' }
    }
    try {
      const data = await auth.signUp(email, password, name)
      // Supabase returns a session immediately if email confirmation is disabled,
      // or null session if confirmation is required.
      const needsConfirmation = !data?.session
      if (needsConfirmation) return { status: 'confirm' }
      const { user: supaUser } = await auth.signIn(email, password)
      await challengeSvc.updateUserProfile(supaUser.id, { name, email })
      const u = {
        id: supaUser.id, name, email,
        totalXP: 0, completedCount: 0,
        categories: [], difficulty: 'Mixed',
      }
      setUser(u)
      setIsAuthenticated(true)
      setIsNewUser(true)
      setSavedChallenges([])
      setHistory([])
      setCurrentChallenge(null)
      return { status: 'ok' }
    } catch (err) {
      const msg = err?.message || 'Registration failed. Please try again.'
      return { status: 'error', message: msg }
    }
  }

  async function logout() {
    if (isSupabaseConnected) await auth.signOut()
    setUser(null)
    setIsAuthenticated(false)
    setIsNewUser(false)
    setCurrentChallenge(null)
    setSavedChallenges([])
    setHistory([])
  }

  function savePreferences(categories, difficulty, frequency) {
    setUser(prev => ({ ...prev, categories, difficulty, frequency }))
    setIsNewUser(false)
    setCurrentChallenge(fetchChallenge(categories, difficulty))
  }

  async function saveChallenge(challenge) {
    setSavedChallenges(prev =>
      prev.find(c => c.id === challenge.id) ? prev : [...prev, challenge]
    )
    if (isSupabaseConnected && challenge.id) {
      await challengeSvc.saveChallenge(challenge.id)
    }
  }

  async function unsaveChallenge(id) {
    setSavedChallenges(prev => prev.filter(c => c.id !== id))
    if (isSupabaseConnected) {
      await challengeSvc.unsaveChallenge(id)
    }
  }

  async function completeChallenge() {
    if (!currentChallenge) return
    const entry = {
      ...currentChallenge,
      date: new Date().toISOString().slice(0, 10),
      completed: true,
    }
    setHistory(prev => [entry, ...prev])
    setUser(prev => ({
      ...prev,
      totalXP: (prev.totalXP || 0) + (currentChallenge.xp || 0),
      completedCount: (prev.completedCount || 0) + 1,
    }))
    if (isSupabaseConnected && user?.id) {
      await challengeSvc.completeChallenge(currentChallenge.id)
      await challengeSvc.updateUserPoints(user.id, currentChallenge.xp)
    }
    setCurrentChallenge(fetchChallenge(user?.categories, user?.difficulty))
  }

  function redrawChallenge() {
    setCurrentChallenge(fetchChallenge(user?.categories, user?.difficulty))
  }

  function selectChallenge(challenge) {
    setCurrentChallenge(challenge)
  }

  async function updateProfile(name, email) {
    setUser(prev => ({ ...prev, name, email }))
    if (isSupabaseConnected && user?.id) {
      await challengeSvc.updateUserProfile(user.id, { name, email })
    }
  }

  async function addCustomChallenge(challengeData) {
    const challenge = isSupabaseConnected && user?.id
      ? await challengeSvc.createChallengeRecord(user.id, { ...challengeData, source: 'custom' })
      : { ...challengeData, id: `custom-${Date.now()}`, source: 'custom' }
    setCurrentChallenge(challenge)
    return challenge
  }

  async function deleteFromHistory(id) {
    setHistory(prev => prev.filter(c => c.id !== id))
    if (isSupabaseConnected) {
      await challengeSvc.deleteChallenge(id)
    }
  }

  async function deleteAccount() {
    if (isSupabaseConnected && user?.id) {
      await challengeSvc.deleteUserData(user.id)
      await auth.signOut()
    }
    setUser(null)
    setIsAuthenticated(false)
    setIsNewUser(false)
    setCurrentChallenge(null)
    setSavedChallenges([])
    setHistory([])
  }

  return (
    <AppContext.Provider value={{
      user, isAuthenticated, isNewUser, loading,
      currentChallenge, savedChallenges, history,
      login, register, logout,
      savePreferences, saveChallenge, unsaveChallenge,
      completeChallenge, redrawChallenge, selectChallenge, updateProfile,
      addCustomChallenge, deleteFromHistory, deleteAccount,
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
