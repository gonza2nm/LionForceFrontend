import { NextResponse, type NextRequest } from 'next/server';
import { JWTPayload, jwtVerify } from 'jose';

interface CustomJWTPayload extends JWTPayload {
  sub: string;
  name: string;
  role: string;
  jti: string;
  nbf: number;
  exp: number;
  iat: number;
  iss: string;
  aud: string;
}

export async function middleware(req: NextRequest) {
  const authToken = req.cookies.get('authTokens');
  const token = authToken?.value ? JSON.parse(authToken.value).token : null;
  const isLoginPage = req.nextUrl.pathname === '/';
  const isDashboardPage = req.nextUrl.pathname.startsWith('/dashboard');
  const secretKey = process.env.NEXT_PUBLIC_JWT_SECRET;

  if (isDashboardPage && !token) {
    return NextResponse.redirect(new URL('/', req.url));
  }
  if (token) {
    try {
      if (!secretKey) {
        return NextResponse.redirect(new URL('/', req.url));
      }
      /*as { payload: CustomJWTPayload }*/
      const { payload } = (await jwtVerify(
        token,
        new TextEncoder().encode(secretKey)
      )) as { payload: CustomJWTPayload };

      if (isLoginPage) {
        return NextResponse.redirect(new URL('/dashboard', req.url));
      }
      if (
        isDashboardPage &&
        !['Instructor', 'Supervisor', 'Admin'].includes(payload.role)
      ) {
        req.cookies.clear();
        const response = NextResponse.redirect(
          new URL('/unauthorized', req.url)
        );
        response.cookies.set('authTokens', '', { expires: new Date(0) });
        return response;
      }
      return NextResponse.next();
    } catch {
      if (!isLoginPage) {
        return NextResponse.redirect(new URL('/', req.url));
      }
      return NextResponse.next();
    }
  }
  if (isLoginPage) {
    return NextResponse.next();
  }
  return NextResponse.redirect(new URL('/', req.url));
}

export const config = {
  matcher: ['/dashboard/:path*', '/'],
};
