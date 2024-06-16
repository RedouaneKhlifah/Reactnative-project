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
        <View style={{position: 'absolute', top: 0}}>
          <BackButton />
        </View>
        <Text style={styles.text}>Détails de profile</Text>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    height: ' 100%',
    alignItems: 'center',
    justifyContent: 'center',
  },

  innerContainer: {
    width: '90%',
    justifyContent: 'center',
  },
  pressableContainer: {
    height: '100%',
    flex: 1,
  },
  icon: {
    position: 'absolute',
    paddingTop: 10,
  },
  textConatiner: {
    backgroundColor: COLORS.white,
    borderRadius: SIZES.fullRadius,
  },
  text: {
    ...FONTS.h1,
    fontSize: responsiveWidth(23),
    fontWeight: '900',
    color: COLORS.white,
    textAlign: 'center',
    alignSelf: 'center',
  },
});

export default ProfileHeader;
