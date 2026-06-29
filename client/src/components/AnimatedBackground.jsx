import { useEffect, useRef } from 'react'

export default function AnimatedBackground() {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    let animId

    function resize() {
      canvas.width  = window.innerWidth
      canvas.height = window.innerHeight
    }
    resize()
    window.addEventListener('resize', resize)

    /* ── Stars (twinkling points) ─────────────────────────────────── */
    const stars = Array.from({ length: 140 }, () => ({
      x:     Math.random(),
      y:     Math.random(),
      r:     Math.random() * 1.4 + 0.3,
      phase: Math.random() * Math.PI * 2,
      freq:  Math.random() * 0.6 + 0.3,
      base:  Math.random() * 0.35 + 0.15,
      color: Math.random() > 0.6 ? 'purple' : Math.random() > 0.5 ? 'blue' : 'white',
    }))

    /* ── Gem particles (floating upward) ─────────────────────────── */
    const GEM_COLORS = ['#b44fff', '#8b2be2', '#2979ff', '#00e676', '#ffd600']
    function makeGem(w, h, randomY = true) {
      return {
        x:        Math.random() * w,
        y:        randomY ? Math.random() * h : h + 20,
        size:     Math.random() * 9 + 4,
        vx:       (Math.random() - 0.5) * 0.3,
        vy:       -(Math.random() * 0.4 + 0.1),
        rot:      Math.random() * Math.PI * 2,
        rotSpeed: (Math.random() - 0.5) * 0.01,
        opacity:  Math.random() * 0.28 + 0.08,
        phase:    Math.random() * Math.PI * 2,
        color:    GEM_COLORS[Math.floor(Math.random() * GEM_COLORS.length)],
      }
    }
    const gems = Array.from({ length: 20 }, () =>
      makeGem(canvas.width, canvas.height, true)
    )

    /* ── Constellation nodes (very subtle) ───────────────────────── */
    const nodes = Array.from({ length: 22 }, () => ({
      x:    Math.random(),
      y:    Math.random(),
      vx:   (Math.random() - 0.5) * 0.00012,
      vy:   (Math.random() - 0.5) * 0.00012,
    }))

    /* ── Draw helpers ────────────────────────────────────────────── */
    function drawGem(x, y, size, rot, opacity, color = '#b44fff') {
      ctx.save()
      ctx.translate(x, y)
      ctx.rotate(rot)
      ctx.globalAlpha = opacity
      ctx.strokeStyle = color
      ctx.shadowColor = color
      ctx.shadowBlur  = size * 2
      ctx.lineWidth   = 1.1

      // Crown (top)
      ctx.beginPath()
      ctx.moveTo(0, -size)
      ctx.lineTo( size * 0.75, -size * 0.15)
      ctx.lineTo( size * 0.75,  size * 0.35)
      ctx.lineTo(0,             size)
      ctx.lineTo(-size * 0.75,  size * 0.35)
      ctx.lineTo(-size * 0.75, -size * 0.15)
      ctx.closePath()
      ctx.stroke()

      // Girdle line
      ctx.beginPath()
      ctx.moveTo(-size * 0.75, -size * 0.15)
      ctx.lineTo( size * 0.75, -size * 0.15)
      ctx.stroke()

      // Apex lines
      ctx.globalAlpha = opacity * 0.5
      ctx.beginPath()
      ctx.moveTo(0, -size)
      ctx.lineTo(0, -size * 0.15)
      ctx.stroke()

      ctx.restore()
    }

    function drawConstellations(w, h) {
      const DIST = 0.24
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const dx = nodes[i].x - nodes[j].x
          const dy = nodes[i].y - nodes[j].y
          const d  = Math.sqrt(dx * dx + dy * dy)
          if (d < DIST) {
            const alpha = (1 - d / DIST) * 0.1
            ctx.save()
            ctx.globalAlpha  = alpha
            ctx.strokeStyle  = '#8b2be2'
            ctx.shadowColor  = '#b44fff'
            ctx.shadowBlur   = 4
            ctx.lineWidth    = 0.8
            ctx.beginPath()
            ctx.moveTo(nodes[i].x * w, nodes[i].y * h)
            ctx.lineTo(nodes[j].x * w, nodes[j].y * h)
            ctx.stroke()
            ctx.restore()
          }
        }
      }
    }

    /* ── Main loop ───────────────────────────────────────────────── */
    let t = 0
    function frame() {
      const W = canvas.width
      const H = canvas.height
      ctx.clearRect(0, 0, W, H)
      t += 0.012

      /* --- constellation lines --- */
      for (const n of nodes) {
        n.x = ((n.x + n.vx) + 1) % 1
        n.y = ((n.y + n.vy) + 1) % 1
      }
      drawConstellations(W, H)

      /* --- node dots --- */
      ctx.save()
      ctx.shadowColor = '#b44fff'
      ctx.shadowBlur  = 6
      ctx.fillStyle = 'rgba(139,43,226,0.45)'
      for (const n of nodes) {
        ctx.beginPath()
        ctx.arc(n.x * W, n.y * H, 1.5, 0, Math.PI * 2)
        ctx.fill()
      }
      ctx.restore()

      /* --- twinkling stars --- */
      for (const s of stars) {
        const alpha = s.base + (1 - s.base) * 0.5 * (1 + Math.sin(t * s.freq * 3 + s.phase))
        const col = s.color === 'purple'
          ? `rgba(180,79,255,${alpha})`
          : s.color === 'blue'
          ? `rgba(100,160,255,${alpha})`
          : `rgba(240,230,255,${alpha})`
        ctx.save()
        ctx.shadowColor = col
        ctx.shadowBlur  = s.r > 1 ? 6 : 0
        ctx.beginPath()
        ctx.arc(s.x * W, s.y * H, s.r, 0, Math.PI * 2)
        ctx.fillStyle = col
        ctx.fill()
        ctx.restore()
      }

      /* --- floating gems --- */
      for (const g of gems) {
        const osc = Math.sin(t * 0.7 + g.phase) * 0.08
        drawGem(g.x, g.y, g.size, g.rot, g.opacity + osc, g.color)
        g.x   += g.vx
        g.y   += g.vy
        g.rot += g.rotSpeed
        if (g.y < -30) {
          Object.assign(g, makeGem(W, H, false))
        }
        if (g.x < -30) g.x = W + 30
        if (g.x > W + 30) g.x = -30
      }

      /* --- aurora pulse at base --- */
      const hue  = 272 + Math.sin(t * 0.18) * 30
      const sat  = 80  + Math.sin(t * 0.11) * 12
      const grad = ctx.createLinearGradient(0, H - 220, 0, H)
      grad.addColorStop(0,   'transparent')
      grad.addColorStop(0.5, `hsla(${hue},${sat}%,35%,0.07)`)
      grad.addColorStop(1,   `hsla(${hue},${sat}%,25%,0.16)`)
      ctx.fillStyle = grad
      ctx.fillRect(0, H - 220, W, 220)

      /* --- side glow left --- */
      const leftGlow = ctx.createLinearGradient(0, 0, 200, 0)
      leftGlow.addColorStop(0,   `hsla(${hue + 20},90%,40%,0.07)`)
      leftGlow.addColorStop(1,   'transparent')
      ctx.fillStyle = leftGlow
      ctx.fillRect(0, 0, 200, H)

      /* --- top vignette --- */
      const top = ctx.createLinearGradient(0, 0, 0, 100)
      top.addColorStop(0, 'rgba(5,5,14,0.5)')
      top.addColorStop(1, 'transparent')
      ctx.fillStyle = top
      ctx.fillRect(0, 0, W, 100)

      animId = requestAnimationFrame(frame)
    }

    frame()

    return () => {
      cancelAnimationFrame(animId)
      window.removeEventListener('resize', resize)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'fixed', inset: 0,
        zIndex: 0, pointerEvents: 'none',
      }}
    />
  )
}
