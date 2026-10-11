from fastapi import APIRouter, Depends, HTTPException, Response
from fastapi.responses import Response, StreamingResponse
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select

from app.api.v1.deps import get_db, get_current_user
from app.models.all_models import User, Document, ExecutiveSummary, RiskFinding, Obligation
from app.services.report_generator import report_generator

router = APIRouter()

@router.get("/{document_id}/pdf")
async def download_pdf_report(
    document_id: str,
    current_user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_db)
):
    doc_res = await db.execute(select(Document).where(Document.id == document_id))
    doc = doc_res.scalars().first()
    if not doc:
        raise HTTPException(status_code=404, detail="Document not found")
        
    s_res = await db.execute(select(ExecutiveSummary).where(ExecutiveSummary.document_id == document_id))
    summary = s_res.scalars().first()
    summary_dict = {
        "detailed_summary": summary.detailed_summary if summary else "Executive contract summary.",
        "purpose": summary.purpose if summary else "Commercial contract",
        "parties": summary.parties if summary else [],
        "financial_terms": summary.financial_terms if summary else "N/A",
        "effective_date": summary.effective_date if summary else "2026-10-09",
        "expiration_date": summary.expiration_date if summary else "2027-10-09",
        "renewal_conditions": summary.renewal_conditions if summary else "60 day notice"
    }
    
    r_res = await db.execute(select(RiskFinding).where(RiskFinding.document_id == document_id))
    risks = [{"title": r.title, "severity": r.severity, "explanation": r.explanation, "supporting_passage": r.supporting_passage, "section_ref": r.section_ref} for r in r_res.scalars().all()]
    
    o_res = await db.execute(select(Obligation).where(Obligation.document_id == document_id))
    obligations = [{"description": o.description, "status": o.status} for o in o_res.scalars().all()]
    
    pdf_bytes = report_generator.generate_pdf_summary_report(doc.title, summary_dict, risks, obligations)
    
    return Response(
        content=pdf_bytes,
        media_type="application/pdf",
        headers={"Content-Disposition": f"attachment; filename=ClauseGuard_Report_{doc.title}.pdf"}
    )

@router.get("/{document_id}/csv")
async def download_csv_obligations(
    document_id: str,
    current_user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_db)
):
    o_res = await db.execute(select(Obligation).where(Obligation.document_id == document_id))
    obligations = [
        {
            "description": o.description,
            "responsible_party": o.responsible_party,
            "deadline_expression": o.deadline_expression,
            "calculated_deadline": o.calculated_deadline,
            "page_number": o.page_number,
            "status": o.status,
            "notes": o.notes
        } for o in o_res.scalars().all()
    ]
    csv_content = report_generator.generate_csv_obligations(obligations)
    return Response(
        content=csv_content,
        media_type="text/csv",
        headers={"Content-Disposition": f"attachment; filename=Obligations_{document_id}.csv"}
    )
