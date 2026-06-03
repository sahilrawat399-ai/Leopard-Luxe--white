import { motion } from 'motion/react';
import { Star, ShieldCheck, HeartHandshake, LineChart, Zap, Handshake } from 'lucide-react';

const reasons = [
  { title: "Luxury-Level Execution", icon: <Star className="w-6 h-6 text-gold" /> },
  { title: "Dedicated Growth Team", icon: <UsersGroupIcon /> },
  { title: "ROI-Focused Strategy", icon: <LineChart className="w-6 h-6 text-gold" /> },
  { title: "Data-Driven Decisions", icon: <ShieldCheck className="w-6 h-6 text-gold" /> },
  { title: "Fast Delivery", icon: <Zap className="w-6 h-6 text-gold" /> },
  { title: "Long-Term Partnership", icon: <Handshake className="w-6 h-6 text-gold" /> },
];

function UsersGroupIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gold">
      <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
      <path d="M16 3.13a4 4 0 0 1 0 7.75" />
    </svg>
  );
}

export function WhyPartner() {
  return (
    <section className="py-32 bg-rich-black relative border-t border-white/5">
      <div className="container mx-auto px-6 lg:px-12 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <span className="text-gold tracking-[0.2em] uppercase text-xs font-semibold">The Leopard Luxe Standard</span>
            <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl text-white mt-4 tracking-tight">
              Why Industry Leaders Choose Leopard Luxe
            </h2>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {reasons.map((reason, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              whileInView={{ opacity: 1, scale: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="glass-panel p-8 rounded-xl flex items-center gap-6 hover:bg-white/5 transition-colors duration-300 border border-white/5 hover:border-gold/30 group"
            >
              <div className="w-14 h-14 rounded-full bg-black border border-white/10 flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform duration-500">
                {reason.icon}
              </div>
              <h3 className="text-xl font-serif text-white group-hover:text-gold-400 transition-colors">
                {reason.title}
              </h3>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
