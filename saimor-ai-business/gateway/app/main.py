"""
🚀 SAIMOR AI Business Platform - FastAPI Gateway
Production-Ready Multi-Tenant API Gateway
"""

import os
import logging
from contextlib import asynccontextmanager
from fastapi import FastAPI, Request, Response, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from fastapi.middleware.trustedhost import TrustedHostMiddleware
from fastapi.responses import JSONResponse
from fastapi.openapi.utils import get_openapi
from prometheus_client import Counter, Histogram, generate_latest, CONTENT_TYPE_LATEST
from starlette.middleware.base import BaseHTTPMiddleware
from starlette.exceptions import HTTPException as StarletteHTTPException
import time
import traceback
import redis.asyncio as redis
import structlog

from app.core.config import settings
from app.core.database import create_tables, close_db_connections
from app.middleware.tenant import TenantMiddleware
from app.middleware.auth import AuthenticationMiddleware
from app.middleware.rate_limit import RateLimitMiddleware
from app.routers import tenants, agents, rag, health, metrics

# Setup structured logging
structlog.configure(
    processors=[
        structlog.stdlib.filter_by_level,
        structlog.stdlib.add_logger_name,
        structlog.stdlib.add_log_level,
        structlog.stdlib.PositionalArgumentsFormatter(),
        structlog.processors.TimeStamper(fmt="iso"),
        structlog.processors.StackInfoRenderer(),
        structlog.processors.format_exc_info,
        structlog.processors.UnicodeDecoder(),
        structlog.processors.JSONRenderer()
    ],
    wrapper_class=structlog.stdlib.BoundLogger,
    logger_factory=structlog.stdlib.LoggerFactory(),
    cache_logger_on_first_use=True,
)

logger = structlog.get_logger()

# Prometheus metrics
REQUEST_COUNT = Counter('http_requests_total', 'Total HTTP requests', ['method', 'endpoint', 'status'])
REQUEST_DURATION = Histogram('http_request_duration_seconds', 'HTTP request duration', ['method', 'endpoint'])
TENANT_REQUESTS = Counter('tenant_requests_total', 'Total tenant requests', ['tenant_id'])

class MetricsMiddleware(BaseHTTPMiddleware):
    """Prometheus metrics collection middleware"""

    async def dispatch(self, request: Request, call_next):
        start_time = time.time()

        # Process request
        response = await call_next(request)

        # Calculate duration
        duration = time.time() - start_time

        # Extract metrics labels
        method = request.method
        endpoint = request.url.path
        status = response.status_code

        # Update metrics
        REQUEST_COUNT.labels(method=method, endpoint=endpoint, status=status).inc()
        REQUEST_DURATION.labels(method=method, endpoint=endpoint).observe(duration)

        # Track tenant usage
        tenant_id = getattr(request.state, 'tenant_id', 'unknown')
        if tenant_id != 'unknown':
            TENANT_REQUESTS.labels(tenant_id=tenant_id).inc()

        return response

@asynccontextmanager
async def lifespan(app: FastAPI):
    """Application lifespan management"""
    logger.info("🚀 Starting SAIMOR AI Business Platform...")

    # Initialize database
    await create_tables()
    logger.info("✅ Database initialized")

    # Initialize Redis connection
    app.state.redis = redis.from_url(settings.REDIS_URL)
    await app.state.redis.ping()
    logger.info("✅ Redis connected")

    yield

    # Cleanup
    logger.info("🛑 Shutting down SAIMOR AI Business Platform...")
    await app.state.redis.close()
    await close_db_connections()
    logger.info("✅ Cleanup completed")

