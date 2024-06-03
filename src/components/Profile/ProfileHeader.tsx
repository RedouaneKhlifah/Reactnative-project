import {View, Text, StyleSheet, ImageBackground, Pressable} from 'react-native';
import React from 'react';
import {COLORS, FONTS, Icons, Images, SIZES} from '../../constants';
import {responsiveWidth} from '../../utils/responsive';
import BackButton from '../ui/buttons/BackButton';

const ProfileHeader = () => {
  return (
    <ImageBackground
      source={Images.yellowBackground}
      resizeMode="cover"
      style={styles.container}>
      <View style={styles.innerContainer}>
        <BackButton/>
        <Text style={styles.text}>Détails de profile</Text>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    height: ' 100%',
    justifyContent: 'center',
    alignItems: 'center',
  },

  innerContainer: {
    width: '90%',
    justifyContent: 'center',
    height: '29%',
  },
  pressableContainer: {
    height: '100%',
    flex: 1,
  },
  icon: {
    position: 'absolute',
  },
  textConatiner: {
    backgroundColor: COLORS.white,
    justifyContent: 'center',
    height: '100%',
    borderRadius: SIZES.fullRadius,
  },
  text: {
    ...FONTS.h3,
    fontSize: responsiveWidth(23),
    color: COLORS.white,
    textAlign: 'center',
    alignSelf: 'center',
  },
});

export default ProfileHeader;
