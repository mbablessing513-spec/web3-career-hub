'use client';

import { useState } from 'react';
import { jobsAPI } from '@/lib/api';
import { useAuthStore } from '@/lib/store';

export default function JobCard({ job, onAction }) {
  const [isApplying, setIsApplying] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [isSaved, setIsSaved] = useState(false);
  const { user } = useAuthStore();

  const handleApply = async () => {
    if (!user) {
      alert('Please connect your wallet first');
      return;
    }

    try {
      setIsApplying(true);
      await jobsAPI.applyJob(user.id, job.id);
      alert('Applied successfully!');
      onAction?.();
    } catch (error) {
      console.error('Application failed:', error);
      alert('Failed to apply to job');
    } finally {
      setIsApplying(false);
    }
  };

  const handleSave = async () => {
    if (!user) {
      alert('Please connect your wallet first');
      return;
    }

    try {
      setIsSaving(true);
      await jobsAPI.saveJob(user.id, job.id);
      setIsSaved(!isSaved);
    } catch (error) {
      console.error('Save failed:', error);
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="glass p-6 hover:bg-white/15 transition-all duration-300">
      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          <h3 className="text-lg font-bold hover:text-neon-blue transition-colors">{job.title}</h3>
          <p className="text-sm text-neon-blue">{job.company}</p>
        </div>
        <button
          onClick={handleSave}
          disabled={isSaving}
          className={`text-2xl transition-all ${isSaved ? 'animate-bounce' : ''}`}
        >
          {isSaved ? '❤️' : '🤍'}
        </button>
      </div>

      {/* Description */}
      <p className="text-sm text-gray-300 mb-4 line-clamp-2">{job.description}</p>

      {/* Tags */}
      <div className="flex flex-wrap gap-2 mb-4">
        <span className="text-xs bg-neon-blue/20 text-neon-blue px-2 py-1 rounded">
          {job.category}
        </span>
        {job.isSponsored && <span className="text-xs bg-neon-pink/20 text-neon-pink px-2 py-1 rounded">Sponsored</span>}
      </div>

      {/* Salary and Location */}
      <div className="flex items-center justify-between text-sm text-gray-400 mb-4">
        <span>📍 {job.location}</span>
        {job.salaryMin && (
          <span>💰 ${job.salaryMin.toLocaleString()} - ${job.salaryMax.toLocaleString()}</span>
        )}
      </div>

      {/* Button */}
      <button
        onClick={handleApply}
        disabled={isApplying}
        className="btn-neon w-full disabled:opacity-50"
      >
        {isApplying ? 'Applying...' : 'Apply Now'}
      </button>
    </div>
  );
}