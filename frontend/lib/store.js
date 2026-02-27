import { create } from 'zustand';

export const useAuthStore = create((set) => ({
  user: null,
  isConnected: false,
  isPro: false,
  setUser: (user) => set({ user, isConnected: !!user }),
  logout: () => set({ user: null, isConnected: false }),
  setPro: (isPro) => set({ isPro }),
}));

export const useLearningStore = create((set) => ({
  enrolledTracks: [],
  completedLessons: [],
  completedQuizzes: [],
  totalXP: 0,
  badges: [],
  setEnrolledTracks: (tracks) => set({ enrolledTracks: tracks }),
  setCompletedLessons: (lessons) => set({ completedLessons: lessons }),
  addXP: (amount) => set((state) => ({ totalXP: state.totalXP + amount })),
  addBadge: (badge) => set((state) => ({ badges: [...state.badges, badge] })),
}));

export const useJobStore = create((set) => ({
  savedJobs: [],
  appliedJobs: [],
  setSavedJobs: (jobs) => set({ savedJobs: jobs }),
  setAppliedJobs: (jobs) => set({ appliedJobs: jobs }),
  toggleSaveJob: (jobId) =>
    set((state) => ({
      savedJobs: state.savedJobs.includes(jobId)
        ? state.savedJobs.filter((id) => id !== jobId)
        : [...state.savedJobs, jobId],
    })),
}));