import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { AppProvider, useApp } from './context/AppContext'
import Login             from './pages/Login'
import Register          from './pages/Register'
import Dashboard         from './pages/Dashboard'
import SavedChallenges   from './pages/SavedChallenges'
import ChallengeHistory  from './pages/ChallengeHistory'
import CategorySettings  from './pages/CategorySettings'
import Leaderboard       from './pages/Leaderboard'
import Profile           from './pages/Profile'

function Protected({ children }) {
  const { isAuthenticated } = useApp()
  return isAuthenticated ? children : <Navigate to="/" replace />
}

function AppRoutes() {
  return (
    <Routes>
      <Route path="/"            element={<Login />} />
      <Route path="/register"    element={<Register />} />
      <Route path="/dashboard"   element={<Protected><Dashboard /></Protected>} />
      <Route path="/saved"       element={<Protected><SavedChallenges /></Protected>} />
      <Route path="/history"     element={<Protected><ChallengeHistory /></Protected>} />
      <Route path="/settings"    element={<Protected><CategorySettings /></Protected>} />
      <Route path="/leaderboard" element={<Protected><Leaderboard /></Protected>} />
      <Route path="/profile"     element={<Protected><Profile /></Protected>} />
      <Route path="*"            element={<Navigate to="/" replace />} />
    </Routes>
  )
}

export default function App() {
  return (
    <AppProvider>
      <BrowserRouter>
        <AppRoutes />
      </BrowserRouter>
    </AppProvider>
  )
}
