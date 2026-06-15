import { motion } from 'motion/react';
import { ArrowRight, CheckCircle2, Globe, TrendingUp, Presentation, Dumbbell, Home as HomeIcon } from 'lucide-react';
import { Link } from 'react-router-dom';

const projects = [
  {
    title: 'Real Estate Website',
    description: 'Modern property listing website built for high-end conversions.',
    icon: HomeIcon,
    features: ['Mobile responsive design', 'Lead generation forms', 'WhatsApp integration', 'Advanced property search'],
    gradient: 'from-[#0F172A] to-[#1E293B]',
  },
  {
    title: 'Dental Clinic Website',
    description: 'Fast-loading, SEO-optimized platform for patient acquisition.',
    icon: Globe,
    features: ['Online appointment booking', 'SEO-optimized pages', 'Fast-loading design', 'Patient inquiry forms'],
    gradient: 'from-[#1E293B] to-[#334155]',
  },
  {
    title: 'Interior Design Website',
    description: 'A premium portfolio experience showcasing luxury interiors.',
    icon: Presentation,
    features: ['Premium project gallery', 'Before-and-after showcases', 'Lead capture forms', 'Luxury branding identity'],
    gradient: 'from-[#0F172A] to-[#0A0F1D]',
  },
  {
    title: 'Fitness Coach Website',
    description: 'High-energy layout focusing on memberships and transformations.',
    icon: Dumbbell,
    features: ['Membership plans', 'Transformation gallery', 'Online consultation booking', 'Client testimonials'],
    gradient: 'from-[#1E1E1E] to-[#2D2D2D]',
  },
  {
    title: 'Home Services Website',
    description: 'Local SEO optimized site designed to book jobs efficiently.',
    icon: TrendingUp,
    features: ['Service booking forms', 'Local SEO structure', 'Mobile-first design', 'Call and WhatsApp integration'],
    gradient: 'from-[#1A1A1A] to-[#0A0A0A]',
  }
];

const reasons = [
  'Premium Website Design',
  'SEO-Focused Development',
  'Lead Generation Strategy',
  'Mobile Responsive Design',
  'Fast Loading Performance',
  'Conversion-Optimized Layouts'
];

