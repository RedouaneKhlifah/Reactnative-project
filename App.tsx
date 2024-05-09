import React from 'react';
import {
  SafeAreaView,
  StyleSheet,

  View,
} from 'react-native';
import RoleSelectionScreen from './src/screen/RoleSelectionScreen';
import WelcomeScreen from './src/screen/WelcomeScreen';
import ProfileScreen from './src/screen/ProfileScreen';
import Home from './src/screen/Home';
import Profile from "./src/screen/influencer/Profile";

function App(): React.JSX.Element {

  return (
    <SafeAreaView>

        <Profile/>


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
