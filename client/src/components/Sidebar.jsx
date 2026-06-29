import { NavLink, useNavigate } from 'react-router-dom'
import { useApp } from '../context/AppContext'

const NAV = [
  { to: '/dashboard',   label: 'Dashboard',         icon: <GridIcon /> },
  { to: '/saved',       label: 'Saved Challenges',   icon: <BookmarkIcon /> },
  { to: '/history',     label: 'Challenge History',  icon: <ClockIcon /> },
  { to: '/settings',    label: 'Category Settings',  icon: <SlidersIcon /> },
  { to: '/profile',     label: 'Profile',            icon: <UserIcon /> },
]

export default function Sidebar() {
  const { logout } = useApp()
  const navigate = useNavigate()

  function handleLogout() {
    logout()
    navigate('/')
  }

  return (
    <aside style={styles.aside}>
      <div style={styles.logo}>
        <div style={styles.logoIcon}>
          <DiamondIcon />
        </div>
        <div style={styles.logoText}>
          <span style={styles.logoR}>Random</span>
          <span style={styles.logoQ}>Quest</span>
        </div>
      </div>

      <nav style={styles.nav}>
        {NAV.map(item => (
          <NavLink key={item.to} to={item.to} style={({ isActive }) => ({
            ...styles.navItem,
            ...(isActive ? styles.navItemActive : {}),
          })}>
            {({ isActive }) => (
              <>
                {isActive && <span style={styles.activePip} />}
                <span style={{ ...styles.navIcon, color: isActive ? '#9d5ef5' : '#3e3e5e' }}>
                  {item.icon}
                </span>
                <span style={{ color: isActive ? '#ddddf0' : '#6b6b95' }}>{item.label}</span>
              </>
            )}
          </NavLink>
        ))}
      </nav>

      <button onClick={handleLogout} style={styles.logout}>
        <span style={{ display: 'flex' }}><LogoutIcon /></span>
        Sign Out
      </button>
    </aside>
  )
}

const styles = {
  aside: {
    width: 'var(--sidebar-w)', minWidth: 'var(--sidebar-w)',
    height: '100vh', position: 'sticky', top: 0,
    background: 'rgba(11,11,20,0.72)',
    backdropFilter: 'blur(14px)',
    WebkitBackdropFilter: 'blur(14px)',
    borderRight: '1px solid var(--border)',
    display: 'flex', flexDirection: 'column',
    padding: '20px 0',
    flexShrink: 0,
  },
  logo: {
    display: 'flex', alignItems: 'center', gap: 10,
    padding: '0 20px 24px',
    borderBottom: '1px solid var(--border-subtle)',
    marginBottom: 16,
  },
  logoIcon: {
    width: 30, height: 30,
    background: 'var(--purple)',
    borderRadius: 6,
    display: 'flex', alignItems: 'center', justifyContent: 'center',
    color: '#fff', fontSize: 14, flexShrink: 0,
  },
  logoText: { display: 'flex', flexDirection: 'column', lineHeight: 1.2 },
  logoR: { fontFamily: "'Cinzel', serif", fontSize: 10, color: 'var(--text-muted)', letterSpacing: '0.08em', textTransform: 'uppercase' },
  logoQ: { fontFamily: "'Cinzel', serif", fontSize: 12, color: 'var(--text)', fontWeight: 700, letterSpacing: '0.06em', textTransform: 'uppercase' },
  nav: { flex: 1, display: 'flex', flexDirection: 'column', gap: 2, padding: '0 8px' },
  navItem: {
    display: 'flex', alignItems: 'center', gap: 10,
    padding: '9px 12px', borderRadius: 7,
    fontSize: 13, fontWeight: 500,
    position: 'relative', textDecoration: 'none',
    transition: 'background .15s',
  },
  navItemActive: {
    background: 'rgba(124,58,237,.12)',
  },
  activePip: {
    position: 'absolute', left: 0, top: '20%', bottom: '20%',
    width: 3, borderRadius: '0 3px 3px 0',
    background: 'var(--purple)',
  },
  navIcon: { display: 'flex', alignItems: 'center', flexShrink: 0 },
  logout: {
    display: 'flex', alignItems: 'center', gap: 10,
    margin: '8px 8px 0',
    padding: '9px 12px', borderRadius: 7,
    fontSize: 13, color: 'var(--text-muted)',
    transition: 'color .15s',
    cursor: 'pointer',
  },
}

function DiamondIcon() {
  return (
    <svg width="16" height="18" viewBox="0 0 100 115" fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="sbA" x1="10" y1="0" x2="90" y2="115" gradientUnits="userSpaceOnUse">
          <stop offset="0%"   stopColor="#c4b5fd"/>
          <stop offset="50%"  stopColor="#7c3aed"/>
          <stop offset="100%" stopColor="#3b0764"/>
        </linearGradient>
      </defs>
      <polygon points="50,2 92,32 78,50 22,50 8,32" fill="url(#sbA)" stroke="rgba(196,181,253,0.4)" strokeWidth="2"/>
      <polygon points="50,2 92,32 64,24" fill="rgba(255,255,255,0.18)"/>
      <polygon points="50,2 8,32 36,24"  fill="rgba(255,255,255,0.10)"/>
      <polygon points="50,2 64,24 50,22 36,24" fill="rgba(255,255,255,0.24)"/>
      <line x1="22" y1="50" x2="78" y2="50" stroke="rgba(196,181,253,0.5)" strokeWidth="2"/>
      <polygon points="22,50 78,50 50,113" fill="url(#sbA)" stroke="rgba(196,181,253,0.3)" strokeWidth="2"/>
      <polygon points="22,50 50,50 50,113" fill="rgba(255,255,255,0.07)"/>
      <polygon points="78,50 50,50 50,113" fill="rgba(0,0,0,0.22)"/>
      <circle cx="50" cy="20" r="5" fill="white" opacity="0.65"/>
    </svg>
  )
}
function GridIcon() {
  return <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/></svg>
}
function PlusCircleIcon() {
  return <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="16"/><line x1="8" y1="12" x2="16" y2="12"/></svg>
}
function BookmarkIcon() {
  return <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"/></svg>
}
function ClockIcon() {
  return <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
}
function SlidersIcon() {
  return <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><line x1="4" y1="6" x2="20" y2="6"/><line x1="4" y1="12" x2="20" y2="12"/><line x1="4" y1="18" x2="20" y2="18"/><circle cx="8" cy="6" r="2" fill="currentColor" stroke="none"/><circle cx="16" cy="12" r="2" fill="currentColor" stroke="none"/><circle cx="10" cy="18" r="2" fill="currentColor" stroke="none"/></svg>
}
function UserIcon() {
  return <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
}
function LogoutIcon() {
  return <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/></svg>
}
