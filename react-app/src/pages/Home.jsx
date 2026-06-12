import { useEffect, useState, useRef } from 'react'
import { Link } from 'react-router-dom'
import { motion, useInView, useAnimation, AnimatePresence } from 'framer-motion'
import { BookOpen, Cpu, PlayCircle, Check, MousePointerClick, ArrowRight } from 'lucide-react'
import PageTransition from '../components/PageTransition'
import TextReveal from '../components/TextReveal'
import MagneticButton from '../components/MagneticButton'

/* ── Reusable scroll-reveal wrapper ─────────────────────────────────── */
function ScrollReveal({ children, delay = 0, className = '' }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px 0px' })
  return (
    <motion.div
      ref={ref}
      className={className}
      initial={{ opacity: 0, y: 50, filter: 'blur(15px)', scale: 0.96 }}
      animate={inView ? { opacity: 1, y: 0, filter: 'blur(0px)', scale: 1 } : {}}
      transition={{ duration: 1, delay, ease: [0.23, 1, 0.32, 1] }}
    >
      {children}
    </motion.div>
  )
}

/* ── Ambient liquid blob ─────────────────────────────────────────────── */
function AmbientBlob({ color, delay = 0, duration = 20, style = {} }) {
  return (
    <motion.div
      className="absolute pointer-events-none"
      style={{
        background: color,
        filter: 'blur(50px)',
        mixBlendMode: 'screen',
        ...style,
      }}
      animate={{
        borderRadius: [
          '40% 60% 70% 30% / 40% 50% 60% 50%',
          '50% 50% 40% 60% / 50% 40% 60% 50%',
          '40% 60% 70% 30% / 40% 50% 60% 50%',
        ],
        rotate: [0, 180, 360],
        scale: [1, 1.1, 1],
      }}
      transition={{ duration, repeat: Infinity, ease: 'easeInOut', delay }}
    />
  )
}

/* ── 3D Flip Card ────────────────────────────────────────────────────── */
function FlipCard({ icon: Icon, title, subtitle, backTitle, backDesc, bullets, cta, ctaHref }) {
  const [flipped, setFlipped] = useState(false)
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px 0px' })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50, filter: 'blur(15px)' }}
      animate={inView ? { opacity: 1, y: 0, filter: 'blur(0px)' } : {}}
      transition={{ duration: 1, ease: [0.23, 1, 0.32, 1] }}
      className="book-container h-[420px]"
      onMouseEnter={() => setFlipped(true)}
      onMouseLeave={() => setFlipped(false)}
      whileHover={{ scale: 1.05 }}
    >
      <motion.div
        className="book-inner w-full h-full"
        animate={{ rotateY: flipped ? -180 : 0 }}
        transition={{ duration: 0.8, ease: [0.175, 0.885, 0.32, 1.275] }}
      >
        {/* Front */}
        <div className="book-face book-front glass-card-dark rounded-[2rem]">
          <motion.div
            className="w-20 h-20 mx-auto rounded-2xl bg-[#48b0d6]/10 flex items-center justify-center text-[#48b0d6] mb-8"
            animate={{ boxShadow: ['0 0 20px rgba(72,176,214,0.2)', '0 0 35px rgba(72,176,214,0.5)', '0 0 20px rgba(72,176,214,0.2)'] }}
            transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
          >
            <Icon className="w-10 h-10" />
          </motion.div>
          <h3 className="text-2xl font-bold text-white mb-4">{title}</h3>
          <p className="text-gray-400 leading-relaxed text-center">{subtitle}</p>
          <span className="text-[#48b0d6] text-sm mt-6 opacity-60">Hover to unfold details →</span>
        </div>

        {/* Back */}
        <div className="book-face book-back" style={{
          background: 'radial-gradient(ellipse at center, rgba(10,15,30,0.98) 0%, rgba(5,5,10,0.98) 100%)',
          border: '1px solid rgba(72,176,214,0.3)',
          borderRadius: '2rem',
          padding: '2.5rem',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'flex-start',
        }}>
          <h3 className="text-xl font-bold text-[#48b0d6] mb-4">{backTitle}</h3>
          <p className="text-gray-300 text-sm leading-relaxed text-left mb-4">{backDesc}</p>
          <ul className="text-gray-400 text-sm text-left w-full space-y-2 mb-6">
            {bullets.map((b, i) => <li key={i}>• {b}</li>)}
          </ul>
          <Link to={ctaHref} className="py-2 px-6 bg-[#48b0d6]/20 hover:bg-[#48b0d6]/40 text-white text-sm rounded-full transition">
            {cta}
          </Link>
        </div>
      </motion.div>
    </motion.div>
  )
}

