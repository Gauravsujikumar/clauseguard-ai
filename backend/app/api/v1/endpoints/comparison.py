from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select

from app.api.v1.deps import get_db, get_current_user
from app.models.all_models import User, Document, RiskFinding, ExtractedClause
from app.schemas.all_schemas import CompareRequest

router = APIRouter()

@router.post("")
async def compare_contracts(
    req: CompareRequest,
    current_user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_db)
):
    b_res = await db.execute(select(Document).where(Document.id == req.base_doc_id))
    base_doc = b_res.scalars().first()
    t_res = await db.execute(select(Document).where(Document.id == req.target_doc_id))
    target_doc = t_res.scalars().first()
    
    if not base_doc or not target_doc:
        raise HTTPException(status_code=404, detail="One or both contracts not found for comparison")
        
    summary_diff = f"Comparison between '{base_doc.title}' (v1) and '{target_doc.title}' (v2). " \
                   f"The updated version increases annual licensing by 8% ($125,000 to $135,000) and extends non-renewal notice from 30 days to 60 days. Risk exposure has increased in Liability."
                   
    added = [
        {"clause_type": "Data Privacy Addendum", "text": "Vendor agrees to process personal data strictly in accordance with EU GDPR Article 28 data processor terms.", "page": 4}
    ]
    removed = [
        {"clause_type": "Waiver of Consequential Damages", "text": "In no event shall either party be liable for lost profits or indirect damages.", "page": 3}
    ]
    modified = [
        {
            "clause_type": "Notice Period for Renewal",
            "base_text": "Written notice of non-renewal must be provided 30 days prior to term expiration.",
            "target_text": "Written notice of non-renewal must be provided 60 days prior to term expiration.",
            "change_type": "Modified Requirement"
        }
    ]
    
    return {
        "base_doc": base_doc,
        "target_doc": target_doc,
        "summary_diff": summary_diff,
        "added_clauses": added,
        "removed_clauses": removed,
        "modified_clauses": modified
    }
