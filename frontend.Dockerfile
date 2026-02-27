FROM node:18-alpine AS builder

WORKDIR /app

COPY frontend/package*.json ./

RUN npm ci

COPY frontend .

RUN npm run build

FROM node:18-alpine

WORKDIR /app

COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
COPY --from=builder /app/package*.json ./

RUN npm install -g serve

EXPOSE 3000

CMD ["serve", "-s", ".next", "-l", "3000"]