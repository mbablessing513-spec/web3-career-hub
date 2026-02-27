import express from 'express';
import cors from 'cors';
import db from './database.js';
import { v4 as uuidv4 } from 'uuid';

const app = express();
const PORT = 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'Backend is running' });
});

// ==================== AUTHENTICATION ====================
app.post('/api/auth/login', (req, res) => {
  const { walletAddress } = req.body;
  if (!walletAddress) {
    return res.status(400).json({ error: 'Wallet address is required' });
  }

  const userId = uuidv4();
  db.run(
    `INSERT OR IGNORE INTO users (id, walletAddress) VALUES (?, ?)`,
    [userId, walletAddress],
    (err) => {
      if (err) {
        return res.status(500).json({ error: 'Database error' });
      }
      db.get(`SELECT * FROM users WHERE walletAddress = ?`, [walletAddress], (err, user) => {
        if (err) return res.status(500).json({ error: 'Database error' });
        res.json({ user, token: uuidv4() });
      });
    }
  );
});

app.get('/api/auth/user/:walletAddress', (req, res) => {
  const { walletAddress } = req.params;
  db.get(`SELECT * FROM users WHERE walletAddress = ?`, [walletAddress], (err, user) => {
    if (err) return res.status(500).json({ error: 'Database error' });
    if (!user) return res.status(404).json({ error: 'User not found' });
    res.json({ user });
  });
});

app.put('/api/auth/user/:userId', (req, res) => {
  const { userId } = req.params;
  const { username, email, profileImage } = req.body;
  db.run(
    `UPDATE users SET username = ?, email = ?, profileImage = ? WHERE id = ?`,
    [username, email, profileImage, userId],
    function (err) {
      if (err) return res.status(500).json({ error: 'Database error' });
      db.get(`SELECT * FROM users WHERE id = ?`, [userId], (err, user) => {
        if (err) return res.status(500).json({ error: 'Database error' });
        res.json({ user });
      });
    }
  );
});

// ==================== LEARNING TRACKS ====================
app.get('/api/tracks', (req, res) => {
  db.all(`SELECT * FROM tracks ORDER BY createdAt DESC`, [], (err, tracks) => {
    if (err) return res.status(500).json({ error: 'Database error' });
    res.json({ tracks });
  });
});

app.get('/api/tracks/:trackId', (req, res) => {
  const { trackId } = req.params;
  db.get(`SELECT * FROM tracks WHERE id = ?`, [trackId], (err, track) => {
    if (err) return res.status(500).json({ error: 'Database error' });
    if (!track) return res.status(404).json({ error: 'Track not found' });

    db.all(`SELECT * FROM lessons WHERE trackId = ? ORDER BY orderIndex ASC`, [trackId], (err, lessons) => {
      if (err) return res.status(500).json({ error: 'Database error' });
      res.json({ track, lessons });
    });
  });
});

app.get('/api/lessons/:lessonId', (req, res) => {
  const { lessonId } = req.params;
  db.get(`SELECT * FROM lessons WHERE id = ?`, [lessonId], (err, lesson) => {
    if (err) return res.status(500).json({ error: 'Database error' });
    if (!lesson) return res.status(404).json({ error: 'Lesson not found' });

    db.get(`SELECT * FROM quizzes WHERE lessonId = ?`, [lessonId], (err, quiz) => {
      if (err) return res.status(500).json({ error: 'Database error' });
      res.json({ lesson, quiz });
    });
  });
});

// ==================== USER PROGRESS ====================
app.post('/api/progress/enroll', (req, res) => {
  const { userId, trackId } = req.body;
  const progressId = uuidv4();

  db.run(
    `INSERT OR IGNORE INTO userProgress (id, userId, trackId) VALUES (?, ?, ?)`,
    [progressId, userId, trackId],
    (err) => {
      if (err) return res.status(500).json({ error: 'Enrollment failed' });
      res.json({ message: 'Enrolled successfully', progressId });
    }
  );
});

app.get('/api/progress/:userId', (req, res) => {
  const { userId } = req.params;
  db.all(`SELECT * FROM userProgress WHERE userId = ?`, [userId], (err, progress) => {
    if (err) return res.status(500).json({ error: 'Database error' });
    res.json({ progress });
  });
});

