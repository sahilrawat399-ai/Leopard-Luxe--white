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
  Settings, Crown, Sun, Moon, CheckCircle2, AlertOctagon, HelpCircle, Search as SearchIcon
} from 'lucide-react';
import { trackCustomEvent } from '../lib/analytics';
import { sendAutomatedEmail } from '../lib/emailService';

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

  // Search and filter states for the booking tracker
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');

  // Enforce rigid Admin email protection
  useEffect(() => {
    if (!loading) {
      const isTargetAdmin = user?.email?.toLowerCase() === 'sahilrawat399@gmail.com';
      if (!isTargetAdmin) {
        navigate('/admin-login');
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
      const bRecord = bookings.find(b => b.id === bookingId || b.bookingId === bookingId);
      if (!bRecord) {
        console.error("Booking record not found locally:", bookingId);
        return;
      }

      await updateDoc(doc(db, 'bookings', bookingId), {
        status: newStatus,
        updatedAt: new Date()
      });

      console.log("Booking saved successfully & status updated to:", newStatus);

      // Trigger automatic status update email notification (step 16)
      if (bRecord.email) {
        const emailBody = `Hello ${bRecord.fullName || 'Client'},

Your strategy call booking status (Booking ID: ${bRecord.bookingId || bookingId}) has been updated to: ${newStatus}.

Use your Booking ID and Email Address to track progress anytime on our website.

Regards,
Leopard Luxe Team`;

        await sendAutomatedEmail(
          bRecord.email.trim().toLowerCase(),
          `Leopard Luxe Strategy Call Status Update`,
          emailBody
        );
      }
    } catch(err) {
      handleFirestoreError(err, OperationType.UPDATE, `bookings/${bookingId}`);
    }
  };

  const updateBookingAdvisor = async (bookingId: string, advisorName: string) => {
    try {
      await updateDoc(doc(db, 'bookings', bookingId), {
        assignedTo: advisorName,
        updatedAt: new Date()
      });
      console.log(`Advisor assigned successfully: ${advisorName}`);
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
    localStorage.removeItem('luxe_auth_bypass');
    localStorage.removeItem('luxe_cached_user');
    localStorage.removeItem('luxe_cached_db_user');
    
    // Reset Zustand auth state natively for instant navigation reaction
    const { setUser, setDbUser, setLoading } = useAuthStore.getState();
    setUser(null);
    setDbUser(null);
    setLoading(false);

    try {
      await auth.signOut();
    } catch (err) {
      console.warn("Sign out err:", err);
    }
    navigate('/admin-login');
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
              <span className="text-[10px] text-gold font-bold uppercase tracking-wider truncate block">Super Admin</span>
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

            {/* Logout Button (Top Right of Admin Dashboard) */}
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 px-3 py-2 border rounded-xl text-xs text-red-500 font-bold hover:bg-red-500/10 transition-colors cursor-pointer animate-pulse"
              style={{ borderColor: isDarkMode ? 'rgba(239, 68, 68, 0.3)' : '#EAEAEA' }}
              title="Sign Out Session"
            >
              <LogOut className="w-4 h-4" />
              <span className="hidden md:inline">Logout</span>
            </button>

            {/* Profile badge */}
            <div className={`p-1 pl-1 pr-3 rounded-full border items-center gap-2 text-xs font-medium hidden sm:flex`} style={{ borderColor: isDarkMode ? '#222222' : '#EAEAEA' }}>
              <div className="w-6 h-6 rounded-full bg-gold/15 text-gold border border-gold/30 flex items-center justify-center font-bold font-serif">
                S
              </div>
              <span className="text-[11px] font-bold text-gold uppercase tracking-wider">Super Admin</span>
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
                        Leopard Luxe Advanced Lead Management
                      </h2>
                      <p className="text-sm mt-1" style={{ color: isDarkMode ? '#999999' : '#666666' }}>
                        Configure client strategy parameters, update milestones in real-time, and auto-dispatch status notifications.
                      </p>
                    </div>
                  </div>

                  {/* Realtime stats row */}
                  <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                    <div className="p-5 rounded-2xl border transition-all hover:shadow-[0_4px_15px_rgba(212,175,55,0.05)]" style={{ backgroundColor: isDarkMode ? '#0F0F0F' : '#FFFFFF', borderColor: isDarkMode ? '#222222' : '#EAEAEA' }}>
                      <span className="text-xs text-gray-400 font-medium uppercase tracking-wider block mb-1">Total Bookings</span>
                      <span className="text-2xl font-serif font-bold text-gold">{bookings.length}</span>
                    </div>
                    
                    <div className="p-5 rounded-2xl border transition-all hover:shadow-[0_4px_15px_rgba(212,175,55,0.05)]" style={{ backgroundColor: isDarkMode ? '#0F0F0F' : '#FFFFFF', borderColor: isDarkMode ? '#222222' : '#EAEAEA' }}>
                      <span className="text-xs text-yellow-500 font-medium uppercase tracking-wider block mb-1">Pending Requests</span>
                      <span className="text-2xl font-serif font-bold text-yellow-500">{bookings.filter(b => b.status === 'Pending').length}</span>
                    </div>
                    
                    <div className="p-5 rounded-2xl border transition-all hover:shadow-[0_4px_15px_rgba(212,175,55,0.05)]" style={{ backgroundColor: isDarkMode ? '#0F0F0F' : '#FFFFFF', borderColor: isDarkMode ? '#222222' : '#EAEAEA' }}>
                      <span className="text-xs text-green-500 font-medium uppercase tracking-wider block mb-1">Completed Calls</span>
                      <span className="text-2xl font-serif font-bold text-green-400">{bookings.filter(b => b.status === 'Completed').length}</span>
                    </div>
                    
                    <div className="p-5 rounded-2xl border transition-all hover:shadow-[0_4px_15px_rgba(212,175,55,0.05)]" style={{ backgroundColor: isDarkMode ? '#0F0F0F' : '#FFFFFF', borderColor: isDarkMode ? '#222222' : '#EAEAEA' }}>
                      <span className="text-xs text-blue-500 font-medium uppercase tracking-wider block mb-1">Today's Bookings</span>
                      <span className="text-2xl font-serif font-bold text-blue-400">
                        {(() => {
                          const today = new Date();
                          return bookings.filter(b => {
                            if (!b.createdAt) return false;
                            const bDate = b.createdAt.toDate ? b.createdAt.toDate() : new Date(b.createdAt);
                            return bDate.getDate() === today.getDate() &&
                                   bDate.getMonth() === today.getMonth() &&
                                   bDate.getFullYear() === today.getFullYear();
                          }).length;
                        })()}
                      </span>
                    </div>
                  </div>

                  {/* Search and Filter System panel */}
                  <div 
                    className="p-5 rounded-2xl border flex flex-col md:flex-row items-center gap-4"
                    style={{ 
                      backgroundColor: isDarkMode ? '#0F0F0F' : '#FFFFFF', 
                      borderColor: isDarkMode ? '#222222' : '#EAEAEA' 
                    }}
                  >
                    <div className="relative flex-1 w-full">
                      <SearchIcon className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                      <input
                        type="text"
                        placeholder="Search by code, customer name, email address, or company entity..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full bg-black/20 border border-white/5 rounded-xl py-2.5 pl-12 pr-4 text-xs focus:outline-none focus:border-gold transition-colors text-white"
                      />
                    </div>

                    <div className="flex items-center gap-2 w-full md:w-auto">
                      <span className="text-xs text-gray-400 font-semibold uppercase tracking-wider whitespace-nowrap">Filter Status:</span>
                      <select
                        value={statusFilter}
                        onChange={(e) => setStatusFilter(e.target.value)}
                        className="bg-[#111] text-xs text-white border border-white/10 rounded-xl px-3 py-2 focus:outline-none focus:border-gold"
                      >
                        <option value="All">All Milestones</option>
                        <option value="Pending">Pending</option>
                        <option value="In Review">In Review</option>
                        <option value="Scheduled">Scheduled</option>
                        <option value="Completed">Completed</option>
                        <option value="Cancelled">Cancelled</option>
                      </select>
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
                    {(() => {
                      const filteredBookings = bookings.filter(b => {
                        const matchesSearch = 
                          (b.fullName || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
                          (b.email || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
                          (b.bookingId || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
                          (b.companyName || '').toLowerCase().includes(searchTerm.toLowerCase());
                        
                        const matchesStatus = statusFilter === 'All' || [b.status, b.statusPin].includes(statusFilter);
                        return matchesSearch && matchesStatus;
                      });

                      if (filteredBookings.length === 0) {
                        return <p className="text-gray-500 italic text-center py-12 text-xs">No matching scheduled consultation bookings found in Firestore.</p>;
                      }

                      return (
                        <div className="overflow-x-auto custom-scrollbar">
                          <table className="w-full text-left border-collapse min-w-[1100px] text-xs">
                            <thead>
                              <tr className="border-b border-light-gray/10 text-gray-500 font-bold uppercase select-none">
                                <th className="py-4 font-mono">Booking ID</th>
                                <th className="py-4">Name & Email</th>
                                <th className="py-4">Phone Number</th>
                                <th className="py-4 text-gold font-semibold">Meeting Date</th>
                                <th className="py-4 text-gold font-semibold">Meeting Time</th>
                                <th className="py-4">Company Name</th>
                                <th className="py-4">Service Interested In</th>
                                <th className="py-4">Monthly Budget</th>
                                <th className="py-4">Date Submitted</th>
                                <th className="py-4">Assigned Advisor</th>
                                <th className="py-4">Status</th>
                                <th className="py-4 text-right">Actions</th>
                              </tr>
                            </thead>
                            <tbody className="divide-y divide-light-gray/5">
                              {filteredBookings.map((booking) => (
                                <tr key={booking.id} className="hover:bg-white/5 transition-all text-xs font-medium">
                                  {/* ID */}
                                  <td className="py-4">
                                    <span className="font-mono font-bold text-gold bg-gold/10 px-2 py-0.5 rounded border border-gold/10">
                                      {booking.bookingId || "LL-UNKNOWN"}
                                    </span>
                                  </td>
                                  
                                  {/* Name / Email */}
                                  <td className="py-4">
                                    <span className="font-bold block" style={{ color: isDarkMode ? '#FFFFFF' : '#0A0A0A' }}>
                                      {booking.fullName || "VIP Customer"}
                                    </span>
                                    <span className="text-[10px] text-gray-500">{booking.email}</span>
                                  </td>

                                  {/* Phone */}
                                  <td className="py-4 text-gray-300 font-mono">
                                    {booking.phone || "No Phone"}
                                  </td>

                                  {/* Meeting Date */}
                                  <td className="py-4 text-white font-sans font-semibold">
                                    {booking.selectedDate || "N/A"}
                                  </td>

                                  {/* Meeting Time */}
                                  <td className="py-4 text-white font-mono font-semibold">
                                    {booking.selectedTime || "N/A"}
                                  </td>

                                  {/* Company */}
                                  <td className="py-4 text-gray-300">
                                    {booking.companyName || "N/A"}
                                  </td>

                                  {/* Service */}
                                  <td className="py-4 text-gold font-semibold max-w-[200px] truncate" title={booking.serviceInterested}>
                                    {booking.serviceInterested || "Premium Consult"}
                                  </td>

                                  {/* Budget */}
                                  <td className="py-4 text-gray-300 font-semibold">
                                    {booking.budget || "N/A"}
                                  </td>

                                  {/* Date Created */}
                                  <td className="py-4 text-gray-500 font-mono">
                                    {booking.createdAt ? format(booking.createdAt.toDate ? booking.createdAt.toDate() : new Date(booking.createdAt), 'PP p') : 'Just now'}
                                  </td>

                                  {/* Assigned TO */}
                                  <td className="py-4">
                                    <input
                                      type="text"
                                      placeholder="Unassigned"
                                      defaultValue={booking.assignedTo || ""}
                                      onBlur={(e) => updateBookingAdvisor(booking.id, e.target.value)}
                                      onKeyDown={(e) => {
                                        if (e.key === 'Enter') {
                                          updateBookingAdvisor(booking.id, (e.target as HTMLInputElement).value);
                                          (e.target as HTMLInputElement).blur();
                                        }
                                      }}
                                      className="bg-black/40 border border-white/5 text-xs text-white rounded px-2 py-1 focus:outline-none focus:border-gold w-28 placeholder-gray-700"
                                    />
                                  </td>

                                  {/* Status display badge */}
                                  <td className="py-4">
                                    <span className={`text-[9px] tracking-wider uppercase font-extrabold px-2 py-0.5 rounded border ${
                                      booking.status === 'Completed' ? 'bg-green-500/10 text-green-400 border-green-500/20' :
                                      booking.status === 'Scheduled' ? 'bg-blue-500/10 text-blue-400 border-blue-500/20' :
                                      booking.status === 'In Review' ? 'bg-yellow-500/10 text-yellow-400 border-yellow-500/20' :
                                      booking.status === 'Cancelled' ? 'bg-red-500/10 text-red-500 border-red-500/20' :
                                      'bg-gold/10 text-gold border-gold/20'
                                    }`}>
                                      {booking.status}
                                    </span>
                                  </td>

                                  {/* Dropdown status update Actions */}
                                  <td className="py-4 text-right">
                                    <div className="flex items-center justify-end gap-2">
                                      <select
                                        value={booking.status}
                                        onChange={(e) => updateBookingStatus(booking.id, e.target.value)}
                                        className="bg-[#151515] text-[10px] text-gray-300 border border-white/10 rounded px-1.5 py-1 focus:outline-none focus:border-gold font-sans font-bold"
                                      >
                                        <option value="Pending">Pending</option>
                                        <option value="In Review">In Review</option>
                                        <option value="Scheduled">Scheduled</option>
                                        <option value="Completed">Completed</option>
                                        <option value="Cancelled">Cancelled</option>
                                      </select>

                                      <button
                                        onClick={() => handleDeleteBooking(booking.id)}
                                        className="p-1 px-1.5 border border-white/10 hover:border-red-500/30 text-gray-500 hover:text-red-500 rounded transition-all cursor-pointer"
                                        title="Delete Log"
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
                      );
                    })()}
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
