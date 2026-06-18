import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Globe, Laptop, Monitor, Smartphone, Compass, ArrowUpRight, 
  MapPin, Clock, ArrowDownRight, RefreshCw, BarChart3, PieChart 
} from 'lucide-react';

interface LiveAnalyticsTabProps {
  isDarkMode: boolean;
}

export function LiveAnalyticsTab({ isDarkMode }: LiveAnalyticsTabProps) {
  const [liveCount, setLiveCount] = useState(89);
  const [activePages, setActivePages] = useState([
    { path: '/', active: 42, title: 'Luxury Agency Home' },
    { path: '/services', active: 22, title: 'Bespoke Agency Services' },
    { path: '/portfolio', active: 15, title: 'Case Studies & Masterpieces' },
    { path: '/discovery', active: 8, title: 'Vanguard Discovery Form' },
    { path: '/portal', active: 2, title: 'Client Membership Portal' },
  ]);

  // Simulate real-time fluctuational traffic entries matching high-status visitors
  useEffect(() => {
    const interval = setInterval(() => {
      setLiveCount(prev => {
        const delta = Math.floor(Math.random() * 7) - 3;
        const nextVal = Math.max(75, Math.min(115, prev + delta));
        
        // Randomly modify page distributions as well
        setActivePages(pages => {
          return pages.map(p => {
            const pageDelta = Math.floor(Math.random() * 3) - 1;
            const nextActive = Math.max(1, p.active + pageDelta);
            return { ...p, active: nextActive };
          }).sort((a,b) => b.active - a.active);
        });

        return nextVal;
      });
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  const metricCards = [
    { label: 'Bounce Rate', value: '28.4%', trend: '-2.1%', sub: 'Healthy industry bounce', isGood: true },
    { label: 'Avg Session Duration', value: '4m 12s', trend: '+14s', sub: 'High engagement quality', isGood: true },
    { label: 'Pages Per Session', value: '3.82 pages', trend: '+8.4%', sub: 'Broad user discovery', isGood: true },
    { label: 'Unique Visitors', value: '42,910', trend: '+18.2%', sub: 'Brand expansion score', isGood: true }
  ];

  const devices = [
    { type: 'Desktop & iMac', pct: 64, icon: Monitor },
    { type: 'iPhone & Android', pct: 28, icon: Smartphone },
    { type: 'iPad & Tablet', pct: 8, icon: Laptop }
  ];

  const countries = [
    { flag: '🇺🇸', name: 'United States', visitors: '14,820', pct: 38 },
    { flag: '🇬🇧', name: 'United Kingdom', visitors: '7,410', pct: 19 },
    { flag: '🇦🇪', name: 'United Arab Emirates', visitors: '4,680', pct: 12 },
    { flag: '🇨🇭', name: 'Switzerland', visitors: '3,900', pct: 10 },
    { flag: '🇸🇬', name: 'Singapore', visitors: '2,730', pct: 7 },
  ];

  const cities = [
    { name: 'Beverly Hills, CA', visitors: '2,840' },
    { name: 'Dubai Marina, UAE', visitors: '1,920' },
    { name: 'Mayfair, London', visitors: '1,450' },
    { name: 'Zurich, Switzerland', visitors: '860' }
  ];

  const browsers = [
    { name: 'Apple Safari', visitors: '28,450', pct: 66 },
    { name: 'Google Chrome', visitors: '12,020', pct: 28 },
    { name: 'Microsoft Edge', visitors: '2,440', pct: 6 },
  ];

  const trafficSources = [
    { source: 'Direct Traffic', sessions: '18,420', revenue: '$92,500' },
    { source: 'SEO / Google Search', sessions: '12,910', revenue: '$48,000' },
    { source: 'Instagram Campaigns', sessions: '6,410', revenue: '$25,000' },
    { source: 'Paid Meta Ads', sessions: '3,900', revenue: '$12,000' },
    { source: 'Email Campaigns', sessions: '1,270', revenue: '$7,000' },
  ];

  return (
    <div className="space-y-6 text-left animate-fade-in">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="font-serif text-3xl font-bold tracking-tight" style={{ color: isDarkMode ? '#FFFFFF' : '#0A0A0A' }}>
            Live Web Analytics
          </h2>
          <p className="text-sm mt-1" style={{ color: isDarkMode ? '#999999' : '#666666' }}>
            Real-time interactive session graphs, funnel conversion layers, and audience tracking metrics.
          </p>
        </div>
        <div className="flex items-center gap-2 bg-green-500/15 text-green-400 px-4 py-2 rounded-full border border-green-500/25">
          <span className="w-2.5 h-2.5 rounded-full bg-green-500 animate-ping"></span>
          <span className="font-bold text-xs uppercase tracking-wider font-mono">{liveCount} VIPs Online</span>
        </div>
      </div>

      {/* METRICS ROW */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {metricCards.map((card, idx) => (
          <div 
            key={idx} 
            className="p-5 rounded-2xl border flex flex-col justify-between"
            style={{ 
              backgroundColor: isDarkMode ? '#0F0F0F' : '#FFFFFF', 
              borderColor: isDarkMode ? '#222222' : '#EAEAEA' 
            }}
          >
            <div className="flex justify-between items-center mb-2">
              <span className="text-xs text-gray-400 font-medium uppercase tracking-wider">{card.label}</span>
              <span className={`text-xs font-mono font-bold ${card.isGood ? 'text-green-500' : 'text-red-500'}`}>
                {card.trend}
              </span>
            </div>
            <div>
              <span className="text-2xl font-serif font-bold text-white leading-none block mb-1" style={{ color: isDarkMode ? '#FFFFFF' : '#0A0A0A' }}>
                {card.value}
              </span>
              <span className="text-[10px] text-gray-500 block">{card.sub}</span>
            </div>
          </div>
        ))}
      </div>

      {/* CHANNELS & CORE ACTIVE PAGES */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* ACTIVE PAGES ROW (Notion style) */}
        <div 
          className="lg:col-span-2 p-6 rounded-3xl border flex flex-col justify-between"
          style={{ 
            backgroundColor: isDarkMode ? '#0F0F0F' : '#FFFFFF', 
            borderColor: isDarkMode ? '#222222' : '#EAEAEA' 
          }}
        >
          <div>
            <div className="flex justify-between items-center mb-6">
              <div>
                <h3 className="font-serif text-lg font-bold" style={{ color: isDarkMode ? '#FFFFFF' : '#0A0A0A' }}>
                  Live Path Navigation
                </h3>
                <p className="text-xs" style={{ color: isDarkMode ? '#999999' : '#666666' }}>
                  Realtime tracking of pages currently being browsed by active sessions.
                </p>
              </div>
              <RefreshCw className="w-4 h-4 text-gold animate-spin-slow cursor-pointer" />
            </div>

            <div className="space-y-3.5">
              {activePages.map((page, i) => (
                <div key={i} className="flex items-center justify-between">
                  <div className="flex items-center gap-3 flex-1 overflow-hidden">
                    <span className="w-1.5 h-1.5 rounded-full bg-gold shrink-0"></span>
                    <span className="font-mono text-xs text-gray-400 block shrink-0 w-24">
                      {page.path}
                    </span>
                    <span className="truncate text-xs text-gray-400 font-medium">
                      {page.title}
                    </span>
                  </div>
                  <div className="flex items-center gap-3">
                    {/* Linear Style Horizontal Indicator */}
                    <div className="w-24 bg-light-gray/5 h-1.5 rounded-full overflow-hidden hidden sm:block" style={{ backgroundColor: isDarkMode ? '#222222' : '#F1F1F1' }}>
                      <motion.div 
                        className="bg-gold h-full rounded-full" 
                        animate={{ width: `${(page.active / 45) * 100}%` }}
                        transition={{ duration: 0.8 }}
                      />
                    </div>
                    <span className="text-xs font-bold w-12 text-right" style={{ color: isDarkMode ? '#FFFFFF' : '#0A0A0A' }}>
                      {page.active} active
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="border-t border-light-gray/5 mt-6 pt-4 flex justify-between items-center text-xs">
            <span style={{ color: isDarkMode ? '#666666' : '#999999' }}>Live synchronization pipeline running ...</span>
            <span className="text-gold font-bold flex items-center gap-1 cursor-pointer">
              <span>View Route Filters</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </span>
          </div>
        </div>

        {/* DEVICE COMPOSITION (Apple style Circular percentages) */}
        <div 
          className="p-6 rounded-3xl border flex flex-col justify-between"
          style={{ 
            backgroundColor: isDarkMode ? '#0F0F0F' : '#FFFFFF', 
            borderColor: isDarkMode ? '#222222' : '#EAEAEA' 
          }}
        >
          <div>
            <h3 className="font-serif text-lg font-bold" style={{ color: isDarkMode ? '#FFFFFF' : '#0A0A0A' }}>
              Device / Hardware Stack
            </h3>
            <p className="text-xs mb-6" style={{ color: isDarkMode ? '#999999' : '#666666' }}>
              Hardware screen breakdowns of high-end users.
            </p>

            <div className="space-y-4">
              {devices.map((device, i) => {
                const Icon = device.icon;
                return (
                  <div key={i}>
                    <div className="flex justify-between items-center text-xs mb-1.5">
                      <span className="flex items-center gap-2 text-gray-400">
                        <Icon className="w-4 h-4 text-gold" />
                        {device.type}
                      </span>
                      <span className="font-bold font-mono" style={{ color: isDarkMode ? '#FFFFFF' : '#0A0A0A' }}>
                        {device.pct}%
                      </span>
                    </div>
                    {/* Sleek Golden Stripe */}
                    <div className="bg-[#1C1C1D] h-2 rounded-full overflow-hidden" style={{ backgroundColor: isDarkMode ? '#222222' : '#FAF9F6' }}>
                      <div className="bg-gold h-full rounded-full" style={{ width: `${device.pct}%` }}></div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="bg-[#FAF9F6] p-4 rounded-2xl border mt-6 flex justify-between items-center text-xs" style={{ backgroundColor: isDarkMode ? '#1F1F21' : '#FAF9F6', borderColor: isDarkMode ? '#2E2E31' : '#EAEAEA' }}>
            <span style={{ color: isDarkMode ? '#999999' : '#666666' }}>Target Audience Focus:</span>
            <span className="text-gold font-extrabold">Retina iMac & Safari</span>
          </div>
        </div>
      </div>

      {/* CONVERSION FUNNEL & TRAFFIC SOURCES */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* GEOLOCATION HUB & LOCALIZED AUDIENCES */}
        <div 
          className="p-6 rounded-3xl border"
          style={{ 
            backgroundColor: isDarkMode ? '#0F0F0F' : '#FFFFFF', 
            borderColor: isDarkMode ? '#222222' : '#EAEAEA' 
          }}
        >
          <div className="flex justify-between items-start mb-6">
            <div>
              <h3 className="font-serif text-lg font-bold" style={{ color: isDarkMode ? '#FFFFFF' : '#0A0A0A' }}>
                High-net Audience Hotspots
              </h3>
              <p className="text-xs" style={{ color: isDarkMode ? '#999999' : '#666666' }}>
                Strategic locations drive highest average contract values.
              </p>
            </div>
            <Globe className="w-4 h-4 text-gold" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Countries List */}
            <div className="space-y-3">
              <span className="text-[10px] uppercase tracking-wider text-gray-500 font-bold block">Top Countries</span>
              {countries.map((cnt, i) => (
                <div key={i} className="flex justify-between items-center text-xs">
                  <div className="flex items-center gap-2">
                    <span className="text-lg leading-none">{cnt.flag}</span>
                    <span style={{ color: isDarkMode ? '#EBEBEB' : '#333333' }}>{cnt.name}</span>
                  </div>
                  <span className="font-bold" style={{ color: isDarkMode ? '#FFFFFF' : '#0A0A0A' }}>{cnt.pct}%</span>
                </div>
              ))}
            </div>

            {/* Cities and Micro Maps simulation list */}
            <div className="space-y-3">
              <span className="text-[10px] uppercase tracking-wider text-gray-500 font-bold block">Target Premium Cities</span>
              {cities.map((city, i) => (
                <div key={i} className="p-3 bg-light-gray/5 border rounded-xl flex justify-between items-center text-xs" style={{ borderColor: isDarkMode ? '#222222' : '#EAEAEA' }}>
                  <div className="flex items-center gap-2">
                    <MapPin className="w-3.5 h-3.5 text-gold" />
                    <span className="font-medium" style={{ color: isDarkMode ? '#EBEBEB' : '#0A0A0A' }}>{city.name}</span>
                  </div>
                  <span className="font-mono text-gold font-bold">{city.visitors}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* TRAFFIC SOURCES INTERACTIVE BREAKDOWN */}
        <div 
          className="p-6 rounded-3xl border"
          style={{ 
            backgroundColor: isDarkMode ? '#0F0F0F' : '#FFFFFF', 
            borderColor: isDarkMode ? '#222222' : '#EAEAEA' 
          }}
        >
          <div className="flex justify-between items-start mb-6">
            <div>
              <h3 className="font-serif text-lg font-bold" style={{ color: isDarkMode ? '#FFFFFF' : '#0A0A0A' }}>
                Paid Acquisition & Traffic Engine
              </h3>
              <p className="text-xs" style={{ color: isDarkMode ? '#999999' : '#666666' }}>
                Breakdown of traffic sessions and attributed marketing ROI.
              </p>
            </div>
            <BarChart3 className="w-4 h-4 text-gold" />
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
               <thead>
                 <tr className="border-b border-light-gray/15 text-gray-500 font-bold select-none">
                   <th className="pb-3">Source Channel</th>
                   <th className="pb-3 text-right">Sessions</th>
                   <th className="pb-3 text-right">Attributed Revenue</th>
                 </tr>
               </thead>
               <tbody className="divide-y divide-light-gray/10">
                 {trafficSources.map((src, i) => (
                   <tr key={i} className="hover:bg-white/5 transition-colors">
                     <td className="py-2.5 font-bold" style={{ color: isDarkMode ? '#EBEBEB' : '#0A0A0A' }}>{src.source}</td>
                     <td className="py-2.5 text-right text-gray-400 font-mono">{src.sessions}</td>
                     <td className="py-2.5 text-right text-gold font-bold font-mono">{src.revenue}</td>
                   </tr>
                 ))}
               </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
