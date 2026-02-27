# Web3 Career Hub - Quick Start Guide

## ⚡ 60-Second Setup

### 1. Start Backend
```bash
cd backend
npm install
node server.js
```

✅ You'll see: `Backend server running on http://localhost:3000`

### 2. Start Frontend (New Terminal)
```bash
cd frontend
npm install
npm run dev
```

✅ You'll see: `ready - started server on 0.0.0.0:3000`

### 3. Open Browser
```
http://localhost:3000
```

---

## 🎯 First User Flow

1. **Click "Connect Wallet"** - Approve MetaMask request
2. **Go to "Learning Paths"** - See 5 learning tracks
3. **Enroll in "Blockchain Fundamentals"** - Free track
4. **Go to "Dashboard"** - See your progress
5. **Click "Continue"** - Start learning
6. **View First Lesson** - See lesson content
7. **Mark as Complete** - Earn 10 XP
8. **Browse Jobs** - See 5 job listings
9. **Apply to Job** - Practice application
10. **View Certificates** - See your achievements

---

## 📁 Project Structure

```
web3-career-hub/
├── backend/              # Express server
│   ├── server.js        # API routes
│   ├── database.js      # SQLite setup
│   └── package.json
├── frontend/            # Next.js app
│   ├── app/            # Pages (dashboard, learn, jobs, etc.)
│   ├── components/     # Reusable UI components
│   ├── lib/            # Utils, API calls, store
│   └── package.json
├── README.md           # Full documentation
├── API_DOCS.md        # API reference
└── TESTING.md         # Testing guide
```

---

## 🔑 Key Files

### Backend
- `server.js` - All API endpoints
- `database.js` - Database schema + seeded data

### Frontend
- `app/page.jsx` - Landing page
- `app/dashboard/page.jsx` - User dashboard
- `app/learn/page.jsx` - Learning tracks
- `app/jobs/page.jsx` - Job board
- `app/admin/page.jsx` - Admin panel
- `lib/api.js` - API calls
- `lib/store.js` - State management

---

## 🎨 Tech Stack

| Layer | Technology |
|-------|------------|
| Frontend | Next.js 14, React 18, Tailwind CSS |
| Backend | Node.js, Express |
| Database | SQLite3 |
| Styling | Glassmorphism, Neon colors |
| Auth | MetaMask (Ethers.js) |
| State | Zustand |

---

## 📚 Learning Tracks

| Track | Price | Lessons | Difficulty |
|-------|-------|---------|------------|
| Blockchain Fundamentals | Free | 8 | Beginner |
| Smart Contract Dev | $99 | 12 | Intermediate |
| Web3 Frontend Dev | $79 | 10 | Intermediate |
| Non-Technical Roles | Free | 7 | Beginner |
| NFT & Metaverse | $49 | 6 | Beginner |

---

## 💼 Pre-seeded Jobs

1. **Solidity Developer** - Uniswap ($120k-$180k)
2. **Community Manager** - Aave ($60k-$100k)
3. **Web3 Frontend Engineer** - OpenSea ($100k-$160k)
4. **DAO Operator** - MakerDAO ($80k-$140k)
5. **Smart Contract Auditor** - OpenZeppelin ($130k-$200k)

---

## 🔐 Authentication

- Uses MetaMask wallet connection
- No passwords or private keys stored
- User ID derived from wallet address
- Session stored in browser localStorage

### Test Wallet Address
```
0x1234567890abcdef1234567890abcdef12345678
```

---

## 📊 Dashboard Features

- **XP Counter** - Earn XP by completing lessons and quizzes
- **Progress Tracking** - See lessons completed per track
- **Enrolled Courses** - All courses you're taking
- **Recommended Skills** - Suggested next courses
- **Stats** - Total XP, tracks, completions

---

## 🎓 Learning Flow

```
1. Enroll in Track
   ↓
2. View Lesson
   ↓
3. Read Content
   ↓
4. Mark Complete (+10 XP)
   ↓
5. Take Quiz
   ↓
6. Submit Quiz (+15-25 XP)
   ↓
7. Track Complete
   ↓
8. Earn Certificate
```

---

## 💻 API Quick Test

### Get All Tracks
```bash
curl http://localhost:3000/api/tracks
```

### Get All Jobs
```bash
curl http://localhost:3000/api/jobs
```

### Health Check
```bash
curl http://localhost:3000/health
```

See `API_DOCS.md` for full endpoint reference.

---

## 🎨 Dark Theme Details

- **Background**: `#08111a` (dark-950)
- **Glass Effect**: 10% white with 10px blur
- **Neon Blue**: `#00d4ff`
- **Neon Purple**: `#c084fc`
- **Neon Pink**: `#ff006e`
- **Neon Green**: `#00ff88`

---

## 🔧 Environment Variables

### Frontend (.env.local)
```
NEXT_PUBLIC_API_URL=http://localhost:3000
```

### Backend (.env)
```
PORT=3000
NODE_ENV=development
DATABASE_PATH=./database.db
```

---

## 📱 Responsive Breakpoints

- **Mobile**: < 640px
- **Tablet**: 640px - 1024px
- **Desktop**: > 1024px

---

## 🚀 Production Deployment

### Frontend (Vercel)
```bash
npm run build
# Deploy frontend directory
```

### Backend (Any Node Server)
```bash
npm install --production
PORT=3000 node server.js
```

---

## ⚠️ Common Issues

| Issue | Solution |
|-------|----------|
| Port 3000 in use | `lsof -i :3000` then `kill -9 <PID>` |
| MetaMask not showing | Check extension installed, switch to localhost |
| Database errors | Delete `backend/database.db` and restart |
| API call fails | Ensure backend is running on port 3000 |
| Styles not loading | Clear `.next` folder and rebuild |

---

## 📖 Documentation

- **README.md** - Complete project overview
- **API_DOCS.md** - All API endpoints with examples
- **TESTING.md** - Comprehensive testing guide
- **QUICKSTART.md** - This file

---

## 🎯 Key Metrics

When running:
- Users: 0 (grows as people sign up)
- Tracks: 5 (seeded)
- Jobs: 5 (seeded)
- Lessons: 50+ (seeded)
- XP Per Lesson: 10
- XP Per Quiz: 15-25

---

## 🔐 Admin Access

Access admin panel at `/admin` (requires wallet connection)

**Admin Features:**
- Create learning tracks
- Post job listings
- View platform statistics
- See user count

---

## 🎉 Next Steps

1. ✅ Run both servers (backend + frontend)
2. ✅ Connect wallet
3. ✅ Enroll in free track
4. ✅ Complete a lesson
5. ✅ View your dashboard
6. ✅ Browse job board
7. ✅ Try admin features
8. ✅ Read full documentation

---

## 💡 Tips

- Use Firefox DevTools for mobile view testing
- Check browser console for API errors
- Use Postman to test API endpoints
- Visit `/admin` to create more tracks/jobs
- Save SQLite database between sessions

---

## 🤝 Support

- Check TESTING.md for detailed testing
- Check API_DOCS.md for endpoint details
- Check README.md for full architecture
- Debug with browser DevTools

---

**You're all set! Happy learning and building! 🚀**