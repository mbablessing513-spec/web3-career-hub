# Web3 Career Hub

A modern educational platform for learning Web3 skills and connecting with remote blockchain job opportunities.

## Features

### 🎓 Structured Learning Paths
- 5 comprehensive learning tracks
- Beginner → Intermediate → Advanced progression
- Interactive lessons with video placeholders
- Knowledge check quizzes
- XP and achievement system

### 💼 Web3 Job Board
- 100+ curated job listings
- Category filters (Developer, Community Manager, etc.)
- Search functionality
- Save jobs for later
- Real salary information

### 🏆 Achievements & Certificates
- NFT certificate system (mock)
- Progress tracking per track
- XP and badge rewards
- Certificate gallery

### 🔐 Wallet Authentication
- MetaMask integration via Ethers.js
- Secure user profiles
- Transaction-ready architecture

### ⚙️ Admin Dashboard
- Create and manage learning tracks
- Post and edit job listings
- View platform statistics
- User management capabilities

## Tech Stack

**Frontend:**
- Next.js 14
- React 18
- Tailwind CSS
- Framer Motion
- Ethers.js for wallet integration
- Zustand for state management

**Backend:**
- Node.js
- Express
- SQLite3
- CORS enabled

**Design:**
- Dark Web3 aesthetic
- Glassmorphism effects
- Responsive mobile design
- Smooth animations

## Project Structure

```
/workspace
├── frontend/                 # Next.js React app
│   ├── app/                  # Pages & layouts
│   ├── components/           # Reusable components
│   ├── lib/                  # Utilities & API
│   └── globals.css           # Global styles
├── backend/                  # Express server
│   ├── server.js             # Main server file
│   └── database.js           # SQLite initialization
└── package.json              # Root package config
```

## Installation & Setup

### Prerequisites
- Node.js 18+
- MetaMask extension (for testing)

### Backend Setup
```bash
cd backend
npm install
node server.js
# Server runs on http://localhost:3000
```

### Frontend Setup
```bash
cd frontend
npm install
npm run dev
# App runs on http://localhost:3000 (Next.js port)
```

### Full Development (Root)
```bash
npm install
npm run dev
# Runs frontend and backend concurrently
```

## Database

SQLite database is auto-initialized with:
- User accounts
- Learning tracks and lessons
- Quiz data
- Job listings
- User progress tracking
- Certificates

Seeded with sample data on first run.

## API Endpoints

### Authentication
- `POST /api/auth/login` - Login with wallet
- `GET /api/auth/user/:walletAddress` - Get user profile
- `PUT /api/auth/user/:userId` - Update user profile

### Learning
- `GET /api/tracks` - Get all tracks
- `GET /api/tracks/:trackId` - Get track details with lessons
- `GET /api/lessons/:lessonId` - Get lesson with quiz

### Progress
- `POST /api/progress/enroll` - Enroll in track
- `GET /api/progress/:userId` - Get user progress
- `POST /api/progress/complete-lesson` - Mark lesson complete
- `POST /api/progress/complete-quiz` - Submit quiz

### Jobs
- `GET /api/jobs` - Get all jobs (supports filters)
- `GET /api/jobs/:jobId` - Get job details
- `POST /api/jobs/apply` - Apply to job
- `POST /api/jobs/save` - Save job
- `GET /api/jobs/saved/:userId` - Get saved jobs

### Admin
- `POST /api/admin/tracks` - Create track
- `PUT /api/admin/tracks/:trackId` - Update track
- `POST /api/admin/lessons` - Create lesson
- `POST /api/admin/jobs` - Post job
- `GET /api/admin/stats` - Get statistics

## Learning Tracks

1. **Blockchain Fundamentals** (Free)
   - What is Blockchain?
   - Bitcoin vs Ethereum
   - Smart Contracts Explained
   - 8 lessons total

2. **Smart Contract Development** (Paid - $99)
   - Solidity Syntax Basics
   - Writing Your First Contract
   - Advanced Patterns
   - 12 lessons total

3. **Web3 Frontend Development** (Paid - $79)
   - Connecting MetaMask
   - Building dApps with Ethers.js
   - Advanced Web3 Integration
   - 10 lessons total

4. **Web3 Non-Technical Roles** (Free)
   - Community Management in DAOs
   - Content Strategy for Web3
   - DAO Governance
   - 7 lessons total

5. **NFT & Metaverse Fundamentals** (Paid - $49)
   - Understanding NFTs
   - Metaverse Platforms
   - Web3 Gaming
   - 6 lessons total

## Key Features Explained

### Wallet Authentication
Uses MetaMask to authenticate users. Each user gets a unique profile tied to their wallet address.

### XP System
- Complete lesson: +10 XP
- Pass quiz (70%+): +15 XP
- Pass quiz (80%+): +25 XP

### Progress Tracking
Real-time progress storage with lesson completion tracking and quiz scores.

### Job Applications
Users can apply directly to jobs and save listings for later reference.

### Admin Tools
Comprehensive admin panel for creating content and managing the platform.

## Responsive Design

- Mobile-first approach
- Collapsible sidebar navigation
- Optimized for all screen sizes
- Touch-friendly interface

## Glassmorphism Design System

- Semi-transparent elements with blur effect
- Neon color accents (blue, purple, pink, green)
- Dark background with gradient overlays
- Smooth hover animations
- Glow effects on interactive elements

## Future Enhancements

- Payment integration (Stripe, crypto)
- Smart contract for NFT certificates
- Video hosting integration
- Real-time notifications
- User referral system
- Advanced analytics dashboard
- Live instructor sessions
- Community forums

## Security Notes

- Wallet addresses used as primary identifier
- No private keys stored server-side
- CORS configured for production
- Input validation on all endpoints
- XP and progress immutable once recorded

## Testing

Manual testing checklist:
- [ ] Wallet connection/disconnection
- [ ] Track enrollment and progress
- [ ] Lesson completion flow
- [ ] Quiz submission
- [ ] Job search and apply
- [ ] Admin dashboard operations
- [ ] Responsive design on mobile
- [ ] Dark theme consistency

## Deployment

### Frontend (Vercel)
```bash
npm run build
# Deploy the frontend directory to Vercel
```

### Backend (Node.js Server)
```bash
cd backend
npm install
node server.js
# Configure to listen on production port
```

## License

MIT License - feel free to use for your Web3 projects

## Support

For issues and feature requests, please contact the development team.

---

**Web3 Career Hub** - Learn • Build • Earn