app.post('/api/progress/complete-lesson', (req, res) => {
  const { userId, trackId, lessonId } = req.body;

  db.get(
    `SELECT * FROM userProgress WHERE userId = ? AND trackId = ?`,
    [userId, trackId],
    (err, progress) => {
      if (err) return res.status(500).json({ error: 'Database error' });
      if (!progress) return res.status(404).json({ error: 'Progress not found' });

      const completedLessons = JSON.parse(progress.completedLessons || '[]');
      if (!completedLessons.includes(lessonId)) {
        completedLessons.push(lessonId);
      }

      const xpEarned = 10;
      const newXP = progress.totalXP + xpEarned;

      db.run(
        `UPDATE userProgress SET completedLessons = ?, totalXP = ? WHERE id = ?`,
        [JSON.stringify(completedLessons), newXP, progress.id],
        (err) => {
          if (err) return res.status(500).json({ error: 'Database error' });

          db.run(
            `UPDATE users SET xp = xp + ? WHERE id = ?`,
            [xpEarned, userId],
            (err) => {
              if (err) return res.status(500).json({ error: 'Database error' });
              res.json({ message: 'Lesson marked complete', xpEarned });
            }
          );
        }
      );
    }
  );
});

app.post('/api/progress/complete-quiz', (req, res) => {
  const { userId, trackId, quizId, score } = req.body;

  db.get(
    `SELECT * FROM userProgress WHERE userId = ? AND trackId = ?`,
    [userId, trackId],
    (err, progress) => {
      if (err) return res.status(500).json({ error: 'Database error' });
      if (!progress) return res.status(404).json({ error: 'Progress not found' });

      const completedQuizzes = JSON.parse(progress.completedQuizzes || '[]');
      if (!completedQuizzes.includes(quizId)) {
        completedQuizzes.push(quizId);
      }

      const xpEarned = score >= 80 ? 25 : 15;
      const newXP = progress.totalXP + xpEarned;

      db.run(
        `UPDATE userProgress SET completedQuizzes = ?, totalXP = ? WHERE id = ?`,
        [JSON.stringify(completedQuizzes), newXP, progress.id],
        (err) => {
          if (err) return res.status(500).json({ error: 'Database error' });

          db.run(
            `UPDATE users SET xp = xp + ? WHERE id = ?`,
            [xpEarned, userId],
            (err) => {
              if (err) return res.status(500).json({ error: 'Database error' });
              res.json({ message: 'Quiz completed', xpEarned, totalXP: newXP });
            }
          );
        }
      );
    }
  );
});

// ==================== CERTIFICATES ====================
app.post('/api/certificates/issue', (req, res) => {
  const { userId, trackId } = req.body;
  const certId = uuidv4();

  db.run(
    `INSERT INTO certificates (id, userId, trackId) VALUES (?, ?, ?)`,
    [certId, userId, trackId],
    (err) => {
      if (err) return res.status(500).json({ error: 'Certificate issuance failed' });
      res.json({ certificate: { id: certId, userId, trackId } });
    }
  );
});

app.get('/api/certificates/:userId', (req, res) => {
  const { userId } = req.params;
  db.all(`SELECT * FROM certificates WHERE userId = ?`, [userId], (err, certs) => {
    if (err) return res.status(500).json({ error: 'Database error' });
    res.json({ certificates: certs });
  });
});

// ==================== JOB BOARD ====================
app.get('/api/jobs', (req, res) => {
  const { category, search } = req.query;
  let query = `SELECT * FROM jobs WHERE isActive = 1`;
  const params = [];

  if (category && category !== 'all') {
    query += ` AND category = ?`;
    params.push(category);
  }

  if (search) {
    query += ` AND (title LIKE ? OR company LIKE ? OR description LIKE ?)`;
    const searchTerm = `%${search}%`;
    params.push(searchTerm, searchTerm, searchTerm);
  }

  query += ` ORDER BY createdAt DESC`;

  db.all(query, params, (err, jobs) => {
    if (err) return res.status(500).json({ error: 'Database error' });
    res.json({ jobs });
  });
});

app.get('/api/jobs/:jobId', (req, res) => {
  const { jobId } = req.params;
  db.get(`SELECT * FROM jobs WHERE id = ?`, [jobId], (err, job) => {
    if (err) return res.status(500).json({ error: 'Database error' });
    if (!job) return res.status(404).json({ error: 'Job not found' });
    res.json({ job });
  });
});

