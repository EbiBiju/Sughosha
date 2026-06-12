import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { UploadCloud, CheckCircle, ArrowLeft, Send } from 'lucide-react'
import PageTransition from '../components/PageTransition'

export default function Apply() {
  const [dragActive, setDragActive] = useState(false)
  const [file, setFile] = useState(null)
  const [submitted, setSubmitted] = useState(false)
  const navigate = useNavigate()

  const handleDrag = (e) => {
    e.preventDefault()
    e.stopPropagation()
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true)
    } else if (e.type === "dragleave") {
      setDragActive(false)
    }
  }

  const handleDrop = (e) => {
    e.preventDefault()
    e.stopPropagation()
    setDragActive(false)
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      setFile(e.dataTransfer.files[0])
    }
  }

  const handleChange = (e) => {
    e.preventDefault()
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0])
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    setSubmitted(true)
    setTimeout(() => {
      navigate('/careers')
    }, 3000)
  }

  return (
    <PageTransition>
      <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
        <div className="absolute top-[20%] right-[10%] w-[30%] h-[40%] bg-[#48b0d6] rounded-full filter blur-[150px] opacity-[0.08]" />
        <div className="absolute bottom-[10%] left-[20%] w-[30%] h-[40%] bg-[#ea580c] rounded-full filter blur-[150px] opacity-[0.06]" />
      </div>

      <main className="relative z-10 pt-32 pb-20 px-4 sm:px-6 lg:px-8 min-h-screen">
        <div className="max-w-3xl mx-auto">
          
          <Link to="/careers" className="inline-flex items-center gap-2 text-gray-400 hover:text-white transition group mb-8">
            <motion.span whileHover={{ x: -4 }} transition={{ type: 'spring', stiffness: 400 }}>
              <ArrowLeft className="w-5 h-5" />
            </motion.span>
            Back to Openings
          </Link>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-10"
          >
            <h1 className="text-4xl font-bold text-white mb-3">
              Application <span className="text-gradient-cyan">Portal</span>
            </h1>
            <p className="text-gray-400 text-lg">We're excited to see what you can build with us.</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30, filter: 'blur(10px)' }}
            animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="glass-card-dark rounded-3xl p-8 md:p-12 relative overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-[#48b0d6]/5 to-transparent z-0 pointer-events-none" />
            
            <form onSubmit={handleSubmit} className="relative z-10 space-y-8">
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-300 ml-1">Full Name</label>
                  <input type="text" required placeholder="John Doe" className="glass-input w-full rounded-xl px-4 py-3" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-300 ml-1">Email Address</label>
                  <input type="email" required placeholder="john@example.com" className="glass-input w-full rounded-xl px-4 py-3" />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-300 ml-1">Phone Number</label>
                  <input type="tel" required placeholder="+1 234 567 8900" className="glass-input w-full rounded-xl px-4 py-3" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-300 ml-1">Portfolio / LinkedIn URL</label>
                  <input type="url" placeholder="https://..." className="glass-input w-full rounded-xl px-4 py-3" />
                </div>
              </div>

              {/* Drag and Drop Resume */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-300 ml-1">Resume / CV</label>
                <div 
                  className={`border-2 border-dashed rounded-2xl p-8 text-center transition-all ${
                    dragActive ? 'border-[#48b0d6] bg-[#48b0d6]/10' : 'border-white/10 bg-white/5 hover:border-white/20'
                  }`}
                  onDragEnter={handleDrag}
                  onDragLeave={handleDrag}
                  onDragOver={handleDrag}
                  onDrop={handleDrop}
                >
                  <input 
                    type="file" 
                    id="resume" 
                    className="hidden" 
                    accept=".pdf,.doc,.docx"
                    onChange={handleChange}
                  />
                  {file ? (
                    <div className="flex flex-col items-center gap-3">
                      <div className="w-12 h-12 rounded-full bg-green-500/20 text-green-400 flex items-center justify-center">
                        <CheckCircle className="w-6 h-6" />
                      </div>
                      <span className="text-white font-medium">{file.name}</span>
                      <button type="button" onClick={() => setFile(null)} className="text-sm text-red-400 hover:text-red-300 transition">Remove file</button>
                    </div>
                  ) : (
                      <label htmlFor="resume" className="cursor-pointer flex flex-col items-center gap-4">
                        <div className="w-14 h-14 rounded-full bg-[#48b0d6]/10 text-[#48b0d6] flex items-center justify-center mb-2">
                          <UploadCloud className="w-7 h-7" />
                        </div>
                        <p className="text-gray-300"><span className="text-[#48b0d6] font-semibold">Click to upload</span> or drag and drop</p>
                        <p className="text-sm text-gray-500">PDF, DOC, DOCX up to 10MB</p>
                      </label>
                  )}
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-300 ml-1">Cover Letter (Optional)</label>
                <textarea rows="4" placeholder="Tell us why you're a great fit..." className="glass-input w-full rounded-xl px-4 py-3 resize-none"></textarea>
              </div>

              <motion.button
                type="submit"
                disabled={submitted}
                className="w-full bg-gradient-to-r from-[#ea580c] to-[#dc2626] text-white font-bold py-4 rounded-xl transition shadow-[0_10px_20px_rgba(234,88,12,0.2)] hover:shadow-[0_10px_30px_rgba(234,88,12,0.4)] flex items-center justify-center gap-2"
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.98 }}
              >
                {submitted ? (
                  <>
                    <CheckCircle className="w-5 h-5" />
                    Application Sent! Returning...
                  </>
                ) : (
                  <>
                    <Send className="w-5 h-5" />
                    Submit Application
                  </>
                )}
              </motion.button>
            </form>
          </motion.div>

        </div>
      </main>
    </PageTransition>
  )
}
