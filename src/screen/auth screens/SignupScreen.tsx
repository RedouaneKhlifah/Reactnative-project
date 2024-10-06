import {View, Text, ImageBackground, StyleSheet} from 'react-native';
import React from 'react';
import {Images, appTheme} from '../../constants';
import NavbarHeader from '../../components/welcom/NavbarHeader';
import AuthSection from '../../components/welcom/AuthSection';

const {SIZES} = appTheme;

enum AuthType {
  SignUp = 'SIGN_UP',
  Login = 'LOGIN',
}
const WelcomeScreen = () => {
  return (
    <ImageBackground
      source={Images.yellowBackground}
      resizeMode="cover"
      style={{height: SIZES.height}}>
      <View style={styles.navbarContainer}>
        <NavbarHeader title="Connecter" />
      </View>
      <View style={styles.LoginSectionContainer}>
        <AuthSection type={AuthType.SignUp} />
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
