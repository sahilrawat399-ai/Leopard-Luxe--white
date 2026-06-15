import { motion } from 'motion/react';
import { useEffect, useState } from 'react';
import logoSvg from '/assets/images/logo-bg.png';

export function Preloader({ onComplete }: { onComplete: () => void }) {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
      setTimeout(onComplete, 1000); // Wait for fade out
    }, 2500);
    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <motion.div
      initial={{ opacity: 1 }}
      animate={{ opacity: loading ? 1 : 0 }}
      transition={{ duration: 1, ease: 'easeInOut' }}
      className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-rich-black overflow-hidden pointer-events-none"
    >
      {/* Abstract particles */}
      <div className="absolute inset-0 opacity-20">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full bg-gold"
            style={{
              width: Math.random() * 4 + 1 + 'px',
              height: Math.random() * 4 + 1 + 'px',
              top: Math.random() * 100 + '%',
              left: Math.random() * 100 + '%',
            }}
            animate={{
              y: [0, -100],
              opacity: [0, 1, 0],
            }}
            transition={{
              duration: Math.random() * 2 + 2,
              repeat: Infinity,
              ease: 'linear',
              delay: Math.random() * 2,
            }}
          />
        ))}
      </div>

      <motion.div
        initial={{ scale: 0.8, opacity: 0, filter: 'blur(10px)' }}
        animate={{ scale: 1, opacity: 1, filter: 'blur(0px)' }}
        transition={{ duration: 1.5, ease: 'easeOut' }}
        className="relative z-10 flex flex-col items-center"
      >
        <div className="w-36 h-24 flex items-center justify-center relative inner-glow">
          <div className="w-36 h-24 relative flex items-center justify-center">
            <img src={logoSvg} alt="Leopard Luxe Logo" className="w-36 h-24 object-contain" />
          </div>
        </div>
        
        <h1 className="font-serif text-3xl md:text-5xl text-transparent bg-clip-text bg-gradient-to-r from-gold-400 via-gold to-gold-600 tracking-widest uppercase">
          Leopard Luxe
        </h1>
        <motion.div 
          initial={{ width: 0 }}
          animate={{ width: "100%" }}
          transition={{ duration: 2, delay: 0.5, ease: "easeInOut" }}
          className="h-[1px] bg-gold mt-4 shadow-[0_0_10px_rgba(212,175,55,0.5)]"
        />
      </motion.div>
    </motion.div>
  );
}
