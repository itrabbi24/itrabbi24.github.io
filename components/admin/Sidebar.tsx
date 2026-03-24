'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { signOut } from 'next-auth/react';
import {
  FiGrid, FiFolder, FiCode, FiBriefcase, FiAward,
  FiMessageSquare, FiUser, FiLogOut, FiExternalLink
} from 'react-icons/fi';

const navItems = [
  { href: '/admin', label: 'Dashboard', icon: FiGrid, exact: true },
  { href: '/admin/projects', label: 'Projects', icon: FiFolder },
  { href: '/admin/skills', label: 'Skills', icon: FiCode },
  { href: '/admin/experience', label: 'Experience', icon: FiBriefcase },
  { href: '/admin/certifications', label: 'Certifications', icon: FiAward },
  { href: '/admin/messages', label: 'Messages', icon: FiMessageSquare },
  { href: '/admin/about', label: 'About & Hero', icon: FiUser },
];

export default function Sidebar() {
  const pathname = usePathname();

  const isActive = (href: string, exact?: boolean) => {
    if (exact) return pathname === href;
    return pathname.startsWith(href);
  };

  return (
    <aside className="w-64 min-h-screen bg-[#0d0d15] border-r border-white/5 flex flex-col">
      {/* Logo */}
      <div className="p-6 border-b border-white/5">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center shadow-lg shadow-indigo-500/20">
            <span className="text-white font-bold text-sm">R</span>
          </div>
          <div>
            <p className="text-white font-bold text-sm">ARG Rabby</p>
            <p className="text-gray-500 text-xs">Portfolio Admin</p>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-1">
        {navItems.map(({ href, label, icon: Icon, exact }) => (
          <Link
            key={href}
            href={href}
            className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all ${
              isActive(href, exact)
                ? 'bg-indigo-500/15 text-indigo-400 border border-indigo-500/20'
                : 'text-gray-400 hover:text-white hover:bg-white/5'
            }`}
          >
            <Icon size={16} />
            {label}
          </Link>
        ))}
      </nav>

      {/* Footer */}
      <div className="p-4 border-t border-white/5 space-y-1">
        <Link
          href="/"
          target="_blank"
          className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm text-gray-400 hover:text-white hover:bg-white/5 transition-all"
        >
          <FiExternalLink size={16} />
          View Portfolio
        </Link>
        <button
          onClick={() => signOut({ callbackUrl: '/admin/login' })}
          className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm text-gray-400 hover:text-red-400 hover:bg-red-500/5 transition-all"
        >
          <FiLogOut size={16} />
          Sign Out
        </button>
      </div>
    </aside>
  );
}
