"""
🔧 SAIMOR AI Business Platform - Configuration Management
Production-Ready Settings with Environment Validation
"""

import os
from typing import Optional, List
from pydantic import BaseSettings, validator, AnyHttpUrl
from functools import lru_cache

class Settings(BaseSettings):
    """Application settings with environment validation"""

    # 🌐 Environment
    ENVIRONMENT: str = "production"
    DEBUG: bool = False
    DOMAIN: str = "api.saimor.world"

    # 🔐 Security
    JWT_SECRET_KEY: str
    JWT_ALGORITHM: str = "HS256"
    JWT_EXPIRE_HOURS: int = 24

    # 🐘 Database
    DATABASE_URL: str
    DB_ECHO: bool = False

    # 🔴 Redis
    REDIS_URL: str = "redis://redis:6379"
    REDIS_TTL: int = 3600

    # 🤖 AI Configuration
    OPENAI_API_KEY: str
    OPENAI_MODEL: str = "gpt-4"
    OPENAI_MAX_TOKENS: int = 4000

    # 🔍 Vector Database
    QDRANT_URL: str = "http://qdrant:6333"
    QDRANT_COLLECTION: str = "saimor_knowledge"

    # 📧 Email Configuration
    SMTP_HOST: Optional[str] = None
    SMTP_PORT: int = 587
    SMTP_USER: Optional[str] = None
    SMTP_PASSWORD: Optional[str] = None

    # 📅 Calendar Integration
    CAL_COM_API_KEY: Optional[str] = None

    # 🔗 Webhook Security
    N8N_WEBHOOK_SECRET: Optional[str] = None

    # 📊 Monitoring
    SENTRY_DSN: Optional[str] = None
    PLAUSIBLE_DOMAIN: Optional[str] = None

    # 💼 Business Configuration
    DEFAULT_TENANT: str = "saimor"
    BILLING_ENABLED: bool = True
    STRIPE_SECRET_KEY: Optional[str] = None
    STRIPE_WEBHOOK_SECRET: Optional[str] = None

    # 🚦 Rate Limiting
    RATE_LIMIT_REQUESTS: int = 100
    RATE_LIMIT_WINDOW: int = 60

    # 📁 File Upload
    MAX_FILE_SIZE: int = 10 * 1024 * 1024  # 10MB
    UPLOAD_DIR: str = "/tmp/uploads"

    # 🔒 CORS
    BACKEND_CORS_ORIGINS: List[AnyHttpUrl] = []

    @validator("BACKEND_CORS_ORIGINS", pre=True)
    def assemble_cors_origins(cls, v):
        if isinstance(v, str) and not v.startswith("["):
            return [i.strip() for i in v.split(",")]
        elif isinstance(v, (list, str)):
            return v
        raise ValueError(v)

    @validator("DEBUG", pre=True)
    def set_debug_mode(cls, v, values):
        return values.get("ENVIRONMENT") == "development"

    class Config:
        env_file = ".env"
        case_sensitive = True
        validate_assignment = True

@lru_cache()
def get_settings() -> Settings:
    """Get cached settings instance"""
    return Settings()

# Global settings instance
settings = get_settings()