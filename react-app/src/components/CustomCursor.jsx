import { useEffect, useState } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'

export default function CustomCursor() {
  const [isTouchDevice, setIsTouchDevice] = useState(true)
  const [isHovering, setIsHovering] = useState(false)

  // Motion values to track actual mouse pos
  const mouseX = useMotionValue(-100)
  const mouseY = useMotionValue(-100)

  // Spring values for smooth trailing effect
  const springX = useSpring(mouseX, { stiffness: 400, damping: 28, mass: 0.5 })
  const springY = useSpring(mouseY, { stiffness: 400, damping: 28, mass: 0.5 })

  useEffect(() => {
    // Check if it's a touch device; if so, never show the custom cursor
    if (window.matchMedia('(pointer: fine)').matches) {
      setIsTouchDevice(false)
    }

    const handleMouseMove = (e) => {
      mouseX.set(e.clientX)
      mouseY.set(e.clientX < 0 ? -100 : e.clientY) // quick hide if offscreen
    }

    const handleMouseOver = (e) => {
      // Check if we are hovering over an interactive element
      if (
        e.target.tagName.toLowerCase() === 'a' ||
        e.target.tagName.toLowerCase() === 'button' ||
        e.target.closest('a') ||
        e.target.closest('button')
      ) {
        setIsHovering(true)
      } else {
        setIsHovering(false)
      }
    }

    window.addEventListener('mousemove', handleMouseMove)
    window.addEventListener('mouseover', handleMouseOver)

    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('mouseover', handleMouseOver)
    }
  }, [mouseX, mouseY])

  if (isTouchDevice) return null

  return (
    <motion.div
      className="fixed top-0 left-0 w-8 h-8 rounded-full border border-[#48b0d6] pointer-events-none z-[9999] flex items-center justify-center mix-blend-exclusion"
      style={{
        x: springX,
        y: springY,
        translateX: '-50%',
        translateY: '-50%',
      }}
      animate={{
        scale: isHovering ? 2 : 1,
        backgroundColor: isHovering ? 'rgba(72,176,214,1)' : 'rgba(72,176,214,0)',
        borderWidth: isHovering ? '0px' : '2px',
      }}
      transition={{ duration: 0.2, ease: 'easeOut' }}
    />
  )
}
