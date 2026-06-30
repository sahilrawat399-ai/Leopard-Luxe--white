import { motion } from 'motion/react';
import { 
  ArrowRight, CheckCircle2, Globe, TrendingUp, Presentation, Dumbbell, Home as HomeIcon,
  Building2, Building, FileText, Coffee, CupSoda, ShoppingBag, ShoppingCart, 
  Smile, Activity, Stethoscope, Scissors, Sparkles, GraduationCap, Briefcase,
  Utensils, Wine, ExternalLink
} from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import React, { useRef, useState } from 'react';

const premiumProjects = [
  // Real Estate
  { title: "Four Seasons", industry: "Real Estate", desc: "Luxury property & architectural showcase", url: "https://www.fourseasons.com/", icon: Building2, color: "text-blue-400", bg: "from-blue-950/40 to-slate-900/40", border: "group-hover:border-blue-500/50", glow: "group-hover:bg-blue-500/20" },
  { title: "Rohan Marina One", industry: "Real Estate", desc: "Premium residential estate platform", url: "https://rohanmarinaone.com/", icon: HomeIcon, color: "text-emerald-400", bg: "from-emerald-950/40 to-teal-900/40", border: "group-hover:border-emerald-500/50", glow: "group-hover:bg-emerald-500/20" },
  { title: "Cotality", industry: "Real Estate", desc: "Modern architectural digital presence", url: "https://www.cotality.com/", icon: Building, color: "text-indigo-400", bg: "from-indigo-950/40 to-blue-900/40", border: "group-hover:border-indigo-500/50", glow: "group-hover:bg-indigo-500/20" },

  // Documentation & Legal
  { title: "Legal Ease Filing", industry: "Documentation & Legal", desc: "Secure legal documents & certificates", url: "https://legaleasefiling.online/", icon: FileText, color: "text-amber-400", bg: "from-amber-950/40 to-orange-900/40", border: "group-hover:border-amber-500/50", glow: "group-hover:bg-amber-500/20" },

  // Cafe & Restaurant
  { title: "Mokan Co", industry: "Cafe & Restaurant", desc: "Elegant cafe dining experience", url: "https://mokanco.com/", icon: Coffee, color: "text-orange-400", bg: "from-orange-950/40 to-red-900/40", border: "group-hover:border-orange-500/50", glow: "group-hover:bg-orange-500/20" },
  { title: "Le Cafe Coffee", industry: "Cafe & Restaurant", desc: "Premium coffee roasting brand", url: "https://lecafecoffee.com/", icon: CupSoda, color: "text-amber-500", bg: "from-amber-900/40 to-orange-950/40", border: "group-hover:border-amber-500/50", glow: "group-hover:bg-amber-500/20" },
  { title: "Bellyard Hotel", industry: "Cafe & Restaurant", desc: "Luxury dining & glowing food showcases", url: "https://bellyardhotel.com/", icon: Utensils, color: "text-rose-400", bg: "from-rose-950/40 to-pink-900/40", border: "group-hover:border-rose-500/50", glow: "group-hover:bg-rose-500/20" },
  { title: "Arcane Estate", industry: "Cafe & Restaurant", desc: "Artisan estate coffee roasters", url: "https://arcaneestatecoffee.com/", icon: Coffee, color: "text-yellow-400", bg: "from-yellow-950/40 to-amber-900/40", border: "group-hover:border-yellow-500/50", glow: "group-hover:bg-yellow-500/20" },

  // Beach Club & Cafe
  { title: "Nora Beach Club", industry: "Beach Club", desc: "Neon lights & sunset lounge vibes", url: "https://www.norabeachclub.com/", icon: Wine, color: "text-pink-400", bg: "from-pink-950/40 to-purple-900/40", border: "group-hover:border-pink-500/50", glow: "group-hover:bg-pink-500/20" },
  { title: "Barfunk Phuket", industry: "Beach Club", desc: "Vibrant beach club & cafe", url: "https://www.barfunkphuket.com/", icon: Sparkles, color: "text-fuchsia-400", bg: "from-fuchsia-950/40 to-purple-900/40", border: "group-hover:border-fuchsia-500/50", glow: "group-hover:bg-fuchsia-500/20" },

  // E-commerce
  { title: "Mija", industry: "E-commerce", desc: "Premium floating product showcase", url: "https://mija.co/", icon: ShoppingBag, color: "text-violet-400", bg: "from-violet-950/40 to-purple-900/40", border: "group-hover:border-violet-500/50", glow: "group-hover:bg-violet-500/20" },
  { title: "Pinq", industry: "E-commerce", desc: "Elegant shopping & checkout experience", url: "https://www.pinq.co/", icon: ShoppingCart, color: "text-pink-500", bg: "from-pink-900/40 to-rose-950/40", border: "group-hover:border-pink-500/50", glow: "group-hover:bg-pink-500/20" },
  { title: "Dimple Design", industry: "E-commerce", desc: "Luxury boutique shopping platform", url: "https://dimpledesignstudio.com/", icon: ShoppingBag, color: "text-purple-400", bg: "from-purple-950/40 to-indigo-900/40", border: "group-hover:border-purple-500/50", glow: "group-hover:bg-purple-500/20" },
  { title: "Street Style Store", industry: "E-commerce", desc: "High-volume modern fashion retail", url: "https://streetstylestore.com/", icon: ShoppingCart, color: "text-blue-500", bg: "from-blue-900/40 to-cyan-950/40", border: "group-hover:border-blue-500/50", glow: "group-hover:bg-blue-500/20" },

  // Dental
  { title: "Dentally", industry: "Dental Clinic", desc: "Clean, modern dental healthcare", url: "https://dentally.in/", icon: Smile, color: "text-cyan-400", bg: "from-cyan-950/40 to-blue-900/40", border: "group-hover:border-cyan-500/50", glow: "group-hover:bg-cyan-500/20" },
  { title: "Family Dental Care", industry: "Dental Clinic", desc: "Trust-focused medical aesthetics", url: "https://thefamilydentalcare.in/", icon: Stethoscope, color: "text-teal-400", bg: "from-teal-950/40 to-emerald-900/40", border: "group-hover:border-teal-500/50", glow: "group-hover:bg-teal-500/20" },

  // Hair Transplant
  { title: "Eternal Hair", industry: "Aesthetic Clinic", desc: "Advanced healthcare & scalp technology", url: "https://eternalhair.com/", icon: Activity, color: "text-rose-500", bg: "from-rose-900/40 to-red-950/40", border: "group-hover:border-rose-500/50", glow: "group-hover:bg-rose-500/20" },
  { title: "NJ Hair Transplant", industry: "Aesthetic Clinic", desc: "Premium aesthetic medical clinic", url: "https://newjerseyhairtransplantclinic.com/", icon: Scissors, color: "text-orange-500", bg: "from-orange-900/40 to-amber-950/40", border: "group-hover:border-orange-500/50", glow: "group-hover:bg-orange-500/20" },

  // Agency
  { title: "Penguin Capital", industry: "Agency", desc: "Analytics & modern business intelligence", url: "https://www.penguin-capital.co.jp/en/", icon: Briefcase, color: "text-blue-400", bg: "from-blue-950/40 to-indigo-900/40", border: "group-hover:border-blue-500/50", glow: "group-hover:bg-blue-500/20" },

  // Salon
  { title: "Federico Salon", industry: "Salon & Beauty", desc: "Luxury cosmetics & beauty mirrors", url: "https://www.federicosalon.com/", icon: Scissors, color: "text-pink-400", bg: "from-pink-950/40 to-rose-900/40", border: "group-hover:border-pink-500/50", glow: "group-hover:bg-pink-500/20" },
  { title: "Salon Ziba", industry: "Salon & Beauty", desc: "Premium salon lighting & styling", url: "https://salonziba.com/", icon: Sparkles, color: "text-fuchsia-400", bg: "from-fuchsia-950/40 to-pink-900/40", border: "group-hover:border-fuchsia-500/50", glow: "group-hover:bg-fuchsia-500/20" },

  // Fitness
  { title: "Brickhaus Fitness", industry: "Fitness & Gym", desc: "High-energy athletic club", url: "https://brickhausfitness.com/", icon: Dumbbell, color: "text-red-500", bg: "from-red-900/40 to-orange-950/40", border: "group-hover:border-red-500/50", glow: "group-hover:bg-red-500/20" },
  { title: "TMPL Clubs", industry: "Fitness & Gym", desc: "Luxury gym & health club", url: "https://www.tmplclubs.com/", icon: Activity, color: "text-orange-500", bg: "from-orange-900/40 to-red-950/40", border: "group-hover:border-orange-500/50", glow: "group-hover:bg-orange-500/20" },

  // Education
  { title: "Job Provider", industry: "Education & Job Portal", desc: "Career pathways & hiring portal", url: "https://jobprovider.online/", icon: GraduationCap, color: "text-emerald-400", bg: "from-emerald-950/40 to-green-900/40", border: "group-hover:border-emerald-500/50", glow: "group-hover:bg-emerald-500/20" },
];

