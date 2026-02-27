# Build stage for frontend
FROM node:18-alpine AS frontend-build

WORKDIR /app/frontend
COPY frontend/package*.json ./
RUN npm ci

COPY frontend .
RUN npm run build

# Build stage for backend
FROM node:18-alpine AS backend-build

WORKDIR /app/backend
COPY backend/package*.json ./
RUN npm ci --production

COPY backend .

# Production stage
FROM node:18-alpine

WORKDIR /app

# Copy frontend build
COPY --from=frontend-build /app/frontend/.next ./frontend/.next
COPY --from=frontend-build /app/frontend/public ./frontend/public
COPY --from=frontend-build /app/frontend/package*.json ./frontend/

# Copy backend
COPY --from=backend-build /app/backend ./backend

# Install serve for frontend
RUN npm install -g serve

# Expose ports
EXPOSE 3000 3001

# Start both services
CMD ["sh", "-c", "cd /app/backend && node server.js & cd /app/frontend && npm start"]