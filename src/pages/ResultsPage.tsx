import { motion, AnimatePresence, useInView } from 'motion/react';
import { useState, useEffect, useRef } from 'react';
import { 
  ArrowRight, ChevronLeft, ChevronRight, CheckCircle2, Star, Quote, 
  Building2, Stethoscope, Home as HomeIcon, Dumbbell, Briefcase, 
  Rocket, Sparkles, Target, BarChart, MonitorSmartphone, Search, 
  TrendingUp, Award, XCircle
} from 'lucide-react';
import { Link } from 'react-router-dom';

function AnimatedCounter({ target, suffix, title }: { target: number, suffix: string, title: string }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (isInView) {
      const duration = 2500;
      const startTime = performance.now();
      const updateValue = (currentTime: number) => {
        const elapsed = currentTime - startTime;
        if (elapsed < duration) {
           const progress = elapsed / duration;
           const easeOut = 1 - Math.pow(1 - progress, 3);
           setValue(Math.floor(target * easeOut));
           requestAnimationFrame(updateValue);
        } else {
           setValue(target);
        }
      }
      requestAnimationFrame(updateValue);
    }
  }, [isInView, target]);

  return (
    <div ref={ref} className="text-center p-8 bg-gradient-to-br from-[#111] to-[#050505] border border-gold/10 hover:border-gold/30 rounded-3xl transition-all duration-500 shadow-xl relative overflow-hidden group">
      <div className="absolute top-0 -inset-full h-full w-1/2 z-0 block transform -skew-x-[30deg] bg-gradient-to-r from-transparent via-gold/5 to-transparent opacity-0 group-hover:opacity-100 group-hover:animate-[shine_1.5s_ease-in-out]" />
      
      <div className="relative z-10 font-serif text-5xl md:text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-gold-400 via-gold to-gold-600 mb-3 drop-shadow-[0_0_15px_rgba(212,175,55,0.3)]">
        {value.toLocaleString()}{suffix}
      </div>
      <div className="relative z-10 text-xs md:text-sm tracking-[0.2em] text-gray-400 uppercase font-bold">{title}</div>
    </div>
  );
}

const successStories = [
  {
    type: "Luxury Real Estate Company",
    challenge: "Low-quality leads and outdated website.",
    delivery: ["Premium website redesign", "Lead generation funnels", "SEO optimization", "Conversion-focused landing pages"],
    results: ["250% increase in inquiries", "180% growth in website traffic", "3X increase in qualified leads"]
  },
  {
    type: "Dental Clinic",
    challenge: "Poor online visibility and low appointment bookings.",
    delivery: ["Modern clinic website", "Local SEO strategy", "Google Business optimization"],
    results: ["220% increase in appointment requests", "Significant Google ranking improvement", "Stronger local brand visibility"]
  },
  {
    type: "Interior Design Studio",
    challenge: "Limited online presence and poor lead quality.",
    delivery: ["Luxury portfolio website", "Instagram optimization", "Lead generation campaigns"],
    results: ["300% increase in project inquiries", "Increased brand authority", "Higher conversion rate"]
  },
  {
    type: "Home Services Company",
    challenge: "Inconsistent lead flow.",
    delivery: ["New conversion-focused website", "Local SEO setup", "Google Ads campaigns"],
    results: ["Consistent monthly inquiries", "Lower cost per lead", "Improved local visibility"]
  }
];

const timeline = [
  { month: "Month 1", title: "Foundation", items: ["Website launch", "Foundation setup"] },
  { month: "Month 2", title: "Momentum", items: ["Traffic growth begins"] },
  { month: "Month 3", title: "Acquisition", items: ["Lead generation improves"] },
  { month: "Month 4", title: "Conversion", items: ["Increased conversions"] },
  { month: "Month 6+", title: "Scale", items: ["Scalable business growth"] }
];

