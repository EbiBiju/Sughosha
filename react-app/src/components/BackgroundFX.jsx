import { useEffect, useRef } from 'react'

export default function BackgroundFX() {
  const canvasRef = useRef(null)

  useEffect(() => {
    // CSS grid pattern is handled via a fixed div
    // Twinkling dots via requestAnimationFrame for 60fps
    const container = document.getElementById('bg-twinkle-container')
    if (!container) return

    const dots = []
    const NUM_DOTS = 35

    for (let i = 0; i < NUM_DOTS; i++) {
      const dot = document.createElement('div')
      dot.style.cssText = `
        position: absolute;
        width: 3px;
        height: 3px;
        border-radius: 50%;
        background: #48b0d6;
        top: ${Math.random() * 100}%;
        left: ${Math.random() * 100}%;
        pointer-events: none;
      `
      container.appendChild(dot)
      dots.push({
        el: dot,
        phase: Math.random() * Math.PI * 2,
        speed: 0.4 + Math.random() * 0.6,
      })
    }

    let animId
    let startTime = null

    function animate(timestamp) {
      if (!startTime) startTime = timestamp
      const elapsed = (timestamp - startTime) / 1000

      dots.forEach(d => {
        const v = Math.sin(d.phase + elapsed * d.speed)
        const opacity = 0.05 + (v + 1) / 2 * 0.95
        const scale = 0.5 + (v + 1) / 2 * 0.8
        d.el.style.opacity = opacity
        d.el.style.transform = `scale(${scale})`
        d.el.style.boxShadow = `0 0 ${8 * scale}px 1px rgba(72,176,214,${opacity * 0.5})`
      })
      animId = requestAnimationFrame(animate)
    }

    animId = requestAnimationFrame(animate)

    return () => {
      cancelAnimationFrame(animId)
      dots.forEach(d => d.el.remove())
    }
  }, [])

  return (
    <>
      {/* CSS Grid Pattern */}
      <div
        className="fixed inset-0 z-0 pointer-events-none overflow-hidden"
        style={{
          opacity: 0.03,
          backgroundImage:
            'linear-gradient(rgba(72,176,214,0.3) 1px,transparent 1px),linear-gradient(90deg,rgba(72,176,214,0.3) 1px,transparent 1px)',
          backgroundSize: '50px 50px',
        }}
      />
      {/* Twinkling Dots Container */}
      <div
        id="bg-twinkle-container"
        className="fixed inset-0 z-0 pointer-events-none overflow-hidden"
      />
    </>
  )
}
