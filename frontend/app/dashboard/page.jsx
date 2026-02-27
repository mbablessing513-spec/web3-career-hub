'use client';

import { useEffect, useState } from 'react';
import { useAuthStore, useLearningStore } from '@/lib/store';
import { progressAPI } from '@/lib/api';
import Sidebar from '@/components/Sidebar';
import Header from '@/components/Header';
import ProgressBar from '@/components/ProgressBar';
import Link from 'next/link';

export default function Dashboard() {
  const { user } = useAuthStore();
  const [enrolledTracks, setEnrolledTracks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) return;
    loadProgress();
  }, [user]);

  const loadProgress = async () => {
    try {
      const response = await progressAPI.getProgress(user.id);
      setEnrolledTracks(response.data.progress);
    } catch (error) {
      console.error('Failed to load progress:', error);
    } finally {
      setLoading(false);
    }
  };

  if (!user) {
    return (
      <div className="min-h-screen bg-dark-950 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-3xl font-bold mb-4">Please connect your wallet</h1>
          <p className="text-gray-400">to access your dashboard</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-dark-950">
      <Sidebar />
      <div className="ml-64 flex-1">
        <Header />
        
        <main className="p-8">
          {/* Welcome Section */}
          <div className="mb-8">
            <h1 className="text-4xl font-bold mb-2">Welcome back, {user.username || 'Learner'}!</h1>
            <p className="text-gray-400">Track your progress and continue learning</p>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
            <div className="glass p-6">
              <div className="text-3xl font-bold text-neon-blue mb-2">{user.xp || 0}</div>
              <p className="text-sm text-gray-400">Total XP</p>
            </div>
            <div className="glass p-6">
              <div className="text-3xl font-bold text-neon-purple mb-2">{enrolledTracks.length}</div>
              <p className="text-sm text-gray-400">Enrolled Tracks</p>
            </div>
            <div className="glass p-6">
              <div className="text-3xl font-bold text-neon-pink mb-2">{enrolledTracks.filter(t => t.isCompleted).length}</div>
              <p className="text-sm text-gray-400">Completed Tracks</p>
            </div>
            <div className="glass p-6">
              <div className="text-3xl font-bold text-neon-green mb-2">{(user.xp || 0) / 50}</div>
              <p className="text-sm text-gray-400">Badges Earned</p>
            </div>
          </div>

          {/* Enrolled Tracks */}
          <section>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold">My Learning Path</h2>
              <Link href="/learn" className="btn-glass text-sm">
                Browse More Tracks
              </Link>
            </div>

            {loading ? (
              <p className="text-gray-400">Loading...</p>
            ) : enrolledTracks.length > 0 ? (
              <div className="space-y-4">
                {enrolledTracks.map((track) => {
                  const completedCount = JSON.parse(track.completedLessons || '[]').length;
                  const percentage = (completedCount / 8) * 100; // Assuming 8 lessons per track

                  return (
                    <div key={track.id} className="glass p-6">
                      <div className="flex items-start justify-between mb-4">
                        <div>
                          <h3 className="text-lg font-bold mb-2">{track.trackId}</h3>
                          <div className="flex gap-2">
                            <span className="text-xs bg-neon-blue/20 text-neon-blue px-2 py-1 rounded">
                              {completedCount} lessons done
                            </span>
                            <span className="text-xs bg-neon-purple/20 text-neon-purple px-2 py-1 rounded">
                              {track.totalXP} XP
                            </span>
                          </div>
                        </div>
                        <Link
                          href={`/learn/${track.trackId}`}
                          className="btn-neon text-sm"
                        >
                          Continue
                        </Link>
                      </div>
                      <ProgressBar current={completedCount} total={8} />
                    </div>
                  );
                })}
              </div>
            ) : (
              <div className="glass p-12 text-center">
                <p className="text-gray-400 mb-4">You haven't enrolled in any tracks yet</p>
                <Link href="/learn" className="btn-neon">
                  Explore Learning Tracks
                </Link>
              </div>
            )}
          </section>

          {/* Recommended Skills */}
          <section className="mt-12">
            <h2 className="text-2xl font-bold mb-6">Recommended Next Skills</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="glass p-6">
                <div className="text-3xl mb-3">🏗️</div>
                <h3 className="font-bold mb-2">Smart Contracts 101</h3>
                <p className="text-sm text-gray-400 mb-4">Master Solidity basics</p>
                <button className="btn-glass text-sm w-full">Learn More</button>
              </div>
              <div className="glass p-6">
                <div className="text-3xl mb-3">💳</div>
                <h3 className="font-bold mb-2">DeFi Protocols</h3>
                <p className="text-sm text-gray-400 mb-4">Understand yield farming</p>
                <button className="btn-glass text-sm w-full">Learn More</button>
              </div>
              <div className="glass p-6">
                <div className="text-3xl mb-3">🎨</div>
                <h3 className="font-bold mb-2">NFT Creation</h3>
                <p className="text-sm text-gray-400 mb-4">Create and mint NFTs</p>
                <button className="btn-glass text-sm w-full">Learn More</button>
              </div>
            </div>
          </section>
        </main>
      </div>
    </div>
  );
}