const testimonials = [
  { name: "Sarah Jenkins", role: "Real Estate Broker", text: "Leopard Luxe completely transformed our online presence. Our leads have tripled since launching the new site.", rating: 5 },
  { name: "Dr. Marcus Chen", role: "Dental Clinic Owner", text: "We were struggling to get new patients. The SEO and website changes brought in more bookings in a month than we had all year.", rating: 5 },
  { name: "Elena Rodriguez", role: "Interior Designer", text: "The premium portfolio they built for my studio is a masterpiece. It attracts the exact high-end clients I want to work with.", rating: 5 },
];

const industries = [
  { name: "Real Estate", icon: Building2 },
  { name: "Dental Clinics", icon: Stethoscope },
  { name: "Interior Designers", icon: Sparkles },
  { name: "Home Services", icon: HomeIcon },
  { name: "Fitness Businesses", icon: Dumbbell },
  { name: "Professional Services", icon: Briefcase },
  { name: "Local Businesses", icon: Target },
  { name: "Startups", icon: Rocket }
];

const differences = [
  { title: "Data-Driven Strategy", icon: BarChart },
  { title: "Conversion-Focused Design", icon: MonitorSmartphone },
  { title: "SEO Expertise", icon: Search },
  { title: "Advanced Lead Generation", icon: TrendingUp },
  { title: "Transparent Reporting", icon: CheckCircle2 },
  { title: "Continuous Optimization", icon: Award }
];

