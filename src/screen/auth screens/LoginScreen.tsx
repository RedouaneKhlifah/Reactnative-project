import {
  View,
  Text,
  ImageBackground,
  StyleSheet,
  ScrollView,
} from 'react-native';
import React from 'react';
import {Images, appTheme} from '../../constants';
import NavbarHeader from '../../components/welcom/NavbarHeader';
import AuthSection from '../../components/welcom/AuthSection';

const {SIZES} = appTheme;

export enum AuthType {
  SignUp = 'SIGN_UP',
  Login = 'LOGIN',
}

const LoginScreen = () => {
  return (
    <ImageBackground
      source={Images.yellowBackground}
      resizeMode="cover"
      style={{height: SIZES.height, flex: 1}}>
      <View style={styles.navbarContainer}>
        <NavbarHeader title="Login" />
      </View>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <AuthSection type={AuthType.Login} />
      </ScrollView>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  navbarContainer: {
    flex: 1,
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: 'center',
  },
  loginSectionContainer: {
    flex: 5,
  },
});

export default LoginScreen;
