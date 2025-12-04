# Portfolio Website - Complete Setup Guide

## Quick Start

Run the setup script and choose your environment:

```bash
./setup.sh
```

Choose:
- **1** for Development (hot reload, debugging)
- **2** for Production (optimized build)

That's it! The script handles everything automatically.

---

## What's Fixed

### ✅ Development Environment
- Hot reload for both frontend and backend
- Vite dev server on port 5173
- Backend with tsx watch mode
- Nginx proxies both services
- Static files served correctly
- Database initialization works

### ✅ Production Environment
- Frontend builds to optimized static files
- Nginx serves static files directly (no Vite dev server)
- Backend compiled to JavaScript
- Database initialization uses compiled code
- All environment variables set correctly

### ✅ Setup Script
- Separate docker-compose files for dev/prod
- Automatic frontend build for production
- Uses Docker to build (no local npm required)
- Proper service initialization
- Database setup automated

---

## File Structure

```
├── docker-compose.dev.yml      # Development configuration
├── docker-compose.prod.yml     # Production configuration
├── setup.sh                     # One-command setup script
├── backend/
│   ├── Dockerfile              # Production build
│   ├── Dockerfile.dev          # Development build
│   └── package.json            # init-db uses compiled JS
├── frontend/
│   ├── Dockerfile              # Production build (nginx)
│   ├── Dockerfile.dev          # Development (Vite)
│   └── dist/                   # Production build output
└── nginx/
    ├── nginx.dev.conf          # Proxies to Vite + Backend
    └── nginx.prod.conf         # Serves static + Backend API
```

---

## Access URLs

### Development Mode
- Frontend (Vite): http://localhost:5173
- Nginx Proxy: http://localhost:80
- Backend API: http://localhost:3000
- Database: localhost:5432

### Production Mode
- Website: http://localhost:80
- Backend API: http://localhost:3000
- Database: localhost:5432

---

## Common Commands

### Start
```bash
./setup.sh
```

### View Logs (Dev)
```bash
docker compose -f docker-compose.dev.yml logs -f
```

### View Logs (Prod)
```bash
docker compose -f docker-compose.prod.yml logs -f
```

### Stop (Dev)
```bash
docker compose -f docker-compose.dev.yml down
```

### Stop (Prod)
```bash
docker compose -f docker-compose.prod.yml down
```

### Rebuild Everything
```bash
# Stop first, then run setup again
docker compose -f docker-compose.dev.yml down
./setup.sh
```

---

## Key Changes Made

1. **Separate Compose Files**: `docker-compose.dev.yml` and `docker-compose.prod.yml`
2. **Separate Nginx Configs**: `nginx.dev.conf` (proxies) and `nginx.prod.conf` (static)
3. **Backend init-db**: Changed from `tsx` to `node dist/db/init.js`
4. **Frontend Build**: Automated in setup script using Docker
5. **Dev Dockerfile**: Builds TypeScript for init-db
6. **Prod Dockerfile**: Uses compiled JavaScript only

---

## Troubleshooting

### Port Already in Use
```bash
# Find and stop the process using port 80 or 3000
lsof -ti:80 | xargs kill -9
lsof -ti:3000 | xargs kill -9
```

### Database Issues
```bash
# Reset database
docker compose -f docker-compose.dev.yml down -v
./setup.sh
```

### Frontend Not Building
```bash
# Manually build frontend
cd frontend
npm install
VITE_API_URL=/api npm run build
cd ..
```

### Clear Everything and Start Fresh
```bash
docker compose -f docker-compose.dev.yml down -v
docker compose -f docker-compose.prod.yml down -v
docker system prune -a
./setup.sh
```

---

## Environment Variables

### Backend (.env)
```
DATABASE_URL=postgresql://postgres:postgres@db:5432/portfolio_db
PORT=3000
NODE_ENV=development
```

### Frontend (.env.development)
```
VITE_API_URL=http://localhost:3000
```

### Frontend (.env.production)
```
VITE_API_URL=/api
```

---

## Production Deployment

To deploy on a remote server:

1. Copy all files to server
2. Install Docker and Docker Compose
3. Run: `./setup.sh` and choose option 2
4. Update nginx config to use your domain
5. Set up SSL with Let's Encrypt if needed

---

**Everything is now working perfectly. Just run `./setup.sh` and select your environment!**
