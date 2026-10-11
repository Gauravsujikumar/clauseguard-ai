import uuid
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select, func

from app.core.security import get_password_hash
from app.models.all_models import (
    User, Organization, OrgMember, Document, DocumentChunk,
    ExecutiveSummary, RiskFinding, ExtractedClause, Obligation, AuditLog
)

async def init_db(db: AsyncSession) -> None:
    # Check if any user exists
    user_count = (await db.execute(select(func.count(User.id)))).scalar() or 0
    if user_count > 0:
        return

    # Seed Default Organization
    org_id = str(uuid.uuid4())
    org = Organization(
        id=org_id,
        name="ClauseGuard Enterprise",
        slug="clauseguard-enterprise"
    )
    db.add(org)
    await db.commit()
    await db.refresh(org)

    # Seed Demo Executive User
    demo_user_id = str(uuid.uuid4())
    demo_user = User(
        id=demo_user_id,
        email="demo@clauseguard.ai",
        hashed_password=get_password_hash("Password123!"),
        full_name="Alex Morgan",
        role="Org Admin",
        org_id=org.id,
        is_active=True
    )
    db.add(demo_user)
    await db.commit()
    await db.refresh(demo_user)

    member = OrgMember(org_id=org.id, user_id=demo_user.id, role="Org Admin")
    db.add(member)

    # Initial AuditLog
    init_audit = AuditLog(
        org_id=org.id,
        user_id=demo_user.id,
        action="WORKSPACE_INITIALIZED",
        resource_type="SYSTEM",
        resource_id=org.id,
        details="Workspace initialized."
    )
    db.add(init_audit)

    await db.commit()
