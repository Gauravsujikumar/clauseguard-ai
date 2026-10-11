from fastapi import APIRouter
from app.api.v1.endpoints import (
    auth, documents, analysis, comparison, 
    copilot, reports, workflows, orgs
)

api_router = APIRouter()

api_router.include_router(auth.router, prefix="/auth", tags=["Authentication"])
api_router.include_router(documents.router, prefix="/documents", tags=["Documents"])
api_router.include_router(analysis.router, prefix="/analysis", tags=["AI Analysis"])
api_router.include_router(comparison.router, prefix="/compare", tags=["Contract Comparison"])
api_router.include_router(copilot.router, prefix="/copilot", tags=["ClauseGuard Copilot"])
api_router.include_router(reports.router, prefix="/reports", tags=["Reports"])
api_router.include_router(workflows.router, prefix="/workflows", tags=["Workflows"])
api_router.include_router(orgs.router, prefix="/orgs", tags=["Organizations & Admin"])
