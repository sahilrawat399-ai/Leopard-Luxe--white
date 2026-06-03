import { motion } from 'motion/react';
import { Quote } from 'lucide-react';

const testimonials = [
  { name: "Alexander Wright", company: "Aura Aesthetics", review: "Leopard Luxe completely transformed our digital presence. Our ROAS increased by 400% within the first quarter of our partnership." },
  { name: "Sophia Laurent", company: "Maison Laurent", review: "Their understanding of luxury branding and e-commerce mechanics is unmatched. We scaled to 8-figures smoothly." },
  { name: "James Sterling", company: "Sterling Timepieces", review: "Not just another agency. They act as a legitimate growth partner. The systems they implemented are world-class." },
  { name: "Elena Rostova", company: "Rostova Beauty", review: "The website they built for us feels incredibly premium. Conversion rates jumped from 1.2% to 4.5% in a month." },
  { name: "Marcus Chen", company: "Vanguard Tech", review: "Their performance marketing team scales campaigns violently while maintaining target CAC. Highly impressed." },
  { name: "Isabella Rossi", company: "Rossi Milano", review: "From strategy to execution, Leopard Luxe represents the pinnacle of digital consulting for high-end brands." },
  { name: "William Harrington", company: "Harrington & Co.", review: "Professional, data-driven, and relentlessly focused on revenue. They rebuilt our entire sales funnel." },
  { name: "Olivia Pierce", company: "Pierce Collection", review: "We struggled to scale past $100k/mo. Leopard Luxe broke that ceiling and took us to $500k/mo in 6 months." },
  { name: "Julian Alistair", company: "Alistair Estates", review: "Their luxury positioning strategy helped us increase our pricing by 40% without losing conversion volume." },
  { name: "Chloe Devereux", company: "Devereux Paris", review: "The most capable growth team we have ever partnered with. The ROI has been absolutely phenomenal." },
  { name: "Daniel Thorne", company: "Thorne Logistics", review: "They don't just run ads; they build comprehensive growth engines. Our brand equity has skyrocketed." },
  { name: "Victoria Kensington", company: "Kensington Jewels", review: "Flawless execution. The glassmorphism and gold theme they designed for our site elevated our entire brand." },
  { name: "Lucas Vance", company: "Vance Automotive", review: "Aggressive growth paired with elegant branding. They understand how to sell high-ticket products online." },
  { name: "Mia Valiente", company: "Valiente Couture", review: "Leopard Luxe is the secret weapon for our Q4 scaling. Their strategic insights are incredibly sharp." },
  { name: "Sebastian Cole", company: "Cole Architecture", review: "They completely redefined our lead generation process, bringing in high-value, qualified prospects consistently." }
];

export function Testimonials() {
  return (
    <section className="py-32 bg-rich-black relative border-t border-white/5 overflow-hidden">
      <div className="container mx-auto px-6 lg:px-12 relative z-10 mb-16">
        <div className="text-center max-w-3xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <span className="text-gold tracking-[0.2em] uppercase text-xs font-semibold">Client Experience</span>
            <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl text-white mt-4 tracking-tight">
              What Elite Founders Say
            </h2>
          </motion.div>
        </div>
      </div>

      <div className="relative flex overflow-x-hidden w-full group mask-image-fade">
        <div className="animate-marquee flex gap-6 py-4 whitespace-nowrap min-w-full hover:[animation-play-state:paused]">
          {[...testimonials, ...testimonials].map((testimonial, index) => (
            <div 
              key={index} 
              className="glass-panel w-[400px] shrink-0 p-8 rounded-2xl border-l-[3px] border-l-gold/50 flex flex-col justify-between hover:bg-white/5 transition-colors whitespace-normal"
            >
              <div>
                <Quote className="w-8 h-8 text-gold/30 mb-6" />
                <p className="text-gray-300 font-serif italic text-lg leading-relaxed mb-8">
                  "{testimonial.review}"
                </p>
              </div>
              <div className="flex items-center gap-4 border-t border-white/10 pt-6">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-gold-400 to-gold-600 flex items-center justify-center text-rich-black font-bold font-serif text-xl border-2 border-white/10">
                  {testimonial.name.charAt(0)}
                </div>
                <div>
                  <h4 className="text-white font-semibold">{testimonial.name}</h4>
                  <p className="text-gold text-xs tracking-wider uppercase font-medium">{testimonial.company}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      
      <style>{`
        .mask-image-fade {
          mask-image: linear-gradient(to right, transparent, black 10%, black 90%, transparent);
          -webkit-mask-image: linear-gradient(to right, transparent, black 10%, black 90%, transparent);
        }
      `}</style>
    </section>
  );
}
