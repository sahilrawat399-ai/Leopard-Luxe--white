import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Users, CheckSquare, Plus, Clock, Award, ShieldAlert, 
  Trash2, Bell, CheckCircle2, UserCheck, Eye, Sparkles, Filter 
} from 'lucide-react';

interface TasksAndTeamTabProps {
  isDarkMode: boolean;
}

export function TasksAndTeamTab({ isDarkMode }: TasksAndTeamTabProps) {
  // Mock premium Team directory
  const [team, setTeam] = useState([
    { id: 't1', name: 'Sahil Rawat', role: 'Super Admin', email: 'sahilrawat399@gmail.com', performance: '100% Score', attendance: '98%', status: 'Present' },
    { id: 't2', name: 'Marcus Sterling', role: 'Project Manager', email: 'marcus@leopardluxe.com', performance: '92% Score', attendance: '95%', status: 'Present' },
    { id: 't3', name: 'Elena Rostova', role: 'Marketing Manager', email: 'elena@leopardluxe.com', performance: '96% Score', attendance: '92%', status: 'On Leave' },
    { id: 't4', name: 'Christian Dior', role: 'Sales Specialist', email: 'christian@leopardluxe.com', performance: '89% Score', attendance: '90%', status: 'Present' },
  ]);

  // Tasks dataset
  const [tasks, setTasks] = useState([
    { id: 1, name: 'Audit Meta Ad Accounts for High-ROI Campaign', who: 'Elena Rostova', priority: 'Urgent', due: 'June 20, 2026', status: 'In Progress' },
    { id: 2, name: 'Construct SEO Architecture Wireframe for Onyx Resorts', who: 'Marcus Sterling', priority: 'High', due: 'June 22, 2026', status: 'To Do' },
    { id: 3, name: 'Configure Automated Client Pipeline Hook (CRM Hub)', who: 'Christian Dior', priority: 'Medium', due: 'June 25, 2026', status: 'Review' },
    { id: 4, name: 'Rebrand Luxury Typography Tokens (Space Grotesk)', who: 'Sahil Rawat', priority: 'Urgent', due: 'June 18, 2026', status: 'Done' }
  ]);

  const [newTaskName, setNewTaskName] = useState('');
  const [newTaskWho, setNewTaskWho] = useState('Sahil Rawat');
  const [newTaskPriority, setNewTaskPriority] = useState('High');
  const [newTaskDue, setNewTaskDue] = useState('June 25, 2026');

  const [showAddTask, setShowAddTask] = useState(false);
  const [taskFilter, setTaskFilter] = useState('All');

  const handleCreateTask = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTaskName) return;
    setTasks(prev => [
      ...prev,
      {
        id: Date.now(),
        name: newTaskName,
        who: newTaskWho,
        priority: newTaskPriority,
        due: newTaskDue,
        status: 'To Do'
      }
    ]);
    setShowAddTask(false);
    setNewTaskName('');
  };

  const updateTaskStatus = (id: number, nextStatus: string) => {
    setTasks(prev => prev.map(t => t.id === id ? { ...t, status: nextStatus } : t));
  };

  const deleteTask = (id: number) => {
    setTasks(prev => prev.filter(t => t.id !== id));
  };

  const filteredTasks = tasks.filter(t => taskFilter === 'All' ? true : t.status === taskFilter);

  const taskStatuses = ['To Do', 'In Progress', 'Review', 'Done'];

  return (
    <div className="space-y-6 text-left animate-fade-in">
      
      {/* HEADER STATEMENT */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="font-serif text-3xl font-bold tracking-tight" style={{ color: isDarkMode ? '#FFFFFF' : '#0A0A0A' }}>
            Operations & Team Center
          </h2>
          <p className="text-sm mt-1" style={{ color: isDarkMode ? '#999999' : '#666666' }}>
            Appoint core business parameters, track task priorities, view scorecards, and audit daily attendance logs.
          </p>
        </div>
        <button 
          onClick={() => setShowAddTask(true)}
          className="flex items-center gap-1.5 px-4 py-2 bg-gold text-[#0A0A0A] rounded-xl hover:bg-gold/90 text-xs uppercase tracking-wider font-extrabold transition-all cursor-pointer shadow-[0_4px_12px_rgba(212,175,55,0.2)] font-serif"
        >
          <CheckSquare className="w-4 h-4" />
          Assign Priority Task
        </button>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">

        {/* TEAM ATTENDANCE & DIRECTORY */}
        <div className="xl:col-span-1 space-y-6">
          <div 
            className="p-6 rounded-3xl border text-left"
            style={{ 
              backgroundColor: isDarkMode ? '#0F0F0F' : '#FFFFFF', 
              borderColor: isDarkMode ? '#222222' : '#EAEAEA' 
            }}
          >
            <div className="flex justify-between items-center mb-6">
              <div>
                <h3 className="font-serif text-lg font-bold" style={{ color: isDarkMode ? '#FFFFFF' : '#0A0A0A' }}>
                  Specialist Directory
                </h3>
                <p className="text-xs text-gray-500">Live check-in pulses & scores.</p>
              </div>
              <Users className="w-5 h-5 text-gold" />
            </div>

            <div className="space-y-4">
              {team.map(member => (
                <div key={member.id} className="p-3 bg-light-gray/5 border rounded-2xl flex items-center justify-between" style={{ borderColor: isDarkMode ? '#222222' : '#F4F4F4' }}>
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-full bg-gold/10 text-gold flex items-center justify-center font-serif font-bold text-sm">
                      {member.name[0]}
                    </div>
                    <div>
                      <h4 className="text-xs font-bold text-white block truncate w-28" style={{ color: isDarkMode ? '#FFFFFF' : '#0A0A0A' }}>
                        {member.name}
                      </h4>
                      <span className="text-[10px] text-gray-500 block">{member.role}</span>
                    </div>
                  </div>

                  <div className="text-right text-[10px]">
                    <span className="text-gold font-bold block">{member.performance}</span>
                    <span className={`font-medium block mt-0.5 uppercase tracking-wide text-[9px] ${
                      member.status === 'Present' ? 'text-green-500' : 'text-red-400'
                    }`}>{member.status}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* TASK MANAGEMENT BOARD */}
        <div className="xl:col-span-2 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-serif text-xl font-bold" style={{ color: isDarkMode ? '#FFFFFF' : '#0A0A0A' }}>
              Strategic Priorities Board ({tasks.length})
            </h3>
            {/* Task Filters */}
            <div className="flex gap-1.5 p-0.5 rounded-lg bg-light-gray/5 border" style={{ borderColor: isDarkMode ? '#222222' : '#EAEAEA' }}>
              {['All', 'To Do', 'In Progress', 'Done'].map(tab => (
                <button
                  key={tab}
                  onClick={() => setTaskFilter(tab)}
                  className={`px-2.5 py-1 text-[10px] uppercase font-bold rounded transition-all ${
                    taskFilter === tab 
                      ? 'bg-gold text-[#0A0A0A]' 
                      : 'text-gray-400 hover:text-white'
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-4 max-h-[600px] overflow-y-auto pr-1">
            {filteredTasks.map(task => (
              <div 
                key={task.id}
                className="p-5 rounded-2xl border flex flex-col sm:flex-row sm:items-center justify-between gap-4"
                style={{
                  backgroundColor: isDarkMode ? '#0F0F0F' : '#FFFFFF',
                  borderColor: isDarkMode ? '#222222' : '#EAEAEA'
                }}
              >
                <div className="space-y-2">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className={`text-[9px] font-mono font-bold uppercase tracking-wider px-2 py-0.5 rounded border ${
                      task.priority === 'Urgent' 
                        ? 'bg-red-500/10 text-red-400 border-red-500/20' 
                        : 'bg-gold/10 text-gold border-gold/20'
                    }`}>
                      {task.priority} Priority
                    </span>
                    <span className="text-[10px] text-gray-500 font-mono flex items-center gap-1">
                      <Clock className="w-3 h-3 text-gold" />
                      Due {task.due}
                    </span>
                  </div>
                  <h4 className="font-bold text-sm" style={{ color: isDarkMode ? '#FFFFFF' : '#0A0A0A' }}>
                    {task.name}
                  </h4>
                  <span className="text-[10px] text-gray-500 block">Owner/Assignee: <strong style={{ color: isDarkMode ? '#EBEBEB' : '#666666' }}>{task.who}</strong></span>
                </div>

                <div className="flex items-center gap-3.5 self-start sm:self-center shrink-0">
                  <select
                    value={task.status}
                    onChange={(e) => updateTaskStatus(task.id, e.target.value)}
                    className="bg-black/30 border border-white/10 text-xs rounded-lg px-2.5 py-1.5 focus:outline-none text-gray-300"
                  >
                    {taskStatuses.map(status => (
                      <option key={status} value={status}>{status}</option>
                    ))}
                  </select>

                  <button 
                    onClick={() => deleteTask(task.id)}
                    className="p-1 px-2 rounded-lg border border-red-500/20 text-red-400 hover:bg-red-500/10 transition-colors cursor-pointer"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>

      {/* NEW TASK ASSIGNMENT MODAL */}
      {showAddTask && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="w-full max-w-md p-6 rounded-3xl border"
            style={{ backgroundColor: isDarkMode ? '#0F0F0F' : '#FFFFFF', borderColor: isDarkMode ? '#222222' : '#EAEAEA' }}
          >
            <div className="flex justify-between items-center border-b pb-4 mb-4" style={{ borderColor: isDarkMode ? '#222222' : '#EAEAEA' }}>
              <h3 className="font-serif text-xl font-bold" style={{ color: isDarkMode ? '#FFFFFF' : '#0A0A0A' }}>Log Priority Task</h3>
              <button onClick={() => setShowAddTask(false)} className="p-1 rounded-full text-gray-500 hover:text-white">
                <Trash2 className="w-5 h-5 text-gray-500" />
              </button>
            </div>

            <form onSubmit={handleCreateTask} className="space-y-4 text-xs">
              <div>
                <label className="block text-gray-400 font-bold uppercase tracking-wider mb-1">Task Specification</label>
                <input
                  type="text"
                  required
                  value={newTaskName}
                  onChange={(e) => setNewTaskName(e.target.value)}
                  placeholder="E.g., Design pixel-perfect Stripe billing hooks..."
                  className="w-full bg-black/10 border p-3 rounded-xl focus:border-gold focus:outline-none"
                  style={{ borderColor: isDarkMode ? '#222222' : '#EAEAEA', color: isDarkMode ? '#FFFFFF' : '#0A0A0A' }}
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-gray-400 font-bold uppercase tracking-wider mb-1">Appointed Team Member</label>
                  <select
                    value={newTaskWho}
                    onChange={(e) => setNewTaskWho(e.target.value)}
                    className="w-full bg-black/20 border p-3 rounded-xl focus:border-gold focus:outline-none"
                    style={{ borderColor: isDarkMode ? '#222222' : '#EAEAEA', color: isDarkMode ? '#EBEBEB' : '#0A0A0A' }}
                  >
                    {team.map(t => (
                      <option key={t.id} value={t.name}>{t.name}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-gray-400 font-bold uppercase tracking-wider mb-1">Contract Weight</label>
                  <select
                    value={newTaskPriority}
                    onChange={(e) => setNewTaskPriority(e.target.value)}
                    className="w-full bg-black/20 border p-3 rounded-xl focus:border-gold focus:outline-none"
                    style={{ borderColor: isDarkMode ? '#222222' : '#EAEAEA', color: isDarkMode ? '#EBEBEB' : '#0A0A0A' }}
                  >
                    <option value="Urgent">Urgent priority</option>
                    <option value="High">High weight</option>
                    <option value="Medium">Medium weight</option>
                    <option value="Low">Low weight</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-gray-400 font-bold uppercase tracking-wider mb-1">Target date Limit</label>
                <input
                  type="text"
                  required
                  value={newTaskDue}
                  onChange={(e) => setNewTaskDue(e.target.value)}
                  placeholder="E.g., June 24, 2026"
                  className="w-full bg-black/10 border p-3 rounded-xl focus:border-gold focus:outline-none"
                  style={{ borderColor: isDarkMode ? '#222222' : '#EAEAEA', color: isDarkMode ? '#FFFFFF' : '#0A0A0A' }}
                />
              </div>

              <button 
                type="submit" 
                className="w-full py-3 bg-gold font-extrabold uppercase tracking-widest text-[#0A0A0A] hover:bg-gold/90 transition-all rounded-xl select-none cursor-pointer"
              >
                Log Operational task
              </button>
            </form>
          </motion.div>
        </div>
      )}
    </div>
  );
}
