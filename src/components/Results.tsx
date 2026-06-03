import { motion } from 'motion/react';

const results = [
  { label: 'Fashion Brand', metric: 'Revenue Growth', value: '+320%' },
  { label: 'Luxury Skincare', metric: 'ROAS', value: '8.7X' },
  { label: 'Shopify Store', metric: 'Revenue Growth', value: '+540%' },
  { label: 'Service Business', metric: 'Lead Growth', value: '+400%' },
];

export function Results() {
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
            <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl text-white tracking-tight">
              Proven Results. <span className="italic text-gold font-light">Measurable Growth.</span>
            </h2>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {results.map((result, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="glass-panel p-10 rounded-3xl relative overflow-hidden group"
            >
              {/* Animated Chart Background */}
              <div className="absolute inset-0 opacity-10 flex items-end justify-between px-4 pb-4 w-full h-[60%] mt-auto pointer-events-none">
                {[...Array(6)].map((_, i) => (
                  <motion.div
                    key={i}
                    className="w-8 bg-gradient-to-t from-gold to-transparent rounded-t-sm"
                    initial={{ height: 10 + (Math.random() * 20) + '%' }}
                    whileInView={{ height: (30 + i * 15 + Math.random() * 10) + '%' }}
                    viewport={{ once: true }}
                    transition={{ duration: 1.5, delay: 0.3 + (i * 0.1), ease: "easeOut" }}
                  />
                ))}
              </div>

              <div className="relative z-10">
                <span className="text-gray-400 text-sm tracking-[0.2em] uppercase font-semibold block mb-4">
                  {result.label}
                </span>
                
                <h3 className="font-serif text-6xl text-white mb-2 leading-none group-hover:text-gold transition-colors duration-500">
                  {result.value}
                </h3>
                
                <p className="text-lg text-white/80 font-medium">
                  {result.metric}
                </p>
                
                <div className="mt-8 pt-8 border-t border-white/10 flex items-center text-sm font-medium text-gold cursor-pointer group-hover:text-white transition-colors">
                  View Full Case Study 
                  <motion.span className="ml-2" group-hover={{ x: 5 }} transition={{ duration: 0.2 }}>→</motion.span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
