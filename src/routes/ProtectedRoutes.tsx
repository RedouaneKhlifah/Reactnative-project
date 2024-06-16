import React, {ReactNode, useEffect, useState} from 'react';
import {useAuth} from '../store/AuthContext';
import {useNavigationRef} from '../store/NavigationContext';
import {View, ActivityIndicator} from 'react-native';

type ProtectedRouteProps = {
  children: ReactNode;
};

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({children}) => {
  const navigationRef = useNavigationRef();
  const {userData, isLoading} = useAuth();
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
    if (isNavigationReady && userData !== undefined) {
      handleNavigation(userData);
    }
  }, [userData, isNavigationReady]);

  const handleNavigation = (userData: any) => {
    if (!userData) {
      navigationRef.current?.navigate('ContactMail');
    } else if (userData.confirmed === false) {
      navigationRef.current?.navigate('RedirectMail');
    } else if (userData.confirmed === true && userData.completed === false) {
      if (userData.role === 'influencer') {
        navigationRef.current?.navigate('ProfileScreen');
      } else if (userData.role === 'business') {
        navigationRef.current?.navigate('BusinessDetails');
      }
    } else if (
      userData.confirmed === true &&
      userData.status !== 'approved' &&
      userData.completed === true
    ) {
      navigationRef.current?.navigate('Verification');
    } else if (
      userData.status === 'approved' &&
      userData.confirmed === true &&
      userData.completed === true
    ) {
      navigationRef.current?.navigate('Home');
    }
  };

  if (!isNavigationReady || isLoading || userData === undefined) {
    return (
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return <>{children}</>;
};

export default ProtectedRoute;
