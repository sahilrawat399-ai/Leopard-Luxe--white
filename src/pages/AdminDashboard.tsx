import React, { useState, useEffect } from 'react';
import { useAuthStore } from '../stores/authStore';
import { db } from '../lib/firebase';
import { collection, query, onSnapshot, getDocs, orderBy, updateDoc, doc, addDoc, where, serverTimestamp } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { handleFirestoreError, OperationType } from '../lib/firestore-errors';
import { format } from 'date-fns';
import { Users, Calendar, FolderKanban, LogOut, Upload, FileText, Download, UserPlus } from 'lucide-react';
import { auth, storage } from '../lib/firebase';
import { useNavigate } from 'react-router-dom';

const PROJECT_STAGES = [
  "Onboarding", "Discovery & Research", "Strategy Planning", "Project Started", 
  "Phase 1 Development", "Phase 2 Development", "Phase 3 Optimization", 
  "Client Review", "Final Revisions", "Project Completed"
];

const LEAD_STAGES = [
  "New Lead", "Contacted", "Qualified", "Proposal Sent", "Closed Won", "Closed Lost"
];

function AdminLeads() {
  const [leads, setLeads] = useState<any[]>([]);

  useEffect(() => {
    const q = query(collection(db, 'leads'), orderBy('createdAt', 'desc'));
    const unsubscribe = onSnapshot(q, snapshot => {
      setLeads(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    }, error => handleFirestoreError(error, OperationType.GET, 'leads'));
    return () => unsubscribe();
  }, []);

  const updateLeadStatus = async (leadId: string, newStatus: string) => {
    try {
      await updateDoc(doc(db, 'leads', leadId), {
        status: newStatus,
        updatedAt: serverTimestamp()
      });
    } catch(err) {
      handleFirestoreError(err, OperationType.UPDATE, `leads/${leadId}`);
    }
  }
  
  const handleContact = (email: string) => {
    window.location.href = `mailto:${email}`;
  }

  return (
    <div className="space-y-4">
      {leads.map((lead) => (
        <div key={lead.id} className="bg-white/5 border border-white/10 rounded-xl p-6 relative overflow-hidden">
           {lead.status === 'New Lead' && <div className="absolute top-0 right-0 bg-gold text-rich-black text-xs font-bold px-3 py-1 rounded-bl-xl">NEW</div>}
           <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
             <div>
               <h4 className="font-serif text-xl font-bold text-white">{lead.fullName}</h4>
               <p className="text-gray-400 text-sm mb-4">{lead.businessName} • {lead.industry}</p>
               <div className="space-y-1 mb-4">
                  <p className="text-xs text-gray-400"><span className="text-gray-500 w-16 inline-block">Email:</span> <span className="text-white">{lead.email}</span></p>
                  <p className="text-xs text-gray-400"><span className="text-gray-500 w-16 inline-block">Phone:</span> <span className="text-white">{lead.phoneNumber}</span></p>
                  <p className="text-xs text-gray-400"><span className="text-gray-500 w-16 inline-block">Location:</span> <span className="text-white">{lead.city}, {lead.country}</span></p>
               </div>
               <div className="flex gap-2">
                 <button onClick={() => handleContact(lead.email)} className="px-4 py-2 bg-white/10 hover:bg-gold hover:text-rich-black text-white text-xs font-bold rounded-lg transition-colors">
                   Email Lead
                 </button>
               </div>
             </div>
             
             <div>
               <div className="bg-rich-black p-4 rounded-xl border border-white/5 mb-4">
                 <div className="grid grid-cols-2 gap-4 mb-2">
                   <div>
                     <span className="text-[10px] uppercase tracking-widest text-gray-500 font-bold block mb-1">Stage</span>
                     <span className="text-sm text-white">{lead.businessStage || 'N/A'}</span>
                   </div>
                   <div>
                     <span className="text-[10px] uppercase tracking-widest text-gray-500 font-bold block mb-1">Revenue</span>
                     <span className="text-sm text-white">{lead.monthlyRevenue || 'N/A'}</span>
                   </div>
                   <div>
                     <span className="text-[10px] uppercase tracking-widest text-gray-500 font-bold block mb-1">Budget</span>
                     <span className="text-sm text-white">{lead.marketingBudget || 'N/A'}</span>
                   </div>
                   <div>
                     <span className="text-[10px] uppercase tracking-widest text-gray-500 font-bold block mb-1">Pref. Date</span>
                     <span className="text-sm text-white">{lead.preferredDate ? `${lead.preferredDate} ${lead.preferredTime}` : 'N/A'}</span>
                   </div>
                 </div>
                 
                 <div className="mt-4">
                   <span className="text-[10px] uppercase tracking-widest text-gray-500 font-bold block mb-2">Goals</span>
                   <div className="flex flex-wrap gap-2">
                     {(lead.primaryGoals || []).map((goal: string) => (
                       <span key={goal} className="text-[10px] px-2 py-1 bg-gold/10 text-gold rounded border border-gold/20">{goal}</span>
                     ))}
                   </div>
                 </div>
               </div>
               
               {lead.projectDescription && (
                 <div className="mb-4">
                   <p className="text-xs text-gray-400 italic border-l-2 border-gold/30 pl-3">"{lead.projectDescription}"</p>
                 </div>
               )}

               <div className="flex items-center gap-3">
                  <label className="text-xs text-gray-500 font-bold uppercase tracking-widest shrink-0">Status</label>
                  <select 
                    value={lead.status}
                    onChange={(e) => updateLeadStatus(lead.id, e.target.value)}
                    className={`flex-1 bg-rich-black border text-sm rounded-lg px-3 py-2 focus:outline-none ${lead.status === 'New Lead' ? 'border-blue-500 text-blue-500' : lead.status === 'Closed Won' ? 'border-green-500 text-green-500' : lead.status === 'Closed Lost' ? 'border-red-500 text-red-500' : 'border-yellow-500 text-yellow-500'}`}
                  >
                    {LEAD_STAGES.map(stage => <option key={stage} value={stage}>{stage}</option>)}
                  </select>
               </div>
             </div>
           </div>
        </div>
      ))}
      {leads.length === 0 && <p className="text-gray-500 p-6 text-center bg-white/5 rounded-xl border border-white/10">No leads found.</p>}
    </div>
  );
}

function AdminProjects({ users }: { users: any[] }) {
  const [projects, setProjects] = useState<any[]>([]);
  const { user } = useAuthStore();
  const [newUpdate, setNewUpdate] = useState<{ [projectId: string]: string }>({});
  const [files, setFiles] = useState<{ [projectId: string]: any[] }>({});
  const [uploadingFile, setUploadingFile] = useState<{ [projectId: string]: boolean }>({});

  useEffect(() => {
    const q = query(collection(db, 'projects'), orderBy('createdAt', 'desc'));
    const unsubscribe = onSnapshot(q, snapshot => {
      setProjects(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    }, error => handleFirestoreError(error, OperationType.GET, 'projects'));

    const uploadQuery = query(collection(db, 'files'), orderBy('createdAt', 'desc'));
    const unsubscribeFiles = onSnapshot(uploadQuery, snapshot => {
       const newFiles: { [projectId: string]: any[] } = {};
       snapshot.docs.forEach(doc => {
          const data = doc.data();
          if(!newFiles[data.projectId]) newFiles[data.projectId] = [];
          newFiles[data.projectId].push({ id: doc.id, ...data });
       });
       setFiles(newFiles);
    }, error => handleFirestoreError(error, OperationType.GET, 'files'));

    return () => { unsubscribe(); unsubscribeFiles(); };
  }, []);

  const handleAdminFileUpload = async (projectId: string, clientId: string, e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (!file || !user) return;
      
      setUploadingFile(prev => ({ ...prev, [projectId]: true }));
      try {
        const storageRef = ref(storage, `projects/${projectId}/${Date.now()}_${file.name}`);
        const snapshot = await uploadBytes(storageRef, file);
        const url = await getDownloadURL(snapshot.ref);
        
        await addDoc(collection(db, 'files'), {
          projectId,
          clientId,
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
        setUploadingFile(prev => ({ ...prev, [projectId]: false }));
        if(e.target) e.target.value = '';
      }
  };

  const updateProjectStatus = async (projectId: string, newStatus: string, clientId: string) => {
    const pCompleted = Math.round((PROJECT_STAGES.indexOf(newStatus) / (PROJECT_STAGES.length - 1)) * 100);
    try {
      await updateDoc(doc(db, 'projects', projectId), {
        status: newStatus,
        percentageCompleted: pCompleted,
        updatedAt: serverTimestamp()
      });
    } catch(err: any) {
        handleFirestoreError(err, OperationType.UPDATE, `projects/${projectId}`);
    }
  };

  const postUpdate = async (projectId: string, clientId: string) => {
    if (!newUpdate[projectId]) return;
    try {
      await addDoc(collection(db, 'projectUpdates'), {
        projectId,
        clientId,
        description: newUpdate[projectId],
        uploadedBy: 'Admin',
        createdAt: serverTimestamp()
      });
      setNewUpdate(prev => ({ ...prev, [projectId]: '' }));
    } catch(err: any) {
       handleFirestoreError(err, OperationType.CREATE, 'projectUpdates');
    }
  };

  const createProjectForUser = async (clientId: string) => {
    try {
      await addDoc(collection(db, 'projects'), {
        clientId,
        status: 'Onboarding',
        percentageCompleted: 0,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp()
      });
    } catch(err: any) {
       handleFirestoreError(err, OperationType.CREATE, 'projects');
    }
  };

  return (
    <div className="space-y-6">
      <div className="border border-white/10 rounded-2xl bg-[#0A0A0A] p-6 mb-8">
        <h3 className="text-white font-bold mb-4 font-serif text-xl">Create Project for User</h3>
        <div className="flex flex-wrap gap-4">
          {users.filter(u => u.role === 'client' && !projects.find(p => p.clientId === u.id)).map(u => (
             <button 
                key={u.id}
                onClick={() => createProjectForUser(u.id)}
                className="px-4 py-2 border border-gold/30 text-gold rounded-lg hover:bg-gold/10 text-sm"
             >
                + Create Project for {u.fullName}
             </button>
          ))}
          {users.filter(u => u.role === 'client' && !projects.find(p => p.clientId === u.id)).length === 0 && (
             <p className="text-gray-500 text-sm">All clients currently have a project.</p>
          )}
        </div>
      </div>

      {projects.map(project => {
        const client = users.find(u => u.id === project.clientId);
        return (
          <div key={project.id} className="bg-white/5 border border-white/10 rounded-2xl p-6">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h4 className="font-bold text-white text-lg">{client?.fullName || 'Unknown Client'}</h4>
                <p className="text-gray-400 text-sm">{client?.businessName}</p>
              </div>
              <div className="text-right">
                <span className="text-gold font-bold">{project.percentageCompleted}%</span>
              </div>
            </div>

            <div className="mb-4">
              <label className="text-xs text-gray-500 uppercase tracking-widest font-bold mb-2 block">Status</label>
              <select 
                value={project.status}
                onChange={(e) => updateProjectStatus(project.id, e.target.value, project.clientId)}
                className="w-full bg-rich-black border border-white/10 text-white rounded-lg px-3 py-2 focus:outline-none focus:border-gold"
              >
                {PROJECT_STAGES.map(stage => (
                  <option key={stage} value={stage}>{stage}</option>
                ))}
              </select>
            </div>

            <div className="border-t border-white/10 pt-4 mt-4">
               <div className="flex items-center justify-between mb-4">
                  <label className="text-xs text-gray-500 uppercase tracking-widest font-bold block">Files</label>
                  <label className="cursor-pointer group flex items-center gap-2 px-3 py-1.5 rounded-lg font-bold tracking-widest text-[10px] uppercase text-rich-black transition-all bg-gold hover:bg-gold/90">
                    {uploadingFile[project.id] ? (
                       <div className="w-3 h-3 border-2 border-rich-black border-t-transparent rounded-full animate-spin"></div>
                    ) : (
                       <Upload className="w-3 h-3" />
                    )}
                    <span>Upload</span>
                    <input type="file" className="hidden" onChange={(e) => handleAdminFileUpload(project.id, project.clientId, e)} disabled={uploadingFile[project.id]} />
                  </label>
               </div>
               
               <div className="space-y-2 max-h-40 overflow-y-auto pr-2 custom-scrollbar">
                  {(files[project.id] || []).length === 0 ? (
                    <p className="text-gray-500 italic text-sm">No files uploaded.</p>
                  ) : (
                    (files[project.id] || []).map(file => (
                       <div key={file.id} className="flex items-center justify-between bg-rich-black p-2 rounded-lg border border-white/5">
                          <div className="flex items-center gap-2 overflow-hidden">
                             <FileText className="w-4 h-4 text-gold shrink-0" />
                             <span className="text-white text-xs truncate">{file.fileName}</span>
                          </div>
                          <a href={file.fileUrl} target="_blank" rel="noopener noreferrer" className="p-1.5 text-gray-400 hover:text-white bg-white/5 hover:bg-gold rounded-full transition-colors shrink-0 ml-2">
                             <Download className="w-3 h-3" />
                          </a>
                       </div>
                    ))
                  )}
               </div>
            </div>
            
            <div className="border-t border-white/10 pt-4 mt-4">
               <label className="text-xs text-gray-500 uppercase tracking-widest font-bold mb-2 block">Post Progress Update</label>
               <div className="flex gap-2">
                 <input 
                   type="text" 
                   value={newUpdate[project.id] || ''}
                   onChange={(e) => setNewUpdate(prev => ({ ...prev, [project.id]: e.target.value }))}
                   placeholder="E.g., Homepage design completed..." 
                   className="flex-1 bg-rich-black border border-white/10 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-gold text-sm"
                 />
                 <button 
                  onClick={() => postUpdate(project.id, project.clientId)}
                  disabled={!newUpdate[project.id]}
                  className="px-4 py-2 bg-gold text-rich-black font-bold rounded-lg text-sm disabled:opacity-50"
                 >Post</button>
               </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

function AdminMeetings({ users }: { users: any[] }) {
  const [meetings, setMeetings] = useState<any[]>([]);

  useEffect(() => {
    const q = query(collection(db, 'meetings'), orderBy('createdAt', 'desc'));
    const unsubscribe = onSnapshot(q, snapshot => {
      setMeetings(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    }, error => handleFirestoreError(error, OperationType.GET, 'meetings'));
    return () => unsubscribe();
  }, []);

  const updateMeetingStatus = async (meetingId: string, newStatus: string) => {
    try {
      await updateDoc(doc(db, 'meetings', meetingId), {
        status: newStatus,
        updatedAt: serverTimestamp()
      });
    } catch(err) {
      handleFirestoreError(err, OperationType.UPDATE, `meetings/${meetingId}`);
    }
  }

  return (
    <div className="space-y-4">
      {meetings.map((meeting) => {
        const client = users.find(u => u.id === meeting.clientId);
        return (
          <div key={meeting.id} className="bg-white/5 border border-white/10 rounded-xl p-5 flex flex-col md:flex-row md:items-center justify-between gap-4">
             <div>
                <p className="font-bold text-white">{client?.fullName || 'Unknown'} - {meeting.serviceType}</p>
                <p className="text-sm text-gray-400">{meeting.date} at {meeting.time}</p>
                {meeting.notes && (
                  <p className="text-sm text-gray-500 mt-2 bg-rich-black p-2 rounded">Note: {meeting.notes}</p>
                )}
             </div>
             <div className="flex items-center gap-3">
                <select 
                  value={meeting.status}
                  onChange={(e) => updateMeetingStatus(meeting.id, e.target.value)}
                  className={`bg-rich-black border text-sm rounded-lg px-3 py-2 focus:outline-none ${meeting.status === 'Pending' ? 'border-yellow-500 text-yellow-500' : meeting.status === 'Approved' ? 'border-green-500 text-green-500' : 'border-red-500 text-red-500'}`}
                >
                  <option value="Pending">Pending</option>
                  <option value="Approved">Approved</option>
                  <option value="Rescheduled">Rescheduled</option>
                  <option value="Cancelled">Cancelled</option>
                </select>
             </div>
          </div>
        );
      })}
    </div>
  );
}

export function AdminDashboard() {
  const { dbUser } = useAuthStore();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<'projects' | 'meetings' | 'clients' | 'leads'>('leads');
  const [users, setUsers] = useState<any[]>([]);

  useEffect(() => {
    if (dbUser?.role !== 'admin') return;
    const unsubscribe = onSnapshot(collection(db, 'users'), snapshot => {
      setUsers(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    }, error => handleFirestoreError(error, OperationType.GET, 'users'));
    return () => unsubscribe();
  }, [dbUser]);

  const handleLogout = async () => {
    await auth.signOut();
    navigate('/login');
  }

  return (
    <main className="bg-rich-black min-h-screen pt-32 pb-20 px-6 lg:px-12">
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-8">
        {/* SIDEBAR */}
        <div className="w-full lg:w-64 shrink-0">
          <div className="bg-[#0A0A0A] border border-white/10 rounded-3xl p-6 sticky top-32">
            <h2 className="font-serif text-2xl font-bold text-white mb-6">Admin Panel</h2>
            
            <nav className="space-y-2 mb-8">
               <button onClick={() => setActiveTab('leads')} className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-colors font-medium ${activeTab === 'leads' ? 'bg-gold/10 text-gold border border-gold/30' : 'text-gray-400 hover:text-white hover:bg-white/5'}`}>
                 <UserPlus className="w-5 h-5" /> Leads
               </button>
               <button onClick={() => setActiveTab('projects')} className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-colors font-medium ${activeTab === 'projects' ? 'bg-gold/10 text-gold border border-gold/30' : 'text-gray-400 hover:text-white hover:bg-white/5'}`}>
                 <FolderKanban className="w-5 h-5" /> Projects
               </button>
               <button onClick={() => setActiveTab('meetings')} className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-colors font-medium ${activeTab === 'meetings' ? 'bg-gold/10 text-gold border border-gold/30' : 'text-gray-400 hover:text-white hover:bg-white/5'}`}>
                 <Calendar className="w-5 h-5" /> Meetings
               </button>
               <button onClick={() => setActiveTab('clients')} className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-colors font-medium ${activeTab === 'clients' ? 'bg-gold/10 text-gold border border-gold/30' : 'text-gray-400 hover:text-white hover:bg-white/5'}`}>
                 <Users className="w-5 h-5" /> Clients
               </button>
            </nav>

            <button onClick={handleLogout} className="w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-colors font-medium text-red-500 hover:bg-red-500/10">
               <LogOut className="w-5 h-5" /> Sign Out
            </button>
          </div>
        </div>

        {/* CONTENT */}
        <div className="flex-1">
           {activeTab === 'leads' && (
             <div>
               <h2 className="font-serif text-3xl font-bold text-white mb-6 border-b border-white/10 pb-4">Manage Leads</h2>
               <AdminLeads />
             </div>
           )}

           {activeTab === 'projects' && (
             <div>
               <h2 className="font-serif text-3xl font-bold text-white mb-6 border-b border-white/10 pb-4">Manage Projects</h2>
               <AdminProjects users={users} />
             </div>
           )}

           {activeTab === 'meetings' && (
             <div>
               <h2 className="font-serif text-3xl font-bold text-white mb-6 border-b border-white/10 pb-4">Manage Meetings</h2>
               <AdminMeetings users={users} />
             </div>
           )}

           {activeTab === 'clients' && (
             <div>
               <h2 className="font-serif text-3xl font-bold text-white mb-6 border-b border-white/10 pb-4">All Clients</h2>
               <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                 {users.filter(u => u.role === 'client').map(user => (
                   <div key={user.id} className="bg-[#0A0A0A] border border-white/10 rounded-2xl p-6">
                     <p className="font-bold text-white text-lg">{user.fullName}</p>
                     <p className="text-gray-400 text-sm mb-2">{user.businessName}</p>
                     <p className="text-xs text-gray-500">{user.email}</p>
                     <p className="text-xs text-gray-500">{user.phoneNumber || 'No phone'}</p>
                   </div>
                 ))}
               </div>
             </div>
           )}
        </div>
      </div>
    </main>
  );
}
