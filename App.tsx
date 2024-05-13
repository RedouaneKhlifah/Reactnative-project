// Ignore warning related to react-native-date-picker
declare const global: {
  ignoreDatePickerWarning: boolean;
};
global.ignoreDatePickerWarning = true;

import React from 'react';
import {SafeAreaView, StyleSheet, View} from 'react-native';
import RoleSelectionScreen from './src/screen/RoleSelectionScreen';
import ProfileScreen from './src/screen/ProfileScreen';
import Home from './src/screen/Home';
import CategorySection from './src/screen/CategorySection';
import AnnouncePage from './src/screen/AnnouncePage';
import LoginScreen from './src/screen/auth screens/LoginScreen';
import SignupScreen from './src/screen/auth screens/SignupScreen';
import Profile from "./src/screen/influencer/Profile";
import RedirectMail from './src/screen/auth screens/RedirectMail';
import ContactMail from './src/screen/mail/ContactMail';

function App(): React.JSX.Element {
  return (
    <SafeAreaView>
        <ProfileScreen/>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
});

export default App;
