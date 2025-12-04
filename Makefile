# Makefile for Portfolio Website

.PHONY: help install dev build start stop clean init-db logs

help: ## Show this help message
	@echo "Available commands:"
	@grep -E '^[a-zA-Z_-]+:.*?## .*$$' $(MAKEFILE_LIST) | awk 'BEGIN {FS = ":.*?## "}; {printf "\033[36m%-15s\033[0m %s\n", $$1, $$2}'

install: ## Install dependencies for frontend and backend
	@echo "Installing frontend dependencies..."
	cd frontend && npm install
	@echo "Installing backend dependencies..."
	cd backend && npm install
	@echo "✅ All dependencies installed!"

dev: ## Start development environment with Docker Compose
	docker-compose up

build: ## Build Docker images
	docker-compose build

start: ## Start all services in detached mode
	docker-compose up -d

stop: ## Stop all services
	docker-compose down

clean: ## Stop all services and remove volumes
	docker-compose down -v
	rm -rf frontend/node_modules frontend/dist
	rm -rf backend/node_modules backend/dist

init-db: ## Initialize database tables and seed data
	docker-compose exec backend npm run init-db

logs: ## View logs from all services
	docker-compose logs -f

logs-frontend: ## View frontend logs
	docker-compose logs -f frontend

logs-backend: ## View backend logs
	docker-compose logs -f backend

logs-db: ## View database logs
	docker-compose logs -f db

restart: ## Restart all services
	docker-compose restart

restart-frontend: ## Restart frontend service
	docker-compose restart frontend

restart-backend: ## Restart backend service
	docker-compose restart backend

shell-backend: ## Open shell in backend container
	docker-compose exec backend sh

shell-db: ## Open PostgreSQL shell
	docker-compose exec db psql -U postgres -d portfolio_db

test-frontend: ## Run frontend tests
	cd frontend && npm test

test-backend: ## Run backend tests
	cd backend && npm test

lint-frontend: ## Lint frontend code
	cd frontend && npm run lint

format: ## Format code with prettier (if configured)
	cd frontend && npm run format || echo "No format script"
	cd backend && npm run format || echo "No format script"

backup-db: ## Backup database
	docker-compose exec -T db pg_dump -U postgres portfolio_db > backup_$$(date +%Y%m%d_%H%M%S).sql
	@echo "✅ Database backed up!"

restore-db: ## Restore database from backup (usage: make restore-db FILE=backup.sql)
	docker-compose exec -T db psql -U postgres -d portfolio_db < $(FILE)
	@echo "✅ Database restored!"
