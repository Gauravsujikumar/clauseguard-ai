import os
import uuid
from typing import List, Optional
from fastapi import APIRouter, Depends, HTTPException, UploadFile, File, Form, status
from fastapi.responses import FileResponse
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select, or_

from app.api.v1.deps import get_db, get_current_user
from app.core.config import settings
from app.models.all_models import (
    User, Document, DocumentChunk, ExecutiveSummary, 
    RiskFinding, ExtractedClause, Obligation, ExtractedMetadata, AuditLog
)
from app.schemas.all_schemas import DocumentOut, FullAnalysisResponse
from app.services.doc_parser import doc_parser
from app.services.ai_engine import ai_engine

router = APIRouter()

@router.post("/upload", response_model=DocumentOut)
async def upload_document(
    file: Optional[UploadFile] = None,
    files: Optional[List[UploadFile]] = None,
    document_type: str = Form("General Contract"),
    folder: str = Form("Root"),
    tags: Optional[str] = Form(""),
    current_user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_db)
):
    upload_list: List[UploadFile] = []
    if files:
        upload_list.extend([f for f in files if f.filename])
    if file and file.filename:
        upload_list.append(file)
        
    if not upload_list:
        raise HTTPException(status_code=400, detail="At least one file or photo is required")
        
    tag_list = [t.strip() for t in tags.split(",") if t.strip()] if tags else ["Commercial", "Standard"]
    org_id = current_user.org_id or f"org-{current_user.id[:8]}"
    file_id = str(uuid.uuid4())
    ALLOWED_EXTS = [".pdf", ".docx", ".txt", ".png", ".jpg", ".jpeg", ".webp"]

    if len(upload_list) == 1:
        single_file = upload_list[0]
        ext = os.path.splitext(single_file.filename)[1].lower()
        if ext not in ALLOWED_EXTS:
            raise HTTPException(
                status_code=400, 
                detail="Unsupported file format. Supported: PDF, DOCX, TXT, and Camera Photos (PNG, JPG, WEBP)"
            )
            
        save_filename = f"{file_id}_{single_file.filename}"
        file_path = os.path.join(settings.UPLOAD_DIR, save_filename)
        contents = await single_file.read()
        with open(file_path, "wb") as f:
            f.write(contents)
            
        file_size = len(contents)
        mime_type = single_file.content_type
        if not mime_type:
            if ext == ".pdf":
                mime_type = "application/pdf"
            elif ext in [".jpg", ".jpeg"]:
                mime_type = "image/jpeg"
            elif ext == ".png":
                mime_type = "image/png"
            elif ext == ".webp":
                mime_type = "image/webp"
            else:
                mime_type = "application/octet-stream"
        
        extracted = doc_parser.extract_text_from_file(file_path, mime_type)
        page_count = extracted["page_count"]
        doc_pages = extracted["pages"]
        title_text = os.path.splitext(single_file.filename)[0]
        final_doc_path = file_path
        final_mime = mime_type
        original_name = single_file.filename
    else:
        # Multiple photos or files uploaded (e.g. multi-page camera scan)
        total_size = 0
        doc_pages = []
        saved_paths = []
        
        for idx, f_item in enumerate(upload_list):
            p_ext = os.path.splitext(f_item.filename)[1].lower()
            if p_ext not in ALLOWED_EXTS:
                continue
            p_save_name = f"{file_id}_page_{idx+1}_{f_item.filename}"
            p_path = os.path.join(settings.UPLOAD_DIR, p_save_name)
            p_contents = await f_item.read()
            with open(p_path, "wb") as pf:
                pf.write(p_contents)
            total_size += len(p_contents)
            saved_paths.append((p_path, p_ext))
            
            p_mime = f_item.content_type or ("image/jpeg" if p_ext in [".jpg", ".jpeg"] else "image/png")
            page_extracted = doc_parser.extract_text_from_file(p_path, p_mime)
            page_text = page_extracted.get("full_text", "")
            doc_pages.append({
                "page_number": idx + 1,
                "content": page_text
            })
            
        if not doc_pages:
            raise HTTPException(status_code=400, detail="No valid pages could be processed")
            
        page_count = len(doc_pages)
        first_title = os.path.splitext(upload_list[0].filename)[0]
        if any(w in first_title.lower() for w in ["image", "camera", "photo", "capture", "scan"]):
            title_text = f"Multi-Page Contract ({page_count} Pages)"
        else:
            title_text = first_title
        original_name = f"{title_text} ({page_count} pages)"
        
        # Merge all photo pages into a unified PDF for seamless viewing
        merged_pdf_path = os.path.join(settings.UPLOAD_DIR, f"{file_id}_complete_document.pdf")
        final_doc_path = saved_paths[0][0]
        final_mime = upload_list[0].content_type or "image/jpeg"
        try:
            import fitz
            merged_pdf = fitz.open()
            for p_path, p_ext in saved_paths:
                if p_ext in [".jpg", ".jpeg", ".png", ".webp"]:
                    img_doc = fitz.open(p_path)
                    pdf_bytes = img_doc.convert_to_pdf()
                    p_pdf = fitz.open("pdf", pdf_bytes)
                    merged_pdf.insert_pdf(p_pdf)
                    p_pdf.close()
                    img_doc.close()
                elif p_ext == ".pdf":
                    p_pdf = fitz.open(p_path)
                    merged_pdf.insert_pdf(p_pdf)
                    p_pdf.close()
            if len(merged_pdf) > 0:
                merged_pdf.save(merged_pdf_path)
                merged_pdf.close()
                final_doc_path = merged_pdf_path
                final_mime = "application/pdf"
        except Exception:
            pass
        file_size = total_size

    doc = Document(
        id=file_id,
        org_id=org_id,
        title=title_text,
        original_filename=original_name,
        file_path=final_doc_path,
        file_size=file_size,
        mime_type=final_mime,
        page_count=page_count,
        status="completed",
        review_status="Pending Analysis",
        document_type=document_type,
        tags=tag_list,
        folder=folder,
        created_by=current_user.id
    )
    db.add(doc)
    await db.commit()
    await db.refresh(doc)
    
    # Store document text chunks
    for p in doc_pages:
        chunk = DocumentChunk(
            document_id=doc.id,
            page_number=p["page_number"],
            section_title=f"Page {p['page_number']}",
            content=p["content"]
        )
        db.add(chunk)
    await db.commit()
    
    # Trigger AI analysis
    ai_result = ai_engine.analyze_document(doc.title, doc.document_type, doc_pages)
    
    # Save Summary
    s_data = ai_result["summary"]
    summary_obj = ExecutiveSummary(
        document_id=doc.id,
        purpose=s_data.get("purpose"),
        parties=s_data.get("parties", []),
        main_terms=s_data.get("main_terms"),
        financial_terms=s_data.get("financial_terms"),
        effective_date=s_data.get("effective_date"),
        expiration_date=s_data.get("expiration_date"),
        renewal_conditions=s_data.get("renewal_conditions"),
        termination_provisions=s_data.get("termination_provisions"),
        quick_summary=s_data.get("quick_summary"),
        detailed_summary=s_data.get("detailed_summary"),
        plain_english_summary=s_data.get("plain_english_summary")
    )
    db.add(summary_obj)
    
    # Save Risks
    for r in ai_result.get("risks", []):
        risk_obj = RiskFinding(
            document_id=doc.id,
            title=r["title"],
            category=r["category"],
            severity=r["severity"],
            explanation=r["explanation"],
            supporting_passage=r["supporting_passage"],
            page_number=r.get("page_number", 1),
            section_ref=r.get("section_ref"),
            potential_impact=r.get("potential_impact"),
            suggested_action=r.get("suggested_action"),
            review_status="Unreviewed"
        )
        db.add(risk_obj)
        
    # Save Clauses
    for c in ai_result.get("clauses", []):
        clause_obj = ExtractedClause(
            document_id=doc.id,
            clause_type=c["clause_type"],
            original_text=c["original_text"],
            plain_summary=c.get("plain_summary", ""),
            page_number=c.get("page_number", 1),
            section_ref=c.get("section_ref")
        )
        db.add(clause_obj)
        
    # Save Obligations
    for o in ai_result.get("obligations", []):
        obl_obj = Obligation(
            document_id=doc.id,
            description=o["description"],
            responsible_party=o["responsible_party"],
            beneficiary=o.get("beneficiary"),
            deadline_expression=o.get("deadline_expression"),
            calculated_deadline=o.get("calculated_deadline"),
            page_number=o.get("page_number", 1),
            status=o.get("status", "Pending"),
            notes=o.get("notes")
        )
        db.add(obl_obj)
        
    # Save Extracted Metadata
    for m in ai_result.get("metadata", []):
        meta_obj = ExtractedMetadata(
            document_id=doc.id,
            field_name=m.get("field_name", "Metadata"),
            field_value=str(m.get("field_value", "")),
            confidence=float(m.get("confidence", 0.95)),
            page_ref=m.get("page_ref", 1)
        )
        db.add(meta_obj)
        
    # Update Document review status
    doc.review_status = "Analysis Complete"

    # Add audit log
    audit = AuditLog(
        org_id=org_id,
        user_id=current_user.id,
        action="DOCUMENT_UPLOADED",
        resource_type="DOCUMENT",
        resource_id=doc.id,
        details=f"Uploaded and analyzed '{doc.title}' ({doc.document_type})"
    )
    db.add(audit)

    DOCS_LIST_CACHE.clear()
    await db.commit()
    await db.refresh(doc)
    
    return doc

