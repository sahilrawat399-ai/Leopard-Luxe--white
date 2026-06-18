import React, { useState } from 'react';
import { motion } from 'motion/react';
import { 
  Settings, FileSpreadsheet, FileDown, ShieldAlert, BadgeCheck, 
  CheckCircle, Zap, RefreshCw, KeyRound, Palette, Sparkles 
} from 'lucide-react';

interface SettingsAndReportsTabProps {
  isDarkMode: boolean;
}

export function SettingsAndReportsTab({ isDarkMode }: SettingsAndReportsTabProps) {
  // Mock API connection checks
  const [connections, setConnections] = useState([
    { name: 'Firebase Firestore DB', active: true, desc: 'Live socket channels connected' },
    { name: 'Google Gemini Pro API', active: true, desc: 'Text-to-marketing models active' },
    { name: 'Stripe Corporate Billing', active: true, desc: 'Client retainer gateway online' },
    { name: 'Meta Conversions API (CAPI)', active: true, desc: 'Interactive lead click tracking' },
    { name: 'Google Maps platform API', active: false, desc: 'Target location autocompletes' }
  ]);

  const [brandingName, setBrandingName] = useState('Leopard Luxe');
  const [accentColor, setAccentColor] = useState('#D4AF37');
  const [downloading, setDownloading] = useState<{ [key: string]: boolean }>({});

  const handleExportSummary = (type: string) => {
    setDownloading(prev => ({ ...prev, [type]: true }));
    
    setTimeout(() => {
      setDownloading(prev => ({ ...prev, [type]: false }));
      
      // Execute standard downloadable string
      const summaryText = `--- LEOPARD LUXE CORPORATE REPORT ----\nExport Date: ${new Date().toLocaleDateString()}\nRevenue Metrics: $184,500/mo Recurrent\nTotal Leads Matched: 1,428 prospects\nActive Fullfilled Projects: 22 digital campaigns\nCore Admin: sahilrawat399@gmail.com\n---------------------------------`;
      const blob = new Blob([summaryText], { type: 'text/plain;charset=utf-8;' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.setAttribute("href", url);
      link.setAttribute("download", `Leopard_Luxe_Executive_Summary_${Date.now()}.${type === 'csv' ? 'csv' : 'txt'}`);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }, 1500);
  };

  return (
    <div className="space-y-6 text-left animate-fade-in">
      {/* HEADER BAR */}
      <h2 className="font-serif text-3xl font-bold tracking-tight" style={{ color: isDarkMode ? '#FFFFFF' : '#0A0A0A' }}>
        Corporate Settings & Executives Center
      </h2>
      <p className="text-sm" style={{ color: isDarkMode ? '#999999' : '#666666' }}>
        Download operational dossiers, modify premium visual color parameters, and run real-time API authentication integrity audits.
      </p>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">

        {/* REPORTS & EXPORTS */}
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
                  Enterprise Dossier Exports
                </h3>
                <p className="text-xs text-gray-500">Generate certified business briefs.</p>
              </div>
              <FileDown className="w-5 h-5 text-gold" />
            </div>

            <div className="space-y-4">
              {/* PDF Audit */}
              <div className="p-4 bg-black/10 rounded-2xl flex items-center justify-between border border-white/5">
                <div>
                  <span className="text-xs font-bold block" style={{ color: isDarkMode ? '#FFFFFF' : '#0A0A0A' }}>Executive General Booklet</span>
                  <span className="text-[10px] text-gray-400 block mt-0.5">Summary of revenue, leads, and staff metrics.</span>
                </div>
                <button
                  onClick={() => handleExportSummary('pdf')}
                  disabled={downloading['pdf']}
                  className="px-3.5 py-2 bg-gold text-[#0A0A0A] font-extrabold uppercase text-[10px] tracking-wider rounded-xl hover:bg-gold/90 transition-all cursor-pointer"
                >
                  {downloading['pdf'] ? 'Preparing...' : 'Export PDF'}
                </button>
              </div>

              {/* Excel Spreadsheet */}
              <div className="p-4 bg-black/10 rounded-2xl flex items-center justify-between border border-white/5">
                <div>
                  <span className="text-xs font-bold block" style={{ color: isDarkMode ? '#FFFFFF' : '#0A0A0A' }}>Campaign Leads Spreadsheet</span>
                  <span className="text-[10px] text-gray-400 block mt-0.5">Details and status indices for all 1,428 prospects.</span>
                </div>
                <button
                  onClick={() => handleExportSummary('csv')}
                  disabled={downloading['csv']}
                  className="px-3.5 py-2 bg-gold text-[#0A0A0A] font-extrabold uppercase text-[10px] tracking-wider rounded-xl hover:bg-gold/90 transition-all cursor-pointer"
                >
                  {downloading['csv'] ? 'Generating...' : 'Export CSV'}
                </button>
              </div>
            </div>
          </div>

          <div className="mt-6 text-[10px] text-gray-400 leading-relaxed border-t pt-4">
            Security Notice: Exporting confidential corporate resources tracks access protocols inside the live system logs.
          </div>
        </div>

        {/* INTEGRATIONS & API HEALTH CHECKER */}
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
                  API Integrity Auditer
                </h3>
                <p className="text-xs text-gray-500">Live validation checks for corporate connections.</p>
              </div>
              <KeyRound className="w-5 h-5 text-gold" />
            </div>

            <div className="space-y-3">
              {connections.map((api, i) => (
                <div key={api.name} className="flex items-center justify-between text-xs">
                  <div>
                    <span className="font-bold block" style={{ color: isDarkMode ? '#EBEBEB' : '#0A0A0A' }}>{api.name}</span>
                    <span className="text-[10px] text-gray-500 block">{api.desc}</span>
                  </div>
                  <span className={`text-[9px] font-bold font-mono uppercase tracking-wider px-2 py-0.5 rounded border ${
                    api.active 
                      ? 'bg-green-500/15 text-green-400 border-green-500/10' 
                      : 'bg-red-500/15 text-red-400 border-red-500/10'
                  }`}>
                    {api.active ? 'Authenticated' : 'Configure Pending'}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <button className="flex items-center justify-center gap-1.5 w-full py-2.5 mt-6 border border-dashed rounded-xl text-xs text-gold font-bold transition-all hover:bg-gold/5 cursor-pointer uppercase tracking-wider" style={{ borderColor: isDarkMode ? '#222222' : '#EAEAEA' }}>
            <span>Refresh Auth Integrity Keys</span>
            <RefreshCw className="w-3.5 h-3.5 animate-spin-slow" />
          </button>
        </div>

      </div>

      {/* CORE BRAND CUSTOMIZER */}
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
              Bespoke Asset Identity Settings
            </h3>
            <p className="text-xs text-gray-500">Modify typography styles and secondary hex indices.</p>
          </div>
          <Palette className="w-5 h-5 text-gold" />
        </div>

        <form onSubmit={(e) => { e.preventDefault(); alert("Corporate visual identity configurations persisted!"); }} className="grid grid-cols-1 md:grid-cols-3 gap-6 text-xs font-medium">
          <div>
            <label className="block text-gray-500 font-bold uppercase tracking-wider mb-2">Corporate Brand Header</label>
            <input 
              type="text" 
              value={brandingName}
              onChange={(e) => setBrandingName(e.target.value)}
              className="w-full bg-black/10 border p-3 rounded-xl focus:border-gold focus:outline-none"
              style={{ borderColor: isDarkMode ? '#222222' : '#EAEAEA', color: isDarkMode ? '#FFFFFF' : '#0A0A0A' }}
            />
          </div>

          <div>
            <label className="block text-gray-500 font-bold uppercase tracking-wider mb-2">Accent Gold Hex Value</label>
            <input 
              type="text" 
              value={accentColor}
              onChange={(e) => setAccentColor(e.target.value)}
              className="w-full font-mono bg-black/10 border p-3 rounded-xl focus:border-gold focus:outline-none"
              style={{ borderColor: isDarkMode ? '#222222' : '#EAEAEA', color: isDarkMode ? '#FFFFFF' : '#0A0A0A' }}
            />
          </div>

          <div>
            <label className="block text-gray-500 font-bold uppercase tracking-wider mb-2">Save Brand Preferences</label>
            <button 
              type="submit"
              className="w-full py-3 bg-gold text-[#0A0A0A] font-extrabold uppercase tracking-widest hover:bg-gold/90 rounded-xl transition-all select-none cursor-pointer"
            >
              Update Brand Identity
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
