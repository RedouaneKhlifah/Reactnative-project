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
  // const [currentRoute, setCurrentRoute] = useState<string | undefined>(undefined);
  // const [previousRoute, setPreviousRoute] = useState<string | undefined>(undefined);

  // useEffect(() => {
  //   setCurrentRoute(navigationRef.current?.getCurrentRoute()?.name) 
  //   const unsubscribe = navigationRef.current?.addListener(
  //     'state',
  //     (e) => {
  //       const state = e.data.state
  //       if (state && state.index !== undefined) {
  //         const currentRouteName = state.routes[state.index]?.name;
  //         setCurrentRoute(currentRouteName);
  //         setPreviousRoute(currentRoute);
  //       }
  //     }
  //   );

  //   return () => {
  //     if (unsubscribe) unsubscribe();
  //   };
  // }, [navigationRef, currentRoute]);

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