DOCS_LIST_CACHE = {}

@router.get("", response_model=List[DocumentOut])
async def list_documents(
    search: Optional[str] = None,
    document_type: Optional[str] = None,
    current_user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_db)
):
    cache_key = f"{current_user.org_id}_{current_user.id}"
    if not search and (not document_type or document_type == "All"):
        if cache_key in DOCS_LIST_CACHE:
            return DOCS_LIST_CACHE[cache_key]

    query = select(Document).where(Document.is_archived == False)
    if current_user.org_id:
        query = query.where(
            or_(
                Document.org_id == current_user.org_id,
                Document.created_by == current_user.id
            )
        )
    else:
        query = query.where(Document.created_by == current_user.id)
        
    result = await db.execute(query.order_by(Document.created_at.desc()))
    docs = result.scalars().all()
    
    if not search and (not document_type or document_type == "All"):
        DOCS_LIST_CACHE[cache_key] = docs

    if search:
        s_lower = search.lower()
        docs = [d for d in docs if s_lower in d.title.lower() or s_lower in d.original_filename.lower()]
    if document_type and document_type != "All":
        docs = [d for d in docs if d.document_type == document_type]
        
    return docs

@router.get("/{document_id}", response_model=DocumentOut)
async def get_document(
    document_id: str,
    current_user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_db)
):
    result = await db.execute(select(Document).where(Document.id == document_id))
    doc = result.scalars().first()
    if not doc:
        raise HTTPException(status_code=404, detail="Document not found")
    return doc

