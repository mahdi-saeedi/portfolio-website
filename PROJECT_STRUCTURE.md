# Portfolio Website - Project Structure

```
portfolio-website/
│
├── frontend/                          # React Frontend Application
│   ├── public/                        # Static assets
│   │   └── vite.svg                  # Vite logo
│   │
│   ├── src/
│   │   ├── components/               # Reusable UI components
│   │   │   ├── Button.tsx           # Button component with variants
│   │   │   ├── Card.tsx             # Card container component
│   │   │   ├── Footer.tsx           # Footer with links and social media
│   │   │   └── Navbar.tsx           # Navigation bar with mobile menu
│   │   │
│   │   ├── context/                  # React Context
│   │   │   └── ThemeContext.tsx     # Theme provider (light/dark mode)
│   │   │
│   │   ├── pages/                    # Page components
│   │   │   ├── Home.tsx             # Home page with hero section
│   │   │   ├── About.tsx            # About page with skills and experience
│   │   │   ├── Projects.tsx         # Projects page (fetches from API)
│   │   │   └── Contact.tsx          # Contact page with form
│   │   │
│   │   ├── types/                    # TypeScript type definitions
│   │   │   └── index.ts             # Shared types
│   │   │
│   │   ├── utils/                    # Utility functions
│   │   │   └── api.ts               # API service with axios
│   │   │
│   │   ├── App.tsx                   # Main app component with routing
│   │   ├── main.tsx                  # App entry point
│   │   └── index.css                 # Global styles with Tailwind
│   │
│   ├── .env                          # Environment variables
│   ├── .eslintrc.cjs                 # ESLint configuration
│   ├── Dockerfile                    # Frontend Docker configuration
│   ├── index.html                    # HTML template
│   ├── package.json                  # Frontend dependencies
│   ├── postcss.config.js             # PostCSS configuration
│   ├── tailwind.config.js            # Tailwind CSS configuration
│   ├── tsconfig.json                 # TypeScript configuration
│   ├── tsconfig.node.json            # TypeScript config for Vite
│   ├── vite.config.ts                # Vite configuration
│   └── README.md                     # Frontend documentation
│
├── backend/                           # Node.js Backend API
│   ├── src/
│   │   ├── db/                       # Database related files
│   │   │   ├── connection.ts        # PostgreSQL connection pool
│   │   │   └── init.ts              # Database initialization script
│   │   │
│   │   ├── routes/                   # API route handlers
│   │   │   ├── projects.ts          # GET /api/projects
│   │   │   └── contact.ts           # POST /api/contact
│   │   │
│   │   ├── types/                    # TypeScript type definitions
│   │   │   └── index.ts             # Backend types
│   │   │
│   │   └── server.ts                 # Main server file with Fastify
│   │
│   ├── .env                          # Environment variables
│   ├── Dockerfile                    # Backend Docker configuration
│   ├── package.json                  # Backend dependencies
│   ├── tsconfig.json                 # TypeScript configuration
│   └── README.md                     # Backend documentation
│
├── nginx/                             # Nginx Configuration
│   └── nginx.conf                    # Reverse proxy configuration
│
├── .gitignore                         # Git ignore rules
├── docker-compose.yml                 # Docker Compose configuration
├── Makefile                          # Convenient make commands
├── setup.sh                          # Setup script for quick start
├── QUICKSTART.md                     # Quick start guide
└── README.md                         # Main project documentation

```

## Key Features by Component

### Frontend Components

**Button.tsx**
- Three variants: primary, secondary, outline
- Three sizes: sm, md, lg
- Fully typed with TypeScript
- Responsive and accessible

**Card.tsx**
- Container component with shadow
- Optional hover effect
- Dark mode support

**Navbar.tsx**
- Responsive navigation
- Mobile hamburger menu
- Active link highlighting
- Theme toggle integration

**Footer.tsx**
- Three-column layout
- Social media links
- Quick navigation links
- Copyright notice

### Frontend Pages

**Home.tsx**
- Hero section with profile image
- Call-to-action buttons
- Quick stats section
- Featured skills grid

**About.tsx**
- Professional bio
- Skills organized by category
- Work experience timeline
- Detailed achievements

**Projects.tsx**
- Fetches projects from backend API
- Loading and error states
- Project cards with tech stack
- External project links

**Contact.tsx**
- Form validation
- API integration
- Success/error messages
- Contact information display

### Backend Routes

**GET /api/projects**
- Returns all projects from database
- Ordered by creation date
- Includes: id, title, description, tech_stack, link

**POST /api/contact**
- Validates form data
- Email format validation
- Stores message in database
- Returns success/error response

### Database Schema

**projects table**
- id: SERIAL PRIMARY KEY
- title: VARCHAR(255)
- description: TEXT
- tech_stack: TEXT[]
- link: VARCHAR(255)
- created_at: TIMESTAMP

**messages table**
- id: SERIAL PRIMARY KEY
- name: VARCHAR(255)
- email: VARCHAR(255)
- message: TEXT
- created_at: TIMESTAMP

### Docker Services

**frontend**
- Vite development server
- Port 5173
- Hot reload enabled
- Volume mounted for development

**backend**
- Fastify API server
- Port 3000
- Environment variables from .env
- Depends on database

**db**
- PostgreSQL 15 Alpine
- Port 5432
- Persistent volume for data
- Health check configured

**nginx** (production profile)
- Reverse proxy
- Port 80
- Routes /api to backend
- Routes / to frontend

## Technology Stack Summary

### Frontend
- **Framework**: React 18
- **Language**: TypeScript
- **Build Tool**: Vite
- **Styling**: Tailwind CSS
- **Routing**: React Router v6
- **HTTP Client**: Axios
- **State Management**: React Context (Theme)

### Backend
- **Framework**: Fastify
- **Language**: TypeScript
- **Database**: PostgreSQL 15
- **Database Client**: node-postgres (pg)
- **Environment**: dotenv

### DevOps
- **Containerization**: Docker
- **Orchestration**: Docker Compose
- **Reverse Proxy**: Nginx
- **Development**: Hot reload on both frontend and backend

## Development Workflow

1. **Start Development**:
   ```bash
   docker-compose up
   ```

2. **Initialize Database**:
   ```bash
   docker-compose exec backend npm run init-db
   ```

3. **View Logs**:
   ```bash
   docker-compose logs -f
   ```

4. **Make Changes**:
   - Edit files in `frontend/src` or `backend/src`
   - Changes auto-reload in development mode

5. **Stop Services**:
   ```bash
   docker-compose down
   ```

## Production Considerations

### Security
- Add authentication/authorization
- Implement rate limiting
- Use HTTPS with SSL certificates
- Sanitize user inputs
- Add CSRF protection

### Performance
- Enable caching headers
- Implement CDN for static assets
- Add database indexing
- Use connection pooling
- Implement API pagination

### Monitoring
- Add logging service
- Implement error tracking
- Set up health checks
- Monitor database performance
- Track API response times

### Scalability
- Use environment-specific configs
- Implement horizontal scaling
- Add load balancer
- Use managed database service
- Implement caching layer (Redis)
