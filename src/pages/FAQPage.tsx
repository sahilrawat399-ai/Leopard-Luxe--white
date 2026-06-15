import { motion, AnimatePresence } from 'motion/react';
import { useState } from 'react';
import { ArrowRight, Plus, Minus, HelpCircle, MessageCircle, ArrowUpRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const faqCategories = [
  {
    title: "General Questions",
    items: [
      {
        q: "What is Leopard Luxe?",
        a: "Leopard Luxe is a premium digital marketing agency specializing in website development, SEO, social media marketing, lead generation, branding, and business growth solutions."
      },
      {
        q: "Who do you work with?",
        a: "We work with startups, local businesses, real estate professionals, interior designers, dental clinics, home service businesses, fitness brands, and growing companies looking to strengthen their online presence."
      },
      {
        q: "Do you work with international clients?",
        a: "Yes. Leopard Luxe serves businesses globally and can work with clients from any country."
      },
      {
        q: "Why choose Leopard Luxe?",
        a: "We combine premium design, strategic marketing, and growth-focused solutions to help businesses attract more customers and generate measurable results."
      }
    ]
  },
  {
    title: "Website Development Questions",
    items: [
      {
        q: "Do you build custom websites?",
        a: "Yes. Every website is designed and developed according to your business goals, target audience, and branding requirements."
      },
      {
        q: "Will my website work on mobile devices?",
        a: "Absolutely. Every website we create is fully responsive and optimized for desktop, tablet, and mobile users."
      },
      {
        q: "Can you redesign my existing website?",
        a: "Yes. We can modernize outdated websites and improve design, speed, user experience, and conversion performance."
      },
      {
        q: "Will my website be SEO-friendly?",
        a: "Yes. All websites are built using SEO best practices to help improve visibility on search engines."
      },
      {
        q: "Can I update my website myself?",
        a: "Yes. We can build websites with easy-to-manage systems that allow you to make updates when needed."
      }
    ]
  },
  {
    title: "SEO Questions",
    items: [
      {
        q: "What is SEO?",
        a: "SEO (Search Engine Optimization) helps your website rank higher on search engines like Google, making it easier for potential customers to find your business."
      },
      {
        q: "How long does SEO take to show results?",
        a: "SEO is a long-term strategy. While improvements can begin earlier, meaningful growth often develops over several months depending on competition and industry."
      },
      {
        q: "Do you provide local SEO?",
        a: "Yes. We help local businesses improve their visibility within their service areas and attract nearby customers."
      },
      {
        q: "Can SEO help generate leads?",
        a: "Yes. Effective SEO increases targeted traffic, which can result in more inquiries, bookings, and sales opportunities."
      }
    ]
  },
  {
    title: "Social Media Marketing Questions",
    items: [
      {
        q: "Which platforms do you manage?",
        a: "We can assist with Instagram, Facebook, LinkedIn, TikTok, and other relevant social media platforms."
      },
      {
        q: "Can you create content for my business?",
        a: "Yes. We help businesses with content strategy, creative design, and social media management."
      },
      {
        q: "Will social media help me get more customers?",
        a: "A strong social media presence helps build trust, increase visibility, and attract potential customers when combined with the right strategy."
      }
    ]
  },
  {
    title: "Advertising Questions",
    items: [
      {
        q: "Do you manage Google Ads?",
        a: "Yes. We create and optimize Google Ads campaigns focused on lead generation and business growth."
      },
      {
        q: "Do you manage Facebook and Instagram Ads?",
        a: "Yes. We develop targeted advertising campaigns designed to reach the right audience and improve conversions."
      },
      {
        q: "How do you measure campaign success?",
        a: "We monitor key performance indicators such as leads, conversions, website traffic, engagement, and return on investment."
      }
    ]
  },
  {
    title: "Pricing & Investment Questions",
    items: [
      {
        q: "How much do your services cost?",
        a: "Every project is unique. We provide customized solutions based on your goals, requirements, and business needs."
      },
      {
        q: "Do you offer free consultations?",
        a: "Yes. We offer a complimentary consultation to understand your business and recommend the most effective strategy."
      },
      {
        q: "Do I need a long-term contract?",
        a: "Project requirements vary. During the consultation process, we discuss the most suitable approach for your business."
      }
    ]
  },
  {
    title: "Project Process Questions",
    items: [
      {
        q: "How do we get started?",
        a: "Simply request a consultation. We'll discuss your goals, evaluate your needs, and create a tailored strategy."
      },
      {
        q: "How long does a website project take?",
        a: "Timelines depend on project complexity, features, and content requirements."
      },
      {
        q: "Will I receive updates during the project?",
        a: "Yes. Transparency and communication are important parts of our process, and clients receive regular updates."
      },
      {
        q: "What happens after launch?",
        a: "We can continue supporting your business through ongoing optimization, marketing, SEO, and growth strategies."
      }
    ]
  },
  {
    title: "Support Questions",
    items: [
      {
        q: "Do you offer ongoing support?",
        a: "Yes. We provide support options to help businesses maintain and improve their digital presence."
      },
      {
        q: "Can I contact your team if I have questions?",
        a: "Absolutely. Our team is available to assist and guide you throughout the project journey."
      },
      {
        q: "Do you help with future growth strategies?",
        a: "Yes. Leopard Luxe focuses on long-term partnerships and sustainable business growth."
      }
    ]
  }
];

function AccordionItem({ question, answer }: { question: string, answer: string, key?: any }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border border-white/10 rounded-2xl mb-4 overflow-hidden bg-[#0A0A0A] hover:border-gold/30 transition-colors">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between p-6 text-left focus:outline-none"
      >
        <h4 className={`font-serif text-xl font-bold pr-8 transition-colors duration-300 ${isOpen ? 'text-gold' : 'text-white'}`}>
          {question}
        </h4>
        <div className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 border transition-all duration-300 ${isOpen ? 'bg-gold border-gold' : 'bg-transparent border-white/20'}`}>
          {isOpen ? (
            <Minus className="w-5 h-5 text-rich-black" />
          ) : (
            <Plus className="w-5 h-5 text-white" />
          )}
        </div>
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
          >
            <div className="p-6 pt-0 text-gray-400 leading-relaxed font-sans border-t border-white/5 mt-2">
              <div className="pt-4">{answer}</div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export function FAQPage() {
  const [activeCategory, setActiveCategory] = useState(0);

  return (
    <main className="bg-rich-black min-h-screen text-white pt-32 pb-20">
      
      {/* HERO SECTION */}
      <section className="relative px-6 lg:px-12 max-w-7xl mx-auto text-center mb-24 z-10">
        {/* Subtle Ambient Background */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(212,175,55,0.1)_0%,transparent_70%)] pointer-events-none -z-10" />

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div className="inline-block border border-gold/30 bg-gold/5 rounded-full px-4 py-1.5 mb-6 backdrop-blur-sm">
            <span className="font-sans text-xs tracking-widest text-gold uppercase font-semibold flex items-center gap-2">
              <HelpCircle className="w-4 h-4" /> Need Clarity?
            </span>
          </div>
          <h1 className="font-serif text-5xl md:text-7xl font-bold mb-6 text-white leading-tight">
            Frequently <span className="text-transparent bg-clip-text bg-gradient-to-r from-gold-400 via-gold to-gold-600">Asked Questions</span>
          </h1>
          <p className="text-gray-400 text-lg md:text-xl max-w-3xl mx-auto mb-10 leading-relaxed">
            Have questions about our services, process, or how Leopard Luxe can help grow your business? Explore our most commonly asked questions below.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
            <button className="w-full sm:w-auto group relative inline-flex items-center justify-center gap-3 px-8 py-4 rounded-full font-bold tracking-widest text-sm uppercase text-rich-black transition-all duration-300 hover:scale-105 shadow-[0_10px_30px_rgba(212,175,55,0.3)] bg-gradient-to-r from-[#D4AF37] to-[#B8860B] overflow-hidden">
              <span className="absolute top-0 -inset-full h-full w-1/2 block transform -skew-x-[30deg] bg-gradient-to-r from-transparent via-white/40 to-transparent opacity-0 group-hover:opacity-100 group-hover:animate-[shine_1s_ease-in-out_infinite]" />
              <span className="relative z-10 flex items-center justify-center gap-2">
                Get a Custom Quote
                <ArrowRight className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" />
              </span>
            </button>
            <button className="w-full sm:w-auto text-center px-8 py-4 rounded-full border-2 border-gold text-gold font-bold tracking-widest text-sm uppercase transition-all duration-300 hover:bg-gold hover:text-rich-black">
              Book a Free Consultation
            </button>
          </div>
        </motion.div>
      </section>

      {/* FAQ CATEGORIES & ACCORDIONS */}
      <section className="relative px-6 lg:px-12 max-w-7xl mx-auto mb-32 flex flex-col lg:flex-row gap-12">
         {/* Sidebar Navigation */}
         <div className="w-full lg:w-1/3">
           <div className="sticky top-32 bg-gradient-to-br from-[#111] to-[#0A0A0A] border border-white/10 rounded-3xl p-6 md:p-8 shadow-xl">
             <h3 className="font-serif text-2xl font-bold mb-6 text-white border-b border-white/10 pb-4">Categories</h3>
             <ul className="space-y-3">
               {faqCategories.map((cat, idx) => (
                 <li key={idx}>
                   <button
                     onClick={() => setActiveCategory(idx)}
                     className={`w-full text-left px-4 py-3 rounded-xl transition-all duration-300 font-medium flex items-center justify-between group ${
                       activeCategory === idx 
                         ? 'bg-gold/10 text-gold border border-gold/30' 
                         : 'text-gray-400 hover:bg-white/5 hover:text-white border border-transparent'
                     }`}
                   >
                     {cat.title}
                     <ArrowRight className={`w-4 h-4 transition-transform duration-300 ${activeCategory === idx ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-4 group-hover:opacity-50 group-hover:translate-x-0'}`} />
                   </button>
                 </li>
               ))}
             </ul>

             <div className="mt-10 p-6 bg-gold/5 rounded-2xl border border-gold/20 text-center relative overflow-hidden">
               <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-gold to-transparent" />
               <MessageCircle className="w-8 h-8 text-gold mx-auto mb-4" />
               <h4 className="font-serif text-lg font-bold text-white mb-2">Still need help?</h4>
               <p className="text-sm text-gray-400 mb-4">We're here to answer any questions you might have.</p>
               <button className="text-sm font-bold uppercase tracking-widest text-gold hover:text-white transition-colors flex items-center justify-center gap-2 w-full">
                 Contact Us <ArrowUpRight className="w-4 h-4" />
               </button>
             </div>
           </div>
         </div>

         {/* Accordions */}
         <div className="w-full lg:w-2/3">
           <AnimatePresence mode="wait">
             <motion.div
               key={activeCategory}
               initial={{ opacity: 0, x: 20 }}
               animate={{ opacity: 1, x: 0 }}
               exit={{ opacity: 0, x: -20 }}
               transition={{ duration: 0.4 }}
             >
               <div className="mb-8 hidden lg:block">
                 <h2 className="font-serif text-4xl font-bold text-white mb-2">{faqCategories[activeCategory].title}</h2>
                 <div className="w-16 h-1 bg-gradient-to-r from-gold-400 to-gold-600 rounded-full"></div>
               </div>
               
               <div className="space-y-4">
                 {faqCategories[activeCategory].items.map((item, idx) => (
                   <AccordionItem key={idx} question={item.q} answer={item.a} />
                 ))}
               </div>
             </motion.div>
           </AnimatePresence>
         </div>
      </section>

      {/* FINAL CTA SECTION */}
      <section className="relative py-24 bg-gradient-to-b from-rich-black to-[#050505] overflow-hidden flex items-center justify-center border-t border-gold/20 mx-6 lg:mx-12 rounded-3xl mb-12">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(212,175,55,0.15)_0%,transparent_70%)]" />
        <div className="relative z-10 text-center max-w-3xl px-6">
          <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-white">
            Still Have Questions?
          </h2>
          <p className="text-xl text-gray-400 mb-10">
            Our team is here to help. Let's discuss your goals and explore how Leopard Luxe can support your business growth.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
            <button className="w-full sm:w-auto px-8 py-4 rounded-full font-bold tracking-widest text-sm uppercase text-rich-black transition-all duration-300 hover:scale-105 shadow-[0_10px_30px_rgba(212,175,55,0.3)] bg-gradient-to-r from-[#D4AF37] to-[#B8860B]">
              Get a Custom Quote
            </button>
            <button className="w-full sm:w-auto px-8 py-4 rounded-full border-2 border-gold text-gold font-bold tracking-widest text-sm uppercase transition-all duration-300 hover:bg-gold/10">
              Book a Free Consultation
            </button>
            <button className="w-full sm:w-auto px-8 py-4 rounded-full border-2 border-white/20 text-white font-bold tracking-widest text-sm uppercase transition-all duration-300 hover:bg-white hover:text-rich-black">
              Contact Our Team
            </button>
          </div>
        </div>
      </section>

    </main>
  );
}
