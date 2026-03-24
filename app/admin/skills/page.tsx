'use client';
import { useState, useEffect } from 'react';
import { FiPlus, FiEdit2, FiTrash2, FiX } from 'react-icons/fi';

interface Skill {
  _id: string;
  name: string;
  category: string;
  proficiency: number;
  color: string;
  order: number;
}

const CATEGORIES = ['Backend', 'Frontend', 'Database', 'Mobile', 'DevOps', 'Tools', 'Language'];
const CATEGORY_COLORS: Record<string, string> = {
  Backend: 'from-blue-500 to-cyan-500',
  Frontend: 'from-green-500 to-emerald-500',
  Database: 'from-orange-500 to-amber-500',
  Mobile: 'from-purple-500 to-pink-500',
  DevOps: 'from-red-500 to-orange-500',
  Tools: 'from-gray-500 to-slate-500',
  Language: 'from-indigo-500 to-violet-500',
};

const emptyForm: Partial<Skill> = {
  name: '', category: 'Backend', proficiency: 80, color: '#6366f1', order: 0
};

export default function SkillsAdmin() {
  const [skills, setSkills] = useState<Skill[]>([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editing, setEditing] = useState<Skill | null>(null);
  const [form, setForm] = useState<Partial<Skill>>(emptyForm);
  const [saving, setSaving] = useState(false);
  const [activeCategory, setActiveCategory] = useState('All');

  useEffect(() => { fetchSkills(); }, []);

  const fetchSkills = async () => {
    setLoading(true);
    const res = await fetch('/api/skills');
    const data = await res.json();
    setSkills(data);
    setLoading(false);
  };

  const filtered = activeCategory === 'All' ? skills : skills.filter(s => s.category === activeCategory);

  const openAdd = () => { setEditing(null); setForm(emptyForm); setShowModal(true); };
  const openEdit = (s: Skill) => { setEditing(s); setForm({ ...s }); setShowModal(true); };

  const handleSave = async () => {
    setSaving(true);
    const method = editing ? 'PUT' : 'POST';
    const url = editing ? `/api/skills/${editing._id}` : '/api/skills';
    await fetch(url, { method, headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(form) });
    setSaving(false);
    setShowModal(false);
    fetchSkills();
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Delete this skill?')) return;
    await fetch(`/api/skills/${id}`, { method: 'DELETE' });
    fetchSkills();
  };

  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-white">Skills</h1>
          <p className="text-gray-400 text-sm mt-1">{skills.length} skills across {new Set(skills.map(s => s.category)).size} categories</p>
        </div>
        <button onClick={openAdd} className="flex items-center gap-2 px-4 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-sm font-medium transition-all shadow-lg shadow-indigo-500/20">
          <FiPlus size={16} /> Add Skill
        </button>
      </div>

      {/* Category Filter */}
      <div className="flex gap-2 flex-wrap mb-6">
        {['All', ...CATEGORIES].map(cat => (
          <button key={cat} onClick={() => setActiveCategory(cat)}
            className={`px-3 py-1.5 rounded-lg text-sm transition-all ${activeCategory === cat ? 'bg-indigo-600 text-white' : 'bg-white/5 text-gray-400 hover:text-white border border-white/10'}`}>
            {cat}
            {cat !== 'All' && <span className="ml-1.5 text-xs opacity-70">({skills.filter(s => s.category === cat).length})</span>}
          </button>
        ))}
      </div>

      {loading ? (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3">
          {[...Array(10)].map((_, i) => <div key={i} className="bg-[#111118] rounded-xl h-24 animate-pulse" />)}
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3">
          {filtered.map(s => (
            <div key={s._id} className="bg-[#111118] border border-white/5 rounded-xl p-4 hover:border-white/10 transition-all group relative">
              <div className="absolute top-2 right-2 flex gap-1 opacity-0 group-hover:opacity-100 transition-all">
                <button onClick={() => openEdit(s)} className="p-1 bg-indigo-600/80 rounded-md hover:bg-indigo-600 transition-all">
                  <FiEdit2 size={10} className="text-white" />
                </button>
                <button onClick={() => handleDelete(s._id)} className="p-1 bg-red-600/80 rounded-md hover:bg-red-600 transition-all">
                  <FiTrash2 size={10} className="text-white" />
                </button>
              </div>

              <div className="mb-3">
                <div className={`w-8 h-1 rounded-full bg-gradient-to-r ${CATEGORY_COLORS[s.category] || 'from-indigo-500 to-purple-500'} mb-2`} />
                <p className="text-white text-sm font-medium line-clamp-1">{s.name}</p>
                <p className="text-gray-500 text-xs">{s.category}</p>
              </div>

              <div>
                <div className="flex justify-between items-center mb-1">
                  <span className="text-xs text-gray-500">Proficiency</span>
                  <span className="text-xs text-gray-300 font-medium">{s.proficiency}%</span>
                </div>
                <div className="h-1.5 bg-white/5 rounded-full overflow-hidden">
                  <div
                    className={`h-full bg-gradient-to-r ${CATEGORY_COLORS[s.category] || 'from-indigo-500 to-purple-500'} rounded-full`}
                    style={{ width: `${s.proficiency}%` }}
                  />
                </div>
              </div>
            </div>
          ))}

          {/* Add new button */}
          <button onClick={openAdd} className="bg-[#111118] border-2 border-dashed border-white/10 rounded-xl p-4 hover:border-indigo-500/30 hover:bg-indigo-500/5 transition-all flex flex-col items-center justify-center gap-2 text-gray-500 hover:text-indigo-400">
            <FiPlus size={20} />
            <span className="text-xs">Add Skill</span>
          </button>
        </div>
      )}

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
          <div className="w-full max-w-md bg-[#111118] border border-white/10 rounded-2xl shadow-2xl">
            <div className="flex items-center justify-between p-6 border-b border-white/5">
              <h2 className="text-white font-semibold">{editing ? 'Edit Skill' : 'Add Skill'}</h2>
              <button onClick={() => setShowModal(false)} className="text-gray-400 hover:text-white"><FiX size={20} /></button>
            </div>
            <div className="p-6 space-y-4">
              <div>
                <label className="block text-sm text-gray-300 mb-1.5">Skill Name *</label>
                <input value={form.name || ''} onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
                  className="w-full px-3 py-2.5 bg-white/5 border border-white/10 rounded-xl text-white text-sm focus:outline-none focus:border-indigo-500 transition-all" placeholder="e.g. React.js" />
              </div>
              <div>
                <label className="block text-sm text-gray-300 mb-1.5">Category</label>
                <select value={form.category || 'Backend'} onChange={e => setForm(f => ({ ...f, category: e.target.value }))}
                  className="w-full px-3 py-2.5 bg-[#0a0a0f] border border-white/10 rounded-xl text-white text-sm focus:outline-none focus:border-indigo-500 transition-all">
                  {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
                </select>
              </div>
              <div>
                <label className="block text-sm text-gray-300 mb-1.5">Proficiency: <span className="text-indigo-400 font-bold">{form.proficiency}%</span></label>
                <input type="range" min={10} max={100} step={5} value={form.proficiency || 80}
                  onChange={e => setForm(f => ({ ...f, proficiency: +e.target.value }))}
                  className="w-full accent-indigo-500" />
                <div className="flex justify-between text-xs text-gray-600 mt-1">
                  <span>10%</span><span>100%</span>
                </div>
              </div>
              <div>
                <label className="block text-sm text-gray-300 mb-1.5">Color</label>
                <div className="flex items-center gap-3">
                  <input type="color" value={form.color || '#6366f1'} onChange={e => setForm(f => ({ ...f, color: e.target.value }))}
                    className="w-10 h-10 rounded-lg border-0 cursor-pointer bg-transparent" />
                  <input value={form.color || '#6366f1'} onChange={e => setForm(f => ({ ...f, color: e.target.value }))}
                    className="flex-1 px-3 py-2.5 bg-white/5 border border-white/10 rounded-xl text-white text-sm focus:outline-none focus:border-indigo-500 transition-all" placeholder="#6366f1" />
                </div>
              </div>
              <div>
                <label className="block text-sm text-gray-300 mb-1.5">Order</label>
                <input type="number" value={form.order || 0} onChange={e => setForm(f => ({ ...f, order: +e.target.value }))}
                  className="w-full px-3 py-2.5 bg-white/5 border border-white/10 rounded-xl text-white text-sm focus:outline-none focus:border-indigo-500 transition-all" />
              </div>
            </div>
            <div className="flex justify-end gap-3 p-6 border-t border-white/5">
              <button onClick={() => setShowModal(false)} className="px-4 py-2.5 bg-white/5 border border-white/10 text-gray-300 rounded-xl text-sm hover:bg-white/10 transition-all">Cancel</button>
              <button onClick={handleSave} disabled={saving || !form.name}
                className="px-6 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-sm font-medium disabled:opacity-60 transition-all">
                {saving ? 'Saving...' : (editing ? 'Update' : 'Create')}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
