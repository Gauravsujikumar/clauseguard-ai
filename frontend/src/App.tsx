import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import { AppShell } from '@/components/layout/AppShell';
import { LandingPage } from '@/pages/LandingPage';
import { LoginPage } from '@/pages/LoginPage';
import { AuthPage } from '@/pages/AuthPage';
import { DashboardPage } from '@/pages/DashboardPage';
import { DocumentsPage } from '@/pages/DocumentsPage';
import { AnalysisPage } from '@/pages/AnalysisPage';
import { RiskCenterPage } from '@/pages/RiskCenterPage';
import { ClauseLibraryPage } from '@/pages/ClauseLibraryPage';
import { CompareContractsPage } from '@/pages/CompareContractsPage';
import { ObligationsPage } from '@/pages/ObligationsPage';
import { CalendarPage } from '@/pages/CalendarPage';
import { WorkflowsPage } from '@/pages/WorkflowsPage';
import { ReportsPage } from '@/pages/ReportsPage';
import { CopilotPage } from '@/pages/CopilotPage';
import { KnowledgeBasePage } from '@/pages/KnowledgeBasePage';
import { TeamPage } from '@/pages/TeamPage';
import { SettingsPage } from '@/pages/SettingsPage';
import { InsightsPage } from '@/pages/InsightsPage';

import { api } from '@/lib/api';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: 1,
    },
  },
});

const LogoSplashScreen: React.FC = () => {
  return (
    <div className="fixed inset-0 z-[9999] bg-white flex items-center justify-center p-6 select-none animate-in fade-in duration-300">
      <div className="flex items-center justify-center w-full max-w-xl px-4">
        <img
          src="/assets/logo.png"
          alt="ClauseGuard AI"
          className="w-[90vw] max-w-[560px] h-auto max-h-56 object-contain block mx-auto"
        />
      </div>
    </div>
  );
};

export const App: React.FC = () => {
  const [showSplash, setShowSplash] = useState(true);
  const [user, setUser] = useState<any>(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      try {
        return JSON.parse(storedUser);
      } catch {}
    }
    const token = localStorage.getItem('token');
    return token ? { id: 'user', full_name: 'User', role: 'Member', email: '' } : null;
  });

  React.useEffect(() => {
    const timer = setTimeout(() => {
      setShowSplash(false);
    }, 350);
    return () => clearTimeout(timer);
  }, []);

  React.useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      api.getMe()
        .then((userData) => {
          setUser(userData);
          localStorage.setItem('user', JSON.stringify(userData));
        })
        .catch((err) => {
          if (err?.response?.status === 401 || err?.response?.status === 403) {
            localStorage.removeItem('token');
            localStorage.removeItem('user');
            setUser(null);
          }
        });
    }
  }, []);

  const handleLoginSuccess = (token: string, userData: any) => {
    localStorage.setItem('token', token);
    localStorage.setItem('user', JSON.stringify(userData));
    setUser(userData);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setUser(null);
  };

  if (showSplash) {
    return <LogoSplashScreen />;
  }

  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <Routes>
          {/* Default Route: Logo Splash Screen -> Login Page */}
          <Route path="/" element={<LoginPage onLoginSuccess={handleLoginSuccess} />} />
          <Route path="/login" element={<LoginPage onLoginSuccess={handleLoginSuccess} />} />
          <Route path="/register" element={<AuthPage onLoginSuccess={handleLoginSuccess} initialMode="signup" />} />
          <Route path="/signin" element={<AuthPage onLoginSuccess={handleLoginSuccess} initialMode="signin" />} />

          {/* Protected Application Routes */}
          <Route
            path="/app/*"
            element={
              user ? (
                <AppShell user={user} onLogout={handleLogout}>
                  <Routes>
                    <Route path="dashboard" element={<DashboardPage />} />
                    <Route path="documents" element={<DocumentsPage />} />
                    <Route path="insights" element={<InsightsPage />} />
                    <Route path="analysis" element={<AnalysisPage />} />
                    <Route path="risks" element={<RiskCenterPage />} />
                    <Route path="clauses" element={<ClauseLibraryPage />} />
                    <Route path="compare" element={<CompareContractsPage />} />
                    <Route path="obligations" element={<ObligationsPage />} />
                    <Route path="calendar" element={<CalendarPage />} />
                    <Route path="workflows" element={<WorkflowsPage />} />
                    <Route path="reports" element={<ReportsPage />} />
                    <Route path="copilot" element={<CopilotPage />} />
                    <Route path="knowledge" element={<KnowledgeBasePage />} />
                    <Route path="team" element={<TeamPage />} />
                    <Route path="settings" element={<SettingsPage />} />
                    <Route path="*" element={<Navigate to="dashboard" replace />} />
                  </Routes>
                </AppShell>
              ) : (
                <Navigate to="/login" replace />
              )
            }
          />

          <Route path="*" element={<Navigate to="/login" replace />} />
        </Routes>
      </Router>
    </QueryClientProvider>
  );
};
