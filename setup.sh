#!/bin/bash

# Setup script for portfolio website
set -e

echo "╔═══════════════════════════════════════════════╗"
echo "║                                               ║"
echo "║        Portfolio Website Setup Script         ║"
echo "║                                               ║"
echo "╚═══════════════════════════════════════════════╝"
echo ""

# Check if Docker is installed
if ! command -v docker &> /dev/null; then
    echo "❌ Docker is not installed. Please install Docker first."
    exit 1
fi

# Check if Docker Compose is installed
if ! command -v docker compose &> /dev/null; then
    echo "❌ Docker Compose is not installed. Please install Docker Compose first."
    exit 1
fi

echo "✅ Docker and Docker Compose are installed"
echo ""

# Ask for environment
echo "Choose your environment:"
echo "1) Development (with hot reload)"
echo "2) Production (optimized build)"
read -p "Enter your choice (1 or 2): " env_choice

if [ "$env_choice" == "1" ]; then
    ENV_TYPE="development"
    COMPOSE_FILE="docker-compose.dev.yml"
    
    echo ""
    echo "🐳 Setting up DEVELOPMENT environment..."
    echo ""
    
    # Stop any running containers
    echo "🛑 Stopping any existing containers..."
    docker compose -f docker-compose.dev.yml down 2>/dev/null || true
    
    # Build and start services
    echo "📦 Building Docker images..."
    docker compose -f docker-compose.dev.yml build
    
    echo "🚀 Starting services..."
    docker compose -f docker-compose.dev.yml up -d
    
    # Wait for services
    echo "⏳ Waiting for services to be ready..."
    sleep 15
    
    # Initialize database
    echo "🗄️ Initializing database..."
    docker compose -f docker-compose.dev.yml exec backend npm run init-db
    
    echo ""
    echo "╔═══════════════════════════════════════════════╗"
    echo "║                                               ║"
    echo "║   🎉 DEVELOPMENT Setup Complete!              ║"
    echo "║                                               ║"
    echo "║   Frontend (Vite): http://localhost:5173      ║"
    echo "║   Nginx Proxy: http://localhost:80            ║"
    echo "║   Backend API: http://localhost:3000          ║"
    echo "║   Database: localhost:5432                    ║"
    echo "║                                               ║"
    echo "║   Hot reload enabled for frontend & backend   ║"
    echo "║                                               ║"
    echo "║   View logs: docker compose -f $COMPOSE_FILE logs -f     ║"
    echo "║   Stop: docker compose -f $COMPOSE_FILE down             ║"
    echo "║                                               ║"
    echo "╚═══════════════════════════════════════════════╝"
    
elif [ "$env_choice" == "2" ]; then
    ENV_TYPE="production"
    COMPOSE_FILE="docker-compose.prod.yml"
    
    echo ""
    echo "🐳 Setting up PRODUCTION environment..."
    echo ""
    
    # Build frontend first
    echo "📦 Building frontend for production..."
    
    # Use Docker to build frontend
    echo "🏗️  Building frontend in Docker container..."
    docker run --rm \
        -v "$(pwd)/frontend:/app" \
        -w /app \
        -e VITE_API_URL=/api \
        node:18-alpine \
        sh -c "npm install && npm run build"
    
    # Stop any running containers
    echo "🛑 Stopping any existing containers..."
    docker compose -f docker-compose.prod.yml down 2>/dev/null || true
    
    # Build backend
    echo "📦 Building backend Docker image..."
    docker compose -f docker-compose.prod.yml build
    
    # Start services
    echo "🚀 Starting services..."
    docker compose -f docker-compose.prod.yml up -d
    
    # Wait for services
    echo "⏳ Waiting for services to be ready..."
    sleep 15
    
    # Initialize database
    echo "🗄️ Initializing database..."
    docker compose -f docker-compose.prod.yml exec backend npm run init-db
    
    echo ""
    echo "╔═══════════════════════════════════════════════╗"
    echo "║                                               ║"
    echo "║   🎉 PRODUCTION Setup Complete!               ║"
    echo "║                                               ║"
    echo "║   Website: http://localhost:80                ║"
    echo "║   Backend API: http://localhost:3000          ║"
    echo "║   Database: localhost:5432                    ║"
    echo "║                                               ║"
    echo "║   Optimized build running!                    ║"
    echo "║                                               ║"
    echo "║   View logs: docker compose -f $COMPOSE_FILE logs -f     ║"
    echo "║   Stop: docker compose -f $COMPOSE_FILE down             ║"
    echo "║                                               ║"
    echo "╚═══════════════════════════════════════════════╝"
    
else
    echo "❌ Invalid choice. Please run the script again."
    exit 1
fi
