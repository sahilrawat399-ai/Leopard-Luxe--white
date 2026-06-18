import { motion, AnimatePresence } from 'motion/react';
import { useState, useEffect } from 'react';
import { Phone, ArrowRight, Menu, X } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuthStore } from '../stores/authStore';

import logoSvg from '/assets/images/logo-bg.png';

const desktopLinks = ['Services', 'Portfolio', 'Results', 'Pricing', 'FAQ'];
const mobileLinks = ['Home', 'Services', 'Portfolio', 'Process', 'Case Studies', 'Results', 'Pricing', 'FAQ', 'Contact'];

export function Header() {
  const { user } = useAuthStore();
  const isAdmin = user?.email?.toLowerCase() === 'sahilrawat399@gmail.com';
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <motion.header
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
        className="fixed top-4 md:top-6 left-0 right-0 mx-auto w-[calc(100%-2rem)] max-w-[1400px] h-[90px] rounded-[18px] z-[100] flex items-center justify-between px-6 lg:px-8 border border-gold/30 shadow-[0_0_30px_rgba(212,175,55,0.15)] bg-gradient-to-r from-[#050505]/95 to-[#111111]/95 backdrop-blur-xl overflow-hidden"
      >
        {/* Animated Gold Beam */}
        <div className="absolute top-0 -inset-full h-full w-1/2 z-0 block transform -skew-x-[30deg] bg-gradient-to-r from-transparent via-gold/10 to-transparent animate-[shine_5s_ease-in-out_infinite]" />

        {/* Subtle Gold Particles inside header */}
        <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
          {[...Array(5)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute rounded-full bg-gold/50"
              style={{
                width: Math.random() * 2 + 1 + 'px',
                height: Math.random() * 2 + 1 + 'px',
                top: Math.random() * 100 + '%',
                left: Math.random() * 100 + '%',
              }}
              animate={{
                y: [0, -10, 0],
                opacity: [0.1, 0.6, 0.1],
              }}
              transition={{
                duration: Math.random() * 3 + 2,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
            />
          ))}
        </div>

        {/* LEFT SECTION: Logo & Brand */}
        <div className="relative z-10 flex items-center gap-4 cursor-pointer">
          <Link to="/" className="w-20 h-12 relative flex items-center justify-center">
            <img src={logoSvg} alt="Leopard Luxe Logo" className="w-20 h-12 object-contain" />
          </Link>
          <div className="flex flex-col">
            <div className="font-serif text-xl tracking-[0.15em] font-bold leading-none mb-1 flex items-center">
              <span className="text-white">LEOPARD</span>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#D4AF37] to-[#B8860B] ml-2">LUXE</span>
            </div>
            <span className="text-[9px] tracking-[0.25em] text-gold/70 uppercase font-medium">
              Building Brands • Scaling Businesses
            </span>
          </div>
        </div>

        {/* CENTER NAVIGATION */}
        <nav className="relative z-10 hidden xl:flex items-center gap-8">
          {desktopLinks.map((link) => (
            <Link
              key={link}
              to={link === 'Portfolio' ? '/portfolio' : link === 'Services' ? '/services' : link === 'Results' ? '/results' : link === 'Pricing' ? '/pricing' : link === 'FAQ' ? '/faq' : `/#${link.toLowerCase().replace(' ', '-')}`}
              className="group relative font-sans text-xs tracking-[0.15em] text-white uppercase font-semibold py-2 hover:text-gold transition-colors duration-300"
            >
              {link}
              {/* Smooth underline animation */}
              <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-gradient-to-r from-[#D4AF37] to-[#B8860B] transition-all duration-300 group-hover:w-full rounded-full shadow-[0_0_8px_rgba(212,175,55,0.5)]"></span>
              
              {/* Shine effect on hover */}
              <span className="absolute inset-0 w-0 bg-gradient-to-r from-transparent via-white/10 to-transparent group-hover:w-full transition-all duration-500 opacity-0 group-hover:opacity-100 mix-blend-overlay"></span>
            </Link>
          ))}
          {isAdmin && (
            <Link
              to="/admin"
              className="group relative font-sans text-xs tracking-[0.15em] text-gold hover:text-white uppercase font-bold py-2 transition-colors duration-300"
            >
              Admin Panel
              <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-gradient-to-r from-[#D4AF37] to-[#B8860B] transition-all duration-300 group-hover:w-full rounded-full shadow-[0_0_8px_rgba(212,175,55,0.5)]"></span>
            </Link>
          )}
        </nav>

        {/* RIGHT SECTION: Buttons */}
        <div className="relative z-10 hidden lg:flex items-center gap-4">
          <Link to={user ? "/dashboard" : "/login"} className="hidden lg:inline-flex items-center justify-center gap-2 group border border-gold/30 hover:border-gold bg-transparent text-gold px-6 py-3 rounded-[14px] font-bold tracking-widest text-xs uppercase transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_0_15px_rgba(212,175,55,0.2)]">
            {user ? 'My Dashboard' : 'Sign In / Sign Up'}
          </Link>
          <button onClick={() => navigate('/discovery')} className="group relative flex items-center gap-2 px-6 py-3 rounded-[14px] font-bold tracking-widest text-xs uppercase text-rich-black transition-all duration-300 hover:-translate-y-1 shadow-[0_5px_20px_rgba(212,175,55,0.3)] bg-gradient-to-r from-[#D4AF37] to-[#B8860B] overflow-hidden">
            {/* Shine sweep */}
            <span className="absolute top-0 -inset-full h-full w-1/2 block transform -skew-x-[30deg] bg-gradient-to-r from-transparent via-white/40 to-transparent opacity-0 group-hover:opacity-100 group-hover:animate-[shine_1s_ease-in-out_infinite]" />
            <span className="relative z-10 flex items-center gap-2">
              Book Consultation
              <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
            </span>
          </button>
        </div>

        {/* MOBILE MENU TOGGLE */}
        <button
          className="lg:hidden relative z-50 p-2 text-white hover:text-gold transition-colors focus:outline-none"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X className="w-8 h-8" /> : <Menu className="w-8 h-8" />}
        </button>
      </motion.header>

      {/* MOBILE FULL-SCREEN MENU */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20, transition: { duration: 0.3 } }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
            className="fixed inset-0 z-[90] bg-rich-black flex flex-col items-center justify-start border-b border-gold/20 shadow-[0_20px_50px_rgba(212,175,55,0.1)] overflow-y-auto"
          >
            {/* Abstract Background for Mobile Menu */}
             <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(212,175,55,0.1)_0%,transparent_70%)] pointer-events-none" />
             
            <nav className="flex flex-col items-center gap-6 relative z-10 w-full pt-32 pb-24 px-6 min-h-screen">
              {mobileLinks.map((link, index) => (
                <Link
                  key={link}
                  to={link === 'Portfolio' ? '/portfolio' : link === 'Services' ? '/services' : link === 'Results' ? '/results' : link === 'Pricing' ? '/pricing' : link === 'FAQ' ? '/faq' : `/#${link.toLowerCase().replace(' ', '-')}`}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="font-serif text-3xl md:text-4xl text-white hover:text-gold transition-colors"
                >
                  <motion.span
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1, duration: 0.3 }}
                  >
                    {link}
                  </motion.span>
                </Link>
              ))}
              {isAdmin && (
                <Link
                  to="/admin"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="font-serif text-3xl md:text-4xl text-gold hover:text-white transition-colors font-bold"
                >
                  <motion.span
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: mobileLinks.length * 0.1, duration: 0.3 }}
                  >
                    Admin Panel
                  </motion.span>
                </Link>
              )}
              
              <motion.div 
                 initial={{ opacity: 0 }}
                 animate={{ opacity: 1 }}
                 transition={{ delay: 0.5 }}
                 className="flex flex-col items-center gap-4 mt-8 w-full max-w-sm"
              >
                 <Link
                   to={user ? "/dashboard" : "/login"}
                   onClick={() => setIsMobileMenuOpen(false)}
                   className="w-full flex items-center justify-center gap-2 px-5 py-4 rounded-[14px] border border-gold text-gold font-bold tracking-widest text-sm uppercase text-center cursor-pointer select-none"
                 >
                   {user ? 'My Dashboard' : 'Sign In / Sign Up'}
                 </Link>
                 <button className="w-full flex items-center justify-center gap-2 px-5 py-4 rounded-[14px] border border-gold/40 text-gold/80 font-medium tracking-widest text-sm uppercase cursor-pointer">
                   <Phone className="w-5 h-5" />
                   Call Us
                 </button>
                 <button className="w-full flex items-center justify-center gap-2 px-6 py-4 rounded-full font-bold tracking-widest text-sm uppercase text-rich-black bg-gradient-to-r from-[#D4AF37] to-[#B8860B] shadow-[0_5px_20px_rgba(212,175,55,0.3)]">
                   Book Consultation <ArrowRight className="w-5 h-5" />
                 </button>
              </motion.div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
