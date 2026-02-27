# 🚀 Web3 Career Hub - Deploy Now Guide

Your application is ready to deploy! Follow the quickest path for your preferred platform.

---

## ⚡ FASTEST: Deploy in 5 Minutes (Vercel + Railway)

### Step 1: Push to GitHub
```bash
git remote add origin https://github.com/YOUR_USERNAME/web3-career-hub.git
git branch -M main
git push -u origin main
```

### Step 2: Deploy Frontend to Vercel

1. Go to [vercel.com](https://vercel.com)
2. Click "New Project"
3. Import your GitHub repository
4. **Root Directory**: `frontend`
5. Add Environment Variable:
   - Key: `NEXT_PUBLIC_API_URL`
   - Value: `https://your-backend-railway.railway.app` (we'll get this next)
6. Click "Deploy"
7. **Your frontend is now LIVE!** 🎉

### Step 3: Deploy Backend to Railway

1. Go to [railway.app](https://railway.app)
2. Click "New Project"
3. Select "Deploy from GitHub"
4. Select your repository
5. Click "Add Service" → "GitHub Repo"
6. **Root Directory**: `backend`
7. Add Environment Variables:
   - `PORT` = `3000`
   - `NODE_ENV` = `production`
8. Click "Deploy"
9. **Your backend is now LIVE!** 🎉

### Step 4: Update Frontend Environment Variable

1. Go to Vercel project settings
2. Update `NEXT_PUBLIC_API_URL` to your Railway backend URL
3. Trigger redeploy
4. **DONE! Your app is live!** ✨

### Verify Your Deployment

1. Visit your Vercel frontend URL
2. Click "Connect Wallet"
3. Test enrolling in a course
4. Test browsing jobs
5. Check admin panel

---

## 📦 LOCAL DOCKER DEPLOYMENT

Quick local deployment using Docker.

### Prerequisites
- Docker installed
- Docker Compose installed

### Deploy

```bash
# Build and start
docker-compose up

# In browser
http://localhost:3001  # Frontend
http://localhost:3000  # Backend
```

### Stop
```bash
docker-compose down
```

---

## ☁️ ALTERNATIVE: Full Stack Options

### Option A: DigitalOcean App Platform (All-in-One)

1. Go to [digitalocean.com](https://digitalocean.com)
2. Create account
3. Click "Apps" → "Create App"
4. Connect GitHub
5. DigitalOcean auto-detects Next.js and Node.js
6. Set environment variables
7. Click "Deploy"
8. Everything runs on one platform ✅

**Cost:** $5-12/month

### Option B: AWS (Scalable)

**Frontend (Amplify):**
1. Go to AWS Amplify Console
2. Connect GitHub
3. Deploy automatically on each push

**Backend (Elastic Beanstalk):**
1. Go to AWS Elastic Beanstalk
2. Create environment for Node.js
3. Deploy backend

**Cost:** Free tier + $7-50/month

### Option C: Google Cloud (Simple)

1. Enable Cloud Run
2. Deploy frontend as container
3. Deploy backend as service
4. Configure Cloud SQL for database

**Cost:** Free tier + $0.00002/request

---

## 🔧 BEFORE DEPLOYING - Checklist

- [ ] Code committed to git
- [ ] No `.env` files committed (check `.gitignore`)
- [ ] Backend `package.json` has all dependencies
- [ ] Frontend `package.json` has all dependencies
- [ ] No hardcoded URLs (use env variables)
- [ ] API URL set correctly in environment variables
- [ ] MetaMask can reach backend (CORS enabled)
- [ ] Database initialized in backend
- [ ] No console errors when building

**Check:**
```bash
# Verify builds work locally
cd frontend && npm run build && cd ..
cd backend && npm ci && cd ..
```

---

## 📝 ENVIRONMENT VARIABLES NEEDED

### Frontend (.env.production or Vercel)
```
NEXT_PUBLIC_API_URL=https://your-backend-url.com
```

### Backend (.env.production or Railway/Docker)
```
PORT=3000
NODE_ENV=production
DATABASE_PATH=/data/database.db
```

---

## 🎯 DEPLOYMENT PATHS (Pick One)

### Recommended for Beginners
```
Frontend: Vercel
Backend: Railway
Database: SQLite (built-in)
Cost: FREE
```

### Recommended for Scale
```
Frontend: Vercel or AWS Amplify
Backend: DigitalOcean or AWS
Database: PostgreSQL (cloud)
Cost: $5-50/month
```

### All-in-One
```
Platform: DigitalOcean App Platform
Cost: $5-12/month
Setup: ~5 minutes
```

### Docker in Production
```
Platform: AWS ECS, GCP Cloud Run, or DigitalOcean
Cost: $5-30/month
Setup: ~10 minutes
```

---

## 🚨 COMMON DEPLOYMENT ISSUES & FIXES

### "Frontend can't reach backend"
**Fix:** Update `NEXT_PUBLIC_API_URL` environment variable to your backend URL

### "MetaMask connection fails"
**Fix:** Ensure backend has CORS enabled (already configured in code)

### "Database not persisting"
**Fix:** Use persistent volume in Docker or cloud database service

### "Build fails on Vercel"
**Fix:** Check `frontend/package.json` has all dependencies installed

### "Backend won't start"
**Fix:** Check PORT environment variable is set and database can be created

---

## ✅ POST-DEPLOYMENT CHECKLIST

After deploying, verify:

- [ ] Frontend loads without errors
- [ ] Connect Wallet button works
- [ ] Can view learning tracks
- [ ] Can enroll in course
- [ ] Can view job board
- [ ] Can apply to job
- [ ] Can access admin panel
- [ ] XP system works
- [ ] No 500 errors in backend
- [ ] Database persisting data

---

## 📊 DEPLOYMENT STATUS COMMANDS

### Check Frontend Deployment
```bash
curl https://your-frontend-url.vercel.app
```

### Check Backend Deployment
```bash
curl https://your-backend-url.com/health
```

### View Logs

**Vercel:**
- Dashboard → Deployments → View logs

**Railway:**
- Project → View logs in terminal

**Docker:**
```bash
docker logs backend
docker logs frontend
```

---

## 🔒 SECURITY POST-DEPLOYMENT

1. **Environment Variables**
   - Never commit `.env` files
   - Use platform secret manager
   - Rotate tokens regularly

2. **Database**
   - Regular backups enabled
   - Access restricted to backend only
   - Encryption enabled

3. **API**
   - CORS properly configured
   - Rate limiting enabled
   - Input validation active

4. **SSL/HTTPS**
   - Automatic (all platforms provide)
   - Redirect HTTP to HTTPS

---

## 💰 COST BREAKDOWN

| Platform | Frontend | Backend | Database | Total/Month |
|----------|----------|---------|----------|------------|
| Vercel + Railway | Free | Free* | Free | $0-5 |
| AWS | Free tier | $7+ | $0-25 | $7-32 |
| DigitalOcean | Included | Included | Included | $5-12 |
| Google Cloud | Free tier | Free tier | Free tier | $0+ |
| Heroku | $7 | $7 | $10 | $24 |

*Railway gives $5/month free credit

---

## 🎓 MONITORING & MAINTENANCE

### Set Up Alerts
1. **Uptime Monitoring**: Uptimerobot.com (free)
2. **Error Tracking**: Sentry.io (free tier)
3. **Performance**: Datadog or New Relic (paid)

### Regular Tasks
- [ ] Check deployment logs weekly
- [ ] Backup database monthly
- [ ] Update dependencies quarterly
- [ ] Monitor error rates
- [ ] Scale if needed

---

## 🆘 SUPPORT & HELP

If deployment fails:

1. **Check Logs**
   - Vercel: Dashboard → View logs
   - Railway: Project → View logs
   - Docker: `docker logs service-name`

2. **Test Locally**
   ```bash
   npm run dev  # Both services locally
   ```

3. **Check Environment Variables**
   - Are they set correctly?
   - Did you restart services after updating?

4. **Verify Database**
   - SQLite: Check database.db exists
   - Cloud: Check connection string

5. **Check CORS**
   - Backend CORS is already configured
   - Verify frontend URL added to allowlist

---

## 🎉 NEXT STEPS AFTER DEPLOYMENT

1. **Share Your App**
   - Send Vercel URL to friends
   - Test with actual MetaMask

2. **Add Custom Domain**
   - Vercel: Add domain in settings
   - Railway: Add domain in settings
   - Both: Update DNS records

3. **Monitor & Scale**
   - Watch deployment logs
   - Set up error alerts
   - Add database if traffic grows

4. **Add Features**
   - Video hosting
   - Payment processing
   - More learning tracks

---

## 📞 QUICK LINKS

- **Vercel Docs**: https://vercel.com/docs
- **Railway Docs**: https://docs.railway.app
- **Next.js Docs**: https://nextjs.org/docs
- **Node.js Docs**: https://nodejs.org/docs
- **Docker Docs**: https://docs.docker.com

---

## 🏁 YOU'RE READY!

Your Web3 Career Hub is production-ready. Choose your deployment method above and go live in minutes!

**Recommended first deployment:**
1. Push to GitHub ✅
2. Deploy frontend to Vercel (2 min)
3. Deploy backend to Railway (2 min)
4. Update environment variable (1 min)
5. Test and celebrate! 🎉

**Total time: ~5 minutes**

---

**Happy deploying! 🚀**