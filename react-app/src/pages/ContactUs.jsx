import { useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { motion, useInView } from 'framer-motion'
import { MapPin, Clock, Phone, Mail, Send } from 'lucide-react'
import PageTransition from '../components/PageTransition'

function FadeUpBlur({ children, delay = 0, className = '' }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-40px 0px' })
  return (
    <motion.div
      ref={ref}
      className={className}
      initial={{ opacity: 0, y: 30, filter: 'blur(12px)' }}
      animate={inView ? { opacity: 1, y: 0, filter: 'blur(0px)' } : {}}
      transition={{ duration: 0.6, delay, ease: [0.25, 0.46, 0.45, 0.94] }}
    >
      {children}
    </motion.div>
  )
}

export default function ContactUs() {
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    setSubmitted(true)
    setTimeout(() => setSubmitted(false), 4000)
  }

  return (
    <PageTransition>
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-[#48b0d6] rounded-full filter blur-[128px] opacity-[0.08]" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-[#ea580c] rounded-full filter blur-[128px] opacity-[0.08]" />
      </div>

      <main className="relative z-10 flex-grow pt-32 pb-12 px-4 sm:px-6 lg:px-8 flex items-center justify-center min-h-screen">
        <div className="max-w-[85rem] w-full mx-auto">

          {/* Header */}
          <div className="text-center mb-16">
            <FadeUpBlur delay={0.1} className="inline-block">
              <span className="text-[#48b0d6] font-semibold tracking-wider text-sm uppercase">Support & Sales</span>
            </FadeUpBlur>
            <FadeUpBlur delay={0.3}>
              <h1 className="text-4xl md:text-6xl font-bold text-white mt-2 mb-4">Let's Connect</h1>
            </FadeUpBlur>
            <FadeUpBlur delay={0.5}>
              <p className="text-gray-400 max-w-xl mx-auto text-lg">We are here to help. Chat with us or call us</p>
            </FadeUpBlur>
          </div>

          <FadeUpBlur delay={0.7}>
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">

              {/* Left info */}
              <div className="hidden lg:flex lg:col-span-3 flex-col space-y-8 justify-center h-full">
                {[
                  { Icon: MapPin, title: 'Headquarters', info: 'Bengaluru, Karnataka, India' },
                  { Icon: Clock, title: 'Service Hours', info: 'Mon - Fri: 9am - 6pm\nSat: 10am - 2pm' },
                ].map(({ Icon, title, info }, i) => (
                  <div key={i} className="p-4 rounded-xl flex items-center justify-end gap-4 text-right border border-transparent hover:border-white/5 hover:bg-white/2 transition cursor-default">
                    <div>
                      <h2 className="text-white font-bold text-lg">{title}</h2>
                      <p className="text-gray-400 text-sm leading-relaxed whitespace-pre-line">{info}</p>
                    </div>
                    <div className="flex-shrink-0 w-12 h-12 rounded-full bg-[#48b0d6]/10 flex items-center justify-center text-[#48b0d6]">
                      <Icon className="w-5 h-5" />
                    </div>
                  </div>
                ))}
              </div>

              {/* Form */}
              <div className="lg:col-span-6 relative">
                <div className="absolute inset-0 bg-gradient-to-b from-[#48b0d6] to-[#ea580c] rounded-3xl blur-2xl opacity-15 -z-10 scale-95" />
                <div className="rounded-3xl p-8 md:p-10 relative z-10 glass-card-dark">
                  <h2 className="text-2xl font-bold text-white mb-8">Send a Message</h2>
                  <form onSubmit={handleSubmit} className="space-y-5">
                    <div className="grid grid-cols-2 gap-5">
                      <div className="space-y-1">
                        <label className="text-xs font-semibold text-gray-400 ml-1">NAME</label>
                        <input type="text" placeholder="Enter your name" required className="glass-input w-full rounded-xl px-4 py-3 focus:outline-none" />
                      </div>
                      <div className="space-y-1">
                        <label className="text-xs font-semibold text-gray-400 ml-1">PHONE</label>
                        <input type="tel" placeholder="+91..." className="glass-input w-full rounded-xl px-4 py-3 focus:outline-none" />
                      </div>
                    </div>
                    <div className="space-y-1">
                      <label className="text-xs font-semibold text-gray-400 ml-1">EMAIL</label>
                      <input type="email" placeholder="Enter your email id" required className="glass-input w-full rounded-xl px-4 py-3 focus:outline-none" />
                    </div>
                    <div className="space-y-1">
                      <label className="text-xs font-semibold text-gray-400 ml-1">MESSAGE</label>
                      <textarea rows="4" placeholder="Type your message..." required className="fire-input w-full rounded-xl px-4 py-3 focus:outline-none resize-none" />
                    </div>
                    <motion.button
                      type="submit"
                      className="w-full group bg-gradient-to-r from-[#ea580c] to-[#dc2626] text-white font-bold py-4 rounded-xl shadow-[0_10px_20px_rgba(234,88,12,0.2)] transition-all duration-300 flex items-center justify-center gap-2"
                      whileHover={{ y: -2 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      {submitted ? (
                        <span className="flex items-center gap-2">✓ Message Sent!</span>
                      ) : (
                        <>
                          <span>Send Message</span>
                          <motion.span whileHover={{ x: 4 }} transition={{ type: 'spring', stiffness: 400 }}>
                            <Send className="w-4 h-4" />
                          </motion.span>
                        </>
                      )}
                    </motion.button>
                  </form>
                </div>
              </div>

              {/* Right info */}
              <div className="hidden lg:flex lg:col-span-3 flex-col space-y-8 justify-center h-full">
                {[
                  { Icon: Phone, title: 'Phone', info: '+91 94962 45832\nMon-Fri 9am-6pm' },
                  { Icon: Mail, title: 'Email', info: 'contact@shughosha.com\nsupport@shughosha.com' },
                ].map(({ Icon, title, info }, i) => (
                  <div key={i} className="p-4 rounded-xl flex items-center justify-start gap-4 text-left border border-transparent hover:border-white/5 hover:bg-white/2 transition cursor-default">
                    <div className="flex-shrink-0 w-12 h-12 rounded-full bg-[#48b0d6]/10 flex items-center justify-center text-[#48b0d6]">
                      <Icon className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="text-white font-bold text-lg">{title}</h3>
                      <p className="text-gray-400 text-sm leading-relaxed whitespace-pre-line">{info}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </FadeUpBlur>
        </div>
      </main>
    </PageTransition>
  )
}
