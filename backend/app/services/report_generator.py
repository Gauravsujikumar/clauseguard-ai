import io
import csv
from reportlab.lib.pagesizes import letter
from reportlab.lib import colors
from reportlab.platypus import SimpleDocTemplate, Paragraph, Spacer, Table, TableStyle
from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle

class ReportGeneratorService:
    @staticmethod
    def generate_pdf_summary_report(doc_title: str, summary_data: dict, risks: list, obligations: list) -> bytes:
        buffer = io.BytesIO()
        doc = SimpleDocTemplate(buffer, pagesize=letter, rightMargin=36, leftMargin=36, topMargin=36, bottomMargin=36)
        story = []
        styles = getSampleStyleSheet()
        
        title_style = ParagraphStyle(
            'TitleStyle',
            parent=styles['Heading1'],
            fontName='Helvetica-Bold',
            fontSize=20,
            textColor=colors.HexColor('#071B45'),
            spaceAfter=12
        )
        
        subtitle_style = ParagraphStyle(
            'SubTitleStyle',
            parent=styles['Normal'],
            fontName='Helvetica',
            fontSize=10,
            textColor=colors.HexColor('#667085'),
            spaceAfter=20
        )
        
        heading_style = ParagraphStyle(
            'HeadingStyle',
            parent=styles['Heading2'],
            fontName='Helvetica-Bold',
            fontSize=13,
            textColor=colors.HexColor('#155EEF'),
            spaceBefore=14,
            spaceAfter=6
        )
        
        body_style = ParagraphStyle(
            'BodyStyle',
            parent=styles['BodyText'],
            fontName='Helvetica',
            fontSize=9,
            leading=12,
            textColor=colors.HexColor('#101828')
        )
        
        # Header
        story.append(Paragraph("ClauseGuard AI - Executive Contract Intelligence Report", title_style))
        story.append(Paragraph(f"Document: {doc_title} | Generated: {summary_data.get('effective_date', '2026-10-09')}", subtitle_style))
        story.append(Spacer(1, 10))
        
        # Summary Box
        story.append(Paragraph("Executive Summary", heading_style))
        story.append(Paragraph(summary_data.get("detailed_summary", "No summary available."), body_style))
        story.append(Spacer(1, 10))
        
        # Key Metadata Table
        meta_data = [
            ["Metric / Term", "Contract Details"],
            ["Contract Purpose", summary_data.get("purpose", "N/A")[:80] + "..."],
            ["Parties", ", ".join(summary_data.get("parties", []))],
            ["Financial Value", summary_data.get("financial_terms", "N/A")],
            ["Effective Date", summary_data.get("effective_date", "N/A")],
            ["Expiration Date", summary_data.get("expiration_date", "N/A")],
            ["Renewal Term", summary_data.get("renewal_conditions", "N/A")[:80] + "..."]
        ]
        
        t = Table(meta_data, colWidths=[140, 380])
        t.setStyle(TableStyle([
            ('BACKGROUND', (0, 0), (1, 0), colors.HexColor('#071B45')),
            ('TEXTCOLOR', (0, 0), (1, 0), colors.white),
            ('FONTNAME', (0, 0), (1, 0), 'Helvetica-Bold'),
            ('FONTSIZE', (0, 0), (-1, -1), 8),
            ('BOTTOMPADDING', (0, 0), (-1, -1), 5),
            ('TOPPADDING', (0, 0), (-1, -1), 5),
            ('GRID', (0, 0), (-1, -1), 0.5, colors.HexColor('#E4E7EC')),
            ('BACKGROUND', (0, 1), (-1, -1), colors.HexColor('#F8FAFC'))
        ]))
        story.append(t)
        story.append(Spacer(1, 15))
        
        # Risk Findings
        story.append(Paragraph("Key Risk Findings", heading_style))
        for r in risks:
            risk_text = f"<b>[{r.get('severity', 'Medium')}] {r.get('title')}</b> (Section {r.get('section_ref', 'N/A')})<br/>" \
                        f"<i>Explanation:</i> {r.get('explanation')}<br/>" \
                        f"<i>Evidence:</i> \"{r.get('supporting_passage')}\""
            story.append(Paragraph(risk_text, body_style))
            story.append(Spacer(1, 6))
            
        story.append(Spacer(1, 15))
        story.append(Paragraph("Disclaimer: This AI analysis report is provided for intelligence and operational assistance and does not constitute formal legal advice.", subtitle_style))
        
        doc.build(story)
        pdf_bytes = buffer.getvalue()
        buffer.close()
        return pdf_bytes

    @staticmethod
    def generate_csv_obligations(obligations: list) -> str:
        output = io.StringIO()
        writer = csv.writer(output)
        writer.writerow(["Description", "Responsible Party", "Deadline Expression", "Calculated Deadline", "Page", "Status", "Notes"])
        
        for o in obligations:
            writer.writerow([
                o.get("description", ""),
                o.get("responsible_party", ""),
                o.get("deadline_expression", ""),
                o.get("calculated_deadline", ""),
                o.get("page_number", 1),
                o.get("status", "Pending"),
                o.get("notes", "")
            ])
            
        return output.getvalue()

report_generator = ReportGeneratorService()
