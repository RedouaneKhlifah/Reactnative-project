import React from 'react';
import OptionBox from '../components/roleSelection/OptionBox';
import {appTheme} from '../constants';
import {StyleSheet, View, ImageBackground} from 'react-native';
import {Images} from '../constants';
import {responsiveHeight} from '../utils/responsive';

const {SIZES} = appTheme;
function RoleSelectionScreen() {
  const data = [
    {
      title: 'Influenceur',
      action: 'Obtenez des collaborations Win Win',
      link: 'Login' as keyof RootStackParamList,
      urlPic: Images.InfluencerRoleSelect,
    },
    {
      title: "Propriétaire d'entreprise",
      action: 'Créez votre compte Win Win',
      link: 'Login' as keyof RootStackParamList,
      urlPic: Images.businessRoleSelect,
    },
  ];
  return (
    <ImageBackground
      source={Images.whiteBackground}
      resizeMode="cover"
      style={style.background}>
      <View style={style.container}>
        {data.map((item, index) => (
          <OptionBox
            key={index}
            title={item.title}
            action={item.action}
            urlPic={item.urlPic}
            link={item.link}
          />
        ))}
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
