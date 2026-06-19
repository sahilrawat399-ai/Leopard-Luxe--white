import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../stores/authStore';
import { auth, db, storage } from '../lib/firebase';
import { collection, query, where, onSnapshot, getDocs, orderBy, addDoc, serverTimestamp, doc, setDoc } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { handleFirestoreError, OperationType } from '../lib/firestore-errors';
import { format } from 'date-fns';
import { motion } from 'motion/react';
import { CheckCircle2, Calendar, FileText, Download, MessageSquare, Upload, X, LogOut } from 'lucide-react';
import { trackCustomEvent } from '../lib/analytics';

const PROJECT_STAGES = [
  "Onboarding", "Discovery & Research", "Strategy Planning", "Project Started", 
  "Phase 1 Development", "Phase 2 Development", "Phase 3 Optimization", 
  "Client Review", "Final Revisions", "Project Completed"
];

function ProgressTracker({ project }: { project: any }) {
  const currentIndex = PROJECT_STAGES.indexOf(project.status);
  
  return (
    <div className="bg-[#0A0A0A] border border-white/10 rounded-3xl p-8 mb-8">
      <div className="flex flex-col md:flex-row justify-between md:items-end mb-8 gap-4">
        <div>
          <h2 className="text-sm font-bold tracking-widest text-gray-400 uppercase mb-2">Project Progress</h2>
          <div className="text-3xl font-serif font-bold text-white mb-2">{project.status}</div>
          <p className="text-gold">{project.percentageCompleted}% Completed</p>
        </div>
        <div className="text-right">
          <p className="text-gray-400 text-sm">Expected Completion</p>
          <p className="text-white font-medium">{project.expectedCompletionDate ? format(project.expectedCompletionDate.toDate(), 'PPP') : 'TBD'}</p>
        </div>
      </div>

      <div className="relative">
        <div className="flex justify-between mb-2">
          {PROJECT_STAGES.map((stage, idx) => (
             <div key={stage} className={`w-1/10 text-center ${idx <= currentIndex ? 'text-gold' : 'text-gray-600'} flex flex-col items-center justify-center relative`}>
                <div className={`w-4 h-4 rounded-full z-10 mb-2 transition-colors ${idx < currentIndex ? 'bg-gold' : idx === currentIndex ? 'bg-white shadow-[0_0_10px_rgba(255,255,255,0.5)] border-2 border-gold' : 'bg-gray-800'}`}></div>
                <span className="text-[10px] hidden md:block uppercase tracking-wider h-8 text-center">{stage}</span>
             </div>
          ))}
        </div>
        <div className="absolute top-2 left-[5%] right-[5%] h-0.5 bg-gray-800 -z-0 -translate-y-1/2">
           <div className="h-full bg-gold transition-all duration-1000 ease-out" style={{ width: `${(Math.max(0, currentIndex) / (PROJECT_STAGES.length - 1)) * 100}%` }}></div>
        </div>
      </div>
    </div>
  );
}

