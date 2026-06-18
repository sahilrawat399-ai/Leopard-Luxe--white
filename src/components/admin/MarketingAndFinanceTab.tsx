import React from 'react';
import { motion } from 'motion/react';
import { 
  DollarSign, Landmark, Receipt, CircleDollarSign, TrendingUp, 
  Search, Sliders, Globe, BarChart2, PieChart, Info 
} from 'lucide-react';

interface MarketingAndFinanceTabProps {
  isDarkMode: boolean;
}

export function MarketingAndFinanceTab({ isDarkMode }: MarketingAndFinanceTabProps) {
  // Financial Overview data
  const finStats = [
    { label: 'Monthly Revenue', value: '$184,500', sub: 'Project targets met', change: '+22%' },
    { label: 'Annual Revenue', value: '$1.42M', sub: '92% of annual projection', change: '+45%' },
    { label: 'Pending Payments', value: '$24,000', sub: '4 client invoices outstanding', change: '-12%' },
    { label: 'Profit Margin', value: '78.5%', sub: 'High-leverage digital model', change: '+3.4%' }
  ];

  const metaAds = {
    spend: '$12,400', leads: 428, cpc: '$2.90', cpm: '$18.50', ctr: '3.42%', roas: '4.8x'
  };

  const googleAds = {
    spend: '$8,900', clicks: 2740, conversions: 184, cpc: '$3.25', ctr: '4.89%', roas: '5.2x'
  };

  const seoData = [
    { keyword: 'bespoke digital marketing agency', rank: '#2', vol: '12K', traffic: '+18% MoM' },
    { keyword: 'luxury web designer Beverly Hills', rank: '#1', vol: '4.2K', traffic: '+25% MoM' },
    { keyword: 'ultra premium design retainer', rank: '#4', vol: '2.8K', traffic: '+14% MoM' },
    { keyword: 'Instagram reel automation expert', rank: '#3', vol: '8.4K', traffic: '+32% MoM' }
  ];

  return (
    <div className="space-y-6 text-left animate-fade-in animate-duration-300">
      {/* HEADER STATEMENT */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="font-serif text-3xl font-bold tracking-tight" style={{ color: isDarkMode ? '#FFFFFF' : '#0A0A0A' }}>
            Marketing ROI & Corporate Finance
          </h2>
          <p className="text-sm mt-1" style={{ color: isDarkMode ? '#999999' : '#666666' }}>
            Track outstanding capital invoices, monthly margins, Meta & Google campaign ROAS, and live organic search ranking audits.
          </p>
        </div>
      </div>

      {/* FINANCE HIGHLIGHTS BENTO */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {finStats.map((stat, i) => (
          <div 
            key={stat.label}
            className="p-5 rounded-2xl border"
            style={{ 
              backgroundColor: isDarkMode ? '#0F0F0F' : '#FFFFFF', 
              borderColor: isDarkMode ? '#222222' : '#EAEAEA' 
            }}
          >
            <div className="flex justify-between items-center text-xs mb-2">
              <span className="text-gray-500 font-medium uppercase tracking-wider">{stat.label}</span>
              <span className="text-green-500 font-mono font-bold bg-green-500/10 px-1.5 py-0.5 rounded">{stat.change}</span>
            </div>
            <div>
              <span className="text-2xl font-serif font-bold leading-none block mb-1" style={{ color: isDarkMode ? '#FFFFFF' : '#0A0A0A' }}>
                {stat.value}
              </span>
              <span className="text-[10px] text-gray-400 block">{stat.sub}</span>
            </div>
          </div>
        ))}
      </div>

      {/* DETAILED AD CAMPAIGNS (Meta & Google ads breakdown) */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* META ADSUITE */}
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
                  Meta & Instagram Suite
                </h3>
                <p className="text-xs text-gray-500">Live spend & lead generation logs.</p>
              </div>
              <span className="text-xs font-mono font-bold bg-gold/10 text-gold border border-gold/20 px-2 py-1 rounded-full">Meta Conversions Active</span>
            </div>

            <div className="grid grid-cols-3 gap-4">
              <div className="p-3.5 bg-black/10 rounded-xl">
                <span className="text-[9px] uppercase tracking-wider text-gray-500 block">Total Spend</span>
                <span className="text-lg font-bold font-mono" style={{ color: isDarkMode ? '#FFFFFF' : '#0A0A0A' }}>{metaAds.spend}</span>
              </div>
              <div className="p-3.5 bg-black/10 rounded-xl">
                <span className="text-[9px] uppercase tracking-wider text-gray-500 block">Leads Generated</span>
                <span className="text-lg font-bold font-mono text-gold">{metaAds.leads}</span>
              </div>
              <div className="p-3.5 bg-black/10 rounded-xl">
                <span className="text-[9px] uppercase tracking-wider text-gray-500 block">Current ROAS</span>
                <span className="text-lg font-bold font-mono text-green-500">{metaAds.roas}</span>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-4 mt-4 text-[11px] border-t pt-4" style={{ borderColor: isDarkMode ? '#222222' : '#F1F1F1' }}>
              <div>
                <span className="text-gray-500 block">Avg CPC</span>
                <span className="font-bold font-mono" style={{ color: isDarkMode ? '#EBEBEB' : '#0A0A0A' }}>{metaAds.cpc}</span>
              </div>
              <div>
                <span className="text-gray-500 block">CPM Rate</span>
                <span className="font-bold font-mono" style={{ color: isDarkMode ? '#EBEBEB' : '#0A0A0A' }}>{metaAds.cpm}</span>
              </div>
              <div>
                <span className="text-gray-500 block">Avg CTR</span>
                <span className="font-bold font-mono" style={{ color: isDarkMode ? '#EBEBEB' : '#0A0A0A' }}>{metaAds.ctr}</span>
              </div>
            </div>
          </div>

          <div className="border-t mt-6 pt-4 text-[10px] text-gray-500 italic block">
            Automatic tracking connected via Meta Conversions API (CAPI).
          </div>
        </div>

        {/* GOOGLE ADWORDS */}
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
                  Google Adwords Suite
                </h3>
                <p className="text-xs text-gray-500">Live search clicks & conversion counts.</p>
              </div>
              <span className="text-xs font-mono font-bold bg-gold/10 text-gold border border-gold/20 px-2 py-1 rounded-full">Ads Tag Engaged</span>
            </div>

            <div className="grid grid-cols-3 gap-4">
              <div className="p-3.5 bg-black/10 rounded-xl">
                <span className="text-[9px] uppercase tracking-wider text-gray-500 block">Total Spend</span>
                <span className="text-lg font-bold font-mono" style={{ color: isDarkMode ? '#FFFFFF' : '#0A0A0A' }}>{googleAds.spend}</span>
              </div>
              <div className="p-3.5 bg-black/10 rounded-xl">
                <span className="text-[9px] uppercase tracking-wider text-gray-500 block">Total Clicks</span>
                <span className="text-lg font-bold font-mono text-gold">{googleAds.clicks}</span>
              </div>
              <div className="p-3.5 bg-black/10 rounded-xl">
                <span className="text-[9px] uppercase tracking-wider text-gray-500 block">Total ROAS</span>
                <span className="text-lg font-bold font-mono text-green-500">{googleAds.roas}</span>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-4 mt-4 text-[11px] border-t pt-4" style={{ borderColor: isDarkMode ? '#222222' : '#F1F1F1' }}>
              <div>
                <span className="text-gray-500 block">Avg CPC</span>
                <span className="font-bold font-mono" style={{ color: isDarkMode ? '#EBEBEB' : '#0A0A0A' }}>{googleAds.cpc}</span>
              </div>
              <div>
                <span className="text-gray-500 block">Conversions</span>
                <span className="font-bold font-mono" style={{ color: isDarkMode ? '#EBEBEB' : '#0A0A0A' }}>{googleAds.conversions}</span>
              </div>
              <div>
                <span className="text-gray-500 block">Avg CTR</span>
                <span className="font-bold font-mono" style={{ color: isDarkMode ? '#EBEBEB' : '#0A0A0A' }}>{googleAds.ctr}</span>
              </div>
            </div>
          </div>

          <div className="border-t mt-6 pt-4 text-[10px] text-gray-500 italic block">
            Ad attribution verified by GTM and Google Analytics 4.
          </div>
        </div>
      </div>

      {/* SEO ORGANIC KEYWORD TRACKER */}
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
              SEO Keywords & Organic Rank Tracking
            </h3>
            <p className="text-xs text-gray-500">Continuous monitoring of dominant luxury search terms.</p>
          </div>
          <Globe className="w-5 h-5 text-gold" />
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-xs">
            <thead>
              <tr className="border-b border-light-gray/10 text-gray-500 font-bold font-mono select-none">
                <th className="pb-3">Search Term Phrase</th>
                <th className="pb-3 text-center">Google Rank Position</th>
                <th className="pb-3 text-center">Est. Search Volume</th>
                <th className="pb-3 text-right">Traffic Trend Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-light-gray/5">
              {seoData.map((term, i) => (
                <tr key={i} className="hover:bg-white/5 transition-colors">
                  <td className="py-3 font-bold" style={{ color: isDarkMode ? '#EBEBEB' : '#0A0A0A' }}>
                    {term.keyword}
                  </td>
                  <td className="py-3 text-center text-gold font-bold font-mono">
                    {term.rank}
                  </td>
                  <td className="py-3 text-center text-gray-400 font-mono">
                    {term.vol} / mo
                  </td>
                  <td className="py-3 text-right text-green-500 font-bold font-mono">
                    {term.traffic}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
