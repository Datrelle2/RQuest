import Sidebar from './Sidebar'
import AnimatedBackground from './AnimatedBackground'

export default function Layout({ children }) {
  return (
    <div style={{ display: 'flex', height: '100vh', overflow: 'hidden', position: 'relative' }}>
      <AnimatedBackground />
      <Sidebar />
      <main style={{
        flex: 1, overflowY: 'auto',
        padding: '32px 36px',
        background: 'transparent',
        position: 'relative', zIndex: 1,
      }}>
        {children}
      </main>
    </div>
  )
}
