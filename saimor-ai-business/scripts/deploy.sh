#!/bin/bash
# 🚀 SAIMOR AI Business Platform - Production Deployment Script
# One-Command Production Deployment

set -e

echo "🚀 Starting SAIMOR AI Business Platform Deployment..."

# Check if .env file exists
if [ ! -f ".env" ]; then
    echo "❌ Error: .env file not found!"
    echo "📝 Please copy .env.example to .env and configure your settings."
    exit 1
fi

# Load environment variables
source .env

# Validate required environment variables
REQUIRED_VARS=("DOMAIN" "JWT_SECRET_KEY" "POSTGRES_PASSWORD" "OPENAI_API_KEY")

for var in "${REQUIRED_VARS[@]}"; do
    if [ -z "${!var}" ]; then
        echo "❌ Error: Required environment variable $var is not set!"
        exit 1
    fi
done

echo "✅ Environment validation passed"

# Create necessary directories
mkdir -p logs
mkdir -p backups
mkdir -p uploads

# Build and start services
echo "🐳 Building and starting Docker containers..."
docker-compose -f docker-compose.prod.yml down --remove-orphans
docker-compose -f docker-compose.prod.yml build --no-cache
docker-compose -f docker-compose.prod.yml up -d

# Wait for services to be ready
echo "⏳ Waiting for services to start..."
sleep 30

# Health checks
echo "🏥 Running health checks..."

# Check Gateway
echo "Checking API Gateway..."
if curl -f -s "https://$DOMAIN/health" > /dev/null; then
    echo "✅ API Gateway is healthy"
else
    echo "❌ API Gateway health check failed"
    docker-compose -f docker-compose.prod.yml logs gateway
    exit 1
fi

# Check API Documentation
echo "Checking API Documentation..."
if curl -f -s "https://$DOMAIN/docs" > /dev/null; then
    echo "✅ API Documentation is accessible"
else
    echo "❌ API Documentation check failed"
fi

# Display status
echo ""
echo "🎉 SAIMOR AI Business Platform Deployment Complete!"
echo ""
echo "📍 Production URLs:"
echo "   🌐 API Gateway: https://$DOMAIN"
echo "   📚 API Docs:    https://$DOMAIN/docs"
echo "   🏥 Health:      https://$DOMAIN/health"
echo "   📊 Monitoring:  https://$DOMAIN/monitoring"
echo ""
echo "🔥 Ready for Business!"
echo "💰 Start onboarding your first paying customers!"
echo ""

# Show running containers
echo "🐳 Running Services:"
docker-compose -f docker-compose.prod.yml ps

# Show logs for troubleshooting
echo ""
echo "📋 To view logs:"
echo "   docker-compose -f docker-compose.prod.yml logs -f [service_name]"
echo ""
echo "🛠 To stop services:"
echo "   docker-compose -f docker-compose.prod.yml down"
echo ""

echo "✅ Deployment completed successfully!"