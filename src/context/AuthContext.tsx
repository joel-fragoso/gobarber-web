import React, { createContext, FunctionComponent, useCallback } from 'react';
import api from '../services/api';

interface SignInCredential {
  email: string;
  password: string;
}

interface AuthContextData {
  name: string;
  signIn(credentials: SignInCredential): Promise<void>;
}

export const AuthContext = createContext<AuthContextData>(
  {} as AuthContextData,
);

export const AuthProvider: FunctionComponent = ({ children }) => {
  const signIn = useCallback(async ({ email, password }) => {
    const response = await api.post('/sessions', {
      email,
      password,
    });

    console.log(response.data);
  }, []);

  return (
    <AuthContext.Provider value={{ name: 'Joel Fragoso', signIn }}>
      {children}
    </AuthContext.Provider>
  );
};
