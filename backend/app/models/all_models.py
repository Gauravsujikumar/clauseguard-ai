from datetime import datetime
from sqlalchemy import Column, String, Integer, Float, Boolean, DateTime, Text, ForeignKey, JSON
from sqlalchemy.orm import relationship
from app.db.base_class import BaseModel

class User(BaseModel):
    __tablename__ = "users"
    
    email = Column(String, unique=True, index=True, nullable=False)
    hashed_password = Column(String, nullable=False)
    full_name = Column(String, nullable=False)
    is_active = Column(Boolean, default=True)
    role = Column(String, default="Member")  # Platform Admin, Org Admin, Reviewer, Manager, Member, Viewer
    org_id = Column(String, ForeignKey("organizations.id"), nullable=True)

class Organization(BaseModel):
    __tablename__ = "organizations"
    
    name = Column(String, nullable=False)
    slug = Column(String, unique=True, index=True, nullable=False)

class OrgMember(BaseModel):
    __tablename__ = "org_members"
    
    org_id = Column(String, ForeignKey("organizations.id"), nullable=False)
    user_id = Column(String, ForeignKey("users.id"), nullable=False)
    role = Column(String, default="Member")

class Document(BaseModel):
    __tablename__ = "documents"
    
    org_id = Column(String, ForeignKey("organizations.id"), nullable=False)
    title = Column(String, nullable=False)
    original_filename = Column(String, nullable=False)
    file_path = Column(String, nullable=False)
    file_size = Column(Integer, nullable=False, default=0)
    mime_type = Column(String, nullable=False, default="application/pdf")
    page_count = Column(Integer, default=0)
    status = Column(String, default="pending")  # pending, processing, completed, error
    review_status = Column(String, default="Draft")  # Draft, Pending Analysis, Analysis Complete, Under Review, Approved, Rejected
    document_type = Column(String, default="General Contract")  # NDA, MSA, SLA, Lease, Employment, Vendor
    tags = Column(JSON, default=list)
    folder = Column(String, default="Root")
    is_archived = Column(Boolean, default=False)
    created_by = Column(String, ForeignKey("users.id"), nullable=False)

class DocumentVersion(BaseModel):
    __tablename__ = "document_versions"
    
    document_id = Column(String, ForeignKey("documents.id"), nullable=False)
    version_number = Column(Integer, nullable=False, default=1)
    file_path = Column(String, nullable=False)
    notes = Column(Text, nullable=True)

class DocumentChunk(BaseModel):
    __tablename__ = "document_chunks"
    
    document_id = Column(String, ForeignKey("documents.id"), nullable=False)
    page_number = Column(Integer, default=1)
    section_title = Column(String, nullable=True)
    content = Column(Text, nullable=False)

class AnalysisRun(BaseModel):
    __tablename__ = "analysis_runs"
    
    document_id = Column(String, ForeignKey("documents.id"), nullable=False)
    status = Column(String, default="queued")  # queued, analyzing, completed, failed
    error_message = Column(Text, nullable=True)

class ExecutiveSummary(BaseModel):
    __tablename__ = "executive_summaries"
    
    document_id = Column(String, ForeignKey("documents.id"), nullable=False, unique=True)
    purpose = Column(Text, nullable=True)
    parties = Column(JSON, default=list)
    main_terms = Column(Text, nullable=True)
    financial_terms = Column(Text, nullable=True)
    effective_date = Column(String, nullable=True)
    expiration_date = Column(String, nullable=True)
    renewal_conditions = Column(Text, nullable=True)
    termination_provisions = Column(Text, nullable=True)
    quick_summary = Column(Text, nullable=True)
    detailed_summary = Column(Text, nullable=True)
    plain_english_summary = Column(Text, nullable=True)

class ExtractedMetadata(BaseModel):
    __tablename__ = "extracted_metadata"
    
    document_id = Column(String, ForeignKey("documents.id"), nullable=False)
    field_name = Column(String, nullable=False)
    field_value = Column(String, nullable=False)
    confidence = Column(Float, default=0.95)
    page_ref = Column(Integer, nullable=True)

