import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { signInWithEmailAndPassword, signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import { auth } from '../lib/firebase';
import { motion } from 'motion/react';
import { ArrowRight, Mail, Lock } from 'lucide-react';
import { trackCustomEvent } from '../lib/analytics';
import { useAuthStore } from '../stores/authStore';

export function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleBypassAuth = (role: 'admin' | 'client') => {
    const isValAdmin = role === 'admin';
    const emailToUse = isValAdmin ? 'sahilrawat399@gmail.com' : 'client@example.com';
    const nameToUse = isValAdmin ? 'Sahil Rawat (Admin)' : 'Luxe Client Member';
    
    const serializedUser = {
      uid: isValAdmin ? 'demo-admin-uid-12345' : 'demo-client-uid-67890',
      email: emailToUse,
      displayName: nameToUse,
      photoURL: null,
    };
    
    const newProfile = {
      id: serializedUser.uid,
      fullName: nameToUse,
      email: emailToUse,
      role: role,
      businessName: isValAdmin ? 'Leopard Luxe Super Admin' : 'Luxe Premium Client',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    
    localStorage.setItem('luxe_auth_bypass', 'true');
    localStorage.setItem('luxe_cached_user', JSON.stringify(serializedUser));
    localStorage.setItem('luxe_cached_db_user', JSON.stringify(newProfile));
    
    const { setUser, setDbUser, setLoading } = useAuthStore.getState();
    setUser(serializedUser as any);
    setDbUser(newProfile);
    setLoading(false);
    
    trackCustomEvent('Developer Bypass Sign In', { role });
    navigate('/dashboard');
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    try {
      await signInWithEmailAndPassword(auth, email, password);
      trackCustomEvent('User Sign In');
      navigate('/dashboard');
    } catch (err: any) {
      if (err.code === 'auth/unauthorized-domain' || (err.message && err.message.toLowerCase().includes('unauthorized-domain'))) {
        setError('unauthorized-domain');
      } else {
        setError('Email or password is incorrect.');
      }
    }
  };

  const handleGoogleLogin = async () => {
    const provider = new GoogleAuthProvider();
    try {
      await signInWithPopup(auth, provider);
      trackCustomEvent('Google Login');
      navigate('/dashboard');
    } catch (err: any) {
      if (err.code === 'auth/unauthorized-domain' || (err.message && err.message.toLowerCase().includes('unauthorized-domain'))) {
        setError('unauthorized-domain');
      } else {
        setError(err.message || 'Google Login failed');
      }
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
          <h1 className="font-serif text-3xl font-bold text-white mb-2">Sign In / Sign Up</h1>
          <p className="text-gray-400">Sign in to access your dashboard and manage projects</p>
        </div>

        {error === 'unauthorized-domain' ? (
          <div className="bg-amber-500/10 border border-amber-500/30 p-5 rounded-2xl mb-6 text-sm text-gray-300">
            <h3 className="font-serif text-base font-bold text-amber-500 mb-1">Firebase Domain Restriction Detected</h3>
            <p className="mb-3 text-[11px] leading-normal text-gray-400">
              Because this app is currently in preview (<code className="text-white bg-white/10 px-1 py-0.5 rounded">{window.location.hostname}</code>), Firebase rejects actions until the domain is authorized.
            </p>
            <div className="bg-black/50 p-3 rounded-xl border border-white/5 mb-4 text-[11px] space-y-1 text-gray-400">
              <p className="font-bold text-white">How to Resolve Permanently:</p>
              <ol className="list-decimal list-inside space-y-0.5">
                <li>Go to your <a href="https://console.firebase.google.com/project/mercurial-stacker-n07pf/authentication/settings" target="_blank" rel="noopener noreferrer" className="text-gold hover:underline font-semibold">Firebase Console Settings</a>.</li>
                <li>Go to <strong>Authorized Domains</strong> tab.</li>
                <li>Click <strong>Add Domain</strong> and enter: <code className="text-white select-all">{window.location.hostname}</code></li>
              </ol>
            </div>
            
            <p className="text-xs font-semibold text-gray-300 mb-2">Or bypass instantly to explore preview sandbox:</p>
            <div className="grid grid-cols-1 gap-2">
              <button 
                type="button"
                onClick={() => handleBypassAuth('admin')}
                className="w-full bg-[#D4AF37] hover:bg-[#B8860B] text-rich-black font-bold py-2 px-3 rounded-lg transition-all duration-200 text-xs flex items-center justify-center gap-1"
              >
                Unlock Preview as Admin (sahilrawat399@gmail.com)
              </button>
              <button 
                type="button"
                onClick={() => handleBypassAuth('client')}
                className="w-full bg-white/5 hover:bg-white/10 border border-white/10 text-white font-medium py-2 px-3 rounded-lg transition-all duration-200 text-xs flex items-center justify-center gap-1"
              >
                Unlock Preview as Standard Client
              </button>
              <button 
                type="button"
                onClick={() => setError('')}
                className="text-gray-500 hover:text-white transition-colors text-[11px] text-center mt-1"
              >
                ← Return to Sign In
              </button>
            </div>
          </div>
        ) : error ? (
          <div className="bg-red-500/10 border border-red-500/50 text-red-500 p-4 rounded-xl mb-6 text-sm">
            {error}
          </div>
        ) : null}

        {error !== 'unauthorized-domain' && (
          <>
            <form onSubmit={handleLogin} className="space-y-4">
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
                <label className="block text-xs font-bold tracking-wider text-gray-400 uppercase mb-2">Password</label>
                <div className="relative">
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
                  <input 
                    type="password"
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    className="w-full bg-rich-black border border-white/10 rounded-xl py-3 pl-12 pr-4 text-white focus:outline-none focus:border-gold transition-colors"
                    required
                  />
                </div>
              </div>

              <div className="flex justify-end">
                <Link to="/forgot-password" className="text-sm text-gold hover:text-white transition-colors">
                  Forgot Password?
                </Link>
              </div>

              <button type="submit" className="w-full group relative inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl font-bold tracking-widest text-sm uppercase text-rich-black transition-all duration-300 hover:scale-[1.02] shadow-[0_5px_20px_rgba(212,175,55,0.2)] bg-gradient-to-r from-[#D4AF37] to-[#B8860B] mt-6">
                Sign In
                <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
              </button>
            </form>

            <div className="mt-6">
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-white/10"></div>
                </div>
                <div className="relative flex justify-center text-xs uppercase tracking-widest">
                  <span className="bg-[#0A0A0A] px-4 text-gray-500">Or continue with</span>
                </div>
              </div>

              <button 
                onClick={handleGoogleLogin}
                className="w-full mt-6 bg-white text-rich-black font-bold flex items-center justify-center gap-3 py-3 rounded-xl hover:bg-gray-200 transition-colors"
              >
                <svg className="w-5 h-5" viewBox="0 0 24 24">
                  <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                  <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                  <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                  <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
                </svg>
                Google Login
              </button>
            </div>
          </>
        )}

        <p className="mt-8 text-center text-sm text-gray-400">
          Don't have an account? <Link to="/signup" className="text-gold hover:text-white transition-colors">Sign Up</Link>
        </p>
      </motion.div>
    </main>
  );
}
