from urllib.parse import parse_qs, urlencode
from sqlalchemy.ext.asyncio import create_async_engine, AsyncSession, async_sessionmaker
from app.core.config import settings

def normalize_database_url(url: str) -> str:
    # Convert SQLite to async SQLite
    if url.startswith("sqlite://") and not url.startswith("sqlite+aiosqlite://"):
        return url.replace("sqlite://", "sqlite+aiosqlite://", 1)
    
    # Convert PostgreSQL to asyncpg
    if url.startswith("postgresql://"):
        url = url.replace("postgresql://", "postgresql+asyncpg://", 1)
    elif url.startswith("postgres://"):
        url = url.replace("postgres://", "postgresql+asyncpg://", 1)
    
    # Normalize query parameters for asyncpg compatibility (e.g. Neon, Supabase)
    if "asyncpg" in url and "?" in url:
        base, query = url.split("?", 1)
        params = parse_qs(query)
        clean_params = {}
        for k, v in params.items():
            if k in ["sslmode", "ssl"]:
                clean_params["ssl"] = "require"
            elif k not in ["channel_binding"]:
                clean_params[k] = v[0]
        url = f"{base}?{urlencode(clean_params)}"
        
    return url

db_url = normalize_database_url(settings.DATABASE_URL)

extra_engine_args = {}
if "sqlite" in db_url:
    extra_engine_args["connect_args"] = {"check_same_thread": False}
else:
    extra_engine_args["pool_size"] = 10
    extra_engine_args["max_overflow"] = 20

engine = create_async_engine(
    db_url,
    echo=False,
    future=True,
    pool_pre_ping=True,
    pool_recycle=300,
    **extra_engine_args
)

AsyncSessionLocal = async_sessionmaker(
    bind=engine,
    class_=AsyncSession,
    expire_on_commit=False,
    autocommit=False,
    autoflush=False
)

async def get_db():
    async with AsyncSessionLocal() as session:
        try:
            yield session
        finally:
            await session.close()
