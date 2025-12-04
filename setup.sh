#!/bin/bash

# Setup script for portfolio website
# This script helps with initial setup and configuration

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
if ! command -v docker-compose &> /dev/null; then
    echo "❌ Docker Compose is not installed. Please install Docker Compose first."
    exit 1
fi

echo "✅ Docker and Docker Compose are installed"
echo ""

# Ask if user wants to use Docker or local setup
echo "Choose your setup method:"
echo "1) Docker (recommended)"
echo "2) Local development"
read -p "Enter your choice (1 or 2): " choice

if [ "$choice" == "1" ]; then
    echo ""
    echo "🐳 Setting up with Docker..."
    echo ""
    
    # Build Docker images
    echo "📦 Building Docker images..."
    docker-compose build
    
    # Start services
    echo "🚀 Starting services..."
    docker-compose up -d
    
    # Wait for database to be ready
    echo "⏳ Waiting for database to be ready..."
    sleep 10
    
    # Initialize database
    echo "🗄️ Initializing database..."
    docker-compose exec -T backend npm run init-db
    
    echo ""
    echo "╔═══════════════════════════════════════════════╗"
    echo "║                                               ║"
    echo "║   🎉 Setup complete!                          ║"
    echo "║                                               ║"
    echo "║   Frontend: http://localhost:80               ║"
    echo "║   Backend API: http://localhost:3000          ║"
    echo "║   Database: localhost:5432                    ║"
    echo "║                                               ║"
    echo "║   Run 'docker-compose logs -f' to view logs   ║"
    echo "║   Run 'docker-compose down' to stop           ║"
    echo "║                                               ║"
    echo "╚═══════════════════════════════════════════════╝"
    
elif [ "$choice" == "2" ]; then
    echo ""
    echo "💻 Setting up for local development..."
    echo ""
    
    # Check if Node.js is installed
    if ! command -v node &> /dev/null; then
        echo "❌ Node.js is not installed. Please install Node.js 18+ first."
        exit 1
    fi
    
    # Check if PostgreSQL is installed
    if ! command -v psql &> /dev/null; then
        echo "⚠️ PostgreSQL CLI not found. Make sure PostgreSQL is installed and running."
    fi
    
    # Install frontend dependencies
    echo "📦 Installing frontend dependencies..."
    cd frontend
    npm install
    cd ..
    
    # Install backend dependencies
    echo "📦 Installing backend dependencies..."
    cd backend
    npm install
    cd ..
    
    echo ""
    echo "╔═══════════════════════════════════════════════╗"
    echo "║                                               ║"
    echo "║   Setup complete!                            ║"
    echo "║                                               ║"
    echo "║   Next steps:                                ║"
    echo "║   1. Set up PostgreSQL database              ║"
    echo "║   2. Update .env files with your config      ║"
    echo "║   3. Run 'npm run init-db' in backend        ║"
    echo "║   4. Run 'npm run dev' in both directories   ║"
    echo "║                                               ║"
    echo "╚═══════════════════════════════════════════════╝"
    
else
    echo "❌ Invalid choice. Please run the script again."
    exit 1
fi
