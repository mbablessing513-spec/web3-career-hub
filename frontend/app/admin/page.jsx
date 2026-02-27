'use client';

import { useEffect, useState } from 'react';
import { useAuthStore } from '@/lib/store';
import { adminAPI, tracksAPI, jobsAPI } from '@/lib/api';
import Sidebar from '@/components/Sidebar';
import Header from '@/components/Header';

export default function AdminPanel() {
  const { user } = useAuthStore();
  const [stats, setStats] = useState(null);
  const [activeTab, setActiveTab] = useState('overview');
  const [loading, setLoading] = useState(true);
  
  // Form states
  const [trackForm, setTrackForm] = useState({ title: '', description: '', category: '', difficulty: '' });
  const [jobForm, setJobForm] = useState({ title: '', company: '', description: '', category: '', salaryMin: '', salaryMax: '' });

  useEffect(() => {
    if (user) {
      loadStats();
    }
  }, [user]);

  const loadStats = async () => {
    try {
      const response = await adminAPI.getStats();
      setStats(response.data.stats);
    } catch (error) {
      console.error('Failed to load stats:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleCreateTrack = async (e) => {
    e.preventDefault();
    try {
      await tracksAPI.createTrack({
        ...trackForm,
        totalLessons: 10,
        isPaid: 0,
        price: 0
      });
      setTrackForm({ title: '', description: '', category: '', difficulty: '' });
      alert('Track created successfully');
      loadStats();
    } catch (error) {
      console.error('Failed to create track:', error);
      alert('Failed to create track');
    }
  };

  const handlePostJob = async (e) => {
    e.preventDefault();
    try {
      await jobsAPI.createJob({
        ...jobForm,
        requiredSkills: ['Web3', 'Blockchain']
      });
      setJobForm({ title: '', company: '', description: '', category: '', salaryMin: '', salaryMax: '' });
      alert('Job posted successfully');
      loadStats();
    } catch (error) {
      console.error('Failed to post job:', error);
      alert('Failed to post job');
    }
  };

  if (!user) {
    return (
      <div className="flex min-h-screen bg-dark-950">
        <Sidebar />
        <div className="ml-64 flex-1">
          <Header />
          <div className="p-8">
            <p className="text-gray-400">Admin access required</p>
          </div>
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
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-4xl font-bold mb-2">Admin Dashboard</h1>
            <p className="text-gray-400">Manage platform content and monitor statistics</p>
          </div>

          {/* Tabs */}
          <div className="flex gap-2 mb-8 border-b border-white/10">
            {['overview', 'tracks', 'jobs'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-4 py-3 font-medium border-b-2 transition-all ${
                  activeTab === tab
                    ? 'border-neon-blue text-neon-blue'
                    : 'border-transparent text-gray-400 hover:text-white'
                }`}
              >
                {tab.charAt(0).toUpperCase() + tab.slice(1)}
              </button>
            ))}
          </div>

          {/* Overview Tab */}
          {activeTab === 'overview' && (
            <div>
              {loading ? (
                <p className="text-gray-400">Loading...</p>
              ) : stats ? (
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                  <div className="glass p-6">
                    <div className="text-3xl font-bold text-neon-blue mb-2">{stats.totalUsers}</div>
                    <p className="text-sm text-gray-400">Total Users</p>
                  </div>
                  <div className="glass p-6">
                    <div className="text-3xl font-bold text-neon-purple mb-2">{stats.totalTracks}</div>
                    <p className="text-sm text-gray-400">Learning Tracks</p>
                  </div>
                  <div className="glass p-6">
                    <div className="text-3xl font-bold text-neon-pink mb-2">{stats.totalEnrollments}</div>
                    <p className="text-sm text-gray-400">Total Enrollments</p>
                  </div>
                  <div className="glass p-6">
                    <div className="text-3xl font-bold text-neon-green mb-2">{stats.totalJobs}</div>
                    <p className="text-sm text-gray-400">Job Listings</p>
                  </div>
                </div>
              ) : null}
            </div>
          )}

          {/* Tracks Tab */}
          {activeTab === 'tracks' && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div className="glass p-6">
                <h2 className="text-2xl font-bold mb-6">Create New Track</h2>
                <form onSubmit={handleCreateTrack} className="space-y-4">
                  <input
                    type="text"
                    placeholder="Track Title"
                    value={trackForm.title}
                    onChange={(e) => setTrackForm({ ...trackForm, title: e.target.value })}
                    className="glass w-full px-4 py-2 rounded-lg outline-none focus:ring-2 focus:ring-neon-blue"
                    required
                  />
                  <textarea
                    placeholder="Description"
                    value={trackForm.description}
                    onChange={(e) => setTrackForm({ ...trackForm, description: e.target.value })}
                    className="glass w-full px-4 py-2 rounded-lg outline-none focus:ring-2 focus:ring-neon-blue"
                    rows="3"
                    required
                  />
                  <select
                    value={trackForm.category}
                    onChange={(e) => setTrackForm({ ...trackForm, category: e.target.value })}
                    className="glass w-full px-4 py-2 rounded-lg outline-none focus:ring-2 focus:ring-neon-blue text-white bg-dark-900"
                    required
                  >
                    <option value="">Select Category</option>
                    <option value="Fundamentals">Fundamentals</option>
                    <option value="Development">Development</option>
                    <option value="Non-Technical">Non-Technical</option>
                    <option value="Web3 Specializations">Web3 Specializations</option>
                  </select>
                  <select
                    value={trackForm.difficulty}
                    onChange={(e) => setTrackForm({ ...trackForm, difficulty: e.target.value })}
                    className="glass w-full px-4 py-2 rounded-lg outline-none focus:ring-2 focus:ring-neon-blue text-white bg-dark-900"
                    required
                  >
                    <option value="">Select Difficulty</option>
                    <option value="beginner">Beginner</option>
                    <option value="intermediate">Intermediate</option>
                    <option value="advanced">Advanced</option>
                  </select>
                  <button type="submit" className="btn-neon w-full">
                    Create Track
                  </button>
                </form>
              </div>
            </div>
          )}

          {/* Jobs Tab */}
          {activeTab === 'jobs' && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div className="glass p-6">
                <h2 className="text-2xl font-bold mb-6">Post New Job</h2>
                <form onSubmit={handlePostJob} className="space-y-4">
                  <input
                    type="text"
                    placeholder="Job Title"
                    value={jobForm.title}
                    onChange={(e) => setJobForm({ ...jobForm, title: e.target.value })}
                    className="glass w-full px-4 py-2 rounded-lg outline-none focus:ring-2 focus:ring-neon-blue"
                    required
                  />
                  <input
                    type="text"
                    placeholder="Company Name"
                    value={jobForm.company}
                    onChange={(e) => setJobForm({ ...jobForm, company: e.target.value })}
                    className="glass w-full px-4 py-2 rounded-lg outline-none focus:ring-2 focus:ring-neon-blue"
                    required
                  />
                  <textarea
                    placeholder="Job Description"
                    value={jobForm.description}
                    onChange={(e) => setJobForm({ ...jobForm, description: e.target.value })}
                    className="glass w-full px-4 py-2 rounded-lg outline-none focus:ring-2 focus:ring-neon-blue"
                    rows="3"
                    required
                  />
                  <select
                    value={jobForm.category}
                    onChange={(e) => setJobForm({ ...jobForm, category: e.target.value })}
                    className="glass w-full px-4 py-2 rounded-lg outline-none focus:ring-2 focus:ring-neon-blue text-white bg-dark-900"
                    required
                  >
                    <option value="">Select Category</option>
                    <option value="Developer">Developer</option>
                    <option value="Community Manager">Community Manager</option>
                    <option value="Smart Contract Auditor">Smart Contract Auditor</option>
                    <option value="DAO Operator">DAO Operator</option>
                  </select>
                  <div className="grid grid-cols-2 gap-2">
                    <input
                      type="number"
                      placeholder="Min Salary"
                      value={jobForm.salaryMin}
                      onChange={(e) => setJobForm({ ...jobForm, salaryMin: e.target.value })}
                      className="glass px-4 py-2 rounded-lg outline-none focus:ring-2 focus:ring-neon-blue"
                      required
                    />
                    <input
                      type="number"
                      placeholder="Max Salary"
                      value={jobForm.salaryMax}
                      onChange={(e) => setJobForm({ ...jobForm, salaryMax: e.target.value })}
                      className="glass px-4 py-2 rounded-lg outline-none focus:ring-2 focus:ring-neon-blue"
                      required
                    />
                  </div>
                  <button type="submit" className="btn-neon w-full">
                    Post Job
                  </button>
                </form>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}