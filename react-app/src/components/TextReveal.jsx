import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'

export default function TextReveal({ text, className = "", delayAmount = 0.05, style = {} }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.2 })

  // Split into words so lines can break naturally
  // but we animate individual characters or words inside an overflow container
  const words = text.split(" ")

  const container = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { 
        delayChildren: 0.1,
        staggerChildren: delayAmount,
      }
    }
  }

  const child = {
    hidden: { 
      y: "150%", 
      rotate: 10,
      opacity: 0
    },
    visible: {
      y: "0%",
      rotate: 0,
      opacity: 1,
      transition: {
        type: "spring",
        damping: 15,
        stiffness: 100,
        mass: 0.8,
      }
    }
  }

  return (
    <motion.div
      ref={ref}
      style={style}
      className={`flex flex-wrap ${className}`}
      variants={container}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
    >
      {words.map((word, index) => (
        <span 
          key={index}
          className="overflow-hidden inline-flex mr-[0.25em]"
        >
          <motion.span variants={child} className="inline-block origin-bottom-left">
            {word}
          </motion.span>
        </span>
      ))}
    </motion.div>
  )
}
