// Ignore warning related to react-native-date-picker
declare const global: {
  ignoreDatePickerWarning: boolean;
};
global.ignoreDatePickerWarning = true;

import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {AuthProvider} from './src/store/AuthContext';
import {
  NavigationProvider,
  useNavigationRef,
} from './src/store/NavigationContext';
import {NavigationRoute} from './src/routes/NavigationRoute';
const App: React.FC = () => {
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
