import { BrowserRouter, Routes, Route, Navigate, useNavigate } from 'react-router-dom'
import { Component } from 'react'
import { AppProvider, useApp } from './context/AppContext'
import Login             from './pages/Login'
import Register          from './pages/Register'
import Dashboard         from './pages/Dashboard'
import SavedChallenges   from './pages/SavedChallenges'
import ChallengeHistory  from './pages/ChallengeHistory'
import CategorySettings  from './pages/CategorySettings'
import Profile           from './pages/Profile'
import ErrorPage         from './pages/ErrorPage'

function Protected({ children }) {
  const { isAuthenticated, loading } = useApp()
  if (loading) return <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100vh', color: 'var(--text-muted)', fontFamily: "'Cinzel',serif", letterSpacing: '0.1em' }}>Loading…</div>
  return isAuthenticated ? children : <Navigate to="/" replace />
}

class ErrorBoundary extends Component {
  constructor(props) {
    super(props)
    this.state = { hasError: false, error: null }
  }
  static getDerivedStateFromError(error) {
    return { hasError: true, error }
  }
  render() {
    if (this.state.hasError) {
      return <ErrorPage error={this.state.error} />
    }
    return this.props.children
  }
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
      <Route path="/profile"     element={<Protected><Profile /></Protected>} />
      <Route path="/error"       element={<ErrorPage />} />
      <Route path="*"            element={<Navigate to="/" replace />} />
    </Routes>
  )
}

export default function App() {
  return (
    <AppProvider>
      <BrowserRouter>
        <ErrorBoundary>
          <AppRoutes />
        </ErrorBoundary>
      </BrowserRouter>
    </AppProvider>
  )
}
