import { useState } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Twitter, Instagram, Linkedin, Facebook, MapPin, Phone, Mail, ArrowRight, CheckCircle2 } from 'lucide-react'

export default function Footer() {
  const [email, setEmail] = useState('')
  const [subscribed, setSubscribed] = useState(false)

  const handleSubscribe = (e) => {
    e.preventDefault()
    if (email) {
      setSubscribed(true)
      setTimeout(() => setSubscribed(false), 4000)
      setEmail('')
    }
  }

  const quickLinks = [
    { to: '/', label: 'Home' },
    { to: '/services', label: 'Services' },
    { to: '/careers', label: 'Careers' },
    { to: '/about', label: 'About Us' },
    { to: '/contact', label: 'Contact Help' }
  ]

  const legalLinks = [
    { to: '#', label: 'Privacy Policy' },
    { to: '#', label: 'Terms of Service' },
    { to: '#', label: 'Cookie Policy' }
  ]

  const socialIcons = [
    { Icon: Twitter, href: '#' },
    { Icon: Instagram, href: '#' },
    { Icon: Linkedin, href: '#' },
    { Icon: Facebook, href: '#' }
  ]

  return (
    <footer className="relative border-t border-white/5 bg-[#030305] pt-24 pb-12 overflow-hidden z-20">
      {/* Background Glows */}
      <div className="absolute bottom-[20%] left-[-10%] w-[500px] h-[500px] bg-[#48b0d6] rounded-full filter blur-[150px] opacity-[0.06] pointer-events-none" />
      <div className="absolute top-[10%] right-[-10%] w-[400px] h-[400px] bg-[#ea580c] rounded-full filter blur-[150px] opacity-[0.05] pointer-events-none" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 lg:gap-8 mb-16">
          
          {/* Brand & Socials (Col 1: takes up 4 columns on large screens) */}
          <div className="lg:col-span-4">
            <Link to="/" className="flex items-center gap-3 mb-6 inline-block">
              <span className="text-3xl font-bold text-white tracking-tight flex items-center gap-2">
                <img src="/log.png" alt="SughOsha Logo" className="h-10 w-auto" onError={(e) => e.target.style.display='none'} />
                Sugh<span className="text-gradient-cyan">Osha</span>
              </span>
            </Link>
            <p className="text-gray-400 text-sm leading-relaxed mb-8 pr-4">
              Providing world-class corporate training, digital strategy, and creative media production services for modern enterprises ready to evolve and lead their industries. 
            </p>
            <div className="flex items-center gap-4">
              {socialIcons.map(({ Icon, href }, i) => (
                <a key={i} href={href} className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-gray-400 hover:bg-[#48b0d6] hover:text-white transition-all duration-300 hover:scale-110 shadow-lg hover:shadow-[0_0_15px_rgba(72,176,214,0.4)]">
                  <Icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links (Col 2 & 3) */}
          <div className="lg:col-span-2">
            <h3 className="text-white font-bold mb-6 tracking-wide">Company</h3>
            <ul className="space-y-4">
              {quickLinks.map((link) => (
                <li key={link.to}>
                  <Link to={link.to} className="text-gray-400 hover:text-[#48b0d6] text-sm transition font-medium flex items-center gap-2 group">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#48b0d6] opacity-0 group-hover:opacity-100 transition-opacity" />
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-2">
            <h3 className="text-white font-bold mb-6 tracking-wide">Legal</h3>
            <ul className="space-y-4">
              {legalLinks.map((link) => (
                <li key={link.label}>
                  <a href={link.to} className="text-gray-400 hover:text-[#48b0d6] text-sm transition font-medium flex items-center gap-2 group">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#48b0d6] opacity-0 group-hover:opacity-100 transition-opacity" />
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter Subscribe */}
          <div className="lg:col-span-4">
            <h3 className="text-white font-bold mb-6 tracking-wide">Stay Updated</h3>
            <p className="text-gray-400 text-sm mb-6">
              Subscribe to our newsletter to receive the latest updates, news, and exclusive offers directly in your inbox.
            </p>
            <form onSubmit={handleSubscribe} className="relative">
              <input 
                type="email" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email address" 
                required 
                disabled={subscribed}
                className="w-full glass-input px-5 py-4 text-sm placeholder-gray-500 pr-32"
              />
              <button 
                type="submit" 
                disabled={subscribed}
                className={`absolute right-1.5 top-1.5 bottom-1.5 px-6 rounded-full text-sm font-bold flex items-center gap-2 transition-all ${
                  subscribed 
                    ? 'bg-green-500/20 text-green-400 border border-green-500/30' 
                    : 'bg-gradient-to-r from-[#ea580c] to-[#dc2626] text-white transition hover:scale-[1.02] shadow-[0_0_15px_rgba(234,88,12,0.3)]'
                }`}
              >
                {subscribed ? (
                  <>
                    <CheckCircle2 className="w-4 h-4" />
                    Subscribed
                  </>
                ) : (
                  <>
                    Subscribe
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </form>

            <div className="mt-8 space-y-3">
              <div className="flex items-start gap-3 text-sm text-gray-400 group">
                <MapPin className="w-5 h-5 text-gray-500 mt-0.5 group-hover:text-[#48b0d6] transition-colors flex-shrink-0" />
                <span>Bengaluru, Karnataka, India</span>
              </div>
              <div className="flex items-center gap-3 text-sm text-gray-400 group">
                <Mail className="w-4 h-4 text-gray-500 group-hover:text-[#48b0d6] transition-colors ml-0.5 flex-shrink-0" />
                <a href="mailto:contact@shughosha.com" className="hover:text-white transition">contact@shughosha.com</a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Banner */}
        <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-gray-500 text-sm">
            &copy; {new Date().getFullYear()} SughOsha Enterprises. All rights reserved.
          </p>
          <div className="flex items-center gap-2 text-sm text-gray-500">
            <span>Designed with</span>
            <span className="text-red-500 animate-pulse">❤</span>
            <span>by SughOsha</span>
          </div>
        </div>
      </div>
    </footer>
  )
}
