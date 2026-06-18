import React, { useState } from 'react';
import { motion } from 'motion/react';
import { 
  TrendingUp, Users, FolderCheck, DollarSign, Eye, Activity, 
  Percent, Clock, ClipboardList, Inbox, ChevronRight, CornerDownRight 
} from 'lucide-react';

interface OverviewTabProps {
  isDarkMode: boolean;
  users: any[];
}

export function OverviewTab({ isDarkMode, users }: OverviewTabProps) {
  const [hoveredKpi, setHoveredKpi] = useState<number | null>(null);
  const [activeChartTab, setActiveChartTab] = useState<'revenue' | 'visitors' | 'leads'>('revenue');

  // Realistic luxurious mock data for Leopard Luxe
  const kpis = [
    { id: 1, label: 'Monthly Revenue', value: '$184,500', change: '+22.4%', sub: 'vs last month', icon: DollarSign, color: 'text-gold fill-gold/10' },
    { id: 2, label: 'Total Clients', value: '48 Active', change: '+8.3%', sub: '4 onboarded this week', icon: Users, color: 'text-blue-500' },
    { id: 3, label: 'Active Projects', value: '22 Live', change: '+12.5%', sub: '7 in final review', icon: FolderCheck, color: 'text-green-500' },
    { id: 4, label: 'Total Leads', value: '1,428', change: '+18.2%', sub: 'Weekly goal met', icon: TrendingUp, color: 'text-teal-500' },
    { id: 5, label: 'Website Visitors', value: '124,820', change: '+8.9%', sub: 'Avg 4.2k daily', icon: Eye, color: 'text-purple-500' },
    { id: 6, label: 'Total Sessions', value: '82,410', change: '+12.1%', sub: '1.4 sessions/user', icon: Activity, color: 'text-orange-500' },
    { id: 7, label: 'Conversion Rate', value: '3.42%', change: '+0.54%', sub: 'Industry top decile', icon: Percent, color: 'text-pink-500' },
    { id: 8, label: 'Live Visitors', value: '89 Active', change: 'Real-time', sub: 'Active right now', icon: Clock, color: 'text-red-500' },
    { id: 9, label: 'Pending Tasks', value: '14 Priorities', change: '-43%', sub: 'Completed 12 today', icon: ClipboardList, color: 'text-indigo-500' },
    { id: 10, label: 'Form Submissions', value: '328 Forms', change: '+34.5%', sub: 'Conversion rate 23%', icon: Inbox, color: 'text-emerald-500' },
  ];

  const recentActivities = [
    { time: '10 mins ago', desc: 'New luxury lead received: Elena Rostova (Villas Group)', type: 'lead', user: 'Elena R.' },
    { time: '45 mins ago', desc: 'Client approved "Phase 2 Dev" layout for Onyx Estate', type: 'project', user: 'Admin' },
    { time: '1 hour ago', desc: 'Payment of $12,500 settled for SEO & Branding package', type: 'revenue', user: 'Stripe' },
    { time: '3 hours ago', desc: 'WhatsApp campaign automation dispatched: 420 prospective clients', type: 'automation', user: 'CRM System' },
  ];

  return (
    <div className="space-y-8 animate-fade-in">
      {/* HEADER STATEMENT / METADATA INTENT */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="font-serif text-3xl font-bold tracking-tight" style={{ color: isDarkMode ? '#FFFFFF' : '#0A0A0A' }}>
            Executive Overview
          </h2>
          <p className="text-sm mt-1" style={{ color: isDarkMode ? '#999999' : '#666666' }}>
            Real-time critical business insights and performance indicators.
          </p>
        </div>
        <div className="flex items-center gap-2 bg-[#D4AF37]/10 text-[#D4AF37] px-3.5 py-1.5 rounded-full border border-[#D4AF37]/20 select-none text-xs font-mono font-bold uppercase tracking-wider">
          <span className="w-2 h-2 rounded-full bg-[#D4AF37] animate-pulse"></span>
          Operational Status: Peak performance
        </div>
      </div>

      {/* KPI BENTO GRID */}
      <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-5 gap-4">
        {kpis.map((kpi, idx) => {
          const Icon = kpi.icon;
          const isHovered = hoveredKpi === kpi.id;
          return (
            <div
              key={kpi.id}
              className="p-5 rounded-2xl border transition-all duration-300 relative overflow-hidden flex flex-col justify-between"
              onMouseEnter={() => setHoveredKpi(kpi.id)}
              onMouseLeave={() => setHoveredKpi(null)}
              style={{
                backgroundColor: isDarkMode ? '#0F0F0F' : '#FFFFFF',
                borderColor: isDarkMode 
                  ? (isHovered ? 'rgba(212, 175, 55, 0.4)' : '#222222') 
                  : (isHovered ? 'rgba(212, 175, 55, 0.6)' : '#EAEAEA'),
                boxShadow: isHovered 
                  ? (isDarkMode ? '0 10px 30px -10px rgba(212,175,55,0.15)' : '0 12px 24px -8px rgba(0,0,0,0.06)') 
                  : 'none',
                transform: isHovered ? 'translateY(-2px)' : 'none'
              }}
            >
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs font-medium tracking-wide" style={{ color: isDarkMode ? '#999999' : '#666666' }}>
                  {kpi.label}
                </span>
                <div className={`p-2 rounded-xl transition-colors duration-300 ${isDarkMode ? 'bg-[#1F1F1F]' : 'bg-[#FAF9F6]'} ${kpi.color}`}>
                  <Icon className="w-4 h-4" />
                </div>
              </div>
              <div>
                <h4 className="text-2xl font-serif font-bold tracking-tight" style={{ color: isDarkMode ? '#FFFFFF' : '#0A0A0A' }}>
                  {kpi.value}
                </h4>
                <div className="flex items-center gap-1.5 mt-2">
                  <span className={`text-[11px] font-bold font-mono px-1.5 py-0.5 rounded ${
                    kpi.change.startsWith('+') ? 'text-green-500 bg-green-500/10' : 'text-red-500 bg-red-500/10'
                  }`}>
                    {kpi.change}
                  </span>
                  <span className="text-[10px]" style={{ color: isDarkMode ? '#666666' : '#999999' }}>
                    {kpi.sub}
                  </span>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* CHARTS & ACTIVITY */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* CHART CONTAINER - Custom Stunning SVG */}
        <div 
          className="lg:col-span-2 p-6 rounded-3xl border"
          style={{
            backgroundColor: isDarkMode ? '#0F0F0F' : '#FFFFFF',
            borderColor: isDarkMode ? '#222222' : '#EAEAEA'
          }}
        >
          <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-light-gray/10 pb-4 mb-6 gap-4">
            <div>
              <h3 className="font-serif text-lg font-bold" style={{ color: isDarkMode ? '#FFFFFF' : '#0A0A0A' }}>
                Analytics & Growth Engine
              </h3>
              <p className="text-xs" style={{ color: isDarkMode ? '#999999' : '#666666' }}>
                Displaying detailed metrics and linear correlation scales.
              </p>
            </div>
            {/* Chart toggle buttons */}
            <div className="flex p-0.5 rounded-lg border border-light-gray/10 bg-light-gray/5" style={{ borderColor: isDarkMode ? '#222222' : '#EAEAEA' }}>
              <button
                onClick={() => setActiveChartTab('revenue')}
                className={`px-3 py-1 text-xs font-bold rounded-md transition-all ${
                  activeChartTab === 'revenue' 
                    ? 'bg-[#D4AF37] text-[#0A0A0A]' 
                    : 'text-gray-400 hover:text-white'
                }`}
              >
                Revenue
              </button>
              <button
                onClick={() => setActiveChartTab('visitors')}
                className={`px-3 py-1 text-xs font-bold rounded-md transition-all ${
                  activeChartTab === 'visitors' 
                    ? 'bg-[#D4AF37] text-[#0A0A0A]' 
                    : 'text-gray-400 hover:text-white'
                }`}
              >
                Web Traffic
              </button>
              <button
                onClick={() => setActiveChartTab('leads')}
                className={`px-3 py-1 text-xs font-bold rounded-md transition-all ${
                  activeChartTab === 'leads' 
                    ? 'bg-[#D4AF37] text-[#0A0A0A]' 
                    : 'text-gray-400 hover:text-white'
                }`}
              >
                Leads
              </button>
            </div>
          </div>

          {/* SVG CHART CANVAS */}
          <div className="h-64 w-full relative select-none">
            {activeChartTab === 'revenue' && (
              <svg className="w-full h-full overflow-visible" viewBox="0 0 600 240">
                <defs>
                  <linearGradient id="chartGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#D4AF37" stopOpacity="0.4" />
                    <stop offset="100%" stopColor="#D4AF37" stopOpacity="0.0" />
                  </linearGradient>
                </defs>
                {/* Y grids */}
                <line x1="50" y1="40" x2="550" y2="40" stroke={isDarkMode ? '#222222' : '#EAEAEA'} strokeWidth="1" strokeDasharray="3 3" />
                <line x1="50" y1="90" x2="550" y2="90" stroke={isDarkMode ? '#222222' : '#EAEAEA'} strokeWidth="1" strokeDasharray="3 3" />
                <line x1="50" y1="140" x2="550" y2="140" stroke={isDarkMode ? '#222222' : '#EAEAEA'} strokeWidth="1" strokeDasharray="3 3" />
                <line x1="50" y1="190" x2="550" y2="190" stroke={isDarkMode ? '#222222' : '#EAEAEA'} strokeWidth="1" strokeDasharray="3 3" />
                {/* Labels */}
                <text x="20" y="44" className="text-[10px] font-mono fill-gray-500" textAnchor="middle">$200k</text>
                <text x="20" y="94" className="text-[10px] font-mono fill-gray-500" textAnchor="middle">$150k</text>
                <text x="20" y="144" className="text-[10px] font-mono fill-gray-500" textAnchor="middle">$100k</text>
                <text x="20" y="194" className="text-[10px] font-mono fill-gray-500" textAnchor="middle">$50k</text>
                {/* Area under curve */}
                <path
                  d="M 50,195 L 50,180 Q 120,150 180,120 T 320,100 T 440,70 T 550,45 L 550,195 Z"
                  fill="url(#chartGrad)"
                />
                {/* Main line */}
                <path
                  d="M 50,180 Q 120,150 180,120 T 320,100 T 440,70 T 550,45"
                  fill="none"
                  stroke="#D4AF37"
                  strokeWidth="3.5"
                  strokeLinecap="round"
                />
                {/* Interactive Points */}
                <circle cx="180" cy="120" r="5" fill="#D4AF37" />
                <circle cx="320" cy="100" r="5" fill="#D4AF37" />
                <circle cx="440" cy="70" r="5" fill="#D4AF37" />
                <circle cx="550" cy="45" r="7" fill="#0A0A0A" stroke="#D4AF37" strokeWidth="2.5" />
                {/* X Axis */}
                <line x1="50" y1="195" x2="550" y2="195" stroke="#D4AF37" strokeWidth="1" />
                {/* Months */}
                <text x="50" y="215" className="text-[10px] font-mono fill-gray-400" textAnchor="middle">Jan</text>
                <text x="150" y="215" className="text-[10px] font-mono fill-gray-400" textAnchor="middle">Feb</text>
                <text x="250" y="215" className="text-[10px] font-mono fill-gray-400" textAnchor="middle">Mar</text>
                <text x="350" y="215" className="text-[10px] font-mono fill-gray-400" textAnchor="middle">Apr</text>
                <text x="450" y="215" className="text-[10px] font-mono fill-gray-400" textAnchor="middle">May</text>
                <text x="550" y="215" className="text-[10px] font-mono fill-gray-400" textAnchor="middle">June</text>
              </svg>
            )}

            {activeChartTab === 'visitors' && (
              <svg className="w-full h-full overflow-visible" viewBox="0 0 600 240">
                <defs>
                  <linearGradient id="visitorGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#3B82F6" stopOpacity="0.4" />
                    <stop offset="100%" stopColor="#3B82F6" stopOpacity="0.0" />
                  </linearGradient>
                </defs>
                {/* Grid */}
                <line x1="50" y1="40" x2="550" y2="40" stroke={isDarkMode ? '#222222' : '#EAEAEA'} strokeWidth="1" strokeDasharray="3 3" />
                <line x1="50" y1="110" x2="550" y2="110" stroke={isDarkMode ? '#222222' : '#EAEAEA'} strokeWidth="1" strokeDasharray="3 3" />
                <line x1="50" y1="180" x2="550" y2="180" stroke={isDarkMode ? '#222222' : '#EAEAEA'} strokeWidth="1" strokeDasharray="3 3" />
                {/* Labels */}
                <text x="20" y="44" className="text-[10px] font-mono fill-gray-500" textAnchor="middle">150K</text>
                <text x="20" y="114" className="text-[10px] font-mono fill-gray-500" textAnchor="middle">80K</text>
                <text x="20" y="184" className="text-[10px] font-mono fill-gray-500" textAnchor="middle">10K</text>
                {/* Area path */}
                <path d="M 50,180 L 50,140 Q 150,150 250,90 T 450,60 T 550,55 L 550,190 T 50,190 Z" fill="url(#visitorGrad)" />
                {/* Line */}
                <path d="M 50,140 Q 150,150 250,90 T 450,60 T 550,55" fill="none" stroke="#3B82F6" strokeWidth="3" />
                {/* X Axis */}
                <line x1="50" y1="190" x2="550" y2="190" stroke="#3B82F6" strokeWidth="1" />
                {/* Month labels */}
                {[0, 1, 2, 3, 4, 5].map((i) => (
                  <text key={i} x={50 + i * 100} y="210" className="text-[10px] font-mono fill-gray-400" textAnchor="middle">
                    {['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'][i]}
                  </text>
                ))}
              </svg>
            )}

            {activeChartTab === 'leads' && (
              <svg className="w-full h-full overflow-visible" viewBox="0 0 600 240">
                {/* Double Bar Chart */}
                <line x1="50" y1="40" x2="550" y2="40" stroke={isDarkMode ? '#222222' : '#EAEAEA'} strokeWidth="1" />
                <line x1="50" y1="110" x2="550" y2="110" stroke={isDarkMode ? '#222222' : '#EAEAEA'} strokeWidth="1" />
                <line x1="50" y1="180" x2="550" y2="180" stroke={isDarkMode ? '#222222' : '#EAEAEA'} strokeWidth="1" />
                {/* Bars style representation */}
                {[...Array(6)].map((_, i) => {
                  const h1 = [30, 45, 60, 95, 110, 140][i];
                  const h2 = [22, 30, 48, 70, 92, 115][i];
                  const x = 80 + i * 85;
                  return (
                    <g key={i} className="hover:opacity-80 transition-opacity cursor-pointer">
                      {/* Bar 1 - Gold */}
                      <rect x={x} y={180 - h1} width="16" height={h1} fill="#D4AF37" rx="3" />
                      {/* Bar 2 - Gray */}
                      <rect x={x + 20} y={180 - h2} width="16" height={h2} fill={isDarkMode ? '#444444' : '#CCCCCC'} rx="3" />
                    </g>
                  );
                })}
                {/* Axis */}
                <line x1="50" y1="180" x2="550" y2="180" stroke="#EAEAEA" strokeWidth="1" />
                {/* Month labels */}
                {[0, 1, 2, 3, 4, 5].map((i) => (
                  <text key={i} x={100 + i * 85} y="200" className="text-[10px] font-mono fill-gray-400" textAnchor="middle">
                    {['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'][i]}
                  </text>
                ))}
              </svg>
            )}
          </div>
        </div>

        {/* RECENT OPERATIONAL LOGS */}
        <div 
          className="p-6 rounded-3xl border text-left flex flex-col justify-between"
          style={{
            backgroundColor: isDarkMode ? '#0F0F0F' : '#FFFFFF',
            borderColor: isDarkMode ? '#222222' : '#EAEAEA'
          }}
        >
          <div>
            <h3 className="font-serif text-lg font-bold" style={{ color: isDarkMode ? '#FFFFFF' : '#0A0A0A' }}>
              Real-time Logs
            </h3>
            <p className="text-xs mb-6" style={{ color: isDarkMode ? '#999999' : '#666666' }}>
              Latest administrative and user actions.
            </p>

            <div className="space-y-4">
              {recentActivities.map((act, i) => (
                <div key={i} className="flex gap-3 text-xs">
                  <div className="relative flex flex-col items-center">
                    <span className="w-2.5 h-2.5 rounded-full bg-[#D4AF37] ring-4 ring-[#D4AF37]/10 z-10"></span>
                    {i !== recentActivities.length - 1 && (
                      <span className="w-[1.5px] bg-[#EAEAEA] flex-grow my-1" style={{ backgroundColor: isDarkMode ? '#222222' : '#EAEAEA' }}></span>
                    )}
                  </div>
                  <div>
                    <span className="font-serif text-gray-400 block text-[10px] font-bold tracking-widest uppercase">{act.time}</span>
                    <p className="font-medium mt-0.5" style={{ color: isDarkMode ? '#EBEBEB' : '#333333' }}>
                      {act.desc}
                    </p>
                    <span className="text-[10px] text-gold font-bold">Assigned to: {act.user}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <button className="flex items-center justify-center gap-1.5 w-full py-2.5 mt-6 border border-dashed rounded-xl text-xs text-gold font-bold transition-all hover:bg-gold/5 cursor-pointer uppercase tracking-wider" style={{ borderColor: isDarkMode ? '#222222' : '#EAEAEA' }}>
            <span>View Full System Audits</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
}
