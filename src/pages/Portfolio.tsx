import { motion, useScroll, useSpring, useTransform, useMotionValue } from 'motion/react';
import { 
  ArrowRight, CheckCircle2, Globe, TrendingUp, Presentation, Dumbbell, Home as HomeIcon,
  Building2, Building, FileText, Coffee, CupSoda, ShoppingBag, ShoppingCart, 
  Smile, Activity, Stethoscope, Scissors, Sparkles, GraduationCap, Briefcase,
  Utensils, Wine, ExternalLink, Search, Filter, MonitorPlay, Zap
} from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import React, { useRef, useState, useMemo, useEffect } from 'react';
import confetti from 'canvas-confetti';

const CustomCursor = () => {
  const [position, setPosition] = useState({ x: -100, y: -100 });
  const [isPointer, setIsPointer] = useState(false);

  useEffect(() => {
    const updateCursor = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
      const target = e.target as HTMLElement;
      setIsPointer(window.getComputedStyle(target).cursor === 'pointer' || target.tagName.toLowerCase() === 'button' || target.tagName.toLowerCase() === 'a');
    };

    window.addEventListener('mousemove', updateCursor);
    return () => window.removeEventListener('mousemove', updateCursor);
  }, []);

  return (
    <motion.div
      animate={{
        x: position.x - 16,
        y: position.y - 16,
        scale: isPointer ? 1.5 : 1,
      }}
      transition={{ type: "spring", stiffness: 500, damping: 28, mass: 0.5 }}
      className="fixed top-0 left-0 w-8 h-8 pointer-events-none z-[9999] mix-blend-difference hidden md:block"
    >
      <div className={`w-full h-full rounded-full border border-white transition-all duration-300 ${isPointer ? 'bg-white opacity-20' : 'bg-transparent opacity-100'}`} />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-1 h-1 bg-white rounded-full" />
    </motion.div>
  );
};

