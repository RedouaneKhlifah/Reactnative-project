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

const {COLORS, SIZES, FONTS} = appTheme;
function RoleSelectionScreen() {
  return (
    <ImageBackground
      source={Images.whiteBackground}
      resizeMode="cover"
      style={style.background}>
      <View style={style.container}>
        <View style={style.inContainer}>
          <Text
            style={{
              ...FONTS.semiLargeTitle,
              textAlign: 'center',
              paddingBottom: 20,
              color: COLORS.black,
            }}>
            Vous êtes ?
          </Text>
          <View style={style.OptionBox}>
            <OptionBox />
            <Text
              style={{
                ...FONTS.semiLargeTitle,
                textAlign: 'center',
                color: COLORS.black,
              }}>
              Ou
            </Text>

            <OptionBox />
          </View>
        </View>
      </View>
    </ImageBackground>
  );
}

const style = StyleSheet.create({
  container: {
    marginTop: SIZES.height * 0.01,
    alignItems: 'center',
    height: SIZES.height,
  },
  background: {
    width: SIZES.width,
    height: SIZES.height,
  },
  inContainer: {
    height: SIZES.height * 0.9,
    width: '70%',
    justifyContent: 'center',
  },
  OptionBox: {
    flex: 1,
    gap: 5,
  },
});
export default RoleSelectionScreen;
