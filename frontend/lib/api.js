import axios from 'axios';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Auth
export const authAPI = {
  login: (walletAddress) => api.post('/api/auth/login', { walletAddress }),
  getUser: (walletAddress) => api.get(`/api/auth/user/${walletAddress}`),
  updateUser: (userId, data) => api.put(`/api/auth/user/${userId}`, data),
};

// Tracks
export const tracksAPI = {
  getAllTracks: () => api.get('/api/tracks'),
  getTrackById: (trackId) => api.get(`/api/tracks/${trackId}`),
  createTrack: (data) => api.post('/api/admin/tracks', data),
  updateTrack: (trackId, data) => api.put(`/api/admin/tracks/${trackId}`, data),
};

// Lessons
export const lessonsAPI = {
  getLessonById: (lessonId) => api.get(`/api/lessons/${lessonId}`),
  createLesson: (data) => api.post('/api/admin/lessons', data),
};

// Progress
export const progressAPI = {
  enroll: (userId, trackId) => api.post('/api/progress/enroll', { userId, trackId }),
  getProgress: (userId) => api.get(`/api/progress/${userId}`),
  completeLesson: (userId, trackId, lessonId) =>
    api.post('/api/progress/complete-lesson', { userId, trackId, lessonId }),
  completeQuiz: (userId, trackId, quizId, score) =>
    api.post('/api/progress/complete-quiz', { userId, trackId, quizId, score }),
};

// Certificates
export const certificatesAPI = {
  issue: (userId, trackId) => api.post('/api/certificates/issue', { userId, trackId }),
  getCertificates: (userId) => api.get(`/api/certificates/${userId}`),
};

// Jobs
export const jobsAPI = {
  getAllJobs: (category, search) =>
    api.get('/api/jobs', { params: { category, search } }),
  getJobById: (jobId) => api.get(`/api/jobs/${jobId}`),
  applyJob: (userId, jobId) => api.post('/api/jobs/apply', { userId, jobId }),
  saveJob: (userId, jobId) => api.post('/api/jobs/save', { userId, jobId }),
  getSavedJobs: (userId) => api.get(`/api/jobs/saved/${userId}`),
  createJob: (data) => api.post('/api/admin/jobs', data),
};

// Admin
export const adminAPI = {
  getStats: () => api.get('/api/admin/stats'),
};

export default api;