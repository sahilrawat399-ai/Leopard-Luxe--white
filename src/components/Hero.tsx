import { motion } from 'motion/react';
import { ArrowRight, Play, TrendingUp, ShieldCheck } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export function Hero() {
  const navigate = useNavigate();

  return (
    <section className="relative min-h-screen flex items-center justify-center bg-white text-rich-black overflow-hidden pt-36 pb-16">
      {/* Moving Premium Gradients & Ambient Glow */}
      <div className="absolute inset-0 z-0 overflow-hidden bg-white/40">
        <motion.div
           className="absolute top-[-20%] left-[-10%] w-[70vw] h-[70vw] rounded-full bg-gradient-to-br from-gold-400/20 to-transparent blur-[120px] mix-blend-multiply"
           animate={{
             x: [0, 50, 0],
             y: [0, 30, 0],
             scale: [1, 1.05, 1],
           }}
           transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
        />
        <motion.div
           className="absolute bottom-[-20%] right-[-10%] w-[60vw] h-[60vw] rounded-full bg-gradient-to-tl from-gold-600/15 to-transparent blur-[150px] mix-blend-multiply"
           animate={{
             x: [0, -50, 0],
             y: [0, -30, 0],
             scale: [1, 1.1, 1],
           }}
           transition={{ duration: 18, repeat: Infinity, ease: "linear" }}
        />
        <motion.div
           className="absolute top-[20%] right-[20%] w-[40vw] h-[40vw] rounded-full bg-gold/10 blur-[100px] mix-blend-multiply"
           animate={{
             x: [0, 30, -30, 0],
             y: [0, 60, -30, 0],
           }}
           transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
        />
      </div>

      {/* Floating Particles & Light Trails */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        {/* Subtle Light Trails */}
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={`trail-${i}`}
            className="absolute bg-gradient-to-t from-transparent via-gold-400/20 to-transparent blur-[1px] rounded-full"
            style={{
              width: Math.random() * 2 + 1 + 'px',
              height: Math.random() * 200 + 100 + 'px',
              left: Math.random() * 100 + '%',
              top: '100%',
              opacity: 0,
            }}
            animate={{
              y: ['0vh', '-120vh'],
              opacity: [0, 1, 0],
            }}
            transition={{
              duration: Math.random() * 10 + 15,
              repeat: Infinity,
              ease: 'linear',
              delay: Math.random() * 10,
            }}
          />
        ))}

        {/* Premium Floating Particles */}
        {[...Array(30)].map((_, i) => (
          <motion.div
            key={`gold-part-${i}`}
            className="absolute rounded-full bg-gradient-to-br from-gold-400 to-gold-600 shadow-[0_0_12px_rgba(212,175,55,0.8)]"
            style={{
              width: Math.random() * 3 + 1 + 'px',
              height: Math.random() * 3 + 1 + 'px',
              top: Math.random() * 100 + '%',
              left: Math.random() * 100 + '%',
            }}
            animate={{
              y: [0, Math.random() * -120 - 40],
              x: [0, Math.random() * 80 - 40],
              opacity: [0, 0.8, 0],
              scale: [0.5, 1.2, 0.5],
            }}
            transition={{
              duration: Math.random() * 10 + 8,
              repeat: Infinity,
              ease: 'easeInOut',
              delay: Math.random() * 5,
            }}
          />
        ))}

        {/* Glow Spheres */}
        {[...Array(4)].map((_, i) => (
          <motion.div
            key={`glow-${i}`}
            className="absolute rounded-full bg-white/60 blur-md pointer-events-none"
            style={{
              width: Math.random() * 15 + 10 + 'px',
              height: Math.random() * 15 + 10 + 'px',
              top: Math.random() * 100 + '%',
              left: Math.random() * 100 + '%',
            }}
            animate={{
              y: [0, -80, 0],
              x: [0, 40, 0],
              opacity: [0, 0.4, 0],
            }}
            transition={{
              duration: Math.random() * 12 + 10,
              repeat: Infinity,
              ease: 'easeInOut',
              delay: Math.random() * 5,
            }}
          />
        ))}
      </div>

      {/* Floating Elements (Revenue Graph) */}
      <motion.div
        drag
        dragConstraints={{ left: 0, right: 0, top: 0, bottom: 0 }}
        className="absolute hidden lg:flex top-32 right-32 z-10 bg-white/80 backdrop-blur-xl p-4 rounded-xl shadow-[0_20px_50px_rgba(212,175,55,0.15)] border border-gold/20 items-center gap-4 cursor-pointer"
        animate={{ y: [0, -15, 0] }}
        transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
      >
        <div className="w-12 h-12 rounded-full bg-gold/10 flex items-center justify-center">
          <TrendingUp className="text-gold w-6 h-6" />
        </div>
        <div>
          <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Revenue Growth</p>
          <p className="font-serif text-2xl font-bold text-rich-black">+320%</p>
        </div>
      </motion.div>

      <div className="relative z-10 container mx-auto px-6 lg:px-12 flex flex-col items-center text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2 }}
        >
          <span className="inline-block py-1 px-4 rounded-full border border-gold/30 bg-gold/5 text-gold-600 font-medium text-sm tracking-widest mb-6">
            THE PREMIER GROWTH AGENCY
          </span>
        </motion.div>
        
        <motion.h1
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.2, delay: 0.4, ease: "easeOut" }}
          className="font-serif text-5xl md:text-7xl lg:text-8xl font-bold leading-tight max-w-5xl tracking-tight text-rich-black mb-8"
        >
          BUILDING BRANDS.<br/>
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-gold-600 to-gold-400">SCALING BUSINESSES.</span><br/>
          MULTIPLYING REVENUE.
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.6 }}
          className="text-lg md:text-xl font-sans text-gray-600 max-w-3xl mb-12 leading-relaxed"
        >
          We help ambitious brands dominate their market through high-converting websites, 
          performance marketing, social media growth, and strategic business scaling.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.8 }}
          className="flex flex-col sm:flex-row items-center gap-6"
        >
          <button 
            onClick={() => navigate('/discovery')}
            className="group relative px-8 py-4 bg-rich-black text-white rounded-full font-medium tracking-wide overflow-hidden transition-all hover:scale-105 active:scale-95 shadow-[0_0_40px_rgba(10,10,10,0.2)]"
          >
            <div className="absolute inset-0 w-0 bg-gold transition-all duration-500 ease-out group-hover:w-full"></div>
            <span className="relative flex items-center gap-2 group-hover:text-rich-black z-10 transition-colors">
              Book A Strategy Call <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </span>
          </button>

          <button className="flex items-center gap-3 px-8 py-4 font-medium text-rich-black tracking-wide hover:opacity-70 transition-opacity">
            <div className="w-10 h-10 rounded-full border border-rich-black/20 flex items-center justify-center bg-gray-50 group-hover:bg-gray-100 transition-colors">
              <Play className="w-4 h-4 ml-1" />
            </div>
            View Success Stories
          </button>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.2 }}
          className="mt-20 flex items-center gap-3 text-sm font-medium text-gray-500 border-t border-gray-200 pt-8"
        >
          <ShieldCheck className="w-5 h-5 text-gold" />
          Trusted By 50+ Growing Brands Worldwide
        </motion.div>
      </div>

      {/* Smooth Scroll Indicator */}
      <motion.div
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 1 }}
      >
        <span className="text-[10px] tracking-[0.2em] uppercase text-gray-400 font-semibold">Scroll</span>
        <div className="w-[1px] h-12 bg-gray-300 relative overflow-hidden">
          <motion.div 
            className="absolute top-0 left-0 w-full h-1/2 bg-gold"
            animate={{ y: [0, 50, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          />
        </div>
      </motion.div>
    </section>
  );
}
