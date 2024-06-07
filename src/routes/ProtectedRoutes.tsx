// ProtectedRoute.js
import React, { ReactNode, useEffect, useState } from 'react';
import { useAuth } from '../store/AuthContext';
import { useNavigationRef } from '../store/NavigationContext';
import { View, ActivityIndicator } from 'react-native';

type ProtectedRouteProps = {
    children: ReactNode;
  };

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
    const navigationRef = useNavigationRef();
    const { userData } = useAuth();
    const [isNavigationReady, setIsNavigationReady] = useState(false);
    useEffect(() => {
        const checkNavigation = () => {
            if (navigationRef.current && navigationRef.current.isReady()) {
                setIsNavigationReady(true);
            }
        };

        const interval = setInterval(checkNavigation, 100);

        return () => clearInterval(interval);
    }, [navigationRef]);
    

  useEffect(() => {
    if (isNavigationReady) {        
        if (!userData) {
            navigationRef.current?.navigate('ContactMail')
        } 
        else if (userData.confirmed === "false") {
            navigationRef.current?.navigate('RedirectMail')

        } 
        else if (userData.confirmed === "true" && userData.status !== 'verified'){
            navigationRef.current?.navigate('Verification')
        }
        else if (userData.status === 'verified' && userData.confirmed === "true") {
            navigationRef.current?.navigate('Home')
        } 
        else if (userData.status !== 'verified') {
            console.log("in verification");
    
            navigationRef.current?.navigate('Verification')
        } 
        else if (userData.role === 'business') {
            navigationRef.current?.navigate('BusinessProfile')
            
        } 
        else if (userData.role === 'influencer') {
            navigationRef.current?.navigate('Profile')
        }
    }
  }, [userData, navigationRef,isNavigationReady]);

    if (!isNavigationReady) {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <ActivityIndicator size="large" />
            </View>
        );
    }

    return <>{children}</>;
};

export default ProtectedRoute;
