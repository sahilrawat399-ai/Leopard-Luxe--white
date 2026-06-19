import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Eye, Check, Copy, ArrowRight, User, Mail, Phone, Building, Briefcase, DollarSign, FileText, Calendar, Clock } from 'lucide-react';
import { db } from '../lib/firebase';
import { doc, getDoc, setDoc, serverTimestamp } from 'firebase/firestore';
import { useBookingStore } from '../stores/bookingStore';
import { useNavigate } from 'react-router-dom';
import { sendAutomatedEmail } from '../lib/emailService';

const SERVICES = [
  "SEO & Digital Luxury Growth Strategy",
  "High-Converting Private Website Development",
  "Premium Performance Lead Generation Campaigns",
  "Social Media & High-End Visual Branding",
  "Full-Suite Executive Marketing & Scale"
];

const BUDGETS = [
  "Under $2,000 / month",
  "$2,000 – $5,000 / month",
  "$5,000 – $10,000 / month",
  "$10,000 – $25,000 / month",
  "$25,000+ / month"
];

// Professional time ranges
const TIME_SLOTS = [
  "09:00 AM", "09:30 AM", "10:00 AM", "10:30 AM",
  "11:00 AM", "11:30 AM", "12:00 PM", "12:30 PM",
  "01:00 PM", "01:30 PM", "02:00 PM", "02:30 PM",
  "03:00 PM", "03:30 PM", "04:00 PM", "04:30 PM",
  "05:00 PM"
];

