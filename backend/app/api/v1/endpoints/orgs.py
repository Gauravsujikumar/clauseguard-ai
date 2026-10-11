from typing import List
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select, func, or_

from app.api.v1.deps import get_db, get_current_user
from app.models.all_models import User, Organization, OrgMember, Document, RiskFinding, Obligation, AuditLog
from app.schemas.all_schemas import OrgMemberInvite, UserOut, AuditLogOut

router = APIRouter()

@router.get("/members", response_model=List[UserOut])
async def list_org_members(
    current_user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_db)
):
    query = select(User)
    if current_user.org_id:
        query = query.where(User.org_id == current_user.org_id)
    res = await db.execute(query)
    users = res.scalars().all()
    
    # Enrich with org_name
    org_name = None
    if current_user.org_id:
        org_res = await db.execute(select(Organization).where(Organization.id == current_user.org_id))
        org_obj = org_res.scalars().first()
        if org_obj:
            org_name = org_obj.name

    return [
        {
            "id": u.id,
            "email": u.email,
            "full_name": u.full_name,
            "role": u.role,
            "org_id": u.org_id,
            "org_name": org_name,
            "created_at": u.created_at
        }
        for u in users
    ]

@router.post("/members/invite", response_model=UserOut)
async def invite_member(
    req: OrgMemberInvite,
    current_user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_db)
):
    clean_email = req.email.strip().lower()
    res = await db.execute(select(User).where(func.lower(User.email) == clean_email))
    if res.scalars().first():
        raise HTTPException(status_code=400, detail="User already exists in organization")
        
    user = User(
        email=clean_email,
        hashed_password="invited_pending_password",
        full_name=req.full_name.strip(),
        role=req.role,
        org_id=current_user.org_id
    )
    db.add(user)
    
    log = AuditLog(
        org_id=current_user.org_id or "default-org",
        user_id=current_user.id,
        action="MEMBER_INVITED",
        resource_type="USER",
        resource_id=user.id,
        details=f"Invited team member {user.email} as {req.role}"
    )
    db.add(log)

    await db.commit()
    await db.refresh(user)

    return {
        "id": user.id,
        "email": user.email,
        "full_name": user.full_name,
        "role": user.role,
        "org_id": user.org_id,
        "org_name": None,
        "created_at": user.created_at
    }

@router.get("/stats")
async def get_dashboard_stats(
    current_user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_db)
):
    user_doc_filter = (
        or_(
            Document.org_id == current_user.org_id,
            Document.created_by == current_user.id
        )
        if current_user.org_id
        else (Document.created_by == current_user.id)
    )

    doc_query = select(func.count(Document.id)).where(Document.is_archived == False, user_doc_filter)
    doc_count = (await db.execute(doc_query)).scalar() or 0
    
    analyzed_query = select(func.count(Document.id)).where(
        Document.status == "completed", 
        Document.is_archived == False, 
        user_doc_filter
    )
    analyzed_count = (await db.execute(analyzed_query)).scalar() or 0
    
    risk_query = (
        select(func.count(RiskFinding.id))
        .join(Document, RiskFinding.document_id == Document.id)
        .where(
            Document.is_archived == False,
            user_doc_filter,
            RiskFinding.severity == "High",
            RiskFinding.review_status == "Unreviewed"
        )
    )
    high_risk_count = (await db.execute(risk_query)).scalar() or 0
    
    obl_query = (
        select(func.count(Obligation.id))
        .join(Document, Obligation.document_id == Document.id)
        .where(
            Document.is_archived == False,
            user_doc_filter,
            Obligation.status != "Completed"
        )
    )
    active_obl_count = (await db.execute(obl_query)).scalar() or 0

    pending_rev_query = (
        select(func.count(Document.id))
        .where(
            Document.is_archived == False,
            user_doc_filter,
            Document.review_status.in_(["Pending Analysis", "Under Review", "Draft"])
        )
    )
    pending_reviews_count = (await db.execute(pending_rev_query)).scalar() or 0
    
    return {
        "total_documents": doc_count,
        "analyzed_documents": analyzed_count,
        "high_priority_risks": high_risk_count,
        "active_obligations": active_obl_count,
        "upcoming_deadlines": active_obl_count,
        "pending_reviews": pending_reviews_count
    }

@router.get("/activity", response_model=List[AuditLogOut])
async def get_activity_log(
    current_user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_db)
):
    query = select(AuditLog)
    if current_user.org_id:
        query = query.where(
            or_(
                AuditLog.org_id == current_user.org_id,
                AuditLog.user_id == current_user.id
            )
        )
    else:
        query = query.where(AuditLog.user_id == current_user.id)

    res = await db.execute(query.order_by(AuditLog.created_at.desc()).limit(50))
    return res.scalars().all()
