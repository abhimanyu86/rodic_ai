import os
from typing import List
from pydantic_settings import BaseSettings

class Settings(BaseSettings):
    PROJECT_NAME: str = "JanSetu AI Grievance Redressal & Rodic Integration"
    API_V1_STR: str = "/api/v1"
    SECRET_KEY: str = os.getenv("SECRET_KEY", "jansetu-super-secret-jwt-key-change-in-production-2026")
    ALGORITHM: str = "HS256"
    ACCESS_TOKEN_EXPIRE_MINUTES: int = 1440  # 24 hours
    
    # Supported Languages
    SUPPORTED_LANGUAGES: List[str] = ["en", "hi", "ta"]
    DEFAULT_LANGUAGE: str = "en"
    
    # Database
    DATABASE_URL: str = os.getenv("DATABASE_URL", "sqlite:///./jansetu.db")
    
    # OpenAI
    OPENAI_API_KEY: str = os.getenv("OPENAI_API_KEY", "")
    OPENAI_MODEL: str = os.getenv("OPENAI_MODEL", "gpt-4o-mini")
    
    # Rodic ERP simulation
    RODIC_API_BASE: str = os.getenv("RODIC_API_BASE", "http://localhost:8000/api/v1/mock-rodic")
    
    # CORS
    BACKEND_CORS_ORIGINS: List[str] = [
        "http://localhost:3000",
        "http://localhost:3001",
        "http://127.0.0.1:3000",
        "http://127.0.0.1:3001",
        "*",
    ]

    class Config:
        env_file = ".env"
        extra = "ignore"

settings = Settings()
