'use client';
import { useState, useEffect } from 'react';
import { FiMail, FiTrash2, FiCheck, FiClock } from 'react-icons/fi';

interface Message {
  _id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  read: boolean;
  createdAt: string;
}

export default function MessagesAdmin() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState<Message | null>(null);

  useEffect(() => { fetchMessages(); }, []);

  const fetchMessages = async () => {
    setLoading(true);
    const res = await fetch('/api/contact');
    const data = await res.json();
    setMessages(Array.isArray(data) ? data : []);
    setLoading(false);
  };

  const markRead = async (id: string) => {
    await fetch(`/api/messages/${id}`, { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ read: true }) });
    setMessages(m => m.map(msg => msg._id === id ? { ...msg, read: true } : msg));
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Delete this message?')) return;
    await fetch(`/api/messages/${id}`, { method: 'DELETE' });
    setMessages(m => m.filter(msg => msg._id !== id));
    if (selected?._id === id) setSelected(null);
  };

  const openMessage = async (msg: Message) => {
    setSelected(msg);
    if (!msg.read) await markRead(msg._id);
  };

  const unread = messages.filter(m => !m.read).length;

  return (
    <div className="p-8">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-white">Messages</h1>
        <p className="text-gray-400 text-sm mt-1">
          {messages.length} total {unread > 0 && <span className="text-indigo-400 font-medium">· {unread} unread</span>}
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-4 h-[calc(100vh-200px)]">
        {/* List */}
        <div className="lg:col-span-2 bg-[#111118] border border-white/5 rounded-2xl overflow-y-auto">
          {loading ? (
            <div className="p-4 space-y-3">
              {[...Array(4)].map((_, i) => <div key={i} className="h-20 bg-white/5 rounded-xl animate-pulse" />)}
            </div>
          ) : messages.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-gray-500 gap-3">
              <FiMail size={40} />
              <p>No messages yet</p>
            </div>
          ) : (
            <div className="divide-y divide-white/5">
              {messages.map(msg => (
                <button
                  key={msg._id}
                  onClick={() => openMessage(msg)}
                  className={`w-full text-left p-4 hover:bg-white/5 transition-all ${selected?._id === msg._id ? 'bg-indigo-500/10' : ''}`}
                >
                  <div className="flex items-start justify-between gap-2 mb-1">
                    <div className="flex items-center gap-2">
                      {!msg.read && <span className="w-2 h-2 bg-indigo-500 rounded-full shrink-0 mt-0.5" />}
                      <p className={`text-sm font-medium ${msg.read ? 'text-gray-300' : 'text-white'}`}>{msg.name}</p>
                    </div>
                    <p className="text-xs text-gray-600 shrink-0">{new Date(msg.createdAt).toLocaleDateString()}</p>
                  </div>
                  <p className="text-xs text-gray-400 line-clamp-1 ml-4">{msg.subject}</p>
                  <p className="text-xs text-gray-600 line-clamp-1 ml-4 mt-0.5">{msg.message}</p>
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Detail */}
        <div className="lg:col-span-3 bg-[#111118] border border-white/5 rounded-2xl">
          {selected ? (
            <div className="h-full flex flex-col">
              <div className="p-6 border-b border-white/5 flex items-start justify-between">
                <div>
                  <h2 className="text-white font-semibold">{selected.subject}</h2>
                  <p className="text-gray-400 text-sm mt-1">From: <span className="text-gray-300">{selected.name}</span> &lt;{selected.email}&gt;</p>
                  <p className="text-gray-600 text-xs mt-1 flex items-center gap-1">
                    <FiClock size={11} />
                    {new Date(selected.createdAt).toLocaleString()}
                  </p>
                </div>
                <div className="flex gap-2">
                  {!selected.read && (
                    <button onClick={() => markRead(selected._id)} className="p-2 bg-green-500/10 border border-green-500/20 text-green-400 rounded-xl hover:bg-green-500/20 transition-all" title="Mark as read">
                      <FiCheck size={16} />
                    </button>
                  )}
                  <button onClick={() => handleDelete(selected._id)} className="p-2 bg-red-500/10 border border-red-500/20 text-red-400 rounded-xl hover:bg-red-500/20 transition-all" title="Delete">
                    <FiTrash2 size={16} />
                  </button>
                </div>
              </div>
              <div className="p-6 flex-1 overflow-y-auto">
                <p className="text-gray-300 text-sm leading-relaxed whitespace-pre-wrap">{selected.message}</p>
              </div>
              <div className="p-6 border-t border-white/5">
                <a
                  href={`mailto:${selected.email}?subject=Re: ${selected.subject}`}
                  className="inline-flex items-center gap-2 px-4 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-sm font-medium transition-all"
                >
                  <FiMail size={14} /> Reply via Email
                </a>
              </div>
            </div>
          ) : (
            <div className="h-full flex flex-col items-center justify-center text-gray-600 gap-3">
              <FiMail size={48} />
              <p>Select a message to read</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
