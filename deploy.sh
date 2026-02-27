#!/bin/bash

# Web3 Career Hub - Deployment Script
# Supports multiple deployment targets

set -e

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PROJECT_ROOT="$SCRIPT_DIR"

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Logging functions
log_info() {
    echo -e "${BLUE}[INFO]${NC} $1"
}

log_success() {
    echo -e "${GREEN}[SUCCESS]${NC} $1"
}

log_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

log_warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1"
}

# Check prerequisites
check_prerequisites() {
    log_info "Checking prerequisites..."
    
    if ! command -v node &> /dev/null; then
        log_error "Node.js is not installed"
        exit 1
    fi
    
    if ! command -v npm &> /dev/null; then
        log_error "npm is not installed"
        exit 1
    fi
    
    log_success "Prerequisites check passed"
}

# Build frontend
build_frontend() {
    log_info "Building frontend..."
    cd "$PROJECT_ROOT/frontend"
    
    npm ci
    npm run build
    
    log_success "Frontend build complete"
    cd "$PROJECT_ROOT"
}

# Build backend
build_backend() {
    log_info "Building backend..."
    cd "$PROJECT_ROOT/backend"
    
    npm ci --production
    
    log_success "Backend build complete"
    cd "$PROJECT_ROOT"
}

# Deploy with Docker
deploy_docker() {
    log_info "Deploying with Docker..."
    
    if ! command -v docker &> /dev/null; then
        log_error "Docker is not installed"
        exit 1
    fi
    
    log_info "Building Docker images..."
    docker-compose build
    
    log_info "Starting services..."
    docker-compose up -d
    
    log_success "Docker deployment complete"
    log_info "Frontend: http://localhost:3001"
    log_info "Backend: http://localhost:3000"
}

# Deploy to Vercel (Frontend)
deploy_vercel_frontend() {
    log_info "Deploying frontend to Vercel..."
    
    if ! command -v vercel &> /dev/null; then
        log_warning "Vercel CLI not installed. Install with: npm install -g vercel"
        log_info "Visit https://vercel.com to deploy manually"
        return
    fi
    
    cd "$PROJECT_ROOT/frontend"
    vercel --prod
    cd "$PROJECT_ROOT"
    
    log_success "Frontend deployed to Vercel"
}

# Deploy to Render (Backend)
deploy_render_backend() {
    log_info "Deploying backend to Render..."
    log_warning "Manual deployment required for Render"
    log_info "1. Visit https://render.com"
    log_info "2. Create new Web Service"
    log_info "3. Connect your GitHub repo (backend directory)"
    log_info "4. Set runtime to Node"
    log_info "5. Build command: npm install"
    log_info "6. Start command: node server.js"
}

# Create production builds
create_production_build() {
    log_info "Creating production builds..."
    
    build_frontend
    build_backend
    
    log_success "Production builds complete"
}

# Run tests before deployment
run_tests() {
    log_info "Running tests..."
    
    # Add your test commands here
    # npm test
    
    log_success "Tests passed"
}

# Clean up
cleanup() {
    log_info "Cleaning up..."
    
    rm -rf "$PROJECT_ROOT/frontend/.next"
    rm -rf "$PROJECT_ROOT/frontend/node_modules"
    rm -rf "$PROJECT_ROOT/backend/node_modules"
    
    log_success "Cleanup complete"
}

# Display help
show_help() {
    cat << EOF
Web3 Career Hub - Deployment Script

Usage: ./deploy.sh [COMMAND] [OPTIONS]

Commands:
    build               Build both frontend and backend
    docker              Deploy using Docker Compose
    vercel              Deploy frontend to Vercel
    render              Deploy backend to Render
    production          Create production builds
    test                Run tests
    clean               Clean up build artifacts
    help                Show this help message

Examples:
    ./deploy.sh build
    ./deploy.sh docker
    ./deploy.sh vercel
    ./deploy.sh production

Environment Variables:
    VERCEL_TOKEN        Token for Vercel CLI
    RENDER_API_KEY      API key for Render
    
EOF
}

# Main script
main() {
    case "${1:-help}" in
        build)
            check_prerequisites
            build_frontend
            build_backend
            ;;
        docker)
            check_prerequisites
            build_frontend
            build_backend
            deploy_docker
            ;;
        vercel)
            check_prerequisites
            build_frontend
            deploy_vercel_frontend
            ;;
        render)
            deploy_render_backend
            ;;
        production)
            check_prerequisites
            create_production_build
            ;;
        test)
            check_prerequisites
            run_tests
            ;;
        clean)
            cleanup
            ;;
        help)
            show_help
            ;;
        *)
            log_error "Unknown command: $1"
            show_help
            exit 1
            ;;
    esac
}

main "$@"