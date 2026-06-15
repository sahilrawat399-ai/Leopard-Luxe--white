import React, { useState, useEffect } from 'react';
import { useAuthStore } from '../stores/authStore';
import { auth, db, storage } from '../lib/firebase';
import { collection, query, where, onSnapshot, getDocs, orderBy, addDoc, serverTimestamp } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { handleFirestoreError, OperationType } from '../lib/firestore-errors';
import { format } from 'date-fns';
import { motion } from 'motion/react';
import { CheckCircle2, Clock, Calendar, FileText, Download, MessageSquare, Upload, X } from 'lucide-react';

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
    const [project, setProject] = useState<any>(null);
    const [updates, setUpdates] = useState<any[]>([]);
    const [files, setFiles] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [uploadingFile, setUploadingFile] = useState(false);
  
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

  useEffect(() => {
    if (!user) return;
    
    // Fetch Project
    const projQuery = query(collection(db, 'projects'), where('clientId', '==', user.uid));
    const unsubscribeProj = onSnapshot(projQuery, (snapshot) => {
      if (!snapshot.empty) {
        setProject({ id: snapshot.docs[0].id, ...snapshot.docs[0].data() });
      } else {
        setProject(null);
      }
      setLoading(false);
    }, (error) => handleFirestoreError(error, OperationType.GET, 'projects'));

    return () => unsubscribeProj();
  }, [user]);

  useEffect(() => {
    if (!project) return;

    // Fetch Updates
    const updatesQuery = query(
      collection(db, 'projectUpdates'), 
      where('projectId', '==', project.id),
      orderBy('createdAt', 'desc')
    );
    
    const unsubscribeUpdates = onSnapshot(updatesQuery, (snapshot) => {
      setUpdates(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    }, error => handleFirestoreError(error, OperationType.GET, 'projectUpdates'));

    // Fetch Files
    const filesQuery = query(
      collection(db, 'files'),
      where('projectId', '==', project.id),
      orderBy('createdAt', 'desc')
    );
    const unsubscribeFiles = onSnapshot(filesQuery, (snapshot) => {
      setFiles(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    }, error => handleFirestoreError(error, OperationType.GET, 'files'));

    return () => {
      unsubscribeUpdates();
      unsubscribeFiles();
    };
  }, [project]);

  if (loading) {
    return <div className="min-h-screen bg-rich-black flex items-center justify-center text-white">Loading Dashboard...</div>;
  }

  return (
    <main className="bg-rich-black min-h-screen pt-32 pb-20 px-6 lg:px-12">
      <div className="max-w-7xl mx-auto">
        <div className="mb-12">
          <h1 className="font-serif text-4xl md:text-5xl font-bold text-white mb-2">Welcome back, {dbUser?.fullName?.split(' ')[0]}</h1>
          <p className="text-gray-400 text-lg">{dbUser?.businessName ? `${dbUser.businessName} Dashboard` : 'Client Dashboard'}</p>
        </div>

        {project ? (
          <>
            <ProgressTracker project={project} />

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Updates Section */}
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
                        <p className="text-xs text-gray-500 mb-1">{format(update.createdAt.toDate(), 'PPP p')} • {update.uploadedBy}</p>
                        <p className="text-gray-300">{update.description}</p>
                      </div>
                    ))
                  )}
                </div>
              </div>

              {/* Files Section */}
              <div className="bg-[#0A0A0A] border border-white/10 rounded-3xl p-8">
                <div className="flex items-center justify-between mb-6 border-b border-white/10 pb-4">
                  <div className="flex items-center gap-3">
                     <FileText className="w-5 h-5 text-gold" />
                     <h3 className="font-serif text-2xl font-bold text-white">Shared Files</h3>
                  </div>
                  <div>
                    <label className="cursor-pointer group flex items-center gap-2 px-4 py-2 rounded-lg font-bold tracking-widest text-xs uppercase text-rich-black transition-all duration-300 hover:scale-[1.02] shadow-[0_5px_15px_rgba(212,175,55,0.2)] bg-gradient-to-r from-[#D4AF37] to-[#B8860B]">
                      {uploadingFile ? (
                         <div className="w-4 h-4 border-2 border-rich-black border-t-transparent rounded-full animate-spin"></div>
                      ) : (
                         <Upload className="w-4 h-4" />
                      )}
                      <span>Upload</span>
                      <input type="file" className="hidden" onChange={handleFileUpload} disabled={uploadingFile} />
                    </label>
                  </div>
                </div>
                
                <div className="space-y-4">
                  {files.length === 0 ? (
                    <p className="text-gray-500 italic">No files shared yet.</p>
                  ) : (
                    files.map(file => (
                      <div key={file.id} className="flex items-center justify-between p-4 bg-white/5 rounded-xl border border-white/5 hover:border-gold/30 transition-colors">
                        <div className="flex items-center gap-3">
                           <FileText className="w-8 h-8 text-gold/60 p-1.5 bg-gold/10 rounded-lg" />
                           <div>
                             <p className="font-medium text-white text-sm">{file.fileName}</p>
                             <p className="text-xs text-gray-500">{format(file.createdAt.toDate(), 'PP')}</p>
                           </div>
                        </div>
                        <a href={file.fileUrl} target="_blank" rel="noopener noreferrer" className="p-2 text-gray-400 hover:text-white bg-white/5 hover:bg-gold rounded-full transition-colors">
                          <Download className="w-4 h-4" />
                        </a>
                      </div>
                    ))
                  )}
                </div>
              </div>

              {/* Schedule Meeting Section */}
              <div className="bg-[#0A0A0A] border border-white/10 rounded-3xl p-8 lg:col-span-2">
                <div className="flex items-center gap-3 mb-6 border-b border-white/10 pb-4">
                  <Calendar className="w-5 h-5 text-gold" />
                  <h3 className="font-serif text-2xl font-bold text-white">Schedule a Meeting</h3>
                </div>
                
                <form 
                  onSubmit={async (e) => {
                    e.preventDefault();
                    const form = e.target as HTMLFormElement;
                    const date = (form.elements.namedItem('date') as HTMLInputElement).value;
                    const time = (form.elements.namedItem('time') as HTMLInputElement).value;
                    const serviceType = (form.elements.namedItem('serviceType') as HTMLSelectElement).value;
                    const notes = (form.elements.namedItem('notes') as HTMLTextAreaElement).value;
                    
                    try {
                      await addDoc(collection(db, 'meetings'), {
                        clientId: user.uid,
                        date,
                        time,
                        serviceType,
                        notes,
                        status: 'Pending',
                        createdAt: serverTimestamp(),
                        updatedAt: serverTimestamp()
                      });
                      alert('Meeting request submitted successfully!');
                      form.reset();
                    } catch (err: any) {
                       handleFirestoreError(err, OperationType.CREATE, 'meetings');
                    }
                  }}
                  className="grid grid-cols-1 md:grid-cols-2 gap-6"
                >
                  <div className="space-y-4">
                    <div>
                      <label className="block text-xs font-bold tracking-wider text-gray-400 uppercase mb-2">Select Date</label>
                      <input type="date" name="date" required className="w-full bg-rich-black border border-white/10 rounded-xl py-3 px-4 text-white focus:outline-none focus:border-gold transition-colors" />
                    </div>
                    <div>
                      <label className="block text-xs font-bold tracking-wider text-gray-400 uppercase mb-2">Select Time</label>
                      <input type="time" name="time" required className="w-full bg-rich-black border border-white/10 rounded-xl py-3 px-4 text-white focus:outline-none focus:border-gold transition-colors" />
                    </div>
                    <div>
                      <label className="block text-xs font-bold tracking-wider text-gray-400 uppercase mb-2">Service Type</label>
                      <select name="serviceType" required className="w-full bg-rich-black border border-white/10 rounded-xl py-3 px-4 text-white focus:outline-none focus:border-gold transition-colors">
                        <option value="Website Consultation">Website Consultation</option>
                        <option value="SEO Strategy Call">SEO Strategy Call</option>
                        <option value="Marketing Consultation">Marketing Consultation</option>
                        <option value="Project Review Meeting">Project Review Meeting</option>
                        <option value="Support Meeting">Support Meeting</option>
                      </select>
                    </div>
                  </div>
                  <div className="space-y-4">
                     <div>
                        <label className="block text-xs font-bold tracking-wider text-gray-400 uppercase mb-2">Additional Notes</label>
                        <textarea name="notes" rows={5} className="w-full bg-rich-black border border-white/10 rounded-xl py-3 px-4 text-white focus:outline-none focus:border-gold transition-colors resize-none" placeholder="What would you like to discuss?"></textarea>
                     </div>
                     <button type="submit" className="w-full px-6 py-4 rounded-xl font-bold tracking-widest text-sm uppercase text-rich-black transition-all duration-300 hover:scale-[1.02] shadow-[0_5px_20px_rgba(212,175,55,0.2)] bg-gradient-to-r from-[#D4AF37] to-[#B8860B]">
                        Request Meeting
                     </button>
                  </div>
                </form>
              </div>
            </div>
          </>
        ) : (
          <div className="bg-[#0A0A0A] border border-white/10 rounded-3xl p-12 text-center">
            <h2 className="text-2xl font-serif text-white mb-4">No active projects</h2>
            <p className="text-gray-400 max-w-md mx-auto">We are currently setting up your workspace. Your project timeline and details will appear here soon.</p>
          </div>
        )}
      </div>
    </main>
  );
}
