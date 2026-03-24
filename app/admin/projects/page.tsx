'use client';
import { useState, useEffect, useRef } from 'react';
import { FiPlus, FiEdit2, FiTrash2, FiUpload, FiX, FiStar, FiGithub, FiExternalLink } from 'react-icons/fi';
import Image from 'next/image';

interface Project {
  _id: string;
  title: string;
  description: string;
  shortDesc: string;
  image: string;
  category: string;
  techStack: string[];
  githubUrl: string;
  liveUrl: string;
  featured: boolean;
  order: number;
}

const CATEGORIES = ['All', '.NET', 'Laravel', 'React', 'Next.js', 'Frontend', 'Backend', 'Mobile', 'Tools', 'Other'];

const emptyForm: Partial<Project> = {
  title: '', description: '', shortDesc: '', image: '',
  category: 'Other', techStack: [], githubUrl: '', liveUrl: '',
  featured: false, order: 0,
};

export default function ProjectsAdmin() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editing, setEditing] = useState<Project | null>(null);
  const [form, setForm] = useState<Partial<Project>>(emptyForm);
  const [techInput, setTechInput] = useState('');
  const [uploading, setUploading] = useState(false);
  const [saving, setSaving] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);

  useEffect(() => { fetchProjects(); }, []);

  const fetchProjects = async () => {
    setLoading(true);
    const res = await fetch('/api/projects');
    const data = await res.json();
    setProjects(data);
    setLoading(false);
  };

  const openAdd = () => {
    setEditing(null);
    setForm(emptyForm);
    setTechInput('');
    setShowModal(true);
  };

  const openEdit = (p: Project) => {
    setEditing(p);
    setForm({ ...p });
    setTechInput('');
    setShowModal(true);
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    const fd = new FormData();
    fd.append('file', file);
    const res = await fetch('/api/upload', { method: 'POST', body: fd });
    const data = await res.json();
    if (data.url) setForm(f => ({ ...f, image: data.url }));
    setUploading(false);
  };

  const addTech = () => {
    const t = techInput.trim();
    if (!t) return;
    setForm(f => ({ ...f, techStack: [...(f.techStack || []), t] }));
    setTechInput('');
  };

  const removeTech = (i: number) => {
    setForm(f => ({ ...f, techStack: (f.techStack || []).filter((_, idx) => idx !== i) }));
  };

  const handleSave = async () => {
    setSaving(true);
    const method = editing ? 'PUT' : 'POST';
    const url = editing ? `/api/projects/${editing._id}` : '/api/projects';
    await fetch(url, { method, headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(form) });
    setSaving(false);
    setShowModal(false);
    fetchProjects();
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Delete this project?')) return;
    await fetch(`/api/projects/${id}`, { method: 'DELETE' });
    fetchProjects();
  };

  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-white">Projects</h1>
          <p className="text-gray-400 text-sm mt-1">{projects.length} project{projects.length !== 1 ? 's' : ''}</p>
        </div>
        <button onClick={openAdd} className="flex items-center gap-2 px-4 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-sm font-medium transition-all shadow-lg shadow-indigo-500/20">
          <FiPlus size={16} /> Add Project
        </button>
      </div>

      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="bg-[#111118] border border-white/5 rounded-2xl h-64 animate-pulse" />
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
          {projects.map(p => (
            <div key={p._id} className="bg-[#111118] border border-white/5 rounded-2xl overflow-hidden hover:border-indigo-500/20 transition-all group">
              {/* Image */}
              <div className="relative h-40 bg-gradient-to-br from-indigo-900/30 to-purple-900/30">
                {p.image ? (
                  <Image src={p.image} alt={p.title} fill className="object-cover" />
                ) : (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <FiFolder size={40} className="text-indigo-500/30" />
                  </div>
                )}
                {p.featured && (
                  <span className="absolute top-2 left-2 flex items-center gap-1 bg-amber-500/90 text-black text-xs font-bold px-2 py-0.5 rounded-full">
                    <FiStar size={10} /> Featured
                  </span>
                )}
                <div className="absolute top-2 right-2 flex gap-1 opacity-0 group-hover:opacity-100 transition-all">
                  <button onClick={() => openEdit(p)} className="p-1.5 bg-indigo-600 rounded-lg hover:bg-indigo-700 transition-all">
                    <FiEdit2 size={12} className="text-white" />
                  </button>
                  <button onClick={() => handleDelete(p._id)} className="p-1.5 bg-red-600 rounded-lg hover:bg-red-700 transition-all">
                    <FiTrash2 size={12} className="text-white" />
                  </button>
                </div>
              </div>

              <div className="p-4">
                <div className="flex items-start justify-between gap-2 mb-2">
                  <h3 className="text-white font-semibold text-sm line-clamp-1">{p.title}</h3>
                  <span className="shrink-0 text-xs px-2 py-0.5 bg-indigo-500/15 text-indigo-400 rounded-full border border-indigo-500/20">
                    {p.category}
                  </span>
                </div>
                <p className="text-gray-400 text-xs line-clamp-2 mb-3">{p.shortDesc || p.description}</p>
                <div className="flex flex-wrap gap-1">
                  {p.techStack?.slice(0, 4).map(t => (
                    <span key={t} className="text-xs px-2 py-0.5 bg-white/5 text-gray-400 rounded-md">{t}</span>
                  ))}
                  {(p.techStack?.length || 0) > 4 && (
                    <span className="text-xs text-gray-500">+{p.techStack.length - 4}</span>
                  )}
                </div>
                <div className="flex gap-2 mt-3">
                  {p.githubUrl && <a href={p.githubUrl} target="_blank" className="text-gray-500 hover:text-white transition-all"><FiGithub size={14} /></a>}
                  {p.liveUrl && <a href={p.liveUrl} target="_blank" className="text-gray-500 hover:text-white transition-all"><FiExternalLink size={14} /></a>}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
          <div className="w-full max-w-2xl bg-[#111118] border border-white/10 rounded-2xl shadow-2xl max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between p-6 border-b border-white/5">
              <h2 className="text-white font-semibold">{editing ? 'Edit Project' : 'Add Project'}</h2>
              <button onClick={() => setShowModal(false)} className="text-gray-400 hover:text-white transition-all">
                <FiX size={20} />
              </button>
            </div>

            <div className="p-6 space-y-4">
              {/* Image Upload */}
              <div>
                <label className="block text-sm text-gray-300 mb-2">Project Image</label>
                <div
                  onClick={() => fileRef.current?.click()}
                  className="relative h-40 bg-white/5 border-2 border-dashed border-white/10 rounded-xl cursor-pointer hover:border-indigo-500/40 transition-all flex items-center justify-center overflow-hidden"
                >
                  {form.image ? (
                    <Image src={form.image} alt="preview" fill className="object-cover rounded-xl" />
                  ) : (
                    <div className="text-center">
                      <FiUpload size={24} className="text-gray-500 mx-auto mb-2" />
                      <p className="text-gray-500 text-sm">{uploading ? 'Uploading...' : 'Click to upload image'}</p>
                      <p className="text-gray-600 text-xs mt-1">PNG, JPG, WebP — max 5MB</p>
                    </div>
                  )}
                </div>
                <input ref={fileRef} type="file" accept="image/*" className="hidden" onChange={handleImageUpload} />
                {form.image && (
                  <button onClick={() => setForm(f => ({ ...f, image: '' }))} className="mt-2 text-xs text-red-400 hover:text-red-300 transition-all">Remove image</button>
                )}
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="col-span-2">
                  <label className="block text-sm text-gray-300 mb-1.5">Title *</label>
                  <input value={form.title || ''} onChange={e => setForm(f => ({ ...f, title: e.target.value }))}
                    className="w-full px-3 py-2.5 bg-white/5 border border-white/10 rounded-xl text-white text-sm focus:outline-none focus:border-indigo-500 transition-all" placeholder="Project name" />
                </div>
                <div>
                  <label className="block text-sm text-gray-300 mb-1.5">Category</label>
                  <select value={form.category || 'Other'} onChange={e => setForm(f => ({ ...f, category: e.target.value }))}
                    className="w-full px-3 py-2.5 bg-[#0a0a0f] border border-white/10 rounded-xl text-white text-sm focus:outline-none focus:border-indigo-500 transition-all">
                    {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
                  </select>
                </div>
                <div>
                  <label className="block text-sm text-gray-300 mb-1.5">Order</label>
                  <input type="number" value={form.order || 0} onChange={e => setForm(f => ({ ...f, order: +e.target.value }))}
                    className="w-full px-3 py-2.5 bg-white/5 border border-white/10 rounded-xl text-white text-sm focus:outline-none focus:border-indigo-500 transition-all" />
                </div>
                <div className="col-span-2">
                  <label className="block text-sm text-gray-300 mb-1.5">Short Description</label>
                  <input value={form.shortDesc || ''} onChange={e => setForm(f => ({ ...f, shortDesc: e.target.value }))}
                    className="w-full px-3 py-2.5 bg-white/5 border border-white/10 rounded-xl text-white text-sm focus:outline-none focus:border-indigo-500 transition-all" placeholder="One-line summary" />
                </div>
                <div className="col-span-2">
                  <label className="block text-sm text-gray-300 mb-1.5">Full Description *</label>
                  <textarea value={form.description || ''} onChange={e => setForm(f => ({ ...f, description: e.target.value }))} rows={4}
                    className="w-full px-3 py-2.5 bg-white/5 border border-white/10 rounded-xl text-white text-sm focus:outline-none focus:border-indigo-500 transition-all resize-none" placeholder="Detailed project description" />
                </div>
                <div>
                  <label className="block text-sm text-gray-300 mb-1.5">GitHub URL</label>
                  <input value={form.githubUrl || ''} onChange={e => setForm(f => ({ ...f, githubUrl: e.target.value }))}
                    className="w-full px-3 py-2.5 bg-white/5 border border-white/10 rounded-xl text-white text-sm focus:outline-none focus:border-indigo-500 transition-all" placeholder="https://github.com/..." />
                </div>
                <div>
                  <label className="block text-sm text-gray-300 mb-1.5">Live URL</label>
                  <input value={form.liveUrl || ''} onChange={e => setForm(f => ({ ...f, liveUrl: e.target.value }))}
                    className="w-full px-3 py-2.5 bg-white/5 border border-white/10 rounded-xl text-white text-sm focus:outline-none focus:border-indigo-500 transition-all" placeholder="https://..." />
                </div>
              </div>

              {/* Tech Stack */}
              <div>
                <label className="block text-sm text-gray-300 mb-1.5">Tech Stack</label>
                <div className="flex gap-2 mb-2">
                  <input value={techInput} onChange={e => setTechInput(e.target.value)}
                    onKeyDown={e => e.key === 'Enter' && (e.preventDefault(), addTech())}
                    className="flex-1 px-3 py-2.5 bg-white/5 border border-white/10 rounded-xl text-white text-sm focus:outline-none focus:border-indigo-500 transition-all" placeholder="Add tech (press Enter)" />
                  <button onClick={addTech} className="px-4 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-sm transition-all">Add</button>
                </div>
                <div className="flex flex-wrap gap-2">
                  {form.techStack?.map((t, i) => (
                    <span key={i} className="flex items-center gap-1.5 px-3 py-1 bg-white/5 border border-white/10 text-gray-300 text-xs rounded-lg">
                      {t}
                      <button onClick={() => removeTech(i)} className="text-gray-500 hover:text-red-400 transition-all"><FiX size={10} /></button>
                    </span>
                  ))}
                </div>
              </div>

              {/* Featured toggle */}
              <div className="flex items-center gap-3">
                <button
                  onClick={() => setForm(f => ({ ...f, featured: !f.featured }))}
                  className={`relative w-11 h-6 rounded-full transition-all ${form.featured ? 'bg-indigo-600' : 'bg-white/10'}`}
                >
                  <span className={`absolute top-1 w-4 h-4 bg-white rounded-full shadow transition-all ${form.featured ? 'left-6' : 'left-1'}`} />
                </button>
                <span className="text-sm text-gray-300">Mark as Featured</span>
              </div>
            </div>

            <div className="flex justify-end gap-3 p-6 border-t border-white/5">
              <button onClick={() => setShowModal(false)} className="px-4 py-2.5 bg-white/5 border border-white/10 text-gray-300 rounded-xl text-sm hover:bg-white/10 transition-all">Cancel</button>
              <button onClick={handleSave} disabled={saving || !form.title || !form.description}
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

function FiFolder({ size, className }: { size: number; className?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={className}>
      <path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"/>
    </svg>
  );
}
