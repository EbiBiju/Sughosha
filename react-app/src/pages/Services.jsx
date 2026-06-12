import { useState, useRef } from 'react'
import { motion, useInView, useAnimation } from 'framer-motion'
import { Monitor, BookOpen, Film, Video, Megaphone, Paintbrush, ArrowRight } from 'lucide-react'
import PageTransition from '../components/PageTransition'
import TextReveal from '../components/TextReveal'
import MagneticButton from '../components/MagneticButton'
import { Link } from 'react-router-dom'

const services = [
  {
    icon: BookOpen,
    title: 'Corporate Language Training',
    desc: 'Specialized programs like Kannada for MNCs to eliminate communication friction, bridge cultures, and build stronger, cohesive teams.',
    img: 'https://images.unsplash.com/photo-1577563908411-50cb98946ea1?auto=format&fit=crop&q=80&w=800',
    cta: 'Enquire Now',
  },
  {
    icon: Monitor,
    title: 'Website Development',
    desc: 'Responsive, fast, and modern websites. We build digital experiences that convert visitors into customers using the latest tech stacks.',
    img: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&q=80&w=800',
    cta: 'Start Build',
  },
  {
    icon: Megaphone,
    title: 'Social Media Management',
    desc: 'Grow your audience organically. We handle strategy, posting, engagement, and analytics across all major platforms.',
    img: 'https://images.unsplash.com/photo-1611162616305-c69b3fa7fbe0?auto=format&fit=crop&q=80&w=800',
    cta: 'Boost Brand',
  },
  {
    icon: Video,
    title: 'Cinematic Video Production',
    desc: 'From concept to final cut. Corporate explainers, promotional videos, and high-end visual storytelling.',
    img: 'https://images.unsplash.com/photo-1601506521937-0121a7fc2a6b?auto=format&fit=crop&q=80&w=800',
    cta: 'Create Video',
  },
  {
    icon: Film,
    title: 'Professional Voiceovers',
    desc: 'Crisp, clear, and impactful voiceovers for commercials, e-learning, narration, and audiobooks in multiple languages.',
    img: 'https://images.unsplash.com/photo-1590602847861-f357a9332bbc?auto=format&fit=crop&q=80&w=800',
    cta: 'Listen Demos',
  },
  {
    icon: Paintbrush,
    title: 'Creative Content',
    desc: 'Engaging blogs, stunning posters, and click-worthy thumbnails. We create content that captures attention and retains it.',
    img: 'https://images.unsplash.com/photo-1542744173-8e7e53415bb0?auto=format&fit=crop&q=80&w=800',
    cta: 'View Portfolio',
  },
]

function ServiceCard({ icon: Icon, title, desc, img, cta, index, hoveredIndex, setHoveredIndex }) {
  const isHovered = hoveredIndex === index
  const isDimmed = hoveredIndex !== null && hoveredIndex !== index

  return (
    <motion.div
      className="relative rounded-3xl overflow-hidden glass-card-dark flex flex-col h-[450px]"
      onMouseEnter={() => setHoveredIndex(index)}
      onMouseLeave={() => setHoveredIndex(null)}
      animate={{ opacity: isDimmed ? 0.4 : 1, scale: isHovered ? 1.02 : isDimmed ? 0.98 : 1 }}
      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
    >
      <div className="h-48 relative overflow-hidden flex-shrink-0">
        <motion.img
          src={img} alt={title}
          className="w-full h-full object-cover"
          animate={{ scale: isHovered ? 1.1 : 1 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-transparent to-transparent opacity-90" />
        <div className="absolute top-4 left-4 p-3 rounded-2xl bg-[#0a0a0a]/50 backdrop-blur-md border border-white/10 text-white shadow-xl">
          <Icon className="w-6 h-6" />
        </div>
      </div>
      
      <div className="p-6 flex flex-col flex-grow relative z-20 -mt-10">
        <h3 className="text-xl font-bold text-white mb-3 group-hover:text-[#ea580c] transition-colors">{title}</h3>
        <p className="text-gray-400 text-sm leading-relaxed mb-6 flex-grow">{desc}</p>
        <Link to="/contact" className="font-sans">
          <MagneticButton className="inline-flex items-center justify-center gap-2 px-8 py-3 text-sm font-bold text-white bg-gradient-to-r from-[#ea580c] to-[#dc2626] rounded-full hover:scale-105 transition-all duration-300 shadow-[0_0_20px_rgba(234,88,12,0.4)]">
            <span className="relative z-10 flex items-center gap-2 w-full whitespace-nowrap">{cta} <ArrowRight className="w-4 h-4" /></span>
          </MagneticButton>
        </Link>
      </div>
    </motion.div>
  )
}

export default function Services() {
  const [hoveredIndex, setHoveredIndex] = useState(null)
  
  return (
    <PageTransition>
      {/* Background Effect */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        <div className="absolute top-[20%] right-[10%] w-[500px] h-[500px] bg-[#48b0d6] rounded-full filter blur-[150px] opacity-[0.08]" />
        <div className="absolute bottom-[10%] left-[5%] w-[400px] h-[400px] bg-[#ea580c] rounded-full filter blur-[150px] opacity-[0.08]" />
      </div>

      <section className="pt-40 pb-20 relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30, filter: 'blur(8px)' }}
            animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            transition={{ duration: 1.2, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
          >
            <span className="inline-block py-1 px-3 rounded-full bg-[#48b0d6]/10 border border-[#48b0d6]/20 text-[#48b0d6] text-sm font-semibold uppercase tracking-wider mb-6">
              Our Expertise
            </span>
            <div className="text-5xl md:text-7xl font-extrabold text-white mb-8 leading-tight tracking-tight flex flex-col items-center justify-center">
              <TextReveal text="Solutions that scale," delayAmount={0.06} />
              <TextReveal text="Designs that deliver." className="text-gradient-cyan mt-2" delayAmount={0.07} />
            </div>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto font-light leading-relaxed">
              From corporate training to digital excellence, we provide a holistic suite of services designed to elevate your brand and empower your workforce.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Grid */}
      <section className="pb-32 px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((svc, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.8, delay: i * 0.1 }}
            >
              <ServiceCard 
                {...svc} 
                index={i}
                hoveredIndex={hoveredIndex}
                setHoveredIndex={setHoveredIndex}
              />
            </motion.div>
          ))}
        </div>
      </section>
    </PageTransition>
  )
}