class RiskFinding(BaseModel):
    __tablename__ = "risk_findings"
    
    document_id = Column(String, ForeignKey("documents.id"), nullable=False)
    title = Column(String, nullable=False)
    category = Column(String, nullable=False)  # Financial, Termination, Renewal, Liability, Indemnification, IP, Operational, Dispute, Data
    severity = Column(String, nullable=False)  # High, Medium, Low, Informational
    explanation = Column(Text, nullable=False)
    supporting_passage = Column(Text, nullable=False)
    page_number = Column(Integer, default=1)
    section_ref = Column(String, nullable=True)
    potential_impact = Column(Text, nullable=True)
    suggested_action = Column(Text, nullable=True)
    review_status = Column(String, default="Unreviewed")  # Unreviewed, Approved, Dismissed, Mitigated

class ExtractedClause(BaseModel):
    __tablename__ = "extracted_clauses"
    
    document_id = Column(String, ForeignKey("documents.id"), nullable=False)
    clause_type = Column(String, nullable=False)  # Payment, Termination, Renewal, Confidentiality, Indemnification, Liability, IP, Governing Law
    original_text = Column(Text, nullable=False)
    plain_summary = Column(Text, nullable=False)
    page_number = Column(Integer, default=1)
    section_ref = Column(String, nullable=True)

class ClauseLibraryEntry(BaseModel):
    __tablename__ = "clause_library"
    
    org_id = Column(String, ForeignKey("organizations.id"), nullable=False)
    clause_type = Column(String, nullable=False)
    title = Column(String, nullable=False)
    reference_text = Column(Text, nullable=False)
    is_approved = Column(Boolean, default=True)

class Obligation(BaseModel):
    __tablename__ = "obligations"
    
    document_id = Column(String, ForeignKey("documents.id"), nullable=False)
    description = Column(Text, nullable=False)
    responsible_party = Column(String, nullable=False)
    beneficiary = Column(String, nullable=True)
    deadline_expression = Column(String, nullable=True)
    calculated_deadline = Column(String, nullable=True)  # YYYY-MM-DD
    page_number = Column(Integer, default=1)
    status = Column(String, default="Needs Review")  # Needs Review, Pending, In Progress, Completed, Overdue
    assignee_id = Column(String, ForeignKey("users.id"), nullable=True)
    notes = Column(Text, nullable=True)

class ContractComparison(BaseModel):
    __tablename__ = "contract_comparisons"
    
    base_doc_id = Column(String, ForeignKey("documents.id"), nullable=False)
    target_doc_id = Column(String, ForeignKey("documents.id"), nullable=False)
    summary_diff = Column(Text, nullable=False)
    added_clauses = Column(JSON, default=list)
    removed_clauses = Column(JSON, default=list)
    modified_clauses = Column(JSON, default=list)

class GapAnalysis(BaseModel):
    __tablename__ = "gap_analysis"
    
    document_id = Column(String, ForeignKey("documents.id"), nullable=False)
    checklist_name = Column(String, nullable=False)
    item_key = Column(String, nullable=False)
    status = Column(String, nullable=False)  # Present, Potentially Incomplete, Ambiguous, Not Found, Not Applicable
    evidence = Column(Text, nullable=True)
    notes = Column(Text, nullable=True)

class ReviewWorkflow(BaseModel):
    __tablename__ = "review_workflows"
    
    document_id = Column(String, ForeignKey("documents.id"), nullable=False)
    reviewer_id = Column(String, ForeignKey("users.id"), nullable=False)
    review_deadline = Column(String, nullable=True)
    status = Column(String, default="Under Review")  # Under Review, Approved, Changes Requested, Rejected
    decision = Column(String, nullable=True)
    comments = Column(Text, nullable=True)

class Comment(BaseModel):
    __tablename__ = "comments"
    
    document_id = Column(String, ForeignKey("documents.id"), nullable=False)
    user_id = Column(String, ForeignKey("users.id"), nullable=False)
    user_name = Column(String, nullable=False)
    content = Column(Text, nullable=False)
    page_ref = Column(Integer, nullable=True)

class Notification(BaseModel):
    __tablename__ = "notifications"
    
    user_id = Column(String, ForeignKey("users.id"), nullable=False)
    title = Column(String, nullable=False)
    message = Column(Text, nullable=False)
    link = Column(String, nullable=True)
    is_read = Column(Boolean, default=False)

class AuditLog(BaseModel):
    __tablename__ = "audit_logs"
    
    org_id = Column(String, ForeignKey("organizations.id"), nullable=False)
    user_id = Column(String, ForeignKey("users.id"), nullable=False)
    action = Column(String, nullable=False)
    resource_type = Column(String, nullable=False)
    resource_id = Column(String, nullable=True)
    details = Column(Text, nullable=True)