export function Portfolio() {
  return (
    <main className="bg-rich-black min-h-screen text-white pt-32 pb-20">
      
      {/* HERO SECTION */}
      <section className="relative px-6 lg:px-12 max-w-7xl mx-auto text-center mb-32 z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="font-serif text-5xl md:text-7xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-gold-400 via-gold to-gold-600">
            Our Portfolio
          </h1>
          <p className="text-gray-400 text-lg md:text-xl max-w-3xl mx-auto mb-10 leading-relaxed">
            Explore how Leopard Luxe helps businesses grow through high-converting websites, SEO, and digital marketing solutions.
          </p>
          <button className="group relative inline-flex items-center gap-3 px-8 py-4 rounded-full font-bold tracking-widest text-sm uppercase text-rich-black transition-all duration-300 hover:scale-105 shadow-[0_10px_30px_rgba(212,175,55,0.3)] bg-gradient-to-r from-[#D4AF37] to-[#B8860B] overflow-hidden">
            <span className="absolute top-0 -inset-full h-full w-1/2 block transform -skew-x-[30deg] bg-gradient-to-r from-transparent via-white/40 to-transparent opacity-0 group-hover:opacity-100 group-hover:animate-[shine_1s_ease-in-out_infinite]" />
            <span className="relative z-10 flex items-center justify-center w-full gap-2">
              Book a Free Consultation
              <ArrowRight className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" />
            </span>
          </button>
        </motion.div>
      </section>

      {/* FEATURED PROJECTS */}
      <section className="relative px-6 lg:px-12 max-w-7xl mx-auto mb-32">
        <div className="text-center mb-16">
          <h2 className="font-serif text-4xl md:text-5xl font-bold mb-4">Featured Projects</h2>
          <div className="w-24 h-1 bg-gold mx-auto rounded-full"></div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              className={`rounded-2xl p-8 bg-gradient-to-br ${project.gradient} border border-gold/10 shadow-lg group hover:border-gold/30 transition-all duration-500 relative overflow-hidden`}
            >
              <div className="absolute top-0 right-0 p-6 opacity-10 group-hover:opacity-20 transition-opacity">
                <project.icon className="w-24 h-24 text-gold" />
              </div>
              <h3 className="font-serif text-2xl font-bold text-white mb-3 group-hover:text-gold transition-colors">{project.title}</h3>
              <p className="text-gray-400 mb-8 h-12">{project.description}</p>
              <ul className="space-y-3 relative z-10">
                {project.features.map((feature, idx) => (
                  <li key={idx} className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-gold shrink-0 mt-0.5" />
                    <span className="text-gray-300 text-sm">{feature}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </section>

      {/* WHY CHOOSE US & CLIENT SUCCESS (GRID) */}
      <section className="relative px-6 lg:px-12 max-w-7xl mx-auto mb-32 grid grid-cols-1 lg:grid-cols-2 gap-16">
        
        {/* Why Clients Choose Us */}
        <motion.div
           initial={{ opacity: 0, x: -30 }}
           whileInView={{ opacity: 1, x: 0 }}
           viewport={{ once: true }}
           transition={{ duration: 0.6 }}
        >
          <h2 className="font-serif text-3xl md:text-4xl font-bold mb-8">Why Clients Choose Leopard Luxe</h2>
          <div className="space-y-4">
            {reasons.map((reason, idx) => (
              <div key={idx} className="flex items-center gap-4 p-4 rounded-xl bg-white/5 border border-white/10 hover:border-gold/30 transition-colors">
                <div className="w-10 h-10 rounded-full bg-gold/10 flex items-center justify-center shrink-0">
                  <CheckCircle2 className="w-5 h-5 text-gold" />
                </div>
                <span className="text-lg font-medium text-gray-200">{reason}</span>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Client Success Highlights */}
        <motion.div
           initial={{ opacity: 0, x: 30 }}
           whileInView={{ opacity: 1, x: 0 }}
           viewport={{ once: true }}
           transition={{ duration: 0.6, delay: 0.2 }}
           className="relative"
        >
           {/* Abstract Decoration */}
           <div className="absolute -inset-4 bg-gradient-to-r from-gold/5 to-transparent blur-2xl rounded-3xl -z-10" />
           <div className="bg-gradient-to-b from-[#111] to-[#050505] rounded-3xl p-10 border border-gold/20 h-full flex flex-col justify-center">
             <h2 className="font-serif text-3xl md:text-4xl font-bold mb-8 text-gold">Client Success</h2>
             <ul className="space-y-8">
               <li className="flex items-start gap-4">
                 <div className="w-12 h-12 rounded-full border border-gold/30 flex items-center justify-center shrink-0">
                   <TrendingUp className="w-6 h-6 text-gold" />
                 </div>
                 <div>
                   <h4 className="text-xl font-bold text-white mb-2">Increased Online Visibility</h4>
                   <p className="text-gray-400">Dominate search rankings and get found by local customers exactly when they need you.</p>
                 </div>
               </li>
               <li className="flex items-start gap-4">
                 <div className="w-12 h-12 rounded-full border border-gold/30 flex items-center justify-center shrink-0">
                   <Globe className="w-6 h-6 text-gold" />
                 </div>
                 <div>
                   <h4 className="text-xl font-bold text-white mb-2">More Leads and Inquiries</h4>
                   <p className="text-gray-400">Transform passive visitors into engaged prospects with high-converting funnels.</p>
                 </div>
               </li>
               <li className="flex items-start gap-4">
                 <div className="w-12 h-12 rounded-full border border-gold/30 flex items-center justify-center shrink-0">
                   <HomeIcon className="w-6 h-6 text-gold" />
                 </div>
                 <div>
                   <h4 className="text-xl font-bold text-white mb-2">Better Customer Engagement</h4>
                   <p className="text-gray-400">Keep customers coming back with polished, professional brand experiences.</p>
                 </div>
               </li>
               <li className="flex items-start gap-4">
                 <div className="w-12 h-12 rounded-full border border-gold/30 flex items-center justify-center shrink-0">
                   <TrendingUp className="w-6 h-6 text-gold" />
                 </div>
                 <div>
                   <h4 className="text-xl font-bold text-white mb-2">Stronger Brand Presence</h4>
                 <p className="text-gray-400">Build deep trust and instantly differentiate yourself from competitors.</p>
                 </div>
               </li>
             </ul>
           </div>
        </motion.div>
      </section>

      {/* FINAL CTA SECTION */}
      <section className="relative py-24 bg-gradient-to-b from-rich-black to-[#050505] overflow-hidden flex items-center justify-center border-t border-gold/20 mx-6 lg:mx-12 rounded-3xl mb-12">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(212,175,55,0.15)_0%,transparent_70%)]" />
        <div className="relative z-10 text-center max-w-3xl px-6">
          <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-white">
            Ready to Grow Your Business Online?
          </h2>
          <p className="text-xl text-gray-400 mb-10">
            Let's build a website and marketing strategy that attracts more customers and increases revenue.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
            <button className="w-full sm:w-auto px-8 py-4 rounded-full font-bold tracking-widest text-sm uppercase text-rich-black transition-all duration-300 hover:scale-105 shadow-[0_10px_30px_rgba(212,175,55,0.3)] bg-gradient-to-r from-[#D4AF37] to-[#B8860B]">
              Get Started
            </button>
            <button className="w-full sm:w-auto px-8 py-4 rounded-full border-2 border-gold text-gold font-bold tracking-widest text-sm uppercase transition-all duration-300 hover:bg-gold hover:text-rich-black">
              Contact Us
            </button>
          </div>
        </div>
      </section>
      
    </main>
  );
}
