import { motion } from 'motion/react';

const stats = [
  { value: '50+', label: 'Brands Served' },
  { value: '₹100M+', label: 'Revenue Generated' },
  { value: '90%', label: 'Client Retention' },
  { value: 'Global', label: 'Growth Partner' },
];

export function SocialProof() {
  return (
    <section className="py-24 bg-rich-black relative border-t border-white/5 z-20">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(212,175,55,0.05)_0%,transparent_70%)] pointer-events-none" />
      
      <div className="container mx-auto px-6 lg:px-12 relative z-10">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, delay: index * 0.1 }}
              className="group relative flex flex-col items-center justify-center p-8 glass-panel-gold rounded-2xl overflow-hidden hover:-translate-y-2 transition-transform duration-500 cursor-default"
            >
              {/* Shine effect */}
              <div className="absolute top-0 -inset-full h-full w-1/2 z-5 block transform -skew-x-[30deg] bg-gradient-to-r from-transparent via-white/10 to-transparent opacity-0 group-hover:opacity-100 group-hover:animate-[shine_1.5s_ease-in-out_infinite]" />
              
              <h2 className="font-serif text-4xl md:text-5xl font-semibold text-gold mb-2 tracking-tight">
                {stat.value}
              </h2>
              <p className="font-sans text-sm md:text-base text-gray-400 font-medium tracking-wide uppercase text-center">
                {stat.label}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
