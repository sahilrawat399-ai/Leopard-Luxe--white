import React, { useState } from 'react';
import { motion } from 'motion/react';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../stores/authStore';
import { auth, db } from '../lib/firebase';
import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import { Mail, Lock, ShieldAlert, ArrowRight, Eye, EyeOff } from 'lucide-react';
import { trackCustomEvent } from '../lib/analytics';

export function AdminLoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const navigate = useNavigate();

  const handleAdminLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      setError("Please fill out both email and password.");
      return;
    }

    setIsSubmitting(true);
    setError(null);

    const emailLower = email.trim().toLowerCase();
    
    // Validating admin email locally first to protect unauthorized auth attempts
    if (emailLower !== 'sahilrawat399@gmail.com') {
      setError("Invalid credentials. Please try again.");
      setIsSubmitting(false);
      return;
    }

    // Check if the credentials matched the exact desired credentials
    const isTargetAdmin = emailLower === 'sahilrawat399@gmail.com' && password === 'Prashantrawat@123';

    try {
      let loggedUser = null;
      try {
        // Attempt 1: Standard Sign In with Firebase Authentication
        const authResult = await signInWithEmailAndPassword(auth, emailLower, password);
        loggedUser = authResult.user;
      } catch (signInErr: any) {
        console.warn("Firebase email sign-in failed, checking auto-registration", signInErr);
        
        // Attempt 2: Auto-Registration if user-not-found or similar
        const errorCode = signInErr?.code;
        if (isTargetAdmin && (errorCode === 'auth/user-not-found' || errorCode === 'auth/invalid-credential' || String(signInErr).includes('user-not-found'))) {
          try {
            const signupResult = await createUserWithEmailAndPassword(auth, emailLower, password);
            loggedUser = signupResult.user;
          } catch (signUpErr) {
            console.error("Firebase email auto-registration failed:", signUpErr);
          }
        }
      }

      if (loggedUser && loggedUser.email?.toLowerCase() === 'sahilrawat399@gmail.com') {
        // Successfully authenticated via Firebase backend
        try {
          const adminDocRef = doc(db, 'admins', loggedUser.uid);
          await setDoc(adminDocRef, {
            email: loggedUser.email?.toLowerCase(),
            role: 'super_admin',
            active: true
          }, { merge: true });
        } catch (dbErr) {
          console.warn("Could not save admin profile to database. Continuing with local auth:", dbErr);
        }

        const adminProfile = {
          id: loggedUser.uid,
          fullName: 'Sahil Rawat (Admin)',
          email: loggedUser.email,
          role: 'admin',
          businessName: 'Leopard Luxe Super Admin',
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString()
        };

        const { setUser, setDbUser, setLoading } = useAuthStore.getState();
        setUser(loggedUser);
        setDbUser(adminProfile);
        setLoading(false);

        trackCustomEvent('Admin Sign In Success');
        navigate('/admin');
      } else if (isTargetAdmin) {
        // Fallback Block: Auto-authorized sandbox state for the correct static credentials
        // This ensures the admin successfully gains immediate entry even if the Firebase Domain is unauthorized/restricted in the preview iframe
        console.info("Entering Admin Sandbox Mode (authorized via static credentials mismatch or network host constraint).");
        
        const fallbackUid = "admin-fixed-uid-sahilrawat399";
        const fallbackUser = {
          uid: fallbackUid,
          email: 'sahilrawat399@gmail.com',
          displayName: 'Sahil Rawat (Admin)',
          photoURL: null,
          emailVerified: true
        };
        
        const adminProfile = {
          id: fallbackUid,
          fullName: 'Sahil Rawat (Admin)',
          email: 'sahilrawat399@gmail.com',
          role: 'admin',
          businessName: 'Leopard Luxe Super Admin',
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString()
        };

        const { setUser, setDbUser, setLoading } = useAuthStore.getState();
        setUser(fallbackUser as any);
        setDbUser(adminProfile);
        setLoading(false);

        localStorage.setItem('luxe_auth_bypass', 'true');
        localStorage.setItem('luxe_cached_user', JSON.stringify(fallbackUser));
        localStorage.setItem('luxe_cached_db_user', JSON.stringify(adminProfile));

        trackCustomEvent('Admin Sign In Success', { bypass: true });
        navigate('/admin');
      } else {
        setError("Invalid credentials. Please try again.");
      }
    } catch (err: any) {
      console.error("Admin login error:", err);
      setError("Invalid credentials. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-rich-black relative flex flex-col justify-center items-center px-4 py-24 select-none overflow-hidden">
      {/* Background gradients */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(212,175,55,0.12)_0%,transparent_50%)] pointer-events-none" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom,rgba(5,5,5,1)_0%,rgba(0,0,0,0.5)_100%)] pointer-events-none" />

      {/* Decorative Floating Spheres */}
      <div className="absolute top-1/4 left-10 w-72 h-72 rounded-full bg-gold/5 blur-[120px] pointer-events-none animate-pulse" />
      <div className="absolute bottom-1/4 right-10 w-96 h-96 rounded-full bg-gold/5 blur-[155px] pointer-events-none" />

      <motion.div
        initial={{ y: 30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
        className="w-full max-w-md relative z-10"
      >
        <div className="p-8 md:p-10 rounded-3xl bg-gradient-to-b from-[#090909]/95 to-[#030303]/95 border border-gold/40 shadow-[0_0_60px_rgba(212,175,55,0.2)]">
          
          {/* Lock icon */}
          <div className="w-16 h-16 rounded-2xl bg-gold/10 border border-gold/30 flex items-center justify-center mx-auto mb-6 shadow-[0_0_20px_rgba(212,175,55,0.1)]">
            <ShieldAlert className="w-8 h-8 text-gold" />
          </div>

          <div className="text-center mb-8">
            <h1 className="font-serif text-2xl font-bold text-white uppercase tracking-wider mb-2">
              Leopard Luxe
            </h1>
            <p className="text-[10px] tracking-[0.25em] text-gold uppercase font-bold">
              Secure Administrative Gateway
            </p>
          </div>

          <form onSubmit={handleAdminLogin} className="space-y-6 text-left">
            {error && (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="bg-red-500/10 border border-red-500/30 text-red-400 p-4 rounded-xl text-xs flex gap-3 items-start animate"
              >
                <div className="w-1.5 h-1.5 rounded-full bg-red-400 mt-1.5 flex-shrink-0" />
                <p className="font-medium leading-relaxed">{error}</p>
              </motion.div>
            )}

            {/* Email Address Input */}
            <div>
              <label htmlFor="admin-email" className="block text-[10px] uppercase font-bold tracking-widest text-[#888888] mb-2">
                Email Address
              </label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gold/80" />
                <input
                  id="admin-email"
                  type="email"
                  required
                  placeholder="name@domain.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-black border border-white/10 rounded-xl py-3.5 pl-12 pr-4 text-white placeholder-gray-600 focus:outline-none focus:border-gold transition-colors text-sm"
                />
              </div>
            </div>

            {/* Password Input */}
            <div>
              <label htmlFor="admin-pass" className="block text-[10px] uppercase font-bold tracking-widest text-[#888888] mb-2">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gold/80" />
                <input
                  id="admin-pass"
                  type={showPassword ? "text" : "password"}
                  required
                  placeholder="••••••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-black border border-white/10 rounded-xl py-3.5 pl-12 pr-12 text-white placeholder-gray-600 focus:outline-none focus:border-gold transition-colors text-sm"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-white p-1 rounded transition-colors focus:outline-none"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {/* Submit button */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full flex items-center justify-center gap-2 px-6 py-4 rounded-xl font-bold tracking-widest text-xs uppercase text-rich-black transition-all duration-300 hover:scale-[1.01] shadow-[0_5px_20px_rgba(212,175,55,0.3)] bg-gradient-to-r from-[#D4AF37] to-[#B8860B] select-none cursor-pointer disabled:opacity-75 disabled:hover:scale-100"
            >
              {isSubmitting ? (
                <div className="w-5 h-5 border-2 border-rich-black border-t-transparent rounded-full animate-spin" />
              ) : (
                <>
                  Login <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>

          {/* Footer Back Button */}
          <div className="mt-8 text-center pt-2 border-t border-white/5">
            <button
              onClick={() => navigate('/')}
              className="text-gold/60 hover:text-white text-xs font-semibold tracking-wider transition-colors cursor-pointer"
            >
              ← Back to Main Website
            </button>
          </div>

        </div>
      </motion.div>
    </div>
  );
}
