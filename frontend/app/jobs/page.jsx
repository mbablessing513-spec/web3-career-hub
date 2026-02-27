'use client';

import { useEffect, useState } from 'react';
import { jobsAPI } from '@/lib/api';
import Sidebar from '@/components/Sidebar';
import Header from '@/components/Header';
import JobCard from '@/components/JobCard';

export default function Jobs() {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  const categories = ['all', 'Developer', 'Community Manager', 'Smart Contract Auditor', 'DAO Operator'];

  useEffect(() => {
    loadJobs();
  }, [selectedCategory, searchTerm]);

  const loadJobs = async () => {
    try {
      setLoading(true);
      const response = await jobsAPI.getAllJobs(
        selectedCategory === 'all' ? undefined : selectedCategory,
        searchTerm || undefined
      );
      setJobs(response.data.jobs);
    } catch (error) {
      console.error('Failed to load jobs:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen bg-dark-950">
      <Sidebar />
      <div className="ml-64 flex-1">
        <Header />
        
        <main className="p-8">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-4xl font-bold mb-2">Web3 Job Board</h1>
            <p className="text-gray-400">Discover remote blockchain opportunities from leading companies</p>
          </div>

          {/* Search and Filter */}
          <div className="flex flex-col gap-4 mb-8">
            <input
              type="text"
              placeholder="Search jobs by title or company..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="glass px-4 py-3 rounded-lg outline-none focus:ring-2 focus:ring-neon-blue"
            />

            <div className="flex gap-2 overflow-x-auto pb-2">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-4 py-2 rounded-lg font-medium whitespace-nowrap transition-all ${
                    selectedCategory === cat
                      ? 'glass bg-neon-blue/30 text-neon-blue'
                      : 'glass hover:bg-white/10'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* Job Count */}
          <p className="text-gray-400 mb-6">{jobs.length} jobs found</p>

          {/* Jobs Grid */}
          {loading ? (
            <p className="text-gray-400">Loading jobs...</p>
          ) : jobs.length > 0 ? (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {jobs.map((job) => (
                <JobCard key={job.id} job={job} onAction={loadJobs} />
              ))}
            </div>
          ) : (
            <div className="glass p-12 text-center">
              <p className="text-gray-400 mb-4">No jobs found matching your criteria</p>
              <button
                onClick={() => {
                  setSelectedCategory('all');
                  setSearchTerm('');
                }}
                className="btn-neon"
              >
                View All Jobs
              </button>
            </div>
          )}

          {/* Job Alert CTA */}
          <div className="mt-16 glass p-8 text-center">
            <h3 className="text-2xl font-bold mb-4">Get Job Alerts</h3>
            <p className="text-gray-400 mb-6">Subscribe to notifications for new Web3 job listings matching your skills</p>
            <div className="flex gap-2">
              <input
                type="email"
                placeholder="Enter your email"
                className="glass flex-1 px-4 py-3 rounded-lg outline-none focus:ring-2 focus:ring-neon-blue"
              />
              <button className="btn-neon">Subscribe</button>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}