from typing import List, Optional
import urllib.request
import urllib.parse
import re
from fastapi import APIRouter, Depends, HTTPException
from fastapi.responses import Response
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select, or_

from app.api.v1.deps import get_db, get_current_user
from app.models.all_models import (
    User, Document, ExecutiveSummary, RiskFinding, 
    ExtractedClause, Obligation, ExtractedMetadata, AuditLog
)
from app.schemas.all_schemas import (
    FullAnalysisResponse, ExecutiveSummaryOut, RiskFindingOut, 
    ExtractedClauseOut, ObligationOut, RiskStatusUpdate, ObligationUpdate
)

router = APIRouter()

# Authentic Regional Speech Audio Generator
@router.get("/tts")
async def generate_tts(text: str, lang: str = "te"):
    """
    Generate authentic neural audio in regional languages (Telugu, Hindi, Tamil, Kannada, Marathi, Bengali, etc.)
    """
    if not text or not text.strip():
        raise HTTPException(status_code=400, detail="Text cannot be empty")
        
    try:
        lang_code = lang.split("-")[0].lower()
        parts = [p.strip() for p in re.split(r'([।।\.\?\!\n]+)', text) if p.strip()]
        merged = []
        curr = ''
        for p in parts:
            if len(curr) + len(p) < 140:
                curr = (curr + ' ' + p).strip()
            else:
                if curr: merged.append(curr)
                curr = p
        if curr: merged.append(curr)
        if not merged:
            merged = [text[:140]]

        total_audio = b''
        for m in merged[:8]:
            q = urllib.parse.quote(m)
            url = f'https://translate.google.com/translate_tts?ie=UTF-8&tl={lang_code}&client=tw-ob&q={q}'
            req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0'})
            with urllib.request.urlopen(req, timeout=6) as res:
                total_audio += res.read()

        return Response(content=total_audio, media_type="audio/mpeg", headers={
            "Cache-Control": "public, max-age=86400",
            "Accept-Ranges": "bytes"
        })
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"TTS generation error: {str(e)}")

# NOTE: Static routes (/risks/all, /obligations/all) MUST be declared before
# the dynamic /{document_id} route to avoid FastAPI matching them as doc IDs.

@router.get("/risks/all", response_model=List[RiskFindingOut])
async def get_all_risks(
    severity: Optional[str] = None,
    current_user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_db)
):
    user_doc_condition = (
        or_(
            Document.org_id == current_user.org_id,
            Document.created_by == current_user.id
        )
        if current_user.org_id
        else (Document.created_by == current_user.id)
    )

    query = (
        select(RiskFinding)
        .join(Document, RiskFinding.document_id == Document.id)
        .where(Document.is_archived == False, user_doc_condition)
    )

    if severity and severity != "All":
        query = query.where(RiskFinding.severity == severity)

    result = await db.execute(query.order_by(RiskFinding.created_at.desc()))
    return result.scalars().all()

@router.get("/obligations/all", response_model=List[ObligationOut])
async def get_all_obligations(
    current_user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_db)
):
    user_doc_condition = (
        or_(
            Document.org_id == current_user.org_id,
            Document.created_by == current_user.id
        )
        if current_user.org_id
        else (Document.created_by == current_user.id)
    )

    query = (
        select(Obligation)
        .join(Document, Obligation.document_id == Document.id)
        .where(Document.is_archived == False, user_doc_condition)
    )

    result = await db.execute(query.order_by(Obligation.created_at.desc()))
    return result.scalars().all()

@router.get("/clauses/all", response_model=List[ExtractedClauseOut])
async def get_all_clauses(
    current_user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_db)
):
    user_doc_condition = (
        or_(
            Document.org_id == current_user.org_id,
            Document.created_by == current_user.id
        )
        if current_user.org_id
        else (Document.created_by == current_user.id)
    )

    query = (
        select(ExtractedClause)
        .join(Document, ExtractedClause.document_id == Document.id)
        .where(Document.is_archived == False, user_doc_condition)
    )

    result = await db.execute(query.order_by(ExtractedClause.created_at.desc()))
    return result.scalars().all()

