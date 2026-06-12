import { useRef } from 'react'
import { Link } from 'react-router-dom'
import { motion, useInView, useScroll, useTransform } from 'framer-motion'
import { Target, Sparkles, Award, Coins, Rocket, ArrowRight } from 'lucide-react'
import PageTransition from '../components/PageTransition'
import TextReveal from '../components/TextReveal'
import MagneticButton from '../components/MagneticButton'

function ScrollReveal({ children, delay = 0, className = '' }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px 0px' })
  return (
    <motion.div
      ref={ref}
      className={className}
      initial={{ opacity: 0, y: 30, filter: 'blur(15px)', scale: 0.98 }}
      animate={inView ? { opacity: 1, y: 0, filter: 'blur(0px)', scale: 1 } : {}}
      transition={{ duration: 0.8, delay, ease: [0.23, 1, 0.32, 1] }}
    >
      {children}
    </motion.div>
  )
}

const uniqueCards = [
  { icon: Sparkles, title: 'Young & Creative Team', desc: 'We bring fresh perspectives, boundless energy, and a pulse on emerging trends to every project we touch.' },
  { icon: Award, title: 'Quality-Driven Output', desc: "Excellence isn't optional. We obsess over details to ensure the final deliverable exceeds expectations." },
  { icon: Coins, title: 'Affordable Pricing', desc: "Premium digital solutions shouldn't break the bank. We offer high-value services tailored to your budget." },
  { icon: Rocket, title: 'Modern Approach', desc: 'From linguistic training to digital strategy, we leverage the latest technology and methodologies.' },
]

