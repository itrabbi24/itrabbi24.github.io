import connectDB from '@/lib/mongodb';
import Project from '@/lib/models/Project';
import Skill from '@/lib/models/Skill';
import Experience from '@/lib/models/Experience';
import Certification from '@/lib/models/Certification';
import ContactMessage from '@/lib/models/ContactMessage';
import { FiFolder, FiCode, FiBriefcase, FiAward, FiMessageSquare, FiDatabase } from 'react-icons/fi';
import SeedButton from '@/components/admin/SeedButton';

async function getStats() {
  await connectDB();
  const [projects, skills, experience, certifications, messages, unread] = await Promise.all([
    Project.countDocuments(),
    Skill.countDocuments(),
    Experience.countDocuments(),
    Certification.countDocuments(),
    ContactMessage.countDocuments(),
    ContactMessage.countDocuments({ read: false }),
  ]);
  return { projects, skills, experience, certifications, messages, unread };
}

export default async function AdminDashboard() {
  const stats = await getStats();

  const cards = [
    { label: 'Projects', value: stats.projects, icon: FiFolder, color: 'from-blue-500 to-cyan-500', bg: 'bg-blue-500/10', border: 'border-blue-500/20', href: '/admin/projects' },
    { label: 'Skills', value: stats.skills, icon: FiCode, color: 'from-purple-500 to-pink-500', bg: 'bg-purple-500/10', border: 'border-purple-500/20', href: '/admin/skills' },
    { label: 'Experience', value: stats.experience, icon: FiBriefcase, color: 'from-orange-500 to-red-500', bg: 'bg-orange-500/10', border: 'border-orange-500/20', href: '/admin/experience' },
    { label: 'Certifications', value: stats.certifications, icon: FiAward, color: 'from-green-500 to-emerald-500', bg: 'bg-green-500/10', border: 'border-green-500/20', href: '/admin/certifications' },
    { label: 'Messages', value: stats.messages, icon: FiMessageSquare, color: 'from-indigo-500 to-violet-500', bg: 'bg-indigo-500/10', border: 'border-indigo-500/20', href: '/admin/messages', badge: stats.unread > 0 ? stats.unread : undefined },
  ];

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-white">Dashboard</h1>
        <p className="text-gray-400 text-sm mt-1">Welcome back, Rabbi. Here's your portfolio overview.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
        {cards.map(({ label, value, icon: Icon, color, bg, border, href, badge }) => (
          <a key={label} href={href} className={`${bg} border ${border} rounded-2xl p-6 hover:scale-105 transition-all cursor-pointer group`}>
            <div className="flex items-center justify-between mb-4">
              <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${color} flex items-center justify-center shadow-lg`}>
                <Icon size={18} className="text-white" />
              </div>
              {badge !== undefined && (
                <span className="bg-red-500 text-white text-xs font-bold px-2 py-0.5 rounded-full">
                  {badge} new
                </span>
              )}
            </div>
            <p className="text-3xl font-bold text-white">{value}</p>
            <p className="text-gray-400 text-sm mt-1">{label}</p>
          </a>
        ))}
      </div>

      {/* Quick Actions */}
      <div className="bg-[#111118] border border-white/5 rounded-2xl p-6">
        <h2 className="text-white font-semibold mb-4 flex items-center gap-2">
          <FiDatabase size={16} className="text-indigo-400" />
          Quick Actions
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {[
            { label: 'Add Project', href: '/admin/projects' },
            { label: 'Add Skill', href: '/admin/skills' },
            { label: 'Add Experience', href: '/admin/experience' },
            { label: 'Add Certificate', href: '/admin/certifications' },
          ].map(({ label, href }) => (
            <a
              key={label}
              href={href}
              className="px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-sm text-gray-300 hover:text-white hover:bg-white/10 hover:border-indigo-500/30 transition-all text-center"
            >
              {label}
            </a>
          ))}
        </div>
      </div>

      {/* Seed Note */}
      <div className="mt-4 bg-amber-500/10 border border-amber-500/20 rounded-xl p-4">
        <p className="text-amber-400 text-sm">
          <strong>First time setup?</strong> Visit{' '}
          <code className="bg-amber-500/20 px-1 rounded text-xs">/api/seed</code>{' '}
          (POST request) to populate the database with initial data.
          Or use the button below.
        </p>
        <SeedButton />
      </div>
    </div>
  );
}

