import { motion } from 'motion/react';
import { useState } from 'react';
import { Plus, Minus } from 'lucide-react';

const faqs = [
  { question: "How long until we see tangible results?", answer: "While initial optimizations yield quick wins within 14-30 days, substantial, compounding revenue scaling typically crystallizes between months 3 and 6 as our systems mature and machine learning models optimize." },
  { question: "Do you require long-term contracts?", answer: "We partner with brands serious about long-term growth. We require a minimum 6-month commitment to ensure we have the runway to build, test, and scale revenue-generating systems properly." },
  { question: "Who handles ad spend?", answer: "Ad spend is billed directly to your corporate cards by the ad platforms. Our retainer covers full active management, creative direction, and strategic optimization of those budgets." },
  { question: "Do you design creatives?", answer: "Yes. Our elite in-house creative team designs high-converting, performance-focused assets (videos, statics, UGC briefing) engineered specifically for luxury and e-commerce scaling." },
  { question: "Can you scale Shopify businesses?", answer: "Shopify scaling is our core expertise. We handle everything from headless architecture and conversion rate optimization to advanced retention flows and aggressive acquisition modeling." },
  { question: "What industries do you work with?", answer: "We exclusively partner with high-potential Shopify brands, luxury E-commerce businesses, elite fashion labels, premium service providers, and funded startups poised for aggressive scaling." }
];

export function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleOpen = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="py-32 bg-rich-black relative border-t border-white/5">
      <div className="container mx-auto px-6 lg:px-12 relative z-10 max-w-4xl">
        <div className="text-center mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="font-serif text-4xl md:text-5xl text-white tracking-tight">
              Frequently Asked Questions
            </h2>
          </motion.div>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="glass-panel border-white/10 rounded-xl overflow-hidden"
            >
              <button
                onClick={() => toggleOpen(index)}
                className="w-full px-8 py-6 flex items-center justify-between text-left focus:outline-none group"
              >
                <span className={`font-serif text-lg md:text-xl transition-colors ${openIndex === index ? 'text-gold' : 'text-white group-hover:text-gold-400'}`}>
                  {faq.question}
                </span>
                <span className="shrink-0 flex items-center justify-center w-8 h-8 rounded-full bg-white/5 group-hover:bg-gold/10 transition-colors">
                  {openIndex === index ? (
                    <Minus className="w-4 h-4 text-gold" />
                  ) : (
                    <Plus className="w-4 h-4 text-white group-hover:text-gold" />
                  )}
                </span>
              </button>
              
              <motion.div
                initial={false}
                animate={{ height: openIndex === index ? 'auto' : 0, opacity: openIndex === index ? 1 : 0 }}
                transition={{ duration: 0.3 }}
                className="overflow-hidden"
              >
                <div className="px-8 pb-6 text-gray-400 font-sans leading-relaxed border-t border-white/5 pt-4">
                  {faq.answer}
                </div>
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
