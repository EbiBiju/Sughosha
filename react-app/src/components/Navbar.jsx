import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X } from 'lucide-react'

const navLinks = [
  { to: '/', label: 'Home' },
  { to: '/services', label: 'Services' },
  { to: '/careers', label: 'Careers / Hiring' },
  { to: '/about', label: 'About Us' },
]

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false)
  const [visible, setVisible] = useState(false)
  const location = useLocation()

  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 100)
    return () => clearTimeout(t)
  }, [])

  // Close mobile menu on route change
  useEffect(() => { setMobileOpen(false) }, [location.pathname])

  const ctaHref = location.pathname === '/careers' ? '/careers' : '/contact'
  const ctaLabel = location.pathname === '/careers' ? 'Apply Now' : 'Get Started'

  return (
    <motion.nav
      className="fixed w-full z-50 top-0 left-0 bg-gradient-to-b from-[#020202] to-transparent pointer-events-none"
      initial={{ y: -80, opacity: 0 }}
      animate={visible ? { y: 0, opacity: 1 } : { y: -80, opacity: 0 }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pointer-events-auto">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-0 flex-shrink-0">
            <img src="/log.png" alt="SughOsha Logo" className="h-12 w-auto object-contain mr-2"
              onError={e => (e.target.style.display = 'none')} />
            <span className="text-2xl font-bold text-white tracking-tight">
              Sugh<span className="text-[#ea580c]">Osha</span>
            </span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center space-x-10">
            <div className="flex space-x-8">
              {navLinks.map(link => {
                const active = location.pathname === link.to
                return (
                  <Link
                    key={link.to}
                    to={link.to}
                    className={`font-medium transition text-sm tracking-wide relative ${active ? 'text-white' : 'text-gray-300 hover:text-[#ea580c]'}`}
                  >
                    {link.label}
                    {active && (
                      <motion.span
                        layoutId="nav-active"
                        className="absolute -bottom-1 left-0 right-0 h-0.5 bg-[#ea580c]"
                        transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                      />
                    )}
                  </Link>
                )
              })}
            </div>
            <div className="flex items-center space-x-6 pl-2">
              <Link to="/login" className="text-white hover:text-gray-300 font-bold text-lg transition">
                Log in
              </Link>
              <Link
                to={ctaHref}
                className="bg-gradient-to-r from-[#ea580c] to-[#dc2626] text-white px-6 py-2.5 rounded-full font-medium shadow-[0_0_20px_rgba(234,88,12,0.4)] transition-all duration-300 hover:scale-105 hover:shadow-[0_0_30px_rgba(220,38,38,0.6)] active:scale-95"
              >
                {ctaLabel}
              </Link>
            </div>
          </div>

          {/* Mobile Toggle */}
          <button
            className="md:hidden text-gray-300 hover:text-white focus:outline-none"
            onClick={() => setMobileOpen(v => !v)}
          >
            {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            className="md:hidden bg-[#020202] absolute w-full left-0 pointer-events-auto"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
          >
            <div className="px-4 pt-2 pb-6 space-y-2">
              {navLinks.map(link => (
                <Link
                  key={link.to}
                  to={link.to}
                  className={`block px-3 py-2 rounded-md text-sm font-medium transition ${
                    location.pathname === link.to
                      ? 'text-white bg-white/10'
                      : 'text-gray-300 hover:text-white hover:bg-white/5'
                  }`}
                >
                  {link.label}
                </Link>
              ))}
              <div className="pt-4 mt-2 flex flex-col gap-3">
                <Link to="/login" className="block text-center text-gray-300 hover:text-white font-bold text-lg">
                  Log in
                </Link>
                <Link to={ctaHref} className="block text-center bg-[#ea580c] text-white py-2 rounded-full font-medium shadow-[0_0_15px_rgba(234,88,12,0.5)]">
                  {ctaLabel}
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  )
}
