import { motion } from 'motion/react';
import { useState } from 'react';
import { Check } from 'lucide-react';

const plans = [
  {
    name: "Growth Starter",
    priceMonthly: "₹55,000",
    priceYearly: "₹5,00,000+",
    features: [
      "Professional Website",
      "Landing Page Creation",
      "Social Media Campaign Setup",
      "Monthly Reporting",
      "Basic Growth Strategy"
    ],
    buttonText: "Get Started",
    highlight: false
  },
  {
    name: "Growth Accelerator",
    priceMonthly: "₹82,000",
    priceYearly: "₹9,00,000+",
    features: [
      "Everything in Starter",
      "Dedicated Growth Manager",
      "Performance Marketing",
      "Advanced Funnel Optimization",
      "Weekly Strategy Calls",
      "Scaling Roadmap"
    ],
    buttonText: "Scale My Business",
    highlight: false
  },
  {
    name: "Leopard Luxe Elite",
    priceMonthly: "₹2,49,999",
    priceYearly: "₹30,00,000+",
    features: [
      "Complete Business Management",
      "International Marketing",
      "Premium Creative Team",
      "Dedicated Growth Department",
      "Revenue Scaling Systems",
      "Priority Support"
    ],
    buttonText: "Book Consultation",
    highlight: true
  }
];

export function Pricing() {
  const [isYearly, setIsYearly] = useState(false);

  return (
    <section className="py-32 bg-rich-black relative border-t border-white/5">
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-gold/50 to-transparent opacity-50" />
      
      <div className="container mx-auto px-6 lg:px-12 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl text-white mb-8 tracking-tight">
              Investment Plans Designed For <span className="text-transparent bg-clip-text bg-gradient-to-r from-gold-400 to-gold-600">Serious Growth</span>
            </h2>
            
            <div className="flex items-center justify-center gap-4 mt-8">
              <span className={`text-sm font-medium transition-colors ${!isYearly ? 'text-white' : 'text-gray-500'}`}>Monthly</span>
              <button
                onClick={() => setIsYearly(!isYearly)}
                className="w-16 h-8 rounded-full bg-white/10 relative p-1 transition-colors hover:bg-white/20 border border-white/10 focus:outline-none"
              >
                <div 
                  className={`w-6 h-6 rounded-full bg-gold transition-transform duration-300 ease-in-out ${isYearly ? 'transform translate-x-8' : ''}`} 
                />
              </button>
              <span className={`text-sm font-medium transition-colors ${isYearly ? 'text-white' : 'text-gray-500'}`}>
                Yearly <span className="text-gold text-xs ml-1">(Save 20%)</span>
              </span>
            </div>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center max-w-7xl mx-auto">
          {plans.map((plan, index) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.15 }}
              className={`relative rounded-3xl p-8 xl:p-10 ${
                plan.highlight 
                  ? 'bg-gradient-to-b from-[#1a1814] to-rich-black border border-gold shadow-[0_0_30px_rgba(212,175,55,0.15)] md:-translate-y-4' 
                  : 'glass-panel border border-white/10'
              }`}
            >
              {plan.highlight && (
                <div className="absolute top-0 right-0 left-0 flex justify-center -translate-y-1/2">
                  <span className="bg-gold text-rich-black text-xs font-bold tracking-widest uppercase py-1.5 px-4 rounded-full">
                    Most Popular
                  </span>
                </div>
              )}
              
              <h3 className={`font-serif text-2xl mb-2 ${plan.highlight ? 'text-gold' : 'text-white'}`}>
                {plan.name}
              </h3>
              
              <div className="mb-8">
                <span className="text-4xl font-bold text-white">
                  {isYearly ? plan.priceYearly : plan.priceMonthly}
                </span>
                {!isYearly && <span className="text-gray-400 text-sm ml-2">/month</span>}
                {isYearly && <span className="text-gray-400 text-sm ml-2">/year</span>}
              </div>

              <div className="w-full h-px bg-white/10 mb-8" />

              <ul className="space-y-4 mb-10">
                {plan.features.map((feature, fIndex) => (
                  <li key={fIndex} className="flex items-start text-sm text-gray-300">
                    <Check className={`w-5 h-5 mr-3 shrink-0 ${plan.highlight ? 'text-gold' : 'text-white/50'}`} />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>

              <button 
                className={`w-full py-4 rounded-full font-medium tracking-wide transition-all ${
                  plan.highlight 
                    ? 'bg-gold text-rich-black hover:bg-white hover:shadow-[0_0_20px_rgba(212,175,55,0.4)]' 
                    : 'bg-white/10 text-white hover:bg-white focus:text-rich-black hover:text-rich-black border border-white/20'
                }`}
              >
                {plan.buttonText}
              </button>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