interface PremiumProjectCardProps {
  project: any;
  index: number;
}

const PremiumProjectCard: React.FC<PremiumProjectCardProps> = ({ project, index }) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    setMousePosition({ x, y });
  };

  const handleClick = () => {
    setIsLoading(true);
    setTimeout(() => {
      window.open(project.url, '_blank');
      setIsLoading(false);
    }, 600);
  };

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, delay: index * 0.05 }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={handleClick}
      className={`group relative overflow-hidden rounded-2xl bg-gradient-to-br ${project.bg} border border-white/5 ${project.border} p-6 cursor-pointer transition-all duration-500`}
    >
      {/* Mouse Reactive Lighting */}
      <div 
        className="pointer-events-none absolute -inset-px rounded-2xl opacity-0 transition duration-300 group-hover:opacity-100"
        style={{
          background: `radial-gradient(600px circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(255,255,255,0.06), transparent 40%)`
        }}
      />

      {/* Floating Particles/Glow */}
      <div className={`absolute top-0 right-0 w-32 h-32 rounded-full blur-3xl -mr-10 -mt-10 transition-all duration-700 opacity-20 ${project.glow}`} />

      {/* Content */}
      <div className="relative z-10 flex flex-col h-full">
        <div className="flex items-start justify-between mb-8">
          <div className={`p-4 rounded-xl bg-white/5 backdrop-blur-sm border border-white/10 ${project.color} shadow-lg transition-transform duration-500 group-hover:scale-110 group-hover:-rotate-3`}>
            <project.icon className="w-8 h-8" />
          </div>
          <span className="text-[10px] font-mono tracking-widest uppercase text-gray-500 px-3 py-1 rounded-full border border-white/10 bg-black/20">
            {project.industry}
          </span>
        </div>

        <div className="mt-auto">
          <h3 className="font-serif text-2xl font-bold text-white mb-2 group-hover:text-gold transition-colors">{project.title}</h3>
          <p className="text-gray-400 text-sm mb-6 line-clamp-2">{project.desc}</p>
          
          <div className="flex items-center gap-2 text-sm font-semibold tracking-wider text-white group-hover:text-gold transition-colors uppercase">
            {isLoading ? (
              <span className="flex items-center gap-2">
                <motion.div 
                  animate={{ rotate: 360 }} 
                  transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
                  className="w-4 h-4 border-2 border-gold border-t-transparent rounded-full"
                />
                Loading...
              </span>
            ) : (
              <span className="flex items-center gap-2">
                View Live Project
                <ExternalLink className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" />
              </span>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

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
  const navigate = useNavigate();

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
          <button 
            onClick={() => navigate('/discovery')}
            className="group relative inline-flex items-center gap-3 px-8 py-4 rounded-full font-bold tracking-widest text-sm uppercase text-rich-black transition-all duration-300 hover:scale-105 shadow-[0_10px_30px_rgba(212,175,55,0.3)] bg-gradient-to-r from-[#D4AF37] to-[#B8860B] overflow-hidden">
            <span className="absolute top-0 -inset-full h-full w-1/2 block transform -skew-x-[30deg] bg-gradient-to-r from-transparent via-white/40 to-transparent opacity-0 group-hover:opacity-100 group-hover:animate-[shine_1s_ease-in-out_infinite]" />
            <span className="relative z-10 flex items-center justify-center w-full gap-2">
              Book a Free Consultation
              <ArrowRight className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" />
            </span>
          </button>
        </motion.div>
      </section>

      {/* PREMIUM LIVE PROJECTS */}
      <section className="relative px-6 lg:px-12 max-w-[1400px] mx-auto mb-32">
        <div className="text-center mb-16">
          <h2 className="font-serif text-4xl md:text-5xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-400">Live Projects & Portfolio</h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto mb-8">
            Explore our award-winning work across premium industries. Click on any project to view the live experience.
          </p>
          <div className="w-24 h-1 bg-gradient-to-r from-gold/50 to-gold mx-auto rounded-full"></div>
        </div>
        
        <div className="flex md:grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 overflow-x-auto md:overflow-visible pb-8 snap-x snap-mandatory hide-scrollbar -mx-6 px-6 md:mx-0 md:px-0">
          {premiumProjects.map((project, index) => (
            <div key={index} className="w-[85vw] sm:w-[350px] md:w-auto flex-shrink-0 snap-center">
              <PremiumProjectCard project={project} index={index} />
            </div>
          ))}
        </div>
      </section>

      {/* FEATURED PROJECTS */}
      <section className="relative px-6 lg:px-12 max-w-7xl mx-auto mb-32">
        <div className="text-center mb-16">
          <h2 className="font-serif text-4xl md:text-5xl font-bold mb-4">Core Services Showcase</h2>
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
            <button 
              onClick={() => navigate('/discovery')}
              className="w-full sm:w-auto px-8 py-4 rounded-full font-bold tracking-widest text-sm uppercase text-rich-black transition-all duration-300 hover:scale-105 shadow-[0_10px_30px_rgba(212,175,55,0.3)] bg-gradient-to-r from-[#D4AF37] to-[#B8860B]">
              Get Started
            </button>
            <a href="mailto:agency@leopardluxe.in" className="w-full sm:w-auto px-8 py-4 rounded-full border-2 border-gold text-gold font-bold tracking-widest text-sm uppercase transition-all duration-300 hover:bg-gold hover:text-rich-black text-center">
              Contact Us by Email
            </a>
          </div>
        </div>
      </section>
      
    </main>
  );
}
