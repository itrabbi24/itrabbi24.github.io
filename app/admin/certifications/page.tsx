'use client';
import { useState, useEffect, useRef } from 'react';
import { FiPlus, FiEdit2, FiTrash2, FiX, FiUpload, FiAward, FiExternalLink } from 'react-icons/fi';
import Image from 'next/image';

interface Cert {
  _id: string;
  title: string;
  issuer: string;
  date: string;
  credentialId: string;
  verifyUrl: string;
  image: string;
  order: number;
}

const emptyForm: Partial<Cert> = { title: '', issuer: '', date: '', credentialId: '', verifyUrl: '', image: '', order: 0 };

export default function CertificationsAdmin() {
  const [items, setItems] = useState<Cert[]>([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editing, setEditing] = useState<Cert | null>(null);
  const [form, setForm] = useState<Partial<Cert>>(emptyForm);
  const [uploading, setUploading] = useState(false);
  const [saving, setSaving] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);

  useEffect(() => { fetchItems(); }, []);

  const fetchItems = async () => {
    setLoading(true);
    const res = await fetch('/api/certifications');
    const data = await res.json();
    setItems(data);
    setLoading(false);
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

  const openAdd = () => { setEditing(null); setForm(emptyForm); setShowModal(true); };
  const openEdit = (c: Cert) => { setEditing(c); setForm({ ...c }); setShowModal(true); };

  const handleSave = async () => {
    setSaving(true);
    const method = editing ? 'PUT' : 'POST';
    const url = editing ? `/api/certifications/${editing._id}` : '/api/certifications';
    await fetch(url, { method, headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(form) });
    setSaving(false);
    setShowModal(false);
    fetchItems();
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Delete this certification?')) return;
    await fetch(`/api/certifications/${id}`, { method: 'DELETE' });
    fetchItems();
  };

  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-white">Certifications</h1>
          <p className="text-gray-400 text-sm mt-1">{items.length} certifications</p>
        </div>
        <button onClick={openAdd} className="flex items-center gap-2 px-4 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-sm font-medium transition-all shadow-lg shadow-indigo-500/20">
          <FiPlus size={16} /> Add Cert
        </button>
      </div>

      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {[...Array(3)].map((_, i) => <div key={i} className="bg-[#111118] rounded-2xl h-32 animate-pulse" />)}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {items.map(cert => (
            <div key={cert._id} className="bg-[#111118] border border-white/5 rounded-2xl p-5 hover:border-white/10 transition-all group">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-amber-500/20 to-orange-500/20 border border-amber-500/20 flex items-center justify-center shrink-0 overflow-hidden">
                  {cert.image ? (
                    <Image src={cert.image} alt={cert.title} width={48} height={48} className="object-contain" />
                  ) : (
                    <FiAward size={20} className="text-amber-400" />
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-white text-sm font-semibold line-clamp-2">{cert.title}</p>
                  <p className="text-gray-400 text-xs mt-0.5">{cert.issuer}</p>
                  {cert.date && <p className="text-gray-600 text-xs mt-0.5">{cert.date}</p>}
                </div>
              </div>

              <div className="flex items-center justify-between mt-4">
                <div className="flex gap-2">
                  {cert.verifyUrl && (
                    <a href={cert.verifyUrl} target="_blank" className="text-xs flex items-center gap-1 text-indigo-400 hover:text-indigo-300 transition-all">
                      <FiExternalLink size={11} /> Verify
                    </a>
                  )}
                </div>
                <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-all">
                  <button onClick={() => openEdit(cert)} className="p-1.5 bg-indigo-600/20 text-indigo-400 rounded-lg hover:bg-indigo-600/30 transition-all"><FiEdit2 size={12} /></button>
                  <button onClick={() => handleDelete(cert._id)} className="p-1.5 bg-red-600/20 text-red-400 rounded-lg hover:bg-red-600/30 transition-all"><FiTrash2 size={12} /></button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
          <div className="w-full max-w-lg bg-[#111118] border border-white/10 rounded-2xl shadow-2xl">
            <div className="flex items-center justify-between p-6 border-b border-white/5">
              <h2 className="text-white font-semibold">{editing ? 'Edit Certification' : 'Add Certification'}</h2>
              <button onClick={() => setShowModal(false)} className="text-gray-400 hover:text-white"><FiX size={20} /></button>
            </div>
            <div className="p-6 space-y-4">
              <div onClick={() => fileRef.current?.click()}
                className="relative h-28 bg-white/5 border-2 border-dashed border-white/10 rounded-xl cursor-pointer hover:border-indigo-500/40 transition-all flex items-center justify-center overflow-hidden">
                {form.image ? (
                  <Image src={form.image} alt="preview" fill className="object-contain p-2" />
                ) : (
                  <div className="text-center">
                    <FiUpload size={20} className="text-gray-500 mx-auto mb-1" />
                    <p className="text-gray-500 text-xs">{uploading ? 'Uploading...' : 'Upload certificate image'}</p>
                  </div>
                )}
              </div>
              <input ref={fileRef} type="file" accept="image/*" className="hidden" onChange={handleImageUpload} />

              {[
                { label: 'Title *', key: 'title', placeholder: 'Certification name' },
                { label: 'Issuer *', key: 'issuer', placeholder: 'e.g. Microsoft, AWS' },
                { label: 'Date', key: 'date', placeholder: '2023' },
                { label: 'Credential ID', key: 'credentialId', placeholder: 'Optional' },
                { label: 'Verify URL', key: 'verifyUrl', placeholder: 'https://...' },
              ].map(({ label, key, placeholder }) => (
                <div key={key}>
                  <label className="block text-sm text-gray-300 mb-1.5">{label}</label>
                  <input value={(form as any)[key] || ''} onChange={e => setForm(f => ({ ...f, [key]: e.target.value }))}
                    className="w-full px-3 py-2.5 bg-white/5 border border-white/10 rounded-xl text-white text-sm focus:outline-none focus:border-indigo-500 transition-all" placeholder={placeholder} />
                </div>
              ))}
            </div>
            <div className="flex justify-end gap-3 p-6 border-t border-white/5">
              <button onClick={() => setShowModal(false)} className="px-4 py-2.5 bg-white/5 border border-white/10 text-gray-300 rounded-xl text-sm hover:bg-white/10 transition-all">Cancel</button>
              <button onClick={handleSave} disabled={saving || !form.title || !form.issuer}
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
