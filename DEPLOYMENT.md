# Web3 Career Hub - Deployment Guide

## 🚀 Deployment Options

Choose one of the following deployment methods based on your needs.

---

## Option 1: Vercel + Render (Recommended for Beginners)

### Frontend Deployment (Vercel)

1. **Push to GitHub**
   ```bash
   git push origin main
   ```

2. **Go to Vercel**
   - Visit https://vercel.com
   - Click "New Project"
   - Import your repository
   - Select `frontend` as root directory
   - Add environment variable:
     - Key: `NEXT_PUBLIC_API_URL`
     - Value: `https://your-backend-url.onrender.com`

3. **Deploy**
   - Click "Deploy"
   - Your frontend is now live at `https://your-project.vercel.app`

### Backend Deployment (Render)

1. **Go to Render**
   - Visit https://render.com
   - Click "New +"
   - Select "Web Service"
   - Connect your GitHub repository
   - Select `backend` as root directory

2. **Configure**
   - **Environment:** Node
   - **Build Command:** `npm install`
   - **Start Command:** `node server.js`
   - **Runtime:** Node
   - Add environment variable:
     - Key: `PORT`
     - Value: `3000`

3. **Deploy**
   - Click "Create Web Service"
   - Backend is now live at `https://your-backend.onrender.com`

4. **Update Frontend**
   - Go back to Vercel
   - Update environment variable `NEXT_PUBLIC_API_URL`
   - Trigger redeploy

---

## Option 2: Docker + Docker Compose (Local)

### Prerequisites
- Docker installed
- Docker Compose installed

### Deploy Locally

1. **Build Images**
   ```bash
   docker-compose build
   ```

2. **Start Services**
   ```bash
   docker-compose up
   ```

3. **Access Application**
   - Frontend: `http://localhost:3001`
   - Backend: `http://localhost:3000`

4. **Stop Services**
   ```bash
   docker-compose down
   ```

### View Logs
```bash
docker-compose logs -f backend
docker-compose logs -f frontend
```

---

## Option 3: Docker Hub + AWS/GCP/Azure

### Push to Docker Hub

1. **Login to Docker**
   ```bash
   docker login
   ```

2. **Build Backend**
   ```bash
   docker build -f backend.Dockerfile -t yourusername/web3-career-hub-backend:latest .
   docker push yourusername/web3-career-hub-backend:latest
   ```

3. **Build Frontend**
   ```bash
   docker build -f frontend.Dockerfile -t yourusername/web3-career-hub-frontend:latest .
   docker push yourusername/web3-career-hub-frontend:latest
   ```

### Deploy to AWS ECS

1. Create ECS cluster
2. Create task definitions for backend and frontend
3. Create services
4. Configure load balancer
5. Point domain to load balancer

### Deploy to Google Cloud Run

```bash
gcloud run deploy web3-backend \
  --source . \
  --platform managed \
  --region us-central1 \
  --allow-unauthenticated
```

---

## Option 4: Heroku (Deprecated - Use Railway)

### Railway Deployment

1. **Go to Railway**
   - Visit https://railway.app
   - Click "New Project"
   - Select "Deploy from GitHub"

2. **Backend Setup**
   ```bash
   # In railway.yml at root
   services:
     backend:
       root: backend
       start: "node server.js"
   ```

3. **Frontend Setup**
   ```bash
   # In railway.yml at root
   services:
     frontend:
       root: frontend
       start: "npm start"
   ```

4. **Deploy**
   - Push to GitHub
   - Railway auto-deploys

---

## Option 5: DigitalOcean App Platform

1. **Connect GitHub**
   - Go to DigitalOcean App Platform
   - Click "Create App"
   - Connect GitHub repository

2. **Configure Services**
   - Add backend service
   - Add frontend service
   - Set environment variables

3. **Deploy**
   - Click "Create Resources"
   - Services deploy automatically

---

## Environment Variables by Platform

### Vercel (Frontend)
```
NEXT_PUBLIC_API_URL=https://your-backend-url.com
```

### Render/Railway (Backend)
```
NODE_ENV=production
PORT=3000
DATABASE_PATH=/data/database.db
```

### Docker
```
NEXT_PUBLIC_API_URL=http://backend:3000
NODE_ENV=production
PORT=3000
```

---

## Database Persistence

### Local Docker
```yaml
volumes:
  - ./backend/database.db:/app/backend/database.db
```

### Cloud Deployment
Options:
1. **SQLite with Persistent Storage**
   - AWS EBS, GCP Persistent Disks, Azure Persistent Volumes

2. **PostgreSQL**
   - Replace SQLite with PostgreSQL
   - Update `backend/database.js`
   - Use cloud database service

3. **MongoDB Atlas**
   - Free tier available
   - Managed cloud database

---

## SSL/HTTPS Setup

### Vercel
- Automatic SSL certificate
- Custom domains supported

### Railway
- Automatic SSL certificate
- Custom domains via CNAME

### DigitalOcean
- Free SSL via Let's Encrypt
- Configure in App Platform

### AWS
- Use AWS Certificate Manager
- Attach to CloudFront distribution

---

## Custom Domain Setup

### For Frontend
1. Get your domain from registrar (GoDaddy, Namecheap, etc.)
2. Update DNS records:
   - **Vercel:** Add CNAME to vercel domain
   - **Railway:** Add CNAME to railway domain
