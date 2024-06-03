import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import axiosConfig from '../api/axios.config';
import axios from 'axios';

type AuthContextType = {
  isAuthenticated: boolean;
  checkAuthentication: () => Promise<void>;

  isConfirmed: boolean;
  checkConfirmation: () => Promise<void>;

  userData :UserAuth | null;
  handleAuth :(url:string,data:object)=> Promise<any>
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [isConfirmed, setIsConfirmed] = useState< boolean>(false);
  const [userData, setUserData] = useState<UserAuth | null>(null);
  const apiClientWithoutToken = axiosConfig(false);

  
  useEffect(() => {
    checkAuthentication();
    checkConfirmation();
  }, []);

  const checkAuthentication = async () => {
    const data = await AsyncStorage.getItem('data');
    try {
      const token = data && JSON.parse(data).token
      if (token) {
        setIsAuthenticated(true);
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
      setUserData(data && JSON.parse(data).user)
    } catch (error) {
      console.error('Failed to check Confirmation', error);
      setIsConfirmed(false);
    }
  };

  const handleAuth = async (url:string, formData:object) => {  
    console.log(url);
    
    try {
        const response = await apiClientWithoutToken.post(url, formData);
        if (response.data) {
            await AsyncStorage.setItem('data', JSON.stringify(response.data));
            checkAuthentication();
            return { success: true, data: response.data };
        }
    } catch (error) {
        if (axios.isAxiosError(error)) {            
            // Axios error handling
            if (error.response) {
                return { success: false, data: error.response.data };
            }
        }
        return { success: false, data: error };
    }
};


  return (
    <AuthContext.Provider value={{ isAuthenticated,checkAuthentication,isConfirmed,checkConfirmation,userData,handleAuth }}>
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
