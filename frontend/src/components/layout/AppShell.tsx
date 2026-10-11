import React, { useState } from 'react';
import { Header } from './Header';
import { MobileBottomBar } from './MobileBottomBar';
import { UploadModal } from '@/components/documents/UploadModal';

interface AppShellProps {
  user: any;
  onLogout: () => void;
  children: React.ReactNode;
}

export const AppShell: React.FC<AppShellProps> = ({ user, children }) => {
  const [isUploadOpen, setIsUploadOpen] = useState(false);

  return (
    <div className="min-h-screen w-full bg-[#F8FAFC] flex flex-col items-center selection:bg-blue-100 overflow-x-hidden pt-16">
      {/* 100% Hard-Locked Fixed Header Bar at Top Viewport Edge */}
      <div className="fixed top-0 left-0 right-0 z-30 w-full bg-white/95 backdrop-blur-md border-b border-slate-100/90 shadow-[0_2px_12px_rgba(0,0,0,0.03)]">
        <div className="w-full max-w-5xl mx-auto px-3 sm:px-6 md:px-8">
          <Header user={user} onOpenUploadModal={() => setIsUploadOpen(true)} />
        </div>
      </div>

      {/* Responsive App Frame: Main Content Area */}
      <div className="w-full max-w-5xl flex-1 flex flex-col relative px-3 sm:px-6 md:px-8">
        <main className="flex-1 w-full pt-4 pb-28">
          {children}
        </main>

        {/* Navigation Bar: Present across all pages including uploaded contracts page */}
        <MobileBottomBar onOpenUpload={() => setIsUploadOpen(true)} />

        {/* Document Upload Modal */}
        <UploadModal isOpen={isUploadOpen} onClose={() => setIsUploadOpen(false)} />
      </div>
    </div>
  );
};
