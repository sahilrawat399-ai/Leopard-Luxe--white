import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { sendPasswordResetEmail } from 'firebase/auth';
import { auth } from '../lib/firebase';
import { motion } from 'motion/react';
import { ArrowRight, Mail } from 'lucide-react';

export function ForgotPasswordPage() {
  const [email, setEmail] = useState('');
  const [msg, setMsg] = useState('');
  const [error, setError] = useState('');

  const handleReset = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setMsg('');
    try {
      await sendPasswordResetEmail(auth, email);
      setMsg('Check your email for the password reset link.');
    } catch (err: any) {
      setError(err.message || 'Failed to send reset link');
    }
  };

  return (
    <main className="bg-rich-black min-h-screen pt-32 pb-20 flex items-center justify-center px-6">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md bg-[#0A0A0A] border border-white/10 p-8 rounded-3xl"
      >
        <div className="text-center mb-8">
          <h1 className="font-serif text-3xl font-bold text-white mb-2">Reset Password</h1>
          <p className="text-gray-400">Enter your email to receive a reset link</p>
        </div>

        {error && (
          <div className="bg-red-500/10 border border-red-500/50 text-red-500 p-4 rounded-xl mb-6 text-sm">
            {error}
          </div>
        )}
        
        {msg && (
          <div className="bg-green-500/10 border border-green-500/50 text-green-500 p-4 rounded-xl mb-6 text-sm">
            {msg}
          </div>
        )}

        <form onSubmit={handleReset} className="space-y-4">
          <div>
            <label className="block text-xs font-bold tracking-wider text-gray-400 uppercase mb-2">Email Address</label>
            <div className="relative">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
              <input 
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                className="w-full bg-rich-black border border-white/10 rounded-xl py-3 pl-12 pr-4 text-white focus:outline-none focus:border-gold transition-colors"
                required
              />
            </div>
          </div>
          

          <button type="submit" className="w-full group relative inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl font-bold tracking-widest text-sm uppercase text-rich-black transition-all duration-300 hover:scale-[1.02] shadow-[0_5px_20px_rgba(212,175,55,0.2)] bg-gradient-to-r from-[#D4AF37] to-[#B8860B] mt-6">
            Send Reset Link
            <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
          </button>
        </form>

        <p className="mt-8 text-center text-sm text-gray-400">
          Remembered your password? <Link to="/login" className="text-gold hover:text-white transition-colors">Sign In</Link>
        </p>
      </motion.div>
    </main>
  );
}
