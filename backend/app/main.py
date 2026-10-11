import os
from contextlib import asynccontextmanager
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.core.config import settings
from app.api.v1.api import api_router
from app.db.session import engine, AsyncSessionLocal
from app.db.base_class import Base
from app.models import all_models  # Ensure models are imported for metadata creation
from app.db.init_db import init_db

@asynccontextmanager
async def lifespan(app: FastAPI):
    # Initialize DB tables - gracefully handle any DB errors so the app still starts
    try:
        async with engine.begin() as conn:
            await conn.run_sync(Base.metadata.create_all)
        print("[OK] Database tables initialized successfully")
    except Exception as e:
        print(f"[WARNING] Database table creation warning (non-fatal): {e}")

    try:
        async with AsyncSessionLocal() as session:
            await init_db(session)
        print("[OK] Database seeding complete")
    except Exception as e:
        print(f"[WARNING] Database seeding warning (non-fatal): {e}")

    yield

app = FastAPI(
    title=settings.PROJECT_NAME,
    openapi_url=f"{settings.API_V1_STR}/openapi.json",
    description="ClauseGuard AI - Enterprise Contract Intelligence & Document Analysis Platform",
    lifespan=lifespan
)

# Set up CORS - allow all origins since auth uses JWT tokens, not cookies
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=False,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/", tags=["Root"])
@app.get("/api", tags=["Root"])
async def root():
    return {
        "status": "healthy",
        "service": settings.PROJECT_NAME,
        "message": "ClauseGuard AI Enterprise Contract Intelligence Backend API is active and running."
    }

@app.get("/health", tags=["Health"])
@app.get("/v1/health", tags=["Health"])
@app.get("/api/v1/health", tags=["Health"])
async def health_check():
    return {
        "status": "healthy",
        "service": settings.PROJECT_NAME,
        "environment": settings.ENVIRONMENT,
        "ai_provider": settings.DEFAULT_AI_PROVIDER
    }

app.include_router(api_router, prefix="/api/v1")
app.include_router(api_router, prefix="/v1")
