# Web3 Career Hub - Testing Guide

## Quick Start Testing

### 1. Backend Testing

```bash
cd backend
npm install
node server.js
```

Expected output:
```
Connected to SQLite database
Backend server running on http://localhost:3000
```

Test endpoints:
- `GET http://localhost:3000/health` → Should return `{"status": "Backend is running"}`
- `GET http://localhost:3000/api/tracks` → Should return array of tracks
- `GET http://localhost:3000/api/jobs` → Should return array of jobs

### 2. Frontend Testing

```bash
cd frontend
npm install
npm run dev
```

Access at `http://localhost:3000` (Note: if backend uses 3000, Next.js will use 3001)

## User Flows to Test

### Flow 1: Wallet Connection & Profile Setup
1. Click "Connect Wallet" button
2. Approve MetaMask request
3. Verify wallet address displays correctly
4. Check XP counter appears in header
5. Test "Disconnect" button

### Flow 2: Browse Learning Tracks
1. Navigate to "Learning Paths" from sidebar
2. View all 5 tracks displayed
3. Filter by category (Fundamentals, Development, etc.)
4. Click on a track to view details
5. Verify lesson list appears

### Flow 3: Enroll in Track
1. Select a track (free tracks recommended for testing)
2. Click "Enroll Free" button
3. Go to Dashboard
4. Verify track appears in "My Learning Path" section
5. Check progress bar exists

### Flow 4: Complete Lesson
1. In track detail page, select first lesson
2. View lesson content and video placeholder
3. Click "Mark as Complete"
4. Verify XP increases (+10 XP)
5. Check progress bar updates

### Flow 5: Submit Quiz
1. Scroll to "Knowledge Check Quiz" section
2. Answer quiz questions
3. Click "Submit Quiz"
4. Verify XP increases (+15-25 XP based on score)
5. Confirm quiz completion message

### Flow 6: Browse Job Board
1. Click "Job Board" in sidebar
2. View all job listings
3. Test category filters
4. Search for a job title
5. Click on job card to expand details

### Flow 7: Apply to Job
1. On job board, click "Apply Now" button
2. Verify success message appears
3. Application should be recorded (no error)

### Flow 8: Save Job
1. On job board, click heart icon (❤️)
2. Heart should turn red and pulse
3. Navigate to dashboard
4. Verify saved jobs visible

### Flow 9: View Certificates
1. Click "Certificates" in sidebar
2. If enrolled in completed tracks, view certificates
3. Otherwise see "No Certificates Yet" message
4. View "How it Works" section

### Flow 10: Admin Dashboard
1. Click "Admin Panel" in sidebar
2. View platform statistics
3. Switch to "Tracks" tab
4. Fill in form to create new track
5. Verify success message
6. Switch to "Jobs" tab
7. Post a new job listing

## API Testing with cURL

### Test Authentication
```bash
# Login with wallet
curl -X POST http://localhost:3000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"walletAddress":"0x1234567890abcdef1234567890abcdef12345678"}'
```

### Test Tracks
```bash
# Get all tracks
curl http://localhost:3000/api/tracks

# Get specific track
curl http://localhost:3000/api/tracks/track-blockchain-101
```

### Test Progress
```bash
# Enroll in track
curl -X POST http://localhost:3000/api/progress/enroll \
  -H "Content-Type: application/json" \
  -d '{"userId":"user-uuid","trackId":"track-blockchain-101"}'

# Complete lesson
curl -X POST http://localhost:3000/api/progress/complete-lesson \
  -H "Content-Type: application/json" \
  -d '{"userId":"user-uuid","trackId":"track-blockchain-101","lessonId":"lesson-1"}'
```

### Test Jobs
```bash
# Get all jobs
curl http://localhost:3000/api/jobs

# Get jobs by category
curl "http://localhost:3000/api/jobs?category=Developer"

# Search jobs
curl "http://localhost:3000/api/jobs?search=Solidity"

# Apply to job
curl -X POST http://localhost:3000/api/jobs/apply \
  -H "Content-Type: application/json" \
  -d '{"userId":"user-uuid","jobId":"job-1"}'
```

### Test Admin
```bash
# Get stats
curl http://localhost:3000/api/admin/stats

# Create track
curl -X POST http://localhost:3000/api/admin/tracks \
  -H "Content-Type: application/json" \
  -d '{
    "title":"New Track",
    "description":"Description",
    "category":"Fundamentals",
    "difficulty":"beginner",
    "totalLessons":8,
    "isPaid":0,
    "price":0
  }'
```

## Test Data

### Pre-seeded Learning Tracks
1. **track-blockchain-101** - Blockchain Fundamentals (Free)
2. **track-solidity-dev** - Smart Contract Development ($99)
3. **track-web3-frontend** - Web3 Frontend Development ($79)
4. **track-non-tech** - Web3 Non-Technical Roles (Free)
5. **track-nft-metaverse** - NFT & Metaverse Fundamentals ($49)

