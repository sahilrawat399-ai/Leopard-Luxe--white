import React, { useState } from 'react';
import { db } from '../lib/firebase';
import { collection, doc, getDoc, setDoc, addDoc, serverTimestamp } from 'firebase/firestore';
import { motion } from 'motion/react';
import { ArrowRight, Building, Mail, Phone, User, MapPin, Calendar, Clock, Copy, Check } from 'lucide-react';
import { handleFirestoreError, OperationType } from '../lib/firestore-errors';
import { trackCustomEvent } from '../lib/analytics';
import { useNavigate } from 'react-router-dom';
import { sendAutomatedEmail } from '../lib/emailService';

const INDUSTRIES = [
  "E-commerce", "Real Estate", "Interior Design", "Dental Clinic", 
  "Home Services", "Fitness & Wellness", "Education", "Consulting", 
  "Restaurant", "Beauty & Salon", "Technology", "Healthcare", "Other"
];

const STAGES = [
  "Just Starting", "Less than 1 Year", "1–3 Years", "3–5 Years", "5+ Years"
];

const REVENUES = [
  "Not Generating Revenue Yet", "Under $1,000", "$1,000 – $5,000", 
  "$5,000 – $20,000", "$20,000 – $50,000", "$50,000+"
];

const BUDGETS = [
  "Under $500", "$500 – $1,000", "$1,000 – $3,000", "$3,000 – $5,000", "$5,000+"
];

const GOALS = [
  "Generate More Leads", "Increase Sales", "Build Brand Awareness", 
  "Improve Website", "Improve SEO", "Run Ads", "Social Media Growth", "Launch New Business"
];

const TIME_SLOTS = [
  "09:00 AM", "09:30 AM", "10:00 AM", "10:30 AM",
  "11:00 AM", "11:30 AM", "12:00 PM", "12:30 PM",
  "01:00 PM", "01:30 PM", "02:00 PM", "02:30 PM",
  "03:00 PM", "03:30 PM", "04:00 PM", "04:30 PM",
  "05:00 PM"
];