3. Add domain in hosting platform settings

### For Backend
1. Create subdomain (e.g., `api.yourdomain.com`)
2. Point to backend service
3. Update frontend environment variable

Example:
```
NEXT_PUBLIC_API_URL=https://api.yourdomain.com
```

---

## Monitoring & Logging

### Vercel
- Dashboard analytics
- Error tracking
- Performance monitoring

### Railway/Render
- Real-time logs
- Deployment history
- Resource usage

### Docker
```bash
# View logs
docker logs container-name

# Follow logs
docker logs -f container-name

# Container stats
docker stats
```

---

## CI/CD Pipeline

### GitHub Actions (Automatic Deployment)

Create `.github/workflows/deploy.yml`:

```yaml
name: Deploy

on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    
    steps:
      - uses: actions/checkout@v3
      
      - name: Deploy Frontend
        run: |
          # Deploy frontend to Vercel
          npm install -g vercel
          vercel --prod --token ${{ secrets.VERCEL_TOKEN }}
      
      - name: Deploy Backend
        run: |
          # Deploy backend to Render
          curl https://api.render.com/deploy/srv-${{ secrets.RENDER_SERVICE_ID }}?key=${{ secrets.RENDER_API_KEY }}
```

---

## Scaling Strategies

### Horizontal Scaling
1. Use load balancer (AWS ALB, GCP Cloud Load Balancing)
2. Deploy multiple backend instances
3. Use database replication

### Vertical Scaling
1. Increase instance size
2. Upgrade CPU/Memory
3. Optimize code

### Caching
1. Add Redis cache layer
2. Implement CloudFront CDN
3. Browser cache headers

### Database Optimization
1. Add indexes to frequently queried fields
2. Implement connection pooling
3. Archive old data
4. Use read replicas

---

## Backup & Recovery

### Database Backups
```bash
# Local SQLite backup
cp backend/database.db backups/database-$(date +%Y%m%d).db

# Automated backup (cron job)
0 2 * * * cp /path/to/database.db /backups/database-$(date +\%Y\%m\%d).db
```

### Version Control
- Always use git for code backup
- Tag releases: `git tag -a v1.0.0 -m "Release 1.0.0"`
- Push to multiple remotes for redundancy

### Disaster Recovery Plan
1. Database backup strategy
2. Code backup (GitHub)
3. Configuration backup
4. Recovery time objective (RTO)
5. Recovery point objective (RPO)

---

## Security Checklist

- [ ] Use HTTPS everywhere
- [ ] Environment variables not committed
- [ ] CORS properly configured
- [ ] Input validation on all endpoints
- [ ] SQL injection prevention
- [ ] Rate limiting enabled
- [ ] Authentication tokens secure
- [ ] Secrets in environment variables
- [ ] Database backups encrypted
- [ ] Logs monitored for errors

---

## Performance Optimization

### Frontend
```bash
# Build analysis
npm run build -- --analyze

# Lighthouse audit
npm run lighthouse
```

### Backend
```bash
# Monitor performance
node --inspect=0.0.0.0:9229 server.js

# Load testing
npm install -g autocannon
autocannon http://localhost:3000
```

### Database
- Use indexes on frequently queried fields
- Implement query caching
- Archive old records
- Normalize data structure

---

## Troubleshooting Deployments

### Frontend Not Loading
1. Check API URL in environment variables
2. Verify CORS settings in backend
3. Check browser console for errors
4. Clear cache and rebuild

### Backend Connection Errors
1. Verify backend is running
2. Check firewall rules
3. Verify API URL in frontend
4. Check database connection

### Database Issues
1. Verify database file exists
2. Check file permissions
3. Ensure sufficient disk space
4. Verify connection string

### Environmental Variable Issues
1. Verify variables are set
2. Restart service after updating
3. Check variable names match code
4. Verify values are correct

---

## Cost Estimation

### Free Tier Options
- **Vercel Frontend:** Free with limits
- **Railway Backend:** $5/month credit
- **SQLite Database:** Free (local)

### Paid Options
- **Vercel:** $20/month (Pro)
- **Render:** $7/month (basic)
- **AWS:** Variable (pay-as-you-go)
- **DigitalOcean:** $5/month (basic droplet)

---

## Post-Deployment Checklist

- [ ] Frontend accessible at URL
- [ ] Backend accessible at API URL
- [ ] MetaMask wallet connection works
- [ ] Can enroll in courses
- [ ] Can apply to jobs
- [ ] Admin panel accessible
- [ ] Database persists data
- [ ] Logs show no errors
- [ ] Performance acceptable
- [ ] HTTPS working
- [ ] Custom domain working (if applicable)
- [ ] Backups automated
- [ ] Monitoring configured

---

## Additional Resources

- [Vercel Documentation](https://vercel.com/docs)
- [Next.js Deployment](https://nextjs.org/docs/deployment)
- [Node.js Best Practices](https://nodejs.org/en/docs/)
- [Docker Documentation](https://docs.docker.com)
- [Railway Documentation](https://docs.railway.app)
- [DigitalOcean App Platform](https://docs.digitalocean.com/products/app-platform/)

---

**Your deployment should be up and running! Monitor logs and set up alerts for production reliability.**