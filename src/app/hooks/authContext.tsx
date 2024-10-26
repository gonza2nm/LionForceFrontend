'use client';

import {
  ReactNode,
  createContext,
  useCallback,
  useContext,
  useMemo,
} from 'react';
import Cookies from 'js-cookie';

type AuthTokens = {
  token: string;
  refresh_token: string;
};
export type RolType = { rol: 'admin' | 'instructor' | 'alumno' };

//arreglar el problema del contexto en el rol
export type AuthContextType = {
  login: (authTokens: AuthTokens) => void;
  logout: () => void;
  academyId: number;
  rol: number;
};
export const AuthContext = createContext<AuthContextType | undefined>(
  undefined
);
export default function AuthContextProvider({
  children,
}: {
  children: ReactNode;
}) {
  const rol = 0;
  const academyId = 0;
  const login = useCallback(async function (authTokens: AuthTokens) {
    Cookies.set('authTokens', JSON.stringify(authTokens), {
      expires: 7,
      secure: false,
      sameSite: 'Strict',
      path: '/',
    });
  }, []);

  const logout = useCallback(async function () {
    Cookies.remove('authTokens');
  }, []);

  const value = useMemo(
    () => ({
      login,
      logout,
      academyId,
      rol,
    }),
    [login, logout, academyId, rol]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuthContext() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error(
      'useAuthContext must be used within an AuthContextProvider'
    );
  }
  return context;
}
