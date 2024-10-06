import React from 'react';
import OptionBox from '../components/roleSelection/OptionBox';
import {appTheme} from '../constants';
import {StyleSheet, View, ImageBackground} from 'react-native';
import {Images} from '../constants';
import {responsiveHeight} from '../utils/responsive';

const {SIZES} = appTheme;
function RoleSelectionScreen() {
  return (
    <ImageBackground
      source={Images.whiteBackground}
      resizeMode="cover"
      style={style.background}>
      <View style={style.container}>
        <OptionBox
          title="Influenceur"
          action="Obtenez des collaborations Win Win"
          urlPic={Images.InfluencerRoleSelect}
          link="Login"
          id={0}
        />
        <OptionBox
          title="Propriétaire d'entreprise"
          action="Créez votre compte Win Win"
          urlPic={Images.businessRoleSelect}
          link="Login"
          id={0}
        />
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