export function DiscoveryPage() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    fullName: '',
    businessName: '',
    email: '',
    phoneNumber: '',
    country: '',
    city: '',
    industry: '',
    businessStage: '',
    monthlyRevenue: '',
    marketingBudget: '',
    projectDescription: ''
  });
  
  const [selectedGoals, setSelectedGoals] = useState<string[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [bookingId, setBookingId] = useState('');
  const [copied, setCopied] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Schedulers
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('');
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);
  const [isTimeOpen, setIsTimeOpen] = useState(false);

  // Month & year tracking for calendar picker
  const [calMonth, setCalMonth] = useState(new Date().getMonth());
  const [calYear, setCalYear] = useState(new Date().getFullYear());

  // Successful submission capture states
  const [successDate, setSuccessDate] = useState('');
  const [successTime, setSuccessTime] = useState('');
  const [successEmail, setSuccessEmail] = useState('');

  const todayDate = new Date();
  todayDate.setHours(0, 0, 0, 0);

  const months = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];
  
  const weekdays = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];

  const getDaysInMonth = (year: number, month: number) => {
    return new Date(year, month + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (year: number, month: number) => {
    return new Date(year, month, 1).getDay();
  };

  const formatDateHuman = (d: Date): string => {
    return `${d.getDate()} ${months[d.getMonth()]} ${d.getFullYear()}`;
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(bookingId);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleGoalToggle = (goal: string) => {
    setSelectedGoals(prev => 
      prev.includes(goal) ? prev.filter(g => g !== goal) : [...prev, goal]
    );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedDate || !selectedTime) {
      setError("Please select both your Preferred Meeting Date and Preferred Meeting Time.");
      return;
    }

    setIsSubmitting(true);
    setError(null);
    
    try {
      // 1. Generate unique booking ID (e.g. LL-482931) and ensure it's unique in Firestore
      let uniqueId = '';
      let attempts = 0;
      while (attempts < 10) {
        const code = Math.floor(100000 + Math.random() * 900000).toString();
        const possibleId = `LL-${code}`;
        const docRef = doc(db, 'bookings', possibleId);
        let snapshot;
        try {
          snapshot = await getDoc(docRef);
        } catch (getErr) {
          handleFirestoreError(getErr, OperationType.GET, `bookings/${possibleId}`);
        }
        if (!snapshot.exists()) {
          uniqueId = possibleId;
          break;
        }
        attempts++;
      }

      if (!uniqueId) {
        throw new Error("Unable to create booking ID. Please try again.");
      }

      setBookingId(uniqueId);
      setSuccessDate(selectedDate);
      setSuccessTime(selectedTime);
      setSuccessEmail(formData.email.trim().toLowerCase());

      // Create document payload matching database requirements
      const bookingPayload = {
        bookingId: uniqueId,
        fullName: formData.fullName,
        email: formData.email.trim().toLowerCase(),
        phone: formData.phoneNumber.trim(),
        companyName: formData.businessName.trim() || "N/A",
        serviceInterested: formData.industry || "Business Growth Discovery",
        budget: formData.marketingBudget || "N/A",
        notes: formData.projectDescription.trim() || "N/A",
        selectedDate,
        selectedTime,
        status: "Pending",
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp()
      };

      // Write direct to 'bookings' collection
      try {
        await setDoc(doc(db, 'bookings', uniqueId), bookingPayload);
      } catch (writeErr) {
        handleFirestoreError(writeErr, OperationType.WRITE, `bookings/${uniqueId}`);
      }

      // Write legacy lead record as well
      try {
        await addDoc(collection(db, 'leads'), {
          ...formData,
          bookingId: uniqueId,
          primaryGoals: selectedGoals,
          status: 'New Lead',
          preferredDate: selectedDate,
          preferredTime: selectedTime,
          createdAt: serverTimestamp(),
          updatedAt: serverTimestamp()
        });
      } catch (leadErr) {
        handleFirestoreError(leadErr, OperationType.WRITE, 'leads');
      }
      
      // Track custom events requested
      trackCustomEvent('Meeting Request submissions', {
        industry: formData.industry,
        budget: formData.marketingBudget,
        preferredDate: selectedDate
      });
      trackCustomEvent('Contact Form submissions', {
        businessName: formData.businessName
      });

      // Email Confirmation body (Custom layout matching prompt)
      const emailBody = `Hello ${formData.fullName},

Thank you for booking a strategy call with Leopard Luxe.

Booking ID:
${uniqueId}

Meeting Date:
${selectedDate}

Meeting Time:
${selectedTime}

Status:
Pending

Use this Booking ID together with your Email Address to track your booking anytime.

Regards,
Leopard Luxe Team`;

      try {
        await sendAutomatedEmail(
          formData.email.trim().toLowerCase(),
          "Leopard Luxe Strategy Call Confirmation",
          emailBody
        );
      } catch (emailErr) {
        console.error("Failed to send booking email log:", emailErr);
      }

      setSubmitted(true);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } catch (err: any) {
      console.error("Discovery schedule error:", err);
      const errorMessage = err?.message || String(err);
      setError(`Unable to create booking: ${errorMessage}`);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (submitted) {
    return (
      <main className="bg-rich-black min-h-screen pt-32 pb-20 flex items-center justify-center px-6">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full max-w-2xl bg-[#0A0A0A] border border-gold/30 p-8 md:p-12 rounded-3xl text-center shadow-[0_0_60px_rgba(212,175,55,0.15)]"
        >
          <div className="w-20 h-20 bg-gold/10 rounded-full flex items-center justify-center mx-auto mb-6">
             <div className="w-10 h-10 border-2 border-gold rounded-full flex items-center justify-center">
                 <div className="w-6 h-6 border-2 border-gold rounded-full flex items-center justify-center animate-pulse">
                    <div className="w-2 h-2 bg-gold rounded-full"></div>
                 </div>
             </div>
          </div>
          <h1 className="font-serif text-3xl md:text-4xl font-bold text-white mb-2">Booking Submitted Successfully</h1>
          <p className="text-gray-400 mb-8 max-w-lg mx-auto text-sm leading-relaxed">
            Thank you for choosing Leopard Luxe. Your strategy call request has been locked into our professional scheduling desk. Our team will review your details shortly.
          </p>

          <div className="bg-white/5 border border-white/10 p-6 rounded-2xl max-w-md mx-auto mb-8 space-y-4 text-left">
            <div className="text-center pb-3 border-b border-white/5">
              <span className="text-[10px] text-gray-500 uppercase font-mono font-bold tracking-widest block mb-1">
                Your Booking ID
              </span>
              <span className="font-mono text-2xl font-extrabold text-gold tracking-wide block">
                {bookingId}
              </span>
            </div>

            <div className="space-y-2 text-xs text-gray-300 pt-1 font-sans">
              <div className="flex justify-between items-center">
                <span className="text-gray-500 uppercase text-[9px] tracking-wider font-bold">Meeting Date:</span>
                <span className="font-semibold text-white bg-white/5 px-2.5 py-1 rounded-lg border border-white/5">{successDate}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-500 uppercase text-[9px] tracking-wider font-bold">Meeting Time:</span>
                <span className="font-semibold text-white bg-white/5 px-2.5 py-1 rounded-lg border border-white/5">{successTime}</span>
              </div>
            </div>

            <span className="text-[10.5px] text-gray-400 block pt-1.5 text-center leading-relaxed font-sans">
              We have dispatched a receipt details log to your email: <strong className="text-gold font-mono">{successEmail}</strong>.
            </span>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 justify-center items-center max-w-md mx-auto">
            {/* Copy Button */}
            <button 
              onClick={handleCopy}
              className="w-full sm:w-auto flex items-center justify-center gap-2 px-5 py-3 rounded-xl border border-gold/30 hover:border-gold/60 text-gold text-xs font-bold uppercase transition-colors cursor-pointer bg-gold/5"
            >
              {copied ? (
                <>
                  <Check className="w-4 h-4 text-green-500 animate-bounce" /> Copied ID!
                </>
              ) : (
                <>
                  <Copy className="w-4 h-4" /> Copy Booking ID
                </>
              )}
            </button>

            {/* Track Button */}
            <button 
              onClick={() => navigate('/bookings', { state: { bookingId, email: successEmail } })}
              className="w-full sm:w-auto flex items-center justify-center gap-2 px-5 py-3 rounded-xl border border-white/10 hover:border-white/20 text-white text-xs font-bold uppercase transition-colors cursor-pointer bg-white/[0.02]"
            >
              Track Booking
            </button>

            {/* Close / Return button */}
            <a 
              href="/" 
              className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-3 rounded-xl text-rich-black text-xs font-bold uppercase shadow-[0_5px_15px_rgba(212,175,55,0.2)] bg-gradient-to-r from-[#D4AF37] to-[#B8860B] transition-all hover:scale-105"
            >
              Close
            </a>
          </div>
        </motion.div>
      </main>
    );
  }

  return (
    <main className="bg-rich-black min-h-screen pt-32 pb-20 px-6 font-sans">
      <div className="max-w-4xl mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="font-serif text-4xl md:text-5xl font-bold text-white mb-4">Business Growth Discovery</h1>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">Fill out the form below to help us understand your business and goals before our strategy call.</p>
        </motion.div>

        <form onSubmit={handleSubmit} className="bg-[#0A0A0A] border border-white/10 rounded-3xl p-8 lg:p-12 space-y-12">
          
          {error && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-red-500/10 border border-red-500/30 text-red-400 p-4 rounded-xl text-xs flex gap-3 items-start"
            >
              <div className="w-1.5 h-1.5 rounded-full bg-red-400 mt-1.5 flex-shrink-0" />
              <p className="font-medium leading-relaxed">{error}</p>
            </motion.div>
          )}

          {/* PERSONAL INFORMATION */}
          <div>
            <h2 className="text-xl font-serif text-gold font-bold mb-6 border-b border-white/10 pb-2">Personal Information</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-xs font-bold tracking-wider text-gray-400 uppercase mb-2">Full Name *</label>
                <div className="relative">
                  <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
                  <input type="text" name="fullName" required value={formData.fullName} onChange={handleChange} className="w-full bg-rich-black border border-white/10 rounded-xl py-3 pl-12 pr-4 text-white focus:outline-none focus:border-gold transition-colors" />
                </div>
              </div>
              <div>
                <label className="block text-xs font-bold tracking-wider text-gray-400 uppercase mb-2">Business Name *</label>
                <div className="relative">
                  <Building className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
                  <input type="text" name="businessName" required value={formData.businessName} onChange={handleChange} className="w-full bg-rich-black border border-white/10 rounded-xl py-3 pl-12 pr-4 text-white focus:outline-none focus:border-gold transition-colors" />
                </div>
              </div>
              <div>
                <label className="block text-xs font-bold tracking-wider text-gray-400 uppercase mb-2">Email Address *</label>
                <div className="relative">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
                  <input type="email" name="email" required value={formData.email} onChange={handleChange} className="w-full bg-rich-black border border-white/10 rounded-xl py-3 pl-12 pr-4 text-white focus:outline-none focus:border-gold transition-colors" />
                </div>
              </div>
              <div>
                <label className="block text-xs font-bold tracking-wider text-gray-400 uppercase mb-2">Phone Number *</label>
                <div className="relative">
                  <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
                  <input type="tel" name="phoneNumber" required value={formData.phoneNumber} onChange={handleChange} className="w-full bg-rich-black border border-white/10 rounded-xl py-3 pl-12 pr-4 text-white focus:outline-none focus:border-gold transition-colors" />
                </div>
              </div>
              <div>
                <label className="block text-xs font-bold tracking-wider text-gray-400 uppercase mb-2">Country</label>
                <div className="relative">
                   <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
                   <input type="text" name="country" value={formData.country} onChange={handleChange} className="w-full bg-rich-black border border-white/10 rounded-xl py-3 pl-12 pr-4 text-white focus:outline-none focus:border-gold transition-colors" />
                </div>
              </div>
              <div>
                <label className="block text-xs font-bold tracking-wider text-gray-400 uppercase mb-2">City</label>
                <div className="relative">
                   <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
                   <input type="text" name="city" value={formData.city} onChange={handleChange} className="w-full bg-rich-black border border-white/10 rounded-xl py-3 pl-12 pr-4 text-white focus:outline-none focus:border-gold transition-colors" />
                </div>
              </div>
            </div>
          </div>

          {/* BUSINESS INFORMATION */}
          <div>
            <h2 className="text-xl font-serif text-gold font-bold mb-6 border-b border-white/10 pb-2">Business Information</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
               <div>
                  <label className="block text-xs font-bold tracking-wider text-gray-400 uppercase mb-2">Industry</label>
                  <select name="industry" value={formData.industry} onChange={handleChange} className="w-full bg-rich-black border border-white/10 rounded-xl py-3 px-4 text-white focus:outline-none focus:border-gold transition-colors">
                     <option value="">Select an option</option>
                     {INDUSTRIES.map(i => <option key={i} value={i}>{i}</option>)}
                  </select>
               </div>
               <div>
                  <label className="block text-xs font-bold tracking-wider text-gray-400 uppercase mb-2">Business Stage</label>
                  <select name="businessStage" value={formData.businessStage} onChange={handleChange} className="w-full bg-rich-black border border-white/10 rounded-xl py-3 px-4 text-white focus:outline-none focus:border-gold transition-colors">
                     <option value="">Select an option</option>
                     {STAGES.map(s => <option key={s} value={s}>{s}</option>)}
                  </select>
               </div>
               <div>
                  <label className="block text-xs font-bold tracking-wider text-gray-400 uppercase mb-2">Monthly Revenue</label>
                  <select name="monthlyRevenue" value={formData.monthlyRevenue} onChange={handleChange} className="w-full bg-rich-black border border-white/10 rounded-xl py-3 px-4 text-white focus:outline-none focus:border-gold transition-colors">
                     <option value="">Select an option</option>
                     {REVENUES.map(r => <option key={r} value={r}>{r}</option>)}
                  </select>
               </div>
               <div>
                  <label className="block text-xs font-bold tracking-wider text-gray-400 uppercase mb-2">Marketing Budget</label>
                  <select name="marketingBudget" value={formData.marketingBudget} onChange={handleChange} className="w-full bg-rich-black border border-white/10 rounded-xl py-3 px-4 text-white focus:outline-none focus:border-gold transition-colors">
                     <option value="">Select an option</option>
                     {BUDGETS.map(b => <option key={b} value={b}>{b}</option>)}
                  </select>
               </div>
            </div>
            
            <div className="mt-8">
               <label className="block text-xs font-bold tracking-wider text-gray-400 uppercase mb-4">Primary Goals</label>
               <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
                  {GOALS.map(goal => (
                     <button type="button" key={goal} onClick={() => handleGoalToggle(goal)} className={`text-left flex items-center gap-3 p-4 rounded-xl border cursor-pointer transition-all ${selectedGoals.includes(goal) ? 'bg-gold/10 border-gold shadow-[0_0_10px_rgba(212,175,55,0.2)]' : 'border-white/10 bg-rich-black hover:border-white/30'}`}>
                        <div className={`w-5 h-5 rounded flex items-center justify-center border transition-colors ${selectedGoals.includes(goal) ? 'bg-gold border-gold' : 'border-gray-500'}`}>
                           {selectedGoals.includes(goal) && <svg className="w-3 h-3 text-rich-black" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" /></svg>}
                        </div>
                        <span className="text-sm font-medium text-white">{goal}</span>
                     </button>
                  ))}
               </div>
            </div>

            <div className="mt-8">
               <label className="block text-xs font-bold tracking-wider text-gray-400 uppercase mb-2">Project Description</label>
               <textarea name="projectDescription" rows={5} value={formData.projectDescription} onChange={handleChange} className="w-full bg-rich-black border border-white/10 rounded-xl py-3 px-4 text-white focus:outline-none focus:border-gold transition-colors resize-none" placeholder="Tell us about your business and what you want to achieve..."></textarea>
            </div>
          </div>

          {/* SCHEDULING (PREMIUM DATE & TIME SLOTS SELECTION) */}
          <div className="space-y-6">
            <h2 className="text-xl font-serif text-gold font-bold mb-6 border-b border-white/10 pb-2">Schedule Consultation</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
               
               {/* Preferred Meeting Date (Calendar Picker) */}
               <div className="relative">
                 <label className="block text-xs font-bold tracking-wider text-gray-400 uppercase mb-2">Preferred Meeting Date *</label>
                 <button
                   type="button"
                   onClick={() => {
                     setIsCalendarOpen(!isCalendarOpen);
                     setIsTimeOpen(false);
                   }}
                   className="w-full bg-rich-black border border-white/10 rounded-xl py-3 pl-12 pr-4 text-white text-left focus:outline-none focus:border-gold transition-colors text-sm flex items-center justify-between cursor-pointer h-12"
                 >
                   <div className="flex items-center gap-3">
                     <Calendar className="w-5 h-5 text-gold flex-shrink-0" />
                     <span className={selectedDate ? "text-white font-medium" : "text-gray-400"}>
                       {selectedDate || "Select Preferred Date"}
                     </span>
                   </div>
                 </button>

                 {isCalendarOpen && (
                   <>
                     <div className="fixed inset-0 z-40" onClick={() => setIsCalendarOpen(false)} />
                     <div className="absolute top-[102%] left-0 w-full bg-[#111] border border-gold/40 rounded-2xl p-4 shadow-[0_10px_30px_rgba(0,0,0,0.85)] z-50 text-xs text-white">
                       <div className="flex items-center justify-between mb-3 pb-2 border-b border-white/5">
                         <button
                           type="button"
                           onClick={() => {
                             const currentYear = new Date().getFullYear();
                             const currentM = new Date().getMonth();
                             if (calYear > currentYear || calMonth > currentM) {
                               if (calMonth === 0) {
                                 setCalMonth(11);
                                 setCalYear(calYear - 1);
                               } else {
                                 setCalMonth(calMonth - 1);
                               }
                             }
                           }}
                           className="text-gold font-bold hover:text-white px-2 py-1 bg-white/5 rounded cursor-pointer select-none"
                         >
                           &larr;
                         </button>
                         <span className="font-serif font-bold text-sm text-gold">
                           {months[calMonth]} {calYear}
                         </span>
                         <button
                           type="button"
                           onClick={() => {
                             if (calMonth === 11) {
                               setCalMonth(0);
                               setCalYear(calYear + 1);
                             } else {
                               setCalMonth(calMonth + 1);
                             }
                           }}
                           className="text-gold font-bold hover:text-white px-2 py-1 bg-white/5 rounded cursor-pointer select-none"
                         >
                           &rarr;
                         </button>
                       </div>

                       <div className="grid grid-cols-7 gap-1 text-center font-bold text-gray-500 mb-1 select-none">
                         {weekdays.map(day => <span key={day}>{day}</span>)}
                       </div>

                       <div className="grid grid-cols-7 gap-1">
                         {(() => {
                           const startIdx = getFirstDayOfMonth(calYear, calMonth);
                           const totalDays = getDaysInMonth(calYear, calMonth);
                           const cells = [];

                           for (let i = 0; i < startIdx; i++) {
                             cells.push(<div key={`empty-${i}`} className="p-2" />);
                           }

                           for (let day = 1; day <= totalDays; day++) {
                             const memoDate = new Date(calYear, calMonth, day);
                             const isPast = memoDate < todayDate;
                             const isSelected = selectedDate === formatDateHuman(memoDate);

                             cells.push(
                               <button
                                 key={`day-${day}`}
                                 type="button"
                                 disabled={isPast}
                                 onClick={() => {
                                   setSelectedDate(formatDateHuman(memoDate));
                                   setIsCalendarOpen(false);
                                 }}
                                 className={`p-2 rounded-lg text-center font-semibold transition-all ${
                                   isPast 
                                     ? 'text-gray-700 cursor-not-allowed' 
                                     : isSelected
                                       ? 'bg-gold text-rich-black shadow-[0_0_10px_rgba(212,175,55,0.4)]'
                                       : 'hover:bg-gold/10 hover:text-gold text-gray-200 cursor-pointer'
                                 }`}
                               >
                                 {day}
                               </button>
                             );
                           }
                           return cells;
                         })()}
                       </div>
                     </div>
                   </>
                 )}
               </div>

               {/* Preferred Meeting Time (Custom professional slot list) */}
               <div className="relative">
                 <label className="block text-xs font-bold tracking-wider text-gray-400 uppercase mb-2">Preferred Meeting Time *</label>
                 <button
                   type="button"
                   onClick={() => {
                     setIsTimeOpen(!isTimeOpen);
                     setIsCalendarOpen(false);
                   }}
                   className="w-full bg-rich-black border border-white/10 rounded-xl py-3 pl-12 pr-4 text-white text-left focus:outline-none focus:border-gold transition-colors text-sm flex items-center justify-between cursor-pointer h-12"
                 >
                   <div className="flex items-center gap-3">
                     <Clock className="w-5 h-5 text-gold flex-shrink-0" />
                     <span className={selectedTime ? "text-white font-medium" : "text-gray-400"}>
                       {selectedTime || "Select Preferred Time"}
                     </span>
                   </div>
                 </button>

                 {isTimeOpen && (
                   <>
                     <div className="fixed inset-0 z-40" onClick={() => setIsTimeOpen(false)} />
                     <div className="absolute top-[102%] left-0 w-full bg-[#111] border border-gold/40 rounded-2xl p-2 shadow-[0_10px_30px_rgba(0,0,0,0.85)] z-50 max-h-[220px] overflow-y-auto custom-scrollbar text-xs text-white">
                       <div className="grid grid-cols-2 gap-1.5 p-1">
                         {TIME_SLOTS.map((slot) => {
                           const isSelected = selectedTime === slot;
                           return (
                             <button
                               type="button"
                               key={slot}
                               onClick={() => {
                                 setSelectedTime(slot);
                                 setIsTimeOpen(false);
                               }}
                               className={`py-2 px-3 rounded-lg text-center font-medium transition-colors cursor-pointer ${
                                 isSelected
                                   ? 'bg-gold text-rich-black font-bold shadow-[0_0_8px_rgba(212,175,55,0.3)]'
                                   : 'hover:bg-gold/10 hover:text-gold text-gray-200 bg-white/[0.02]'
                               }`}
                             >
                               {slot}
                             </button>
                           );
                         })}
                       </div>
                     </div>
                   </>
                 )}
               </div>

            </div>
          </div>

          <button 
            type="submit" 
            disabled={isSubmitting}
            className="w-full group relative inline-flex items-center justify-center gap-2 px-8 py-5 rounded-xl font-bold tracking-widest text-sm uppercase text-rich-black transition-all duration-300 hover:scale-[1.01] shadow-[0_5px_20px_rgba(212,175,55,0.2)] bg-gradient-to-r from-[#D4AF37] to-[#B8860B] mt-6 disabled:opacity-70 disabled:hover:scale-100"
          >
            {isSubmitting ? (
              <div className="w-6 h-6 border-2 border-rich-black border-t-transparent rounded-full animate-spin"></div>
            ) : (
              <>
                Submit Request
                <ArrowRight className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" />
              </>
            )}
          </button>
        </form>
      </div>
    </main>
  );
}
