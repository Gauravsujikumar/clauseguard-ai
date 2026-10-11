import uuid
from datetime import datetime
from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select, func

from app.api.v1.deps import get_db, get_current_user
from app.core.security import get_password_hash, verify_password, create_access_token
from app.models.all_models import User, Organization, OrgMember, AuditLog
from app.schemas.all_schemas import UserCreate, UserLogin, Token, UserOut, UserProfileUpdate

router = APIRouter()

@router.post("/register", response_model=Token)
async def register(user_in: UserCreate, db: AsyncSession = Depends(get_db)):
    clean_email = user_in.email.strip().lower()
    result = await db.execute(select(User).where(func.lower(User.email) == clean_email))
    if result.scalars().first():
        raise HTTPException(status_code=400, detail="User with this email already exists")
    
    org_name = (user_in.org_name or "").strip() or f"{user_in.full_name.strip()}'s Workspace"
    clean_slug = "".join(c for c in org_name.lower().replace(" ", "-") if c.isalnum() or c == "-")[:24]
    slug = f"{clean_slug}-{uuid.uuid4().hex[:6]}"
    
    org = Organization(name=org_name, slug=slug)
    db.add(org)
    await db.commit()
    await db.refresh(org)
    
    user = User(
        email=clean_email,
        hashed_password=get_password_hash(user_in.password),
        full_name=user_in.full_name.strip(),
        role="Org Admin",
        org_id=org.id,
        is_active=True
    )
    db.add(user)
    await db.commit()
    await db.refresh(user)
    
    member = OrgMember(org_id=org.id, user_id=user.id, role="Org Admin")
    db.add(member)

    # Record registration in AuditLog
    log = AuditLog(
        org_id=org.id,
        user_id=user.id,
        action="USER_REGISTERED",
        resource_type="USER",
        resource_id=user.id,
        details=f"User {user.email} registered organization {org.name}"
    )
    db.add(log)
    await db.commit()
    
    token = create_access_token(user.id)
    return {
        "access_token": token,
        "token_type": "bearer",
        "user": {
            "id": user.id,
            "email": user.email,
            "full_name": user.full_name,
            "role": user.role,
            "org_id": user.org_id,
            "org_name": org.name
        }
    }

@router.post("/login", response_model=Token)
async def login(user_in: UserLogin, db: AsyncSession = Depends(get_db)):
    clean_email = user_in.email.strip().lower()
    # Fetch User and Organization name in a single round-trip
    query = (
        select(User, Organization.name)
        .outerjoin(Organization, User.org_id == Organization.id)
        .where(func.lower(User.email) == clean_email)
    )
    result = await db.execute(query)
    row = result.first()
    if not row:
        raise HTTPException(status_code=401, detail="Incorrect email or password")
    
    user, org_name = row[0], row[1] or "Workspace"
    if not verify_password(user_in.password, user.hashed_password):
        raise HTTPException(status_code=401, detail="Incorrect email or password")
    
    if not user.is_active:
        raise HTTPException(status_code=403, detail="Account is disabled")

    # Record login in AuditLog asynchronously in background without blocking login response
    try:
        from app.db.session import AsyncSessionLocal
        import asyncio

        async def _log_login(u_id, o_id, u_email):
            try:
                async with AsyncSessionLocal() as audit_db:
                    log = AuditLog(
                        org_id=o_id,
                        user_id=u_id,
                        action="USER_LOGIN",
                        resource_type="AUTH",
                        resource_id=u_id,
                        details=f"User {u_email} signed in successfully"
                    )
                    audit_db.add(log)
                    await audit_db.commit()
            except Exception:
                pass

        asyncio.create_task(_log_login(user.id, user.org_id, user.email))
    except Exception:
        pass

    token = create_access_token(user.id)
    return {
        "access_token": token,
        "token_type": "bearer",
        "user": {
            "id": user.id,
            "email": user.email,
            "full_name": user.full_name,
            "role": user.role,
            "org_id": user.org_id,
            "org_name": org_name
        }
    }

@router.get("/me", response_model=UserOut)
async def get_me(
    current_user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_db)
):
    org_name = None
    if current_user.org_id:
        org_res = await db.execute(select(Organization.name).where(Organization.id == current_user.org_id))
        org_name = org_res.scalar_one_or_none()

    return {
        "id": current_user.id,
        "email": current_user.email,
        "full_name": current_user.full_name,
        "role": current_user.role,
        "org_id": current_user.org_id,
        "org_name": org_name,
        "created_at": current_user.created_at
    }

@router.put("/profile", response_model=UserOut)
async def update_profile(
    profile_in: UserProfileUpdate,
    current_user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_db)
):
    if profile_in.full_name:
        current_user.full_name = profile_in.full_name.strip()
    
    org_name = None
    if current_user.org_id:
        org_res = await db.execute(select(Organization).where(Organization.id == current_user.org_id))
        org_obj = org_res.scalars().first()
        if org_obj:
            if profile_in.org_name:
                org_obj.name = profile_in.org_name.strip()
            org_name = org_obj.name

    await db.commit()
    await db.refresh(current_user)

    return {
        "id": current_user.id,
        "email": current_user.email,
        "full_name": current_user.full_name,
        "role": current_user.role,
        "org_id": current_user.org_id,
        "org_name": org_name,
        "created_at": current_user.created_at
    }
