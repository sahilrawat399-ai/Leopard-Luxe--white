import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { doc, setDoc, serverTimestamp } from 'firebase/firestore';
import { auth, db } from '../lib/firebase';
import { motion } from 'motion/react';
import { ArrowRight, Mail, Lock, User, Building } from 'lucide-react';

export function SignupPage() {
  const [fullName, setFullName] = useState('');
  const [businessName, setBusinessName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      
      const userDoc = {
        fullName,
        businessName,
        email,
        phoneNumber: phone,
        role: 'client',
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp()
      };
      
      // The rules allow creation of own profile
      await setDoc(doc(db, 'users', user.uid), userDoc);
      navigate('/dashboard');
    } catch (err: any) {
      setError(err.message || 'Signup failed');
    }
  };

  return (
    <main className="bg-rich-black min-h-screen pt-32 pb-20 flex items-center justify-center px-6">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-lg bg-[#0A0A0A] border border-white/10 p-8 rounded-3xl"
      >
        <div className="text-center mb-8">
          <h1 className="font-serif text-3xl font-bold text-white mb-2">Request Access</h1>
          <p className="text-gray-400">Create an account to access the client portal</p>
        </div>

        {error && (
          <div className="bg-red-500/10 border border-red-500/50 text-red-500 p-4 rounded-xl mb-6 text-sm">
            {error}
          </div>
        )}

        <form onSubmit={handleSignup} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
                <label className="block text-xs font-bold tracking-wider text-gray-400 uppercase mb-2">Full Name</label>
                <div className="relative">
                <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
                <input 
                    type="text"
                    value={fullName}
                    onChange={e => setFullName(e.target.value)}
                    className="w-full bg-rich-black border border-white/10 rounded-xl py-3 pl-12 pr-4 text-white focus:outline-none focus:border-gold transition-colors"
                    required
                />
                </div>
            </div>
            <div>
                <label className="block text-xs font-bold tracking-wider text-gray-400 uppercase mb-2">Business Name</label>
                <div className="relative">
                <Building className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
                <input 
                    type="text"
                    value={businessName}
                    onChange={e => setBusinessName(e.target.value)}
                    className="w-full bg-rich-black border border-white/10 rounded-xl py-3 pl-12 pr-4 text-white focus:outline-none focus:border-gold transition-colors"
                />
                </div>
            </div>
          </div>
          
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

          <div>
            <label className="block text-xs font-bold tracking-wider text-gray-400 uppercase mb-2">Phone Number</label>
            <div className="relative">
              <input 
                type="tel"
                value={phone}
                onChange={e => setPhone(e.target.value)}
                className="w-full bg-rich-black border border-white/10 rounded-xl py-3 px-4 text-white focus:outline-none focus:border-gold transition-colors"
              />
            </div>
          </div>
          
          <div>
            <label className="block text-xs font-bold tracking-wider text-gray-400 uppercase mb-2">Password</label>
            <div className="relative">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
              <input 
                type="password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                className="w-full bg-rich-black border border-white/10 rounded-xl py-3 pl-12 pr-4 text-white focus:outline-none focus:border-gold transition-colors"
                required
                minLength={6}
              />
            </div>
          </div>

          <button type="submit" className="w-full group relative inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl font-bold tracking-widest text-sm uppercase text-rich-black transition-all duration-300 hover:scale-[1.02] shadow-[0_5px_20px_rgba(212,175,55,0.2)] bg-gradient-to-r from-[#D4AF37] to-[#B8860B] mt-6">
            Create Account
            <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
          </button>
        </form>

        <p className="mt-8 text-center text-sm text-gray-400">
          Already have an account? <Link to="/login" className="text-gold hover:text-white transition-colors">Sign In</Link>
        </p>
      </motion.div>
    </main>
  );
}