const AnimatedBackground = () => {
  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden bg-rich-black">
      {/* Noise Texture */}
      <div className="absolute inset-0 opacity-[0.04] mix-blend-overlay" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noiseFilter%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.65%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noiseFilter)%22/%3E%3C/svg%3E")' }} />
      
      {/* Animated Orbs */}
      <motion.div 
        animate={{ x: [0, 100, -50, 0], y: [0, -100, 50, 0], scale: [1, 1.2, 0.8, 1] }}
        transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
        className="absolute top-[-20%] left-[-10%] w-[50vw] h-[50vw] rounded-full blur-[120px] bg-gold/10 mix-blend-screen"
      />
      <motion.div 
        animate={{ x: [0, -150, 100, 0], y: [0, 150, -50, 0], scale: [1, 0.9, 1.3, 1] }}
        transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
        className="absolute bottom-[-20%] right-[-10%] w-[60vw] h-[60vw] rounded-full blur-[150px] bg-blue-900/10 mix-blend-screen"
      />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,rgba(5,5,5,0.8)_100%)]" />
    </div>
  );
};

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

    // Fire subtle premium confetti
    const duration = 2000;
    const end = Date.now() + duration;

    const frame = () => {
      confetti({
        particleCount: 2,
        angle: 60,
        spread: 55,
        origin: { x: 0 },
        colors: ['#D4AF37', '#FFF', '#B8860B']
      });
      confetti({
        particleCount: 2,
        angle: 120,
        spread: 55,
        origin: { x: 1 },
        colors: ['#D4AF37', '#FFF', '#B8860B']
      });

      if (Date.now() < end) {
        requestAnimationFrame(frame);
      }
    };
    frame();

    setTimeout(() => {
      window.open(project.url, '_blank');
      setIsLoading(false);
    }, 600);
  };

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 50, scale: 0.95 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.7, delay: index * 0.05, ease: [0.21, 0.47, 0.32, 0.98] }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={handleClick}
      className={`group relative overflow-hidden rounded-3xl bg-gradient-to-br ${project.bg} border border-white/10 ${project.border} p-8 cursor-pointer transition-all duration-500 hover:shadow-[0_20px_40px_rgba(0,0,0,0.4)]`}
      style={{
        transformStyle: 'preserve-3d',
        transform: isHovered 
          ? `perspective(1000px) rotateX(${(mousePosition.y - 150) / 20}deg) rotateY(${-(mousePosition.x - 150) / 20}deg) scale3d(1.02, 1.02, 1.02)` 
          : 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)'
      }}
    >
      {/* Mouse Reactive Lighting */}
      <div 
        className="pointer-events-none absolute -inset-px rounded-3xl opacity-0 transition duration-300 group-hover:opacity-100 mix-blend-overlay"
        style={{
          background: `radial-gradient(800px circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(255,255,255,0.15), transparent 40%)`
        }}
      />

      {/* Glass Reflection */}
      <div className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none bg-gradient-to-tr from-white/0 via-white/5 to-white/0 transform translate-x-[-100%] group-hover:translate-x-[100%] transition-transform" />

      {/* Floating Particles/Glow */}
      <div className={`absolute top-0 right-0 w-48 h-48 rounded-full blur-3xl -mr-16 -mt-16 transition-all duration-700 opacity-20 ${project.glow} group-hover:scale-150 group-hover:opacity-40`} />

      {/* Content */}
      <div className="relative z-10 flex flex-col h-full pointer-events-none" style={{ transform: 'translateZ(30px)' }}>
        <div className="flex items-start justify-between mb-12">
          <div className={`p-4 rounded-2xl bg-white/5 backdrop-blur-md border border-white/10 ${project.color} shadow-2xl transition-all duration-500 group-hover:scale-110 group-hover:-rotate-6`}>
            <project.icon className="w-10 h-10" />
          </div>
          <span className="text-[10px] font-mono tracking-[0.2em] uppercase text-gray-300 px-4 py-2 rounded-full border border-white/20 bg-black/40 backdrop-blur-sm shadow-xl">
            {project.industry}
          </span>
        </div>

        <div className="mt-auto">
          <h3 className="font-serif text-3xl font-bold text-white mb-3 group-hover:text-gold transition-colors tracking-tight">{project.title}</h3>
          <p className="text-gray-400 text-sm mb-8 line-clamp-2 leading-relaxed font-light">{project.desc}</p>
          
          <div className="flex items-center gap-2 text-sm font-semibold tracking-widest text-white group-hover:text-gold transition-colors uppercase">
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
              <span className="flex items-center gap-2 group/btn">
                View Live Project
                <ExternalLink className="w-4 h-4 transition-transform duration-500 group-hover/btn:translate-x-2 group-hover/btn:-translate-y-2 group-hover/btn:scale-110" />
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

  // Progress bar
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  const categories = useMemo(() => {
    const cats = new Set(premiumProjects.map(p => p.industry));
    return ['All', ...Array.from(cats)];
  }, []);

  const filteredProjects = useMemo(() => {
    return premiumProjects.filter(project => {
      const matchesSearch = project.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                            project.industry.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = selectedCategory === 'All' || project.industry === selectedCategory;
      return matchesSearch && matchesCategory;
    });
  }, [searchQuery, selectedCategory]);

  return (
    <main className="min-h-screen text-white pt-32 pb-20 relative overflow-hidden cursor-default selection:bg-gold/30 selection:text-white">
      <CustomCursor />
      <AnimatedBackground />

      <motion.div 
        className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-gold-400 via-gold to-gold-600 z-[100] origin-left"
        style={{ scaleX }}
      />
      
      {/* HERO SECTION */}
      <section className="relative px-6 lg:px-12 max-w-7xl mx-auto text-center mb-40 z-10 min-h-[70vh] flex flex-col justify-center items-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          className="relative"
        >
          {/* Glowing node connections behind title */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] pointer-events-none opacity-40">
             <motion.div 
               animate={{ rotate: 360 }}
               transition={{ duration: 100, repeat: Infinity, ease: "linear" }}
               className="w-full h-full border border-dashed border-gold/20 rounded-full"
             />
             <motion.div 
               animate={{ rotate: -360 }}
               transition={{ duration: 80, repeat: Infinity, ease: "linear" }}
               className="absolute inset-10 border border-dashed border-white/10 rounded-full"
             />
          </div>

          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-gold/30 bg-gold/5 backdrop-blur-md mb-8">
            <Sparkles className="w-4 h-4 text-gold" />
            <span className="text-xs font-mono tracking-widest text-gold uppercase">Digital Masterpieces</span>
          </div>

          <h1 className="font-serif text-6xl md:text-8xl lg:text-9xl font-bold mb-6 tracking-tight leading-[1.1] text-transparent bg-clip-text bg-gradient-to-b from-white via-white to-gray-500 drop-shadow-2xl">
            Award-Winning <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-gold-400 via-gold to-gold-600">Experiences.</span>
          </h1>
          <p className="text-gray-400 text-lg md:text-2xl max-w-3xl mx-auto mb-12 leading-relaxed font-light">
            We don't just build websites. We craft immersive digital ecosystems that transform passive visitors into lifelong clients.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6 relative z-20">
            <button 
              onClick={() => navigate('/discovery')}
              className="group relative inline-flex items-center gap-3 px-10 py-5 rounded-full font-bold tracking-widest text-sm uppercase text-rich-black transition-all duration-500 hover:scale-[1.02] shadow-[0_10px_40px_rgba(212,175,55,0.4)] bg-gradient-to-r from-[#D4AF37] to-[#B8860B] overflow-hidden">
              <span className="absolute top-0 -inset-full h-full w-1/2 block transform -skew-x-[30deg] bg-gradient-to-r from-transparent via-white/40 to-transparent opacity-0 group-hover:opacity-100 group-hover:animate-[shine_1s_ease-in-out_infinite]" />
              <span className="relative z-10 flex items-center justify-center w-full gap-2">
                Start Your Project
                <ArrowRight className="w-5 h-5 transition-transform duration-500 group-hover:translate-x-2" />
              </span>
            </button>
            <button
              onClick={() => {
                const el = document.getElementById('portfolio-grid');
                el?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="group inline-flex items-center gap-3 px-10 py-5 rounded-full font-bold tracking-widest text-sm uppercase text-white transition-all duration-300 border border-white/20 hover:bg-white/10 backdrop-blur-sm"
            >
              <MonitorPlay className="w-5 h-5 text-gray-400 group-hover:text-white transition-colors" />
              View Showreel
            </button>
          </div>
        </motion.div>
      </section>

      {/* PREMIUM LIVE PROJECTS */}
      <section id="portfolio-grid" className="relative px-6 lg:px-12 max-w-[1600px] mx-auto mb-40 z-10">
        <div className="text-center mb-16">
          <h2 className="font-serif text-5xl md:text-6xl lg:text-7xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-white via-gray-200 to-gray-500">Curated Masterpieces</h2>
          <p className="text-gray-400 text-xl max-w-2xl mx-auto mb-10 font-light">
            Interactive ecosystems designed to dominate industries.
          </p>
          <div className="w-32 h-1 bg-gradient-to-r from-transparent via-gold to-transparent mx-auto rounded-full mb-16 opacity-50"></div>
        </div>

        {/* Filters and Search */}
        <div className="flex flex-col lg:flex-row items-center justify-between gap-6 mb-16 bg-white/5 backdrop-blur-xl border border-white/10 p-4 rounded-3xl shadow-2xl">
          {/* Categories */}
          <div className="flex flex-wrap items-center justify-center lg:justify-start gap-2 flex-1">
            <div className="flex items-center gap-2 mr-4 text-gray-400">
              <Filter className="w-4 h-4" />
              <span className="text-xs font-bold uppercase tracking-[0.2em]">Filter</span>
            </div>
            {categories.map((cat, idx) => (
              <button
                key={idx}
                onClick={() => setSelectedCategory(cat)}
                className={`px-5 py-2.5 rounded-full text-xs font-bold uppercase tracking-widest transition-all duration-500 border ${
                  selectedCategory === cat
                    ? 'bg-gold/20 border-gold text-gold shadow-[0_0_20px_rgba(212,175,55,0.4)]'
                    : 'bg-transparent border-transparent text-gray-400 hover:bg-white/10 hover:text-white'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Search */}
          <div className="relative w-full lg:w-72 shrink-0">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-gray-500" />
            </div>
            <input
              type="text"
              placeholder="Search projects..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-white/5 border border-white/10 rounded-full py-3 pl-11 pr-4 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-gold/50 transition-all duration-300"
            />
          </div>
        </div>
        
        {filteredProjects.length === 0 ? (
          <div className="text-center py-20 bg-white/5 rounded-2xl border border-white/10">
            <p className="text-gray-400 text-lg">No projects found matching your search criteria.</p>
            <button 
              onClick={() => { setSearchQuery(''); setSelectedCategory('All'); }}
              className="mt-6 text-gold hover:underline"
            >
              Clear filters
            </button>
          </div>
        ) : (
          <div className="flex md:grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 overflow-x-auto md:overflow-visible pb-8 snap-x snap-mandatory hide-scrollbar -mx-6 px-6 md:mx-0 md:px-0">
            {filteredProjects.map((project, index) => (
              <div key={`${project.title}-${index}`} className="w-[85vw] sm:w-[380px] md:w-auto flex-shrink-0 snap-center">
                <PremiumProjectCard project={project} index={index} />
              </div>
            ))}
          </div>
        )}
      </section>

      {/* FEATURED PROJECTS */}
      <section className="relative px-6 lg:px-12 max-w-7xl mx-auto mb-40 z-10">
        <div className="text-center mb-20">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-gold/30 bg-gold/5 backdrop-blur-md mb-6">
            <Zap className="w-4 h-4 text-gold" />
            <span className="text-xs font-mono tracking-widest text-gold uppercase">Capabilities</span>
          </div>
          <h2 className="font-serif text-5xl md:text-6xl font-bold mb-6">Core Services</h2>
          <div className="w-24 h-1 bg-gradient-to-r from-gold/50 to-gold mx-auto rounded-full"></div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {projects.map((project, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ delay: index * 0.1, duration: 0.7, ease: [0.21, 0.47, 0.32, 0.98] }}
              className={`rounded-3xl p-10 bg-gradient-to-br ${project.gradient} border border-white/10 shadow-2xl group hover:border-gold/50 hover:shadow-[0_20px_50px_rgba(212,175,55,0.15)] transition-all duration-700 relative overflow-hidden backdrop-blur-xl`}
            >
              <div className="absolute top-0 right-0 w-64 h-64 bg-gold/5 blur-[80px] rounded-full group-hover:bg-gold/20 transition-colors duration-700 pointer-events-none -mr-20 -mt-20" />
              
              <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:opacity-30 group-hover:scale-125 group-hover:rotate-12 transition-all duration-700">
                <project.icon className="w-32 h-32 text-gold" />
              </div>
              
              <div className="w-16 h-16 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center mb-8 group-hover:scale-110 group-hover:bg-gold/10 transition-all duration-500">
                <project.icon className="w-8 h-8 text-white group-hover:text-gold transition-colors" />
              </div>
              
              <h3 className="font-serif text-3xl font-bold text-white mb-4 group-hover:text-gold transition-colors">{project.title}</h3>
              <p className="text-gray-400 mb-10 text-lg leading-relaxed">{project.description}</p>
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
      <section className="relative py-32 bg-gradient-to-b from-transparent to-[#050505] overflow-hidden flex items-center justify-center mx-4 lg:mx-12 rounded-[3rem] mb-12 z-10 border border-white/5 shadow-2xl group">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(212,175,55,0.15)_0%,transparent_70%)] group-hover:opacity-70 transition-opacity duration-1000" />
        
        <motion.div 
          animate={{ rotate: 360 }}
          transition={{ duration: 150, repeat: Infinity, ease: "linear" }}
          className="absolute -top-[50%] -left-[50%] w-[200%] h-[200%] opacity-30 pointer-events-none"
          style={{ backgroundImage: 'conic-gradient(from 0deg at 50% 50%, transparent 0deg, rgba(212,175,55,0.1) 90deg, transparent 180deg, rgba(255,255,255,0.05) 270deg, transparent 360deg)' }}
        />

        <div className="relative z-10 text-center max-w-4xl px-6">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="font-serif text-5xl md:text-6xl lg:text-7xl font-bold mb-8 text-white tracking-tight"
          >
            Ready to Dominate <br className="hidden md:block" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-gold-400 via-gold to-gold-600">Your Industry?</span>
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-xl md:text-2xl text-gray-400 mb-12 font-light"
          >
            Let's build a digital masterpiece that attracts premium clients and exponentially increases your revenue.
          </motion.p>
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-6"
          >
            <button 
              onClick={() => navigate('/discovery')}
              className="w-full sm:w-auto px-10 py-5 rounded-full font-bold tracking-widest text-sm uppercase text-rich-black transition-all duration-500 hover:scale-[1.05] shadow-[0_10px_40px_rgba(212,175,55,0.4)] bg-gradient-to-r from-[#D4AF37] to-[#B8860B]">
              Start Your Project
            </button>
            <a href="mailto:agency@leopardluxe.in" className="w-full sm:w-auto px-10 py-5 rounded-full border-2 border-white/20 text-white font-bold tracking-widest text-sm uppercase transition-all duration-500 hover:bg-white hover:text-rich-black text-center backdrop-blur-sm">
              Contact Us by Email
            </a>
          </motion.div>
        </div>
      </section>
      
    </main>
  );
}
