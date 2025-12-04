# Quick Start Guide

## Using Docker (Recommended)

1. Make sure Docker and Docker Compose are installed
2. Run the setup script:
   ```bash
   chmod +x setup.sh
   ./setup.sh
   ```
   Choose option 1 for Docker setup

3. Access your application:
   - Frontend: http://localhost:80
   - Backend API: http://localhost:3000
   - Health Check: http://localhost:3000/health

## Using Makefile

If you prefer using Makefile commands:

```bash
# Start development environment
make dev

# Or start in detached mode
make start

# View logs
make logs

# Initialize database
make init-db

# Stop all services
make stop
```

## Manual Docker Setup

```bash
# Build and start all services
docker-compose up --build

# In another terminal, initialize the database
docker-compose exec backend npm run init-db
```

## Local Development (Without Docker)

1. Install PostgreSQL and create a database
2. Install dependencies:
   ```bash
   cd frontend && npm install
   cd ../backend && npm install
   ```

3. Update environment variables:
   - `backend/.env` - Set your DATABASE_URL
   - `frontend/.env` - Set your VITE_API_URL

4. Initialize database:
   ```bash
   cd backend
   npm run init-db
   ```

5. Start backend:
   ```bash
   cd backend
   npm run dev
   ```

6. Start frontend (in another terminal):
   ```bash
   cd frontend
   npm run dev
   ```

## Environment Variables

### Backend (.env)
```
DATABASE_URL=postgresql://postgres:postgres@localhost:5432/portfolio_db
PORT=3000
NODE_ENV=development
```

### Frontend (.env)
```
VITE_API_URL=http://localhost:3000
```

## Troubleshooting

### Port already in use
If you get a port conflict error, you can change the ports in `docker-compose.yml`

### Database connection failed
Make sure PostgreSQL is running and the DATABASE_URL is correct

### Cannot connect to API
Check that the backend is running and VITE_API_URL is set correctly in frontend/.env

## Production Deployment

For production deployment with nginx reverse proxy:

```bash
docker-compose --profile production up -d
```

This will start nginx on port 80 as a reverse proxy.
