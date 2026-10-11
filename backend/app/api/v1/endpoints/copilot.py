from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select

from app.api.v1.deps import get_db, get_current_user
from app.models.all_models import User, Document, ExecutiveSummary, ExtractedClause
from app.schemas.all_schemas import ChatQuery, ChatResponse
from app.services.ai_engine import ai_engine

router = APIRouter()

@router.post("/chat", response_model=ChatResponse)
async def chat_copilot(
    query: ChatQuery,
    current_user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_db)
):
    doc_res = await db.execute(select(Document).where(Document.id == query.document_id))
    doc = doc_res.scalars().first()
    if not doc:
        raise HTTPException(status_code=404, detail="Document not found")
        
    s_res = await db.execute(select(ExecutiveSummary).where(ExecutiveSummary.document_id == query.document_id))
    summary = s_res.scalars().first()
    summary_dict = {
        "purpose": summary.purpose if summary else "Commercial SaaS agreement",
        "quick_summary": summary.quick_summary if summary else "Standard commercial terms"
    }
    
    c_res = await db.execute(select(ExtractedClause).where(ExtractedClause.document_id == query.document_id))
    clauses = c_res.scalars().all()
    clauses_list = [{"clause_type": c.clause_type, "original_text": c.original_text} for c in clauses]
    
    result = ai_engine.answer_copilot_question(query.question, summary_dict, clauses_list)
    return result
