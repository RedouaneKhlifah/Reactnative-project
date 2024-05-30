// NavigationContext.tsx
import React, { createContext, useContext, useRef, ReactNode } from 'react';
import { NavigationContainerRef } from '@react-navigation/native';

type NavigationContextType = {
  navigationRef: React.RefObject<NavigationContainerRef<RootStackParamList>>;
};

const NavigationContext = createContext<NavigationContextType | undefined>(undefined);

export const NavigationProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const navigationRef = useRef<NavigationContainerRef<RootStackParamList>>(null);

  return (
    <NavigationContext.Provider value={{ navigationRef }}>
      {children}
    </NavigationContext.Provider>
  );
};

export const useNavigationRef = () => {
  const context = useContext(NavigationContext);
  if (!context) {
    throw new Error('useNavigationRef must be used within a NavigationProvider');
  }
  return context.navigationRef;
};
