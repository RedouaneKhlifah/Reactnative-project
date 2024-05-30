import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';

type AuthContextType = {
  isAuthenticated: boolean;
  checkAuthentication: () => Promise<void>;

  isConfirmed: boolean;
  checkConfirmation: () => Promise<void>;

};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState< boolean>(false);
  const [isConfirmed, setIsConfirmed] = useState< boolean>(false);
  const checkAuthentication = async () => {
    try {
      const data = await AsyncStorage.getItem('data');
      const token = data && JSON.parse(data).token
      if (token) {
        setIsAuthenticated(false);
      } else {
        setIsAuthenticated(false);
      }
    } catch (error) {
      console.error('Failed to check authentication', error);
      setIsAuthenticated(false);
    }
  };  
  
  const checkConfirmation = async () => {
    try {
      const data = await AsyncStorage.getItem('data');
      setIsConfirmed(data && JSON.parse(data).user.confirmed)
      
    } catch (error) {
      console.error('Failed to check Confirmation', error);
      setIsConfirmed(false);
    }
  };

  useEffect(() => {
    checkAuthentication();
    checkConfirmation();
  }, []);

  return (
    <AuthContext.Provider value={{ isAuthenticated,checkAuthentication,isConfirmed,checkConfirmation }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
