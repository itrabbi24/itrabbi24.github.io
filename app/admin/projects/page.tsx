'use client';
import { useState, useEffect, useRef } from 'react';
import {
  DndContext, closestCenter, PointerSensor, useSensor, useSensors,
  type DragEndEvent,
} from '@dnd-kit/core';
import {
  SortableContext, verticalListSortingStrategy,
  useSortable, arrayMove,
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import {
  FiPlus, FiEdit2, FiTrash2, FiUpload, FiX, FiStar,
  FiGithub, FiExternalLink, FiImage, FiChevronLeft,
  FiChevronRight, FiMenu, FiLock, FiCode, FiCheck,
} from 'react-icons/fi';
import Image from 'next/image';

interface Project {
  _id: string; title: string; description: string; shortDesc: string;
  image: string; screenshots: string[]; category: string;
  techStack: string[]; githubUrl: string; liveUrl: string;
  featured: boolean; order: number;
}

const CATEGORIES = ['Enterprise', '.NET', 'Laravel', 'React', 'Next.js', 'Frontend', 'Backend', 'Mobile', 'Tools', 'Other'];
const CAT_COLOR: Record<string, string> = {
  Enterprise:'#22d3ee', '.NET':'#a78bfa', Laravel:'#FF2D20', React:'#61DAFB',
  'Next.js':'#fff', Frontend:'#4ade80', Backend:'#60a5fa', Mobile:'#f472b6',
  Tools:'#fbbf24', Other:'#94a3b8',
};

const emptyForm = (): Partial<Project> => ({
  title:'', description:'', shortDesc:'', image:'', screenshots:[],
  category:'Other', techStack:[], githubUrl:'', liveUrl:'', featured:false, order:0,
});

/* ─── screenshot mini-carousel (in the slide-out panel) ─── */
function MiniCarousel({ images, title }: { images: string[]; title: string }) {
  const [idx, setIdx] = useState(0);
  if (!images.length) return null;
  return (
    <div className="relative w-full aspect-video rounded-xl overflow-hidden bg-white/5">
      <Image src={images[idx]} alt={`${title} ${idx+1}`} fill className="object-cover" />
      {images.length > 1 && (
        <>
          <button onClick={() => setIdx(i => (i-1+images.length)%images.length)}
            className="absolute left-2 top-1/2 -translate-y-1/2 w-7 h-7 bg-black/60 hover:bg-black/80 rounded-full flex items-center justify-center">
            <FiChevronLeft size={13} className="text-white" />
          </button>
          <button onClick={() => setIdx(i => (i+1)%images.length)}
            className="absolute right-2 top-1/2 -translate-y-1/2 w-7 h-7 bg-black/60 hover:bg-black/80 rounded-full flex items-center justify-center">
            <FiChevronRight size={13} className="text-white" />
          </button>
          <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-1">
            {images.map((_,i) => (
              <button key={i} onClick={() => setIdx(i)}
                className="rounded-full transition-all"
                style={{ width: i===idx?14:6, height:6, background: i===idx?'#fff':'rgba(255,255,255,0.4)' }} />
            ))}
          </div>
          <span className="absolute top-2 right-2 bg-black/60 text-white text-[10px] px-1.5 py-0.5 rounded-full">
            {idx+1}/{images.length}
          </span>
        </>
      )}
    </div>
  );
}

/* ─── Sortable row ─── */
function SortableRow({
  project, onEdit, onDelete,
}: { project: Project; onEdit: (p: Project) => void; onDelete: (id: string) => void }) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } =
    useSortable({ id: project._id });

  const images = [project.image, ...(project.screenshots||[])].filter(Boolean);
  const accent = CAT_COLOR[project.category] || '#94a3b8';

  return (
    <div
      ref={setNodeRef}
      style={{ transform: CSS.Transform.toString(transform), transition, opacity: isDragging ? 0.5 : 1 }}
      className="flex items-center gap-3 px-4 py-3 bg-[#111118] border border-white/5 rounded-xl hover:border-white/10 transition-all group"
    >
      {/* drag handle */}
      <button
        {...listeners} {...attributes}
        className="cursor-grab active:cursor-grabbing text-gray-600 hover:text-gray-400 transition-all shrink-0 p-1 touch-none"
      >
        <FiMenu size={15} />
      </button>

      {/* thumbnail */}
      <div className="relative w-14 h-10 rounded-lg overflow-hidden shrink-0 bg-white/5 border border-white/5">
        {images[0] ? (
          <Image src={images[0]} alt={project.title} fill className="object-cover" />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center">
            <FiImage size={14} className="text-gray-600" />
          </div>
        )}
        {images.length > 1 && (
          <span className="absolute bottom-0.5 right-0.5 bg-black/70 text-white text-[8px] px-1 rounded">
            +{images.length - 1}
          </span>
        )}
      </div>

      {/* title + meta */}
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2">
          <span className="text-white font-medium text-sm truncate">{project.title}</span>
          {project.featured && (
            <span className="shrink-0 flex items-center gap-0.5 text-[9px] font-bold px-1.5 py-0.5 rounded-full bg-amber-500/15 text-amber-400 border border-amber-500/20">
              <FiStar size={8} /> Featured
            </span>
          )}
        </div>
        <p className="text-gray-500 text-xs truncate mt-0.5">{project.shortDesc || project.description}</p>
      </div>

      {/* category pill */}
      <span
        className="shrink-0 text-[11px] font-semibold px-2.5 py-1 rounded-full border hidden sm:block"
        style={{ color: accent, borderColor: `${accent}35`, background: `${accent}12` }}
      >
        {project.category}
      </span>

      {/* tech count */}
      <span className="shrink-0 text-[11px] text-gray-500 hidden md:block">
        {project.techStack?.length || 0} techs
      </span>

      {/* links */}
      <div className="shrink-0 flex items-center gap-1.5">
        {project.githubUrl
          ? <span className="flex items-center gap-1 text-[10px] text-emerald-400"><FiCode size={10} /> Open</span>
          : <span className="flex items-center gap-1 text-[10px] text-gray-600"><FiLock size={10} /> Private</span>
        }
      </div>

      {/* actions — show on hover */}
      <div className="shrink-0 flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-all">
        <button onClick={() => onEdit(project)}
          className="p-1.5 bg-indigo-600/20 hover:bg-indigo-600 border border-indigo-500/30 rounded-lg transition-all">
          <FiEdit2 size={12} className="text-indigo-400 hover:text-white" />
        </button>
        <button onClick={() => onDelete(project._id)}
          className="p-1.5 bg-red-600/20 hover:bg-red-600 border border-red-500/30 rounded-lg transition-all">
          <FiTrash2 size={12} className="text-red-400 hover:text-white" />
        </button>
      </div>
    </div>
  );
}

