import { useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { motion, useInView, AnimatePresence } from 'framer-motion'
import { Video, Camera, Film, Palette, Instagram, PenTool, Mic, Code2, X } from 'lucide-react'
import PageTransition from '../components/PageTransition'

const jobs = [
  { icon: Video, title: 'Freelance Videographers', type: 'Project Based', desc: 'We need cinematic storytellers who can capture high-quality footage for corporate events and creative ads. Must have own gear.', img: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?q=80&w=600&auto=format&fit=crop' },
  { icon: Camera, title: 'Cameramen', type: 'Freelance / Contract', desc: 'Looking for operators with experience in studio settings and live broadcasting. Precision and lighting knowledge required.', img: 'https://images.unsplash.com/photo-1601506521937-0121a7fc2a6b?q=80&w=600&auto=format&fit=crop' },
  { icon: Film, title: 'Video Editors', type: 'Remote Friendly', desc: 'Mastery of Premiere Pro and After Effects is a must. You will be turning raw footage into compelling social media reels.', img: 'https://images.pexels.com/photos/3062541/pexels-photo-3062541.jpeg?auto=compress&cs=tinysrgb&w=800' },
  { icon: Palette, title: 'Graphic Designers', type: 'Freelance', desc: 'Create stunning visuals for digital campaigns. Experience with Photoshop, Illustrator, and branding identity is key.', img: 'https://images.unsplash.com/photo-1626785774625-ddcddc3445e9?q=80&w=600&auto=format&fit=crop' },
  { icon: Instagram, title: 'Social Media Interns', type: 'Internship', desc: 'Live and breathe trends? Help us manage communities and create viral content strategies. Great learning opportunity.', img: 'https://images.unsplash.com/photo-1611926653458-09294b3142bf?q=80&w=600&auto=format&fit=crop' },
  { icon: PenTool, title: 'Content Writers', type: 'Freelance / Part-time', desc: 'We need wordsmiths for blog posts, website copy, and video scripts. SEO knowledge is a big plus.', img: 'https://images.unsplash.com/photo-1455390582262-044cdead277a?q=80&w=600&auto=format&fit=crop' },
  { icon: Mic, title: 'Voice Artists', type: 'Project Based', desc: 'Do you have a unique voice? We need VO talent for commercials and narrations. Please have a home studio setup.', img: 'https://images.unsplash.com/photo-1478737270239-2f02b77fc618?q=80&w=600&auto=format&fit=crop' },
  { icon: Code2, title: 'Website Developer', type: 'Freelance / Contract', desc: 'Full-stack or Front-end developers familiar with React, Tailwind, and modern web frameworks.', img: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?q=80&w=600&auto=format&fit=crop' },
]

function JobCard({ job, index, onOpen }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px 0px' })
  const Icon = job.icon

  return (
    <motion.div
      ref={ref}
      layoutId={`job-card-${index}`}
      className="glass-card-dark rounded-2xl p-6 flex flex-col items-center text-center group cursor-pointer relative"
      initial={{ opacity: 0, y: 32 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay: index * 0.08, ease: 'easeOut' }}
      whileHover={{ y: -5, borderColor: 'rgba(72,176,214,0.4)', boxShadow: '0 10px 30px -10px rgba(0,0,0,0.5)' }}
      onClick={() => onOpen(index)}
    >
      <motion.div
        className="w-14 h-14 rounded-full bg-[#48b0d6]/10 flex items-center justify-center text-[#48b0d6] mb-4"
        whileHover={{ scale: 1.1 }}
      >
        <Icon className="w-7 h-7" />
      </motion.div>
      <h3 className="text-lg font-bold text-white mb-1 group-hover:text-[#48b0d6] transition-colors">{job.title}</h3>
      <span className="text-sm text-gray-500 mb-4">{job.type}</span>
      <span className="mt-auto text-sm text-[#ea580c] opacity-60">Tap for details</span>
    </motion.div>
  )
}

export default function Careers() {
  const [selected, setSelected] = useState(null)

  const openCard = (index) => setSelected(index)
  const closeCard = () => setSelected(null)

  const job = selected !== null ? jobs[selected] : null
  const Icon = job ? job.icon : null

  return (
    <PageTransition>
      <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
        <div className="absolute -top-[10%] right-[20%] w-[40%] h-[40%] bg-[#48b0d6] rounded-full filter blur-[150px] opacity-[0.08]" />
        <div className="absolute bottom-[0%] left-[10%] w-[30%] h-[30%] bg-[#ea580c] rounded-full filter blur-[150px] opacity-[0.08]" />
      </div>

      {/* Hero */}
      <section className="pt-36 pb-12 relative z-10 px-4 sm:px-6 lg:px-8 text-center">
        <div className="max-w-4xl mx-auto">
          <span className="inline-block py-1 px-3 rounded-full bg-[#48b0d6]/10 border border-[#48b0d6]/20 text-[#48b0d6] text-sm font-semibold uppercase tracking-wider mb-6">
            Join Our Team
          </span>
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 tracking-tight">
            We Are Hiring{' '}
            <span className="text-gradient-cyan">Creators.</span>
          </h1>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto font-light leading-relaxed">
            Click on any role below to see the details and apply.
          </p>
        </div>
      </section>

      {/* Job Cards */}
      <section className="py-12 relative z-10 px-4 sm:px-6 lg:px-8 mb-20">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {jobs.map((job, i) => (
              <JobCard key={i} job={job} index={i} onOpen={openCard} />
            ))}
          </div>
        </div>
      </section>

      {/* Modal Overlay */}
      <AnimatePresence>
        {selected !== null && (
          <>
            <motion.div
              className="fixed inset-0 z-[100] bg-black/80 backdrop-blur-sm"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={closeCard}
            />
            <motion.div
              className="fixed z-[110] inset-0 flex items-center justify-center p-4 pointer-events-none"
            >
              <motion.div
                className="pointer-events-auto rounded-2xl overflow-hidden w-full max-w-sm"
                initial={{ opacity: 0, scale: 0.6, rotateY: -90, filter: 'blur(20px)' }}
                animate={{ opacity: 1, scale: 1, rotateY: 0, filter: 'blur(0px)' }}
                exit={{ opacity: 0, scale: 0.6, rotateY: 90, filter: 'blur(20px)' }}
                transition={{ duration: 0.65, ease: [0.175, 0.885, 0.32, 1.275] }}
                style={{ background: '#111', border: '1px solid rgba(72,176,214,0.3)', minHeight: 450 }}
              >
                {/* Image half */}
                <div className="h-52 relative overflow-hidden">
                  <img src={job.img} alt={job.title} className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 to-transparent" />
                  {/* Close btn */}
                  <button
                    onClick={closeCard}
                    className="absolute top-3 right-3 w-8 h-8 rounded-full bg-black/50 flex items-center justify-center text-white hover:bg-[#ea580c] transition z-10"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>

                {/* Content half */}
                <div className="p-6 flex flex-col h-auto" style={{ background: 'rgba(0,0,0,0.9)' }}>
                  <div className="flex items-center gap-3 mb-3">
                    {Icon && <div className="w-10 h-10 rounded-full bg-[#48b0d6]/15 flex items-center justify-center text-[#48b0d6]"><Icon className="w-5 h-5" /></div>}
                    <div>
                      <h3 className="text-lg font-bold text-[#48b0d6]">{job.title}</h3>
                      <p className="text-gray-400 text-xs">{job.type}</p>
                    </div>
                  </div>
                  <p className="text-gray-300 text-sm leading-relaxed mb-6">{job.desc}</p>
                  <div className="flex gap-3 mt-auto">
                    <button onClick={closeCard} className="flex-1 py-2 border border-gray-600 rounded-full text-sm hover:bg-white/10 transition text-white">Close</button>
                    <Link to="/careers/apply" className="flex-1 py-2 bg-gradient-to-r from-[#ea580c] to-[#dc2626] shadow-[0_0_15px_rgba(234,88,12,0.3)] rounded-full text-center text-sm font-semibold hover:scale-105 transition-all text-white">Apply</Link>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </PageTransition>
  )
}
