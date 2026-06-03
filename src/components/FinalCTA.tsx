import { motion } from 'motion/react';
import { ArrowRight, MessageCircle } from 'lucide-react';

export function FinalCTA() {
  return (
    <section className="relative py-40 bg-rich-black overflow-hidden flex items-center justify-center border-t border-gold/20">
      {/* Background radial gradient */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(212,175,55,0.15)_0%,rgba(10,10,10,1)_70%)]" />
      
      {/* Golden Leopard Watermark / Abstract Shape */}
      <motion.div 
        className="absolute inset-0 flex items-center justify-center opacity-[0.03] pointer-events-none"
        animate={{ scale: [1, 1.05, 1], rotate: [0, 2, 0] }}
        transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
      >
        <svg viewBox="0 0 24 24" fill="none" stroke="url(#goldGradient)" strokeWidth={0.5} className="w-[800px] h-[800px]">
          <defs>
            <linearGradient id="goldGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#D4AF37" />
              <stop offset="100%" stopColor="#B89626" />
            </linearGradient>
          </defs>
          <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" />
        </svg>
      </motion.div>

      <div className="relative z-10 container mx-auto px-6 lg:px-12 text-center max-w-4xl">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: "easeOut" }}
        >
          <h2 className="font-serif text-5xl md:text-7xl font-bold text-white mb-8 tracking-tight">
            Ready To Scale<br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-gold-400 via-gold to-gold-600">Your Business?</span>
          </h2>
          
          <p className="text-xl text-gray-300 mb-12 font-sans font-light max-w-2xl mx-auto leading-relaxed">
            Let's build the systems, strategies, and campaigns that drive real, measurable revenue growth.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
            <button className="group relative w-full sm:w-auto px-10 py-5 bg-gold text-rich-black rounded-full font-bold tracking-wide overflow-hidden transition-all hover:scale-105 active:scale-95 shadow-[0_0_30px_rgba(212,175,55,0.3)]">
              <div className="absolute inset-0 w-0 bg-white transition-all duration-500 ease-out group-hover:w-full"></div>
              <span className="relative flex items-center justify-center gap-2 group-hover:text-rich-black z-10 transition-colors">
                Book A Strategy Call <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </span>
            </button>

            <button className="w-full sm:w-auto flex items-center justify-center gap-3 px-10 py-5 font-semibold text-white tracking-wide rounded-full border border-white/20 hover:bg-white/5 transition-all">
              <MessageCircle className="w-5 h-5 text-green-500" />
              Chat On WhatsApp
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
