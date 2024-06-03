import React from 'react';
import {View, Text, StyleSheet, ImageBackground, Pressable} from 'react-native';
import {FONTS, Images, SIZES} from '../../constants';
import {responsiveHeight, responsiveWidth} from '../../utils/responsive';
import RnIcon from '../../components/ui/RnIcon';
import { useNavigationRef } from '../../store/NavigationContext';

const ContactMail = () => {
  const navigationRef = useNavigationRef();

  return (
    <ImageBackground source={Images.imgwithGrad} style={styles.background}>
      <View style={styles.container}>
        <View
          style={{
            paddingHorizontal: responsiveWidth(15),
            paddingVertical: responsiveHeight(51),
          }}>
          <Text
            style={{
              color: 'white',
              fontSize: 60,
              fontFamily: FONTS.body3.fontFamily,
            }}>
            Win Win
          </Text>
          <Text style={styles.Text3}>
            L'application préférée des influenceurs
          </Text>
        </View>
        <View style={{width: SIZES.width, alignItems: 'center'}}>
          <Pressable style={styles.button}>
            <View style={{paddingLeft: 22}}>
              <RnIcon name="email" size={21} color="white" />
            </View>
            <Text
              style={{
                color: 'white',
                fontSize: SIZES.middleRadius,
                fontFamily: FONTS.body3.fontFamily,
                fontWeight: '400',
              }}>
              CONTINUE WITH EMAIL
            </Text>
          </Pressable>
        </View>
        <View
          style={{
            paddingHorizontal: responsiveWidth(30),
            paddingVertical: responsiveHeight(15),
          }}>
          <Text style={styles.Text3}>Vous n'avez pas encore de compte?</Text>
          <Pressable onPress={()=>{navigationRef.current?.navigate('Signup')}}>
            <Text style={styles.log}>S'inscrire</Text>
          </Pressable>
        </View>
      </View>
    </ImageBackground>
  );
};

export default ContactMail;

const styles = StyleSheet.create({
  background: {
    display: 'flex',
    width: SIZES.width,
    height: SIZES.height,
    backgroundColor: 'black',
  },
  container: {
    display: 'flex',
    width: SIZES.width,
    height: SIZES.height * 0.97,
    justifyContent: 'flex-end',
  },
  log: {
    color: 'white',
    fontSize: SIZES.middleRadius,
    textAlign: 'center',
    fontWeight: '400',
    shadowColor: 'black',
  },
  Text3: {
    color: 'white',
    fontSize: SIZES.middleRadius,
    fontFamily: FONTS.body3.fontFamily,
    fontWeight: '300',
    shadowColor: 'black',
    textAlign: 'center',
    letterSpacing: 2,
  },
  button: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 19,
    width: SIZES.width * 0.8,
    borderWidth: 1,
    borderRadius: 15,
    borderColor: 'white',
    paddingVertical: 15,
  },
});
