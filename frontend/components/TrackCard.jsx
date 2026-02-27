'use client';

import Link from 'next/link';
import clsx from 'clsx';

const difficultyColors = {
  beginner: 'text-neon-green',
  intermediate: 'text-neon-blue',
  advanced: 'text-neon-pink',
};

export default function TrackCard({ track }) {
  return (
    <Link href={`/learn/${track.id}`}>
      <div className="glass group hover:bg-white/15 hover:border-neon-blue/50 cursor-pointer transition-all duration-300 overflow-hidden">
        {/* Header */}
        <div className="h-32 bg-gradient-to-br from-neon-blue/20 via-neon-purple/20 to-neon-pink/20 relative overflow-hidden">
          <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <div className="absolute inset-0 bg-gradient-to-r from-neon-blue to-neon-purple animate-pulse" />
          </div>
          <div className="relative z-10 h-full flex items-center justify-center text-5xl">
            {track.category === 'Fundamentals' && '⛓️'}
            {track.category === 'Development' && '💻'}
            {track.category === 'Non-Technical' && '🤝'}
            {track.category === 'Web3 Specializations' && '✨'}
          </div>
        </div>

        {/* Content */}
        <div className="p-6">
          <div className="flex items-start justify-between mb-2">
            <h3 className="font-bold text-lg group-hover:text-neon-blue transition-colors">{track.title}</h3>
            {track.isPaid && <span className="text-xs bg-neon-pink/30 px-2 py-1 rounded">Premium</span>}
          </div>
          <p className="text-sm text-gray-300 mb-4 line-clamp-2">{track.description}</p>

          {/* Metadata */}
          <div className="flex items-center justify-between text-xs text-gray-400">
            <span className={clsx('font-semibold', difficultyColors[track.difficulty])}>
              {track.difficulty.charAt(0).toUpperCase() + track.difficulty.slice(1)}
            </span>
            <span>📖 {track.totalLessons} lessons</span>
          </div>
        </div>
      </div>
    </Link>
  );
}