// ProtectedRoute.js
import React, {ReactNode, useEffect, useState} from 'react';
import {useAuth} from '../store/AuthContext';
import {useNavigationRef} from '../store/NavigationContext';
import {View, ActivityIndicator} from 'react-native';

type ProtectedRouteProps = {
  children: ReactNode;
};

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({children}) => {
  const navigationRef = useNavigationRef();
  const {userData} = useAuth();
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
      // no user lnot logged in
      if (!userData) {
        navigationRef.current?.navigate('ContactMail');
      }

      // user logged in but not confirmed by email code
      else if (userData.confirmed === false) {
        navigationRef.current?.navigate('RedirectMail');
      }

      // user logged in and confirmed by email code but not verified by admin
      else if (userData.confirmed === true && userData.status == 'pending') {
        navigationRef.current?.navigate('Verification');
      }

      // user logged in and confirmed by email code and verified by admin
      else if (userData.status === 'verified' && userData.confirmed === true) {
        navigationRef.current?.navigate('Home');
      }
    }
  }, [userData, navigationRef, isNavigationReady]);

  if (!isNavigationReady) {
    return (
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return <>{children}</>;
};

export default ProtectedRoute;
