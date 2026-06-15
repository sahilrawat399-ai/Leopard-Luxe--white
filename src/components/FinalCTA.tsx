import { motion } from 'motion/react';
import { ArrowRight, MessageCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export function FinalCTA() {
  const navigate = useNavigate();

  return (
    <section className="relative py-40 bg-rich-black overflow-hidden flex items-center justify-center border-t border-gold/20">
      {/* Background radial gradient */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(212,175,55,0.15)_0%,rgba(10,10,10,1)_70%)]" />

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
            <button 
              onClick={() => navigate('/discovery')}
              className="group relative w-full sm:w-auto px-10 py-5 bg-gold text-rich-black rounded-full font-bold tracking-wide overflow-hidden transition-all hover:scale-105 active:scale-95 shadow-[0_0_30px_rgba(212,175,55,0.3)]">
              <div className="absolute inset-0 w-0 bg-white transition-all duration-500 ease-out group-hover:w-full"></div>
              <span className="relative flex items-center justify-center gap-2 group-hover:text-rich-black z-10 transition-colors">
                Book A Strategy Call <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </span>
            </button>

            <a 
              href="https://wa.me/919717550681" target="_blank" rel="noopener noreferrer"
              className="w-full sm:w-auto flex items-center justify-center gap-3 px-10 py-5 font-semibold text-rich-black tracking-wide rounded-full bg-gradient-to-r from-[#D4AF37] to-[#B8860B] shadow-[0_0_20px_rgba(212,175,55,0.4)] hover:scale-105 transition-all"
            >
              <MessageCircle className="w-5 h-5" />
              Chat With Leopard Luxe
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
