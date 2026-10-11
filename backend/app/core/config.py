import os
from typing import List, Optional
from pydantic_settings import BaseSettings, SettingsConfigDict

class Settings(BaseSettings):
    PROJECT_NAME: str = "ClauseGuard AI"
    API_V1_STR: str = "/api/v1"
    ENVIRONMENT: str = "development"
    DEBUG: bool = True
    
    # Database
    DATABASE_URL: str = "sqlite+aiosqlite:///./clauseguard.db"
    
    # JWT
    JWT_SECRET: str = "clauseguard-super-secret-key-change-in-production-2026"
    JWT_ALGORITHM: str = "HS256"
    ACCESS_TOKEN_EXPIRE_MINUTES: int = 43200  # 30 days
    
    # Storage
    STORAGE_TYPE: str = "local"
    UPLOAD_DIR: str = "/tmp/clauseguard_uploads" if (os.environ.get("VERCEL") or os.environ.get("AWS_LAMBDA_FUNCTION_NAME")) else "./storage/documents"
    
    # AI Credentials
    OPENAI_API_KEY: Optional[str] = None
    ANTHROPIC_API_KEY: Optional[str] = None
    GEMINI_API_KEY: Optional[str] = None
    DEFAULT_AI_PROVIDER: str = "gemini"

    # Frontend URL (used for CORS)
    FRONTEND_URL: str = "http://localhost:5173"
    
    # CORS - computed dynamically based on FRONTEND_URL
    @property
    def BACKEND_CORS_ORIGINS(self) -> List[str]:
        origins = [
            "http://localhost:5173",
            "http://localhost:3000",
            "http://127.0.0.1:5173",
        ]
        if self.FRONTEND_URL and self.FRONTEND_URL not in origins:
            origins.append(self.FRONTEND_URL)
        return origins

    @property
    def EFFECTIVE_DATABASE_URL(self) -> str:
        url = self.DATABASE_URL
        if (os.environ.get("VERCEL") or os.environ.get("AWS_LAMBDA_FUNCTION_NAME")) and "clauseguard.db" in url and not url.startswith("sqlite+aiosqlite:////tmp/"):
            return "sqlite+aiosqlite:////tmp/clauseguard.db"
        return url

    model_config = SettingsConfigDict(
        env_file=".env",
        env_file_encoding="utf-8",
        extra="ignore"
    )

def _resolve_safe_upload_dir(initial_dir: str) -> str:
    # Always use /tmp on Vercel, AWS Lambda, or serverless
    if os.environ.get("VERCEL") or os.environ.get("AWS_LAMBDA_FUNCTION_NAME"):
        target = "/tmp/clauseguard_uploads"
        try:
            os.makedirs(target, exist_ok=True)
        except OSError:
            pass
        return target

    # Test if target directory is actually writable
    try:
        os.makedirs(initial_dir, exist_ok=True)
        test_file = os.path.join(initial_dir, f".write_test_{os.getpid()}")
        with open(test_file, "w") as f:
            f.write("ok")
        os.remove(test_file)
        return initial_dir
    except (OSError, PermissionError):
        target = "/tmp/clauseguard_uploads"
        try:
            os.makedirs(target, exist_ok=True)
        except OSError:
            pass
        return target

settings = Settings()
settings.UPLOAD_DIR = _resolve_safe_upload_dir(settings.UPLOAD_DIR)

