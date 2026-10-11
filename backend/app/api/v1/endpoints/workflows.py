from typing import List
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select, or_

from app.api.v1.deps import get_db, get_current_user
from app.models.all_models import User, Document, ReviewWorkflow, Comment, AuditLog
from app.schemas.all_schemas import ReviewCreate, ReviewDecision, CommentCreate, ReviewWorkflowOut, CommentOut

router = APIRouter()

@router.get("", response_model=List[ReviewWorkflowOut])
async def list_workflows(
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
        select(ReviewWorkflow)
        .join(Document, ReviewWorkflow.document_id == Document.id)
        .where(
            Document.is_archived == False,
            or_(
                user_doc_condition,
                ReviewWorkflow.reviewer_id == current_user.id
            )
        )
        .order_by(ReviewWorkflow.created_at.desc())
    )
    res = await db.execute(query)
    return res.scalars().all()

@router.post("/assign", response_model=ReviewWorkflowOut)
async def assign_review(
    req: ReviewCreate,
    current_user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_db)
):
    workflow = ReviewWorkflow(
        document_id=req.document_id,
        reviewer_id=req.reviewer_id,
        review_deadline=req.review_deadline,
        comments=req.comments,
        status="Under Review"
    )
    db.add(workflow)
    
    # Update document status
    doc_res = await db.execute(select(Document).where(Document.id == req.document_id))
    doc = doc_res.scalars().first()
    if doc:
        doc.review_status = "Under Review"

    audit = AuditLog(
        org_id=current_user.org_id or "default-org",
        user_id=current_user.id,
        action="REVIEW_ASSIGNED",
        resource_type="WORKFLOW",
        resource_id=workflow.id,
        details=f"Assigned document review to reviewer ID {req.reviewer_id}"
    )
    db.add(audit)
        
    await db.commit()
    await db.refresh(workflow)
    return workflow

@router.post("/{workflow_id}/decision", response_model=ReviewWorkflowOut)
async def review_decision(
    workflow_id: str,
    decision: ReviewDecision,
    current_user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_db)
):
    w_res = await db.execute(select(ReviewWorkflow).where(ReviewWorkflow.id == workflow_id))
    workflow = w_res.scalars().first()
    if not workflow:
        raise HTTPException(status_code=404, detail="Workflow assignment not found")
        
    workflow.status = decision.status
    workflow.decision = decision.status
    if decision.comments:
        workflow.comments = decision.comments
        
    # Update document status
    doc_res = await db.execute(select(Document).where(Document.id == workflow.document_id))
    doc = doc_res.scalars().first()
    if doc:
        doc.review_status = decision.status

    audit = AuditLog(
        org_id=current_user.org_id or "default-org",
        user_id=current_user.id,
        action="REVIEW_DECIDED",
        resource_type="WORKFLOW",
        resource_id=workflow.id,
        details=f"Recorded review decision '{decision.status}'"
    )
    db.add(audit)
        
    await db.commit()
    await db.refresh(workflow)
    return workflow

@router.get("/comments/{document_id}", response_model=List[CommentOut])
async def get_comments(
    document_id: str,
    current_user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_db)
):
    res = await db.execute(
        select(Comment)
        .where(Comment.document_id == document_id)
        .order_by(Comment.created_at.asc())
    )
    return res.scalars().all()

@router.post("/comments", response_model=CommentOut)
async def add_comment(
    req: CommentCreate,
    current_user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_db)
):
    comment = Comment(
        document_id=req.document_id,
        user_id=current_user.id,
        user_name=current_user.full_name,
        content=req.content,
        page_ref=req.page_ref
    )
    db.add(comment)
    await db.commit()
    await db.refresh(comment)
    return comment
