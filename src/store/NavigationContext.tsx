// NavigationContext.tsx
import React, { createContext, useContext, useRef, ReactNode, useState, useEffect } from 'react';
import { NavigationContainerRef } from '@react-navigation/native';

type NavigationContextType = {
  navigationRef: React.RefObject<NavigationContainerRef<RootStackParamList>>;
  // currentRoute: string | undefined;
  // previousRoute: string | undefined;
  goBack: () => void;
};

const NavigationContext = createContext<NavigationContextType | undefined>(undefined);

export const NavigationProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const navigationRef = useRef<NavigationContainerRef<RootStackParamList>>(null);

  const goBack = () => {
    if (navigationRef.current?.canGoBack()) {
      navigationRef.current.goBack();
    }
  };

  return (
    <NavigationContext.Provider value={{ navigationRef, goBack }}>
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

export const useNavigationContext = () => {
  const context = useContext(NavigationContext);
  if (!context) {
    throw new Error('useNavigationContext must be used within a NavigationProvider');
  }
  return context;
};
