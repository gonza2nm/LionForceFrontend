'use client';
import { useEffect } from 'react';
import { useAuthContext } from '../hooks/authContext.tsx';

export default function Dashboard() {
  const { academyId, rol } = useAuthContext();
  useEffect(() => {}, [academyId, rol]);
  return (
    <main>
      <h1>Dashboard</h1>
    </main>
  );
}