/* ════════════════════════════════════════════════ */
export default function ProjectsAdmin() {
  const [projects, setProjects]   = useState<Project[]>([]);
  const [loading, setLoading]     = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editing, setEditing]     = useState<Project | null>(null);
  const [form, setForm]           = useState<Partial<Project>>(emptyForm());
  const [techInput, setTechInput] = useState('');
  const [uploading, setUploading] = useState(false);
  const [uploadingScreens, setUploadingScreens] = useState(false);
  const [saving, setSaving]       = useState(false);
  const [reordering, setReordering] = useState(false);
  const [saved, setSaved]         = useState(false);
  const coverRef  = useRef<HTMLInputElement>(null);
  const screenRef = useRef<HTMLInputElement>(null);

  const sensors = useSensors(useSensor(PointerSensor, { activationConstraint: { distance: 5 } }));

  useEffect(() => { fetchProjects(); }, []);

  const fetchProjects = async () => {
    setLoading(true);
    const res  = await fetch('/api/projects');
    const data = await res.json();
    setProjects(Array.isArray(data) ? data.sort((a: Project, b: Project) => (a.order||0)-(b.order||0)) : []);
    setLoading(false);
  };

  const openAdd  = () => { setEditing(null); setForm(emptyForm()); setTechInput(''); setShowModal(true); };
  const openEdit = (p: Project) => { setEditing(p); setForm({...p, screenshots: p.screenshots||[]}); setTechInput(''); setShowModal(true); };

  const uploadFile = async (file: File): Promise<string> => {
    const fd = new FormData(); fd.append('file', file);
    const res = await fetch('/api/upload', { method:'POST', body:fd });
    return (await res.json()).url || '';
  };

  const handleCoverUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]; if (!file) return;
    setUploading(true);
    const url = await uploadFile(file);
    if (url) setForm(f => ({...f, image: url}));
    setUploading(false); e.target.value='';
  };

  const handleScreenshotsUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files||[]); if (!files.length) return;
    setUploadingScreens(true);
    for (const file of files) {
      const url = await uploadFile(file);
      if (url) setForm(f => ({...f, screenshots:[...(f.screenshots||[]), url]}));
    }
    setUploadingScreens(false); e.target.value='';
  };

  const removeScreenshot = (i: number) =>
    setForm(f => ({...f, screenshots:(f.screenshots||[]).filter((_,idx)=>idx!==i)}));

  const moveScreenshot = (from: number, to: number) =>
    setForm(f => { const a=[...(f.screenshots||[])]; const [x]=a.splice(from,1); a.splice(to,0,x); return {...f,screenshots:a}; });

  const addTech = () => {
    const t = techInput.trim(); if (!t) return;
    setForm(f => ({...f, techStack:[...(f.techStack||[]),t]})); setTechInput('');
  };

  const handleSave = async () => {
    setSaving(true);
    const method = editing ? 'PUT' : 'POST';
    const url    = editing ? `/api/projects/${editing._id}` : '/api/projects';
    await fetch(url, { method, headers:{'Content-Type':'application/json'}, body:JSON.stringify(form) });
    setSaving(false); setShowModal(false); fetchProjects();
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Delete this project?')) return;
    await fetch(`/api/projects/${id}`, { method:'DELETE' });
    fetchProjects();
  };

  /* drag end — reorder locally then save to DB */
  const handleDragEnd = async (event: DragEndEvent) => {
    const { active, over } = event;
    if (!over || active.id === over.id) return;
    const oldIdx = projects.findIndex(p => p._id === active.id);
    const newIdx = projects.findIndex(p => p._id === over.id);
    const reordered = arrayMove(projects, oldIdx, newIdx);
    setProjects(reordered);
    setReordering(true);
    await fetch('/api/projects/reorder', {
      method: 'PATCH',
      headers: {'Content-Type':'application/json'},
      body: JSON.stringify({ ids: reordered.map(p => p._id) }),
    });
    setReordering(false);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const allImages = (p: Partial<Project>) => [p.image, ...(p.screenshots||[])].filter(Boolean) as string[];

  return (
    <div className="p-6 max-w-5xl mx-auto">

      {/* ── Header ── */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-white">Projects</h1>
          <p className="text-gray-400 text-sm mt-0.5">
            {projects.length} project{projects.length!==1?'s':''} · drag to reorder
          </p>
        </div>
        <div className="flex items-center gap-3">
          {reordering && <span className="text-xs text-gray-400 animate-pulse">Saving order...</span>}
          {saved && (
            <span className="flex items-center gap-1 text-xs text-emerald-400">
              <FiCheck size={12} /> Order saved
            </span>
          )}
          <button onClick={openAdd}
            className="flex items-center gap-2 px-4 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-sm font-medium transition-all shadow-lg shadow-indigo-500/20">
            <FiPlus size={16} /> Add Project
          </button>
        </div>
      </div>

      {/* ── List ── */}
      {loading ? (
        <div className="space-y-2">
          {[...Array(5)].map((_,i) => (
            <div key={i} className="h-16 bg-[#111118] border border-white/5 rounded-xl animate-pulse" />
          ))}
        </div>
      ) : projects.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20 text-center">
          <FiImage size={40} className="text-gray-700 mb-3" />
          <p className="text-gray-400 text-sm">No projects yet.</p>
          <button onClick={openAdd} className="mt-4 px-4 py-2 bg-indigo-600 text-white rounded-xl text-sm hover:bg-indigo-700 transition-all">
            Add your first project
          </button>
        </div>
      ) : (
        <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
          <SortableContext items={projects.map(p => p._id)} strategy={verticalListSortingStrategy}>
            <div className="space-y-2">
              {projects.map(p => (
                <SortableRow key={p._id} project={p} onEdit={openEdit} onDelete={handleDelete} />
              ))}
            </div>
          </SortableContext>
        </DndContext>
      )}

      {/* ════ Edit / Add Modal ════ */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-end bg-black/60 backdrop-blur-sm">
          {/* slide-in panel from right */}
          <div className="relative w-full max-w-xl h-full bg-[#0d0d14] border-l border-white/10 shadow-2xl flex flex-col">
            {/* header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-white/5 shrink-0">
              <h2 className="text-white font-semibold">{editing ? 'Edit Project' : 'New Project'}</h2>
              <button onClick={() => setShowModal(false)} className="text-gray-400 hover:text-white transition-all">
                <FiX size={20} />
              </button>
            </div>

            {/* scrollable body */}
            <div className="flex-1 overflow-y-auto px-6 py-5 space-y-5">

              {/* Cover */}
              <div>
                <label className="block text-xs text-gray-400 mb-2 uppercase tracking-wider">Cover Image</label>
                <div onClick={() => coverRef.current?.click()}
                  className="relative h-32 bg-white/5 border-2 border-dashed border-white/10 rounded-xl cursor-pointer hover:border-indigo-500/50 transition-all overflow-hidden flex items-center justify-center">
                  {form.image ? (
                    <>
                      <Image src={form.image} alt="cover" fill className="object-cover" />
                      <div className="absolute inset-0 bg-black/40 opacity-0 hover:opacity-100 transition-all flex items-center justify-center">
                        <span className="text-white text-xs font-medium">Replace</span>
                      </div>
                    </>
                  ) : (
                    <div className="text-center">
                      <FiUpload size={20} className="text-gray-600 mx-auto mb-1" />
                      <p className="text-gray-500 text-xs">{uploading ? 'Uploading...' : 'Click to upload cover'}</p>
                    </div>
                  )}
                </div>
                <input ref={coverRef} type="file" accept="image/*" className="hidden" onChange={handleCoverUpload} />
                {form.image && (
                  <button onClick={() => setForm(f => ({...f, image:''}))} className="mt-1 text-xs text-red-400 hover:text-red-300 transition-all">
                    Remove cover
                  </button>
                )}
              </div>

              {/* Screenshots */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="text-xs text-gray-400 uppercase tracking-wider">
                    Screenshots ({(form.screenshots||[]).length})
                  </label>
                  <button onClick={() => screenRef.current?.click()}
                    className="flex items-center gap-1.5 px-2.5 py-1 bg-indigo-600/20 hover:bg-indigo-600/30 border border-indigo-500/30 text-indigo-400 text-xs rounded-lg transition-all">
                    <FiUpload size={10} /> {uploadingScreens ? 'Uploading...' : 'Add Photos'}
                  </button>
                </div>
                <input ref={screenRef} type="file" accept="image/*" multiple className="hidden" onChange={handleScreenshotsUpload} />

                {(form.screenshots||[]).length > 0 ? (
                  <>
                    <MiniCarousel images={allImages(form)} title={form.title||''} />
                    <div className="mt-2 grid grid-cols-4 gap-1.5">
                      {(form.screenshots||[]).map((url, i) => (
                        <div key={i} className="relative group/sc aspect-video bg-white/5 rounded-lg overflow-hidden border border-white/10">
                          <Image src={url} alt={`shot ${i+1}`} fill className="object-cover" />
                          <div className="absolute inset-0 bg-black/50 opacity-0 group-hover/sc:opacity-100 transition-all flex items-center justify-center gap-1">
                            {i > 0 && (
                              <button onClick={() => moveScreenshot(i, i-1)}
                                className="w-5 h-5 bg-white/20 hover:bg-white/40 rounded-full flex items-center justify-center">
                                <FiChevronLeft size={10} className="text-white" />
                              </button>
                            )}
                            <button onClick={() => removeScreenshot(i)}
                              className="w-5 h-5 bg-red-500/80 hover:bg-red-500 rounded-full flex items-center justify-center">
                              <FiX size={9} className="text-white" />
                            </button>
                            {i < (form.screenshots||[]).length-1 && (
                              <button onClick={() => moveScreenshot(i, i+1)}
                                className="w-5 h-5 bg-white/20 hover:bg-white/40 rounded-full flex items-center justify-center">
                                <FiChevronRight size={10} className="text-white" />
                              </button>
                            )}
                          </div>
                          <span className="absolute top-0.5 left-0.5 bg-black/60 text-white text-[8px] px-1 rounded">{i+1}</span>
                        </div>
                      ))}
                      <div onClick={() => screenRef.current?.click()}
                        className="aspect-video bg-white/5 border-2 border-dashed border-white/10 rounded-lg cursor-pointer hover:border-indigo-500/30 transition-all flex items-center justify-center">
                        <FiPlus size={14} className="text-gray-600" />
                      </div>
                    </div>
                  </>
                ) : (
                  <div onClick={() => screenRef.current?.click()}
                    className="h-20 bg-white/5 border-2 border-dashed border-white/10 rounded-xl cursor-pointer hover:border-indigo-500/30 transition-all flex flex-col items-center justify-center gap-1.5">
                    <FiImage size={18} className="text-gray-600" />
                    <p className="text-gray-500 text-xs">Click to add screenshots</p>
                  </div>
                )}
              </div>

              {/* Fields */}
              <div className="space-y-3">
                <div>
                  <label className="block text-xs text-gray-400 mb-1">Title *</label>
                  <input value={form.title||''} onChange={e => setForm(f=>({...f,title:e.target.value}))}
                    className="w-full px-3 py-2.5 bg-white/5 border border-white/10 rounded-xl text-white text-sm focus:outline-none focus:border-indigo-500 transition-all" placeholder="Project name" />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs text-gray-400 mb-1">Category</label>
                    <select value={form.category||'Other'} onChange={e => setForm(f=>({...f,category:e.target.value}))}
                      className="w-full px-3 py-2.5 bg-[#0a0a0f] border border-white/10 rounded-xl text-white text-sm focus:outline-none focus:border-indigo-500 transition-all">
                      {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs text-gray-400 mb-1">Order</label>
                    <input type="number" value={form.order||0} onChange={e => setForm(f=>({...f,order:+e.target.value}))}
                      className="w-full px-3 py-2.5 bg-white/5 border border-white/10 rounded-xl text-white text-sm focus:outline-none focus:border-indigo-500 transition-all" />
                  </div>
                </div>
                <div>
                  <label className="block text-xs text-gray-400 mb-1">Short Description</label>
                  <input value={form.shortDesc||''} onChange={e => setForm(f=>({...f,shortDesc:e.target.value}))}
                    className="w-full px-3 py-2.5 bg-white/5 border border-white/10 rounded-xl text-white text-sm focus:outline-none focus:border-indigo-500 transition-all" placeholder="One-line summary" />
                </div>
                <div>
                  <label className="block text-xs text-gray-400 mb-1">Full Description *</label>
                  <textarea value={form.description||''} onChange={e => setForm(f=>({...f,description:e.target.value}))} rows={4}
                    className="w-full px-3 py-2.5 bg-white/5 border border-white/10 rounded-xl text-white text-sm focus:outline-none focus:border-indigo-500 transition-all resize-none" placeholder="Detailed description" />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs text-gray-400 mb-1">GitHub URL</label>
                    <input value={form.githubUrl||''} onChange={e => setForm(f=>({...f,githubUrl:e.target.value}))}
                      className="w-full px-3 py-2.5 bg-white/5 border border-white/10 rounded-xl text-white text-sm focus:outline-none focus:border-indigo-500 transition-all" placeholder="https://github.com/..." />
                  </div>
                  <div>
                    <label className="block text-xs text-gray-400 mb-1">Live URL</label>
                    <input value={form.liveUrl||''} onChange={e => setForm(f=>({...f,liveUrl:e.target.value}))}
                      className="w-full px-3 py-2.5 bg-white/5 border border-white/10 rounded-xl text-white text-sm focus:outline-none focus:border-indigo-500 transition-all" placeholder="https://..." />
                  </div>
                </div>

                {/* Tech Stack */}
                <div>
                  <label className="block text-xs text-gray-400 mb-1">Tech Stack</label>
                  <div className="flex gap-2 mb-2">
                    <input value={techInput} onChange={e => setTechInput(e.target.value)}
                      onKeyDown={e => e.key==='Enter' && (e.preventDefault(), addTech())}
                      className="flex-1 px-3 py-2 bg-white/5 border border-white/10 rounded-xl text-white text-sm focus:outline-none focus:border-indigo-500 transition-all" placeholder="Add tech (Enter)" />
                    <button onClick={addTech} className="px-3 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-sm transition-all">Add</button>
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {form.techStack?.map((t,i) => (
                      <span key={i} className="flex items-center gap-1 px-2.5 py-1 bg-white/5 border border-white/10 text-gray-300 text-xs rounded-lg">
                        {t}
                        <button onClick={() => setForm(f=>({...f,techStack:(f.techStack||[]).filter((_,idx)=>idx!==i)}))} className="text-gray-500 hover:text-red-400 transition-all ml-0.5">
                          <FiX size={9} />
                        </button>
                      </span>
                    ))}
                  </div>
                </div>

                {/* Featured */}
                <div className="flex items-center gap-3 pt-1">
                  <button onClick={() => setForm(f=>({...f,featured:!f.featured}))}
                    className={`relative w-10 h-5 rounded-full transition-all ${form.featured?'bg-indigo-600':'bg-white/10'}`}>
                    <span className={`absolute top-0.5 w-4 h-4 bg-white rounded-full shadow transition-all ${form.featured?'left-5':'left-0.5'}`} />
                  </button>
                  <span className="text-sm text-gray-300">Mark as Featured</span>
                </div>
              </div>
            </div>

            {/* footer */}
            <div className="flex justify-end gap-3 px-6 py-4 border-t border-white/5 shrink-0">
              <button onClick={() => setShowModal(false)}
                className="px-4 py-2 bg-white/5 border border-white/10 text-gray-300 rounded-xl text-sm hover:bg-white/10 transition-all">
                Cancel
              </button>
              <button onClick={handleSave} disabled={saving || !form.title || !form.description}
                className="px-6 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-sm font-medium disabled:opacity-50 transition-all">
                {saving ? 'Saving...' : editing ? 'Update' : 'Create'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