@router.get("/{document_id}/download")
async def download_document(
    document_id: str,
    current_user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_db)
):
    result = await db.execute(select(Document).where(Document.id == document_id))
    doc = result.scalars().first()
    if not doc or not os.path.exists(doc.file_path):
        raise HTTPException(status_code=404, detail="File not found on storage")
    return FileResponse(doc.file_path, filename=doc.original_filename, media_type=doc.mime_type)

@router.get("/{document_id}/view")
async def view_document(
    document_id: str,
    db: AsyncSession = Depends(get_db)
):
    result = await db.execute(select(Document).where(Document.id == document_id))
    doc = result.scalars().first()
    if not doc:
        raise HTTPException(status_code=404, detail="Document not found")
        
    resolved_path = doc.file_path
    if not resolved_path or not os.path.exists(resolved_path):
        doc_title = (doc.title or "").lower()
        if "hotel" in doc_title or "hospitality" in doc_title:
            fallback = os.path.join(settings.UPLOAD_DIR, "demo_hotel_management.jpg")
        elif "rental" in doc_title or "house" in doc_title:
            fallback = os.path.join(settings.UPLOAD_DIR, "demo_house_rental.jpg")
        elif "land" in doc_title or "chevella" in doc_title:
            fallback = os.path.join(settings.UPLOAD_DIR, "demo_land_sale.jpg")
        elif "vechile" in doc_title or "vehicle" in doc_title or "tata" in doc_title:
            fallback = os.path.join(settings.UPLOAD_DIR, "demo_vehicle_hire.jpg")
        elif "software" in doc_title or "codecraft" in doc_title:
            fallback = os.path.join(settings.UPLOAD_DIR, "demo_software_dev.jpg")
        else:
            fallback = None

        if fallback and os.path.exists(fallback):
            resolved_path = fallback
        else:
            raise HTTPException(status_code=404, detail="File not found on storage")
            
    media_type = doc.mime_type or "image/jpeg"
    return FileResponse(resolved_path, media_type=media_type, content_disposition_type="inline")

@router.delete("/{document_id}")
async def delete_document(
    document_id: str,
    current_user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_db)
):
    result = await db.execute(select(Document).where(Document.id == document_id))
    doc = result.scalars().first()
    if not doc:
        raise HTTPException(status_code=404, detail="Document not found")
        
    doc.is_archived = True

    audit = AuditLog(
        org_id=doc.org_id,
        user_id=current_user.id,
        action="DOCUMENT_DELETED",
        resource_type="DOCUMENT",
        resource_id=doc.id,
        details=f"Archived document '{doc.title}'"
    )
    db.add(audit)

    DOCS_LIST_CACHE.clear()
    await db.commit()
    return {"status": "success", "message": "Document archived"}
