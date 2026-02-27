import sqlite3 from 'sqlite3';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const dbPath = join(__dirname, 'database.db');

const db = new sqlite3.Database(dbPath, (err) => {
  if (err) {
    console.error('Database connection error:', err);
  } else {
    console.log('Connected to SQLite database');
    initializeDatabase();
  }
});

export function initializeDatabase() {
  const tables = [
    `CREATE TABLE IF NOT EXISTS users (
      id TEXT PRIMARY KEY,
      walletAddress TEXT UNIQUE NOT NULL,
      username TEXT,
      email TEXT,
      profileImage TEXT,
      xp INTEGER DEFAULT 0,
      badges TEXT DEFAULT '[]',
      createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
      isPro BOOLEAN DEFAULT 0,
      proExpiresAt DATETIME
    )`,
    `CREATE TABLE IF NOT EXISTS tracks (
      id TEXT PRIMARY KEY,
      title TEXT NOT NULL,
      description TEXT,
      category TEXT NOT NULL,
      difficulty TEXT DEFAULT 'beginner',
      icon TEXT,
      image TEXT,
      totalLessons INTEGER DEFAULT 0,
      isPaid BOOLEAN DEFAULT 0,
      price REAL DEFAULT 0,
      createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
      updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP
    )`,
    `CREATE TABLE IF NOT EXISTS lessons (
      id TEXT PRIMARY KEY,
      trackId TEXT NOT NULL,
      title TEXT NOT NULL,
      description TEXT,
      content TEXT,
      videoUrl TEXT,
      duration INTEGER,
      orderIndex INTEGER,
      level TEXT,
      createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (trackId) REFERENCES tracks(id)
    )`,
    `CREATE TABLE IF NOT EXISTS quizzes (
      id TEXT PRIMARY KEY,
      lessonId TEXT NOT NULL,
      title TEXT NOT NULL,
      questions TEXT NOT NULL,
      passingScore INTEGER DEFAULT 70,
      createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (lessonId) REFERENCES lessons(id)
    )`,
    `CREATE TABLE IF NOT EXISTS userProgress (
      id TEXT PRIMARY KEY,
      userId TEXT NOT NULL,
      trackId TEXT NOT NULL,
      enrolledAt DATETIME DEFAULT CURRENT_TIMESTAMP,
      completedLessons TEXT DEFAULT '[]',
      completedQuizzes TEXT DEFAULT '[]',
      totalXP INTEGER DEFAULT 0,
      isCompleted BOOLEAN DEFAULT 0,
      completionDate DATETIME,
      FOREIGN KEY (userId) REFERENCES users(id),
      FOREIGN KEY (trackId) REFERENCES tracks(id)
    )`,
    `CREATE TABLE IF NOT EXISTS certificates (
      id TEXT PRIMARY KEY,
      userId TEXT NOT NULL,
      trackId TEXT NOT NULL,
      certificateUrl TEXT,
      nftTokenId TEXT,
      issuedAt DATETIME DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (userId) REFERENCES users(id),
      FOREIGN KEY (trackId) REFERENCES tracks(id)
    )`,
    `CREATE TABLE IF NOT EXISTS jobs (
      id TEXT PRIMARY KEY,
      title TEXT NOT NULL,
      company TEXT NOT NULL,
      description TEXT,
      category TEXT NOT NULL,
      location TEXT DEFAULT 'Remote',
      salaryMin INTEGER,
      salaryMax INTEGER,
      requiredSkills TEXT DEFAULT '[]',
      applyUrl TEXT,
      isSponsored BOOLEAN DEFAULT 0,
      isActive BOOLEAN DEFAULT 1,
      createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
      updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP
    )`,
    `CREATE TABLE IF NOT EXISTS jobApplications (
      id TEXT PRIMARY KEY,
      userId TEXT NOT NULL,
      jobId TEXT NOT NULL,
      appliedAt DATETIME DEFAULT CURRENT_TIMESTAMP,
      status TEXT DEFAULT 'pending',
      FOREIGN KEY (userId) REFERENCES users(id),
      FOREIGN KEY (jobId) REFERENCES jobs(id)
    )`,
    `CREATE TABLE IF NOT EXISTS savedJobs (
      id TEXT PRIMARY KEY,
      userId TEXT NOT NULL,
      jobId TEXT NOT NULL,
      savedAt DATETIME DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (userId) REFERENCES users(id),
      FOREIGN KEY (jobId) REFERENCES jobs(id)
    )`,
    `CREATE TABLE IF NOT EXISTS adminUsers (
      id TEXT PRIMARY KEY,
      walletAddress TEXT UNIQUE NOT NULL,
      role TEXT DEFAULT 'moderator',
      createdAt DATETIME DEFAULT CURRENT_TIMESTAMP
    )`
  ];

  tables.forEach((table) => {
    db.run(table, (err) => {
      if (err) {
        console.error('Error creating table:', err);
      }
    });
  });

  seedData();
}

