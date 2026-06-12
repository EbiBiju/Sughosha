import { useRef, useState } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'

export default function MagneticButton({ children, className, onClick, type = "button" }) {
  const ref = useRef(null)
  
  // Motion values for the wrapper
  const xWrapper = useMotionValue(0)
  const yWrapper = useMotionValue(0)

  // Motion values for the inner text
  const xText = useMotionValue(0)
  const yText = useMotionValue(0)

  // Spring values for smooth transition
  const springConfig = { stiffness: 150, damping: 15, mass: 0.1 }
  const springXWrapper = useSpring(xWrapper, springConfig)
  const springYWrapper = useSpring(yWrapper, springConfig)
  
  const springXText = useSpring(xText, { ...springConfig, mass: 0.3 })
  const springYText = useSpring(yText, { ...springConfig, mass: 0.3 })

  const handleMouseMove = (e) => {
    const { clientX, clientY } = e
    const { height, width, left, top } = ref.current.getBoundingClientRect()
    
    // Calculate distance from center of the button
    const middleX = clientX - (left + width / 2)
    const middleY = clientY - (top + height / 2)
    
    // Apply a scaling factor to determine how strongly the button pulls
    xWrapper.set(middleX * 0.2)
    yWrapper.set(middleY * 0.2)

    // Make the text inside pull slightly more to create parallax depth
    xText.set(middleX * 0.1)
    yText.set(middleY * 0.1)
  }

  const handleMouseLeave = () => {
    // Reset back to center once interaction stops
    xWrapper.set(0)
    yWrapper.set(0)
    xText.set(0)
    yText.set(0)
  }

  return (
    <motion.button
      ref={ref}
      type={type}
      onClick={onClick}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={`relative inline-flex overflow-hidden transform-gpu ${className}`}
      style={{ x: springXWrapper, y: springYWrapper }}
    >
      <motion.span
        className="w-full h-full inline-flex relative z-10 pointer-events-none items-center justify-center gap-2"
        style={{ x: springXText, y: springYText }}
      >
        {children}
      </motion.span>
    </motion.button>
  )
}
