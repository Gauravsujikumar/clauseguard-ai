export interface User {
  id: string;
  email: string;
  full_name: string;
  role: string;
  org_id?: string;
}

export interface Document {
  id: string;
  org_id: string;
  title: string;
  original_filename: string;
  file_path: string;
  file_size: number;
  mime_type: string;
  page_count: number;
  status: string;
  review_status: string;
  document_type: string;
  tags: string[];
  folder: string;
  is_archived: boolean;
  created_at: string;
  created_by: string;
}

export interface ExecutiveSummary {
  id: string;
  document_id: string;
  purpose: string;
  parties: string[];
  main_terms: string;
  financial_terms: string;
  effective_date: string;
  expiration_date: string;
  renewal_conditions: string;
  termination_provisions: string;
  quick_summary: string;
  detailed_summary: string;
  plain_english_summary: string;
}

export interface RiskFinding {
  id: string;
  document_id: string;
  title: string;
  category: string;
  severity: 'High' | 'Medium' | 'Low' | 'Informational';
  explanation: string;
  supporting_passage: string;
  page_number: number;
  section_ref?: string;
  potential_impact?: string;
  suggested_action?: string;
  review_status: 'Unreviewed' | 'Approved' | 'Dismissed' | 'Mitigated';
}

export interface ExtractedClause {
  id: string;
  document_id: string;
  clause_type: string;
  original_text: string;
  plain_summary: string;
  page_number: number;
  section_ref?: string;
}

export interface Obligation {
  id: string;
  document_id: string;
  description: string;
  responsible_party: string;
  beneficiary?: string;
  deadline_expression?: string;
  calculated_deadline?: string;
  page_number: number;
  status: 'Needs Review' | 'Pending' | 'In Progress' | 'Completed' | 'Overdue';
  assignee_id?: string;
  notes?: string;
}

export interface FullAnalysisResponse {
  document: Document;
  summary: ExecutiveSummary;
  risks: RiskFinding[];
  clauses: ExtractedClause[];
  obligations: Obligation[];
  metadata: Array<{ field_name: string; field_value: string; confidence: number; page_ref?: number }>;
}

export interface DashboardStats {
  total_documents: number;
  analyzed_documents: number;
  high_priority_risks: number;
  active_obligations: number;
  upcoming_deadlines: number;
  pending_reviews: number;
}
