'use client';
import { ReactNode } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import AuthContextProvider from '../hooks/authContext.tsx';
import NavBar from '../components/NavBar.tsx';

export default function DashboardLayout({ children }: { children: ReactNode }) {
  return (
    <div>
      <AuthContextProvider>
        <NavBar>{children}</NavBar>
      </AuthContextProvider>
    </div>
  );
}
