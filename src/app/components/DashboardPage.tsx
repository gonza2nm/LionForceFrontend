import { ReactNode, useEffect, useState } from 'react';
import NavBar from './NavBar.tsx';
import { useUser } from '../hooks/UserContext.tsx';
import Cookies from 'js-cookie';

export default function DashboardPage({ children }: { children: ReactNode }) {
  const { setUser } = useUser();
  const [name, setName] = useState('Usuario');
  const [dni, setDni] = useState('');

  useEffect(() => {
    const tokenObject = Cookies.get('authTokens');
    if (tokenObject) {
      const parsedToken = JSON.parse(tokenObject);
      const token = parsedToken.token;
      const decodedToken = JSON.parse(atob(token.split('.')[1]));
      const userData = {
        dni: decodedToken.sub,
        name: decodedToken.name,
        rol: decodedToken.role,
      };
      setUser(userData);
      setName(userData.name);
      setDni(userData.dni);
    }
  }, []);
  return (
    <NavBar name={name} dni={dni}>
      {children}
    </NavBar>
  );
}