export function ClientPortal() {
    const { dbUser, user } = useAuthStore();
    const navigate = useNavigate();

    // In-memory flags to track if we successfully pre-hydrated from cache
    const hasCachedProj = useRef<boolean>(false);
    const hasCachedUpdates = useRef<boolean>(false);
    const hasCachedFiles = useRef<boolean>(false);
    const hasCachedBookings = useRef<boolean>(false);

    // Initial state setup from localStorage cache (Req 10 & 11)
    const [project, setProject] = useState<any>(() => {
      if (!user) return null;
      try {
        const cached = localStorage.getItem(`luxe_cached_project_${user.uid}`);
        if (cached) {
          hasCachedProj.current = true;
          return JSON.parse(cached);
        }
      } catch {}
      return null;
    });

    const [updates, setUpdates] = useState<any[]>(() => {
      if (!user) return [];
      try {
        const cached = localStorage.getItem(`luxe_cached_updates_${user.uid}`);
        if (cached) {
          hasCachedUpdates.current = true;
          return JSON.parse(cached);
        }
      } catch {}
      return [];
    });

    const [files, setFiles] = useState<any[]>(() => {
      if (!user) return [];
      try {
        const cached = localStorage.getItem(`luxe_cached_files_${user.uid}`);
        if (cached) {
          hasCachedFiles.current = true;
          return JSON.parse(cached);
        }
      } catch {}
      return [];
    });

    const [bookings, setBookings] = useState<any[]>(() => {
      if (!user) return [];
      try {
        const cached = localStorage.getItem(`luxe_cached_bookings_${user.uid}`);
        if (cached) {
          hasCachedBookings.current = true;
          return JSON.parse(cached);
        }
      } catch {}
      return [];
    });

    // Sub-loaders fallback states if cache is empty or stale.
    // They default to false if cached data exists, displaying the dashboard instantly! (Req 13)
    const [projectLoading, setProjectLoading] = useState(!hasCachedProj.current);
    const [updatesLoading, setUpdatesLoading] = useState(!hasCachedUpdates.current);
    const [filesLoading, setFilesLoading] = useState(!hasCachedFiles.current);
    const [bookingsLoading, setBookingsLoading] = useState(!hasCachedBookings.current);

    // Backward-compatible loading state indicator (so we do not break any parent/route loading hooks)
    const [loading, setLoading] = useState(!hasCachedProj.current);
    const [uploadingFile, setUploadingFile] = useState(false);

    // Booking states and references
    const [selectedDate, setSelectedDate] = useState<string>('');
    const [selectedTime, setSelectedTime] = useState<string>('');
    const [successModalData, setSuccessModalData] = useState<{
      bookingId: string;
      date: string;
      time: string;
    } | null>(null);
    const [toastMessage, setToastMessage] = useState<string | null>(null);
    const [bookingError, setBookingError] = useState<string | null>(null);

    // Lazy load scheduler section visibility (Req 12)
    const [schedulerVisible, setSchedulerVisible] = useState(false);
    const schedulerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
      if (!('IntersectionObserver' in window)) {
        setSchedulerVisible(true);
        return;
      }
      const observer = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting) {
          setSchedulerVisible(true);
          observer.disconnect();
        }
      }, { rootMargin: '200px' });
      
      if (schedulerRef.current) {
        observer.observe(schedulerRef.current);
      }
      return () => observer.disconnect();
    }, []);

    useEffect(() => {
      if (toastMessage) {
        const timer = setTimeout(() => setToastMessage(null), 4000);
        return () => clearTimeout(timer);
      }
    }, [toastMessage]);

    // Force hide skeletons and full screen loaders in at most 500ms (Req 5 & 17)
    useEffect(() => {
      const loaderTimer = setTimeout(() => {
        setProjectLoading(false);
        setUpdatesLoading(false);
        setFilesLoading(false);
        setBookingsLoading(false);
        setLoading(false);
      }, 500);

      return () => clearTimeout(loaderTimer);
    }, []);

    // Print Timing Metrics to Console (Req 16)
    const mountTimeRef = useRef<number>(performance.now());
    useEffect(() => {
      const authTime = performance.now();
      console.log(`[Timer] Authentication and state loaded from cache in: ${authTime.toFixed(2)}ms`);
      
      const renderTime = performance.now() - mountTimeRef.current;
      console.log(`[Timer] Leopard Luxe Member Dashboard rendered in: ${renderTime.toFixed(2)}ms`);
    }, []);

    const dateInputRef = useRef<HTMLInputElement>(null);

    const getTodayString = () => {
      const today = new Date();
      const year = today.getFullYear();
      const month = String(today.getMonth() + 1).padStart(2, '0');
      const day = String(today.getDate()).padStart(2, '0');
      return `${year}-${month}-${day}`;
    };

    const formatDateDisplay = (dateStr: string) => {
      if (!dateStr) return '';
      const [year, month, day] = dateStr.split('-');
      return `${day}/${month}/${year}`;
    };

    const formatTimeTo12Hour = (timeStr: string) => {
      if (!timeStr) return '';
      const [hoursStr, minutesStr] = timeStr.split(':');
      let hours = parseInt(hoursStr, 10);
      const ampm = hours >= 12 ? 'PM' : 'AM';
      hours = hours % 12;
      hours = hours ? hours : 12;
      return `${hours}:${minutesStr} ${ampm}`;
    };

    const convert12HourTo24Hour = (time12: string) => {
      if (!time12) return '';
      const match = time12.match(/^(\d{1,2}):(\d{2})\s*(AM|PM)$/i);
      if (!match) return '';
      let [_, hoursStr, minutes, ampm] = match;
      let hours = parseInt(hoursStr, 10);
      if (ampm.toUpperCase() === 'PM' && hours < 12) hours += 12;
      if (ampm.toUpperCase() === 'AM' && hours === 12) hours = 0;
      return `${String(hours).padStart(2, '0')}:${minutes}`;
    };

    const TIME_SLOTS = [
      { label: "9:00 AM", value: "09:00" },
      { label: "10:00 AM", value: "10:00" },
      { label: "11:00 AM", value: "11:00" },
      { label: "12:00 PM", value: "12:00" },
      { label: "1:00 PM", value: "13:00" },
      { label: "2:00 PM", value: "14:00" },
      { label: "3:00 PM", value: "15:00" },
      { label: "4:00 PM", value: "16:00" },
      { label: "5:00 PM", value: "17:00" }
    ];

    const isTimeSlotBooked = (slotValue: string) => {
      if (!selectedDate) return false;
      const formattedSelectedDate = formatDateDisplay(selectedDate);
      
      const hasExistingBooking = bookings.some(booking => {
        if (booking.status === 'Rejected') return false;
        const bDate = booking.bookingDate;
        const bTime = booking.bookingTime;
        const datesMatch = bDate === formattedSelectedDate || bDate === selectedDate;
        if (!datesMatch) return false;
        
        const bTime24 = bTime.includes('AM') || bTime.includes('PM')
          ? convert12HourTo24Hour(bTime)
          : bTime;
        return bTime24 === slotValue;
      });

      if (hasExistingBooking) return true;

      const todayStr = getTodayString();
      if (selectedDate === todayStr) {
        const now = new Date();
        const currentHour = now.getHours();
        const currentMinute = now.getMinutes();
        const [slotHourStr, slotMinuteStr] = slotValue.split(':');
        const slotHour = parseInt(slotHourStr, 10);
        const slotMinute = parseInt(slotMinuteStr, 10);
        
        if (slotHour < currentHour || (slotHour === currentHour && slotMinute <= currentMinute)) {
          return true;
        }
      }
      return false;
    };

    const handleSlotClick = (slotValue: string) => {
      setSelectedTime(slotValue);
    };

    const handleDateChange = (val: string) => {
      const today = getTodayString();
      if (val < today) {
        alert('You cannot select a past date.');
        setSelectedDate('');
        return;
      }
      setSelectedDate(val);
      setSelectedTime('');
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
      navigate('/login');
    };
  
    const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (!file || !project || !user) return;
      
      setUploadingFile(true);
      try {
        const storageRef = ref(storage, `projects/${project.id}/${Date.now()}_${file.name}`);
        const snapshot = await uploadBytes(storageRef, file);
        const url = await getDownloadURL(snapshot.ref);
        
        await addDoc(collection(db, 'files'), {
          projectId: project.id,
          clientId: user.uid,
          uploadedBy: user.uid,
          fileName: file.name,
          fileUrl: url,
          createdAt: serverTimestamp()
        });
        alert('File uploaded successfully!');
    } catch (err: any) {
      if(err.code === 'storage/unauthorized') {
        alert('File upload requires Firebase Storage rules to be configured. For now this preview environment might not have Storage fully configured.');
      } else {
        alert('File upload failed: ' + err.message);
      }
    } finally {
      setUploadingFile(false);
      if(e.target) e.target.value = '';
    }
  };

  // PARALLEL NON-WATERFALL FIRESTORE REALTIME SYNC (Req 7, 8 & 14)
  useEffect(() => {
    if (!user) return;

    const startQueriesTime = performance.now();

    // 1. Subscribe to Projects in parallel
    const projQuery = query(collection(db, 'projects'), where('clientId', '==', user.uid));
    const unsubscribeProj = onSnapshot(projQuery, (snapshot) => {
      const duration = performance.now() - startQueriesTime;
      console.log(`[Timer] Firestore [projects] query resolved in: ${duration.toFixed(2)}ms`);

      if (!snapshot.empty) {
        const data = { id: snapshot.docs[0].id, ...snapshot.docs[0].data() };
        setProject(data);
        localStorage.setItem(`luxe_cached_project_${user.uid}`, JSON.stringify(data));
      } else {
        setProject(null);
        localStorage.removeItem(`luxe_cached_project_${user.uid}`);
      }
      setProjectLoading(false);
      setLoading(false);
    }, (error) => {
      handleFirestoreError(error, OperationType.GET, 'projects');
      setProjectLoading(false);
      setLoading(false);
    });

    // 2. Subscribe to Bookings in parallel
    const bookingsQuery = query(collection(db, 'bookings'), where('userId', '==', user.uid));
    const unsubscribeBookings = onSnapshot(bookingsQuery, (snapshot) => {
      const duration = performance.now() - startQueriesTime;
      console.log(`[Timer] Firestore [bookings] query resolved in: ${duration.toFixed(2)}ms`);

      const list = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setBookings(list);
      localStorage.setItem(`luxe_cached_bookings_${user.uid}`, JSON.stringify(list));
      setBookingsLoading(false);
    }, (error) => {
      handleFirestoreError(error, OperationType.GET, 'bookings');
      setBookingsLoading(false);
    });

    // 3. Subscribe to Updates in parallel (via clientId to bypass waterfall!)
    const updatesQuery = query(collection(db, 'projectUpdates'), where('clientId', '==', user.uid));
    const unsubscribeUpdates = onSnapshot(updatesQuery, (snapshot) => {
      const duration = performance.now() - startQueriesTime;
      console.log(`[Timer] Firestore [projectUpdates] query resolved in: ${duration.toFixed(2)}ms`);

      const list = snapshot.docs
        .map(doc => ({ id: doc.id, ...doc.data() } as any))
        .sort((a, b) => {
          const tA = a.createdAt?.toDate ? a.createdAt.toDate().getTime() : 0;
          const tB = b.createdAt?.toDate ? b.createdAt.toDate().getTime() : 0;
          return tB - tA;
        });

      setUpdates(list);
      localStorage.setItem(`luxe_cached_updates_${user.uid}`, JSON.stringify(list));
      setUpdatesLoading(false);
    }, (error) => {
      handleFirestoreError(error, OperationType.GET, 'projectUpdates');
      setUpdatesLoading(false);
    });

    // 4. Subscribe to Files in parallel (via clientId to bypass waterfall!)
    const filesQuery = query(collection(db, 'files'), where('clientId', '==', user.uid));
    const unsubscribeFiles = onSnapshot(filesQuery, (snapshot) => {
      const duration = performance.now() - startQueriesTime;
      console.log(`[Timer] Firestore [files] query resolved in: ${duration.toFixed(2)}ms`);

      const list = snapshot.docs
        .map(doc => ({ id: doc.id, ...doc.data() } as any))
        .sort((a, b) => {
          const tA = a.createdAt?.toDate ? a.createdAt.toDate().getTime() : 0;
          const tB = b.createdAt?.toDate ? b.createdAt.toDate().getTime() : 0;
          return tB - tA;
        });

      setFiles(list);
      localStorage.setItem(`luxe_cached_files_${user.uid}`, JSON.stringify(list));
      setFilesLoading(false);
    }, (error) => {
      handleFirestoreError(error, OperationType.GET, 'files');
      setFilesLoading(false);
    });

    return () => {
      unsubscribeProj();
      unsubscribeBookings();
      unsubscribeUpdates();
      unsubscribeFiles();
    };
  }, [user]);

  const renderMeetingForm = () => {
    return (
      <form 
        onSubmit={async (e) => {
          e.preventDefault();
          setBookingError(null);
          trackCustomEvent('Confirm Booking button clicks');
          const form = e.target as HTMLFormElement;
          const serviceType = (form.elements.namedItem('serviceType') as HTMLSelectElement).value;
          const notes = (form.elements.namedItem('notes') as HTMLTextAreaElement).value;
          
          if (!selectedDate) {
            alert('Please select a date.');
            return;
          }
          if (!selectedTime) {
            alert('Please select an available time slot.');
            return;
          }
          if (!serviceType) {
            alert('Please select a Service Type.');
            return;
          }

          try {
            const bookingIdNum = Math.floor(100000 + Math.random() * 900000);
            const bookingId = `LL-${bookingIdNum}`;
            const bDate = formatDateDisplay(selectedDate);
            const bTime = formatTimeTo12Hour(selectedTime);

            // 1. Write to general 'bookings' so it populates current customer & admin dashboards
            await setDoc(doc(db, 'bookings', bookingId), {
              bookingId,
              userId: user?.uid || 'Unknown',
              fullName: dbUser?.fullName || user?.displayName || "VIP Partner",
              email: user?.email || "",
              phone: dbUser?.phone || "N/A",
              companyName: dbUser?.companyName || "N/A",
              serviceInterested: serviceType,
              budget: "N/A",
              notes: notes || "",
              selectedDate: bDate,
              selectedTime: bTime,
              status: 'Pending',
              createdAt: serverTimestamp(),
              updatedAt: serverTimestamp()
            });

            // 2. Write to explicit 'meetingRequests' collection as requested
            await setDoc(doc(db, 'meetingRequests', bookingId), {
              bookingId: bookingIdNum,
              userEmail: user?.email || "",
              userName: dbUser?.fullName || user?.displayName || "",
              selectedDate,
              selectedTime,
              serviceType,
              additionalNotes: notes || "",
              status: 'Pending',
              createdAt: serverTimestamp()
            });

            // Save client backup to localStorage for ultra-reliable tracking
            try {
              const localPayload = {
                bookingId,
                userId: user?.uid || 'Unknown',
                fullName: dbUser?.fullName || user?.displayName || "VIP Partner",
                email: user?.email || "",
                phone: dbUser?.phone || "N/A",
                companyName: dbUser?.companyName || "N/A",
                serviceInterested: serviceType,
                budget: "N/A",
                selectedDate: bDate,
                selectedTime: bTime,
                status: 'Pending',
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString()
              };
              const existingLocal = JSON.parse(localStorage.getItem('luxe_bookings') || '[]');
              const filteredLocal = existingLocal.filter((b: any) => b.bookingId !== bookingId);
              filteredLocal.push(localPayload);
              localStorage.setItem('luxe_bookings', JSON.stringify(filteredLocal.slice(-10)));
            } catch (localErr) {
              console.warn("Could not save backup client booking to localStorage:", localErr);
            }

            console.log("Booking saved successfully");

            trackCustomEvent('Meeting Request submissions', {
              bookingId,
              serviceType,
              bookingDate: bDate,
              bookingTime: bTime
            });

            setSuccessModalData({
              bookingId,
              date: bDate,
              time: bTime
            });

            setToastMessage(`Your booking is confirmed. Booking ID: ${bookingId}`);

            form.reset();
            setSelectedDate('');
            setSelectedTime('');
          } catch (err: any) {
             console.error("Booking save failed:", err);
             const exactErrorMsg = err.message || String(err);
             setBookingError(exactErrorMsg);
             handleFirestoreError(err, OperationType.CREATE, 'meetingRequests');
          }
        }}
        className="grid grid-cols-1 md:grid-cols-2 gap-6 text-left"
      >
        <div className="space-y-6">
          {/* Native Date Input with Gold Calendar Icon */}
          <div>
            <label className="block text-xs font-bold tracking-wider text-gray-400 uppercase mb-2">Select Date</label>
            <div className="relative w-full">
              <input 
                type="date"
                name="date"
                ref={dateInputRef}
                value={selectedDate}
                min={getTodayString()}
                onChange={(e) => handleDateChange(e.target.value)}
                onClick={(e) => {
                  try {
                    (e.target as HTMLInputElement).showPicker();
                  } catch (err) {
                    console.warn('showPicker error:', err);
                  }
                }}
                required
                className="w-full bg-rich-black border border-white/10 rounded-xl py-3.5 pl-4 pr-12 text-white focus:outline-none focus:border-gold transition-colors text-sm cursor-pointer [color-scheme:dark] select-none"
              />
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  e.preventDefault();
                  try {
                    dateInputRef.current?.showPicker();
                  } catch (err) {
                    dateInputRef.current?.focus();
                  }
                }}
                className="absolute right-4 top-1/2 -translate-y-1/2 p-1 text-gold hover:scale-105 transition-transform flex items-center justify-center cursor-pointer select-none"
                aria-label="Open date picker"
              >
                <Calendar className="w-5 h-5 pointer-events-none" />
              </button>
            </div>
          </div>

          {/* Service Type */}
          <div>
            <label className="block text-xs font-bold tracking-wider text-gray-400 uppercase mb-2">Service Type</label>
            <select name="serviceType" required className="w-full bg-rich-black border border-white/10 rounded-xl py-3.5 px-4 text-white focus:outline-none focus:border-gold transition-colors cursor-pointer select-none">
              <option value="Website Consultation">Website Consultation</option>
              <option value="SEO Strategy Call">SEO Strategy Call</option>
              <option value="Marketing Consultation">Marketing Consultation</option>
              <option value="Project Review Meeting">Project Review Meeting</option>
              <option value="Support Meeting">Support Meeting</option>
            </select>
          </div>
        </div>

        <div className="space-y-6">
          {/* Calendly Style Interactive Slots */}
          <div>
            <label className="block text-xs font-bold tracking-wider text-gray-400 uppercase mb-3">
              Available Time Slots {selectedDate && `for ${formatDateDisplay(selectedDate)}`}
            </label>
            {!selectedDate ? (
              <div className="border border-white/5 bg-[#050505]/40 rounded-xl p-6 text-center text-gray-500 text-sm italic">
                Please pick a date first to view available times.
              </div>
            ) : (
              <div className="grid grid-cols-3 gap-2">
                {TIME_SLOTS.map((slot) => {
                  const booked = isTimeSlotBooked(slot.value);
                  const isSelected = selectedTime === slot.value;
                  return (
                    <button
                      type="button"
                      key={slot.value}
                      disabled={booked}
                      onClick={() => handleSlotClick(slot.value)}
                      className={`py-2.5 px-2 text-xs rounded-xl font-bold transition-all text-center select-none ${
                        booked 
                          ? 'bg-white/5 border border-white/5 text-white/20 cursor-not-allowed line-through'
                          : isSelected
                            ? 'bg-gradient-to-r from-[#D4AF37] to-[#B8860B] text-rich-black font-extrabold shadow-[0_0_15px_rgba(212,175,55,0.4)]'
                            : 'bg-white/5 border border-white/10 text-white hover:border-gold hover:text-gold cursor-pointer'
                      }`}
                    >
                      {slot.label}
                    </button>
                  );
                })}
              </div>
            )}
            {selectedDate && (
              <p className="text-[11px] text-gray-500 mt-2 text-left">
                * Slots are automatically deconflicted with your scheduled bookings.
              </p>
            )}
          </div>

          <div>
            <label className="block text-xs font-bold tracking-wider text-gray-400 uppercase mb-2">Additional Notes</label>
            <textarea name="notes" rows={3} className="w-full bg-[#050505]/60 border border-white/10 rounded-xl py-3.5 px-4 text-white focus:outline-none focus:border-gold transition-colors resize-none text-sm placeholder-gray-600" placeholder="What would you like to discuss?"></textarea>
          </div>

          {bookingError && (
            <div id="booking-error-container" className="bg-red-500/10 border border-red-500/30 text-red-500 p-4 rounded-xl text-xs text-left">
              <span className="font-bold">Error saving booking:</span> {bookingError}
            </div>
          )}

          <button type="submit" className="w-full px-6 py-4 rounded-xl font-bold tracking-widest text-xs uppercase text-rich-black transition-all duration-300 hover:scale-[1.01] shadow-[0_5px_20px_rgba(212,175,55,0.35)] bg-gradient-to-r from-[#D4AF37] to-[#B8860B] select-none cursor-pointer">
            Confirm Booking
          </button>
        </div>
      </form>
    );
  };

  const renderMyBookings = () => {
    return (
      <div id="my-bookings-section" className="bg-[#0A0A0A] border border-white/10 rounded-3xl p-8 mb-8">
        <div className="flex items-center gap-3 mb-6 border-b border-white/10 pb-4">
          <Calendar className="w-5 h-5 text-gold" />
          <h3 className="font-serif text-2xl font-bold text-white">My Bookings</h3>
        </div>
        
        {bookings.length === 0 ? (
          <p className="text-gray-500 italic text-left">You have no scheduled bookings yet.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {bookings.map((booking) => (
              <div key={booking.id} className="p-5 rounded-2xl bg-[#0F0F0F] border border-white/5 hover:border-gold/30 transition-all text-left">
                <div className="flex justify-between items-start mb-3">
                  <span className="text-xs font-mono text-gold/80 bg-gold/10 px-2.5 py-1 rounded-md">ID: {booking.bookingId}</span>
                  <span className={`text-[10px] uppercase tracking-widest px-2.5 py-1 rounded-md font-bold border ${
                    booking.status === 'Approved' ? 'bg-green-500/10 text-green-400 border-green-500/20' :
                    booking.status === 'Completed' ? 'bg-blue-500/10 text-blue-400 border-blue-500/20' :
                    booking.status === 'Rejected' ? 'bg-red-500/10 text-red-400 border-red-500/20' :
                    'bg-yellow-500/10 text-yellow-500 border-yellow-500/20'
                  }`}>
                    {booking.status}
                  </span>
                </div>
                <h4 className="text-white font-bold text-sm mb-2">{booking.serviceType}</h4>
                <div className="space-y-1.5 text-xs text-gray-400">
                  <p><span className="text-gray-500 font-medium font-serif">Date:</span> {booking.bookingDate}</p>
                  <p><span className="text-gray-500 font-medium font-serif">Time:</span> {booking.bookingTime}</p>
                  {booking.notes && (
                    <p className="line-clamp-2 mt-2 bg-black/30 p-2 rounded text-gray-500 text-[11px]"><span className="text-gray-600 font-medium font-serif">Notes:</span> {booking.notes}</p>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    );
  };

  return (
    <main className="bg-rich-black min-h-screen pt-32 pb-20 px-6 lg:px-12 font-sans">
      <div className="max-w-7xl mx-auto">
        <div className="mb-12 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 className="font-serif text-4xl md:text-5xl font-bold text-white mb-2">Welcome back, {dbUser?.fullName?.split(' ')[0] || 'Client'}</h1>
            <p className="text-gray-400 text-lg">{dbUser?.businessName ? `${dbUser.businessName} Dashboard` : 'Client Dashboard'}</p>
          </div>
          <button 
            onClick={handleLogout}
            className="flex items-center gap-2 px-6 py-3 rounded-xl border border-red-500/30 text-red-400 font-bold hover:bg-red-500 hover:text-white transition-all text-xs tracking-wider uppercase select-none cursor-pointer"
          >
            <LogOut className="w-4 h-4" /> Sign Out
          </button>
        </div>

        {/* PROGRESSIVE SECTIONS LOAD ENGINE (unblocks instant painting/rendering) */}
        {project ? (
          <>
            {/* Active Project Widget */}
            {projectLoading && !project ? (
              <div className="bg-[#0A0A0A] border border-white/10 rounded-3xl p-8 animate-pulse mb-8">
                <div className="h-4 w-32 bg-white/5 rounded mb-4"></div>
                <div className="h-8 w-60 bg-white/5 rounded mb-4"></div>
                <div className="h-4 w-40 bg-white/5 rounded"></div>
              </div>
            ) : (
              <ProgressTracker project={project} />
            )}

            {/* Updates and Files section (independent loaders) */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
              
              {/* Updates Widget */}
              {updatesLoading && updates.length === 0 ? (
                <div className="bg-[#0A0A0A] border border-white/10 rounded-3xl p-8 h-[380px] animate-pulse">
                  <div className="h-6 w-40 bg-white/5 rounded mb-6"></div>
                  <div className="space-y-4">
                    <div className="h-4 bg-white/5 rounded w-full"></div>
                    <div className="h-4 bg-white/5 rounded w-5/6"></div>
                    <div className="h-4 bg-white/5 rounded w-3/4"></div>
                  </div>
                </div>
              ) : (
                <div className="bg-[#0A0A0A] border border-white/10 rounded-3xl p-8">
                  <div className="flex items-center gap-3 mb-6 border-b border-white/10 pb-4">
                    <MessageSquare className="w-5 h-5 text-gold" />
                    <h3 className="font-serif text-2xl font-bold text-white">Project Updates</h3>
                  </div>
                  
                  <div className="space-y-6 max-h-[400px] overflow-y-auto pr-2 custom-scrollbar">
                    {updates.length === 0 ? (
                      <p className="text-gray-500 italic">No updates posted yet.</p>
                    ) : (
                      updates.map(update => (
                        <div key={update.id} className="relative pl-6 border-l border-gold/30">
                          <div className="absolute top-0 left-0 w-3 h-3 rounded-full bg-gold -translate-x-[7px]"></div>
                          <p className="text-xs text-gray-400 mb-1">
                            {update.createdAt ? format(update.createdAt.toDate(), 'PPP p') : 'Just now'} • {update.uploadedBy || 'Admin'}
                          </p>
                          <p className="text-gray-300">{update.description}</p>
                        </div>
                      ))
                    )}
                  </div>
                </div>
              )}

              {/* Shared Files Widget */}
              {filesLoading && files.length === 0 ? (
                <div className="bg-[#0A0A0A] border border-white/10 rounded-3xl p-8 h-[380px] animate-pulse">
                  <div className="h-6 w-40 bg-white/5 rounded mb-6"></div>
                  <div className="space-y-4">
                    <div className="h-12 bg-white/5 rounded-xl w-full"></div>
                    <div className="h-12 bg-white/5 rounded-xl w-full"></div>
                  </div>
                </div>
              ) : (
                <div className="bg-[#0A0A0A] border border-white/10 rounded-3xl p-8">
                  <div className="flex items-center justify-between mb-6 border-b border-white/10 pb-4">
                    <div className="flex items-center gap-3">
                       <FileText className="w-5 h-5 text-gold" />
                       <h3 className="font-serif text-2xl font-bold text-white">Shared Files</h3>
                    </div>
                    <div>
                      <label className="cursor-pointer group flex items-center gap-2 px-4 py-2 rounded-lg font-bold tracking-widest text-[10px] uppercase text-rich-black transition-all duration-300 hover:scale-[1.02] shadow-[0_5px_15px_rgba(212,175,55,0.2)] bg-gradient-to-r from-[#D4AF37] to-[#B8860B] select-none">
                        {uploadingFile ? (
                           <div className="w-4 h-4 border-2 border-rich-black border-t-transparent rounded-full animate-spin"></div>
                        ) : (
                           <Upload className="w-3.5 h-3.5" />
                        )}
                        <span>Upload</span>
                        <input type="file" className="hidden" onChange={handleFileUpload} disabled={uploadingFile} />
                      </label>
                    </div>
                  </div>
                  
                  <div className="space-y-4 max-h-[400px] overflow-y-auto pr-2 custom-scrollbar">
                    {files.length === 0 ? (
                      <p className="text-gray-500 italic">No files shared yet.</p>
                    ) : (
                      files.map(file => (
                        <div key={file.id} className="flex items-center justify-between p-4 bg-white/5 rounded-xl border border-white/5 hover:border-gold/30 transition-colors">
                          <div className="flex items-center gap-3">
                             <FileText className="w-8 h-8 text-gold/60 p-1.5 bg-gold/10 rounded-lg" />
                             <div className="text-left">
                               <p className="font-medium text-white text-sm line-clamp-1">{file.fileName}</p>
                               <p className="text-xs text-gray-500">{file.createdAt ? format(file.createdAt.toDate(), 'PP') : 'Today'}</p>
                             </div>
                          </div>
                          <a href={file.fileUrl} target="_blank" rel="noopener noreferrer" className="p-2 text-gray-400 hover:text-white bg-white/5 hover:bg-gold rounded-full transition-colors flex items-center justify-center">
                            <Download className="w-4 h-4" />
                          </a>
                        </div>
                      ))
                    )}
                  </div>
                </div>
              )}

            </div>
          </>
        ) : !projectLoading ? (
          <div className="bg-[#0A0A0A] border border-white/10 rounded-3xl p-12 text-center mb-8 animate-fadeIn">
            <h2 className="text-2xl font-serif text-white mb-4">No active projects</h2>
            <p className="text-gray-400 max-w-md mx-auto">We are currently setting up your workspace. Your project timeline and details will appear here soon.</p>
          </div>
        ) : (
          <div className="bg-[#0A0A0A] border border-white/10 rounded-3xl p-8 animate-pulse mb-8">
            <div className="h-4 w-32 bg-white/5 rounded mb-4"></div>
            <div className="h-8 w-60 bg-white/5 rounded mb-4"></div>
            <div className="h-4 w-40 bg-white/5 rounded"></div>
          </div>
        )}

        {/* LAZY LOAD SECTIONS BELOW THE FOLD (Req 12) */}
        <div ref={schedulerRef} className="space-y-8 animate-fadeIn">
          {schedulerVisible ? (
            <>
              {/* My Bookings Widget */}
              {bookingsLoading && bookings.length === 0 ? (
                <div id="my-bookings-section" className="bg-[#0A0A0A] border border-white/10 rounded-3xl p-8 mb-8 animate-pulse">
                  <div className="h-6 w-40 bg-white/5 rounded mb-6"></div>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    <div className="h-24 bg-white/5 rounded-2xl w-full animate-pulse"></div>
                    <div className="h-24 bg-white/5 rounded-2xl w-full animate-pulse"></div>
                  </div>
                </div>
              ) : (
                renderMyBookings()
              )}

              {/* Schedule Meeting Widget */}
              <div className="bg-[#0A0A0A] border border-white/10 rounded-3xl p-8">
                <div className="flex items-center gap-3 mb-6 border-b border-white/10 pb-4">
                  <Calendar className="w-5 h-5 text-gold" />
                  <h3 className="font-serif text-2xl font-bold text-white">Schedule a Meeting</h3>
                </div>
                {renderMeetingForm()}
              </div>
            </>
          ) : (
            <div className="h-48 bg-[#0A0A0A]/20 border border-white/5 rounded-3xl flex items-center justify-center text-sm text-gray-500 italic">
              Loading schedules below the fold...
            </div>
          )}
        </div>
      </div>

      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-8 right-8 z-[100] bg-[#0A0A0A] border-2 border-gold/60 text-white font-semibold text-sm px-6 py-4 rounded-2xl shadow-[0_0_25px_rgba(212,175,55,0.3)] animate-fadeIn flex items-center gap-3">
          <CheckCircle2 className="w-5 h-5 text-gold animate-bounce" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Success Modal */}
      {successModalData && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fadeIn">
          <div className="bg-[#0D0D0D] border border-gold/40 rounded-3xl p-8 max-w-md w-full shadow-[0_0_50px_rgba(212,175,55,0.15)] text-center relative overflow-hidden">
            <div className="mx-auto w-16 h-16 rounded-full bg-gold/10 flex items-center justify-center mb-6 border border-gold/30">
              <CheckCircle2 className="w-8 h-8 text-gold" />
            </div>

            <h3 className="font-serif text-3xl font-bold text-white mb-2">Booking Confirmed</h3>
            <p className="text-green-400 text-sm mb-6 font-semibold">Your booking is confirmed. Booking ID: {successModalData.bookingId}</p>

            <div className="bg-white/5 border border-white/10 rounded-2xl p-5 mb-8 text-left space-y-3 font-sans">
              <div className="flex justify-between border-b border-white/5 pb-2.5">
                <span className="text-xs text-gray-400 font-bold uppercase tracking-wider">Booking ID:</span>
                <span className="text-sm font-mono text-gold font-bold">{successModalData.bookingId}</span>
              </div>
              <div className="flex justify-between border-b border-white/5 pb-2.5">
                <span className="text-xs text-gray-400 font-bold uppercase tracking-wider">Date:</span>
                <span className="text-sm text-white font-medium">{successModalData.date}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-xs text-gray-400 font-bold uppercase tracking-wider">Time:</span>
                <span className="text-sm text-white font-medium">{successModalData.time}</span>
              </div>
            </div>

            <div className="flex flex-col gap-3">
              <button 
                onClick={() => {
                  setSuccessModalData(null);
                  const target = document.getElementById('my-bookings-section');
                  if (target) {
                    target.scrollIntoView({ behavior: 'smooth' });
                  }
                }}
                className="w-full py-3.5 rounded-xl bg-gradient-to-r from-[#D4AF37] to-[#B8860B] text-rich-black font-extrabold tracking-widest text-xs uppercase shadow-[0_4px_15px_rgba(212,175,55,0.3)] transition-all hover:scale-[1.01] cursor-pointer"
              >
                View My Bookings
              </button>
              <button 
                onClick={() => setSuccessModalData(null)}
                className="w-full py-3.5 rounded-xl border border-white/10 text-gray-400 font-bold tracking-widest text-xs uppercase hover:text-white hover:bg-white/5 transition-all cursor-pointer"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