# Create FastAPI application
app = FastAPI(
    title="SAIMOR AI Business Platform",
    description="""
    🚀 **Production-Ready Multi-Tenant AI Business Platform**

    ## Features
    - 🏢 **Multi-Tenant Architecture** - Complete tenant isolation
    - 🤖 **AI Agents Ecosystem** - Document, Email, Schedule, Analytics, Chat
    - 🔒 **Enterprise Security** - JWT, API Keys, Rate Limiting
    - 📊 **Business Intelligence** - Usage analytics, revenue tracking
    - 🔗 **Integration Layer** - N8N workflows, webhooks, APIs
    - 📈 **Scalable Architecture** - Async processing, caching, monitoring

    ## Business APIs
    - **Tenant Management** - Create, manage, billing
    - **Agent Services** - AI-powered business automation
    - **RAG System** - Document processing & knowledge base
    - **Analytics** - Usage metrics & business insights

    **🌟 Ready for immediate revenue generation!**
    """,
    version="1.0.0",
    docs_url="/docs",
    redoc_url="/redoc",
    openapi_url="/openapi.json",
    lifespan=lifespan
)

# Security middleware
app.add_middleware(
    TrustedHostMiddleware,
    allowed_hosts=["*"] if settings.ENVIRONMENT == "development" else [settings.DOMAIN]
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"] if settings.ENVIRONMENT == "development" else [f"https://{settings.DOMAIN}"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Custom middleware
app.add_middleware(MetricsMiddleware)
app.add_middleware(RateLimitMiddleware)
app.add_middleware(AuthenticationMiddleware)
app.add_middleware(TenantMiddleware)

# Include routers
app.include_router(health.router, prefix="/health", tags=["Health"])
app.include_router(metrics.router, prefix="/metrics", tags=["Metrics"])
app.include_router(tenants.router, prefix="/api/v1/tenants", tags=["Tenants"])
app.include_router(agents.router, prefix="/api/v1/agents", tags=["Agents"])
app.include_router(rag.router, prefix="/api/v1/rag", tags=["RAG System"])

@app.exception_handler(StarletteHTTPException)
async def http_exception_handler(request: Request, exc: StarletteHTTPException):
    """Global HTTP exception handler"""
    logger.error(
        "HTTP exception occurred",
        path=request.url.path,
        method=request.method,
        status_code=exc.status_code,
        detail=exc.detail
    )
    return JSONResponse(
        status_code=exc.status_code,
        content={
            "error": exc.detail,
            "status_code": exc.status_code,
            "timestamp": time.time()
        }
    )

@app.exception_handler(Exception)
async def general_exception_handler(request: Request, exc: Exception):
    """Global exception handler"""
    logger.error(
        "Unhandled exception occurred",
        path=request.url.path,
        method=request.method,
        error=str(exc),
        traceback=traceback.format_exc()
    )
    return JSONResponse(
        status_code=500,
        content={
            "error": "Internal server error",
            "status_code": 500,
            "timestamp": time.time()
        }
    )

@app.get("/")
async def root():
    """API root endpoint"""
    return {
        "name": "SAIMOR AI Business Platform",
        "version": "1.0.0",
        "status": "🚀 Production Ready",
        "description": "Multi-Tenant AI Business Platform",
        "docs": "/docs",
        "health": "/health"
    }

@app.get("/prometheus")
async def prometheus_metrics():
    """Prometheus metrics endpoint"""
    return Response(generate_latest(), media_type=CONTENT_TYPE_LATEST)

def custom_openapi():
    """Custom OpenAPI schema with business-focused documentation"""
    if app.openapi_schema:
        return app.openapi_schema

    openapi_schema = get_openapi(
        title=app.title,
        version=app.version,
        description=app.description,
        routes=app.routes,
    )

    # Add custom info for business presentation
    openapi_schema["info"]["x-logo"] = {
        "url": "https://saimor.world/logo.png"
    }

    openapi_schema["servers"] = [
        {"url": f"https://{settings.DOMAIN}", "description": "Production API"}
    ]

    # Add security schemes
    openapi_schema["components"]["securitySchemes"] = {
        "BearerAuth": {
            "type": "http",
            "scheme": "bearer",
            "bearerFormat": "JWT"
        },
        "ApiKeyAuth": {
            "type": "apiKey",
            "in": "header",
            "name": "X-API-Key"
        }
    }

    app.openapi_schema = openapi_schema
    return app.openapi_schema

app.openapi = custom_openapi

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(
        "app.main:app",
        host="0.0.0.0",
        port=8000,
        reload=settings.ENVIRONMENT == "development",
        workers=1 if settings.ENVIRONMENT == "development" else 4
    )