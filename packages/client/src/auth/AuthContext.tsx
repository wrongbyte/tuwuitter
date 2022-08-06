import { createContext, useContext, ReactNode, useState, useEffect } from 'react';

export interface User {
  username: string;
  displayName: string;
  email: string;
}

export interface UserContext {
  user: User;
  loginUser: (userData: any) => void;
}

const AuthContext = createContext<UserContext | null>(null);

export function useAuth(): UserContext {
  return useContext(AuthContext) as UserContext;
}

//TODO: error handling
export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);

  function loginUser(userData: any) {
    localStorage.setItem('user', JSON.stringify(userData));
  }

  useEffect(() => {
    const storagedUser = localStorage.getItem('user');
    const storagedToken = localStorage.getItem('ACCESS_TOKEN');

    if (storagedUser && storagedToken) {
      setUser(JSON.parse(storagedUser));
    }
  }, []);

  return (
    <AuthContext.Provider value={{ user, loginUser } as UserContext}>
      {children}
    </AuthContext.Provider>
  );
}
