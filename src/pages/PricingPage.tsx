import { motion } from 'motion/react';
import { 
  ArrowRight, CheckCircle2, XCircle, Search, 
  Map, Lightbulb, Rocket, Settings, Code, 
  BarChart, Share2, Mail, Users, Gem, 
  TrendingUp, Shield, HelpCircle
} from 'lucide-react';
import { Link } from 'react-router-dom';

const steps = [
  {
    title: 'Discovery Call',
    desc: 'We learn about your business, goals, audience, and challenges.',
    icon: Search
  },
  {
    title: 'Strategy Planning',
    desc: 'Our team develops a custom growth strategy based on your objectives.',
    icon: Lightbulb
  },
  {
    title: 'Proposal & Roadmap',
    desc: 'You receive a personalized project proposal and implementation roadmap.',
    icon: Map
  },
  {
    title: 'Execution & Growth',
    desc: 'We launch, optimize, and scale your digital presence.',
    icon: Rocket
  }
];

const factors = [
  { title: 'Project Scope', icon: Map },
  { title: 'Number of Pages', icon: Code },
  { title: 'Website Features', icon: Settings },
  { title: 'SEO Requirements', icon: Search },
  { title: 'Advertising Goals', icon: TrendingUp },
  { title: 'Content Creation', icon: Gem },
  { title: 'Social Media', icon: Share2 },
  { title: 'Automation Systems', icon: Mail },
  { title: 'Lead Generation', icon: Users },
  { title: 'Industry Competition', icon: BarChart }
];

const reasons = [
  'Premium Design Standards',
  'Results-Driven Strategies',
  'Dedicated Support',
  'Growth-Focused Solutions',
  'Transparent Communication',
  'Long-Term Partnerships',
  'Custom Business Strategies'
];

const comparison = {
  cheap: [
    'Generic Templates',
    'Limited Support',
    'Poor User Experience',
    'Short-Term Thinking',
    'Weak Results'
  ],
  premium: [
    'Custom Strategy',
    'Premium Design',
    'Growth-Focused Execution',
    'Long-Term Partnership',
    'Measurable Business Results'
  ]
};

const faqs = [
  {
    q: 'How much does a project cost?',
    a: 'Every project is customized based on your goals and requirements.'
  },
  {
    q: 'Do you offer consultations?',
    a: 'Yes, we provide a free strategy consultation.'
  },
  {
    q: 'How quickly can we start?',
    a: 'Most projects can begin shortly after the discovery phase.'
  },
  {
    q: 'Do you work with businesses internationally?',
    a: 'Yes, we serve clients worldwide.'
  }
];