ANALYSIS_CACHE = {}

@router.get("/{document_id}", response_model=FullAnalysisResponse)
async def get_full_analysis(
    document_id: str,
    current_user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_db)
):
    if document_id in ANALYSIS_CACHE:
        return ANALYSIS_CACHE[document_id]

    doc_res = await db.execute(select(Document).where(Document.id == document_id))
    doc = doc_res.scalars().first()
    if not doc:
        raise HTTPException(status_code=404, detail="Document not found")
        
    s_res = await db.execute(select(ExecutiveSummary).where(ExecutiveSummary.document_id == document_id))
    summary = s_res.scalars().first()
    
    r_res = await db.execute(select(RiskFinding).where(RiskFinding.document_id == document_id))
    risks = r_res.scalars().all()
    
    c_res = await db.execute(select(ExtractedClause).where(ExtractedClause.document_id == document_id))
    clauses = c_res.scalars().all()
    
    o_res = await db.execute(select(Obligation).where(Obligation.document_id == document_id))
    obligations = o_res.scalars().all()
    
    m_res = await db.execute(select(ExtractedMetadata).where(ExtractedMetadata.document_id == document_id))
    metadata = m_res.scalars().all()
    
    from app.models.all_models import DocumentChunk
    chunks_res = await db.execute(select(DocumentChunk).where(DocumentChunk.document_id == document_id).order_by(DocumentChunk.page_number.asc()))
    chunks = chunks_res.scalars().all()
    pages_data = [{"page_number": ch.page_number, "content": ch.content, "section_title": ch.section_title} for ch in chunks]

    result = {
        "document": doc,
        "summary": summary,
        "risks": risks,
        "clauses": clauses,
        "obligations": obligations,
        "metadata": [{"field_name": m.field_name, "field_value": m.field_value, "confidence": m.confidence, "page_ref": m.page_ref} for m in metadata],
        "pages": pages_data
    }
    ANALYSIS_CACHE[document_id] = result
    return result

@router.patch("/risks/{risk_id}", response_model=RiskFindingOut)
async def update_risk_status(
    risk_id: str,
    status_update: RiskStatusUpdate,
    current_user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_db)
):
    result = await db.execute(select(RiskFinding).where(RiskFinding.id == risk_id))
    risk = result.scalars().first()
    if not risk:
        raise HTTPException(status_code=404, detail="Risk finding not found")
        
    risk.review_status = status_update.review_status
    
    audit = AuditLog(
        org_id=current_user.org_id or "default-org",
        user_id=current_user.id,
        action="RISK_UPDATED",
        resource_type="RISK",
        resource_id=risk.id,
        details=f"Updated risk '{risk.title}' status to {status_update.review_status}"
    )
    db.add(audit)

    await db.commit()
    await db.refresh(risk)
    return risk

@router.patch("/obligations/{obligation_id}", response_model=ObligationOut)
async def update_obligation(
    obligation_id: str,
    update_data: ObligationUpdate,
    current_user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_db)
):
    result = await db.execute(select(Obligation).where(Obligation.id == obligation_id))
    obl = result.scalars().first()
    if not obl:
        raise HTTPException(status_code=404, detail="Obligation not found")
        
    if update_data.status:
        obl.status = update_data.status
    if update_data.notes:
        obl.notes = update_data.notes
    if update_data.calculated_deadline:
        obl.calculated_deadline = update_data.calculated_deadline
    if update_data.assignee_id:
        obl.assignee_id = update_data.assignee_id

    audit = AuditLog(
        org_id=current_user.org_id or "default-org",
        user_id=current_user.id,
        action="OBLIGATION_UPDATED",
        resource_type="OBLIGATION",
        resource_id=obl.id,
        details=f"Updated obligation status to {obl.status}"
    )
    db.add(audit)
        
    await db.commit()
    await db.refresh(obl)
    return obl
