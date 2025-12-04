# Full-Stack Portfolio Website

A modern, production-ready portfolio website built with React, TypeScript, Fastify, and PostgreSQL.

## Features

- ✨ Modern React frontend with TypeScript and Vite
- 🎨 Tailwind CSS for responsive design
- 🌓 Light/Dark mode toggle
- 🚀 Fast Fastify backend with TypeScript
- 🗄️ PostgreSQL database
- 🐳 Fully Dockerized with docker-compose
- 📱 Responsive design for all devices
- 🔒 Input validation and error handling

## Tech Stack

### Frontend
- React 18
- TypeScript
- Vite
- Tailwind CSS
- React Router
- Axios

### Backend
- Node.js
- Fastify
- TypeScript
- PostgreSQL
- node-postgres (pg)

### DevOps
- Docker & Docker Compose
- Nginx (reverse proxy)

## Project Structure

```
portfolio-website/
├── frontend/               # React frontend application
│   ├── src/
│   │   ├── components/    # Reusable UI components
│   │   ├── pages/         # Page components
│   │   ├── context/       # React context (theme)
│   │   ├── types/         # TypeScript types
│   │   └── App.tsx        # Main app component
│   ├── public/            # Static assets
│   └── Dockerfile         # Frontend Docker configuration
├── backend/               # Fastify backend API
│   ├── src/
│   │   ├── routes/        # API route handlers
│   │   ├── db/            # Database configuration
│   │   ├── types/         # TypeScript types
│   │   └── server.ts      # Main server file
│   └── Dockerfile         # Backend Docker configuration
├── nginx/                 # Nginx configuration
│   └── nginx.conf
├── docker-compose.yml     # Docker compose configuration
└── README.md             # This file
```

## Getting Started

### Prerequisites

- Docker and Docker Compose installed
- Node.js 18+ (for local development without Docker)
- PostgreSQL 15+ (for local development without Docker)

### Quick Start with Docker (Recommended)

1. Clone the repository:
```bash
git clone <repository-url>
cd portfolio-website
```

2. Start all services with Docker Compose:
```bash
docker-compose up --build
```

3. Access the application:
   - Frontend: http://localhost:80
   - Backend API: http://localhost:3000
   - Database: localhost:5432

4. Initialize the database (first time only):
```bash
docker-compose exec backend npm run init-db
```

### Local Development (Without Docker)

#### Database Setup

1. Install PostgreSQL and create a database:
```bash
createdb portfolio_db
```

2. Set environment variables:
```bash
export DATABASE_URL="postgresql://postgres:postgres@localhost:5432/portfolio_db"
```

#### Backend Setup

1. Navigate to backend directory:
```bash
cd backend
```

2. Install dependencies:
```bash
npm install
```

3. Initialize the database:
```bash
npm run init-db
```

4. Start the development server:
```bash
npm run dev
```

The backend will run on http://localhost:3000

#### Frontend Setup

1. Navigate to frontend directory:
```bash
cd frontend
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

The frontend will run on http://localhost:5173

## API Endpoints

### Projects
- `GET /api/projects` - Get all projects
  - Response: Array of project objects

### Contact
- `POST /api/contact` - Submit contact form
  - Body: `{ name: string, email: string, message: string }`
  - Response: Success message

## Database Schema

### projects table
```sql
CREATE TABLE projects (
  id SERIAL PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  description TEXT NOT NULL,
  tech_stack TEXT[] NOT NULL,
  link VARCHAR(255)
);
```

### messages table
```sql
CREATE TABLE messages (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  message TEXT NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

## Environment Variables

### Backend (.env)
```
DATABASE_URL=postgresql://postgres:postgres@db:5432/portfolio_db
PORT=3000
NODE_ENV=development
```

### Frontend (.env)
```
VITE_API_URL=http://localhost:3000
```

## Production Deployment

### With Docker Compose

1. Update environment variables in `docker-compose.yml`
2. Build and start services:
```bash
docker-compose -f docker-compose.yml up -d --build
```

### Manual Deployment

1. Build the frontend:
```bash
cd frontend
npm run build
```

2. Build the backend:
```bash
cd backend
npm run build
```

3. Deploy the `frontend/dist` folder to your static hosting
4. Deploy the backend to your Node.js hosting
5. Set up PostgreSQL database with proper credentials
6. Configure Nginx as reverse proxy

## Customization

### Adding New Projects

You can add projects directly to the database or create a seed script:

```sql
INSERT INTO projects (title, description, tech_stack, link)
VALUES (
  'Project Name',
  'Project description',
  ARRAY['React', 'TypeScript', 'Node.js'],
  'https://github.com/username/project'
);
```

### Styling

- Edit `frontend/src/index.css` for global styles
- Modify Tailwind classes in components
- Update `frontend/tailwind.config.js` for theme customization

## Scripts

### Frontend
- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

### Backend
- `npm run dev` - Start development server with hot reload
- `npm run build` - Build TypeScript to JavaScript
- `npm start` - Start production server
- `npm run init-db` - Initialize database tables

## Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## License

MIT License - feel free to use this project for your portfolio!

## Support

For issues or questions, please open an issue on GitHub.