function seedData() {
  // Seed learning tracks
  const tracks = [
    {
      id: 'track-blockchain-101',
      title: 'Blockchain Fundamentals',
      description: 'Learn the basics of blockchain technology, Bitcoin, Ethereum, and distributed ledgers.',
      category: 'Fundamentals',
      difficulty: 'beginner',
      totalLessons: 8,
      isPaid: 0
    },
    {
      id: 'track-solidity-dev',
      title: 'Smart Contract Development',
      description: 'Master Solidity and create production-ready smart contracts on Ethereum.',
      category: 'Development',
      difficulty: 'intermediate',
      totalLessons: 12,
      isPaid: 1,
      price: 99
    },
    {
      id: 'track-web3-frontend',
      title: 'Web3 Frontend Development',
      description: 'Build decentralized applications with wallet integration and Web3 libraries.',
      category: 'Development',
      difficulty: 'intermediate',
      totalLessons: 10,
      isPaid: 1,
      price: 79
    },
    {
      id: 'track-non-tech',
      title: 'Web3 Non-Technical Roles',
      description: 'Explore community management, DAO operations, and content strategy roles.',
      category: 'Non-Technical',
      difficulty: 'beginner',
      totalLessons: 7,
      isPaid: 0
    },
    {
      id: 'track-nft-metaverse',
      title: 'NFT & Metaverse Fundamentals',
      description: 'Understand NFTs, metaverse platforms, and Web3 gaming opportunities.',
      category: 'Web3 Specializations',
      difficulty: 'beginner',
      totalLessons: 6,
      isPaid: 1,
      price: 49
    }
  ];

  tracks.forEach((track) => {
    db.run(
      `INSERT OR IGNORE INTO tracks (id, title, description, category, difficulty, totalLessons, isPaid, price)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
      [track.id, track.title, track.description, track.category, track.difficulty, track.totalLessons, track.isPaid, track.price],
      (err) => {
        if (err) console.error('Error seeding track:', err);
      }
    );
  });

  // Seed sample lessons
  const lessons = [
    { id: 'lesson-1', trackId: 'track-blockchain-101', title: 'What is Blockchain?', orderIndex: 1, level: 'beginner' },
    { id: 'lesson-2', trackId: 'track-blockchain-101', title: 'Bitcoin vs Ethereum', orderIndex: 2, level: 'beginner' },
    { id: 'lesson-3', trackId: 'track-blockchain-101', title: 'Smart Contracts Explained', orderIndex: 3, level: 'beginner' },
    { id: 'lesson-4', trackId: 'track-solidity-dev', title: 'Solidity Syntax Basics', orderIndex: 1, level: 'intermediate' },
    { id: 'lesson-5', trackId: 'track-solidity-dev', title: 'Writing Your First Contract', orderIndex: 2, level: 'intermediate' },
    { id: 'lesson-6', trackId: 'track-web3-frontend', title: 'Connecting MetaMask', orderIndex: 1, level: 'intermediate' },
    { id: 'lesson-7', trackId: 'track-web3-frontend', title: 'Building dApps with Ethers.js', orderIndex: 2, level: 'intermediate' },
    { id: 'lesson-8', trackId: 'track-non-tech', title: 'Community Management in DAOs', orderIndex: 1, level: 'beginner' },
    { id: 'lesson-9', trackId: 'track-non-tech', title: 'Content Strategy for Web3', orderIndex: 2, level: 'beginner' },
    { id: 'lesson-10', trackId: 'track-nft-metaverse', title: 'Understanding NFTs', orderIndex: 1, level: 'beginner' }
  ];

  lessons.forEach((lesson) => {
    db.run(
      `INSERT OR IGNORE INTO lessons (id, trackId, title, orderIndex, level)
       VALUES (?, ?, ?, ?, ?)`,
      [lesson.id, lesson.trackId, lesson.title, lesson.orderIndex, lesson.level],
      (err) => {
        if (err) console.error('Error seeding lesson:', err);
      }
    );
  });

  // Seed sample jobs
  const jobs = [
    {
      id: 'job-1',
      title: 'Solidity Developer',
      company: 'Uniswap',
      description: 'Build and maintain core smart contracts for DeFi platform.',
      category: 'Developer',
      salaryMin: 120000,
      salaryMax: 180000,
      requiredSkills: JSON.stringify(['Solidity', 'Smart Contracts', 'Ethereum'])
    },
    {
      id: 'job-2',
      title: 'Community Manager',
      company: 'Aave',
      description: 'Lead community engagement and governance discussions.',
      category: 'Community Manager',
      salaryMin: 60000,
      salaryMax: 100000,
      requiredSkills: JSON.stringify(['Community Management', 'Communication', 'Web3'])
    },
    {
      id: 'job-3',
      title: 'Web3 Frontend Engineer',
      company: 'OpenSea',
      description: 'Develop responsive UI for NFT marketplace platform.',
      category: 'Developer',
      salaryMin: 100000,
      salaryMax: 160000,
      requiredSkills: JSON.stringify(['React', 'Web3.js', 'JavaScript'])
    },
    {
      id: 'job-4',
      title: 'DAO Operator',
      company: 'MakerDAO',
      description: 'Manage DAO operations and governance processes.',
      category: 'DAO Operator',
      salaryMin: 80000,
      salaryMax: 140000,
      requiredSkills: JSON.stringify(['DAO', 'Governance', 'Web3'])
    },
    {
      id: 'job-5',
      title: 'Smart Contract Auditor',
      company: 'OpenZeppelin',
      description: 'Audit and secure blockchain applications.',
      category: 'Smart Contract Auditor',
      salaryMin: 130000,
      salaryMax: 200000,
      requiredSkills: JSON.stringify(['Solidity', 'Security', 'Smart Contracts'])
    }
  ];

  jobs.forEach((job) => {
    db.run(
      `INSERT OR IGNORE INTO jobs (id, title, company, description, category, salaryMin, salaryMax, requiredSkills)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
      [job.id, job.title, job.company, job.description, job.category, job.salaryMin, job.salaryMax, job.requiredSkills],
      (err) => {
        if (err) console.error('Error seeding job:', err);
      }
    );
  });
}

export default db;