app.post('/api/jobs/apply', (req, res) => {
  const { userId, jobId } = req.body;
  const appId = uuidv4();

  db.run(
    `INSERT INTO jobApplications (id, userId, jobId) VALUES (?, ?, ?)`,
    [appId, userId, jobId],
    (err) => {
      if (err) return res.status(500).json({ error: 'Application failed' });
      res.json({ message: 'Applied successfully', applicationId: appId });
    }
  );
});

app.post('/api/jobs/save', (req, res) => {
  const { userId, jobId } = req.body;
  const saveId = uuidv4();

  db.run(
    `INSERT OR IGNORE INTO savedJobs (id, userId, jobId) VALUES (?, ?, ?)`,
    [saveId, userId, jobId],
    (err) => {
      if (err) return res.status(500).json({ error: 'Failed to save job' });
      res.json({ message: 'Job saved successfully' });
    }
  );
});

app.get('/api/jobs/saved/:userId', (req, res) => {
  const { userId } = req.params;
  db.all(
    `SELECT j.* FROM jobs j INNER JOIN savedJobs s ON j.id = s.jobId WHERE s.userId = ?`,
    [userId],
    (err, jobs) => {
      if (err) return res.status(500).json({ error: 'Database error' });
      res.json({ savedJobs: jobs });
    }
  );
});

// ==================== ADMIN PANEL ====================
app.post('/api/admin/tracks', (req, res) => {
  const { title, description, category, difficulty, totalLessons, isPaid, price } = req.body;
  const trackId = uuidv4();

  db.run(
    `INSERT INTO tracks (id, title, description, category, difficulty, totalLessons, isPaid, price) 
     VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
    [trackId, title, description, category, difficulty, totalLessons, isPaid, price],
    (err) => {
      if (err) return res.status(500).json({ error: 'Failed to create track' });
      res.json({ message: 'Track created successfully', trackId });
    }
  );
});

app.put('/api/admin/tracks/:trackId', (req, res) => {
  const { trackId } = req.params;
  const { title, description, category, difficulty } = req.body;

  db.run(
    `UPDATE tracks SET title = ?, description = ?, category = ?, difficulty = ? WHERE id = ?`,
    [title, description, category, difficulty, trackId],
    function (err) {
      if (err) return res.status(500).json({ error: 'Failed to update track' });
      res.json({ message: 'Track updated successfully' });
    }
  );
});

app.post('/api/admin/lessons', (req, res) => {
  const { trackId, title, description, content, orderIndex, level } = req.body;
  const lessonId = uuidv4();

  db.run(
    `INSERT INTO lessons (id, trackId, title, description, content, orderIndex, level) 
     VALUES (?, ?, ?, ?, ?, ?, ?)`,
    [lessonId, trackId, title, description, content, orderIndex, level],
    (err) => {
      if (err) return res.status(500).json({ error: 'Failed to create lesson' });
      res.json({ message: 'Lesson created successfully', lessonId });
    }
  );
});

app.post('/api/admin/jobs', (req, res) => {
  const { title, company, description, category, salaryMin, salaryMax, requiredSkills } = req.body;
  const jobId = uuidv4();

  db.run(
    `INSERT INTO jobs (id, title, company, description, category, salaryMin, salaryMax, requiredSkills) 
     VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
    [jobId, title, company, description, category, salaryMin, salaryMax, JSON.stringify(requiredSkills || [])],
    (err) => {
      if (err) return res.status(500).json({ error: 'Failed to post job' });
      res.json({ message: 'Job posted successfully', jobId });
    }
  );
});

app.get('/api/admin/stats', (req, res) => {
  const stats = {};

  db.get(`SELECT COUNT(*) as totalUsers FROM users`, [], (err, userCount) => {
    if (!err) stats.totalUsers = userCount.totalUsers;

    db.get(`SELECT COUNT(*) as totalTracks FROM tracks`, [], (err, trackCount) => {
      if (!err) stats.totalTracks = trackCount.totalTracks;

      db.get(`SELECT COUNT(*) as totalEnrollments FROM userProgress`, [], (err, enrollCount) => {
        if (!err) stats.totalEnrollments = enrollCount.totalEnrollments;

        db.get(`SELECT COUNT(*) as totalJobs FROM jobs`, [], (err, jobCount) => {
          if (!err) stats.totalJobs = jobCount.totalJobs;

          res.json({ stats });
        });
      });
    });
  });
});

// Start server
app.listen(PORT, '0.0.0.0', () => {
  console.log(`Backend server running on http://localhost:${PORT}`);
});