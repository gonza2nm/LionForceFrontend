'use client';
import {
  ReactNode,
  createContext,
  useCallback,
  useContext,
  useState,
} from 'react';
import Cookies from 'js-cookie';

type AuthTokens = {
  token: string;
};

export type AuthContextType = {
  login: (authTokens: AuthTokens) => void;
  logout: () => void;
  setToken: (token: string | null) => void;
  token: string | null;
};
export const AuthContext = createContext<AuthContextType | undefined>(
  undefined
);
export default function AuthContextProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [token, setToken] = useState<string | null>(null);

  const login = useCallback(async function (authTokens: AuthTokens) {
    setToken(authTokens.token);
    Cookies.set('authTokens', JSON.stringify(authTokens), {
      secure: false,
      sameSite: 'Lax',
      path: '/',
    });
  }, []);

  const logout = useCallback(async function () {
    setToken(null);
    Cookies.remove('authTokens', { path: '/' });
  }, []);

  return (
    <AuthContext.Provider value={{ login, logout, setToken, token }}>
      {children}
    </AuthContext.Provider>
  );
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