export default function About() {
  const scrollRef = useRef(null)
  const { scrollYProgress } = useScroll({ target: scrollRef, offset: ["start start", "end start"] })
  
  // Parallax calculations
  const yParallaxSlow = useTransform(scrollYProgress, [0, 1], [0, 200])
  const yParallaxFast = useTransform(scrollYProgress, [0, 1], [0, 500])
  const rotateParallax = useTransform(scrollYProgress, [0, 1], [0, 180])

  return (
    <PageTransition>
      <div ref={scrollRef}>
      {/* Hero */}
      <section className="pt-40 pb-20 min-h-[85vh] flex items-center justify-center relative z-10 overflow-hidden">
        {/* Aurora blobs */}
        <motion.div
          className="absolute -top-[10%] -left-[10%] w-[50vw] h-[50vw] rounded-full pointer-events-none"
          style={{ background: '#48b0d6', filter: 'blur(80px)', opacity: 0.25 }}
          animate={{ x: ['0%', '10%', '0%'], y: ['0%', '10%', '0%'], scale: [1, 1.1, 1] }}
          transition={{ duration: 25, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.div
          className="absolute -bottom-[10%] -right-[10%] w-[60vw] h-[60vw] rounded-full pointer-events-none"
          style={{ background: '#dc2626', filter: 'blur(80px)', opacity: 0.2 }}
          animate={{ x: ['0%', '-10%', '0%'], y: ['0%', '-10%', '0%'], scale: [1.1, 1, 1.1] }}
          transition={{ duration: 30, repeat: Infinity, ease: 'easeInOut' }}
        />

        {/* Floating prism crystals with combined rotation and parallax */}
        <motion.div
          className="absolute w-[400px] h-[400px] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none"
          style={{
            clipPath: 'polygon(30% 0%, 70% 0%, 100% 30%, 100% 70%, 70% 100%, 30% 100%, 0% 70%, 0% 30%)',
            background: 'linear-gradient(135deg, rgba(255,255,255,0.03), rgba(255,255,255,0.01))',
            backdropFilter: 'blur(15px)',
            border: '1px solid rgba(255,255,255,0.12)',
            boxShadow: '-3px -3px 15px rgba(234,88,12,0.25), 3px 3px 15px rgba(220,38,38,0.25)',
            y: yParallaxFast,
            rotate: rotateParallax,
          }}
          animate={{ scale: [1, 1.05, 1] }}
          transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
        />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30, filter: 'blur(8px)', scale: 0.98 }}
            animate={{ opacity: 1, y: 0, filter: 'blur(0px)', scale: 1 }}
            transition={{ duration: 1.8, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
          >
            <span className="inline-block py-1 px-3 rounded-full bg-[#ea580c]/10 border border-[#ea580c]/20 text-[#ea580c] text-sm font-semibold uppercase tracking-wider mb-6">
              The SughOsha Story
            </span>
            <div className="text-5xl md:text-7xl font-extrabold text-white mb-8 leading-tight tracking-tight flex flex-col items-center justify-center">
              <TextReveal text="Crafting Digital Futures through" delayAmount={0.05} />
              <TextReveal text="Creative Innovation." className="text-transparent bg-clip-text bg-gradient-to-r from-[#ea580c] via-red-500 to-amber-300 mt-2" delayAmount={0.06} />
            </div>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto font-light leading-relaxed">
              We are a creative service-based company providing cutting-edge digital solutions for businesses and individuals ready to evolve.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Animated SVG Tree */}
      <div className="relative z-0 pointer-events-none overflow-hidden" style={{ height: 200, marginTop: -100 }}>
        <svg viewBox="0 0 1440 200" preserveAspectRatio="xMidYMid slice" width="100%" height="100%">
          <defs>
            <linearGradient id="tree-grad-about" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#48b0d6" stopOpacity="0.6" />
              <stop offset="50%" stopColor="#dc2626" stopOpacity="0.8" />
              <stop offset="100%" stopColor="#48b0d6" stopOpacity="1.0" />
            </linearGradient>
          </defs>
          <motion.g
            stroke="url(#tree-grad-about)" fill="none" strokeLinecap="round" strokeLinejoin="round"
            filter="drop-shadow(0 0 8px rgba(234,88,12,0.7)) drop-shadow(0 0 15px rgba(220,38,38,0.5))"
            animate={{ opacity: [0.5, 0.9, 0.5] }}
            transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
          >
            <path d="M720,10 L300,80 L720,150" strokeWidth="3" opacity="0.7" />
            <path d="M720,10 L1140,80 L720,150" strokeWidth="3" opacity="0.7" />
            <path d="M720,150 L720,200" strokeWidth="5" />
            <circle cx="720" cy="10" r="8" fill="#48b0d6" />
            <circle cx="720" cy="150" r="6" fill="#dc2626" />
          </motion.g>
        </svg>
      </div>

      {/* Mission */}
      <section className="py-20 relative z-10">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollReveal>
            <div className="glass-card-light rounded-[3rem] p-10 md:p-16 text-center relative overflow-hidden border-2 border-[#ea580c]/25">
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-1/2 h-1/2 bg-[#ea580c] rounded-full blur-[100px] opacity-10 pointer-events-none" />
              <div className="relative z-10 flex flex-col items-center">
                <motion.div
                  className="w-16 h-16 rounded-full bg-[#ea580c]/20 flex items-center justify-center text-[#ea580c] mb-6"
                  animate={{ boxShadow: ['0 0 20px rgba(234,88,12,0.2)', '0 0 40px rgba(234,88,12,0.5)', '0 0 20px rgba(234,88,12,0.2)'] }}
                  transition={{ duration: 3, repeat: Infinity }}
                >
                  <Target className="w-8 h-8" />
                </motion.div>
                <h2 className="text-3xl md:text-4xl font-bold text-white mb-6 tracking-wide">Our Mission</h2>
                <p className="text-2xl md:text-3xl text-gradient-orange font-semibold leading-relaxed max-w-3xl mx-auto">
                  "Helping businesses grow through digital creativity and smart solutions."
                </p>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* What Makes Us Unique */}
      <section className="py-24 relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollReveal className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">
              What Makes Us <span className="text-[#ea580c]">Unique</span>
            </h2>
            <p className="text-gray-400 text-lg">Driven by passion, defined by quality.</p>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-10">
            {uniqueCards.map(({ icon: Icon, title, desc }, i) => (
              <ScrollReveal key={i} delay={i * 0.1}>
                <motion.div
                  className="glass-card-dark p-8 rounded-[2rem] flex items-start gap-6 group cursor-default"
                  whileHover={{ borderColor: 'rgba(234,88,12,0.5)', y: -5, boxShadow: '0 20px 40px -10px rgba(0,0,0,0.9), inset 0 0 20px rgba(234,88,12,0.08)' }}
                  transition={{ duration: 0.3 }}
                >
                  <motion.div
                    className="flex-shrink-0 w-14 h-14 rounded-2xl bg-[#ea580c]/10 flex items-center justify-center text-[#ea580c]"
                    whileHover={{ scale: 1.15 }}
                    transition={{ duration: 0.3 }}
                  >
                    <Icon className="w-7 h-7" />
                  </motion.div>
                  <div>
                    <h3 className="text-xl font-bold text-white mb-3 group-hover:text-[#ea580c] transition-colors">{title}</h3>
                    <p className="text-gray-400 leading-relaxed">{desc}</p>
                  </div>
                </motion.div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-32 px-4 sm:px-6 lg:px-8 relative z-10">
        <ScrollReveal className="max-w-5xl mx-auto glass-card-dark rounded-[3rem] p-14 md:p-20 text-center relative overflow-hidden">
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full h-1/2 bg-gradient-to-t from-[#ea580c]/10 to-transparent blur-[80px] pointer-events-none" />
          <h2 className="text-4xl md:text-6xl font-extrabold text-white mb-8 leading-tight tracking-tight relative z-10">
            Ready to <span className="text-gradient-orange">Elevate Your Business?</span>
          </h2>
          <p className="text-xl text-gray-300 mb-12 max-w-3xl mx-auto font-light leading-relaxed relative z-10">
            Let's collaborate to bring your vision to life with creativity and smart solutions.
          </p>
          <div className="relative z-10 font-sans">
            <Link to="/contact">
              <MagneticButton className="inline-flex items-center justify-center gap-2 px-10 py-5 text-lg font-bold text-white bg-gradient-to-r from-[#ea580c] to-[#dc2626] rounded-full hover:scale-105 transition-all duration-300 shadow-[0_0_20px_rgba(234,88,12,0.4)]">
                <span className="relative z-10 flex items-center gap-2 w-full whitespace-nowrap">Let's Talk <ArrowRight className="w-6 h-6" /></span>
              </MagneticButton>
            </Link>
          </div>
        </ScrollReveal>
      </section>
      </div>
    </PageTransition>
  )
}