export function BookingFormModal() {
  const { isBookingFormOpen, setBookingFormOpen } = useBookingStore();
  const navigate = useNavigate();

  // Form State
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [companyName, setCompanyName] = useState('');
  const [serviceInterested, setServiceInterested] = useState(SERVICES[0]);
  const [budget, setBudget] = useState(BUDGETS[0]);
  const [notes, setNotes] = useState('');

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

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [bookingId, setBookingId] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);
  const [copied, setCopied] = useState(false);
  const [error, setError] = useState<string | null>(null);

  if (!isBookingFormOpen) return null;

  // Generate unique booking ID (e.g. LL-482931) and ensure it's unique in Firestore
  const generateUniqueBookingId = async (): Promise<string> => {
    let attempts = 0;
    while (attempts < 10) {
      const code = Math.floor(100000 + Math.random() * 900000).toString();
      const possibleId = `LL-${code}`;
      const docRef = doc(db, 'bookings', possibleId);
      const snapshot = await getDoc(docRef);
      if (!snapshot.exists()) {
        return possibleId;
      }
      attempts++;
    }
    // Fallback if somehow collisions happen 10 times in a row
    return `LL-${Math.floor(100000 + Math.random() * 900000)}`;
  };

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

  const handleTrackBookingRedirect = () => {
    setBookingFormOpen(false);
    setIsSuccess(false);
    navigate('/bookings', { state: { bookingId, email: successEmail } });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName || !email || !phone) {
      setError("Please fill out all required fields.");
      return;
    }

    if (!selectedDate || !selectedTime) {
      setError("Please select both your Preferred Meeting Date and Preferred Meeting Time.");
      return;
    }

    setIsSubmitting(true);
    setError(null);

    try {
      const uniqueId = await generateUniqueBookingId();
      setBookingId(uniqueId);
      
      // Capture state values for read-out on the Success Popup
      setSuccessDate(selectedDate);
      setSuccessTime(selectedTime);
      setSuccessEmail(email.trim().toLowerCase());

      // Create document payload matching step 4 structure
      const bookingPayload = {
        bookingId: uniqueId,
        fullName,
        email: email.trim().toLowerCase(),
        phone: phone.trim(),
        companyName: companyName.trim() || "N/A",
        serviceInterested,
        budget,
        notes: notes.trim() || "N/A",
        selectedDate,
        selectedTime,
        status: "Pending",
        assignedTo: "",
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp()
      };

      // 1. Write document to Firestore bookings collection
      await setDoc(doc(db, 'bookings', uniqueId), bookingPayload);

      // 2. Clear old state and trigger success
      setIsSuccess(true);

      // 3. Trigger immediate automated confirmation email log
      const emailBody = `Hello ${fullName},

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

      await sendAutomatedEmail(
        email.trim().toLowerCase(),
        "Leopard Luxe Strategy Call Confirmation",
        emailBody
      );

      // Reset form variables
      setFullName('');
      setEmail('');
      setPhone('');
      setCompanyName('');
      setServiceInterested(SERVICES[0]);
      setBudget(BUDGETS[0]);
      setNotes('');
      setSelectedDate('');
      setSelectedTime('');
    } catch (err: any) {
      console.error("Booking submission error:", err);
      setError("Unable to create booking. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[150] flex items-center justify-center p-4">
        {/* Backdrop overlay */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => !isSubmitting && setBookingFormOpen(false)}
          className="absolute inset-0 bg-black/80 backdrop-blur-md"
        />

        {/* Modal Sheet container */}
        <motion.div
          initial={{ scale: 0.95, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.95, opacity: 0, y: 20 }}
          transition={{ type: "spring", duration: 0.5 }}
          className="relative w-full max-w-2xl bg-gradient-to-b from-[#0A0A0A] to-[#040404] border border-gold/40 rounded-3xl overflow-hidden shadow-[0_0_50px_rgba(212,175,55,0.25)] flex flex-col max-h-[90vh] z-10"
        >
          {/* Header */}
          <div className="p-6 border-b border-white/5 flex items-center justify-between">
            <h3 className="font-serif text-2xl font-bold text-white flex items-center gap-2">
              <span className="text-gold">★</span> Book Strategy Call
            </h3>
            <button
              onClick={() => setBookingFormOpen(false)}
              className="text-gray-400 hover:text-white p-2 rounded-full hover:bg-white/5 transition-colors cursor-pointer"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          <div className="flex-1 p-6 overflow-y-auto custom-scrollbar">
            {!isSuccess ? (
              <form onSubmit={handleSubmit} className="space-y-6 text-left">
                {error && (
                  <div className="bg-red-500/10 border border-red-500/30 text-red-500 p-4 rounded-xl text-xs font-semibold">
                    {error}
                  </div>
                )}

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Full Name */}
                  <div>
                    <label className="block text-xs font-bold tracking-wider text-gray-400 uppercase mb-2">Full Name *</label>
                    <div className="relative">
                      <User className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gold" />
                      <input
                        type="text"
                        required
                        placeholder="John Doe"
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        className="w-full bg-black border border-white/10 rounded-xl py-3 pl-12 pr-4 text-white focus:outline-none focus:border-gold transition-colors text-sm"
                      />
                    </div>
                  </div>

                  {/* Email */}
                  <div>
                    <label className="block text-xs font-bold tracking-wider text-gray-400 uppercase mb-2">Email Address *</label>
                    <div className="relative">
                      <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gold" />
                      <input
                        type="email"
                        required
                        placeholder="john@example.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full bg-black border border-white/10 rounded-xl py-3 pl-12 pr-4 text-white focus:outline-none focus:border-gold transition-colors text-sm"
                      />
                    </div>
                  </div>

                  {/* Phone */}
                  <div>
                    <label className="block text-xs font-bold tracking-wider text-gray-400 uppercase mb-2">Phone Number *</label>
                    <div className="relative">
                      <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gold" />
                      <input
                        type="tel"
                        required
                        placeholder="+1 (555) 000-0000"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        className="w-full bg-black border border-white/10 rounded-xl py-3 pl-12 pr-4 text-white focus:outline-none focus:border-gold transition-colors text-sm"
                      />
                    </div>
                  </div>

                  {/* Company Name */}
                  <div>
                    <label className="block text-xs font-bold tracking-wider text-gray-400 uppercase mb-2">Company Name</label>
                    <div className="relative">
                      <Building className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gold" />
                      <input
                        type="text"
                        placeholder="Acme Corp"
                        value={companyName}
                        onChange={(e) => setCompanyName(e.target.value)}
                        className="w-full bg-black border border-white/10 rounded-xl py-3 pl-12 pr-4 text-white focus:outline-none focus:border-gold transition-colors text-sm"
                      />
                    </div>
                  </div>

                  {/* Service Interested In */}
                  <div>
                    <label className="block text-xs font-bold tracking-wider text-gray-400 uppercase mb-2">Service Interested In</label>
                    <div className="relative">
                      <Briefcase className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gold" />
                      <select
                        value={serviceInterested}
                        onChange={(e) => setServiceInterested(e.target.value)}
                        className="w-full bg-black border border-white/10 rounded-xl py-3 pl-12 pr-4 text-white focus:outline-none focus:border-gold transition-colors text-sm appearance-none"
                      >
                        {SERVICES.map((serv) => (
                          <option key={serv} value={serv} className="bg-[#111] text-white">
                            {serv}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  {/* Marketing Budget */}
                  <div>
                    <label className="block text-xs font-bold tracking-wider text-gray-400 uppercase mb-2">Monthly Marketing Budget</label>
                    <div className="relative">
                      <DollarSign className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gold" />
                      <select
                        value={budget}
                        onChange={(e) => setBudget(e.target.value)}
                        className="w-full bg-black border border-white/10 rounded-xl py-3 pl-12 pr-4 text-white focus:outline-none focus:border-gold transition-colors text-sm appearance-none"
                      >
                        {BUDGETS.map((bdg) => (
                          <option key={bdg} value={bdg} className="bg-[#111] text-white">
                            {bdg}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  {/* Preferred Meeting Date (Calendar Picker) */}
                  <div className="relative">
                    <label className="block text-xs font-bold tracking-wider text-gray-400 uppercase mb-2">Preferred Meeting Date *</label>
                    <button
                      type="button"
                      onClick={() => {
                        setIsCalendarOpen(!isCalendarOpen);
                        setIsTimeOpen(false);
                      }}
                      className="w-full bg-black border border-white/10 rounded-xl py-3 pl-12 pr-4 text-white text-left focus:outline-none focus:border-gold transition-colors text-sm flex items-center justify-between cursor-pointer"
                    >
                      <div className="flex items-center gap-3">
                        <Calendar className="w-4 h-4 text-gold flex-shrink-0" />
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
                      className="w-full bg-black border border-white/10 rounded-xl py-3 pl-12 pr-4 text-white text-left focus:outline-none focus:border-gold transition-colors text-sm flex items-center justify-between cursor-pointer"
                    >
                      <div className="flex items-center gap-3">
                        <Clock className="w-4 h-4 text-gold flex-shrink-0" />
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
                                  key={slot}
                                  type="button"
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

                {/* Additional Notes */}
                <div>
                  <label className="block text-xs font-bold tracking-wider text-gray-400 uppercase mb-2">Additional Notes</label>
                  <div className="relative">
                    <FileText className="absolute left-4 top-4 w-4 h-4 text-gold" />
                    <textarea
                      rows={4}
                      placeholder="Share your business goals or specific details you would like to cover during the strategy session..."
                      value={notes}
                      onChange={(e) => setNotes(e.target.value)}
                      className="w-full bg-black border border-white/10 rounded-xl py-3.5 pl-12 pr-4 text-white focus:outline-none focus:border-gold transition-colors text-sm resize-none"
                    />
                  </div>
                </div>

                {/* Submit button */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full flex items-center justify-center gap-2 px-6 py-4 rounded-xl font-bold tracking-widest text-xs uppercase text-rich-black transition-all duration-300 hover:scale-[1.01] shadow-[0_5px_20px_rgba(212,175,55,0.35)] bg-gradient-to-r from-[#D4AF37] to-[#B8860B] select-none cursor-pointer disabled:opacity-75 disabled:hover:scale-100"
                >
                  {isSubmitting ? (
                    <div className="w-5 h-5 border-2 border-rich-black border-t-transparent rounded-full animate-spin" />
                  ) : (
                    <>
                      Submit Request <ArrowRight className="w-4 h-4" />
                    </>
                  )}
                </button>
              </form>
            ) : (
              /* Success popup state: section 6 */
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="py-8 px-4 text-center space-y-6"
              >
                <div className="w-16 h-16 bg-gold/10 border border-gold rounded-full flex items-center justify-center mx-auto mb-4">
                  <Check className="w-8 h-8 text-gold" />
                </div>

                <h4 className="font-serif text-3xl font-bold text-white uppercase tracking-tight">
                  Booking Submitted Successfully
                </h4>

                <p className="text-gray-300 text-sm max-w-md mx-auto">
                  Thank you for choosing Leopard Luxe.
                </p>

                <div className="bg-white/5 border border-white/10 p-5 rounded-2xl max-w-sm mx-auto space-y-3 text-left">
                  <div className="text-center pb-2 border-b border-white/5">
                    <span className="text-[10px] text-gray-500 uppercase font-mono font-bold tracking-widest block">
                      Your Booking ID
                    </span>
                    <span className="font-mono text-2xl font-extrabold text-gold tracking-wide block">
                      {bookingId}
                    </span>
                  </div>

                  <div className="space-y-1.5 text-xs text-gray-300 pt-1">
                    <div className="flex justify-between">
                      <span className="text-gray-500 uppercase text-[9px] tracking-wider font-bold">Meeting Date:</span>
                      <span className="font-semibold text-white">{successDate}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-500 uppercase text-[9px] tracking-wider font-bold">Meeting Time:</span>
                      <span className="font-semibold text-white">{successTime}</span>
                    </div>
                  </div>

                  <span className="text-[10.5px] text-gray-400 block pt-2 text-center leading-relaxed">
                    Please save this ID. We have also saved a confirmation log to your email: <strong className="text-gold font-mono text-xs">{successEmail || "specified address"}</strong>.
                  </span>
                </div>

                <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-6 max-w-md mx-auto">
                  <button
                    onClick={handleCopy}
                    className="w-full sm:flex-1 py-3 px-4 rounded-xl font-sans font-bold text-xs uppercase border border-gold/40 text-gold hover:bg-gold/5 transition-all flex items-center justify-center gap-2 cursor-pointer"
                  >
                    {copied ? (
                      <>
                        <Check className="w-4 h-4 text-green-400" /> Copied!
                      </>
                    ) : (
                      <>
                        <Copy className="w-4 h-4" /> Copy Booking ID
                      </>
                    )}
                  </button>

                  <button
                    onClick={handleTrackBookingRedirect}
                    className="w-full sm:flex-1 py-3 px-4 rounded-xl font-sans font-bold text-xs uppercase text-rich-black bg-gradient-to-r from-[#D4AF37] to-[#B8860B] transition-all duration-300 flex items-center justify-center gap-2 hover:scale-[1.01] cursor-pointer"
                  >
                    <Eye className="w-4 h-4" /> Track Booking
                  </button>
                </div>

                <button
                  onClick={() => {
                    setIsSuccess(false);
                    setBookingFormOpen(false);
                  }}
                  className="text-gray-500 hover:text-white pt-4 text-xs tracking-wider uppercase font-semibold block mx-auto transition-colors cursor-pointer"
                >
                  Close
                </button>
              </motion.div>
            )}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
