// Ignore warning related to react-native-date-picker
declare const global: {
  ignoreDatePickerWarning: boolean;
};
global.ignoreDatePickerWarning = true;

import React, {useEffect} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {AuthProvider} from './src/store/AuthContext';
import {
  NavigationProvider,
  useNavigationRef,
} from './src/store/NavigationContext';
import {NavigationRoute} from './src/routes/NavigationRoute';
import {LogBox} from 'react-native';
const App: React.FC = () => {
  useEffect(() => {
    LogBox.ignoreAllLogs(true); // Ignore all log notifications
  }, []);
  return (
    <AuthProvider>
      <NavigationProvider>
        <NavigationWrapper />
      </NavigationProvider>
    </AuthProvider>
  );
};

const NavigationWrapper: React.FC = () => {
  const navigationRef = useNavigationRef();
  return (
    <NavigationContainer ref={navigationRef}>
      <NavigationRoute />
    </NavigationContainer>
  );
};
export default App;
