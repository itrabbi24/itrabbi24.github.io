'use client';
export default function SeedButton() {
  const handleSeed = async () => {
    if (!confirm('This will add initial data to empty collections. Continue?')) return;
    const res = await fetch('/api/seed', { method: 'POST' });
    const data = await res.json();
    alert(data.message || 'Done!');
    window.location.reload();
  };
  return (
    <button
      onClick={handleSeed}
      className="mt-3 px-4 py-2 bg-amber-500/20 border border-amber-500/30 text-amber-400 text-sm rounded-lg hover:bg-amber-500/30 transition-all"
    >
      Seed Database
    </button>
  );
}
