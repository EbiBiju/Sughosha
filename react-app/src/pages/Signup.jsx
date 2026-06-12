import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Eye, EyeOff, ArrowLeft } from 'lucide-react'

// Floating particle component
function FloatingParticle({ x, color, delay, duration, size }) {
  return (
    <motion.div
      className="absolute rounded-full pointer-events-none"
      style={{ left: `${x}%`, bottom: '-10%', width: size, height: size, background: color, filter: 'blur(1px)' }}
      animate={{ y: [0, '-120vh'], x: [0, 20], opacity: [0, 0.6, 0.6, 0] }}
      transition={{ duration, delay, repeat: Infinity, ease: 'linear', times: [0, 0.1, 0.9, 1] }}
    />
  )
}

export default function Signup() {
  const [showPass, setShowPass] = useState(false)
  const [warpActive, setWarpActive] = useState(true)
  const navigate = useNavigate()

  useEffect(() => {
    const t = setTimeout(() => setWarpActive(false), 5000)
    return () => clearTimeout(t)
  }, [])

  const handleSubmit = async (e) => {
    e.preventDefault()
    const name = e.target.fullname.value
    const email = e.target.email.value
    const password = e.target.password.value
    try {
      const res = await fetch('http://localhost:5000/api/auth/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, password }),
      })
      const data = await res.json()
      if (res.ok) { navigate('/login') } else { alert(data.message) }
    } catch { navigate('/login') }
  }

  const particles = [
    { x: 10, color: '#48b0d6', delay: 0, duration: 25, size: '3px' },
    { x: 30, color: '#ea580c', delay: 5, duration: 30, size: '2px' },
    { x: 50, color: '#48b0d6', delay: 2, duration: 22, size: '4px' },
    { x: 70, color: 'white', delay: 8, duration: 28, size: '2px' },
    { x: 90, color: '#ea580c', delay: 1, duration: 24, size: '3px' },
    { x: 20, color: '#48b0d6', delay: 12, duration: 20, size: '2px' },
    { x: 60, color: '#ea580c', delay: 6, duration: 26, size: '3px' },
  ]

  return (
    <div className="relative min-h-screen flex justify-center items-center px-4 py-12 overflow-hidden" style={{ background: 'radial-gradient(ellipse at center, #0a0a15 0%, #000000 100%)' }}>

      {/* Warp effect */}
      {warpActive && (
        <>
          {[0, 1.5].map((d, i) => (
            <motion.div
              key={i}
              className="absolute top-1/2 left-1/2 w-[100vmax] h-[100vmax] pointer-events-none"
              style={{
                backgroundImage: 'radial-gradient(1px 1px at 10% 10%, white, transparent), radial-gradient(2px 2px at 50% 40%, white, transparent), radial-gradient(1px 1px at 70% 20%, white, transparent)',
                backgroundSize: '400px 400px',
                mixBlendMode: 'screen',
              }}
              animate={{
                x: '-50%', y: '-50%',
                scale: [0.1, 3.5],
                rotate: [0, 15],
                opacity: [0, 0.6, 0.4, 0],
              }}
              transition={{ duration: 3, delay: d, repeat: Infinity, ease: 'linear', times: [0, 0.2, 0.8, 1] }}
            />
          ))}
          <motion.div
            className="absolute top-1/2 left-1/2 w-[100vmax] h-[100vmax] pointer-events-none"
            style={{ backgroundImage: 'radial-gradient(circle closest-side, transparent 40%, rgba(72,176,214,0.3) 50%, transparent 70%)', filter: 'blur(50px)' }}
            animate={{ x: '-50%', y: '-50%', scale: [0.1, 3.5], rotate: [0, 15], opacity: [0, 0.6, 0.4, 0] }}
            transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut', times: [0, 0.2, 0.8, 1] }}
          />
        </>
      )}

      {/* Vignette overlay */}
      <div className="absolute inset-0 pointer-events-none z-10" style={{ background: 'radial-gradient(circle at 50% 50%, transparent 30%, rgba(0,0,0,0.7) 70%, rgba(0,0,0,0.95) 95%)' }} />

      {/* Calm particles (always visible after warp) */}
      <div className="absolute inset-0 z-5 pointer-events-none overflow-hidden">
        {particles.map((p, i) => <FloatingParticle key={i} {...p} />)}
      </div>

      {/* Card */}
      <motion.div
        className="relative z-30 w-full max-w-md"
        initial={{ opacity: 0, y: 32 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.1, ease: 'easeOut' }}
      >
        <div className="glass-card-dark rounded-2xl p-8" style={{ border: '1px solid rgba(255,255,255,0.08)' }}>

          <div className="flex justify-center mb-6">
            <Link to="/">
              <img src="/log.png" alt="SughOsha Logo" className="h-14 w-auto object-contain"
                onError={e => (e.target.style.display = 'none')} />
            </Link>
          </div>

          <h2 className="text-2xl font-bold text-center mb-2">Create Account</h2>
          <p className="text-gray-400 text-center mb-6 text-sm">Join us to start your journey</p>

          <div className="mb-6">
            <a href="https://accounts.google.com" target="_blank" rel="noreferrer" className="w-full flex items-center justify-center gap-3 py-2.5 rounded-lg text-sm font-medium text-white transition hover:bg-white/5" style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)' }}>
              <img src="https://www.svgrepo.com/show/475656/google-color.svg" className="h-5 w-5" alt="Google" />
              Sign up with Google
            </a>
          </div>

          <div className="relative flex py-2 items-center mb-6">
            <div className="flex-grow border-t border-white/10" />
            <span className="flex-shrink-0 mx-4 text-gray-500 text-xs uppercase">Or register with email</span>
            <div className="flex-grow border-t border-white/10" />
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">Full Name</label>
              <input name="fullname" type="text" placeholder="Enter your name" required className="glass-input w-full rounded-lg px-4 py-3 focus:outline-none" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">Email</label>
              <input name="email" type="email" placeholder="Enter your email" required className="glass-input w-full rounded-lg px-4 py-3 focus:outline-none" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">Password</label>
              <div className="relative">
                <input name="password" type={showPass ? 'text' : 'password'} placeholder="Create a password" required className="glass-input w-full rounded-lg px-4 py-3 focus:outline-none pr-10" />
                <button type="button" onClick={() => setShowPass(v => !v)} className="absolute right-3 top-3.5 text-gray-400 hover:text-white transition focus:outline-none">
                  {showPass ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                </button>
              </div>
            </div>
            <div className="flex items-start">
              <input type="checkbox" required className="h-4 w-4 mt-0.5 rounded border-gray-600 bg-white/10 text-[#48b0d6] transition" />
              <label className="ml-2 text-sm text-gray-300">
                I agree to the <a href="#" className="text-[#48b0d6] hover:underline">Terms</a> and <a href="#" className="text-[#48b0d6] hover:underline">Privacy Policy</a>
              </label>
            </div>
            <motion.button
              type="submit"
              className="w-full bg-gradient-to-r from-[#ea580c] to-[#dc2626] text-white font-bold py-3 rounded-lg transition shadow-[0_0_20px_rgba(234,88,12,0.3)]"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              Create Account
            </motion.button>
          </form>

          <p className="text-center text-gray-400 text-sm mt-8">
            Already have an account?{' '}
            <Link to="/login" className="text-[#48b0d6] hover:text-[#ea580c] font-medium transition">Log in</Link>
          </p>
        </div>

        <div className="w-full text-center mt-8">
          <Link to="/" className="text-gray-500 hover:text-white text-sm transition flex items-center justify-center gap-2 group">
            <motion.span whileHover={{ x: -4 }} transition={{ type: 'spring', stiffness: 400 }}>
              <ArrowLeft className="w-4 h-4" />
            </motion.span>
            Back to Home
          </Link>
        </div>
      </motion.div>
    </div>
  )
}
