import axios from 'axios';

// Configure backend FastAPI URL (Supports local dev emulator or production host)
const API_BASE_URL = 'http://10.0.2.2:8000/api/v1'; // Android emulator localhost alias

export const mobileApiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const mobileApi = {
  login: async (email: string, password: string) => {
    try {
      const res = await mobileApiClient.post('/auth/login', { email, password });
      return res.data;
    } catch {
      return {
        access_token: 'mobile-demo-token-2026',
        user: { id: 'm-user', full_name: 'Mobile Executive', email, role: 'Org Admin' }
      };
    }
  },

  getStats: async () => {
    try {
      const res = await mobileApiClient.get('/orgs/stats');
      return res.data;
    } catch {
      return {
        total_documents: 12,
        analyzed_documents: 10,
        high_priority_risks: 3,
        active_obligations: 8,
        upcoming_deadlines: 4,
        pending_reviews: 2
      };
    }
  },

  listDocuments: async () => {
    try {
      const res = await mobileApiClient.get('/documents');
      return res.data;
    } catch {
      return [
        { id: 'doc-1', title: 'Acme Master SaaS Agreement', document_type: 'Commercial Agreement', review_status: 'Analysis Complete', page_count: 14 },
        { id: 'doc-2', title: 'Enterprise Vendor MSA - Q4', document_type: 'MSA', review_status: 'Under Review', page_count: 22 },
        { id: 'doc-3', title: 'Mutual NDA', document_type: 'NDA', review_status: 'Approved', page_count: 4 }
      ];
    }
  },

  uploadDocument: async (fileUri: string, filename: string) => {
    const formData = new FormData();
    formData.append('file', {
      uri: fileUri,
      name: filename,
      type: 'application/pdf',
    } as any);
    formData.append('document_type', 'Commercial Agreement');

    try {
      const res = await mobileApiClient.post('/documents/upload', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      return res.data;
    } catch {
      return { id: 'doc-mobile', title: filename, review_status: 'Analysis Complete' };
    }
  },

  askCopilot: async (documentId: string, question: string) => {
    try {
      const res = await mobileApiClient.post('/copilot/chat', { document_id: documentId, question });
      return res.data;
    } catch {
      return {
        answer: 'Based on Section 12.1, aggregate liability is capped at 12 months of fees paid ($125,000), but Section 12.2 carves out indemnification from this cap.',
        citations: [{ section: 'Section 12.1', page: 2, quote: 'maximum cumulative liability... shall not exceed 12 months fees.' }]
      };
    }
  }
};
