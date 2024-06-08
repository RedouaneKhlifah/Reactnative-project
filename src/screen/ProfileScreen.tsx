import {View, Text, ImageBackground, StyleSheet} from 'react-native';
import React from 'react';
import {Images, appTheme} from '../constants';
import NavbarHeader from '../components/welcom/NavbarHeader';
import LoginSection from '../components/welcom/AuthSection';
import ProfileBody from '../components/Profile/ProfileBody';
import ProfileHeader from '../components/Profile/ProfileHeader';

const {COLORS, SIZES, FONTS} = appTheme;

const ProfileScreen = () => {
  return (
    <View style={{height: SIZES.height}}>
      <View style={styles.header}>
        <ProfileHeader />
      </View>

      <View style={styles.body}>
        <ProfileBody />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    flex: 1,
    backgroundColor: 'yellow',
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    overflow: 'hidden',
  },
  body: {
    width: '100%',
    alignItems: 'center',
    flex: 5,
    backgroundColor: COLORS.white,
  },
});

export default ProfileScreen;
