import { motion } from 'motion/react';
import { ArrowRight, Code, Search, Smartphone, Target, MousePointerClick, Filter, Gem, CheckCircle2, ChevronRight } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';

const services = [
  {
    id: 'web-design',
    title: 'Custom Website Design & Development',
    description: 'Your website is often the first impression potential customers have of your business. We create premium digital experiences that build trust, showcase your expertise, and encourage visitors to take action.',
    icon: Code,
    features: [
      'Custom Website Design', 'Mobile Responsive Development', 'Landing Pages', 
      'Business Websites', 'E-commerce Solutions', 'Speed Optimization', 
      'Lead Capture Forms', 'Booking & Appointment Systems', 'WhatsApp Integration', 
      'SEO-Friendly Structure'
    ]
  },
  {
    id: 'seo',
    title: 'Search Engine Optimization (SEO)',
    description: 'A beautiful website means nothing if nobody can find it. Our SEO strategies help businesses increase rankings, drive organic traffic, and generate consistent leads from search engines.',
    icon: Search,
    features: [
      'Technical SEO', 'On-Page SEO', 'Local SEO', 'Keyword Research', 
      'Competitor Analysis', 'Website Audits', 'SEO Content Strategy', 'Performance Tracking'
    ]
  },
  {
    id: 'social-media',
    title: 'Social Media Marketing',
    description: 'We help businesses build trust and authority through strategic social media marketing designed to attract attention and convert followers into customers.',
    icon: Smartphone,
    platforms: ['Instagram', 'Facebook', 'LinkedIn', 'TikTok', 'X (Twitter)'],
    features: [
      'Content Strategy', 'Profile Optimization', 'Post Design', 'Reel Creation', 
      'Community Management', 'Audience Growth', 'Performance Reporting'
    ]
  },
  {
    id: 'google-ads',
    title: 'Google Ads Management',
    description: 'Generate high-quality leads with data-driven advertising campaigns designed to maximize return on investment and accelerate business growth.',
    icon: MousePointerClick,
    features: [
      'Search Campaigns', 'Display Advertising', 'Retargeting Campaigns', 
      'Conversion Tracking', 'Landing Page Optimization', 'Performance Monitoring'
    ]
  },
  {
    id: 'meta-ads',
    title: 'Meta Ads Management',
    description: 'Our advertising strategies focus on reaching the right audience at the right time to increase inquiries, sales, and brand awareness.',
    icon: Target,
    features: [
      'Campaign Strategy', 'Creative Development', 'Audience Targeting', 
      'Lead Generation Campaigns', 'Retargeting', 'Performance Optimization'
    ]
  },
  {
    id: 'lead-generation',
    title: 'Lead Generation Solutions',
    description: 'We design lead generation systems that help businesses attract, nurture, and convert prospects into paying customers.',
    icon: Filter,
    features: [
      'Funnel Development', 'Landing Pages', 'CRM Integration', 
      'Email Marketing', 'Automated Follow-Ups', 'Lead Qualification Systems'
    ]
  },
  {
    id: 'branding',
    title: 'Branding & Growth Strategy',
    description: 'A strong brand creates trust, authority, and long-term business value. We help businesses establish a memorable identity that drives customer loyalty.',
    icon: Gem,
    features: [
      'Brand Positioning', 'Visual Identity', 'Messaging Strategy', 
      'Market Research', 'Competitor Analysis', 'Growth Planning'
    ]
  }
];

const industries = [
  'Real Estate', 'Interior Design', 'Dental Clinics', 'Home Services', 
  'Fitness & Wellness', 'Professional Services', 'Local Businesses', 'Startups & Entrepreneurs'
];

const reasons = [
  'Premium Design Standards', 'Results-Driven Strategies', 'Conversion-Focused Approach', 
  'Transparent Communication', 'Tailored Business Solutions', 'Long-Term Growth Partnerships', 
  'Modern Technology & Tools', 'Dedicated Support'
];

const processSteps = [
  { title: 'Discovery', desc: 'Understanding your business, goals, audience, and market.' },
  { title: 'Strategy', desc: 'Creating a customized growth plan tailored to your objectives.' },
  { title: 'Execution', desc: 'Designing, developing, and launching your digital assets.' },
  { title: 'Optimization', desc: 'Monitoring performance and continuously improving results.' },
  { title: 'Growth', desc: 'Scaling successful strategies to maximize long-term success.' }
];

