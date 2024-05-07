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


function App(): React.JSX.Element {

  return (
    <SafeAreaView>

        <Home/>


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
