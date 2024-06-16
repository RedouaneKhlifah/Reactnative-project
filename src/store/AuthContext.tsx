import AsyncStorage from '@react-native-async-storage/async-storage';
import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from 'react';
import axiosConfig from '../api/axios.config';
import axios from 'axios';
import {UserAuth} from '../interfaces/User';

type AuthContextType = {
  isAuthenticated: boolean;
  isLoading: boolean;
  checkAuthentication: () => Promise<void>;
  checkConfirmation: () => Promise<void>;
  userData: UserAuth | undefined | null;
  handleAuth: (url: string, data: object) => Promise<any>;
  handleLogout: () => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{children: ReactNode}> = ({children}) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [userData, setUserData] = useState<UserAuth | undefined | null>(
    undefined,
  );
  const apiClientWithoutToken = axiosConfig(false);
  const apiClientWithToken = axiosConfig(true);

  useEffect(() => {
    checkAuthentication().finally(() => setIsLoading(false));
    checkConfirmation();
  }, []);

  const checkAuthentication = async () => {
    try {
      const data = await AsyncStorage.getItem('data');
      const token = data && JSON.parse(data).token;
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
      if (data) {
        setUserData(JSON.parse(data).user);
      }
    } catch (error) {
      console.error('Failed to check Confirmation', error);
      setUserData(null);
    }
  };

  const handleAuth = async (url: string, formData: object) => {
    try {
      const response = await apiClientWithoutToken.post(url, formData);
      if (response.data) {
        await AsyncStorage.setItem('data', JSON.stringify(response.data));
        await checkConfirmation();
        return {success: true, data: response.data};
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error.response) {
          return {success: false, data: error.response.data};
        }
      }
      return {success: false, data: error};
    }
  };

  const handleLogout = async () => {
    await AsyncStorage.removeItem('data');
    setIsAuthenticated(false);
    setUserData(null);
  };

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        isLoading,
        checkAuthentication,
        checkConfirmation,
        userData,
        handleAuth,
        handleLogout,
      }}>
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
