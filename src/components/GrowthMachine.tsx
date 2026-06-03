import { motion } from 'motion/react';

const steps = [
  { step: '01', title: 'Business Audit', desc: 'Deep dive into current metrics, assets, and bottlenecks.' },
  { step: '02', title: 'Growth Strategy', desc: 'Custom roadmap to scale revenue and market share.' },
  { step: '03', title: 'System Setup', desc: 'Deploying high-converting funnels and tracking.' },
  { step: '04', title: 'Scale Revenue', desc: 'Aggressive client acquisition and retention systems.' },
  { step: '05', title: 'Market Domination', desc: 'Becoming the category leader in your industry.' },
];

export function GrowthMachine() {
  return (
    <section className="py-32 bg-rich-black relative border-t border-white/5 overflow-hidden">
      <div className="container mx-auto px-6 lg:px-12 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-24">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl text-white mt-4 tracking-tight">
              Our Growth Machine
            </h2>
            <p className="text-gray-400 mt-6 text-lg">The exact framework we use to scale brands predictably.</p>
          </motion.div>
        </div>

        <div className="relative max-w-5xl mx-auto">
          {/* Central Line */}
          <div className="absolute left-[28px] md:left-1/2 top-0 bottom-0 w-[1px] bg-white/10 md:-translate-x-1/2">
            <motion.div 
              className="absolute top-0 left-0 w-full bg-gradient-to-b from-gold via-gold to-transparent"
              initial={{ height: 0 }}
              whileInView={{ height: '100%' }}
              viewport={{ once: true }}
              transition={{ duration: 2.5, ease: 'easeInOut' }}
            />
          </div>

          <div className="space-y-12 md:space-y-24">
            {steps.map((step, index) => {
              const isEven = index % 2 === 0;
              return (
                <div key={index} className="relative flex flex-col md:flex-row items-center md:justify-between group">
                  
                  {/* Left Side (Empty on mobile, text on desktop if even) */}
                  <div className={`md:w-[45%] pl-20 md:pl-0 ${isEven ? 'md:text-right md:pr-16 order-2 md:order-1' : 'md:order-1 opacity-0 hidden md:block'}`}>
                    {isEven && (
                      <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true, margin: '-100px' }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                      >
                        <h3 className="text-2xl font-serif text-white mb-3 group-hover:text-gold transition-colors">{step.title}</h3>
                        <p className="text-gray-400 text-sm leading-relaxed">{step.desc}</p>
                      </motion.div>
                    )}
                  </div>

                  {/* Center Node */}
                  <div className="absolute left-0 md:left-1/2 top-0 md:top-1/2 -translate-y-0 md:-translate-y-1/2 md:-translate-x-1/2 z-10 w-14 h-14 rounded-full bg-rich-black border-2 border-white/20 flex items-center justify-center group-hover:border-gold transition-colors duration-500 shadow-[0_0_0_10px_#0a0a0a]">
                    <div className="absolute inset-0 bg-gold/10 rounded-full scale-0 group-hover:scale-100 transition-transform duration-500" />
                    <span className="font-serif text-gold font-bold text-lg relative z-10">{step.step}</span>
                  </div>

                  {/* Right Side (Text on mobile, text on desktop if odd) */}
                  <div className={`md:w-[45%] pl-20 md:pl-16 ${!isEven ? 'order-2' : 'md:opacity-0 md:hidden block order-2 pt-2'}`}>
                    {(!isEven || true) && (
                      <motion.div
                        initial={{ opacity: 0, x: isEven ? 0 : 30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true, margin: '-100px' }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className={isEven ? 'md:hidden' : ''}
                      >
                        <h3 className="text-2xl font-serif text-white mb-3 group-hover:text-gold transition-colors">{step.title}</h3>
                        <p className="text-gray-400 text-sm leading-relaxed">{step.desc}</p>
                      </motion.div>
                    )}
                  </div>

                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
