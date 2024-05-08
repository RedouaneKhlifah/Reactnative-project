import {View, Text, ImageBackground, StyleSheet} from 'react-native';
import React from 'react';
import {Images, appTheme} from '../constants';
import NavbarHeader from '../components/welcom/NavbarHeader';
import LoginSection from '../components/welcom/LoginSection';

const {SIZES} = appTheme;

const WelcomeScreen = () => {
  return (
    <ImageBackground
      source={Images.yellowBackground}
      resizeMode="cover"
      style={{height: SIZES.height, backgroundColor: 'red'}}>
      <View style={styles.navbarContainer}>
        <NavbarHeader />
      </View>
      <View style={styles.LoginSectionContainer}>
        <LoginSection />
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  navbarContainer: {
    flex: 1,
  },
  LoginSectionContainer: {
    flex: 5,
  },
});

export default WelcomeScreen;
