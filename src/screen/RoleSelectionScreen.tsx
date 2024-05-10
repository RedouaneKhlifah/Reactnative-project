import React from 'react';
import OptionBox from '../components/roleSelection/OptionBox';
import {appTheme} from '../constants';
import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  ImageBackground,
} from 'react-native';
import {Images} from '../constants';
import {responsiveHeight} from '../utils/responsive';

const {COLORS, SIZES, FONTS} = appTheme;
function RoleSelectionScreen() {
  return (
    <ImageBackground
      source={Images.whiteBackground}
      resizeMode="cover"
      style={style.background}>
      <View style={style.container}>
        <OptionBox />
        <OptionBox />
      </View>
    </ImageBackground>
  );
}

const style = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'space-between',
    alignSelf: 'center',
    height: responsiveHeight(643),
  },

  background: {
    width: SIZES.width,
    height: SIZES.height,
    justifyContent: 'center',
  },
});
export default RoleSelectionScreen;
