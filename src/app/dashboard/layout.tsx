'use client';
import { ReactNode, Suspense } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import AuthContextProvider from '../hooks/AuthContext.tsx';
import { UserProvider } from '../hooks/UserContext.tsx';
import DashboardPage from '../components/DashboardPage.tsx';
import Loading from './loading.tsx';

export default function DashboardLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <Suspense fallback={<Loading />}>
        <AuthContextProvider>
          <UserProvider>
            <DashboardPage>{children}</DashboardPage>
          </UserProvider>
        </AuthContextProvider>
      </Suspense>
    </>
  );
}