export function ServicesPage() {
  const navigate = useNavigate();

  return (
    <main className="bg-rich-black min-h-screen text-white pt-32 pb-20">
      
      {/* HERO SECTION */}
      <section className="relative px-6 lg:px-12 max-w-7xl mx-auto text-center mb-32 z-10">
        {/* Subtle Ambient Background */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(212,175,55,0.15)_0%,transparent_70%)] pointer-events-none -z-10" />

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div className="inline-block border border-gold/30 bg-gold/5 rounded-full px-4 py-1.5 mb-6 backdrop-blur-sm">
            <span className="font-sans text-xs tracking-widest text-gold uppercase font-semibold">Elevate Your Brand</span>
          </div>
          <h1 className="font-serif text-4xl md:text-6xl lg:text-7xl font-bold mb-6 text-white leading-tight">
            Premium Digital Marketing Solutions <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-gold-400 via-gold to-gold-600">Designed for Growth</span>
          </h1>
          <p className="text-gray-400 text-lg md:text-xl max-w-4xl mx-auto mb-10 leading-relaxed">
            At Leopard Luxe, we combine strategy, creativity, and technology to help businesses attract more customers, generate more leads, and establish a powerful online presence. From custom website development to advanced digital marketing campaigns, we create solutions that deliver measurable results.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
            <button 
              onClick={() => navigate('/discovery')}
              className="w-full sm:w-auto group relative inline-flex items-center justify-center gap-3 px-8 py-4 rounded-full font-bold tracking-widest text-sm uppercase text-rich-black transition-all duration-300 hover:scale-105 shadow-[0_10px_30px_rgba(212,175,55,0.3)] bg-gradient-to-r from-[#D4AF37] to-[#B8860B] overflow-hidden">
              <span className="absolute top-0 -inset-full h-full w-1/2 block transform -skew-x-[30deg] bg-gradient-to-r from-transparent via-white/40 to-transparent opacity-0 group-hover:opacity-100 group-hover:animate-[shine_1s_ease-in-out_infinite]" />
              <span className="relative z-10 flex items-center justify-center gap-2">
                Book a Free Consultation
                <ArrowRight className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" />
              </span>
            </button>
            <Link to="/portfolio" className="w-full sm:w-auto text-center px-8 py-4 rounded-full border-2 border-gold text-gold font-bold tracking-widest text-sm uppercase transition-all duration-300 hover:bg-gold hover:text-rich-black text-white">
              View Our Portfolio
            </Link>
          </div>
        </motion.div>
      </section>

      {/* OUR SERVICES */}
      <section className="relative px-6 lg:px-12 max-w-7xl mx-auto mb-32">
        <div className="text-center mb-20">
          <h2 className="font-serif text-4xl md:text-5xl font-bold mb-4">Our Services</h2>
          <div className="w-24 h-1 bg-gradient-to-r from-gold-400 to-gold-600 mx-auto rounded-full"></div>
        </div>
        
        <div className="grid grid-cols-1 gap-16">
          {services.map((service, index) => (
            <motion.div
              key={service.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.7 }}
              className="bg-gradient-to-br from-[#111] to-[#0A0A0A] rounded-3xl p-8 lg:p-12 border border-gold/10 hover:border-gold/30 transition-colors shadow-xl grid md:grid-cols-[1fr_1.5fr] gap-10"
            >
              <div className="flex flex-col">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#1A1A1A] to-[#050505] flex items-center justify-center border border-gold/20 mb-6 shadow-lg">
                  <service.icon className="w-8 h-8 text-gold" />
                </div>
                <h3 className="font-serif text-3xl font-bold text-white mb-4 leading-tight">{service.title}</h3>
                <p className="text-gray-400 text-lg leading-relaxed mb-8">{service.description}</p>
                
                {service.platforms && (
                  <div className="mb-6">
                    <h4 className="text-sm tracking-widest text-gold uppercase font-semibold mb-3">Platforms</h4>
                    <div className="flex flex-wrap gap-2">
                      {service.platforms.map(platform => (
                        <span key={platform} className="text-xs bg-white/5 border border-white/10 px-3 py-1 rounded-full text-gray-300">{platform}</span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
              
              <div className="bg-black/40 rounded-2xl p-8 border border-white/5">
                <h4 className="text-sm tracking-widest text-gold uppercase font-semibold mb-6 flex items-center gap-2">
                  <Gem className="w-4 h-4" /> Core Features
                </h4>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-4">
                  {service.features.map((feature, idx) => (
                    <li key={idx} className="flex items-start gap-3">
                      <CheckCircle2 className="w-5 h-5 text-gold shrink-0" />
                      <span className="text-gray-300">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* TWO COLUMN: INDUSTRIES & WHY CHOOSE US */}
      <section className="relative px-6 lg:px-12 max-w-7xl mx-auto mb-32 grid grid-cols-1 lg:grid-cols-2 gap-16">
        {/* Industries We Serve */}
        <motion.div
           initial={{ opacity: 0, x: -30 }}
           whileInView={{ opacity: 1, x: 0 }}
           viewport={{ once: true }}
           transition={{ duration: 0.6 }}
        >
          <h2 className="font-serif text-3xl md:text-4xl font-bold mb-8">Industries We Serve</h2>
          <div className="grid grid-cols-2 gap-4">
            {industries.map((industry, idx) => (
              <div key={idx} className="flex items-center gap-3 p-4 rounded-xl bg-gradient-to-r from-[#111] to-transparent border border-white/10 hover:border-gold/30 transition-colors">
                <ChevronRight className="w-4 h-4 text-gold shrink-0" />
                <span className="text-gray-200 font-medium">{industry}</span>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Why Choose Leopard Luxe */}
        <motion.div
           initial={{ opacity: 0, x: 30 }}
           whileInView={{ opacity: 1, x: 0 }}
           viewport={{ once: true }}
           transition={{ duration: 0.6, delay: 0.2 }}
        >
          <h2 className="font-serif text-3xl md:text-4xl font-bold mb-6">Why Choose Leopard Luxe</h2>
          <p className="text-gray-400 mb-8 leading-relaxed">
            We don't believe in one-size-fits-all marketing. Every strategy is carefully crafted to align with your business goals, target audience, and growth ambitions.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {reasons.map((reason, idx) => (
              <div key={idx} className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-gold shrink-0 mt-0.5" />
                <span className="text-gray-300">{reason}</span>
              </div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* OUR PROCESS */}
      <section className="relative px-6 lg:px-12 max-w-7xl mx-auto mb-32 text-center">
        <h2 className="font-serif text-3xl md:text-5xl font-bold mb-4">Our Process</h2>
        <div className="w-24 h-1 bg-gold mx-auto rounded-full mb-16"></div>

        <div className="flex flex-col lg:flex-row items-center lg:items-stretch justify-center gap-6 relative">
          {/* Connecting Line (Desktop) */}
          <div className="hidden lg:block absolute top-[60px] left-[10%] right-[10%] h-[2px] bg-gradient-to-r from-transparent via-gold/30 to-transparent -z-10" />

          {processSteps.map((step, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              className="flex-1 max-w-[280px]"
            >
              <div className="w-16 h-16 rounded-full bg-rich-black border-2 border-gold flex items-center justify-center text-gold font-serif text-2xl font-bold mx-auto mb-6 shadow-[0_0_20px_rgba(212,175,55,0.2)]">
                {index + 1}
              </div>
              <h3 className="font-serif text-xl font-bold text-white mb-3">{step.title}</h3>
              <p className="text-gray-400 text-sm leading-relaxed">{step.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* FINAL CTA SECTION */}
      <section className="relative py-24 bg-gradient-to-b from-rich-black to-[#050505] overflow-hidden flex items-center justify-center border-t border-gold/20 mx-6 lg:mx-12 rounded-3xl mb-12">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(212,175,55,0.15)_0%,transparent_70%)]" />
        <div className="relative z-10 text-center max-w-3xl px-6">
          <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-white">
            Ready to Elevate Your Business with Leopard Luxe?
          </h2>
          <p className="text-xl text-gray-400 mb-10">
            Whether you're looking for a premium website, stronger online visibility, or a complete digital growth strategy, Leopard Luxe is here to help your business stand out, attract more customers, and achieve sustainable growth.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
            <button 
              onClick={() => navigate('/discovery')}
              className="w-full sm:w-auto px-8 py-4 rounded-full font-bold tracking-widest text-sm uppercase text-rich-black transition-all duration-300 hover:scale-105 shadow-[0_10px_30px_rgba(212,175,55,0.3)] bg-gradient-to-r from-[#D4AF37] to-[#B8860B]">
              Book a Free Consultation
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