/* ── Main Home Page ──────────────────────────────────────────────────── */
export default function Home() {
  const [heroReady, setHeroReady] = useState(false)
  const [whyHovered, setWhyHovered] = useState(false)

  // 3D Tilt for Hero Image
  const heroRef = useRef(null)
  const [tilt, setTilt] = useState({ x: 0, y: 0 })
  
  const handleHeroMouseMove = (e) => {
    if (!heroRef.current) return
    const rect = heroRef.current.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    const centerX = rect.width / 2
    const centerY = rect.height / 2
    const rotateX = ((centerY - y) / centerY) * 15 // Max 15 deg
    const rotateY = ((x - centerX) / centerX) * 15 // Max 15 deg
    setTilt({ x: rotateX, y: rotateY })
  }
  
  const handleHeroMouseLeave = () => setTilt({ x: 0, y: 0 })

  useEffect(() => {
    const t = setTimeout(() => setHeroReady(true), 100)
    return () => clearTimeout(t)
  }, [])

  const cards = [
    {
      icon: BookOpen, title: 'Linguistic Mastery',
      subtitle: 'Specialized programs like Kannada Training for MNCs to eliminate communication friction.',
      backTitle: 'Closing Communication Gaps',
      backDesc: 'We go beyond basic vocabulary. Our corporate training modules are designed to bridge cultural and linguistic divides in multinational environments.',
      bullets: ['Tailored Kannada & regional language courses.', 'Industry-specific terminology workshops.', 'Enhancing inter-team collaboration.'],
      cta: 'View Service Plans', ctaHref: '/services',
    },
    {
      icon: Cpu, title: 'Digital Strategy',
      subtitle: 'High-impact website development, UI/UX design, and content architecture.',
      backTitle: 'Future-Proofing Your Presence',
      backDesc: 'We build digital experiences that convert. From modern tech stacks to intuitive user journeys, we handle the full lifecycle.',
      bullets: ['Modern Tech Stacks (React, Next.js).', 'User-Centric UI/UX Design.', 'SEO & Content Strategy.'],
      cta: 'See Our Work', ctaHref: '/services',
    },
    {
      icon: PlayCircle, title: 'Media Production',
      subtitle: 'Cinematic video production, post-processing, and professional voiceover services.',
      backTitle: 'Join Our Creative Team',
      backDesc: 'We are always looking for top-tier talent to help us tell compelling stories. Are you a creator?',
      bullets: ['Hiring: Cinematographers & Editors.', 'Hiring: Voiceover Artists.', 'Hiring: Motion Graphics Designers.'],
      cta: 'Apply Now', ctaHref: '/careers',
    },
  ]

  return (
    <PageTransition>
      {/* ── Hero Section ── */}
      <section className="pt-32 pb-20 md:pt-44 md:pb-32 min-h-screen flex items-center relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div className="flex flex-col md:flex-row items-center justify-between gap-16 relative">

            {/* Text */}
            <motion.div
              className="w-full md:w-1/2 text-center md:text-left z-20"
              initial={{ opacity: 0, y: 40 }}
              animate={heroReady ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 1, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
            >
              <span className="inline-block py-1 px-3 rounded-full bg-[#48b0d6]/10 border border-[#48b0d6]/20 text-[#48b0d6] text-xs font-semibold uppercase tracking-wider mb-6">
                Corporate Solutions
              </span>
              <div className="text-5xl md:text-7xl font-bold text-white leading-tight mb-6">
                <TextReveal text="Empower" delayAmount={0.08} />
                <br />
                <TextReveal text="Your Growth." className="text-transparent bg-clip-text bg-gradient-to-r from-[#48b0d6] to-cyan-200" delayAmount={0.08} />
              </div>
              <p className="text-lg text-gray-400 leading-relaxed font-light max-w-lg mx-auto md:mx-0">
                Bridging language barriers and digital gaps. We provide world-class training and creative strategies for the modern enterprise.
              </p>
              <div className="mt-10 flex flex-col sm:flex-row gap-6 justify-center md:justify-start items-center font-sans">
                <Link to="/contact">
                  <MagneticButton className="inline-flex items-center justify-center gap-2 px-10 py-5 text-lg font-bold text-white bg-gradient-to-r from-[#ea580c] to-[#dc2626] rounded-full hover:scale-105 transition-all duration-300 shadow-[0_0_30px_rgba(234,88,12,0.4)]">
                    <span className="relative z-10 flex items-center gap-2 w-full whitespace-nowrap">Get Started</span>
                  </MagneticButton>
                </Link>
                <Link to="/services">
                  <MagneticButton className="inline-flex items-center justify-center gap-2 px-10 py-5 text-lg font-bold text-white bg-transparent border border-white/20 rounded-full hover:bg-white/5 transition-all duration-300">
                    <span className="relative z-10 flex items-center gap-2 w-full whitespace-nowrap">Explore Services</span>
                  </MagneticButton>
                </Link>
              </div>
            </motion.div>

            {/* Hero Image */}
            <motion.div
              ref={heroRef}
              onMouseMove={handleHeroMouseMove}
              onMouseLeave={handleHeroMouseLeave}
              className="w-full md:w-1/2 relative z-10"
              initial={{ opacity: 0, scale: 1.15, filter: 'blur(20px)', rotateX: 5, rotateY: -5 }}
              animate={heroReady ? { opacity: 1, scale: 1, filter: 'blur(0px)', rotateX: tilt.x, rotateY: tilt.y } : {}}
              transition={{ 
                duration: tilt.x || tilt.y ? 0.2 : 1.4, // Fast follow on track, slow entry on load
                ease: tilt.x || tilt.y ? 'linear' : [0.22, 1, 0.36, 1]
              }}
              style={{ perspective: 1000 }}
            >
              <div className="relative w-full">
                {/* Ambient blobs - Fixed performance by dropping backdrop-filter */}
                <AmbientBlob
                  color="linear-gradient(to right, #48b0d6, #3b82f6)"
                  style={{ top: '-10%', left: '-10%', width: '120%', height: '120%', opacity: 0.15 }}
                  duration={20} delay={0}
                />
                <AmbientBlob
                  color="linear-gradient(to right, #ea580c, #dc2626)"
                  style={{ top: '-5%', left: '5%', width: '110%', height: '110%', opacity: 0.12 }}
                  duration={15} delay={2}
                />
                <div className="absolute inset-0 bg-[#48b0d6] opacity-15 blur-[80px] -z-10 rounded-full" />
                <img
                  src="/hero-image.png"
                  alt="Training Session"
                  className="relative rounded-2xl border border-white/10 shadow-2xl w-full h-auto object-cover z-10"
                />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── Offerings Section ── */}
      <section className="py-24 relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollReveal className="text-center mb-20">
            <h2 className="text-3xl md:text-5xl font-bold text-white">
              Our Core <span className="text-gradient-cyan">Offerings</span>
            </h2>
            <p className="text-gray-400 mt-6 text-lg max-w-2xl mx-auto">
              Hover over a card to unfold the details of how we elevate your business infrastructure.
            </p>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {cards.map((card, i) => (
              <FlipCard key={i} {...card} />
            ))}
          </div>
        </div>
      </section>

      {/* ── Why Us Section ── */}
      <section className="py-32 relative z-10">
        <div className="absolute top-1/2 left-0 w-[40%] h-[60%] bg-[#48b0d6] rounded-full filter blur-[150px] opacity-[0.08] pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center gap-16 lg:gap-32">
          {/* Left text */}
          <div className="w-full md:w-1/2">
            <ScrollReveal>
              <h2 className="text-3xl md:text-5xl font-bold text-white mb-8 leading-tight">
                <TextReveal text="Bridging Gaps," delayAmount={0.06} />
                <br />
                <TextReveal text="Driving Velocity." className="text-transparent bg-clip-text bg-gradient-to-r from-[#48b0d6] to-cyan-200" delayAmount={0.06} />
              </h2>
              <p className="text-xl text-gray-300 leading-relaxed mb-12">
                We partner with you to decode unique challenges and deliver tailored solutions that create measurable impact.
              </p>
            </ScrollReveal>
            <ul className="space-y-8">
              {[
                'Deep expertise in MNC requirements.',
                'Holistic intersection of training & creative.',
                'Agile, streamlined, results-oriented process.',
              ].map((item, i) => (
                <ScrollReveal key={i} delay={i * 0.15}>
                  <li className="flex items-start">
                    <motion.div
                      className="p-1 rounded-full bg-[#48b0d6]/20 mr-5 mt-1"
                      animate={{ boxShadow: ['0 0 20px rgba(72,176,214,0.2)', '0 0 35px rgba(72,176,214,0.5)', '0 0 20px rgba(72,176,214,0.2)'] }}
                      transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut', delay: i * 0.5 }}
                    >
                      <Check className="w-6 h-6 text-[#48b0d6]" />
                    </motion.div>
                    <span className="text-white text-xl font-medium">{item}</span>
                  </li>
                </ScrollReveal>
              ))}
            </ul>
          </div>

          {/* Right image with hover 3D effect */}
          <ScrollReveal className="w-full md:w-1/2 flex flex-col" delay={0.3}>
            <div className="self-start inline-flex items-center gap-2 py-2 px-4 mb-4 bg-[#ea580c]/10 border border-[#ea580c]/30 rounded-full text-[#ea580c] text-sm font-semibold">
              <MousePointerClick className="w-4 h-4" />
              <span>Hover to see why choose us</span>
            </div>

            <motion.div
              className="relative rounded-[2rem] overflow-hidden"
              style={{ perspective: 1000 }}
              onMouseEnter={() => setWhyHovered(true)}
              onMouseLeave={() => setWhyHovered(false)}
              animate={whyHovered ? {
                scale: 1.08,
                rotateX: 5,
                rotateY: -5,
                boxShadow: '0 40px 80px -30px rgba(0,0,0,1)',
              } : {
                scale: 1, rotateX: 0, rotateY: 0,
                boxShadow: '0 10px 30px rgba(0,0,0,0.5)',
              }}
              transition={{ duration: 0.5, ease: [0.34, 1.56, 0.64, 1] }}
            >
              <div className="absolute inset-0 bg-gradient-to-tr from-[#ea580c] to-red-600 rounded-[2rem] blur-3xl opacity-20 -z-10 transform translate-y-10" />
              <img
                src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&q=80&w=800"
                alt="Team Collaboration"
                className="rounded-[2rem] border-2 border-white/10 shadow-2xl w-full h-auto object-cover"
                style={{ filter: whyHovered ? 'grayscale(0%) brightness(1)' : 'grayscale(100%) brightness(0.8)', transition: 'filter 0.5s ease' }}
              />
              <motion.div
                className="absolute inset-0 flex items-end p-10 rounded-[2rem]"
                style={{ background: 'linear-gradient(to top, rgba(0,0,0,1) 10%, transparent 100%)' }}
                animate={{ opacity: whyHovered ? 1 : 0, y: whyHovered ? 0 : 20 }}
                transition={{ duration: 0.4, ease: [0.23, 1, 0.32, 1] }}
              >
                <h3 className="text-2xl md:text-3xl font-bold text-white leading-tight">
                  If you choose us, we will make your{' '}
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#ea580c] to-amber-200">
                    future brighter.
                  </span>
                </h3>
              </motion.div>
            </motion.div>
          </ScrollReveal>
        </div>
      </section>

      {/* ── CTA Section ── */}
      <section className="py-40 relative z-10 px-4 sm:px-6 lg:px-8">
        <ScrollReveal className="max-w-5xl mx-auto glass-card-dark rounded-[3rem] p-14 md:p-24 text-center relative overflow-hidden">
          {/* Liquid blob in CTA */}
          <AmbientBlob
            color="linear-gradient(to right, #48b0d6, #80e5ff)"
            style={{ top: '-20%', left: '-10%', width: '120%', height: '140%', opacity: 0.08 }}
            duration={25}
          />
          <h2 className="text-4xl md:text-7xl font-extrabold text-white mb-8 leading-tight tracking-tight relative z-10">
            <span className="text-gradient-cyan">
              Ready to Transform?
            </span>
          </h2>
          <p className="text-2xl text-gray-300 mb-14 max-w-3xl mx-auto font-light leading-relaxed relative z-10">
            Let's discuss how our solutions can empower your growth and help you achieve your goals.
          </p>
          <div className="relative z-10 flex justify-center font-sans">
            <Link to="/contact">
              <MagneticButton className="inline-flex items-center justify-center gap-2 px-10 py-5 text-lg font-bold text-white bg-gradient-to-r from-[#ea580c] to-[#dc2626] rounded-full hover:scale-105 transition-all duration-300 shadow-[0_0_30px_rgba(234,88,12,0.4)]">
                <span className="relative z-10 flex items-center gap-2 w-full whitespace-nowrap">Get Started Now <ArrowRight className="w-6 h-6 ml-2" /></span>
              </MagneticButton>
            </Link>
          </div>
        </ScrollReveal>
      </section>
    </PageTransition>
  )
}
