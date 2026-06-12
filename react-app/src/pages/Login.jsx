import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Eye, EyeOff, ArrowLeft } from 'lucide-react'

export default function Login() {
  const [showPass, setShowPass] = useState(false)
  const [phase, setPhase] = useState('balls') // balls → aurora → card
  const navigate = useNavigate()

  useEffect(() => {
    const t1 = setTimeout(() => setPhase('aurora'), 1200)
    const t2 = setTimeout(() => setPhase('card'), 1600)
    return () => { clearTimeout(t1); clearTimeout(t2) }
  }, [])

  const handleSubmit = async (e) => {
    e.preventDefault()
    const email = e.target.email.value
    const password = e.target.password.value
    try {
      const res = await fetch('http://localhost:5000/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      })
      const data = await res.json()
      if (res.ok) {
        localStorage.setItem('token', data.token)
        navigate('/')
      } else {
        alert(data.message)
      }
    } catch {
      // For demo without backend, just navigate
      navigate('/')
    }
  }

  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden" style={{ background: '#050508' }}>
      {/* Ball 1 — Cyan */}
      {phase === 'balls' && (
        <motion.div
          className="absolute w-5 h-5 rounded-full"
          style={{ background: 'white', color: '#48b0d6', top: '50%', left: '50%', boxShadow: '0 0 25px #48b0d6, 0 0 50px #48b0d6', zIndex: 10 }}
          initial={{ x: '-50%', y: '-50%', scale: 1 }}
          animate={{ x: '-45vw', y: '40vh', scale: 50, opacity: 0 }}
          transition={{ duration: 1.4, ease: [0.5, 0, 0.2, 1] }}
        />
      )}
      {phase === 'balls' && (
        <motion.div
          className="absolute w-5 h-5 rounded-full"
          style={{ background: 'white', color: '#ea580c', top: '50%', left: '50%', boxShadow: '0 0 25px #ea580c, 0 0 50px #ea580c', zIndex: 10 }}
          initial={{ x: '-50%', y: '-50%', scale: 1 }}
          animate={{ x: '45vw', y: '-40vh', scale: 50, opacity: 0 }}
          transition={{ duration: 1.4, ease: [0.5, 0, 0.2, 1] }}
        />
      )}

      {/* Aurora lights */}
      <motion.div
        className="absolute bottom-[-10%] left-[-20%] w-[90vmax] h-[90vmax] rounded-full pointer-events-none"
        style={{ background: 'radial-gradient(circle, #48b0d6, transparent 65%)', mixBlendMode: 'screen', filter: 'blur(1px)' }}
        initial={{ opacity: 0 }}
        animate={{ opacity: phase === 'aurora' || phase === 'card' ? 0.4 : 0 }}
        transition={{ duration: 0.8 }}
      />
      <motion.div
        className="absolute top-[-10%] right-[-20%] w-[90vmax] h-[90vmax] rounded-full pointer-events-none"
        style={{ background: 'radial-gradient(circle, #ea580c, transparent 65%)', mixBlendMode: 'screen', filter: 'blur(1px)' }}
        initial={{ opacity: 0 }}
        animate={{ opacity: phase === 'aurora' || phase === 'card' ? 0.35 : 0 }}
        transition={{ duration: 0.8 }}
      />

      {/* Card */}
      <motion.div
        className="relative z-30 w-full max-w-md px-4"
        initial={{ opacity: 0, y: 40, scale: 0.96 }}
        animate={phase === 'card' ? { opacity: 1, y: 0, scale: 1 } : {}}
        transition={{ duration: 1.2, ease: [0.34, 1.56, 0.64, 1] }}
      >
        {/* Card glow */}
        <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-[#48b0d6] to-[#ea580c] opacity-0 blur-2xl -z-10 pointer-events-none"
          style={{ opacity: phase === 'card' ? 0.15 : 0, transition: 'opacity 1.5s ease-out 0.5s' }} />

        <div className="glass-card-dark rounded-2xl p-8">
          <div className="flex justify-center mb-4">
            <Link to="/">
              <img src="/log.png" alt="SughOsha Logo" className="h-14 w-auto object-contain"
                onError={e => (e.target.style.display = 'none')} />
            </Link>
          </div>

          <h2 className="text-2xl font-bold text-center mb-2 tracking-tight">Welcome Back</h2>
          <p className="text-gray-400 text-center mb-8 text-sm">Sign in to enter the workspace</p>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1.5 ml-1">Email</label>
              <input name="email" type="email" placeholder="Enter your email" required className="glass-input w-full rounded-lg px-4 py-3 focus:outline-none" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1.5 ml-1">Password</label>
              <div className="relative">
                <input name="password" type={showPass ? 'text' : 'password'} placeholder="Enter your password" required className="glass-input w-full rounded-lg px-4 py-3 focus:outline-none pr-10" />
                <button type="button" onClick={() => setShowPass(v => !v)} className="absolute right-3 top-3.5 text-gray-400 hover:text-white transition focus:outline-none">
                  {showPass ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between text-sm mt-2">
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="checkbox" className="h-4 w-4 rounded border-gray-600 bg-white/10 text-[#48b0d6] transition" />
                <span className="text-gray-300">Remember me</span>
              </label>
              <a href="#" className="text-[#48b0d6] hover:text-[#ea580c] font-medium transition">Forgot password?</a>
            </div>

            <motion.button
              type="submit"
              className="w-full bg-gradient-to-r from-[#ea580c] to-[#dc2626] text-white font-bold py-3.5 rounded-lg shadow-[0_0_25px_rgba(234,88,12,0.3)] hover:shadow-[0_0_35px_rgba(220,38,38,0.5)] mt-6"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              Log in
            </motion.button>
          </form>

          <div className="relative flex py-2 items-center my-6">
            <div className="flex-grow border-t border-white/10" />
            <span className="flex-shrink-0 mx-4 text-gray-500 text-xs uppercase tracking-wider">Or continue with</span>
            <div className="flex-grow border-t border-white/10" />
          </div>

          <div className="grid grid-cols-3 gap-3">
            {[
              { src: 'https://www.svgrepo.com/show/475656/google-color.svg', alt: 'Google' },
              { src: 'https://www.svgrepo.com/show/475647/facebook-color.svg', alt: 'Facebook' },
            ].map(({ src, alt }) => (
              <button key={alt} className="glass-input hover:bg-white/10 transition flex items-center justify-center py-2.5 rounded-lg">
                <img src={src} className="h-5 w-5" alt={alt} />
              </button>
            ))}
            <button className="glass-input hover:bg-white/10 transition flex items-center justify-center py-2.5 rounded-lg">
              <svg className="h-5 w-5 fill-white" viewBox="0 0 24 24">
                <path d="M17.05 20.28c-.98.95-2.05.8-3.08.35-1.09-.46-2.09-.48-3.24 0-1.44.62-2.2.44-3.06-.35C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.74 1.18 0 2.21-1.23 3.91-1.2 2.34.02 3.77 1.25 4.38 2.19-4.27 2.1-3.38 8.8 1.63 11.24zM13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.84 1.53-2.95 1.51-.14-1.15.36-2.35 1.05-3.2z"/>
              </svg>
            </button>
          </div>

          <p className="text-center text-gray-400 text-sm mt-8">
            Don't have an account?{' '}
            <Link to="/signup" className="text-[#48b0d6] hover:text-[#ea580c] font-bold transition">Sign up</Link>
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
