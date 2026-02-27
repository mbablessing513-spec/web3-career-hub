'use client';

import { useEffect, useState } from 'react';
import { tracksAPI, progressAPI } from '@/lib/api';
import { useAuthStore } from '@/lib/store';
import Sidebar from '@/components/Sidebar';
import Header from '@/components/Header';
import TrackCard from '@/components/TrackCard';

export default function Learn() {
  const { user } = useAuthStore();
  const [tracks, setTracks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    loadTracks();
  }, []);

  const loadTracks = async () => {
    try {
      const response = await tracksAPI.getAllTracks();
      setTracks(response.data.tracks);
    } catch (error) {
      console.error('Failed to load tracks:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleEnroll = async (trackId) => {
    if (!user) {
      alert('Please connect your wallet first');
      return;
    }

    try {
      await progressAPI.enroll(user.id, trackId);
      alert('Enrolled successfully!');
    } catch (error) {
      console.error('Enrollment failed:', error);
      alert('Failed to enroll');
    }
  };

  const filteredTracks = filter === 'all' 
    ? tracks 
    : tracks.filter(track => track.category === filter);

  return (
    <div className="flex min-h-screen bg-dark-950">
      <Sidebar />
      <div className="ml-64 flex-1">
        <Header />
        
        <main className="p-8">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-4xl font-bold mb-2">Learning Paths</h1>
            <p className="text-gray-400">Master Web3 skills with structured, progressive learning</p>
          </div>

          {/* Filter Tabs */}
          <div className="flex gap-2 mb-8 overflow-x-auto pb-2">
            {['all', 'Fundamentals', 'Development', 'Non-Technical', 'Web3 Specializations'].map((cat) => (
              <button
                key={cat}
                onClick={() => setFilter(cat)}
                className={`px-4 py-2 rounded-lg font-medium whitespace-nowrap transition-all ${
                  filter === cat
                    ? 'glass bg-neon-blue/30 text-neon-blue'
                    : 'glass hover:bg-white/10'
                }`}
              >
                {cat.charAt(0).toUpperCase() + cat.slice(1)}
              </button>
            ))}
          </div>

          {/* Tracks Grid */}
          {loading ? (
            <p className="text-gray-400">Loading tracks...</p>
          ) : filteredTracks.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredTracks.map((track) => (
                <div key={track.id}>
                  <TrackCard track={track} />
                  <button
                    onClick={() => handleEnroll(track.id)}
                    className="mt-4 btn-neon w-full"
                  >
                    {track.isPaid ? `Enroll - $${track.price}` : 'Enroll Free'}
                  </button>
                </div>
              ))}
            </div>
          ) : (
            <div className="glass p-12 text-center">
              <p className="text-gray-400">No tracks found</p>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}