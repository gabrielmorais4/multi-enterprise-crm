
import React from 'react';
import Sidebar from './Sidebar';
import { Toaster } from 'sonner';

interface MainLayoutProps {
  children: React.ReactNode;
}

const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar />
      <main className="flex-1">
        <div className="p-8">{children}</div>
      </main>
      <Toaster position="top-right" />
    </div>
  );
};

export default MainLayout;