export function ResultsPage() {
  const [currentStory, setCurrentStory] = useState(0);
  const [currentTestimonial, setCurrentTestimonial] = useState(0);

  const nextStory = () => setCurrentStory((p) => (p + 1) % successStories.length);
  const prevStory = () => setCurrentStory((p) => (p - 1 + successStories.length) % successStories.length);

  const nextTestimonial = () => setCurrentTestimonial((p) => (p + 1) % testimonials.length);
  const prevTestimonial = () => setCurrentTestimonial((p) => (p - 1 + testimonials.length) % testimonials.length);

  useEffect(() => {
    const timer = setInterval(nextStory, 8000);
    return () => clearInterval(timer);
  }, []);

  return (
    <main className="bg-rich-black min-h-screen text-white pt-32 pb-20">
      
      {/* HERO SECTION */}
      <section className="relative px-6 lg:px-12 max-w-7xl mx-auto text-center mb-32 z-10">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(212,175,55,0.15)_0%,transparent_70%)] pointer-events-none -z-10" />
        
        <motion.div
           className="absolute top-[-20%] left-[-10%] w-[50vw] h-[50vw] rounded-full bg-gradient-to-br from-gold-400/10 to-transparent blur-[120px] mix-blend-multiply pointer-events-none -z-10"
           animate={{ x: [0, 50, 0], y: [0, 30, 0] }}
           transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
        />

        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
          <div className="inline-block border border-gold/30 bg-gold/5 rounded-full px-4 py-1.5 mb-6 backdrop-blur-sm">
            <span className="font-sans text-xs tracking-[0.2em] text-gold uppercase font-semibold">Proven Success</span>
          </div>
          <h1 className="font-serif text-5xl md:text-7xl font-bold mb-6 text-white leading-tight">
            Real Results. <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-gold-400 via-gold to-gold-600">Real Growth. Real Business Impact.</span>
          </h1>
          <p className="text-gray-400 text-lg md:text-xl max-w-4xl mx-auto mb-10 leading-relaxed">
            At Leopard Luxe, we don't just create beautiful websites and marketing campaigns—we create measurable business growth. Explore how our strategies help businesses generate more leads, increase visibility, improve conversions, and accelerate revenue growth.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
            <button 
              onClick={() => document.getElementById('stories')?.scrollIntoView({ behavior: 'smooth'})}
              className="w-full sm:w-auto group relative inline-flex items-center justify-center gap-3 px-8 py-4 rounded-full font-bold tracking-widest text-sm uppercase text-rich-black transition-all duration-300 hover:scale-105 shadow-[0_10px_30px_rgba(212,175,55,0.3)] bg-gradient-to-r from-[#D4AF37] to-[#B8860B] overflow-hidden"
            >
              <span className="absolute top-0 -inset-full h-full w-1/2 block transform -skew-x-[30deg] bg-gradient-to-r from-transparent via-white/40 to-transparent opacity-0 group-hover:opacity-100 group-hover:animate-[shine_1s_ease-in-out_infinite]" />
              <span className="relative z-10 flex items-center justify-center gap-2">
                View Success Stories
              </span>
            </button>
            <button className="w-full sm:w-auto text-center px-8 py-4 rounded-full border-2 border-gold text-gold font-bold tracking-widest text-sm uppercase transition-all duration-300 hover:bg-gold hover:text-rich-black">
              Book Free Consultation
            </button>
          </div>
        </motion.div>
      </section>

      {/* ANIMATED RESULTS COUNTERS */}
      <section className="relative px-6 lg:px-12 max-w-7xl mx-auto mb-32">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatedCounter target={100} suffix="+" title="Businesses Helped" />
          <AnimatedCounter target={10000} suffix="+" title="Leads Generated" />
          <AnimatedCounter target={500000} suffix="+" title="Website Visitors Driven" />
          <AnimatedCounter target={250} suffix="+" title="Marketing Campaigns Managed" />
          <AnimatedCounter target={35} suffix="%" title="Average Conversion Increase" />
          <AnimatedCounter target={98} suffix="%" title="Client Satisfaction" />
        </div>
      </section>

      {/* FEATURED SUCCESS STORIES SLIDER */}
      <section id="stories" className="relative px-6 lg:px-12 max-w-7xl mx-auto mb-32">
        <div className="text-center mb-16">
          <h2 className="font-serif text-4xl md:text-5xl font-bold mb-4">Featured Success Stories</h2>
          <div className="w-24 h-1 bg-gradient-to-r from-gold-400 to-gold-600 mx-auto rounded-full"></div>
        </div>

        <div className="relative bg-gradient-to-br from-[#111] to-[#050505] border border-gold/20 rounded-[2rem] p-8 md:p-12 shadow-[0_20px_50px_rgba(0,0,0,0.5)] overflow-hidden">
           {/* Slider Navigation */}
           <div className="absolute top-8 right-8 flex items-center gap-3 z-20">
             <button onClick={prevStory} className="w-12 h-12 rounded-full border border-gold/30 flex items-center justify-center text-gold hover:bg-gold hover:text-rich-black transition-colors backdrop-blur-sm bg-black/20">
               <ChevronLeft className="w-6 h-6" />
             </button>
             <button onClick={nextStory} className="w-12 h-12 rounded-full border border-gold/30 flex items-center justify-center text-gold hover:bg-gold hover:text-rich-black transition-colors backdrop-blur-sm bg-black/20">
               <ChevronRight className="w-6 h-6" />
             </button>
           </div>
           
           <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_right,rgba(212,175,55,0.1)_0%,transparent_50%)] pointer-events-none" />

           <AnimatePresence mode="wait">
             <motion.div
               key={currentStory}
               initial={{ opacity: 0, x: 20 }}
               animate={{ opacity: 1, x: 0 }}
               exit={{ opacity: 0, x: -20 }}
               transition={{ duration: 0.5, ease: "easeOut" }}
               className="grid grid-cols-1 lg:grid-cols-2 gap-12 relative z-10"
             >
               <div>
                 <div className="inline-block border border-gold/30 bg-gold/10 rounded-full px-4 py-1.5 mb-6">
                   <span className="font-sans text-xs tracking-widest text-gold uppercase font-semibold">Case Study {currentStory + 1}</span>
                 </div>
                 <h3 className="font-serif text-3xl md:text-4xl font-bold mb-4">{successStories[currentStory].type}</h3>
                 
                 <div className="mb-8">
                   <h4 className="text-sm tracking-widest text-gray-500 uppercase font-semibold mb-2">The Challenge</h4>
                   <p className="text-white/80 text-lg border-l-2 border-gold/50 pl-4">{successStories[currentStory].challenge}</p>
                 </div>
                 
                 <div>
                   <h4 className="text-sm tracking-widest text-gray-500 uppercase font-semibold mb-4">What We Delivered</h4>
                   <ul className="space-y-3">
                     {successStories[currentStory].delivery.map((item, i) => (
                       <li key={i} className="flex items-start gap-3">
                         <CheckCircle2 className="w-5 h-5 text-gold shrink-0 mt-0.5" />
                         <span className="text-gray-300">{item}</span>
                       </li>
                     ))}
                   </ul>
                 </div>
               </div>
               
               <div className="bg-black/40 rounded-3xl p-8 border border-white/5 flex flex-col justify-center relative overflow-hidden">
                 <div className="absolute top-0 right-0 p-8 opacity-5">
                   <TrendingUp className="w-48 h-48 text-gold" />
                 </div>
                 <h4 className="text-xl font-serif text-gold mb-8 flex items-center gap-3">
                   <Award className="w-6 h-6" /> Results Achieved
                 </h4>
                 <div className="space-y-8 relative z-10">
                   {successStories[currentStory].results.map((result, i) => (
                     <div key={i} className="flex items-center gap-4">
                       <div className="w-12 h-12 rounded-full bg-gold/10 flex items-center justify-center shrink-0 border border-gold/20 shadow-[0_0_15px_rgba(212,175,55,0.2)]">
                         <TrendingUp className="w-5 h-5 text-gold" />
                       </div>
                       <span className="text-xl md:text-2xl font-bold text-white tracking-wide">{result}</span>
                     </div>
                   ))}
                 </div>
               </div>
             </motion.div>
           </AnimatePresence>
        </div>
      </section>

      {/* BEFORE & AFTER TRANSFORMATION */}
      <section className="relative px-6 lg:px-12 max-w-7xl mx-auto mb-32">
        <div className="text-center mb-16">
          <h2 className="font-serif text-4xl md:text-5xl font-bold mb-4">The Transformation</h2>
          <p className="text-gray-400 max-w-2xl mx-auto">Compare the standard digital presence with a premium Leopard Luxe experience.</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 relative">
          <div className="hidden md:flex absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-16 rounded-full bg-rich-black border border-gold items-center justify-center z-10 shadow-[0_0_30px_rgba(212,175,55,0.3)]">
            <ArrowRight className="w-6 h-6 text-gold" />
          </div>

          <motion.div 
            initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}
            className="bg-red-950/10 border border-red-500/20 rounded-3xl p-10 relative overflow-hidden"
          >
            <div className="inline-block border border-red-500/30 bg-red-500/10 rounded-full px-4 py-1.5 mb-8">
              <span className="font-sans text-xs tracking-widest text-red-400 uppercase font-semibold">Before</span>
            </div>
            <ul className="space-y-6">
              {[
                "Outdated website", "Poor mobile experience", "Low visibility", "Weak branding"
              ].map((item, i) => (
                <li key={i} className="flex items-center gap-4">
                  <div className="w-8 h-8 rounded-full bg-red-500/10 flex items-center justify-center shrink-0">
                    <XCircle className="w-4 h-4 text-red-400" />
                  </div>
                  <span className="text-lg text-gray-400">{item}</span>
                </li>
              ))}
            </ul>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.2 }}
            className="bg-gradient-to-br from-[#111] to-[#0A0A0A] border border-gold/40 rounded-3xl p-10 relative overflow-hidden shadow-[0_0_30px_rgba(212,175,55,0.05)]"
          >
            <div className="inline-block border border-gold/30 bg-gold/10 rounded-full px-4 py-1.5 mb-8">
              <span className="font-sans text-xs tracking-widest text-gold uppercase font-semibold">After Leopard Luxe</span>
            </div>
            <ul className="space-y-6 relative z-10">
              {[
                "Premium modern website", "Mobile optimized", "Strong search visibility", "Professional brand presence", "Higher conversion rates"
              ].map((item, i) => (
                <li key={i} className="flex items-center gap-4">
                  <div className="w-8 h-8 rounded-full bg-gold/10 flex items-center justify-center shrink-0 border border-gold/30">
                    <CheckCircle2 className="w-4 h-4 text-gold" />
                  </div>
                  <span className="text-lg text-white font-medium">{item}</span>
                </li>
              ))}
            </ul>
          </motion.div>
        </div>
      </section>

      {/* RESULTS TIMELINE */}
      <section className="relative px-6 lg:px-12 max-w-7xl mx-auto mb-32">
        <div className="text-center mb-20">
          <h2 className="font-serif text-4xl md:text-5xl font-bold mb-4">Growth Timeline</h2>
          <div className="w-24 h-1 bg-gradient-to-r from-gold-400 to-gold-600 mx-auto rounded-full"></div>
        </div>

        <div className="flex border-l-2 border-gold/20 ml-4 md:ml-8 flex-col space-y-12 pb-8">
          {timeline.map((item, index) => (
            <motion.div 
              key={index}
              initial={{ opacity: 0, x: -30 }} 
              whileInView={{ opacity: 1, x: 0 }} 
              viewport={{ once: true }} 
              transition={{ delay: index * 0.1, duration: 0.5 }}
              className="relative pl-10 md:pl-16"
            >
              <div className="absolute -left-[9px] top-1 md:top-2 w-4 h-4 rounded-full bg-gold shadow-[0_0_10px_rgba(212,175,55,0.8)]" />
              <div className="hidden md:block absolute -left-12 top-0.5 text-sm font-bold tracking-widest text-gold/60 w-24 text-right">
                 {item.month.toUpperCase()}
              </div>
              <div className="bg-[#111] border border-white/5 hover:border-gold/30 p-6 md:p-8 rounded-2xl transition-colors">
                <span className="md:hidden block text-xs tracking-widest text-gold uppercase mb-2">{item.month}</span>
                <h3 className="font-serif text-2xl font-bold text-white mb-4">{item.title}</h3>
                <ul className="space-y-2">
                  {item.items.map((point, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <Target className="w-4 h-4 text-gold mt-1 shrink-0" />
                      <span className="text-gray-400">{point}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* CLIENT TESTIMONIALS SLIDER */}
      <section className="relative py-24 mb-32 border-y border-gold/10 bg-gradient-to-r from-transparent via-[#050505] to-transparent">
        <div className="px-6 lg:px-12 max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
            <div>
              <h2 className="font-serif text-4xl md:text-5xl font-bold mb-4">Client Testimonials</h2>
              <p className="text-gray-400">Hear what our partners have to say about our work.</p>
            </div>
            <div className="flex gap-4">
              <button onClick={prevTestimonial} className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center text-white hover:border-gold hover:text-gold transition-colors">
                <ChevronLeft className="w-6 h-6" />
              </button>
              <button onClick={nextTestimonial} className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center text-white hover:border-gold hover:text-gold transition-colors">
                <ChevronRight className="w-6 h-6" />
              </button>
            </div>
          </div>

          <div className="relative h-[300px] md:h-[250px]">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentTestimonial}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.4 }}
                className="absolute inset-0 bg-white/5 border border-white/10 rounded-3xl p-8 md:p-10 backdrop-blur-sm flex flex-col justify-center"
              >
                <Quote className="w-12 h-12 text-gold/20 absolute right-10 top-10" />
                <div className="flex items-center gap-1 mb-6">
                  {[...Array(testimonials[currentTestimonial].rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-gold text-gold" />
                  ))}
                </div>
                <p className="text-xl md:text-3xl font-serif leading-relaxed mb-8 italic text-gray-200">
                  "{testimonials[currentTestimonial].text}"
                </p>
                <div>
                  <h4 className="font-bold text-white">{testimonials[currentTestimonial].name}</h4>
                  <p className="text-sm text-gold tracking-widest uppercase mt-1">{testimonials[currentTestimonial].role}</p>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </section>

      {/* WHY OUR RESULTS ARE DIFFERENT */}
      <section className="relative px-6 lg:px-12 max-w-7xl mx-auto mb-32">
        <div className="text-center mb-16">
          <h2 className="font-serif text-4xl md:text-5xl font-bold mb-4">Why Our Results Are Different</h2>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {differences.map((diff, index) => (
            <motion.div 
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="bg-[#050505] p-8 rounded-2xl border border-white/5 hover:border-gold/40 transition-colors group"
            >
              <div className="w-14 h-14 rounded-full bg-gold/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <diff.icon className="w-7 h-7 text-gold" />
              </div>
              <h3 className="font-serif text-xl font-bold text-white mb-2">{diff.title}</h3>
              <div className="w-10 h-0.5 bg-gold/30 group-hover:w-full transition-all duration-500"></div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* INDUSTRIES WE HELP GROW */}
      <section className="relative px-6 lg:px-12 max-w-7xl mx-auto mb-32">
        <div className="text-center mb-16">
          <h2 className="font-serif text-4xl md:text-5xl font-bold mb-4">Industries We Help Grow</h2>
        </div>
        
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {industries.map((ind, index) => (
            <motion.div 
              key={index}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.05 }}
              className="flex flex-col items-center justify-center p-8 bg-white/5 rounded-2xl border border-white/5 hover:bg-gold/5 hover:border-gold/20 transition-all text-center"
            >
              <ind.icon className="w-10 h-10 text-gold mb-4" />
              <span className="font-bold text-gray-200">{ind.name}</span>
            </motion.div>
          ))}
        </div>
      </section>

      {/* INTERACTIVE GROWTH JOURNEY */}
      <section className="relative px-6 lg:px-12 max-w-7xl mx-auto mb-32 text-center overflow-hidden py-10">
        <h2 className="font-serif text-3xl md:text-5xl font-bold mb-16">The Growth Journey</h2>
        
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 md:gap-0 relative">
          <div className="hidden md:block absolute top-1/2 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-gold/30 to-transparent -translate-y-1/2" />
          
          {['Strategy', 'Design', 'Marketing', 'Optimization', 'Growth'].map((step, index) => (
            <div key={index} className="relative z-10 flex flex-col items-center">
              <div className="w-16 h-16 rounded-full bg-rich-black border-2 border-gold flex items-center justify-center mb-4 shadow-[0_0_20px_rgba(212,175,55,0.2)]">
                 <span className="font-serif font-bold text-gold text-xl">{index + 1}</span>
              </div>
              <span className="font-bold tracking-wider uppercase text-sm">{step}</span>
              {index < 4 && <ArrowRight className="md:hidden w-6 h-6 text-gold mt-4" />}
            </div>
          ))}
        </div>
      </section>

      {/* FINAL CTA SECTION */}
      <section className="relative py-24 bg-gradient-to-b from-rich-black to-[#050505] overflow-hidden flex items-center justify-center border-t border-gold/20 mx-6 lg:mx-12 rounded-3xl mb-12">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(212,175,55,0.15)_0%,transparent_70%)]" />
        <div className="relative z-10 text-center max-w-3xl px-6">
          <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-white">
            Ready to Become Our Next Success Story?
          </h2>
          <p className="text-xl text-gray-400 mb-10">
            Partner with Leopard Luxe and discover how strategic websites, SEO, and digital marketing can transform your business growth.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
            <button className="w-full sm:w-auto px-8 py-4 rounded-full font-bold tracking-widest text-sm uppercase text-rich-black transition-all duration-300 hover:scale-105 shadow-[0_10px_30px_rgba(212,175,55,0.3)] bg-gradient-to-r from-[#D4AF37] to-[#B8860B]">
              Schedule Free Consultation
            </button>
            <button className="w-full sm:w-auto px-8 py-4 rounded-full border-2 border-gold text-gold font-bold tracking-widest text-sm uppercase transition-all duration-300 hover:bg-gold hover:text-rich-black">
              Start Your Project
            </button>
          </div>
        </div>
      </section>

    </main>
  );
}
