import axios from 'axios';

const metaEnv = (import.meta as any).env;
const isLocal = typeof window !== 'undefined' && (
  window.location.hostname === 'localhost' || 
  window.location.hostname === '127.0.0.1' ||
  window.location.hostname.startsWith('192.168.') ||
  window.location.hostname.startsWith('10.') ||
  window.location.hostname.endsWith('.local') ||
  window.location.port === '5173'
);

export const LIVE_BACKEND_URL = 'https://backend-gray-mu-22.vercel.app/api/v1';

const API_BASE_URL = metaEnv?.VITE_API_URL 
  ? `${String(metaEnv.VITE_API_URL).replace(/\/$/, '')}/api/v1` 
  : (isLocal ? '/api/v1' : LIVE_BACKEND_URL);

export const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
    'Bypass-Tunnel-Reminder': 'true',
  },
});

apiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  config.headers['Bypass-Tunnel-Reminder'] = 'true';
  return config;
});

const docListCache: { data: any; timestamp: number } = { data: null, timestamp: 0 };
const fullAnalysisCache: Record<string, { data: any; timestamp: number }> = {};

// Warm memory cache on startup from localStorage
try {
  for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i);
    if (key && key.startsWith('cg_analysis_')) {
      const docId = key.replace('cg_analysis_', '');
      const raw = localStorage.getItem(key);
      if (raw) {
        fullAnalysisCache[docId] = { data: JSON.parse(raw), timestamp: Date.now() };
      }
    }
  }
} catch {}

export const api = {
  // Auth
  login: async (email: string, password: string) => {
    const res = await apiClient.post('/auth/login', { email, password });
    return res.data;
  },
  register: async (email: string, password: string, full_name: string, org_name?: string) => {
    const res = await apiClient.post('/auth/register', { email, password, full_name, org_name });
    return res.data;
  },
  getMe: async () => {
    const res = await apiClient.get('/auth/me');
    return res.data;
  },
  updateProfile: async (full_name?: string, org_name?: string) => {
    const res = await apiClient.put('/auth/profile', { full_name, org_name });
    return res.data;
  },

  // Documents
  uploadDocument: async (formData: FormData) => {
    docListCache.data = null;
    const res = await apiClient.post('/documents/upload', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
    return res.data;
  },
  listDocuments: async (search?: string, document_type?: string) => {
    const isDefault = !search && (!document_type || document_type === 'All');
    if (isDefault && docListCache.data && Date.now() - docListCache.timestamp < 45000) {
      // Silently refresh in background
      apiClient.get('/documents').then(r => {
        docListCache.data = r.data;
        docListCache.timestamp = Date.now();
      }).catch(() => {});
      return docListCache.data;
    }

    const params = new URLSearchParams();
    if (search) params.append('search', search);
    if (document_type) params.append('document_type', document_type);
    const res = await apiClient.get(`/documents?${params.toString()}`);
    if (isDefault) {
      docListCache.data = res.data;
      docListCache.timestamp = Date.now();
    }
    return res.data;
  },
  getDocument: async (id: string) => {
    const res = await apiClient.get(`/documents/${id}`);
    return res.data;
  },
  deleteDocument: async (id: string) => {
    docListCache.data = null;
    delete fullAnalysisCache[id];
    const res = await apiClient.delete(`/documents/${id}`);
    return res.data;
  },

  // Analysis
  getFullAnalysis: async (document_id: string) => {
    if (fullAnalysisCache[document_id]) {
      // Background revalidate if older than 5 minutes
      if (Date.now() - fullAnalysisCache[document_id].timestamp > 300000) {
        apiClient.get(`/analysis/${document_id}`).then(r => {
          fullAnalysisCache[document_id] = { data: r.data, timestamp: Date.now() };
          try {
            localStorage.setItem(`cg_analysis_${document_id}`, JSON.stringify(r.data));
            sessionStorage.setItem(`cg_analysis_${document_id}`, JSON.stringify(r.data));
          } catch {}
        }).catch(() => {});
      }
      return fullAnalysisCache[document_id].data;
    }
    const res = await apiClient.get(`/analysis/${document_id}`);
    fullAnalysisCache[document_id] = { data: res.data, timestamp: Date.now() };
    try {
      localStorage.setItem(`cg_analysis_${document_id}`, JSON.stringify(res.data));
      sessionStorage.setItem(`cg_analysis_${document_id}`, JSON.stringify(res.data));
    } catch {}
    return res.data;
  },
  getAllRisks: async (severity?: string) => {
    const url = severity ? `/analysis/risks/all?severity=${severity}` : '/analysis/risks/all';
    const res = await apiClient.get(url);
    return res.data;
  },
  updateRiskStatus: async (risk_id: string, review_status: string) => {
    const res = await apiClient.patch(`/analysis/risks/${risk_id}`, { review_status });
    return res.data;
  },
  getAllClauses: async () => {
    const res = await apiClient.get('/analysis/clauses/all');
    return res.data;
  },
  getAllObligations: async () => {
    const res = await apiClient.get('/analysis/obligations/all');
    return res.data;
  },
  updateObligation: async (id: string, data: any) => {
    const res = await apiClient.patch(`/analysis/obligations/${id}`, data);
    return res.data;
  },

  // Copilot QA
  askCopilot: async (document_id: string, question: string) => {
    const res = await apiClient.post('/copilot/chat', { document_id, question });
    return res.data;
  },

  // Contract Comparison
  compareContracts: async (base_doc_id: string, target_doc_id: string) => {
    const res = await apiClient.post('/compare', { base_doc_id, target_doc_id });
    return res.data;
  },

  // Dashboard Stats & Activity
  getDashboardStats: async () => {
    const res = await apiClient.get('/orgs/stats');
    return res.data;
  },
  getActivity: async () => {
    const res = await apiClient.get('/orgs/activity');
    return res.data;
  },
  
  // Org Members
  getOrgMembers: async () => {
    const res = await apiClient.get('/orgs/members');
    return res.data;
  },
  inviteMember: async (email: string, full_name: string, role: string) => {
    const res = await apiClient.post('/orgs/members/invite', { email, full_name, role });
    return res.data;
  },

  // Workflows
  getWorkflows: async () => {
    const res = await apiClient.get('/workflows');
    return res.data;
  }
};
