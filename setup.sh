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
if ! command -v docker compose &> /dev/null; then
    echo "❌ Docker Compose is not installed. Please install Docker Compose first."
    exit 1
fi

echo "✅ Docker and Docker Compose are installed"
echo ""

# Ask for environment
echo "Choose your environment:"
echo "1) Development"
echo "2) Production"
read -p "Enter your choice (1 or 2): " env_choice

# Set docker-compose file based on environment
if [ "$env_choice" == "1" ]; then
    ENV_TYPE="development"
    # Update docker-compose to use dev Dockerfiles
    sed -i.bak 's/dockerfile: Dockerfile$/dockerfile: Dockerfile.dev/g' docker-compose.yml
    sed -i.bak 's/NODE_ENV: production/NODE_ENV: development/g' docker-compose.yml
elif [ "$env_choice" == "2" ]; then
    ENV_TYPE="production"
    # Update docker-compose to use production Dockerfiles
    sed -i.bak 's/dockerfile: Dockerfile.dev$/dockerfile: Dockerfile/g' docker-compose.yml
    sed -i.bak 's/NODE_ENV: development/NODE_ENV: production/g' docker-compose.yml
else
    echo "❌ Invalid choice. Please run the script again."
    exit 1
fi

echo ""
echo "🐳 Setting up with Docker ($ENV_TYPE)..."
echo ""

# Build Docker images
echo "📦 Building Docker images..."
docker compose build

# Start services
echo "🚀 Starting services..."
docker compose up -d

# Wait for database to be ready
echo "⏳ Waiting for database to be ready..."
sleep 10

# Initialize database
echo "🗄️ Initializing database..."
docker compose exec -T backend npm run init-db

# Clean up backup files
rm -f docker-compose.yml.bak

echo ""
echo "╔═══════════════════════════════════════════════╗"
echo "║                                               ║"
echo "║   🎉 Setup complete! ($ENV_TYPE)              ║"
echo "║                                               ║"
echo "║   Frontend: http://localhost:80               ║"
echo "║   Backend API: http://localhost:3000          ║"
echo "║   Database: localhost:5432                    ║"
echo "║                                               ║"
echo "║   Run 'docker compose logs -f' to view logs   ║"
echo "║   Run 'docker compose down' to stop           ║"
echo "║                                               ║"
echo "╚═══════════════════════════════════════════════╝"
