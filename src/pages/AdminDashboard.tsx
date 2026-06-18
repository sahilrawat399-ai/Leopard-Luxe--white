import React, { useState, useEffect } from 'react';
import { useAuthStore } from '../stores/authStore';
import { db, auth } from '../lib/firebase';
import { collection, query, onSnapshot, orderBy, updateDoc, doc, deleteDoc } from 'firebase/firestore';
import { handleFirestoreError, OperationType } from '../lib/firestore-errors';
import { useNavigate } from 'react-router-dom';
import { format } from 'date-fns';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Users, Calendar, Briefcase, LogOut, FileText, Trash2, 
  LayoutDashboard, Activity, Heart, Contact, Landmark, Sparkles, 
  Settings, Crown, Sun, Moon, CheckCircle2, AlertOctagon, HelpCircle 
} from 'lucide-react';
import { trackCustomEvent } from '../lib/analytics';

// Modular Tab Component Imports
import { OverviewTab } from '../components/admin/OverviewTab';
import { LiveAnalyticsTab } from '../components/admin/LiveAnalyticsTab';
import { LeadsAndFormsTab } from '../components/admin/LeadsAndFormsTab';
import { ClientsAndProjectsTab } from '../components/admin/ClientsAndProjectsTab';
import { TasksAndTeamTab } from '../components/admin/TasksAndTeamTab';
import { MarketingAndFinanceTab } from '../components/admin/MarketingAndFinanceTab';
import { ContentAndAutomationTab } from '../components/admin/ContentAndAutomationTab';
import { SettingsAndReportsTab } from '../components/admin/SettingsAndReportsTab';

