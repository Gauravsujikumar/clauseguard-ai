import sys
import os
import uuid
import asyncio

# Add backend directory to sys.path
backend_dir = os.path.abspath(os.path.join(os.path.dirname(__file__), ".."))
sys.path.insert(0, backend_dir)

from sqlalchemy import select, delete
from app.db.session import AsyncSessionLocal
from app.models.all_models import (
    User, Document, DocumentChunk, ExecutiveSummary, 
    RiskFinding, ExtractedClause, Obligation, ExtractedMetadata
)
from app.services.demo_contracts import DEMO_CONTRACTS

async def seed_or_update_documents():
    async with AsyncSessionLocal() as session:
        # Find all active users
        user_res = await session.execute(select(User))
        users = user_res.scalars().all()
        if not users:
            print("No users found.")
            return

        target_user = users[0]
        for u in users:
            if "gaurav" in u.email.lower() or "demo" in u.email.lower():
                target_user = u
                break

        print(f"Assigning demo documents for primary user: {target_user.email} (ID: {target_user.id})")
        org_id = target_user.org_id or f"org-{target_user.id[:8]}"

        # Existing docs
        existing_res = await session.execute(select(Document))
        existing_docs = existing_res.scalars().all()

        # Update any existing documents that match vehicle or rental or land
        for doc in existing_docs:
            title_lower = doc.title.lower()
            matching_key = None
            if "vechile" in title_lower or "vehicle" in title_lower or "tata" in title_lower:
                matching_key = "vehicle_hire"
            elif "rental" in title_lower or "house" in title_lower:
                matching_key = "house_rental"
            elif "land" in title_lower or "chevella" in title_lower:
                matching_key = "land_sale"
            elif "hotel" in title_lower or "hospitality" in title_lower:
                matching_key = "hotel_management"
            elif "software" in title_lower or "codecraft" in title_lower:
                matching_key = "software_development"

            if matching_key:
                demo_data = DEMO_CONTRACTS[matching_key]
                print(f"Updating existing document ID {doc.id} ('{doc.title}') with {demo_data['title']} ground truth...")
                
                # Delete existing stale summaries, risks, clauses, obligations, metadata, chunks
                await session.execute(delete(ExecutiveSummary).where(ExecutiveSummary.document_id == doc.id))
                await session.execute(delete(RiskFinding).where(RiskFinding.document_id == doc.id))
                await session.execute(delete(ExtractedClause).where(ExtractedClause.document_id == doc.id))
                await session.execute(delete(Obligation).where(Obligation.document_id == doc.id))
                await session.execute(delete(ExtractedMetadata).where(ExtractedMetadata.document_id == doc.id))
                await session.execute(delete(DocumentChunk).where(DocumentChunk.document_id == doc.id))

                # Re-add accurate chunk
                chunk = DocumentChunk(
                    document_id=doc.id,
                    page_number=1,
                    section_title="Page 1",
                    content=demo_data["raw_text"]
                )
                session.add(chunk)

                # Re-add summary
                s_data = demo_data["analysis"]["summary"]
                summary_obj = ExecutiveSummary(
                    document_id=doc.id,
                    purpose=s_data["purpose"],
                    parties=s_data["parties"],
                    main_terms=s_data["main_terms"],
                    financial_terms=s_data["financial_terms"],
                    effective_date=s_data["effective_date"],
                    expiration_date=s_data["expiration_date"],
                    renewal_conditions=s_data["renewal_conditions"],
                    termination_provisions=s_data["termination_provisions"],
                    quick_summary=s_data["quick_summary"],
                    detailed_summary=s_data["detailed_summary"],
                    plain_english_summary=s_data["plain_english_summary"]
                )
                session.add(summary_obj)

                # Re-add risks
                for r in demo_data["analysis"]["risks"]:
                    session.add(RiskFinding(
                        document_id=doc.id,
                        title=r["title"],
                        category=r["category"],
                        severity=r["severity"],
                        explanation=r["explanation"],
                        supporting_passage=r["supporting_passage"],
                        page_number=r.get("page_number", 1),
                        section_ref=r.get("section_ref", ""),
                        potential_impact=r.get("potential_impact", ""),
                        suggested_action=r.get("suggested_action", ""),
                        review_status="Needs Review"
                    ))

                # Re-add clauses
                for c in demo_data["analysis"]["clauses"]:
                    session.add(ExtractedClause(
                        document_id=doc.id,
                        clause_type=c["clause_type"],
                        original_text=c["original_text"],
                        plain_summary=c["plain_summary"],
                        page_number=c.get("page_number", 1),
                        section_ref=c.get("section_ref", "")
                    ))

                # Re-add obligations
                for o in demo_data["analysis"]["obligations"]:
                    session.add(Obligation(
                        document_id=doc.id,
                        description=o["description"],
                        responsible_party=o["responsible_party"],
                        beneficiary=o["beneficiary"],
                        deadline_expression=o["deadline_expression"],
                        calculated_deadline=o["calculated_deadline"],
                        page_number=o.get("page_number", 1),
                        status=o.get("status", "Pending"),
                        notes=o.get("notes", "")
                    ))

                # Re-add metadata
                for m in demo_data["analysis"]["metadata"]:
                    session.add(ExtractedMetadata(
                        document_id=doc.id,
                        field_name=m["field_name"],
                        field_value=m["field_value"],
                        confidence=m.get("confidence", 0.98),
                        page_ref=m.get("page_ref", 1)
                    ))

        # Also ensure all 5 demo contracts exist in DB for target_user
        existing_titles = [d.title.lower() for d in existing_docs]
        for key, demo_data in DEMO_CONTRACTS.items():
            if not any(demo_data["title"].lower() in t or t in demo_data["title"].lower() for t in existing_titles):
                print(f"Creating new demo contract in DB: {demo_data['title']}")
                new_doc_id = str(uuid.uuid4())
                new_doc = Document(
                    id=new_doc_id,
                    org_id=org_id,
                    title=demo_data["title"],
                    original_filename=f"{demo_data['title'].replace(' ', '_')}.jpg",
                    file_path="",
                    file_size=285000,
                    mime_type="image/jpeg",
                    page_count=1,
                    status="completed",
                    review_status="Completed",
                    document_type=demo_data["doc_type"],
                    tags=["Demo", "Verified", demo_data["doc_type"]],
                    folder="Demo Contracts",
                    created_by=target_user.id
                )
                session.add(new_doc)

                chunk = DocumentChunk(
                    document_id=new_doc_id,
                    page_number=1,
                    section_title="Page 1",
                    content=demo_data["raw_text"]
                )
                session.add(chunk)

                s_data = demo_data["analysis"]["summary"]
                session.add(ExecutiveSummary(
                    document_id=new_doc_id,
                    purpose=s_data["purpose"],
                    parties=s_data["parties"],
                    main_terms=s_data["main_terms"],
                    financial_terms=s_data["financial_terms"],
                    effective_date=s_data["effective_date"],
                    expiration_date=s_data["expiration_date"],
                    renewal_conditions=s_data["renewal_conditions"],
                    termination_provisions=s_data["termination_provisions"],
                    quick_summary=s_data["quick_summary"],
                    detailed_summary=s_data["detailed_summary"],
                    plain_english_summary=s_data["plain_english_summary"]
                ))

                for r in demo_data["analysis"]["risks"]:
                    session.add(RiskFinding(
                        document_id=new_doc_id,
                        title=r["title"],
                        category=r["category"],
                        severity=r["severity"],
                        explanation=r["explanation"],
                        supporting_passage=r["supporting_passage"],
                        page_number=r.get("page_number", 1),
                        section_ref=r.get("section_ref", ""),
                        potential_impact=r.get("potential_impact", ""),
                        suggested_action=r.get("suggested_action", ""),
                        review_status="Needs Review"
                    ))

                for c in demo_data["analysis"]["clauses"]:
                    session.add(ExtractedClause(
                        document_id=new_doc_id,
                        clause_type=c["clause_type"],
                        original_text=c["original_text"],
                        plain_summary=c["plain_summary"],
                        page_number=c.get("page_number", 1),
                        section_ref=c.get("section_ref", "")
                    ))

                for o in demo_data["analysis"]["obligations"]:
                    session.add(Obligation(
                        document_id=new_doc_id,
                        description=o["description"],
                        responsible_party=o["responsible_party"],
                        beneficiary=o["beneficiary"],
                        deadline_expression=o["deadline_expression"],
                        calculated_deadline=o["calculated_deadline"],
                        page_number=o.get("page_number", 1),
                        status=o.get("status", "Pending"),
                        notes=o.get("notes", "")
                    ))

                for m in demo_data["analysis"]["metadata"]:
                    session.add(ExtractedMetadata(
                        document_id=new_doc_id,
                        field_name=m["field_name"],
                        field_value=m["field_value"],
                        confidence=m.get("confidence", 0.98),
                        page_ref=m.get("page_ref", 1)
                    ))

        await session.commit()
        print("Database successfully synchronized with verified demo contracts!")

if __name__ == "__main__":
    asyncio.run(seed_or_update_documents())
