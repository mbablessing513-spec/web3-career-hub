'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { tracksAPI, progressAPI } from '@/lib/api';
import { useAuthStore } from '@/lib/store';
import Sidebar from '@/components/Sidebar';
import Header from '@/components/Header';
import ProgressBar from '@/components/ProgressBar';

export default function TrackDetail() {
  const params = useParams();
  const { user } = useAuthStore();
  const [track, setTrack] = useState(null);
  const [lessons, setLessons] = useState([]);
  const [selectedLesson, setSelectedLesson] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (params.trackId) {
      loadTrack();
    }
  }, [params.trackId]);

  const loadTrack = async () => {
    try {
      const response = await tracksAPI.getTrackById(params.trackId);
      setTrack(response.data.track);
      setLessons(response.data.lessons);
      if (response.data.lessons.length > 0) {
        setSelectedLesson(response.data.lessons[0]);
      }
    } catch (error) {
      console.error('Failed to load track:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleCompleteLesson = async () => {
    if (!user || !selectedLesson) return;

    try {
      await progressAPI.completeLesson(user.id, track.id, selectedLesson.id);
      alert('Lesson marked as complete! +10 XP');
      
      // Move to next lesson
      const currentIndex = lessons.findIndex(l => l.id === selectedLesson.id);
      if (currentIndex < lessons.length - 1) {
        setSelectedLesson(lessons[currentIndex + 1]);
      }
    } catch (error) {
      console.error('Failed to complete lesson:', error);
    }
  };

  const handleQuizSubmit = async (score) => {
    if (!user) return;

    try {
      await progressAPI.completeQuiz(user.id, track.id, 'quiz-' + selectedLesson.id, score);
      alert(`Quiz completed! Score: ${score}%`);
    } catch (error) {
      console.error('Failed to submit quiz:', error);
    }
  };

  if (loading) {
    return (
      <div className="flex min-h-screen bg-dark-950">
        <Sidebar />
        <div className="ml-64 flex-1">
          <Header />
          <div className="p-8">
            <p>Loading...</p>
          </div>
        </div>
      </div>
    );
  }

  if (!track) {
    return (
      <div className="flex min-h-screen bg-dark-950">
        <Sidebar />
        <div className="ml-64 flex-1">
          <Header />
          <div className="p-8">
            <p>Track not found</p>
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
          {/* Track Header */}
          <div className="mb-8">
            <h1 className="text-4xl font-bold mb-2">{track.title}</h1>
            <p className="text-gray-400 mb-4">{track.description}</p>
            <div className="flex gap-4">
              <span className="px-3 py-1 bg-neon-blue/20 text-neon-blue rounded text-sm">
                {track.difficulty}
              </span>
              <span className="px-3 py-1 bg-neon-purple/20 text-neon-purple rounded text-sm">
                {lessons.length} lessons
              </span>
            </div>
          </div>

          {/* Main Content */}
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Lessons Sidebar */}
            <div className="lg:col-span-1">
              <div className="glass p-6 sticky top-24">
                <h3 className="font-bold text-lg mb-4">Lessons</h3>
                <div className="space-y-2">
                  {lessons.map((lesson, index) => (
                    <button
                      key={lesson.id}
                      onClick={() => setSelectedLesson(lesson)}
                      className={`w-full text-left px-4 py-3 rounded-lg transition-all ${
                        selectedLesson?.id === lesson.id
                          ? 'glass bg-neon-blue/30'
                          : 'hover:glass hover:bg-white/5'
                      }`}
                    >
                      <div className="text-sm font-medium flex items-center gap-2">
                        <span className="text-lg">📖</span>
                        <span>Lesson {index + 1}</span>
                      </div>
                      <p className="text-xs text-gray-400 mt-1">{lesson.title}</p>
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Lesson Content */}
            {selectedLesson && (
              <div className="lg:col-span-3">
                <div className="glass p-8 mb-6">
                  {/* Video Placeholder */}
                  <div className="w-full h-96 bg-gradient-to-br from-neon-blue/20 via-neon-purple/20 to-neon-pink/20 rounded-lg flex items-center justify-center mb-6">
                    <div className="text-center">
                      <div className="text-6xl mb-4">🎥</div>
                      <p className="text-gray-400">Video content placeholder</p>
                      <p className="text-sm text-gray-500 mt-2">Duration: ~{selectedLesson.duration || 10} mins</p>
                    </div>
                  </div>

                  {/* Lesson Title */}
                  <h2 className="text-3xl font-bold mb-4">{selectedLesson.title}</h2>
                  
                  {/* Lesson Content */}
                  <div className="prose prose-invert max-w-none mb-8">
                    <p className="text-gray-300 leading-relaxed">
                      {selectedLesson.description || 'This is a comprehensive lesson covering important Web3 concepts. Complete this lesson and the quiz to earn XP and progress through the track.'}
                    </p>
                  </div>

                  {/* Key Takeaways */}
                  <div className="glass-sm p-6 mb-6">
                    <h3 className="font-bold mb-3">Key Takeaways</h3>
                    <ul className="space-y-2 text-sm text-gray-300">
                      <li>✓ Understand fundamental Web3 concepts</li>
                      <li>✓ Learn practical implementation techniques</li>
                      <li>✓ Master best practices and security</li>
                    </ul>
                  </div>

                  {/* Complete Lesson Button */}
                  <button
                    onClick={handleCompleteLesson}
                    disabled={!user}
                    className="btn-neon w-full mb-6 disabled:opacity-50"
                  >
                    {user ? '✓ Mark as Complete' : 'Connect wallet to continue'}
                  </button>
                </div>

                {/* Quiz Section */}
                <div className="glass p-8">
                  <h3 className="text-2xl font-bold mb-6">Knowledge Check Quiz</h3>
                  
                  <div className="space-y-4">
                    {[1, 2, 3].map((q) => (
                      <div key={q} className="glass-sm p-4">
                        <p className="font-medium mb-3">Question {q}: What is the key concept?</p>
                        <div className="space-y-2">
                          {['Option A', 'Option B', 'Option C', 'Option D'].map((opt, idx) => (
                            <label key={idx} className="flex items-center gap-3 cursor-pointer">
                              <input type="radio" name={`q${q}`} className="w-4 h-4" />
                              <span className="text-sm">{opt}</span>
                            </label>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>

                  <button
                    onClick={() => handleQuizSubmit(85)}
                    disabled={!user}
                    className="btn-neon w-full mt-6 disabled:opacity-50"
                  >
                    {user ? 'Submit Quiz' : 'Connect wallet to submit'}
                  </button>
                </div>
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
}