import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { Search, MapPin, Calendar, Clock, Sparkles, CheckCircle2, Circle, AlertCircle, Phone, ArrowLeft, Mail, Building, Copy, Check } from 'lucide-react';
import { db } from '../lib/firebase';
import { doc, getDoc } from 'firebase/firestore';

const STATUS_STEPS = ["Pending", "In Review", "Scheduled", "Completed"];

export function BookingTrackerPage() {
  const location = useLocation();
  const navigate = useNavigate();

  // Inputs
  const [bookingId, setBookingId] = useState('');
  const [email, setEmail] = useState('');

  // States
  const [isSearching, setIsSearching] = useState(false);
  const [searched, setSearched] = useState(false);
  const [bookingData, setBookingData] = useState<any>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [idCopied, setIdCopied] = useState(false);

  // Auto-fill from routing state (e.g. from the success modal "Track Booking" redirect)
  useEffect(() => {
    if (location.state && location.state.bookingId && location.state.email) {
      setBookingId(location.state.bookingId);
      setEmail(location.state.email);
      handleSearch(location.state.bookingId, location.state.email);
    }
  }, [location.state]);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleSearch(bookingId, email);
  };

  const handleSearch = async (targetId: string, targetEmail: string) => {
    const formattedId = targetId.trim();
    const formattedEmail = targetEmail.trim().toLowerCase();

    if (!formattedId || !formattedEmail) {
      setErrorMsg("Please provide both your Booking ID and Email Address.");
      return;
    }

    setIsSearching(true);
    setErrorMsg(null);
    setSearched(false);
    setBookingData(null);

    try {
      // Fetch specifically by the ID which acts as the document path
      const docRef = doc(db, 'bookings', formattedId);
      const snapshot = await getDoc(docRef);

      if (snapshot.exists()) {
        const data = snapshot.data();
        
        // Strict Double Factor matching
        if (data.email?.toLowerCase() === formattedEmail) {
          setBookingData(data);
          setSearched(true);
        } else {
          // Found matching ID but email is wrong, treat as Not Found to prevent leaking other bookings
          setErrorMsg("No Booking Found with the provided combination.");
          setSearched(true);
        }
      } else {
        setErrorMsg("No Booking Found with the provided combination.");
        setSearched(true);
      }
    } catch (err: any) {
      console.error("Booking tracking failed", err);
      setErrorMsg("An error occurred while scanning the records. Please try again.");
    } finally {
      setIsSearching(false);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Cancelled': return 'text-red-500 bg-red-500/10 border-red-500/30';
      case 'Completed': return 'text-green-400 bg-green-500/10 border-green-500/30';
      case 'Scheduled': return 'text-blue-400 bg-blue-500/10 border-blue-500/30';
      case 'In Review': return 'text-yellow-400 bg-yellow-500/10 border-yellow-500/30';
      default: return 'text-gold bg-gold/10 border-gold/30';
    }
  };

  // Get current status index for the timeline
  const activeStepIndex = bookingData ? STATUS_STEPS.indexOf(bookingData.status) : -1;

  const handleCopyId = () => {
    if (bookingData) {
      navigator.clipboard.writeText(bookingData.bookingId);
      setIdCopied(true);
      setTimeout(() => setIdCopied(false), 2000);
    }
  };

  return (
    <div className="min-h-screen bg-rich-black relative flex flex-col justify-start items-center px-4 py-32 select-none overflow-hidden">
      {/* Immersive background decoration */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(212,175,55,0.12)_0%,transparent_60%)] pointer-events-none" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom,rgba(5,5,5,1)_0%,rgba(0,0,0,0.5)_100%)] pointer-events-none" />

      {/* Radial circles */}
      <div className="absolute top-1/3 left-10 w-96 h-96 rounded-full bg-gold/5 blur-[160px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-5 w-80 h-80 rounded-full bg-gold/5 blur-[140px] pointer-events-none" />

      <div className="w-full max-w-3xl relative z-10 space-y-12">
        
        {/* Tracking Header */}
        <div className="text-center space-y-3">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            className="inline-flex items-center gap-2 px-3 py-1 bg-gold/5 border border-gold/20 rounded-full text-[10px] uppercase font-bold tracking-[0.25em] text-gold"
          >
            <Sparkles className="w-3.5 h-3.5" /> Strategy Call Services
          </motion.div>
          
          <motion.h1
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.2 }}
            className="font-serif text-4xl md:text-5xl font-bold tracking-tight text-white uppercase"
          >
            Track Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#D4AF37] to-[#B8860B]">Booking</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.3 }}
            className="text-sm text-gray-400 max-w-md mx-auto"
          >
            Enter your secure Booking ID along with your Email Address to track the status of your strategy call in real-time.
          </motion.p>
        </div>

        {/* Tracking Input Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="p-8 md:p-10 rounded-3xl bg-gradient-to-b from-[#090909]/95 to-[#030303]/95 border border-gold/30 shadow-[0_0_50px_rgba(212,175,55,0.15)]"
        >
          <form onSubmit={handleSearchSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Booking ID Input */}
              <div className="text-left">
                <label className="block text-[10px] uppercase font-bold tracking-widest text-[#888888] mb-2">
                  Booking ID *
                </label>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-xs font-bold text-gold select-none">ID</span>
                  <input
                    type="text"
                    required
                    placeholder="LL-482931"
                    value={bookingId}
                    onChange={(e) => setBookingId(e.target.value)}
                    className="w-full bg-black border border-white/10 rounded-xl py-3.5 pl-12 pr-4 text-white uppercase placeholder-gray-600 focus:outline-none focus:border-gold transition-colors text-sm font-semibold tracking-wide"
                  />
                </div>
              </div>

              {/* Email Address Input */}
              <div className="text-left">
                <label className="block text-[10px] uppercase font-bold tracking-widest text-[#888888] mb-2">
                  Email Address *
                </label>
                <div className="relative">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gold" />
                  <input
                    type="email"
                    required
                    placeholder="client@leopardluxe.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full bg-black border border-white/10 rounded-xl py-3.5 pl-12 pr-4 text-white placeholder-gray-600 focus:outline-none focus:border-gold transition-colors text-sm"
                  />
                </div>
              </div>
            </div>

            {/* Submit Track Button */}
            <button
              type="submit"
              disabled={isSearching}
              className="w-full flex items-center justify-center gap-2 px-6 py-4 rounded-xl font-bold tracking-widest text-xs uppercase text-rich-black transition-all duration-300 hover:scale-[1.01] shadow-[0_5px_20px_rgba(212,175,55,0.3)] bg-gradient-to-r from-[#D4AF37] to-[#B8860B] select-none cursor-pointer disabled:opacity-75 disabled:hover:scale-100"
            >
              {isSearching ? (
                <div className="w-5 h-5 border-2 border-rich-black border-t-transparent rounded-full animate-spin" />
              ) : (
                <>
                  Track Booking Now <Search className="w-4 h-4" />
                </>
              )}
            </button>
          </form>
        </motion.div>

        {/* Results Sections */}
        <AnimatePresence mode="wait">
          {/* Error / Not Found Message */}
          {errorMsg && (
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              className="bg-red-500/10 border border-red-500/30 text-red-400 p-6 rounded-2xl flex items-center gap-4 text-sm max-w-xl mx-auto"
            >
              <AlertCircle className="w-6 h-6 text-red-500 flex-shrink-0" />
              <div className="text-left font-medium">
                {errorMsg}
                <span className="block text-xs text-gray-400 mt-1">Please ensure both values are perfectly accurate. The Booking ID uses format LL-XXXXXX.</span>
              </div>
            </motion.div>
          )}

          {/* Booking Status Result Render Card */}
          {searched && bookingData && (
            <motion.div
              initial={{ opacity: 0, y: 25 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -25 }}
              className="p-8 rounded-3xl bg-gradient-to-b from-[#0A0A0A] to-[#040404] border border-gold/40 text-left space-y-8"
            >
              {/* Top Details Summary */}
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-white/5">
                <div>
                  <div className="flex items-center gap-3">
                    <h2 className="font-serif text-2xl font-bold text-white uppercase tracking-tight">
                      Booking Status
                    </h2>
                    <span className={`px-3 py-1 rounded-full border text-[10px] font-bold uppercase tracking-widest leading-none ${getStatusColor(bookingData.status)}`}>
                      {bookingData.status}
                    </span>
                  </div>
                  <p className="text-xs text-gray-400 mt-1 flex items-center gap-2">
                    Booking ID: <strong className="text-gold font-mono">{bookingData.bookingId}</strong>
                    <button onClick={handleCopyId} className="text-gray-400 hover:text-white transition-colors">
                      {idCopied ? <Check className="w-3.5 h-3.5 text-green-400" /> : <Copy className="w-3.5 h-3.5" />}
                    </button>
                  </p>
                </div>

                <div className="text-right">
                  <span className="text-[10px] text-gray-500 uppercase tracking-widest font-semibold block">Registered To</span>
                  <span className="text-sm font-semibold text-white block">{bookingData.fullName}</span>
                  <span className="text-xs text-gold font-mono block">{bookingData.email}</span>
                </div>
              </div>

              {/* Progress Tracker Timeline Visual (Standard Steps or Cancelled State) */}
              {bookingData.status === 'Cancelled' ? (
                <div className="bg-red-500/5 border border-red-500/20 rounded-2xl p-6 text-center space-y-2">
                  <AlertCircle className="w-10 h-10 text-red-500 mx-auto" />
                  <h3 className="text-white font-serif font-bold text-lg">Booking Cancelled</h3>
                  <p className="text-xs text-gray-400 max-w-sm mx-auto">
                    This strategy call request has been cancelled. If this is an error or you would like to reschedule, please contact our administrator.
                  </p>
                </div>
              ) : (
                <div className="space-y-6">
                  <h3 className="block text-[10px] uppercase font-bold tracking-widest text-[#888888]">
                    Milestone Progress Tracking
                  </h3>

                  {/* Desktop / Tablet horizontal timeline */}
                  <div className="hidden sm:flex justify-between items-center relative py-4 px-2">
                    {/* Line behind steps */}
                    <div className="absolute top-1/2 left-0 right-0 h-[2px] bg-white/10 -translate-y-1/2 select-none" />
                    
                    {/* Active highlighted line */}
                    <div 
                      className="absolute top-1/2 left-0 h-[2px] bg-gradient-to-r from-gold to-[#B8860B] -translate-y-1/2 select-none transition-all duration-1000" 
                      style={{ width: `${Math.max(0, (activeStepIndex / (STATUS_STEPS.length - 1)) * 100)}%` }}
                    />

                    {STATUS_STEPS.map((step, idx) => {
                      const isCompleted = idx <= activeStepIndex;
                      const isActive = idx === activeStepIndex;
                      
                      return (
                        <div key={step} className="flex flex-col items-center relative z-10 space-y-2">
                          <div className={`w-8 h-8 rounded-full flex items-center justify-center border transition-all duration-300 ${
                            isCompleted 
                              ? 'bg-[#111] border-gold text-gold shadow-[0_0_12px_rgba(212,175,55,0.4)]' 
                              : 'bg-[#030303] border-white/20 text-gray-500'
                          }`}>
                            {isCompleted ? <CheckCircle2 className="w-5 h-5" /> : <Circle className="w-4 h-4" />}
                          </div>
                          
                          <span className={`text-[10px] font-bold uppercase tracking-widest transition-colors ${
                            isActive ? 'text-gold' : isCompleted ? 'text-white' : 'text-gray-500'
                          }`}>
                            {step}
                          </span>
                        </div>
                      );
                    })}
                  </div>

                  {/* Mobile vertical timeline */}
                  <div className="flex sm:hidden flex-col gap-5 px-3">
                    {STATUS_STEPS.map((step, idx) => {
                      const isCompleted = idx <= activeStepIndex;
                      const isActive = idx === activeStepIndex;

                      return (
                        <div key={step} className="flex items-center gap-4">
                          <div className={`w-8 h-8 rounded-full flex items-center justify-center border-2 transition-all duration-300 ${
                            isCompleted 
                              ? 'bg-black border-gold text-gold' 
                              : 'bg-black border-white/10 text-gray-600'
                          }`}>
                            {isCompleted ? <CheckCircle2 className="w-5 h-5" /> : <Circle className="w-4 h-4" />}
                          </div>

                          <div className="flex-1">
                            <span className={`text-[11px] font-bold uppercase tracking-widest ${
                              isActive ? 'text-gold' : isCompleted ? 'text-white' : 'text-gray-500'
                            }`}>
                              {step}
                            </span>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* Info grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-6 border-t border-white/5 text-xs text-gray-400">
                <div className="space-y-4">
                  <div className="space-y-1">
                    <span className="text-[10px] uppercase tracking-widest text-gray-500 font-bold block">Interested Service</span>
                    <span className="text-white font-medium text-sm block">{bookingData.serviceInterested}</span>
                  </div>

                  <div className="space-y-1">
                    <span className="text-[10px] uppercase tracking-widest text-gray-500 font-bold block">Estimated Budget Allocation</span>
                    <span className="text-white font-medium text-sm block">{bookingData.budget}</span>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="space-y-1">
                    <span className="text-[10px] uppercase tracking-widest text-gray-500 font-bold block">Company / Business entity</span>
                    <span className="text-white font-medium text-sm block">{bookingData.companyName || "N/A"}</span>
                  </div>

                  <div className="space-y-1">
                    <span className="text-[10px] uppercase tracking-widest text-gray-500 font-bold block">Assigned Advisor</span>
                    <span className="text-gold font-semibold text-sm block">{bookingData.assignedTo || "Under Review (Leopard Luxe General Desk)"}</span>
                  </div>
                </div>
              </div>

              {/* Notes block */}
              {bookingData.notes && (
                <div className="bg-white/[0.02] border border-white/5 rounded-2xl p-5 text-xs space-y-2">
                  <span className="text-[10px] uppercase tracking-widest text-[#888888] font-bold block">Customer Business Briefing Notes</span>
                  <p className="text-gray-300 leading-relaxed italic">"{bookingData.notes}"</p>
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Back navigation */}
        <div className="pt-4">
          <button
            onClick={() => navigate('/')}
            className="inline-flex items-center gap-2 text-gold/60 hover:text-white text-xs font-semibold tracking-wider transition-colors cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" /> Back to Home Page
          </button>
        </div>

      </div>
    </div>
  );
}
