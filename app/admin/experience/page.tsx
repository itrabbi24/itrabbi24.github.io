'use client';
import { useState, useEffect } from 'react';
import { FiPlus, FiEdit2, FiTrash2, FiX, FiBriefcase, FiBook } from 'react-icons/fi';

interface Experience {
  _id: string;
  type: 'work' | 'education';
  role: string;
  company: string;
  location: string;
  period: string;
  description: string;
  highlights: string[];
  techStack: string[];
  current: boolean;
  order: number;
}

const emptyForm: Partial<Experience> = {
  type: 'work', role: '', company: '', location: '', period: '',
  description: '', highlights: [], techStack: [], current: false, order: 0,
};

export default function ExperienceAdmin() {
  const [items, setItems] = useState<Experience[]>([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editing, setEditing] = useState<Experience | null>(null);
  const [form, setForm] = useState<Partial<Experience>>(emptyForm);
  const [highlightInput, setHighlightInput] = useState('');
  const [techInput, setTechInput] = useState('');
  const [saving, setSaving] = useState(false);

  useEffect(() => { fetchItems(); }, []);

  const fetchItems = async () => {
    setLoading(true);
    const res = await fetch('/api/experience');
    const data = await res.json();
    setItems(data);
    setLoading(false);
  };

  const openAdd = () => { setEditing(null); setForm(emptyForm); setHighlightInput(''); setTechInput(''); setShowModal(true); };
  const openEdit = (e: Experience) => { setEditing(e); setForm({ ...e }); setHighlightInput(''); setTechInput(''); setShowModal(true); };

  const addHighlight = () => {
    const h = highlightInput.trim();
    if (!h) return;
    setForm(f => ({ ...f, highlights: [...(f.highlights || []), h] }));
    setHighlightInput('');
  };

  const addTech = () => {
    const t = techInput.trim();
    if (!t) return;
    setForm(f => ({ ...f, techStack: [...(f.techStack || []), t] }));
    setTechInput('');
  };

  const handleSave = async () => {
    setSaving(true);
    const method = editing ? 'PUT' : 'POST';
    const url = editing ? `/api/experience/${editing._id}` : '/api/experience';
    await fetch(url, { method, headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(form) });
    setSaving(false);
    setShowModal(false);
    fetchItems();
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Delete this entry?')) return;
    await fetch(`/api/experience/${id}`, { method: 'DELETE' });
    fetchItems();
  };

  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-white">Experience</h1>
          <p className="text-gray-400 text-sm mt-1">{items.length} entries</p>
        </div>
        <button onClick={openAdd} className="flex items-center gap-2 px-4 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-sm font-medium transition-all shadow-lg shadow-indigo-500/20">
          <FiPlus size={16} /> Add Entry
        </button>
      </div>

      {loading ? (
        <div className="space-y-3">{[...Array(3)].map((_, i) => <div key={i} className="bg-[#111118] rounded-2xl h-32 animate-pulse" />)}</div>
      ) : (
        <div className="space-y-3">
          {items.map(item => (
            <div key={item._id} className="bg-[#111118] border border-white/5 rounded-2xl p-5 hover:border-white/10 transition-all group">
              <div className="flex items-start justify-between gap-4">
                <div className="flex items-start gap-4">
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${item.type === 'work' ? 'bg-blue-500/15 border border-blue-500/20' : 'bg-purple-500/15 border border-purple-500/20'}`}>
                    {item.type === 'work' ? <FiBriefcase size={16} className="text-blue-400" /> : <FiBook size={16} className="text-purple-400" />}
                  </div>
                  <div>
                    <div className="flex items-center gap-2 flex-wrap">
                      <h3 className="text-white font-semibold">{item.role}</h3>
                      {item.current && <span className="text-xs bg-green-500/15 text-green-400 border border-green-500/20 px-2 py-0.5 rounded-full">Current</span>}
                    </div>
                    <p className="text-gray-400 text-sm">{item.company} · {item.location}</p>
                    <p className="text-gray-500 text-xs mt-0.5">{item.period}</p>
                  </div>
                </div>
                <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-all shrink-0">
                  <button onClick={() => openEdit(item)} className="p-2 bg-indigo-600/20 border border-indigo-600/20 text-indigo-400 rounded-xl hover:bg-indigo-600/30 transition-all"><FiEdit2 size={14} /></button>
                  <button onClick={() => handleDelete(item._id)} className="p-2 bg-red-600/20 border border-red-600/20 text-red-400 rounded-xl hover:bg-red-600/30 transition-all"><FiTrash2 size={14} /></button>
                </div>
              </div>
              {item.techStack?.length > 0 && (
                <div className="flex flex-wrap gap-1 mt-3 ml-14">
                  {item.techStack.map(t => <span key={t} className="text-xs px-2 py-0.5 bg-white/5 text-gray-400 rounded-md">{t}</span>)}
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
          <div className="w-full max-w-2xl bg-[#111118] border border-white/10 rounded-2xl shadow-2xl max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between p-6 border-b border-white/5">
              <h2 className="text-white font-semibold">{editing ? 'Edit Entry' : 'Add Experience'}</h2>
              <button onClick={() => setShowModal(false)} className="text-gray-400 hover:text-white"><FiX size={20} /></button>
            </div>
            <div className="p-6 space-y-4">
              <div className="flex gap-3">
                {(['work', 'education'] as const).map(t => (
                  <button key={t} onClick={() => setForm(f => ({ ...f, type: t }))}
                    className={`flex-1 py-2.5 rounded-xl text-sm font-medium capitalize transition-all ${form.type === t ? 'bg-indigo-600 text-white' : 'bg-white/5 text-gray-400 border border-white/10 hover:bg-white/10'}`}>
                    {t}
                  </button>
                ))}
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="col-span-2">
                  <label className="block text-sm text-gray-300 mb-1.5">Role / Degree *</label>
                  <input value={form.role || ''} onChange={e => setForm(f => ({ ...f, role: e.target.value }))}
                    className="w-full px-3 py-2.5 bg-white/5 border border-white/10 rounded-xl text-white text-sm focus:outline-none focus:border-indigo-500 transition-all" placeholder="e.g. Senior Developer" />
                </div>
                <div>
                  <label className="block text-sm text-gray-300 mb-1.5">Company / Institution *</label>
                  <input value={form.company || ''} onChange={e => setForm(f => ({ ...f, company: e.target.value }))}
                    className="w-full px-3 py-2.5 bg-white/5 border border-white/10 rounded-xl text-white text-sm focus:outline-none focus:border-indigo-500 transition-all" placeholder="Company name" />
                </div>
                <div>
                  <label className="block text-sm text-gray-300 mb-1.5">Location</label>
                  <input value={form.location || ''} onChange={e => setForm(f => ({ ...f, location: e.target.value }))}
                    className="w-full px-3 py-2.5 bg-white/5 border border-white/10 rounded-xl text-white text-sm focus:outline-none focus:border-indigo-500 transition-all" placeholder="City, Country" />
                </div>
                <div>
                  <label className="block text-sm text-gray-300 mb-1.5">Period *</label>
                  <input value={form.period || ''} onChange={e => setForm(f => ({ ...f, period: e.target.value }))}
                    className="w-full px-3 py-2.5 bg-white/5 border border-white/10 rounded-xl text-white text-sm focus:outline-none focus:border-indigo-500 transition-all" placeholder="2022 – Present" />
                </div>
                <div className="flex items-center gap-3">
                  <button onClick={() => setForm(f => ({ ...f, current: !f.current }))}
                    className={`relative w-11 h-6 rounded-full transition-all ${form.current ? 'bg-green-600' : 'bg-white/10'}`}>
                    <span className={`absolute top-1 w-4 h-4 bg-white rounded-full shadow transition-all ${form.current ? 'left-6' : 'left-1'}`} />
                  </button>
                  <span className="text-sm text-gray-300">Currently here</span>
                </div>
                <div className="col-span-2">
                  <label className="block text-sm text-gray-300 mb-1.5">Description</label>
                  <textarea value={form.description || ''} onChange={e => setForm(f => ({ ...f, description: e.target.value }))} rows={3}
                    className="w-full px-3 py-2.5 bg-white/5 border border-white/10 rounded-xl text-white text-sm focus:outline-none focus:border-indigo-500 transition-all resize-none" />
                </div>
              </div>

              <div>
                <label className="block text-sm text-gray-300 mb-1.5">Highlights</label>
                <div className="flex gap-2 mb-2">
                  <input value={highlightInput} onChange={e => setHighlightInput(e.target.value)}
                    onKeyDown={e => e.key === 'Enter' && (e.preventDefault(), addHighlight())}
                    className="flex-1 px-3 py-2 bg-white/5 border border-white/10 rounded-xl text-white text-sm focus:outline-none focus:border-indigo-500 transition-all" placeholder="Add highlight (Enter)" />
                  <button onClick={addHighlight} className="px-3 py-2 bg-indigo-600 text-white rounded-xl text-sm">Add</button>
                </div>
                <div className="space-y-1">
                  {form.highlights?.map((h, i) => (
                    <div key={i} className="flex items-center gap-2 text-sm text-gray-300 bg-white/5 px-3 py-2 rounded-lg">
                      <span className="flex-1">• {h}</span>
                      <button onClick={() => setForm(f => ({ ...f, highlights: f.highlights?.filter((_, idx) => idx !== i) }))} className="text-gray-500 hover:text-red-400 transition-all"><FiX size={12} /></button>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm text-gray-300 mb-1.5">Tech Stack</label>
                <div className="flex gap-2 mb-2">
                  <input value={techInput} onChange={e => setTechInput(e.target.value)}
                    onKeyDown={e => e.key === 'Enter' && (e.preventDefault(), addTech())}
                    className="flex-1 px-3 py-2 bg-white/5 border border-white/10 rounded-xl text-white text-sm focus:outline-none focus:border-indigo-500 transition-all" placeholder="Add tech (Enter)" />
                  <button onClick={addTech} className="px-3 py-2 bg-indigo-600 text-white rounded-xl text-sm">Add</button>
                </div>
                <div className="flex flex-wrap gap-2">
                  {form.techStack?.map((t, i) => (
                    <span key={i} className="flex items-center gap-1.5 px-3 py-1 bg-white/5 border border-white/10 text-gray-300 text-xs rounded-lg">
                      {t} <button onClick={() => setForm(f => ({ ...f, techStack: f.techStack?.filter((_, idx) => idx !== i) }))} className="text-gray-500 hover:text-red-400"><FiX size={10} /></button>
                    </span>
                  ))}
                </div>
              </div>
            </div>
            <div className="flex justify-end gap-3 p-6 border-t border-white/5">
              <button onClick={() => setShowModal(false)} className="px-4 py-2.5 bg-white/5 border border-white/10 text-gray-300 rounded-xl text-sm hover:bg-white/10 transition-all">Cancel</button>
              <button onClick={handleSave} disabled={saving || !form.role || !form.company}
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
