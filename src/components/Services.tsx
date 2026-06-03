import { motion } from 'motion/react';
import { MonitorSmartphone, Code, TrendingUp, Target, Users, Gem, BrainCircuit, ArrowUpRight } from 'lucide-react';

const services = [
  {
    title: 'Website Development',
    features: ['Shopify Stores', 'Landing Pages', 'Conversion Optimization', 'Premium UI/UX'],
    icon: <MonitorSmartphone className="w-8 h-8 text-gold" />
  },
  {
    title: 'Performance Marketing',
    features: ['Meta Ads', 'Google Ads', 'Lead Generation', 'Revenue Scaling'],
    icon: <TrendingUp className="w-8 h-8 text-gold" />
  },
  {
    title: 'Social Media Growth',
    features: ['Instagram Growth', 'Content Strategy', 'Brand Positioning', 'Audience Building'],
    icon: <Users className="w-8 h-8 text-gold" />
  },
  {
    title: 'Business Scaling',
    features: ['Sales Systems', 'Growth Frameworks', 'Customer Acquisition', 'Revenue Expansion'],
    icon: <Target className="w-8 h-8 text-gold" />
  },
  {
    title: 'Business Consulting',
    features: ['Growth Strategy', 'Funnel Optimization', 'Brand Development', 'Market Expansion'],
    icon: <BrainCircuit className="w-8 h-8 text-gold" />
  }
];

export function Services() {
  return (
    <section className="py-32 bg-rich-black relative">
      <div className="container mx-auto px-6 lg:px-12 relative z-10">
        
        <div className="text-center max-w-3xl mx-auto mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <span className="text-gold tracking-[0.2em] uppercase text-xs font-semibold">Our Expertise</span>
            <h2 className="font-serif text-4xl md:text-6xl text-white mt-4 mb-6">Complete growth solutions for ambitious businesses.</h2>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: index * 0.1 }}
              className="group glass-panel rounded-2xl p-10 hover:border-gold/30 transition-all duration-500 hover:-translate-y-2 relative overflow-hidden"
            >
              {/* Background Glow */}
              <div className="absolute inset-0 bg-gradient-to-br from-gold/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
              
              <div className="relative z-10">
                <div className="w-16 h-16 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center mb-8 group-hover:bg-gold/10 group-hover:border-gold/20 transition-colors duration-500">
                  {service.icon}
                </div>
                
                <h3 className="text-2xl font-serif text-white mb-6 flex items-center justify-between">
                  {service.title}
                  <ArrowUpRight className="w-5 h-5 text-gray-600 group-hover:text-gold transition-colors duration-300 transform group-hover:translate-x-1 group-hover:-translate-y-1" />
                </h3>
                
                <ul className="space-y-4">
                  {service.features.map((feature, fIndex) => (
                    <li key={fIndex} className="flex items-center text-gray-400 text-sm font-medium">
                      <div className="w-1.5 h-1.5 rounded-full bg-gold/50 mr-3 group-hover:bg-gold transition-colors" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
