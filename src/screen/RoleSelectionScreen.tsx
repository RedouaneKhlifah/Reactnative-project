import React from 'react';
import OptionBox from '../components/roleSelection/OptionBox';
import {appTheme} from '../constants';
import {
  StyleSheet,
  View,
  ImageBackground,
} from 'react-native';
import {Images} from '../constants';
import {responsiveHeight} from '../utils/responsive';

const {SIZES} = appTheme;
function RoleSelectionScreen() {
  const influencerBox = {id:'',title:"Influencer",action:"Obtenez des collaborations Win Win",urlPic:"",link:"Login" as keyof RootStackParamList }
  const entrepriseBox = {id:'',title:"Propriétaire d'entreprise",action:"Créez votre compte Win Win",urlPic:"",link:"Signup" as keyof RootStackParamList }
  return (
    <ImageBackground
      source={Images.whiteBackground}
      resizeMode="cover"
      style={style.background}>
      <View style={style.container}>
        <OptionBox {...influencerBox}/>
        <OptionBox {...entrepriseBox} />
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
