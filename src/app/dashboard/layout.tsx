'use client';
import { ReactNode } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import AuthContextProvider from '../hooks/authContext.tsx';

export default function DashboardLayout({ children }: { children: ReactNode }) {
  return (
    <div>
      <AuthContextProvider>{children}</AuthContextProvider>
    </div>
  );
}
