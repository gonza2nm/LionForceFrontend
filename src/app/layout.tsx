import type { Metadata } from 'next';
import localFont from 'next/font/local';
import './globals.css';
import 'bootstrap/dist/css/bootstrap.min.css';

const geistSans = localFont({
  src: './fonts/GeistVF.woff',
  variable: '--font-geist-sans',
  weight: '100 900',
});
const geistMono = localFont({
  src: './fonts/GeistMonoVF.woff',
  variable: '--font-geist-mono',
  weight: '100 900',
});

export const metadata: Metadata = {
  title: 'Lion Force System',
  description:
    'Sistema de CRM para academias de Taekwondo. Gestiona inscripciones, horarios de clases, seguimiento de estudiantes y comunicación efectiva con padres y alumnos. Optimiza la administración de tu academia y mejora la experiencia de aprendizaje con herramientas personalizadas y fáciles de usar.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        {children}
      </body>
    </html>
  );
}