export function AdminDashboard() {
  const { dbUser, user, loading } = useAuthStore();
  const navigate = useNavigate();

  // Active Tab state (default to executive Overview)
  const [activeTab, setActiveTab] = useState<
    'overview' | 'live-analytics' | 'leads' | 'projects' | 'tasks' | 'marketing-finance' | 'content-automation' | 'meetings' | 'settings-reports'
  >('overview');

  // Theme support (Light Mode default #FFFFFF and #FAF9F6)
  const [isDarkMode, setIsDarkMode] = useState<boolean>(() => {
    const saved = localStorage.getItem('leopard_luxe_admin_theme_mode');
    return saved === 'dark';
  });

  // Users and Meetings live datasets
  const [users, setUsers] = useState<any[]>([]);
  const [bookings, setBookings] = useState<any[]>([]);

  // Enforce rigid Admin email protection
  useEffect(() => {
    if (!loading) {
      const isTargetAdmin = user?.email?.toLowerCase() === 'sahilrawat399@gmail.com';
      if (!isTargetAdmin) {
        navigate('/portal');
      }
    }
  }, [user, loading, navigate]);

  // Sync isDarkMode to localStorage preference
  useEffect(() => {
    localStorage.setItem('leopard_luxe_admin_theme_mode', isDarkMode ? 'dark' : 'light');
  }, [isDarkMode]);

  // Real-time Users hook
  useEffect(() => {
    const isTargetAdmin = user?.email?.toLowerCase() === 'sahilrawat399@gmail.com';
    if (!isTargetAdmin) return;

    const unsubscribe = onSnapshot(collection(db, 'users'), snapshot => {
      setUsers(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    }, error => {
      handleFirestoreError(error, OperationType.GET, 'users');
    });
    return () => unsubscribe();
  }, [user]);

  // Real-time Bookings list hook
  useEffect(() => {
    const isTargetAdmin = user?.email?.toLowerCase() === 'sahilrawat399@gmail.com';
    if (!isTargetAdmin) return;

    const q = query(collection(db, 'bookings'), orderBy('createdAt', 'desc'));
    const unsubscribe = onSnapshot(q, snapshot => {
      setBookings(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    }, error => {
      handleFirestoreError(error, OperationType.GET, 'bookings');
    });
    return () => unsubscribe();
  }, [user]);

  // Booking Actions
  const updateBookingStatus = async (bookingId: string, newStatus: string) => {
    try {
      await updateDoc(doc(db, 'bookings', bookingId), {
        status: newStatus
      });
    } catch(err) {
      handleFirestoreError(err, OperationType.UPDATE, `bookings/${bookingId}`);
    }
  };

  const handleDeleteBooking = async (bookingId: string) => {
    if (!window.confirm(`Are you absolutely sure you want to delete Booking #${bookingId}?`)) {
      return;
    }
    try {
      await deleteDoc(doc(db, 'bookings', bookingId));
    } catch(err) {
      handleFirestoreError(err, OperationType.DELETE, `bookings/${bookingId}`);
    }
  };

  const handleLogout = async () => {
    trackCustomEvent('Sign Out');
    await auth.signOut();
    navigate('/login');
  };

  if (loading || !user) {
    return (
      <div className="min-h-screen bg-[#FAF9F6] flex flex-col items-center justify-center gap-4">
        <div className="w-10 h-10 border-2 border-[#D4AF37] border-t-transparent rounded-full animate-spin"></div>
        <p className="font-serif text-sm tracking-wider text-charcoal">Authenticating Executive parameters...</p>
      </div>
    );
  }

  // Left side navigational groupings layout
  const navigationItems = [
    {
      groupName: 'CORE COMMAND',
      items: [
        { id: 'overview', name: 'Overview', icon: LayoutDashboard },
        { id: 'live-analytics', name: 'Live Traffic', icon: Activity },
      ]
    },
    {
      groupName: 'REVENUE & CLIENTS',
      items: [
        { id: 'leads', name: 'Leads & CRM', icon: Users },
        { id: 'marketing-finance', name: 'ROI & Finance', icon: Landmark },
      ]
    },
    {
      groupName: 'DELIVERY SYSTEMS',
      items: [
        { id: 'projects', name: 'Projects Desk', icon: Briefcase },
        { id: 'meetings', name: 'Meetings Hub', icon: Calendar, badge: bookings.filter(b => b.status === 'Pending').length },
        { id: 'tasks', name: 'Operational Board', icon: CheckCircle2 },
      ]
    },
    {
      groupName: 'CONTENT & ENGINE',
      items: [
        { id: 'content-automation', name: 'Media Planner', icon: Sparkles },
        { id: 'settings-reports', name: 'System Settings', icon: Settings },
      ]
    }
  ];

  return (
    <main 
      className="min-h-screen text-left transition-colors duration-300 relative flex"
      style={{ 
        backgroundColor: isDarkMode ? '#050505' : '#FAF9F6',
        color: isDarkMode ? '#FFFFFF' : '#0A0A0A'
      }}
    >
      {/* 1. LEFT SIDEBAR */}
      <aside 
        className="w-76 shrink-0 border-r flex flex-col justify-between p-6 select-none bg-white z-20 hidden xl:flex lg:sticky lg:top-0 h-screen"
        style={{ 
          backgroundColor: isDarkMode ? '#0A0A0B' : '#FFFFFF',
          borderColor: isDarkMode ? '#1E1E20' : '#EAEAEA'
        }}
      >
        <div className="space-y-8">
          {/* Brand Crown */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gold/10 border border-gold/40 rounded-xl flex items-center justify-center shrink-0">
              <Crown className="w-5 h-5 text-gold" style={{ filter: 'drop-shadow(0 2px 4px rgba(212,175,55,0.3))' }} />
            </div>
            <div>
              <span className="font-serif font-black text-lg tracking-wide uppercase leading-none block">
                Leopard Luxe
              </span>
              <span className="text-[10px] text-gray-500 font-bold uppercase tracking-widest block mt-0.5">
                Vanguard Portal
              </span>
            </div>
          </div>

          {/* Navigation Categories */}
          <div className="space-y-6">
            {navigationItems.map(group => (
              <div key={group.groupName} className="space-y-2">
                <span className="text-[10px] font-bold text-gray-500 font-mono tracking-widest block">
                  {group.groupName}
                </span>
                <div className="space-y-1">
                  {group.items.map(nav => {
                    const Icon = nav.icon;
                    const isActive = activeTab === nav.id;
                    return (
                      <button
                        key={nav.id}
                        onClick={() => setActiveTab(nav.id as any)}
                        className="w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-bold transition-all relative overflow-hidden group cursor-pointer"
                        style={{
                          backgroundColor: isActive ? 'rgba(212,175,55,0.08)' : 'transparent',
                          color: isActive ? '#D4AF37' : (isDarkMode ? '#A1A1AA' : '#4b5563')
                        }}
                      >
                        <div className="flex items-center gap-3">
                          <Icon className={`w-4 h-4 transition-colors ${isActive ? 'text-gold' : 'text-gray-400 group-hover:text-gold'}`} />
                          <span className="font-medium">{nav.name}</span>
                        </div>
                        {nav.badge !== undefined && nav.badge > 0 && (
                          <span className="bg-gold text-black font-extrabold text-[9px] px-1.5 py-0.5 rounded-full">
                            {nav.badge}
                          </span>
                        )}
                      </button>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom Profile / Exit */}
        <div className="border-t pt-4" style={{ borderColor: isDarkMode ? '#222222' : '#F1F1F1' }}>
          <div className="flex items-center gap-3 mb-4">
            <div className="w-8 h-8 rounded-full bg-gold/10 border border-gold/40 text-gold flex items-center justify-center font-bold font-serif text-sm">
              S
            </div>
            <div className="min-w-0">
              <span className="font-bold text-xs truncate block" style={{ color: isDarkMode ? '#FFFFFF' : '#0A0A0A' }}>Sahil Rawat</span>
              <span className="text-[10px] text-gray-500 truncate block">sahilrawat399@gmail.com</span>
            </div>
          </div>
          <button 
            onClick={handleLogout}
            className="w-full flex items-center gap-2 px-3 py-2 border rounded-xl text-xs text-red-500 font-bold transition-colors hover:bg-red-500/10 cursor-pointer"
            style={{ borderColor: isDarkMode ? 'rgba(239,68,68,0.1)' : '#EAEAEA' }}
          >
            <LogOut className="w-4 h-4" />
            <span>Sign Out Session</span>
          </button>
        </div>
      </aside>

      {/* 2. MAIN FRAME CONTENT CONTAINER */}
      <div className="flex-1 flex flex-col min-w-0">
        
        {/* HEADER RAIL - BREADCRUMB, THEME SWITCHER */}
        <header 
          className="h-16 border-b flex items-center justify-between px-6 lg:px-8 select-none z-10 sticky top-0 bg-white/85 backdrop-blur-md"
          style={{ 
            backgroundColor: isDarkMode ? 'rgba(5,5,5,0.85)' : 'rgba(255,255,255,0.85)',
            borderColor: isDarkMode ? '#1E1E20' : '#EAEAEA'
          }}
        >
          {/* Breadcrumb path */}
          <div className="flex items-center gap-2 text-xs font-mono font-bold tracking-widest uppercase">
            <span className="text-gray-500">ADMIN</span>
            <span className="text-gold">/</span>
            <span style={{ color: isDarkMode ? '#EBEBEB' : '#0A0A0A' }}>
              {activeTab}
            </span>
          </div>

          {/* Quick Actions */}
          <div className="flex items-center gap-4">
            {/* Direct Theme Toggle button */}
            <button 
              onClick={() => setIsDarkMode(!isDarkMode)}
              className="p-2 border rounded-xl hover:bg-gold/5 transition-all text-gold cursor-pointer"
              style={{ borderColor: isDarkMode ? '#222222' : '#EAEAEA' }}
              title={isDarkMode ? 'Convert to Luxury Light Mode' : 'Convert to Obsidian Dark Mode'}
            >
              {isDarkMode ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            </button>

            {/* Profile badge */}
            <div className={`p-1 pl-1 pr-3 rounded-full border items-center gap-2 text-xs font-medium hidden sm:flex`} style={{ borderColor: isDarkMode ? '#222222' : '#EAEAEA' }}>
              <div className="w-6 h-6 rounded-full bg-gold/15 text-gold border border-gold/30 flex items-center justify-center font-bold font-serif">
                S
              </div>
              <span className="text-[11px] text-gray-500">sahilrawat399@gmail.com</span>
            </div>
          </div>
        </header>

        {/* CONTAINER CANVAS FOR PANELS */}
        <div className="flex-1 p-6 lg:p-8 overflow-y-auto max-w-7xl w-full mx-auto pb-24">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.25 }}
            >
              
              {/* RENDER ACTIVE SCREEN COMPONENT */}
              {activeTab === 'overview' && (
                <OverviewTab isDarkMode={isDarkMode} users={users} />
              )}

              {activeTab === 'live-analytics' && (
                <LiveAnalyticsTab isDarkMode={isDarkMode} />
              )}

              {activeTab === 'leads' && (
                <LeadsAndFormsTab isDarkMode={isDarkMode} />
              )}

              {activeTab === 'projects' && (
                <ClientsAndProjectsTab isDarkMode={isDarkMode} users={users} />
              )}

              {activeTab === 'tasks' && (
                <TasksAndTeamTab isDarkMode={isDarkMode} />
              )}

              {activeTab === 'marketing-finance' && (
                <MarketingAndFinanceTab isDarkMode={isDarkMode} />
              )}

              {activeTab === 'content-automation' && (
                <ContentAndAutomationTab isDarkMode={isDarkMode} />
              )}

              {activeTab === 'settings-reports' && (
                <SettingsAndReportsTab isDarkMode={isDarkMode} />
              )}

              {/* RENDER MEETINGS REQUESTS DIRECTLY INSIDE PORTAL FRAME */}
              {activeTab === 'meetings' && (
                <div className="space-y-6 text-left animate-fade-in">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div>
                      <h2 className="font-serif text-3xl font-bold tracking-tight" style={{ color: isDarkMode ? '#FFFFFF' : '#0A0A0A' }}>
                        Live Meeting Consultations
                      </h2>
                      <p className="text-sm mt-1" style={{ color: isDarkMode ? '#999999' : '#666666' }}>
                        Approved status triggers onSnapshot sync, instantly modifying the active client dashboard indicators.
                      </p>
                    </div>
                  </div>

                  {/* Realtime stats row */}
                  <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                    <div className="p-5 rounded-2xl border" style={{ backgroundColor: isDarkMode ? '#0F0F0F' : '#FFFFFF', borderColor: isDarkMode ? '#222222' : '#EAEAEA' }}>
                      <span className="text-xs text-gray-400 font-medium uppercase tracking-wider block mb-1">Total Bookings</span>
                      <span className="text-2xl font-serif font-bold text-gold">{bookings.length}</span>
                    </div>
                    <div className="p-5 rounded-2xl border" style={{ backgroundColor: isDarkMode ? '#0F0F0F' : '#FFFFFF', borderColor: isDarkMode ? '#222222' : '#EAEAEA' }}>
                      <span className="text-xs text-yellow-500 font-medium uppercase tracking-wider block mb-1">Pending</span>
                      <span className="text-2xl font-serif font-bold text-yellow-500">{bookings.filter(b => b.status === 'Pending').length}</span>
                    </div>
                    <div className="p-5 rounded-2xl border" style={{ backgroundColor: isDarkMode ? '#0F0F0F' : '#FFFFFF', borderColor: isDarkMode ? '#222222' : '#EAEAEA' }}>
                      <span className="text-xs text-green-500 font-medium uppercase tracking-wider block mb-1">Approved</span>
                      <span className="text-2xl font-serif font-bold text-green-400">{bookings.filter(b => b.status === 'Approved').length}</span>
                    </div>
                    <div className="p-5 rounded-2xl border" style={{ backgroundColor: isDarkMode ? '#0F0F0F' : '#FFFFFF', borderColor: isDarkMode ? '#222222' : '#EAEAEA' }}>
                      <span className="text-xs text-blue-500 font-medium uppercase tracking-wider block mb-1">Completed</span>
                      <span className="text-2xl font-serif font-bold text-blue-400">{bookings.filter(b => b.status === 'Completed').length}</span>
                    </div>
                  </div>

                  {/* Booking requests table */}
                  <div 
                    className="p-6 rounded-3xl border"
                    style={{ 
                      backgroundColor: isDarkMode ? '#0F0F0F' : '#FFFFFF', 
                      borderColor: isDarkMode ? '#222222' : '#EAEAEA' 
                    }}
                  >
                    {bookings.length === 0 ? (
                      <p className="text-gray-500 italic text-center py-12">No scheduled consultation bookings present in Firestore.</p>
                    ) : (
                      <div className="overflow-x-auto custom-scrollbar">
                        <table className="w-full text-left border-collapse min-w-[900px] text-xs">
                          <thead>
                            <tr className="border-b border-light-gray/10 text-gray-500 font-bold uppercase select-none">
                              <th className="py-4 font-mono">Code ID</th>
                              <th className="py-4">Affiliate Client</th>
                              <th className="py-4">Date & Hour</th>
                              <th className="py-4">Selected Service</th>
                              <th className="py-4">Status Pin</th>
                              <th className="py-4">Created</th>
                              <th className="py-4 text-right">Actions</th>
                            </tr>
                          </thead>
                          <tbody className="divide-y divide-light-gray/5">
                            {bookings.map((booking) => (
                              <tr key={booking.id} className="hover:bg-white/5 transition-all text-xs font-medium">
                                <td className="py-3">
                                  <span className="font-mono font-bold text-gold bg-gold/10 px-2 py-0.5 rounded border border-gold/10">
                                    {booking.bookingId}
                                  </span>
                                </td>
                                <td className="py-3">
                                  <span className="font-bold text-white block" style={{ color: isDarkMode ? '#FFFFFF' : '#0A0A0A' }}>{booking.userName || "VIP Prospect"}</span>
                                  <span className="text-[10px] text-gray-500">{booking.userEmail}</span>
                                </td>
                                <td className="py-3">
                                  <span className="text-white font-bold block" style={{ color: isDarkMode ? '#FFFFFF' : '#0A0A0A' }}>{booking.bookingDate}</span>
                                  <span className="text-[10px] font-mono text-gray-500">{booking.bookingTime}</span>
                                </td>
                                <td className="py-3 text-gold font-bold">{booking.serviceType}</td>
                                <td className="py-3">
                                  <span className={`text-[9px] tracking-wider uppercase font-extrabold px-2 py-0.5 rounded border ${
                                    booking.status === 'Approved' ? 'bg-green-500/10 text-green-400 border-green-500/20' :
                                    booking.status === 'Completed' ? 'bg-blue-500/10 text-blue-400 border-blue-500/20' :
                                    booking.status === 'Rejected' ? 'bg-red-500/10 text-red-500 border-red-500/20' :
                                    'bg-yellow-500/10 text-yellow-500 border-yellow-500/20'
                                  }`}>
                                    {booking.status}
                                  </span>
                                </td>
                                <td className="py-3 text-gray-500 font-mono">
                                  {booking.createdAt ? format(booking.createdAt.toDate(), 'PP p') : 'Just now'}
                                </td>
                                <td className="py-3 text-right">
                                  <div className="flex items-center justify-end gap-1.5">
                                    {booking.status !== 'Approved' && (
                                      <button
                                        onClick={() => updateBookingStatus(booking.id, 'Approved')}
                                        className="px-2 py-1 border border-green-500/30 text-green-400 hover:bg-green-500 hover:text-black rounded transition-all font-bold cursor-pointer font-sans"
                                      >
                                        Approve
                                      </button>
                                    )}
                                    {booking.status !== 'Completed' && (
                                      <button
                                        onClick={() => updateBookingStatus(booking.id, 'Completed')}
                                        className="px-2 py-1 border border-blue-500/30 text-blue-400 hover:bg-blue-500 hover:text-white rounded transition-all font-bold cursor-pointer font-sans"
                                      >
                                        Complete
                                      </button>
                                    )}
                                    {booking.status !== 'Rejected' && (
                                      <button
                                        onClick={() => updateBookingStatus(booking.id, 'Rejected')}
                                        className="px-2 py-1 border border-red-500/30 text-red-400 hover:bg-red-500 hover:text-white rounded transition-all font-bold cursor-pointer font-sans"
                                      >
                                        Reject
                                      </button>
                                    )}
                                    <button
                                      onClick={() => handleDeleteBooking(booking.id)}
                                      className="p-1 px-1.5 border border-white/10 hover:border-red-500/30 text-gray-500 hover:text-red-500 rounded transition-all cursor-pointer"
                                    >
                                      <Trash2 className="w-3.5 h-3.5" />
                                    </button>
                                  </div>
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    )}
                  </div>
                </div>
              )}

            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </main>
  );
}
export default AdminDashboard;
