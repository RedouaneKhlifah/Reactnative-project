import React from 'react';
import {View, Text, StyleSheet, ImageBackground, Pressable} from 'react-native';
import {COLORS, FONTS, Images, SIZES} from '../../constants';
import {responsiveHeight, responsiveWidth} from '../../utils/responsive';
import RnIcon from '../../components/ui/RnIcon';
import {useNavigationRef} from '../../store/NavigationContext';

const ContactMail = () => {
  const navigationRef = useNavigationRef();

  return (
    <ImageBackground source={Images.contactMailBg} style={styles.background}>
      <View style={styles.container}>
        <View
          style={{
            paddingLeft: responsiveWidth(25),
            paddingVertical: responsiveHeight(45),
          }}>
          <Text
            style={{
              color: 'white',
              fontSize: 60,
              fontFamily: FONTS.h1.fontFamily,
            }}>
            Win Win
          </Text>
          <Text style={styles.Text3}>
            {"L'application préférée des influenceurs"}
          </Text>
        </View>
        <View style={{width: SIZES.width, paddingLeft: responsiveWidth(25)}}>
          <Pressable
            style={({pressed}) => [styles.button, {opacity: pressed ? 0.7 : 1}]}
            onPress={() => {
              navigationRef.current?.navigate('RoleSelectionScreen');
            }}>
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
            paddingVertical: responsiveHeight(15),
            marginBottom: 10,
            display: 'flex',
            alignItems: 'center',
          }}>
          <Text style={styles.Text3}>
            {"Vous n'avez pas encore de compte?"}
          </Text>
          <Pressable
            style={({pressed}) => [{paddingTop: 5, opacity: pressed ? 0.7 : 1}]}
            onPress={() => {
              navigationRef.current?.navigate('RoleSelectionScreen');
            }}>
          <Text style={[styles.log, { textDecorationLine: 'underline' }]}>
            {"S'inscrire"}
          </Text>
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
    fontFamily: FONTS.body1.fontFamily,
    fontWeight: '900',
    shadowColor: 'black',
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
