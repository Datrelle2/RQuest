import Sidebar from './Sidebar'

export default function Layout({ children }) {
  return (
    <div style={{ display: 'flex', height: '100vh', overflow: 'hidden' }}>
      <Sidebar />
      <main style={{
        flex: 1, overflowY: 'auto',
        padding: '32px 36px',
        background: 'var(--bg)',
      }}>
        {children}
      </main>
    </div>
  )
}
