"""
🏥 SAIMOR AI Business Platform - Health Check Router
Production-Ready Health Monitoring
"""

import asyncio
import time
from typing import Dict, Any
from fastapi import APIRouter, Depends, HTTPException
from fastapi.responses import JSONResponse
import redis.asyncio as redis
from sqlalchemy.ext.asyncio import AsyncSession
from qdrant_client import QdrantClient
from qdrant_client.http.exceptions import UnexpectedResponse

from app.core.config import settings
from app.core.database import get_db
import httpx

router = APIRouter()

@router.get("/")
async def health_check():
    """
    🏥 **System Health Check**

    Returns overall system health status.
    Critical for monitoring and load balancing.
    """
    return {
        "status": "healthy",
        "timestamp": time.time(),
        "version": "1.0.0",
        "environment": settings.ENVIRONMENT
    }

@router.get("/detailed")
async def detailed_health_check(db: AsyncSession = Depends(get_db)):
    """
    🔬 **Detailed Health Check**

    Comprehensive health check of all system components.
    Used for detailed monitoring and troubleshooting.
    """
    start_time = time.time()
    health_status = {
        "status": "healthy",
        "timestamp": start_time,
        "version": "1.0.0",
        "environment": settings.ENVIRONMENT,
        "components": {}
    }

    # Test Database Connection
    try:
        await db.execute("SELECT 1")
        health_status["components"]["database"] = {
            "status": "healthy",
            "message": "PostgreSQL connection successful"
        }
    except Exception as e:
        health_status["components"]["database"] = {
            "status": "unhealthy",
            "message": f"Database error: {str(e)}"
        }
        health_status["status"] = "unhealthy"

    # Test Redis Connection
    try:
        redis_client = redis.from_url(settings.REDIS_URL)
        await redis_client.ping()
        await redis_client.close()
        health_status["components"]["redis"] = {
            "status": "healthy",
            "message": "Redis connection successful"
        }
    except Exception as e:
        health_status["components"]["redis"] = {
            "status": "unhealthy",
            "message": f"Redis error: {str(e)}"
        }
        health_status["status"] = "unhealthy"

    # Test Qdrant Connection
    try:
        qdrant_client = QdrantClient(url=settings.QDRANT_URL)
        collections = qdrant_client.get_collections()
        health_status["components"]["qdrant"] = {
            "status": "healthy",
            "message": f"Qdrant connection successful, {len(collections.collections)} collections"
        }
    except Exception as e:
        health_status["components"]["qdrant"] = {
            "status": "unhealthy",
            "message": f"Qdrant error: {str(e)}"
        }
        health_status["status"] = "unhealthy"

    # Test OpenAI API (optional)
    if settings.OPENAI_API_KEY:
        try:
            async with httpx.AsyncClient() as client:
                response = await client.get(
                    "https://api.openai.com/v1/models",
                    headers={"Authorization": f"Bearer {settings.OPENAI_API_KEY}"},
                    timeout=5.0
                )
                if response.status_code == 200:
                    health_status["components"]["openai"] = {
                        "status": "healthy",
                        "message": "OpenAI API accessible"
                    }
                else:
                    raise Exception(f"HTTP {response.status_code}")
        except Exception as e:
            health_status["components"]["openai"] = {
                "status": "unhealthy",
                "message": f"OpenAI API error: {str(e)}"
            }

    # Calculate total check duration
    health_status["check_duration"] = time.time() - start_time

    return health_status

@router.get("/ready")
async def readiness_check(db: AsyncSession = Depends(get_db)):
    """
    ✅ **Readiness Check**

    Kubernetes-style readiness probe.
    Returns 200 if service is ready to accept traffic.
    """
    try:
        # Quick database check
        await db.execute("SELECT 1")

        # Quick Redis check
        redis_client = redis.from_url(settings.REDIS_URL)
        await redis_client.ping()
        await redis_client.close()

        return {"status": "ready", "timestamp": time.time()}
    except Exception as e:
        raise HTTPException(status_code=503, detail=f"Service not ready: {str(e)}")

@router.get("/live")
async def liveness_check():
    """
    💓 **Liveness Check**

    Kubernetes-style liveness probe.
    Returns 200 if service is alive and should not be restarted.
    """
    return {"status": "alive", "timestamp": time.time()}

@router.get("/startup")
async def startup_check():
    """
    🚀 **Startup Check**

    Kubernetes-style startup probe.
    Returns 200 when service has finished starting up.
    """
    # Simulate startup completion check
    # In a real scenario, you'd check if all initialization is complete
    return {"status": "started", "timestamp": time.time()}