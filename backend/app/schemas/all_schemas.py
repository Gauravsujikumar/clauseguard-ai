from datetime import datetime
from typing import List, Optional, Any, Dict
from pydantic import BaseModel, EmailStr, ConfigDict

# Token Schemas
class Token(BaseModel):
    access_token: str
    token_type: str = "bearer"
    user: Dict[str, Any]

class TokenData(BaseModel):
    sub: Optional[str] = None

# User Schemas
class UserCreate(BaseModel):
    email: EmailStr
    password: str
    full_name: str
    org_name: Optional[str] = "Default Organization"

class UserLogin(BaseModel):
    email: EmailStr
    password: str

class UserProfileUpdate(BaseModel):
    full_name: Optional[str] = None
    org_name: Optional[str] = None

class UserOut(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    id: str
    email: str
    full_name: str
    role: str
    org_id: Optional[str] = None
    org_name: Optional[str] = None
    created_at: datetime

# Document Schemas
class DocumentOut(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    id: str
    org_id: str
    title: str
    original_filename: str
    file_path: str
    file_size: int
    mime_type: str
    page_count: int
    status: str
    review_status: str
    document_type: str
    tags: List[str] = []
    folder: str = "Root"
    is_archived: bool = False
    created_at: datetime
    created_by: str

# Analysis Schemas
class ExecutiveSummaryOut(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    id: str
    document_id: str
    purpose: Optional[str] = None
    parties: List[str] = []
    main_terms: Optional[str] = None
    financial_terms: Optional[str] = None
    effective_date: Optional[str] = None
    expiration_date: Optional[str] = None
    renewal_conditions: Optional[str] = None
    termination_provisions: Optional[str] = None
    quick_summary: Optional[str] = None
    detailed_summary: Optional[str] = None
    plain_english_summary: Optional[str] = None

class RiskFindingOut(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    id: str
    document_id: str
    title: str
    category: str
    severity: str
    explanation: str
    supporting_passage: str
    page_number: int
    section_ref: Optional[str] = None
    potential_impact: Optional[str] = None
    suggested_action: Optional[str] = None
    review_status: str

class RiskStatusUpdate(BaseModel):
    review_status: str

class ExtractedClauseOut(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    id: str
    document_id: str
    clause_type: str
    original_text: str
    plain_summary: str
    page_number: int
    section_ref: Optional[str] = None

class ObligationOut(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    id: str
    document_id: str
    description: str
    responsible_party: str
    beneficiary: Optional[str] = None
    deadline_expression: Optional[str] = None
    calculated_deadline: Optional[str] = None
    page_number: int
    status: str
    assignee_id: Optional[str] = None
    notes: Optional[str] = None

class ObligationUpdate(BaseModel):
    status: Optional[str] = None
    assignee_id: Optional[str] = None
    notes: Optional[str] = None
    calculated_deadline: Optional[str] = None

class FullAnalysisResponse(BaseModel):
    document: DocumentOut
    summary: Optional[ExecutiveSummaryOut] = None
    risks: List[RiskFindingOut] = []
    clauses: List[ExtractedClauseOut] = []
    obligations: List[ObligationOut] = []
    metadata: List[Dict[str, Any]] = []
    pages: List[Dict[str, Any]] = []

# Copilot QA Schemas
class ChatQuery(BaseModel):
    document_id: str
    question: str

class ChatResponse(BaseModel):
    answer: str
    citations: List[Dict[str, Any]] = []
    confidence: float = 0.92

# Workflow & Review Schemas
class ReviewCreate(BaseModel):
    document_id: str
    reviewer_id: str
    review_deadline: Optional[str] = None
    comments: Optional[str] = None

class ReviewDecision(BaseModel):
    status: str  # Approved, Rejected, Changes Requested
    comments: Optional[str] = None

class ReviewWorkflowOut(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    id: str
    document_id: str
    reviewer_id: str
    review_deadline: Optional[str] = None
    status: str
    decision: Optional[str] = None
    comments: Optional[str] = None
    created_at: datetime

class CommentCreate(BaseModel):
    document_id: str
    content: str
    page_ref: Optional[int] = None

class CommentOut(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    id: str
    document_id: str
    user_id: str
    user_name: str
    content: str
    page_ref: Optional[int] = None
    created_at: datetime

# Comparison Schema
class CompareRequest(BaseModel):
    base_doc_id: str
    target_doc_id: str

# Team / Org Schemas
class OrgMemberInvite(BaseModel):
    email: EmailStr
    full_name: str
    role: str = "Reviewer"

class AuditLogOut(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    id: str
    org_id: str
    user_id: str
    action: str
    resource_type: str
    resource_id: Optional[str] = None
    details: Optional[str] = None
    created_at: datetime
