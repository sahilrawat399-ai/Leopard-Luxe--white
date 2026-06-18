import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { db } from '../../lib/firebase';
import { 
  collection, query, onSnapshot, updateDoc, doc, deleteDoc, 
  serverTimestamp, addDoc, orderBy 
} from 'firebase/firestore';
import { handleFirestoreError, OperationType } from '../../lib/firestore-errors';
import { 
  Search, Filter, Edit, Archive, UserCheck, CheckCircle2, 
  Download, Calendar, Plus, Mail, Phone, Building, MessageSquare, 
  FileText, Trash2, X, Check 
} from 'lucide-react';

interface LeadsAndFormsTabProps {
  isDarkMode: boolean;
}

export function LeadsAndFormsTab({ isDarkMode }: LeadsAndFormsTabProps) {
  const [leads, setLeads] = useState<any[]>([]);
  const [search, setSearch] = useState('');
  const [stageFilter, setStageFilter] = useState('All');
  const [selectedLead, setSelectedLead] = useState<any | null>(null);
  const [editingNotes, setEditingNotes] = useState('');
  const [assignedMember, setAssignedMember] = useState('');
  const [showAddModal, setShowAddModal] = useState(false);

  // New Lead Inputs
  const [newLeadName, setNewLeadName] = useState('');
  const [newLeadEmail, setNewLeadEmail] = useState('');
  const [newLeadPhone, setNewLeadPhone] = useState('');
  const [newLeadBusiness, setNewLeadBusiness] = useState('');
  const [newLeadService, setNewLeadService] = useState('Website Development');
  const [newLeadDesc, setNewLeadDesc] = useState('');

  // Fetch real leads synchronously
  useEffect(() => {
    const q = query(collection(db, 'leads'), orderBy('createdAt', 'desc'));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const records = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setLeads(records);
    }, (error) => {
      handleFirestoreError(error, OperationType.GET, 'leads');
    });
    return () => unsubscribe();
  }, []);

  const updateLeadDoc = async (leadId: string, fields: any) => {
    try {
      await updateDoc(doc(db, 'leads', leadId), {
        ...fields,
        updatedAt: serverTimestamp()
      });
    } catch(err) {
      handleFirestoreError(err, OperationType.UPDATE, `leads/${leadId}`);
    }
  };

  const deleteLeadDoc = async (leadId: string) => {
    if (!window.confirm("Are you sure you want to permanently delete this lead?")) return;
    try {
      await deleteDoc(doc(db, 'leads', leadId));
      if (selectedLead?.id === leadId) setSelectedLead(null);
    } catch(err) {
      handleFirestoreError(err, OperationType.DELETE, `leads/${leadId}`);
    }
  };

  const handleCreateLead = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newLeadName || !newLeadEmail) {
      alert("Name and Email are required.");
      return;
    }
    try {
      await addDoc(collection(db, 'leads'), {
        fullName: newLeadName,
        email: newLeadEmail,
        phoneNumber: newLeadPhone,
        businessName: newLeadBusiness,
        industry: 'Luxury Services',
        businessStage: 'Pre-launch Partner',
        marketingBudget: '$5k - $15K',
        primaryGoals: [newLeadService],
        projectDescription: newLeadDesc,
        status: 'New Lead',
        notes: '',
        assignedTo: '',
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp()
      });
      setShowAddModal(false);
      setNewLeadName('');
      setNewLeadEmail('');
      setNewLeadPhone('');
      setNewLeadBusiness('');
      setNewLeadDesc('');
    } catch(err) {
      handleFirestoreError(err, OperationType.CREATE, 'leads');
    }
  };

  // CSV Exporter
  const exportLeadsToCSV = () => {
    if (leads.length === 0) {
      alert("No leads available to export.");
      return;
    }
    const headers = ['ID', 'Name', 'Email', 'Phone', 'Business', 'Stage', 'Description', 'Notes', 'Assigned To', 'Created Date'];
    const rows = leads.map(lead => {
      const dateStr = lead.createdAt?.toDate ? lead.createdAt.toDate().toLocaleDateString() : '';
      return [
        lead.id,
        `"${(lead.fullName || '').replace(/"/g, '""')}"`,
        lead.email,
        lead.phoneNumber || '',
        `"${(lead.businessName || '').replace(/"/g, '""')}"`,
        lead.status,
        `"${(lead.projectDescription || '').replace(/"/g, '""')}"`,
        `"${(lead.notes || '').replace(/"/g, '""')}"`,
        lead.assignedTo || 'Unassigned',
        dateStr
      ];
    });

    const csvContent = [headers.join(','), ...rows.map(e => e.join(','))].join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.setAttribute("href", url);
    link.setAttribute("download", `Leopard_Luxe_Leads_${Date.now()}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const filtered = leads.filter(lead => {
    const matchesSearch = 
      (lead.fullName || '').toLowerCase().includes(search.toLowerCase()) ||
      (lead.email || '').toLowerCase().includes(search.toLowerCase()) ||
      (lead.businessName || '').toLowerCase().includes(search.toLowerCase());
    
    if (stageFilter === 'All') return matchesSearch;
    return matchesSearch && lead.status === stageFilter;
  });

  const leadStages = [
    'New Lead', 'Contacted', 'Qualified', 'Proposal Sent', 'Closed Won', 'Closed Lost'
  ];

  return (
    <div className="space-y-6 text-left animate-fade-in">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="font-serif text-3xl font-bold tracking-tight" style={{ color: isDarkMode ? '#FFFFFF' : '#0A0A0A' }}>
            Leads & Contact Forms
          </h2>
          <p className="text-sm mt-1" style={{ color: isDarkMode ? '#999999' : '#666666' }}>
            Identify prospects, manage pipeline statuses, and assign team responsibility with structured luxury workflows.
          </p>
        </div>
        <div className="flex flex-wrap gap-2.5">
          <button 
            onClick={exportLeadsToCSV}
            className="flex items-center gap-1.5 px-4 py-2 border rounded-xl hover:bg-gold/5 text-xs text-gold uppercase tracking-wider font-bold transition-all border-gold/30 cursor-pointer"
          >
            <Download className="w-3.5 h-3.5" />
            Export to CSV
          </button>
          <button 
            onClick={() => setShowAddModal(true)}
            className="flex items-center gap-1.5 px-4 py-2 bg-gold text-[#0A0A0A] rounded-xl hover:bg-gold/90 text-xs uppercase tracking-wider font-extrabold transition-all cursor-pointer shadow-[0_4px_12px_rgba(212,175,55,0.2)]"
          >
            <Plus className="w-3.5 h-3.5 stroke-[3px]" />
            Register Lead
          </button>
        </div>
      </div>

      {/* FILTER CONTROLS */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {/* Search */}
        <div className="relative md:col-span-2">
          <Search className="w-4 h-4 text-gray-500 absolute left-3.5 top-3.5" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search prospect name, email, or company..."
            className="w-full pl-10 pr-4 py-2.5 rounded-xl text-sm border focus:outline-none transition-colors"
            style={{ 
              backgroundColor: isDarkMode ? '#0F0F0F' : '#FFFFFF', 
              borderColor: isDarkMode ? '#222222' : '#EAEAEA',
              color: isDarkMode ? '#FFFFFF' : '#0A0A0A' 
            }}
          />
        </div>

        {/* Status Dropdown */}
        <div className="relative">
          <Filter className="w-4 h-4 text-gold absolute left-3.5 top-3.5" />
          <select
            value={stageFilter}
            onChange={(e) => setStageFilter(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 text-sm rounded-xl border focus:outline-none focus:border-gold cursor-pointer"
            style={{ 
              backgroundColor: isDarkMode ? '#0F0F0F' : '#FFFFFF', 
              borderColor: isDarkMode ? '#222222' : '#EAEAEA',
              color: isDarkMode ? '#EBEBEB' : '#0A0A0A' 
            }}
          >
            <option value="All">All Pipeline Stages</option>
            {leadStages.map(stage => (
              <option key={stage} value={stage}>{stage}</option>
            ))}
          </select>
        </div>

        {/* Counter */}
        <div 
          className="p-3 rounded-xl border flex items-center justify-between font-mono text-xs font-bold uppercase tracking-wider"
          style={{ 
            backgroundColor: isDarkMode ? '#0F0F0F' : '#FFFFFF', 
            borderColor: isDarkMode ? '#222222' : '#EAEAEA',
            color: isDarkMode ? '#999999' : '#666666'
          }}
        >
          <span>Matched:</span>
          <span className="text-gold font-bold">{filtered.length} Leads</span>
        </div>
      </div>

      {/* LEADS LIST / GRID */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">

        {/* Main List */}
        <div className="xl:col-span-2 space-y-4 max-h-[600px] overflow-y-auto pr-2 custom-scrollbar">
          {filtered.length === 0 ? (
            <div className="p-12 text-center text-gray-500 italic rounded-2xl border bg-[#FAF9F6]" style={{ backgroundColor: isDarkMode ? '#0F0F0F' : '#FAF9F6', borderColor: isDarkMode ? '#222222' : '#EAEAEA' }}>
              No leads matches the criteria.
            </div>
          ) : (
            filtered.map(lead => {
              const isSelected = selectedLead?.id === lead.id;
              return (
                <div 
                  key={lead.id}
                  onClick={() => {
                    setSelectedLead(lead);
                    setEditingNotes(lead.notes || '');
                    setAssignedMember(lead.assignedTo || '');
                  }}
                  className="p-5 rounded-2xl border transition-all cursor-pointer relative overflow-hidden"
                  style={{
                    backgroundColor: isDarkMode ? '#0F0F0F' : '#FFFFFF',
                    borderColor: isSelected 
                      ? '#D4AF37' 
                      : (isDarkMode ? '#222222' : '#EAEAEA'),
                    boxShadow: isSelected ? '0 8px 24px -6px rgba(212,175,55,0.15)' : 'none'
                  }}
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5">
                    <div>
                      <h4 className="font-serif font-bold text-lg" style={{ color: isDarkMode ? '#FFFFFF' : '#0A0A0A' }}>
                        {lead.fullName}
                      </h4>
                      <div className="flex items-center gap-3.5 mt-1 text-xs text-gray-400">
                        <span className="flex items-center gap-1 font-mono text-gray-500">
                          <Building className="w-3 h-3 text-gold" />
                          {lead.businessName || 'Residential Client'}
                        </span>
                        <span>•</span>
                        <span>{lead.createdAt?.toDate ? lead.createdAt.toDate().toLocaleDateString() : 'New'}</span>
                      </div>
                    </div>
                    {/* Status Badge */}
                    <span 
                      className={`text-[10px] tracking-widest font-bold font-mono px-2.5 py-0.5 rounded-full border shrink-0`}
                      style={{
                        backgroundColor: lead.status === 'Closed Won' ? 'rgba(34,197,94,0.1)' : lead.status === 'Closed Lost' ? 'rgba(239,68,68,0.1)' : 'rgba(212,175,55,0.1)',
                        color: lead.status === 'Closed Won' ? '#22C55E' : lead.status === 'Closed Lost' ? '#EF4444' : '#D4AF37',
                        borderColor: lead.status === 'Closed Won' ? 'rgba(34,197,94,0.2)' : lead.status === 'Closed Lost' ? 'rgba(239,68,68,0.2)' : 'rgba(212,175,55,0.2)'
                      }}
                    >
                      {lead.status}
                    </span>
                  </div>

                  {lead.projectDescription && (
                    <p className="text-xs text-gray-400 line-clamp-2 mt-4 italic pl-3 border-l-2 border-gold/40">
                      "{lead.projectDescription}"
                    </p>
                  )}

                  {/* Actions summary footer */}
                  <div className="flex items-center justify-between border-t mt-4 pt-3 text-xs" style={{ borderColor: isDarkMode ? '#1C1C1D' : '#F5F5F5' }}>
                    <span className="text-gray-500">Assigned: <strong className="text-gray-400">{lead.assignedTo || 'None'}</strong></span>
                    <div className="flex gap-2">
                      <button 
                        onClick={(e) => {
                          e.stopPropagation();
                          deleteLeadDoc(lead.id);
                        }}
                        className="p-1 text-gray-500 hover:text-red-500 hover:bg-red-500/10 rounded transition-colors"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Active Side Card Detail view (Notion/HubSpot split panel) */}
        <div className="xl:col-span-1">
          <AnimatePresence mode="wait">
            {selectedLead ? (
              <motion.div 
                key={selectedLead.id}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                className="p-6 rounded-3xl border sticky top-32 space-y-6"
                style={{
                  backgroundColor: isDarkMode ? '#0F0F0F' : '#FFFFFF',
                  borderColor: isDarkMode ? '#222222' : '#EAEAEA'
                }}
              >
                <div className="flex justify-between items-start border-b pb-4" style={{ borderColor: isDarkMode ? '#222222' : '#EAEAEA' }}>
                  <div>
                    <span className="text-[10px] font-mono text-gold font-bold tracking-widest uppercase">Prospect Dossier</span>
                    <h3 className="font-serif text-xl font-bold mt-0.5" style={{ color: isDarkMode ? '#FFFFFF' : '#0A0A0A' }}>
                      {selectedLead.fullName}
                    </h3>
                  </div>
                  <button 
                    onClick={() => setSelectedLead(null)}
                    className="p-1 rounded-full hover:bg-light-gray/5 text-gray-400"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>

                {/* Primary Fields */}
                <div className="space-y-3.5 text-xs">
                  <div className="flex items-center gap-2.5">
                    <Mail className="w-4 h-4 text-gold" />
                    <span className="text-gray-500 w-16">Email:</span>
                    <a href={`mailto:${selectedLead.email}`} className="text-[#3B82F6] underline truncate flex-1">{selectedLead.email}</a>
                  </div>
                  <div className="flex items-center gap-2.5">
                    <Phone className="w-4 h-4 text-gold" />
                    <span className="text-gray-500 w-16">Phone:</span>
                    <span className="text-gray-400">{selectedLead.phoneNumber || 'Not provided'}</span>
                  </div>
                  <div className="flex items-center gap-2.5">
                    <Building className="w-4 h-4 text-gold" />
                    <span className="text-gray-500 w-16">Business:</span>
                    <span className="text-gray-400 font-bold">{selectedLead.businessName || 'Residential Client'}</span>
                  </div>
                </div>

                {/* Actions status modification */}
                <div className="space-y-2 border-y py-4" style={{ borderColor: isDarkMode ? '#222222' : '#EAEAEA' }}>
                  <label className="text-[10px] font-bold text-gray-500 tracking-wider block uppercase">Action Pipeline Stage</label>
                  <div className="grid grid-cols-2 gap-1.5">
                    {leadStages.map(stage => (
                      <button
                        key={stage}
                        onClick={() => {
                          setSelectedLead(prev => ({ ...prev, status: stage }));
                          updateLeadDoc(selectedLead.id, { status: stage });
                        }}
                        className={`px-2.5 py-1.5 rounded-lg border text-[10px] font-bold uppercase transition-all tracking-wider ${
                          selectedLead.status === stage 
                            ? 'bg-gold border-gold text-[#0A0A0A]' 
                            : 'border-white/5 hover:border-gold/30 text-gray-400 hover:text-white'
                        }`}
                      >
                        {stage}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Team assignments */}
                <div>
                  <label className="text-[10px] font-bold text-gray-500 tracking-wider block uppercase mb-1.5">Assign Specialist</label>
                  <select
                    value={assignedMember}
                    onChange={(e) => {
                      setAssignedMember(e.target.value);
                      updateLeadDoc(selectedLead.id, { assignedTo: e.target.value });
                    }}
                    className="w-full bg-rich-black border text-xs rounded-xl px-3 py-2.5 focus:border-gold focus:outline-none"
                    style={{ borderColor: isDarkMode ? '#222222' : '#EAEAEA' }}
                  >
                    <option value="">Unassigned</option>
                    <option value="Sahil R. (Partner)">Sahil R. (Partner)</option>
                    <option value="Elena G. (Marketing)">Elena G. (Marketing Specialist)</option>
                    <option value="Marcus A. (Senior Developer)">Marcus A. (Lead Engineer)</option>
                  </select>
                </div>

                {/* Notes system */}
                <div>
                  <label className="text-[10px] font-bold text-gray-500 tracking-wider block uppercase mb-1.5">Internal CRM Notes</label>
                  <textarea
                    value={editingNotes}
                    onChange={(e) => setEditingNotes(e.target.value)}
                    onBlur={() => updateLeadDoc(selectedLead.id, { notes: editingNotes })}
                    rows={4}
                    placeholder="Append strategic pointers, budget exceptions, or client intent logs..."
                    className="w-full bg-black/20 text-xs p-3 rounded-xl border focus:border-gold focus:outline-none focus:ring-1 focus:ring-gold"
                    style={{ borderColor: isDarkMode ? '#222222' : '#EAEAEA', color: isDarkMode ? '#FFFFFF' : '#0A0A0A' }}
                  />
                  <span className="text-[9px] text-gray-500 italic block text-right mt-1">Saves instantly on blur ...</span>
                </div>
              </motion.div>
            ) : (
              <div 
                className="p-8 text-center text-gray-500 rounded-3xl border border-dashed flex flex-col justify-center items-center h-80"
                style={{ borderColor: isDarkMode ? '#222222' : '#EAEAEA' }}
              >
                <FileText className="w-8 h-8 text-gold/40 mb-3" />
                <p className="text-xs max-w-[200px] leading-relaxed">
                  Select any prospect block from the list to update progress stages, assign roles, or append private logs.
                </p>
              </div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* NEW PROSPECT MODAL */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="w-full max-w-lg p-6 rounded-3xl border"
            style={{ backgroundColor: isDarkMode ? '#0F0F0F' : '#FFFFFF', borderColor: isDarkMode ? '#222222' : '#EAEAEA' }}
          >
            <div className="flex justify-between items-center border-b pb-4 mb-4" style={{ borderColor: isDarkMode ? '#222222' : '#EAEAEA' }}>
              <h3 className="font-serif text-xl font-bold" style={{ color: isDarkMode ? '#FFFFFF' : '#0A0A0A' }}>Register Luxury Lead</h3>
              <button onClick={() => setShowAddModal(false)} className="p-1 rounded-full text-gray-500 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreateLead} className="space-y-4 text-xs">
              <div>
                <label className="block text-gray-400 font-bold uppercase tracking-wider mb-1">Company Executive Name</label>
                <input
                  type="text"
                  required
                  value={newLeadName}
                  onChange={(e) => setNewLeadName(e.target.value)}
                  placeholder="E.g. Alexander Vance"
                  className="w-full bg-black/10 border p-3 rounded-xl focus:border-gold focus:outline-none"
                  style={{ borderColor: isDarkMode ? '#222222' : '#EAEAEA', color: isDarkMode ? '#FFFFFF' : '#0A0A0A' }}
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-gray-400 font-bold uppercase tracking-wider mb-1">Secure Email</label>
                  <input
                    type="email"
                    required
                    value={newLeadEmail}
                    onChange={(e) => setNewLeadEmail(e.target.value)}
                    placeholder="E.g. vance@estate.com"
                    className="w-full bg-black/10 border p-3 rounded-xl focus:border-gold focus:outline-none"
                    style={{ borderColor: isDarkMode ? '#222222' : '#EAEAEA', color: isDarkMode ? '#FFFFFF' : '#0A0A0A' }}
                  />
                </div>
                <div>
                  <label className="block text-gray-400 font-bold uppercase tracking-wider mb-1">Direct Phone</label>
                  <input
                    type="text"
                    value={newLeadPhone}
                    onChange={(e) => setNewLeadPhone(e.target.value)}
                    placeholder="E.g. +1 310-888-9999"
                    className="w-full bg-black/10 border p-3 rounded-xl focus:border-gold focus:outline-none"
                    style={{ borderColor: isDarkMode ? '#222222' : '#EAEAEA', color: isDarkMode ? '#FFFFFF' : '#0A0A0A' }}
                  />
                </div>
              </div>

              <div>
                <label className="block text-gray-400 font-bold uppercase tracking-wider mb-1">Business Name</label>
                <input
                  type="text"
                  value={newLeadBusiness}
                  onChange={(e) => setNewLeadBusiness(e.target.value)}
                  placeholder="E.g. Vance Estates Group"
                  className="w-full bg-black/10 border p-3 rounded-xl focus:border-gold focus:outline-none"
                  style={{ borderColor: isDarkMode ? '#222222' : '#EAEAEA', color: isDarkMode ? '#FFFFFF' : '#0A0A0A' }}
                />
              </div>

              <div>
                <label className="block text-gray-400 font-bold uppercase tracking-wider mb-1">Service Interested In</label>
                <select
                  value={newLeadService}
                  onChange={(e) => setNewLeadService(e.target.value)}
                  className="w-full bg-black/20 border p-3 rounded-xl focus:border-gold focus:outline-none"
                  style={{ borderColor: isDarkMode ? '#222222' : '#EAEAEA', color: isDarkMode ? '#EBEBEB' : '#0A0A0A' }}
                >
                  <option value="Website Development">Website Development</option>
                  <option value="SEO Optimization">SEO & Organic Rank</option>
                  <option value="Meta Advertising">Meta & Instagram Ads</option>
                  <option value="Google & search Ads">Google Ad Strategy</option>
                  <option value="Branding & Copywriting">Branding & Identity</option>
                </select>
              </div>

              <div>
                <label className="block text-gray-400 font-bold uppercase tracking-wider mb-1">Executive Summary Description</label>
                <textarea
                  value={newLeadDesc}
                  onChange={(e) => setNewLeadDesc(e.target.value)}
                  rows={3}
                  placeholder="Summary of project goals, timelines, or bespoke prerequisites..."
                  className="w-full bg-black/10 border p-3 rounded-xl focus:border-gold focus:outline-none"
                  style={{ borderColor: isDarkMode ? '#222222' : '#EAEAEA', color: isDarkMode ? '#FFFFFF' : '#0A0A0A' }}
                />
              </div>

              <button 
                type="submit" 
                className="w-full py-3 bg-gold font-extrabold uppercase tracking-widest text-rich-black hover:bg-gold/90 transition-all rounded-xl select-none"
              >
                Log New Lead
              </button>
            </form>
          </motion.div>
        </div>
      )}
    </div>
  );
}
