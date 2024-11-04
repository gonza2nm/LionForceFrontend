'use client';
import Link from 'next/link';

export default function ForgotPassword() {
  return (
    <div>
      <div>Olvide mi contraseña</div>
      <Link href="/">ir al Login</Link>
      <h1> ENTRE MEDIO </h1>
      <Link href="/dashboard/alumnos">ir al dashboard</Link>
    </div>
  );
}
