'use client';
import { useState, useEffect } from 'react';
import { FiSave, FiPlus, FiX } from 'react-icons/fi';

export default function AboutAdmin() {
  const [about, setAbout] = useState<any>({});
  const [hero, setHero] = useState<any>({});
  const [loadingAbout, setLoadingAbout] = useState(true);
  const [savingAbout, setSavingAbout] = useState(false);
  const [savingHero, setSavingHero] = useState(false);
  const [roleInput, setRoleInput] = useState('');
  const [statLabel, setStatLabel] = useState('');
  const [statValue, setStatValue] = useState('');
  const [highlightInput, setHighlightInput] = useState('');
  const [activeTab, setActiveTab] = useState<'hero' | 'about'>('hero');

  useEffect(() => {
    Promise.all([
      fetch('/api/about').then(r => r.json()),
      fetch('/api/hero').then(r => r.json()),
    ]).then(([a, h]) => {
      setAbout(a);
      setHero(h);
      setLoadingAbout(false);
    });
  }, []);

  const saveAbout = async () => {
    setSavingAbout(true);
    await fetch('/api/about', { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(about) });
    setSavingAbout(false);
    alert('About section saved!');
  };

  const saveHero = async () => {
    setSavingHero(true);
    await fetch('/api/hero', { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(hero) });
    setSavingHero(false);
    alert('Hero section saved!');
  };

  if (loadingAbout) return (
    <div className="p-8 flex items-center justify-center">
      <div className="w-8 h-8 border-2 border-indigo-500 border-t-transparent rounded-full animate-spin" />
    </div>
  );

  return (
    <div className="p-8">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-white">About & Hero</h1>
        <p className="text-gray-400 text-sm mt-1">Manage your personal information</p>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 mb-6">
        {(['hero', 'about'] as const).map(tab => (
          <button key={tab} onClick={() => setActiveTab(tab)}
            className={`px-4 py-2 rounded-xl text-sm font-medium capitalize transition-all ${activeTab === tab ? 'bg-indigo-600 text-white' : 'bg-white/5 text-gray-400 border border-white/10 hover:bg-white/10'}`}>
            {tab} Section
          </button>
        ))}
      </div>

      {activeTab === 'hero' && (
        <div className="bg-[#111118] border border-white/5 rounded-2xl p-6 space-y-5">
          <div className="grid grid-cols-2 gap-4">
            {[
              { label: 'Name', key: 'name', placeholder: 'ARG Rabby' },
              { label: 'Title', key: 'title', placeholder: 'Senior Full-Stack Developer' },
            ].map(({ label, key, placeholder }) => (
              <div key={key}>
                <label className="block text-sm text-gray-300 mb-1.5">{label}</label>
                <input value={hero[key] || ''} onChange={e => setHero((h: any) => ({ ...h, [key]: e.target.value }))}
                  className="w-full px-3 py-2.5 bg-white/5 border border-white/10 rounded-xl text-white text-sm focus:outline-none focus:border-indigo-500 transition-all" placeholder={placeholder} />
              </div>
            ))}
          </div>

          <div>
            <label className="block text-sm text-gray-300 mb-1.5">Description</label>
            <textarea value={hero.description || ''} onChange={e => setHero((h: any) => ({ ...h, description: e.target.value }))} rows={3}
              className="w-full px-3 py-2.5 bg-white/5 border border-white/10 rounded-xl text-white text-sm focus:outline-none focus:border-indigo-500 transition-all resize-none" />
          </div>

          <div>
            <label className="block text-sm text-gray-300 mb-2">Roles (typewriter)</label>
            <div className="flex gap-2 mb-2">
              <input value={roleInput} onChange={e => setRoleInput(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && (e.preventDefault(), setHero((h: any) => ({ ...h, roles: [...(h.roles || []), roleInput.trim()] })), setRoleInput(''))}
                className="flex-1 px-3 py-2 bg-white/5 border border-white/10 rounded-xl text-white text-sm focus:outline-none focus:border-indigo-500 transition-all" placeholder="Add role (Enter)" />
              <button onClick={() => { if (roleInput.trim()) { setHero((h: any) => ({ ...h, roles: [...(h.roles || []), roleInput.trim()] })); setRoleInput(''); } }}
                className="px-3 py-2 bg-indigo-600 text-white rounded-xl text-sm">Add</button>
            </div>
            <div className="flex flex-wrap gap-2">
              {hero.roles?.map((r: string, i: number) => (
                <span key={i} className="flex items-center gap-1.5 px-3 py-1 bg-white/5 border border-white/10 text-gray-300 text-sm rounded-lg">
                  {r}
                  <button onClick={() => setHero((h: any) => ({ ...h, roles: h.roles.filter((_: any, idx: number) => idx !== i) }))} className="text-gray-500 hover:text-red-400 transition-all"><FiX size={12} /></button>
                </span>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-sm text-gray-300 mb-2">Stats</label>
            <div className="flex gap-2 mb-2">
              <input value={statLabel} onChange={e => setStatLabel(e.target.value)} placeholder="Label (e.g. Years Exp.)"
                className="flex-1 px-3 py-2 bg-white/5 border border-white/10 rounded-xl text-white text-sm focus:outline-none focus:border-indigo-500 transition-all" />
              <input value={statValue} onChange={e => setStatValue(e.target.value)} placeholder="Value (e.g. 7+)"
                className="w-28 px-3 py-2 bg-white/5 border border-white/10 rounded-xl text-white text-sm focus:outline-none focus:border-indigo-500 transition-all" />
              <button onClick={() => { if (statLabel && statValue) { setHero((h: any) => ({ ...h, stats: [...(h.stats || []), { label: statLabel, value: statValue }] })); setStatLabel(''); setStatValue(''); } }}
                className="px-3 py-2 bg-indigo-600 text-white rounded-xl text-sm"><FiPlus size={14} /></button>
            </div>
            <div className="flex flex-wrap gap-2">
              {hero.stats?.map((s: any, i: number) => (
                <span key={i} className="flex items-center gap-1.5 px-3 py-1 bg-indigo-500/10 border border-indigo-500/20 text-indigo-300 text-sm rounded-lg">
                  <strong>{s.value}</strong> {s.label}
                  <button onClick={() => setHero((h: any) => ({ ...h, stats: h.stats.filter((_: any, idx: number) => idx !== i) }))} className="text-gray-500 hover:text-red-400"><FiX size={12} /></button>
                </span>
              ))}
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button onClick={() => setHero((h: any) => ({ ...h, availableForWork: !h.availableForWork }))}
              className={`relative w-11 h-6 rounded-full transition-all ${hero.availableForWork ? 'bg-green-600' : 'bg-white/10'}`}>
              <span className={`absolute top-1 w-4 h-4 bg-white rounded-full shadow transition-all ${hero.availableForWork ? 'left-6' : 'left-1'}`} />
            </button>
            <span className="text-sm text-gray-300">Available for work</span>
          </div>

          <div className="flex justify-end">
            <button onClick={saveHero} disabled={savingHero}
              className="flex items-center gap-2 px-6 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-sm font-medium disabled:opacity-60 transition-all">
              <FiSave size={14} /> {savingHero ? 'Saving...' : 'Save Hero'}
            </button>
          </div>
        </div>
      )}

      {activeTab === 'about' && (
        <div className="bg-[#111118] border border-white/5 rounded-2xl p-6 space-y-4">
          <div className="grid grid-cols-2 gap-4">
            {[
              { label: 'Location', key: 'location' },
              { label: 'Email', key: 'email' },
              { label: 'Phone', key: 'phone' },
              { label: 'GitHub URL', key: 'github' },
              { label: 'LinkedIn URL', key: 'linkedin' },
              { label: 'Current Focus', key: 'currentFocus' },
              { label: 'Years Experience', key: 'yearsExperience' },
              { label: 'Avatar URL', key: 'avatar' },
            ].map(({ label, key }) => (
              <div key={key}>
                <label className="block text-sm text-gray-300 mb-1.5">{label}</label>
                <input value={about[key] || ''} onChange={e => setAbout((a: any) => ({ ...a, [key]: e.target.value }))}
                  className="w-full px-3 py-2.5 bg-white/5 border border-white/10 rounded-xl text-white text-sm focus:outline-none focus:border-indigo-500 transition-all" />
              </div>
            ))}
          </div>

          <div>
            <label className="block text-sm text-gray-300 mb-1.5">Bio</label>
            <textarea value={about.bio || ''} onChange={e => setAbout((a: any) => ({ ...a, bio: e.target.value }))} rows={4}
              className="w-full px-3 py-2.5 bg-white/5 border border-white/10 rounded-xl text-white text-sm focus:outline-none focus:border-indigo-500 transition-all resize-none" />
          </div>

          <div>
            <label className="block text-sm text-gray-300 mb-2">Highlights</label>
            <div className="flex gap-2 mb-2">
              <input value={highlightInput} onChange={e => setHighlightInput(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && (e.preventDefault(), setAbout((a: any) => ({ ...a, highlights: [...(a.highlights || []), highlightInput.trim()] })), setHighlightInput(''))}
                className="flex-1 px-3 py-2 bg-white/5 border border-white/10 rounded-xl text-white text-sm focus:outline-none focus:border-indigo-500 transition-all" placeholder="Add highlight" />
              <button onClick={() => { if (highlightInput.trim()) { setAbout((a: any) => ({ ...a, highlights: [...(a.highlights || []), highlightInput.trim()] })); setHighlightInput(''); } }}
                className="px-3 py-2 bg-indigo-600 text-white rounded-xl text-sm">Add</button>
            </div>
            <div className="flex flex-wrap gap-2">
              {about.highlights?.map((h: string, i: number) => (
                <span key={i} className="flex items-center gap-1.5 px-3 py-1 bg-white/5 border border-white/10 text-gray-300 text-sm rounded-lg">
                  {h}
                  <button onClick={() => setAbout((a: any) => ({ ...a, highlights: a.highlights.filter((_: any, idx: number) => idx !== i) }))} className="text-gray-500 hover:text-red-400"><FiX size={12} /></button>
                </span>
              ))}
            </div>
          </div>

          <div className="flex justify-end">
            <button onClick={saveAbout} disabled={savingAbout}
              className="flex items-center gap-2 px-6 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-sm font-medium disabled:opacity-60 transition-all">
              <FiSave size={14} /> {savingAbout ? 'Saving...' : 'Save About'}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
