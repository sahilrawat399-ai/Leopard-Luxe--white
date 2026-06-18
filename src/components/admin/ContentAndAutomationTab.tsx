import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Instagram, MessageSquare, Bot, Sparkles, Send, Calendar, CheckSquare, Clock 
} from 'lucide-react';

interface ContentAndAutomationTabProps {
  isDarkMode: boolean;
}

export function ContentAndAutomationTab({ isDarkMode }: ContentAndAutomationTabProps) {
  // Content calendar data
  const [planner, setPlanner] = useState([
    { id: 1, title: 'Reel: "Inside a $100K Agency Design Retainer"', date: 'June 20, 2026', type: 'Reel', status: 'Draft' },
    { id: 2, title: 'Static: "3 Core Typography Sins Luxury Brands Commit"', date: 'June 22, 2026', type: 'Carousel', status: 'Approved' },
    { id: 3, title: 'Story: "Reviewing Onyx Estates Final Dev Blueprint Live"', date: 'June 18, 2026', type: 'Story', status: 'Published' }
  ]);

  // Copywriter generator simulator
  const [selectedCategory, setSelectedCategory] = useState('retainer');
  const [aiResult, setAiResult] = useState('');
  const [generating, setGenerating] = useState(false);

  // Chatbot console simulation
  const [chatHistory, setChatHistory] = useState([
    { isBot: true, text: 'Hello Leader! Leopard Luxe Chatbot system loaded. Enter any test parameter or ask me questions about incoming leads.' },
  ]);
  const [chatInput, setChatInput] = useState('');

  const generateLuxuryCopy = () => {
    setGenerating(true);
    setAiResult('');
    
    // Simulate smart completion hook
    setTimeout(() => {
      let copy = '';
      if (selectedCategory === 'retainer') {
        copy = `✨ THE BRAND VANGUARD MODEL:\n\nStop paying freelancers hourly to patch together slow digital nodes.\n\nOur clients secure a full-stack premium team on custom retainer: Website Design, Meta Conversion Campaigns, and Custom Copywriting. All managed inside a luxury, high-converting members dashboard.\n\n📌 Hit link in bio to register for our Vanguard Club and double your corporate contract value.`;
      } else if (selectedCategory === 'landing') {
        copy = `💎 DESIGN SECRETS OF A $10M BRAND:\n\n1. Generous negative space (let your products breathe).\n2. Monochromatic color scaling paired with single gold (#D4AF37) accents.\n3. Zero slow external modules. Speed is the ultimate conversion metric.\n\nRead our comprehensive agency Case Studies to see how we re-architected Onyx Estate for a 95+ PageSpeed index.`;
      } else {
        copy = `🚀 ZERO TO QUALIFIED AUTOMATION:\n\nHow do we qualify high-ticket accounts in 45 seconds?\n\nOur custom WhatsApp & Email webhooks track user submission budgets instantly, assign a regional Account Director, and dispatches a secure onboarding portal without a single human phone tag.\n\nDM "AUTOMATE" to receive our private playbook.`;
      }
      setAiResult(copy);
      setGenerating(false);
    }, 1200);
  };

  const handleSendChatMock = (e: React.FormEvent) => {
    e.preventDefault();
    if (!chatInput) return;
    
    const userText = chatInput;
    setChatInput('');
    setChatHistory(prev => [...prev, { isBot: false, text: userText }]);

    setTimeout(() => {
      let response = '';
      const text = userText.toLowerCase();
      if (text.includes('lead') || text.includes('recent')) {
        response = "📋 SYSTEM AUDIT: 2 new qualified leads logged today! Elena Rostova (Vance Group) interested in SEO & Meta Ads. Status: Assignee Sahil R.";
      } else if (text.includes('help') || text.includes('guide')) {
        response = "🌟 BOT COMPLIANCE: I manage active triggers. Try entering: 'lead status', 'revenue projection', or 'meta CTR status'.";
      } else if (text.includes('revenue') || text.includes('profit')) {
        response = "💰 FINANCIAL REPORT: Current monthly recurring revenue is $184,500. Next client billing invoice executes June 22 ($12,500 due).";
      } else {
        response = "🤖 Leopard Luxe Automation: I processed that query through our internal NLP hook and mapped it to client notifications.";
      }
      setChatHistory(prev => [...prev, { isBot: true, text: response }]);
    }, 800);
  };

  return (
    <div className="space-y-6 text-left animate-fade-in">
      
      {/* HEADER BAR */}
      <h2 className="font-serif text-3xl font-bold tracking-tight" style={{ color: isDarkMode ? '#FFFFFF' : '#0A0A0A' }}>
        Content Strategy & Automation Hub
      </h2>
      <p className="text-sm" style={{ color: isDarkMode ? '#999999' : '#666666' }}>
        Configure social templates, command AI copywriting simulators, and view live conversation logs from automated CRM webhooks.
      </p>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">

        {/* INSTAGRAM CONTENT PLANNER */}
        <div 
          className="p-6 rounded-3xl border text-left flex flex-col justify-between"
          style={{ 
            backgroundColor: isDarkMode ? '#0F0F0F' : '#FFFFFF', 
            borderColor: isDarkMode ? '#222222' : '#EAEAEA' 
          }}
        >
          <div>
            <div className="flex justify-between items-center mb-6">
              <div>
                <h3 className="font-serif text-lg font-bold" style={{ color: isDarkMode ? '#FFFFFF' : '#0A0A0A' }}>
                  Brand Media Planner
                </h3>
                <p className="text-xs text-gray-500">Draft and publish schedule pipelines.</p>
              </div>
              <Instagram className="w-5 h-5 text-gold" />
            </div>

            <div className="space-y-4">
              {planner.map(item => (
                <div key={item.id} className="p-3.5 bg-black/10 border rounded-2xl flex items-center justify-between text-xs" style={{ borderColor: isDarkMode ? '#222222' : '#F1F1F1' }}>
                  <div className="space-y-1">
                    <h4 className="font-bold text-white block" style={{ color: isDarkMode ? '#FFFFFF' : '#0A0A0A' }}>{item.title}</h4>
                    <span className="text-[10px] text-gray-500 block font-mono">Format: {item.type} • Due {item.date}</span>
                  </div>
                  <span className={`px-2 py-0.5 rounded text-[9px] font-bold font-mono tracking-widest uppercase border ${
                    item.status === 'Published' 
                      ? 'bg-green-500/15 text-green-400 border-green-500/20' 
                      : 'bg-gold/15 text-gold border-gold/20'
                  }`}>{item.status}</span>
                </div>
              ))}
            </div>
          </div>

          <button className="w-full py-2 bg-light-gray/5 border border-dashed text-xs text-gold font-bold uppercase rounded-xl hover:bg-gold/5 mt-6 cursor-pointer" style={{ borderColor: isDarkMode ? '#222222' : '#EAEAEA' }}>
            Book Post to Calendar
          </button>
        </div>

        {/* AI INSTANT LUXURY COPYWRITER */}
        <div 
          className="p-6 rounded-3xl border text-left flex flex-col justify-between"
          style={{ 
            backgroundColor: isDarkMode ? '#0F0F0F' : '#FFFFFF', 
            borderColor: isDarkMode ? '#222222' : '#EAEAEA' 
          }}
        >
          <div>
            <div className="flex justify-between items-center mb-6">
              <div>
                <h3 className="font-serif text-lg font-bold" style={{ color: isDarkMode ? '#FFFFFF' : '#0A0A0A' }}>
                  AI Copywriting Accelerator
                </h3>
                <p className="text-xs text-gray-500">Brand compliance template generator.</p>
              </div>
              <Sparkles className="w-5 h-5 text-gold animate-pulse" />
            </div>

            {/* Input Selection */}
            <div className="space-y-3">
              <label className="text-[10px] font-bold uppercase tracking-wider text-gray-500">Brand Hook Topic</label>
              <div className="grid grid-cols-3 gap-2">
                <button
                  onClick={() => setSelectedCategory('retainer')}
                  className={`py-2 text-[10px] font-bold uppercase rounded-lg border transition-all ${
                    selectedCategory === 'retainer' 
                      ? 'bg-gold border-gold text-[#0A0A0A]' 
                      : 'border-white/5 hover:border-gold/30 text-gray-400'
                  }`}
                >
                  Agency Retainers
                </button>
                <button
                  onClick={() => setSelectedCategory('landing')}
                  className={`py-2 text-[10px] font-bold uppercase rounded-lg border transition-all ${
                    selectedCategory === 'landing' 
                      ? 'bg-gold border-gold text-[#0A0A0A]' 
                      : 'border-white/5 hover:border-gold/30 text-gray-400'
                  }`}
                >
                  Luxe Web Secrets
                </button>
                <button
                  onClick={() => setSelectedCategory('automation')}
                  className={`py-2 text-[10px] font-bold uppercase rounded-lg border transition-all ${
                    selectedCategory === 'automation' 
                      ? 'bg-gold border-gold text-[#0A0A0A]' 
                      : 'border-white/5 hover:border-gold/30 text-gray-400'
                  }`}
                >
                  Automations
                </button>
              </div>
            </div>

            {/* Output Field */}
            <div className="mt-4">
              {generating ? (
                <div className="h-32 flex items-center justify-center text-xs text-gray-400 gap-2 border bg-black/10 rounded-2xl" style={{ borderColor: isDarkMode ? '#222222' : '#F4F4F4' }}>
                  <div className="w-4 h-4 border-2 border-gold border-t-transparent rounded-full animate-spin"></div>
                  Generating premium caption hooks...
                </div>
              ) : aiResult ? (
                <div 
                  className="p-4 rounded-xl text-[11px] font-medium leading-relaxed max-h-40 overflow-y-auto whitespace-pre-line border cursor-pointer border-gold/15 bg-gold/5"
                  onClick={() => {
                    navigator.clipboard.writeText(aiResult);
                    alert("Copy content saved to clipboard!");
                  }}
                >
                  {aiResult}
                  <span className="text-[9px] text-[#D4AF37] block mt-3 font-mono font-bold text-right uppercase">Click to copy text</span>
                </div>
              ) : (
                <div className="h-32 flex items-center justify-center text-xs text-gray-500 italic border border-dashed rounded-2xl" style={{ borderColor: isDarkMode ? '#222222' : '#EAEAEA' }}>
                  Choose your compliance hook topic and trigger the copywriting model.
                </div>
              )}
            </div>
          </div>

          <button 
            onClick={generateLuxuryCopy}
            className="w-full py-2.5 bg-gold text-[#0A0A0A] font-extrabold uppercase rounded-xl tracking-widest text-xs hover:bg-gold/90 transition-all mt-4 cursor-pointer"
          >
            Create Compliance Template
          </button>
        </div>

      </div>

      {/* CORE WHATSAPP/EMAIL AUTOMATION CONSOLE */}
      <div 
        className="p-6 rounded-3xl border text-left"
        style={{ 
          backgroundColor: isDarkMode ? '#0F0F0F' : '#FFFFFF', 
          borderColor: isDarkMode ? '#222222' : '#EAEAEA' 
        }}
      >
        <div className="flex justify-between items-center mb-6">
          <div>
            <h3 className="font-serif text-lg font-bold" style={{ color: isDarkMode ? '#FFFFFF' : '#0A0A0A' }}>
              Lead Automation Console & WhatsApp Simulator
            </h3>
            <p className="text-xs text-gray-500">Test automation queries and CRM callback hooks.</p>
          </div>
          <Bot className="w-5 h-5 text-gold" />
        </div>

        {/* Real-time terminal chat block */}
        <div className="space-y-4">
          <div className="h-44 bg-black/45 p-4 rounded-2xl border font-mono text-xs overflow-y-auto space-y-3 border-white/5">
            {chatHistory.map((chat, i) => (
              <div key={i} className={`flex ${chat.isBot ? 'justify-start' : 'justify-end'}`}>
                <div 
                  className={`p-3 rounded-2xl max-w-[85%] leading-relaxed ${
                    chat.isBot 
                      ? 'bg-[#1C1C1E] text-[#D4AF37] border border-white/5' 
                      : 'bg-[#D4AF37] text-black font-bold'
                  }`}
                >
                  {chat.text}
                </div>
              </div>
            ))}
          </div>

          <form onSubmit={handleSendChatMock} className="flex gap-2">
            <input 
              type="text" 
              value={chatInput}
              onChange={(e) => setChatInput(e.target.value)}
              placeholder="Test prompt: E.g., 'recent leads summary' or 'outstanding billing'" 
              className="flex-1 bg-black/20 border rounded-xl px-3 py-2.5 text-xs text-white focus:outline-none focus:border-gold"
              style={{ borderColor: isDarkMode ? '#222222' : '#EAEAEA' }}
            />
            <button 
              type="submit"
              className="p-2.5 bg-gold text-[#0A0A0A] font-extrabold rounded-xl transition-all cursor-pointer"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>
          <span className="text-[10px] text-gray-500 italic block">Try sending phrases like 'leads' or 'revenue' next ...</span>
        </div>
      </div>
    </div>
  );
}
