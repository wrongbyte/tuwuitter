import { createContext, useContext, ReactNode, useState, useEffect } from 'react';
import jwt_decode from 'jwt-decode';

export interface UserContext {
  isLoggedIn: boolean;
  loginUser: (userData: any) => void;
}

const AuthContext = createContext<UserContext | null>(null);

export function useAuth(): UserContext {
  return useContext(AuthContext) as UserContext;
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const storagedToken = localStorage.getItem('ACCESS_TOKEN');

    if (storagedToken) {
      const userToken: { sub: string; iat: number; exp: number } = jwt_decode(storagedToken);
      const tokenExpirationDate = userToken.exp;
      let currentDate = new Date();
      if (tokenExpirationDate * 1000 < currentDate.getTime()) {
        localStorage.removeItem('ACCESS_TOKEN');
      } else {
        setIsLoggedIn(true);
      }
    }
  }, []);

  const loginUser = (token?: string) => {
    if (!token) {
      localStorage.removeItem('ACCESS_TOKEN');
    } else {
      localStorage.setItem('ACCESS_TOKEN', token);
    }
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, loginUser } as UserContext}>
      {children}
    </AuthContext.Provider>
  );
}