### Pre-seeded Job Listings
1. Solidity Developer at Uniswap ($120k-$180k)
2. Community Manager at Aave ($60k-$100k)
3. Web3 Frontend Engineer at OpenSea ($100k-$160k)
4. DAO Operator at MakerDAO ($80k-$140k)
5. Smart Contract Auditor at OpenZeppelin ($130k-$200k)

## Performance Testing

### Load Testing Database
```bash
# Verify database is created
ls -la backend/database.db

# Check database size
du -h backend/database.db
```

### Browser DevTools
1. Open DevTools (F12)
2. Go to Network tab
3. Reload page
4. Check for slow requests
5. Verify all API calls succeed (200 status)

## Mobile Responsiveness Testing

### Viewport Sizes to Test
- iPhone 12 (390x844)
- iPad (768x1024)
- Samsung Galaxy S21 (360x800)
- Desktop (1920x1080)

### Responsive Elements to Verify
- [ ] Sidebar collapses on mobile
- [ ] Navigation buttons remain clickable
- [ ] Job cards stack properly
- [ ] Track cards are readable
- [ ] Header doesn't overflow
- [ ] Input fields are appropriately sized

## Dark Theme Verification

### Color Checks
- [ ] Dark background (#08111a) applies globally
- [ ] Neon colors visible against dark bg
- [ ] Glass effects show transparency
- [ ] Text contrast meets WCAG standards
- [ ] Gradients render smoothly

## State Management Testing

### User Store
```javascript
// In browser console:
// Check if user is logged in
// import { useAuthStore } from '@/lib/store'
// const { user } = useAuthStore()
// console.log(user)
```

### Learning Store
```javascript
// Check learning progress
// const { totalXP, badges } = useLearningStore()
// console.log({ totalXP, badges })
```

## Error Handling Testing

### Test Error Scenarios
1. Disconnect wallet during API call
2. Close modal without saving
3. Invalid form input
4. Network timeout (throttle in DevTools)
5. Database connection error

## Security Testing

### Authentication
- [ ] Cannot access `/dashboard` without wallet connection
- [ ] Cannot access `/admin` without user context
- [ ] Wallet address is validated format
- [ ] User ID is used in backend queries

### Input Validation
- [ ] SQL injection prevented
- [ ] XSS protection working
- [ ] Form inputs sanitized
- [ ] File uploads validated

## Accessibility Testing

### Keyboard Navigation
- [ ] Tab through all buttons
- [ ] Enter activates buttons
- [ ] Escape closes modals
- [ ] Focus indicators visible

### Screen Reader
- [ ] Headings properly structured
- [ ] Buttons have descriptive labels
- [ ] Images have alt text
- [ ] Form labels associated

## Browser Compatibility

Test on:
- [ ] Chrome 120+
- [ ] Firefox 121+
- [ ] Safari 17+
- [ ] Edge 121+

## Database Testing

### Verify Seeded Data
```bash
# Connect to database
sqlite3 backend/database.db

# Check tables
.tables

# Count records
SELECT COUNT(*) FROM tracks;
SELECT COUNT(*) FROM jobs;
SELECT COUNT(*) FROM lessons;

# View sample track
SELECT * FROM tracks LIMIT 1;

# Exit
.quit
```

## Troubleshooting

### Backend Won't Start
1. Check Node.js version: `node --version`
2. Clear node_modules: `rm -rf node_modules && npm install`
3. Check port 3000 is available: `lsof -i :3000`
4. Kill existing process: `kill -9 <PID>`

### Frontend Won't Load
1. Check backend is running: `curl http://localhost:3000/health`
2. Clear Next.js cache: `rm -rf .next`
3. Clear npm cache: `npm cache clean --force`
4. Reinstall: `npm install`

### MetaMask Not Working
1. Ensure MetaMask extension installed
2. Check if on localhost (production requires HTTPS)
3. Try different browser
4. Clear MetaMask account cache

### Database Issues
1. Delete database.db and restart backend
2. Check write permissions on backend folder
3. Verify SQLite3 installed: `npm list sqlite3`

## Performance Metrics

### Target Metrics
- Page load time: < 2s
- API response time: < 500ms
- Database query time: < 200ms
- Mobile FCP: < 3s
- Lighthouse score: > 80

### Measure with
- Chrome DevTools Network tab
- Lighthouse audit
- Backend logs timing
- Browser console timing

## Regression Testing Checklist

After each update:
- [ ] All flows still work
- [ ] No new console errors
- [ ] Database intact
- [ ] XP calculation correct
- [ ] Styles intact
- [ ] Mobile responsive
- [ ] Animations smooth

---

**Testing is critical to quality. Run through this guide before deployment.**