'use client';

export default function ProgressBar({ current, total, label }) {
  const percentage = (current / total) * 100;

  return (
    <div className="w-full">
      {label && <p className="text-sm font-medium mb-2">{label}</p>}
      <div className="w-full h-2 glass overflow-hidden">
        <div
          className="h-full bg-gradient-to-r from-neon-blue to-neon-purple transition-all duration-300"
          style={{ width: `${percentage}%` }}
        />
      </div>
      <p className="text-xs text-gray-400 mt-1">{current} / {total}</p>
    </div>
  );
}