export function PricingPage() {
  return (
    <main className="bg-rich-black min-h-screen text-white pt-32 pb-20">
      
      {/* HERO SECTION */}
      <section className="relative px-6 lg:px-12 max-w-7xl mx-auto text-center mb-32 z-10">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(212,175,55,0.1)_0%,transparent_70%)] pointer-events-none -z-10" />
        
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
          <div className="inline-block border border-gold/30 bg-gold/5 rounded-full px-4 py-1.5 mb-6 backdrop-blur-sm">
            <span className="font-sans text-xs tracking-widest text-gold uppercase font-semibold">Custom Solutions</span>
          </div>
          <h1 className="font-serif text-4xl md:text-6xl lg:text-7xl font-bold mb-6 text-white leading-tight">
            Invest in Growth, <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-gold-400 via-gold to-gold-600">Not Just Marketing</span>
          </h1>
          <div className="text-gray-400 text-lg md:text-xl max-w-4xl mx-auto mb-10 leading-relaxed space-y-4">
            <p>Every business has different goals, challenges, and growth opportunities. That's why Leopard Luxe creates tailored digital solutions designed specifically for your business.</p>
            <p>Rather than offering one-size-fits-all packages, we build customized strategies that maximize results and deliver long-term value.</p>
          </div>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
            <button className="w-full sm:w-auto group relative inline-flex items-center justify-center gap-3 px-8 py-4 rounded-full font-bold tracking-widest text-sm uppercase text-rich-black transition-all duration-300 hover:scale-105 shadow-[0_10px_30px_rgba(212,175,55,0.3)] bg-gradient-to-r from-[#D4AF37] to-[#B8860B] overflow-hidden">
              <span className="absolute top-0 -inset-full h-full w-1/2 block transform -skew-x-[30deg] bg-gradient-to-r from-transparent via-white/40 to-transparent opacity-0 group-hover:opacity-100 group-hover:animate-[shine_1s_ease-in-out_infinite]" />
              <span className="relative z-10 flex items-center justify-center gap-2">
                Get a Custom Quote
                <ArrowRight className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" />
              </span>
            </button>
            <button className="w-full sm:w-auto text-center px-8 py-4 rounded-full border-2 border-gold text-gold font-bold tracking-widest text-sm uppercase transition-all duration-300 hover:bg-gold hover:text-rich-black">
               Book Free Consultation
            </button>
          </div>
        </motion.div>
      </section>

      {/* WHY NO FIXED PRICING */}
      <section className="relative px-6 lg:px-12 max-w-5xl mx-auto mb-32">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="bg-gradient-to-br from-[#111] to-[#0A0A0A] border border-gold/20 rounded-[2rem] p-8 md:p-16 lg:p-20 text-center shadow-[0_20px_50px_rgba(212,175,55,0.05)] relative overflow-hidden"
        >
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-gold to-transparent" />
          
          <h2 className="font-serif text-3xl md:text-5xl font-bold mb-8 text-white">
            Why We Believe Every Business Deserves a Custom Solution
          </h2>
          
          <div className="space-y-6 text-gray-400 text-lg md:text-xl leading-relaxed max-w-3xl mx-auto font-sans">
            <p>Imagine visiting an architect and asking for the price of a building before discussing the size, location, design, and purpose.</p>
            <p className="text-white font-medium">The same applies to digital marketing.</p>
            <p>A local business looking for a simple website has different needs than a growing company seeking advanced lead generation, SEO, advertising, and automation.</p>
            <p>At Leopard Luxe, we first understand your business, goals, industry, and growth vision before creating a tailored proposal.</p>
            <p className="text-gold font-serif text-2xl italic mt-8">This ensures you only invest in what truly delivers value.</p>
          </div>
        </motion.div>
      </section>

      {/* INVESTMENT PROCESS TIMELINE */}
      <section className="relative px-6 lg:px-12 max-w-7xl mx-auto mb-32">
        <div className="text-center mb-16">
          <h2 className="font-serif text-4xl md:text-5xl font-bold mb-4">The Leopard Luxe Investment Process</h2>
          <div className="w-24 h-1 bg-gradient-to-r from-gold-400 to-gold-600 mx-auto rounded-full"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 relative">
           {/* Connecting Line */}
           <div className="hidden lg:block absolute top-[40px] left-[10%] right-[10%] h-[2px] bg-gradient-to-r from-transparent via-gold/30 to-transparent -z-10" />

           {steps.map((step, index) => (
             <motion.div
               key={index}
               initial={{ opacity: 0, y: 20 }}
               whileInView={{ opacity: 1, y: 0 }}
               viewport={{ once: true }}
               transition={{ delay: index * 0.1, duration: 0.5 }}
               className="bg-[#050505] border border-white/10 rounded-3xl p-8 hover:border-gold/40 transition-colors relative group"
             >
               <div className="absolute top-0 right-8 w-1 h-8 bg-gold -mt-4 opacity-0 group-hover:opacity-100 transition-opacity" />
               <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-[#1A1A1A] to-[#0A0A0A] border border-gold/20 flex flex-col items-center justify-center mb-6 shadow-lg group-hover:scale-105 transition-transform">
                 <span className="text-gold font-serif font-bold text-sm mb-1">STEP {index + 1}</span>
                 <step.icon className="w-6 h-6 text-white" />
               </div>
               <h3 className="font-serif text-2xl font-bold text-white mb-3 group-hover:text-gold transition-colors">{step.title}</h3>
               <p className="text-gray-400 leading-relaxed">{step.desc}</p>
             </motion.div>
           ))}
        </div>
      </section>

      {/* WHAT DETERMINES YOUR INVESTMENT */}
      <section className="relative px-6 lg:px-12 max-w-7xl mx-auto mb-32">
        <div className="text-center mb-16">
          <h2 className="font-serif text-4xl md:text-5xl font-bold mb-4">What Determines Your Investment?</h2>
          <p className="text-gray-400 max-w-2xl mx-auto">Pricing is built strictly around the scope necessary to achieve your specific growth targets.</p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {factors.map((factor, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.05 }}
              className="bg-white/5 border border-white/5 hover:border-gold/30 hover:bg-gold/5 rounded-2xl p-6 flex flex-col items-center text-center transition-all group"
            >
              <factor.icon className="w-8 h-8 text-gold mb-4 group-hover:scale-110 transition-transform" />
              <span className="font-medium text-sm md:text-base text-gray-200">{factor.title}</span>
            </motion.div>
          ))}
        </div>
      </section>

      {/* TWO COLUMN: WHY CHOOSE US & ROI STORY */}
      <section className="relative px-6 lg:px-12 max-w-7xl mx-auto mb-32 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        {/* Why Clients Choose Us */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="font-serif text-3xl md:text-4xl font-bold mb-8">Our Clients Choose Leopard Luxe Because</h2>
          <ul className="space-y-4">
            {reasons.map((reason, idx) => (
              <li key={idx} className="flex items-center gap-4 bg-gradient-to-r from-[#111] to-transparent p-4 rounded-xl border border-white/5 hover:border-gold/20 transition-colors">
                <Shield className="w-5 h-5 text-gold shrink-0" />
                <span className="text-gray-200 font-medium">{reason}</span>
              </li>
            ))}
          </ul>
        </motion.div>

        {/* ROI Story */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="bg-gradient-to-b from-[#111] to-[#0A0A0A] border border-gold/20 rounded-3xl p-10 md:p-12 relative overflow-hidden h-full flex flex-col justify-center"
        >
          <div className="absolute top-0 right-0 p-8 opacity-5">
            <TrendingUp className="w-48 h-48 text-gold" />
          </div>
          
          <h2 className="font-serif text-3xl md:text-4xl font-bold mb-6 leading-tight relative z-10">
            The Question Isn't What It Costs.<br />
            <span className="text-gold">The Question Is What It Can Generate.</span>
          </h2>
          
          <div className="space-y-6 text-gray-400 relative z-10 leading-relaxed font-sans mt-4">
            <p>A professionally designed website that attracts new customers every month can become one of the most valuable assets your business owns.</p>
            <p>A strong SEO strategy can generate leads for years.</p>
            <p>A successful advertising campaign can produce returns far beyond the initial investment.</p>
            <div className="pt-4 border-t border-white/10">
              <p className="text-white font-medium italic">At Leopard Luxe, our focus is not on selling services. Our focus is helping businesses create measurable growth and sustainable success.</p>
            </div>
          </div>
        </motion.div>
      </section>

      {/* COMPARISON */}
      <section className="relative px-6 lg:px-12 max-w-5xl mx-auto mb-32">
        <div className="text-center mb-16">
          <h2 className="font-serif text-4xl md:text-5xl font-bold mb-4">Cheap Marketing vs Strategic Growth</h2>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 relative">
           <div className="hidden md:flex absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-rich-black border border-gold/30 rounded-full px-4 py-2 z-10 text-gold text-xs font-bold tracking-widest uppercase">
             VS
           </div>
           
           <motion.div 
             initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}
             className="bg-red-950/20 border border-red-500/20 rounded-3xl p-10"
           >
             <h3 className="font-serif text-2xl font-bold text-gray-300 mb-8 border-b border-red-500/20 pb-4">Cheap Solutions</h3>
             <ul className="space-y-6">
               {comparison.cheap.map((item, i) => (
                 <li key={i} className="flex items-center gap-4">
                   <div className="w-8 h-8 rounded-full bg-red-500/10 flex items-center justify-center shrink-0">
                     <XCircle className="w-4 h-4 text-red-400" />
                   </div>
                   <span className="text-gray-400">{item}</span>
                 </li>
               ))}
             </ul>
           </motion.div>
           
           <motion.div 
             initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}
             className="bg-gradient-to-br from-[#111] to-[#0A0A0A] border border-gold/40 shadow-[0_0_30px_rgba(212,175,55,0.1)] rounded-3xl p-10"
           >
             <h3 className="font-serif text-2xl font-bold text-gold mb-8 border-b border-gold/20 pb-4">Leopard Luxe</h3>
             <ul className="space-y-6">
               {comparison.premium.map((item, i) => (
                 <li key={i} className="flex items-center gap-4">
                   <div className="w-8 h-8 rounded-full bg-gold/10 flex items-center justify-center shrink-0 border border-gold/30">
                     <CheckCircle2 className="w-4 h-4 text-gold" />
                   </div>
                   <span className="text-white font-medium">{item}</span>
                 </li>
               ))}
             </ul>
           </motion.div>
        </div>
      </section>

      {/* FAQ SECTION */}
      <section className="relative px-6 lg:px-12 max-w-4xl mx-auto mb-32">
        <div className="text-center mb-16">
          <h2 className="font-serif text-4xl md:text-5xl font-bold mb-4">Frequently Asked Questions</h2>
        </div>
        
        <div className="grid gap-6">
          {faqs.map((faq, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="bg-[#0A0A0A] border border-white/10 rounded-2xl p-6 lg:p-8 hover:border-gold/30 transition-colors"
            >
              <h3 className="font-serif text-xl font-bold text-white mb-3 flex items-center gap-3">
                <HelpCircle className="w-5 h-5 text-gold shrink-0" />
                {faq.q}
              </h3>
              <p className="text-gray-400 leading-relaxed ml-8">{faq.a}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* FINAL CTA SECTION */}
      <section className="relative py-24 bg-gradient-to-b from-rich-black to-[#050505] overflow-hidden flex items-center justify-center border-t border-gold/20 mx-6 lg:mx-12 rounded-3xl mb-12">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(212,175,55,0.15)_0%,transparent_70%)]" />
        <div className="relative z-10 text-center max-w-3xl px-6">
          <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-white">
            Let's Build Something Exceptional Together
          </h2>
          <p className="text-xl text-gray-400 mb-10">
            Tell us about your business and growth goals. We'll create a personalized strategy designed specifically for your success.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
            <button className="w-full sm:w-auto px-8 py-4 rounded-full font-bold tracking-widest text-sm uppercase text-rich-black transition-all duration-300 hover:scale-105 shadow-[0_10px_30px_rgba(212,175,55,0.3)] bg-gradient-to-r from-[#D4AF37] to-[#B8860B]">
              Get a Custom Quote
            </button>
            <button className="w-full sm:w-auto px-8 py-4 rounded-full border-2 border-gold text-gold font-bold tracking-widest text-sm uppercase transition-all duration-300 hover:bg-gold hover:text-rich-black">
              Schedule Your Free Consultation
            </button>
          </div>
        </div>
      </section>

    </main>
  );
}
